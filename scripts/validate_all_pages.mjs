/**
 * Script to test page validation on all pagebuilder JSON files
 */

import fs from "node:fs";
import path from "node:path";

const PAGES_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/pages");
const ORIGINALS_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

function validatePage(page, originalPage) {
  const errors = [];
  const warnings = [];

  if (!page.slug) errors.push("Missing slug");
  if (!page.seo?.title) errors.push("Missing SEO title");
  if (!page.seo?.description) errors.push("Missing SEO description");
  if (!page.seo?.canonicalUrl || !page.seo.canonicalUrl.startsWith("https://ramhanumanchalisa.com")) {
    errors.push("Invalid canonical URL");
  }

  let h1Count = 0;
  if (page.h1?.text && page.h1.text.trim().length > 0) h1Count++;

  const allBlocks = [];
  for (const s of page.sections || []) {
    if (!s.visible) continue;
    for (const c of s.containers || []) {
      for (const col of c.columns || []) {
        for (const b of col.blocks || []) {
          if (b.visible) allBlocks.push(b);
        }
      }
    }
  }

  for (const block of allBlocks) {
    if (block.type === "heading_paragraph" && block.content?.level === "h1") {
      h1Count++;
    }
    if (block.type === "image" && (!block.content?.alt || block.content.alt.trim().length === 0)) {
      errors.push(`Image block ${block.id} is missing alt text`);
    }
    if (block.type === "ad_slot") {
      const allowedSlots = ["aboveFold", "inContent", "footer"];
      if (!allowedSlots.includes(block.content?.slotId)) {
        errors.push(`Ad slot ${block.content?.slotId} is invalid`);
      }
    }
    if (block.type === "scripture_verses" && originalPage) {
      // Find orig block
      let origBlock = null;
      for (const s of originalPage.sections || []) {
        for (const c of s.containers || []) {
          for (const col of c.columns || []) {
            for (const b of col.blocks || []) {
              if (b.id === block.id) origBlock = b;
            }
          }
        }
      }
      if (origBlock) {
        const origVerses = JSON.stringify(origBlock.content?.verses || "");
        const curVerses = JSON.stringify(block.content?.verses || "");
        if (origVerses !== curVerses) {
          errors.push(`Scripture text in block ${block.id} was altered!`);
        }
      }
    }
  }

  if (h1Count === 0) errors.push("No H1 heading found");
  if (h1Count > 1) errors.push(`Multiple H1 headings found (${h1Count})`);

  return { valid: errors.length === 0, errors, warnings };
}

let total = 0;
let failed = 0;

for (const file of fs.readdirSync(PAGES_DIR)) {
  if (!file.endsWith(".json")) continue;
  total++;
  const raw = fs.readFileSync(path.join(PAGES_DIR, file), "utf8");
  const page = JSON.parse(raw);

  let originalPage = null;
  const origPath = path.join(ORIGINALS_DIR, file);
  if (fs.existsSync(origPath)) {
    originalPage = JSON.parse(fs.readFileSync(origPath, "utf8"));
  }

  const result = validatePage(page, originalPage);
  if (!result.valid) {
    console.error(`❌ Validation failed for ${file}:`, result.errors);
    failed++;
  } else {
    console.log(`✅ Validation passed for ${file}`);
  }
}

console.log(`\nValidated ${total} pages: ${total - failed} passed, ${failed} failed.`);
if (failed > 0) process.exit(1);
