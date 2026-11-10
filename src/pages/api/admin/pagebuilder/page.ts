import type { APIRoute } from "astro";
import { getPageBySlugWithDb, getPageBySlug } from "../../../../lib/pagebuilder/store";

export const GET: APIRoute = async (context) => {
  const sessionCookie = context.cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const url = new URL(context.request.url);
  const slug = url.searchParams.get("slug");

  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug query parameter is required" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const db = (context.locals as any)?.runtime?.env?.DB;
  const page = await getPageBySlugWithDb(slug, db);

  if (!page) {
    return new Response(JSON.stringify({ error: `Page not found for slug: ${slug}` }), {
      status: 404,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(JSON.stringify({ success: true, page, hasOriginal: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, no-cache, no-store, must-revalidate"
    }
  });
};

export const DELETE: APIRoute = async (context) => {
  const sessionCookie = context.cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const url = new URL(context.request.url);
  const slug = url.searchParams.get("slug");

  // HARD SAFETY RULE: Only test pages can ever be deleted.
  if (!slug || (!slug.startsWith("test-") && !slug.includes("test-preview"))) {
    return new Response(
      JSON.stringify({ error: "Hard Safety Rule: Production pages cannot be deleted. You can only unpublish." }),
      {
        status: 403,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  if (globalThis.__PAGEBUILDER_CACHE__) {
    globalThis.__PAGEBUILDER_CACHE__.delete(slug);
  }

  return new Response(JSON.stringify({ success: true, message: `Test page ${slug} cleaned up.` }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
