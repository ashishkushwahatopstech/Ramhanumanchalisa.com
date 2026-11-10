import type { APIRoute } from "astro";
import { resetPageToOriginal } from "../../../../lib/pagebuilder/store";

export const POST: APIRoute = async ({ request, cookies }) => {
  const sessionCookie = cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  let body: any;
  try {
    body = await request.json();
  } catch (e) {
    return new Response(JSON.stringify({ error: "Invalid JSON body" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const { slug } = body;
  if (!slug) {
    return new Response(JSON.stringify({ error: "Slug is required to reset page" }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  const res = resetPageToOriginal(slug);
  if (!res.success) {
    return new Response(JSON.stringify({ error: res.error || "Failed to reset page to original snapshot." }), {
      status: 400,
      headers: { "Content-Type": "application/json" }
    });
  }

  return new Response(
    JSON.stringify({
      success: true,
      message: `Page "${slug}" has been restored to its verified original baseline snapshot.`
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};
