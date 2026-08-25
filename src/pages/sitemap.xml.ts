import type { APIRoute } from "astro";
import { getPrisma } from "../lib/prisma";
import { BENEFITS_DATA } from "../data/benefits";
import { FALLBACK_BLOG_POSTS } from "../data/blog";

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
  const benefitSlugs = Object.keys(BENEFITS_DATA);
  const benefitUrls = benefitSlugs.map((slug) => `
  <url>
    <loc>${baseUrl}/hanuman-chalisa-benefits/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`);
  urls = urls.concat(benefitUrls);

  // 3. Dynamic blog
  let blogSlugs: string[] = FALLBACK_BLOG_POSTS.map((p) => p.slug);
  try {
    const dbPosts = await prisma.post.findMany({
      where: { published: true },
      select: { slug: true },
    });
    if (dbPosts.length > 0) {
      blogSlugs = dbPosts.map((p) => p.slug);
    }
  } catch (e) {
    console.error("Sitemap: Failed to query D1 database posts, falling back to static posts.", e);
  }

  const blogUrls = blogSlugs.map((slug) => `
  <url>
    <loc>${baseUrl}/blog/${slug}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`);
  urls = urls.concat(blogUrls);

  // 4. Localized languages
  const langPaths = ["en", "te", "bn", "kn"];
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
