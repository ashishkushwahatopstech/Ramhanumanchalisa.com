import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/auth", "/api/admin", "/unauthorized"],
    },
    sitemap: "https://ramhanumanchalisa.com/sitemap.xml",
  };
}
