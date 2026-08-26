import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);

  // Protect all /admin routes except the public /admin/login page
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const sessionCookie = context.cookies.get("admin_session")?.value;

    if (!sessionCookie || sessionCookie !== "authenticated") {
      return context.redirect("/admin/login");
    }
  }

  return next();
});
