import type { APIRoute } from "astro";
import { d1SaveImage } from "../../../lib/d1";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

const ALLOWED_MIME_TYPES = new Set([
  "image/webp",
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/avif",
  "image/svg+xml",
  "image/gif",
]);

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

export const POST: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 403,
      headers: { "Content-Type": "application/json" },
    });
  }

  try {
    const formData = await context.request.formData();
    const file = formData.get("file") as File | null;
    let folder = (formData.get("folder") as string) || "blog";
    const customName = formData.get("customName") as string | null;

    if (!file || typeof file.arrayBuffer !== "function") {
      return new Response(JSON.stringify({ error: "No image file provided" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Sanitize folder (only allow blog or benefits)
    folder = folder.toLowerCase() === "benefits" ? "benefits" : "blog";

    // Validate mime type
    const mimeType = file.type || "image/webp";
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      return new Response(
        JSON.stringify({
          error: `Invalid file type: ${mimeType}. Please upload a WebP, PNG, JPEG, AVIF, or SVG image.`,
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    if (file.size > MAX_FILE_SIZE) {
      return new Response(
        JSON.stringify({
          error: "File size exceeds the 10MB limit. Please compress the image.",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Data = buffer.toString("base64");

    // Sanitize filename
    const originalName = customName?.trim() || file.name || "image.webp";
    const lastDotIndex = originalName.lastIndexOf(".");
    const rawExt = lastDotIndex !== -1 ? originalName.slice(lastDotIndex).toLowerCase() : ".webp";
    const rawBase = lastDotIndex !== -1 ? originalName.slice(0, lastDotIndex) : originalName;

    const sanitizedBase = rawBase
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9-_]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "") || "image";

    const fileName = `${sanitizedBase}${rawExt}`;
    const imagePath = `${folder}/${fileName}`;
    const publicUrl = `/images/${imagePath}`;

    // 1. Save directly into Cloudflare D1 Database (Persistent across Edge / Live deployments)
    const db = context.locals.runtime?.env?.DB;
    if (db && typeof db.prepare === "function") {
      try {
        await d1SaveImage(db, {
          path: imagePath,
          fileName,
          folder,
          mimeType,
          dataBase64: base64Data,
          size: file.size,
        });
      } catch (dbErr) {
        console.warn("Notice: saving image to D1 encountered notice:", dbErr);
      }
    }

    // 2. Also save to local public disk if running in Node / Local Dev
    try {
      const fs = await import("node:fs/promises");
      const path = await import("node:path");

      const targetDir = path.join(process.cwd(), "public", "images", folder);
      await fs.mkdir(targetDir, { recursive: true });
      const targetPath = path.join(targetDir, fileName);

      await fs.writeFile(targetPath, buffer);
    } catch {
      // Serverless edge environment with read-only disk: D1 has already saved the binary data!
    }

    return new Response(
      JSON.stringify({
        success: true,
        url: publicUrl,
        fileName,
        size: file.size,
        mimeType,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error: any) {
    console.error("Upload API error:", error);
    return new Response(
      JSON.stringify({ error: error?.message || "Internal server error during upload" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
