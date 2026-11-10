import type { APIRoute } from "astro";
import { listAllPageSummaries } from "../../../../lib/pagebuilder/store";

export const GET: APIRoute = async (context) => {
  const sessionCookie = context.cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const db = (context.locals as any)?.runtime?.env?.DB;
  const pages = await listAllPageSummaries(db);

  return new Response(JSON.stringify({ success: true, pages }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Cache-Control": "private, no-cache, no-store, must-revalidate"
    }
  });
};
