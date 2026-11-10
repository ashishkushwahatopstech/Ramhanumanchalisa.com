import fs from "fs";
import path from "path";

const SITEMAP_URL = "https://ramhanumanchalisa.com/sitemap.xml";
const OUTPUT_FILE = path.resolve(process.cwd(), "audit", "before.json");

// Ensure audit dir exists
const auditDir = path.dirname(OUTPUT_FILE);
if (!fs.existsSync(auditDir)) {
  fs.mkdirSync(auditDir, { recursive: true });
}

function cleanText(str) {
  if (!str) return "";
  return str.replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
}

function extractMeta(html, url, status) {
  // Title
  const titleMatch = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  const title = titleMatch ? cleanText(titleMatch[1]) : "";

  // Canonical
  const canonicalMatch = html.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i) 
    || html.match(/<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["']/i);
  const canonical = canonicalMatch ? canonicalMatch[1].trim() : "";

  // Meta description
  const descMatch = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']*)["']/i)
    || html.match(/<meta[^>]+content=["']([^"']*)["'][^>]+name=["']description["']/i);
  const metaDescription = descMatch ? descMatch[1].trim() : "";

  // H1
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  const h1 = h1Match ? cleanText(h1Match[1]) : "";

  // JSON-LD scripts
  const jsonLdRegex = /<script[^>]+type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi;
  const jsonLd = [];
  let match;
  while ((match = jsonLdRegex.exec(html)) !== null) {
    try {
      jsonLd.push(JSON.parse(match[1].trim()));
    } catch (e) {
      jsonLd.push(match[1].trim());
    }
  }

  return {
    url,
    status,
    canonical,
    title,
    metaDescription,
    h1,
    jsonLd,
  };
}

async function fetchWithRetry(url, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      const res = await fetch(url, {
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AntigravityAudit/1.0",
        },
        redirect: "manual",
      });
      const status = res.status;
      if (status >= 300 && status < 400) {
        return {
          url,
          status,
          canonical: res.headers.get("location") || "",
          title: `Redirect to ${res.headers.get("location")}`,
          metaDescription: "",
          h1: "",
          jsonLd: [],
        };
      }
      const html = await res.text();
      return extractMeta(html, url, status);
    } catch (err) {
      if (i === retries - 1) {
        return {
          url,
          status: 0,
          error: err.message,
          canonical: "",
          title: "",
          metaDescription: "",
          h1: "",
          jsonLd: [],
        };
      }
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
}

async function run() {
  console.log(`Fetching sitemap from ${SITEMAP_URL}...`);
  const sitemapRes = await fetch(SITEMAP_URL);
  if (!sitemapRes.ok) {
    throw new Error(`Failed to fetch sitemap: ${sitemapRes.status}`);
  }
  const sitemapXml = await sitemapRes.text();

  const locMatches = [...sitemapXml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1].trim());
  console.log(`Found ${locMatches.length} URLs in sitemap.`);

  const results = [];
  const CONCURRENCY = 5;

  for (let i = 0; i < locMatches.length; i += CONCURRENCY) {
    const chunk = locMatches.slice(i, i + CONCURRENCY);
    const chunkResults = await Promise.all(
      chunk.map(url => {
        console.log(`Crawling [${results.length + 1}/${locMatches.length}] ${url}`);
        return fetchWithRetry(url);
      })
    );
    results.push(...chunkResults);
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(results, null, 2), "utf8");
  console.log(`\nSuccessfully saved ${results.length} route snapshots to ${OUTPUT_FILE}`);
}

run().catch((err) => {
  console.error("Audit error:", err);
  process.exit(1);
});
