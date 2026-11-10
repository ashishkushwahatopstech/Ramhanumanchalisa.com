/**
 * PageStore: Cloudflare Edge-Bundled & D1-Backed Page Repository
 * Seamlessly operates on both Cloudflare Edge (Workers/Pages) and local Node environments.
 */

import fs from "node:fs";
import path from "node:path";
import type { PageModel } from "./schema";

// 1. Eagerly bundle all JSON page models and original snapshots at build time (Vite / Cloudflare Pages)
const bundledPages = import.meta.glob<Record<string, any>>(
  "../../data/pagebuilder/pages/*.json",
  { eager: true }
);

const bundledOriginals = import.meta.glob<Record<string, any>>(
  "../../data/pagebuilder/original_snapshots/*.json",
  { eager: true }
);

const BUNDLED_PAGES_MAP = new Map<string, PageModel>();
const BUNDLED_ORIGINALS_MAP = new Map<string, PageModel>();

for (const [filePath, mod] of Object.entries(bundledPages)) {
  const page = (mod as any).default || mod;
  if (page && page.slug) {
    BUNDLED_PAGES_MAP.set(sanitizeSlug(page.slug), page as PageModel);
  }
}

for (const [filePath, mod] of Object.entries(bundledOriginals)) {
  const page = (mod as any).default || mod;
  if (page && page.slug) {
    BUNDLED_ORIGINALS_MAP.set(sanitizeSlug(page.slug), page as PageModel);
  }
}

// In-memory runtime cache for serverless edge workers
declare global {
  var __PAGEBUILDER_CACHE__: Map<string, PageModel> | undefined;
}

if (!globalThis.__PAGEBUILDER_CACHE__) {
  globalThis.__PAGEBUILDER_CACHE__ = new Map<string, PageModel>();
}

const PAGES_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/pages");
const ORIGINALS_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

export function sanitizeSlug(slug: string): string {
  if (!slug || slug === "/" || slug === "home" || slug === "") return "home";
  return slug.replace(/^\/+|\/+$/g, "").replace(/\//g, "__");
}

export function getPageBySlug(slug: string, db?: any): PageModel | null {
  const fileKey = sanitizeSlug(slug);

  // 1. Check in-memory runtime cache
  if (globalThis.__PAGEBUILDER_CACHE__?.has(fileKey)) {
    return globalThis.__PAGEBUILDER_CACHE__.get(fileKey)!;
  }

  // 2. Check bundled pages map (compiled into Cloudflare edge bundle)
  if (BUNDLED_PAGES_MAP.has(fileKey)) {
    return BUNDLED_PAGES_MAP.get(fileKey)!;
  }

  // 3. Check bundled originals map
  if (BUNDLED_ORIGINALS_MAP.has(fileKey)) {
    return BUNDLED_ORIGINALS_MAP.get(fileKey)!;
  }

  // 4. Local Node filesystem fallback
  try {
    const filePath = path.join(PAGES_DIR, `${fileKey}.json`);
    const originalPath = path.join(ORIGINALS_DIR, `${fileKey}.json`);

    if (fs.existsSync && fs.existsSync(filePath)) {
      const raw = fs.readFileSync(filePath, "utf8");
      const page = JSON.parse(raw) as PageModel;
      globalThis.__PAGEBUILDER_CACHE__?.set(fileKey, page);
      return page;
    }

    if (fs.existsSync && fs.existsSync(originalPath)) {
      const raw = fs.readFileSync(originalPath, "utf8");
      const page = JSON.parse(raw) as PageModel;
      return page;
    }
  } catch (e) {
    // Edge runtime doesn't have local filesystem access
  }

  return null;
}

export async function getPageBySlugWithDb(slug: string, db?: any): Promise<PageModel | null> {
  const fileKey = sanitizeSlug(slug);

  // Check Cloudflare D1 if available
  if (db && typeof db.prepare === "function") {
    try {
      const row = await db
        .prepare("SELECT value FROM SiteConfig WHERE key = ?")
        .bind(`pagebuilder_${fileKey}`)
        .first();
      if (row && row.value) {
        const page = JSON.parse(row.value) as PageModel;
        globalThis.__PAGEBUILDER_CACHE__?.set(fileKey, page);
        return page;
      }
    } catch (e) {
      console.warn(`Notice: D1 getPageBySlug error for ${fileKey}:`, e);
    }
  }

  return getPageBySlug(slug);
}

export async function savePage(
  page: PageModel,
  userEmail: string = "admin",
  db?: any
): Promise<{ success: boolean; error?: string }> {
  const fileKey = sanitizeSlug(page.slug);

  // Update audit metadata
  page.auditMeta = {
    ...page.auditMeta,
    updatedAt: new Date().toISOString(),
    updatedBy: userEmail,
    version: (page.auditMeta?.version || 1) + 1,
  };

  // 1. Save to in-memory runtime cache
  globalThis.__PAGEBUILDER_CACHE__?.set(fileKey, page);
  BUNDLED_PAGES_MAP.set(fileKey, page);

  // 2. Save to Cloudflare D1 if available
  if (db && typeof db.prepare === "function") {
    try {
      const now = new Date().toISOString();
      await db
        .prepare(
          `INSERT INTO SiteConfig (key, value, updatedAt)
           VALUES (?, ?, ?)
           ON CONFLICT(key) DO UPDATE SET
             value = excluded.value,
             updatedAt = excluded.updatedAt`
        )
        .bind(`pagebuilder_${fileKey}`, JSON.stringify(page), now)
        .run();
    } catch (e: any) {
      console.warn("Notice: D1 savePage error:", e);
    }
  }

  // 3. Local filesystem save (if running in Node / local dev)
  try {
    if (fs.existsSync && fs.mkdirSync) {
      if (!fs.existsSync(PAGES_DIR)) {
        fs.mkdirSync(PAGES_DIR, { recursive: true });
      }
      const filePath = path.join(PAGES_DIR, `${fileKey}.json`);
      fs.writeFileSync(filePath, JSON.stringify(page, null, 2), "utf8");
    }
  } catch (e) {
    // Expected on Cloudflare Pages edge runtime
  }

  return { success: true };
}

export async function resetPageToOriginal(
  slug: string,
  db?: any
): Promise<{ success: boolean; error?: string }> {
  const fileKey = sanitizeSlug(slug);
  const original = BUNDLED_ORIGINALS_MAP.get(fileKey);

  if (!original) {
    // Check local filesystem
    try {
      const originalPath = path.join(ORIGINALS_DIR, `${fileKey}.json`);
      if (fs.existsSync && fs.existsSync(originalPath)) {
        const raw = fs.readFileSync(originalPath, "utf8");
        const parsed = JSON.parse(raw) as PageModel;
        return savePage(parsed, "reset_to_baseline", db);
      }
    } catch (e) {}

    return { success: false, error: "Original baseline snapshot not found for this page." };
  }

  const restored: PageModel = JSON.parse(JSON.stringify(original));
  return savePage(restored, "reset_to_baseline", db);
}

export interface PageSummaryItem {
  slug: string;
  title: string;
  template: string;
  status: "published" | "draft";
  updatedAt: string;
  version: number;
  hasOriginalSnapshot: boolean;
  isModifiedFromOriginal: boolean;
}

export async function listAllPageSummaries(db?: any): Promise<PageSummaryItem[]> {
  const map = new Map<string, PageSummaryItem>();

  // 1. Populate from bundled originals
  for (const [slug, p] of BUNDLED_ORIGINALS_MAP.entries()) {
    map.set(slug, {
      slug: p.slug,
      title: p.seo?.title || p.h1?.text || p.slug,
      template: p.template,
      status: p.status || "published",
      updatedAt: p.auditMeta?.updatedAt || "Baseline",
      version: p.auditMeta?.version || 1,
      hasOriginalSnapshot: true,
      isModifiedFromOriginal: false,
    });
  }

  // 2. Populate from bundled pages
  for (const [slug, p] of BUNDLED_PAGES_MAP.entries()) {
    const existing = map.get(slug);
    map.set(slug, {
      slug: p.slug,
      title: p.seo?.title || p.h1?.text || p.slug,
      template: p.template,
      status: p.status || "published",
      updatedAt: p.auditMeta?.updatedAt || "Recently",
      version: p.auditMeta?.version || 1,
      hasOriginalSnapshot: Boolean(existing),
      isModifiedFromOriginal: existing ? existing.version !== (p.auditMeta?.version || 1) : false,
    });
  }

  // 3. Check Cloudflare D1 for overrides if available
  if (db && typeof db.prepare === "function") {
    try {
      const { results } = await db
        .prepare("SELECT key, value, updatedAt FROM SiteConfig WHERE key LIKE 'pagebuilder_%'")
        .all();
      if (Array.isArray(results)) {
        for (const r of results) {
          const slugKey = r.key.replace("pagebuilder_", "");
          try {
            const p: PageModel = JSON.parse(r.value);
            const existing = map.get(slugKey);
            map.set(slugKey, {
              slug: p.slug,
              title: p.seo?.title || p.h1?.text || p.slug,
              template: p.template,
              status: p.status || "published",
              updatedAt: p.auditMeta?.updatedAt || r.updatedAt || "Recently",
              version: p.auditMeta?.version || 1,
              hasOriginalSnapshot: Boolean(existing),
              isModifiedFromOriginal: true,
            });
          } catch (e) {}
        }
      }
    } catch (e) {
      console.warn("Notice: D1 listAllPageSummaries error:", e);
    }
  }

  // 4. Fallback to filesystem if map is empty (local node development)
  if (map.size === 0) {
    try {
      if (fs.existsSync && fs.readdirSync) {
        if (fs.existsSync(ORIGINALS_DIR)) {
          for (const f of fs.readdirSync(ORIGINALS_DIR)) {
            if (!f.endsWith(".json")) continue;
            const raw = fs.readFileSync(path.join(ORIGINALS_DIR, f), "utf8");
            const p: PageModel = JSON.parse(raw);
            map.set(p.slug, {
              slug: p.slug,
              title: p.seo?.title || p.h1?.text || p.slug,
              template: p.template,
              status: p.status || "published",
              updatedAt: p.auditMeta?.updatedAt || "Baseline",
              version: p.auditMeta?.version || 1,
              hasOriginalSnapshot: true,
              isModifiedFromOriginal: false,
            });
          }
        }
        if (fs.existsSync(PAGES_DIR)) {
          for (const f of fs.readdirSync(PAGES_DIR)) {
            if (!f.endsWith(".json")) continue;
            const raw = fs.readFileSync(path.join(PAGES_DIR, f), "utf8");
            const p: PageModel = JSON.parse(raw);
            const existing = map.get(p.slug);
            map.set(p.slug, {
              slug: p.slug,
              title: p.seo?.title || p.h1?.text || p.slug,
              template: p.template,
              status: p.status || "published",
              updatedAt: p.auditMeta?.updatedAt || "Recently",
              version: p.auditMeta?.version || 1,
              hasOriginalSnapshot: Boolean(existing),
              isModifiedFromOriginal: existing ? existing.version !== (p.auditMeta?.version || 1) : false,
            });
          }
        }
      }
    } catch (e) {}
  }

  return Array.from(map.values()).sort((a, b) => a.slug.localeCompare(b.slug));
}

export function listAllPageSlugs(): string[] {
  const set = new Set<string>();
  for (const s of BUNDLED_PAGES_MAP.keys()) set.add(s);
  for (const s of BUNDLED_ORIGINALS_MAP.keys()) set.add(s);
  return Array.from(set);
}
