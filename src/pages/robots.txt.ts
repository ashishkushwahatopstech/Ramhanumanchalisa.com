import type { APIRoute } from "astro";

export const GET: APIRoute = async (context) => {
  const url = new URL(context.request.url);
  const host = url.hostname;

  let robotsContent = "";

  if (host.endsWith("pages.dev")) {
    // Disallow all indexing on Cloudflare preview/deploy subdomains to prevent duplicate content
    robotsContent = `User-agent: *
Disallow: /
`;
  } else {
    // Allow standard search engine indexing on your main custom domain
    robotsContent = `User-agent: *
Allow: /
Disallow: /admin
Disallow: /api/auth
Disallow: /api/admin
Disallow: /unauthorized

# Block AI scrapers and training crawlers
User-agent: GPTBot
Disallow: /

User-agent: ClaudeBot
Disallow: /

User-agent: Google-Extended
Disallow: /

User-agent: Applebot-Extended
Disallow: /

User-agent: CCBot
Disallow: /

User-agent: Bytespider
Disallow: /

User-agent: Amazonbot
Disallow: /

User-agent: meta-externalagent
Disallow: /

Sitemap: https://ramhanumanchalisa.com/sitemap.xml
`;
  }

  return new Response(robotsContent, {
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=3600",
    },
  });
};
