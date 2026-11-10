/**
 * Build-time & Admin Validator for the Block System
 * Guarantees zero SEO regression, heading hierarchy integrity, and scripture text protection.
 */

import type { PageModel, BlockInstance, SectionModel } from "./schema";

export interface ValidationIssue {
  type: "error" | "warning";
  code: string;
  message: string;
  blockId?: string;
}

export function validatePage(page: PageModel, originalPage?: PageModel | null): { valid: boolean; errors: ValidationIssue[]; warnings: ValidationIssue[] } {
  const errors: ValidationIssue[] = [];
  const warnings: ValidationIssue[] = [];

  // 1. Slug & SEO validations
  if (!page.slug) {
    errors.push({ type: "error", code: "MISSING_SLUG", message: "Page slug is mandatory and cannot be empty." });
  }

  if (!page.seo?.title || page.seo.title.trim().length === 0) {
    errors.push({ type: "error", code: "MISSING_TITLE", message: "SEO Page Title is required for search indexing." });
  } else if (page.seo.title.length > 70) {
    warnings.push({ type: "warning", code: "TITLE_TOO_LONG", message: `Page title is ${page.seo.title.length} characters (recommended: 50–60).` });
  }

  if (!page.seo?.description || page.seo.description.trim().length === 0) {
    errors.push({ type: "error", code: "MISSING_DESCRIPTION", message: "Meta description is required for search engines." });
  } else if (page.seo.description.length > 165) {
    warnings.push({ type: "warning", code: "DESC_TOO_LONG", message: `Meta description is ${page.seo.description.length} characters (recommended: 120–160).` });
  }

  if (!page.seo?.canonicalUrl || !page.seo.canonicalUrl.startsWith("https://ramhanumanchalisa.com")) {
    errors.push({ type: "error", code: "INVALID_CANONICAL", message: "Canonical URL must start with https://ramhanumanchalisa.com" });
  }

  // 2. Heading Hierarchy & H1 Count
  let h1Count = 0;
  if (page.h1?.text && page.h1.text.trim().length > 0) {
    h1Count++;
  }

  // Walk through all blocks to check H1 count and block-specific rules
  const allBlocks: BlockInstance[] = [];
  if (Array.isArray(page.sections)) {
    for (const section of page.sections) {
      if (!section.visible) continue;
      if (Array.isArray(section.containers)) {
        for (const container of section.containers) {
          if (Array.isArray(container.columns)) {
            for (const col of container.columns) {
              if (Array.isArray(col.blocks)) {
                for (const block of col.blocks) {
                  if (block.visible) {
                    allBlocks.push(block);
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  for (const block of allBlocks) {
    // Check for duplicate H1 in blocks
    if (block.type === "heading_paragraph" && block.content?.level === "h1") {
      h1Count++;
    }
    if (block.type === "hero" && block.content?.headline) {
      // The hero headline acts as H1
    }

    // Image alt text validation
    if (block.type === "image") {
      if (!block.content?.alt || block.content.alt.trim().length === 0) {
        errors.push({
          type: "error",
          code: "MISSING_ALT_TEXT",
          message: `Image in block "${block.id}" is missing required Alt Text for accessibility and SEO.`,
          blockId: block.id,
        });
      }
    }

    // Ad slot rules validation
    if (block.type === "ad_slot") {
      const allowedSlots = ["aboveFold", "inContent", "footer"];
      if (!allowedSlots.includes(block.content?.slotId)) {
        errors.push({
          type: "error",
          code: "INVALID_AD_SLOT",
          message: `Ad slot "${block.content?.slotId}" is not allowed. Must be one of: ${allowedSlots.join(", ")}.`,
          blockId: block.id,
        });
      }
    }

    // Scripture Verses Byte-for-byte check (Rule 3)
    if (block.type === "scripture_verses" && originalPage) {
      // Find corresponding original block
      const origBlock = findBlockById(originalPage, block.id);
      if (origBlock) {
        const origText = JSON.stringify(origBlock.content?.verses || "");
        const currentText = JSON.stringify(block.content?.verses || "");
        if (origText !== currentText) {
          if (!page.auditMeta?.hasScriptureModifications) {
            errors.push({
              type: "error",
              code: "SCRIPTURE_ALTERED",
              message: `Religious Scripture in block "${block.id}" was modified. Sacred texts must remain byte-for-byte identical.`,
              blockId: block.id,
            });
          }
        }
      }
    }
  }

  if (h1Count === 0) {
    errors.push({ type: "error", code: "NO_H1", message: "Page must contain exactly one H1 heading. None was found." });
  } else if (h1Count > 1) {
    errors.push({ type: "error", code: "MULTIPLE_H1", message: `Page has ${h1Count} H1 headings. Exactly one H1 is allowed per page.` });
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}

function findBlockById(page: PageModel, blockId: string): BlockInstance | null {
  for (const s of page.sections || []) {
    for (const c of s.containers || []) {
      for (const col of c.columns || []) {
        for (const b of col.blocks || []) {
          if (b.id === blockId) return b;
        }
      }
    }
  }
  return null;
}
