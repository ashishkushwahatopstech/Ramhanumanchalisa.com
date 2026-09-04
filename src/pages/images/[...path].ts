import type { APIRoute } from "astro";
import { d1GetImage } from "../../lib/d1";

const MIME_MAP: Record<string, string> = {
  ".webp": "image/webp",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".ico": "image/x-icon",
};

export const GET: APIRoute = async (context) => {
  const imagePath = context.params.path;

  if (!imagePath) {
    return new Response("Not found", { status: 404 });
  }

  // 1. Check local filesystem if running in Node/Local dev
  try {
    const fs = await import("node:fs/promises");
    const path = await import("node:path");
    const localFilePath = path.join(process.cwd(), "public", "images", imagePath);

    const stat = await fs.stat(localFilePath);
    if (stat.isFile()) {
      const buffer = await fs.readFile(localFilePath);
      const ext = path.extname(localFilePath).toLowerCase();
      const contentType = MIME_MAP[ext] || "application/octet-stream";

      return new Response(buffer, {
        status: 200,
        headers: {
          "Content-Type": contentType,
          "Content-Length": String(buffer.byteLength),
          "Cache-Control": "public, max-age=31536000, immutable",
          "ETag": `"${stat.mtimeMs}-${stat.size}"`,
        },
      });
    }
  } catch {
    // Proceed to database lookup
  }

  // 2. Fetch from Cloudflare D1 Database (Zero-Git Live Uploads)
  const db = context.locals.runtime?.env?.DB;
  if (db && typeof db.prepare === "function") {
    try {
      const row = await d1GetImage(db, imagePath);

      if (row && row.dataBase64) {
        // Decode base64 to binary buffer
        const binaryStr = atob(row.dataBase64);
        const len = binaryStr.length;
        const bytes = new Uint8Array(len);
        for (let i = 0; i < len; i++) {
          bytes[i] = binaryStr.charCodeAt(i);
        }

        const dateStr = row.createdAt ? new Date(row.createdAt).toUTCString() : new Date().toUTCString();

        return new Response(bytes, {
          status: 200,
          headers: {
            "Content-Type": row.mimeType || "image/webp",
            "Content-Length": String(bytes.byteLength),
            "Cache-Control": "public, max-age=31536000, immutable",
            "Last-Modified": dateStr,
            "ETag": `"${imagePath.replace(/[^a-zA-Z0-9]/g, "-")}-${dateStr}"`,
          },
        });
      }
    } catch (dbErr) {
      console.error("Notice: error loading image from D1:", dbErr);
    }
  }

  return new Response("Image not found", { status: 404 });
};
