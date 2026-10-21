import type { APIRoute } from "astro";
import { getPrisma } from "../lib/prisma";
import { BENEFITS_DATA } from "../data/benefits";
import { FALLBACK_BLOG_POSTS } from "../data/blog";
import { CONSOLIDATED_REDIRECTS } from "../data/consolidatedPosts";

export const GET: APIRoute = async (context) => {
  const baseUrl = "https://ramhanumanchalisa.com";
  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  // 1. Static paths with stable, authentic lastmod timestamps
  const staticPaths: Array<{ path: string; lastmod: string; changefreq: string; priority: string }> = [
    { path: "", lastmod: "2026-09-23T00:00:00.000Z", changefreq: "daily", priority: "1.0" },
    { path: "/shri-hanuman-chalisa-path-vidhi", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/ram-hanuman-chalisa", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/hanuman-chalisa-meaning", lastmod: "2026-09-23T00:00:00.000Z", changefreq: "weekly", priority: "0.9" },
    { path: "/hanuman-chalisa-pdf", lastmod: "2026-09-20T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/hanuman-chalisa-audio-mp3", lastmod: "2026-09-20T00:00:00.000Z", changefreq: "weekly", priority: "0.9" },
    { path: "/hanuman-chalisa-benefits", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/hanuman-jayanti", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/bajrang-baan", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/sankat-mochan-hanumanashtak", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/hanuman-aarti", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/ram-chalisa", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/hanuman-stuti", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "weekly", priority: "0.8" },
    { path: "/blog", lastmod: "2026-09-23T00:00:00.000Z", changefreq: "daily", priority: "0.8" },
    { path: "/faq", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "monthly", priority: "0.7" },
    { path: "/about", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "monthly", priority: "0.6" },
    { path: "/contact", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "monthly", priority: "0.6" },
    { path: "/privacy-policy", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "monthly", priority: "0.5" },
    { path: "/disclaimer", lastmod: "2026-09-15T00:00:00.000Z", changefreq: "monthly", priority: "0.5" },
  ];

  let urls = staticPaths.map((item) => {
    const locUrl = item.path === "" ? `${baseUrl}/` : `${baseUrl}${item.path}`;
    return `
  <url>
    <loc>${locUrl}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`;
  });

  // 2. Dynamic benefits with DB timestamps
  const benefitDateMap = new Map<string, string>();
  try {
    const dbBenefits = await prisma.benefit.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, createdAt: true },
    });
    for (const b of dbBenefits) {
      const d = b.updatedAt || b.createdAt;
      if (d) benefitDateMap.set(b.slug, new Date(d).toISOString());
    }
  } catch (e) {
    console.error("Sitemap: Failed to query D1 database benefits, falling back to static benefits.", e);
  }

  const allBenefitSlugs = Array.from(new Set([...Object.keys(BENEFITS_DATA), ...benefitDateMap.keys()]));
  const benefitUrls = allBenefitSlugs.map((slug) => {
    const lastmod = benefitDateMap.get(slug) || "2026-09-15T00:00:00.000Z";
    return `
  <url>
    <loc>${baseUrl}/hanuman-chalisa-benefits/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;
  });
  urls = urls.concat(benefitUrls);

  // 3. Dynamic blog
  const LEGACY_SLUG_MAP: Record<string, string> = {
    ...CONSOLIDATED_REDIRECTS,
    "surya-dev-aarti-bhajan-lyrics-in": "surya-dev-aarti-bhajan-lyrics-in-english-and-hindi",
    "shri-kaal-bhairav-chalisa-lyrics-in": "shri-kaal-bhairav-chalisa-lyrics-in-hindi",
    "shri-kaal-bhairav-chalisa-lyrics-in_24": "shri-kaal-bhairav-chalisa-lyrics-in-english",
    "shri-vindheshwari-chalisa-lyrics-in": "shri-vindheshwari-chalisa-lyrics-in-english-hindi",
    "shri-ramchandra-kripalu-lyrics-in": "shri-ramchandra-kripalu-lyrics-in-english",
    "shri-rani-sati-chalisa-lyrics-in": "shri-rani-sati-chalisa-lyrics-in-english",
    "shri-annapurna-chalisa-lyrics-in": "shri-annapurna-chalisa-lyrics-in-english",
    "shri-saraswati-chalisa-lyrics-in": "shri-saraswati-chalisa-lyrics-in-english-hindi",
    "shri-baba-balaknath-chalisa-lyrics-in": "shri-baba-balaknath-chalisa-lyrics-in-hindi",
    "shri-chandraprabhu-chalisa-lyrics-in": "shri-chandraprabhu-chalisa-lyrics-in-hindi",
    "japji-sahib-path-in-hindi-punjabi-and": "japji-sahib-path-in-hindi-punjabi-and-english",
    "balaji-chalisa-lyrics-in-english-and": "balaji-chalisa-lyrics-in-english-and-hindi",
    "gorakhnath-chalisa-lyrics-in-hindi-and": "gorakhnath-chalisa-lyrics-in-hindi-and-english",
    "chamunda-chalisa-lyrics-in-hindi-and": "chamunda-chalisa-lyrics-in-hindi-and-english",
  };

  const redirectSourceSlugs = new Set(Object.keys(LEGACY_SLUG_MAP));

  const EXCLUDED_BLOG_SLUGS = new Set([
    "shri-hanuman-chalisa-english",
    "shri-hanuman-chalisa-in-telugu-lyrics",
    "hanuman-chalisa-in-bengali",
    "hanuman-chalisa-in-kannada",
    "hanuman-chalisa-in-gujarati",
    "shri-hanuman-chalisa-hindi",
  ]);

  const blogDateMap = new Map<string, string>();
  for (const p of FALLBACK_BLOG_POSTS) {
    const canonicalSlug = LEGACY_SLUG_MAP[p.slug] || p.slug;
    if (redirectSourceSlugs.has(canonicalSlug) || EXCLUDED_BLOG_SLUGS.has(canonicalSlug)) continue;
    let iso = "2026-08-20T00:00:00.000Z";
    if (p.createdAt) {
      const parsed = new Date(p.createdAt);
      if (!isNaN(parsed.getTime())) {
        iso = parsed.toISOString();
      }
    }
    blogDateMap.set(canonicalSlug, iso);
  }

  try {
    const dbPosts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true, updatedAt: true, createdAt: true },
    });
    for (const p of dbPosts) {
      const canonicalSlug = LEGACY_SLUG_MAP[p.slug] || p.slug;
      if (redirectSourceSlugs.has(canonicalSlug) || EXCLUDED_BLOG_SLUGS.has(canonicalSlug)) continue;
      const d = p.updatedAt || p.createdAt;
      if (d) {
        blogDateMap.set(canonicalSlug, new Date(d).toISOString());
      } else if (!blogDateMap.has(canonicalSlug)) {
        blogDateMap.set(canonicalSlug, "2026-09-02T00:00:00.000Z");
      }
    }
  } catch (e) {
    console.error("Sitemap: Failed to query D1 database posts, falling back to static posts.", e);
  }

  const blogUrls = Array.from(blogDateMap.entries()).map(([slug, lastmod]) => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
  urls = urls.concat(blogUrls);

  // 4. Localized languages
  const langPaths = [
    { lang: "en", lastmod: "2026-09-20T00:00:00.000Z" },
    { lang: "te", lastmod: "2026-09-20T00:00:00.000Z" },
    { lang: "bn", lastmod: "2026-09-20T00:00:00.000Z" },
    { lang: "kn", lastmod: "2026-09-20T00:00:00.000Z" },
    { lang: "gu", lastmod: "2026-09-20T00:00:00.000Z" },
    { lang: "mr", lastmod: "2026-09-20T00:00:00.000Z" },
  ];
  const langUrls = langPaths.map((item) => `
  <url>
    <loc>${baseUrl}/hanuman-chalisa/${item.lang}</loc>
    <lastmod>${item.lastmod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>`);
  urls = urls.concat(langUrls);

  const xmlContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join("")}
</urlset>`;

  return new Response(xmlContent, {
    headers: {
      "Content-Type": "application/xml",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
