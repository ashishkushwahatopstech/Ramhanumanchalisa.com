import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import { getPageBySlug } from "../../../../lib/pagebuilder/store";
import type { PageModel } from "../../../../lib/pagebuilder/schema";

const PAGES_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/pages");
const ORIGINALS_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

export const GET: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug query parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const page = getPageBySlug(slug);
  if (!page) {
    return new Response(JSON.stringify({ error: `Page not found for slug: ${slug}` }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  // Also check if original snapshot exists
  const origPath = path.join(ORIGINALS_DIR, `${slug.replace(/\//g, "__")}.json`);
  const hasOriginal = fs.existsSync(origPath);

  return new Response(JSON.stringify({ success: true, page, hasOriginal }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};

export const DELETE: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const url = new URL(request.url);
  const slug = url.searchParams.get("slug");

  // HARD SAFETY RULE: Only test pages can ever be deleted.
  // Production pages can NEVER be deleted.
  if (!slug || !slug.startsWith("test-") && !slug.includes("test-preview")) {
    return new Response(JSON.stringify({ error: "Hard Safety Rule: Production pages cannot be deleted. You can only unpublish." }), {
      status: 403,
      headers: { "Content-Type": "application/json" }
    });
  }

  const fileKey = slug.replace(/\//g, "__");
  const filePath = path.join(PAGES_DIR, `${fileKey}.json`);

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  return new Response(JSON.stringify({ success: true, message: `Test page ${slug} cleaned up successfully.` }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
