import type { APIRoute } from "astro";
import { getPrisma } from "../lib/prisma";
import { BENEFITS_DATA } from "../data/benefits";
import { FALLBACK_BLOG_POSTS } from "../data/blog";
import { CONSOLIDATED_REDIRECTS } from "../data/consolidatedPosts";

export const GET: APIRoute = async (context) => {
  const baseUrl = "https://ramhanumanchalisa.com";
  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  // 1. Static paths
  const staticPaths = [
    "",
    "/shri-hanuman-chalisa-path-vidhi",
    "/ram-hanuman-chalisa",
    "/hanuman-chalisa-meaning",
    "/hanuman-chalisa-english",
    "/hanuman-chalisa-pdf",
    "/hanuman-chalisa-audio-mp3",
    "/hanuman-chalisa-benefits",
    "/hanuman-jayanti",
    "/bajrang-baan",
    "/sankat-mochan-hanumanashtak",
    "/hanuman-aarti",
    "/ram-chalisa",
    "/hanuman-stuti",
    "/blog",
    "/faq",
    "/about",
    "/contact",
    "/privacy-policy",
    "/disclaimer",
  ];

  const now = new Date().toISOString();

  let urls = staticPaths.map((path) => {
    const priority = path === "" ? "1.0" : path.includes("meaning") || path.includes("audio") ? "0.9" : "0.8";
    const changefreq = path === "" ? "daily" : "weekly";
    return `
  <url>
    <loc>${baseUrl}${path}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  });

  // 2. Dynamic benefits
  let benefitSlugs = Object.keys(BENEFITS_DATA);
  try {
    const dbBenefits = await prisma.benefit.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (dbBenefits.length > 0) {
      const dbSlugs = dbBenefits.map((b) => b.slug);
      benefitSlugs = Array.from(new Set([...benefitSlugs, ...dbSlugs]));
    }
  } catch (e) {
    console.error("Sitemap: Failed to query D1 database benefits, falling back to static benefits.", e);
  }

  const benefitUrls = benefitSlugs.map((slug) => `
  <url>
    <loc>${baseUrl}/hanuman-chalisa-benefits/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
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

  let blogSlugs: string[] = FALLBACK_BLOG_POSTS
    .map((p) => LEGACY_SLUG_MAP[p.slug] || p.slug)
    .filter((slug) => !redirectSourceSlugs.has(slug));

  try {
    const dbPosts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (dbPosts.length > 0) {
      const dbMapped = dbPosts
        .map((p) => LEGACY_SLUG_MAP[p.slug] || p.slug)
        .filter((slug) => !redirectSourceSlugs.has(slug));
      blogSlugs = Array.from(new Set([...blogSlugs, ...dbMapped]));
    }
  } catch (e) {
    console.error("Sitemap: Failed to query D1 database posts, falling back to static posts.", e);
  }
  blogSlugs = Array.from(new Set(blogSlugs));

  const blogUrls = blogSlugs.map((slug) => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
  urls = urls.concat(blogUrls);

  // 4. Localized languages
  const langPaths = ["en", "te", "bn", "kn", "gu", "mr"];
  const langUrls = langPaths.map((lang) => `
  <url>
    <loc>${baseUrl}/hanuman-chalisa/${lang}</loc>
    <lastmod>${now}</lastmod>
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
