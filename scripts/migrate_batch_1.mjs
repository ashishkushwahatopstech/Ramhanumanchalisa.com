/**
 * Batch 1 Migration Script: Prayer Texts & Informational Pages
 * RamHanumanChalisa.com — Admin Pagebuilder
 */

import fs from "node:fs";
import path from "node:path";

const BASELINE_PATH = path.resolve(process.cwd(), "audit/before.json");
const PAGES_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/pages");
const ORIGINALS_DIR = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

const baseline = JSON.parse(fs.readFileSync(BASELINE_PATH, "utf8"));

const BATCH_1_SLUGS = [
  { slug: "bajrang-baan", template: "prayer_text" },
  { slug: "ram-chalisa", template: "prayer_text" },
  { slug: "hanuman-aarti", template: "prayer_text" },
  { slug: "hanuman-stuti", template: "prayer_text" },
  { slug: "ram-hanuman-chalisa", template: "prayer_text" },
  { slug: "hanuman-chalisa-meaning", template: "prayer_text" },
  { slug: "hanuman-chalisa-audio-mp3", template: "prayer_text" },
  { slug: "hanuman-chalisa-pdf", template: "prayer_text" },
  { slug: "shri-hanuman-chalisa-path-vidhi", template: "prayer_text" },
  { slug: "hanuman-ji-ki-aarti", template: "prayer_text" },
  { slug: "about", template: "legal_informational" },
  { slug: "contact", template: "legal_informational" },
  { slug: "disclaimer", template: "legal_informational" },
  { slug: "privacy-policy", template: "legal_informational" },
  { slug: "faq", template: "legal_informational" }
];

let createdCount = 0;

for (const item of BATCH_1_SLUGS) {
  const url = `https://ramhanumanchalisa.com/${item.slug}`;
  const baseEntry = baseline.find((x) => x.url === url);

  if (!baseEntry) {
    console.warn(`Could not find baseline entry for ${url}`);
    continue;
  }

  const page = {
    slug: item.slug,
    template: item.template,
    status: "published",
    seo: {
      title: baseEntry.title || `${item.slug.replace(/-/g, " ")} | Ram Hanuman Chalisa`,
      description: baseEntry.metaDescription || "Devotional prayer and recitation on Ram Hanuman Chalisa.",
      canonicalUrl: baseEntry.canonical || url,
      language: item.template === "prayer_text" ? "hi" : "en"
    },
    h1: {
      text: baseEntry.h1 || item.slug.replace(/-/g, " "),
      subheading: baseEntry.metaDescription ? baseEntry.metaDescription.slice(0, 120) : undefined,
      devanagariTag: item.template === "prayer_text" ? "॥ भक्ति भाव ॥" : undefined
    },
    sections: [
      {
        id: `sec-${item.slug}-content`,
        name: "Main Section",
        visible: true,
        order: 1,
        settings: {
          background: "transparent",
          paddingY: "medium",
          width: "contained_4xl"
        },
        containers: [
          {
            id: `cont-${item.slug}-main`,
            columnsCount: 1,
            columns: [
              {
                id: `col-${item.slug}-main`,
                blocks: [
                  {
                    id: `blk-${item.slug}-heading`,
                    type: "heading_paragraph",
                    visible: true,
                    order: 1,
                    content: {
                      level: "h2",
                      heading: baseEntry.h1 || item.slug.replace(/-/g, " "),
                      paragraph: baseEntry.metaDescription || ""
                    }
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    auditMeta: {
      createdAt: "2026-11-10T12:00:00Z",
      updatedAt: "2026-11-10T12:00:00Z",
      updatedBy: "batch_migration_1",
      version: 1,
      hasScriptureModifications: false
    }
  };

  const pagePath = path.join(PAGES_DIR, `${item.slug}.json`);
  const origPath = path.join(ORIGINALS_DIR, `${item.slug}.json`);

  fs.writeFileSync(pagePath, JSON.stringify(page, null, 2), "utf8");
  fs.writeFileSync(origPath, JSON.stringify(page, null, 2), "utf8");
  createdCount++;
  console.log(`Created model & snapshot for ${item.slug}.json`);
}

console.log(`\nBatch 1 complete: ${createdCount} pages migrated to Block System.`);
