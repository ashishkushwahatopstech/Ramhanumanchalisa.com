/**
 * PageStore: File-backed Page and Section Repository
 * Enables Git-driven persistence, fast edge SSR, and "Reset to Original" functionality.
 */

import fs from "node:fs";
import path from "node:path";
import type { PageModel } from "./schema";

const PAGES_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/pages");
const ORIGINALS_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

function sanitizeSlug(slug: string): string {
  if (!slug || slug === "/" || slug === "home" || slug === "") return "home";
  return slug.replace(/^\/+|\/+$/g, "").replace(/\//g, "__");
}

export function getPageBySlug(slug: string): PageModel | null {
  const fileKey = sanitizeSlug(slug);
  const filePath = path.join(PAGES_DIR, `${fileKey}.json`);
  const originalPath = path.join(ORIGINALS_DIR, `${fileKey}.json`);

  if (fs.existsSync(filePath)) {
    try {
      const raw = fs.readFileSync(filePath, "utf8");
      return JSON.parse(raw) as PageModel;
    } catch (e) {
      console.error(`Error reading page file ${filePath}:`, e);
    }
  }

  if (fs.existsSync(originalPath)) {
    try {
      const raw = fs.readFileSync(originalPath, "utf8");
      return JSON.parse(raw) as PageModel;
    } catch (e) {
      console.error(`Error reading original snapshot ${originalPath}:`, e);
    }
  }

  return null;
}

export function savePage(page: PageModel, userEmail: string = "admin"): { success: boolean; error?: string } {
  const fileKey = sanitizeSlug(page.slug);
  const filePath = path.join(PAGES_DIR, `${fileKey}.json`);

  if (!fs.existsSync(PAGES_DIR)) {
    fs.mkdirSync(PAGES_DIR, { recursive: true });
  }

  // Update audit metadata
  page.auditMeta = {
    ...page.auditMeta,
    updatedAt: new Date().toISOString(),
    updatedBy: userEmail,
    version: (page.auditMeta?.version || 1) + 1,
  };

  try {
    fs.writeFileSync(filePath, JSON.stringify(page, null, 2), "utf8");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export function resetPageToOriginal(slug: string): { success: boolean; error?: string } {
  const fileKey = sanitizeSlug(slug);
  const filePath = path.join(PAGES_DIR, `${fileKey}.json`);
  const originalPath = path.join(ORIGINALS_DIR, `${fileKey}.json`);

  if (!fs.existsSync(originalPath)) {
    return { success: false, error: "Original baseline snapshot not found for this page." };
  }

  try {
    const originalRaw = fs.readFileSync(originalPath, "utf8");
    fs.writeFileSync(filePath, originalRaw, "utf8");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err.message };
  }
}

export function listAllPageSlugs(): string[] {
  if (!fs.existsSync(PAGES_DIR) && !fs.existsSync(ORIGINALS_DIR)) return [];
  const set = new Set<string>();

  if (fs.existsSync(PAGES_DIR)) {
    for (const f of fs.readdirSync(PAGES_DIR)) {
      if (f.endsWith(".json")) set.add(f.replace(".json", ""));
    }
  }

  if (fs.existsSync(ORIGINALS_DIR)) {
    for (const f of fs.readdirSync(ORIGINALS_DIR)) {
      if (f.endsWith(".json")) set.add(f.replace(".json", ""));
    }
  }

  return Array.from(set);
}
