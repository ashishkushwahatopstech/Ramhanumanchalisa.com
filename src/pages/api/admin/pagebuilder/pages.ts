import type { APIRoute } from "astro";
import fs from "node:fs";
import path from "node:path";
import type { PageModel } from "../../../../lib/pagebuilder/schema";

const PAGES_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/pages");
const ORIGINALS_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

export const GET: APIRoute = async ({ cookies }) => {
  const sessionCookie = cookies.get("admin_session")?.value;
  if (!sessionCookie || sessionCookie !== "authenticated") {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" }
    });
  }

  const pagesMap = new Map<string, any>();

  // Scan originals first
  if (fs.existsSync(ORIGINALS_DIR)) {
    for (const f of fs.readdirSync(ORIGINALS_DIR)) {
      if (!f.endsWith(".json")) continue;
      try {
        const raw = fs.readFileSync(path.join(ORIGINALS_DIR, f), "utf8");
        const p: PageModel = JSON.parse(raw);
        pagesMap.set(p.slug, {
          slug: p.slug,
          title: p.seo?.title || p.h1?.text || p.slug,
          template: p.template,
          status: p.status || "published",
          updatedAt: p.auditMeta?.updatedAt || "Baseline",
          version: p.auditMeta?.version || 1,
          hasOriginalSnapshot: true,
          isModifiedFromOriginal: false,
        });
      } catch (e) {
        console.error(`Error reading original snapshot ${f}:`, e);
      }
    }
  }

  // Scan current pages
  if (fs.existsSync(PAGES_DIR)) {
    for (const f of fs.readdirSync(PAGES_DIR)) {
      if (!f.endsWith(".json")) continue;
      try {
        const raw = fs.readFileSync(path.join(PAGES_DIR, f), "utf8");
        const p: PageModel = JSON.parse(raw);
        const existing = pagesMap.get(p.slug);

        pagesMap.set(p.slug, {
          slug: p.slug,
          title: p.seo?.title || p.h1?.text || p.slug,
          template: p.template,
          status: p.status || "published",
          updatedAt: p.auditMeta?.updatedAt || "Recently",
          version: p.auditMeta?.version || 1,
          hasOriginalSnapshot: existing ? true : false,
          isModifiedFromOriginal: existing ? (existing.version !== (p.auditMeta?.version || 1)) : false,
        });
      } catch (e) {
        console.error(`Error reading current page ${f}:`, e);
      }
    }
  }

  const pages = Array.from(pagesMap.values()).sort((a, b) => a.slug.localeCompare(b.slug));

  return new Response(JSON.stringify({ success: true, pages }), {
    status: 200,
    headers: { "Content-Type": "application/json" }
  });
};
