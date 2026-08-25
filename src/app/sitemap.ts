import { MetadataRoute } from "next";
import { BENEFITS_DATA } from "@/data/benefits";
import { FALLBACK_BLOG_POSTS } from "@/data/blog";
import prisma from "@/lib/prisma";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://ramhanumanchalisa.com";

  // 1. Static Routes
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

  const staticEntries: MetadataRoute.Sitemap = staticPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1.0 : path.includes("meaning") || path.includes("audio") ? 0.9 : 0.8,
  }));

  // 2. Dynamic Benefits Routes
  const benefitSlugs = Object.keys(BENEFITS_DATA);
  const benefitEntries: MetadataRoute.Sitemap = benefitSlugs.map((slug) => ({
    url: `${baseUrl}/hanuman-chalisa-benefits/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  // 3. Dynamic Blog Routes
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
    // ignore
  }

  const blogEntries: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${baseUrl}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  // 4. Localized Language Routes
  const langPaths = ["en", "te", "bn", "kn"];
  const langEntries: MetadataRoute.Sitemap = langPaths.map((lang) => ({
    url: `${baseUrl}/hanuman-chalisa/${lang}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  }));

  return [...staticEntries, ...benefitEntries, ...blogEntries, ...langEntries];
}
