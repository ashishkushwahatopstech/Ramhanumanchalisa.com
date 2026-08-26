import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  context.cookies.delete("admin_session", { path: "/" });
  return context.redirect("/admin/login");
};
export const POST: APIRoute = async (context) => {
  context.cookies.delete("admin_session", { path: "/" });
  return context.redirect("/admin/login");
};
