import { defineMiddleware } from "astro:middleware";
import { CONSOLIDATED_REDIRECTS } from "./data/consolidatedPosts";

const CONSOLIDATED_MIDDLEWARE_REDIRECTS: Record<string, string> = Object.entries(CONSOLIDATED_REDIRECTS).reduce(
  (acc, [source, target]) => {
    acc[`/blog/${source}`] = `/blog/${target}`;
    return acc;
  },
  {} as Record<string, string>
);

const LEGACY_SLUG_REDIRECTS: Record<string, string> = {
  ...CONSOLIDATED_MIDDLEWARE_REDIRECTS,
  "/hanuman-chalisa-english": "/hanuman-chalisa/en",
  "/blog/surya-dev-aarti-bhajan-lyrics-in": "/blog/surya-dev-aarti-bhajan-lyrics-in-english-and-hindi",
  "/blog/shri-kaal-bhairav-chalisa-lyrics-in": "/blog/shri-kaal-bhairav-chalisa-lyrics-in-hindi",
  "/blog/shri-kaal-bhairav-chalisa-lyrics-in_24": "/blog/shri-kaal-bhairav-chalisa-lyrics-in-english",
  "/blog/shri-vindheshwari-chalisa-lyrics-in": "/blog/shri-vindheshwari-chalisa-lyrics-in-english-hindi",
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
  "/blog/shri-hanuman-chalisa-english": "/hanuman-chalisa/en",
  "/blog/shri-hanuman-chalisa-in-telugu-lyrics": "/hanuman-chalisa/te",
  "/blog/hanuman-chalisa-in-bengali": "/hanuman-chalisa/bn",
  "/blog/hanuman-chalisa-in-kannada": "/hanuman-chalisa/kn",
  "/blog/hanuman-chalisa-in-gujarati": "/hanuman-chalisa/gu",
  "/blog/shri-hanuman-chalisa-hindi": "/",
};

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  let targetPath = url.pathname;
  let targetHost = url.hostname;
  let needsRedirect = false;

  // 1. Host Normalization: www.ramhanumanchalisa.com -> ramhanumanchalisa.com
  if (targetHost === "www.ramhanumanchalisa.com") {
    targetHost = "ramhanumanchalisa.com";
    needsRedirect = true;
  }

  // 2. Trailing slash normalization for non-root paths (e.g. /about/ -> /about)
  if (targetPath.length > 1 && targetPath.endsWith("/")) {
    targetPath = targetPath.replace(/\/+$/, "");
    needsRedirect = true;
  }

  // 3. 301 Redirect for legacy malformed slugs and cannibalizing posts
  if (LEGACY_SLUG_REDIRECTS[targetPath]) {
    targetPath = LEGACY_SLUG_REDIRECTS[targetPath];
    needsRedirect = true;
  }

  if (needsRedirect) {
    const cleanUrl = `https://${targetHost}${targetPath}${url.search}`;
    return context.redirect(cleanUrl, 301);
  }

  // Protect all /admin routes except the public /admin/login page
  if (url.pathname.startsWith("/admin") && url.pathname !== "/admin/login") {
    const sessionCookie = context.cookies.get("admin_session")?.value;

    if (!sessionCookie || sessionCookie !== "authenticated") {
      return context.redirect("/admin/login");
    }
  }

  const response = await next();

  // Apply Security Headers
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");

  // High Concurrency Resilience: Edge Caching on Cloudflare Global CDN
  if (context.request.method === "GET") {
    if (url.pathname.startsWith("/admin") || url.pathname.startsWith("/api/admin")) {
      response.headers.set("Cache-Control", "private, no-cache, no-store, must-revalidate");
    } else if (!url.pathname.startsWith("/api/")) {
      // Public scripture & blog pages: cache at Cloudflare edge for 1 hour with 24-hr SWR
      if (!response.headers.has("Cache-Control") || response.headers.get("Cache-Control")?.includes("max-age=0")) {
        response.headers.set(
          "Cache-Control",
          "public, max-age=120, s-maxage=3600, stale-while-revalidate=86400"
        );
      }
    }
  }

  return response;
});
