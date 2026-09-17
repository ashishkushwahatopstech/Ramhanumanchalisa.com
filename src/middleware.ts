import { defineMiddleware } from "astro:middleware";

const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  "/blog/surya-dev-aarti-bhajan-lyrics-in": "/blog/surya-dev-aarti-bhajan-lyrics-in-english-and-hindi",
  "/blog/shri-ram-aarti-lord-ram-prayer-in": "/blog/shri-ram-aarti-lord-ram-prayer-in-marathi",
  "/blog/shri-kaal-bhairav-chalisa-lyrics-in": "/blog/shri-kaal-bhairav-chalisa-lyrics-in-hindi",
  "/blog/shri-kaal-bhairav-chalisa-lyrics-in_24": "/blog/shri-kaal-bhairav-chalisa-lyrics-in-english",
  "/blog/durga-aarti-goddess-durga-prayer-in": "/blog/durga-aarti-goddess-durga-prayer-in-marathi",
  "/blog/shri-vindheshwari-chalisa-lyrics-in": "/blog/shri-vindheshwari-chalisa-lyrics-in-english-hindi",
  "/blog/shri-datta-chi-aarti-lord-dattatreya": "/blog/shri-datta-chi-aarti-lord-dattatreya-prayer-in-marathi",
  "/blog/shri-sadguru-aarti-lord-sadguru-prayer": "/blog/shri-sadguru-aarti-lord-sadguru-prayer-in-marathi",
  "/blog/shri-krishna-aarti-lord-krishna-prayer": "/blog/shri-krishna-aarti-lord-krishna-prayer-in-marathi",
  "/blog/shri-vishnu-aarti-lord-vishnu-prayer-in": "/blog/shri-vishnu-aarti-lord-vishnu-prayer-in-marathi",
  "/blog/shri-shankar-aarti-lord-shiva-prayer-in": "/blog/shri-shankar-aarti-lord-shiva-prayer-in-marathi",
  "/blog/shri-ganpati-aarti-lord-ganesh-prayer": "/blog/shri-ganpati-aarti-lord-ganesh-prayer-in-marathi",
  "/blog/shri-ramchandra-kripalu-lyrics-in": "/blog/shri-ramchandra-kripalu-lyrics-in-english",
  "/blog/shri-rani-sati-chalisa-lyrics-in": "/blog/shri-rani-sati-chalisa-lyrics-in-english",
  "/blog/shri-annapurna-chalisa-lyrics-in": "/blog/shri-annapurna-chalisa-lyrics-in-english",
  "/blog/shri-saraswati-chalisa-lyrics-in": "/blog/shri-saraswati-chalisa-lyrics-in-english-hindi",
  "/blog/shri-baba-balaknath-chalisa-lyrics-in": "/blog/shri-baba-balaknath-chalisa-lyrics-in-hindi",
  "/blog/shri-chandraprabhu-chalisa-lyrics-in": "/blog/shri-chandraprabhu-chalisa-lyrics-in-hindi",
  "/blog/japji-sahib-path-in-hindi-punjabi-and": "/blog/japji-sahib-path-in-hindi-punjabi-and-english",
  "/blog/balaji-chalisa-lyrics-in-english-and": "/blog/balaji-chalisa-lyrics-in-english-and-hindi",
  "/blog/gorakhnath-chalisa-lyrics-in-hindi-and": "/blog/gorakhnath-chalisa-lyrics-in-hindi-and-english",
  "/blog/chamunda-chalisa-lyrics-in-hindi-and": "/blog/chamunda-chalisa-lyrics-in-hindi-and-english",
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const normalizedPath = url.pathname.replace(/\/+$/, "");

  // 301 Redirect for legacy malformed slugs
  if (LEGACY_SLUG_REDIRECTS[normalizedPath]) {
    return context.redirect(LEGACY_SLUG_REDIRECTS[normalizedPath], 301);
  }

  // Protect all /admin routes except the public /admin/login page
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const sessionCookie = context.cookies.get("admin_session")?.value;

    if (!sessionCookie || sessionCookie !== "authenticated") {
      return context.redirect("/admin/login");
    }
  }

  return next();
});
