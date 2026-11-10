import fs from "node:fs";
import path from "node:path";

const beforeRaw = fs.readFileSync(path.resolve(process.cwd(), "audit/before.json"), "utf8");
const before = JSON.parse(beforeRaw);
const item = before.find((x) => x.url.includes("mahakal-chalisa"));

if (!item) {
  console.error("mahakal-chalisa not found in before.json");
  process.exit(1);
}

const page = {
  slug: "blog__mahakal-chalisa",
  template: "article",
  status: "published",
  seo: {
    title: item.title,
    description: item.metaDescription,
    canonicalUrl: item.canonical,
    ogType: "article",
    language: "en-US"
  },
  h1: {
    text: item.h1,
    subheading: "Sacred Stotra & Chaupais dedicated to Mahakaleshwar Jyotirlinga",
    devanagariTag: "॥ श्री महाकाल चालीसा ॥"
  },
  sections: [
    {
      id: "sec-mahakal-content",
      name: "Mahakal Chalisa Article Content",
      visible: true,
      order: 1,
      settings: {
        background: "transparent",
        paddingY: "medium",
        width: "contained_4xl"
      },
      containers: [
        {
          id: "cont-mahakal-content",
          columnsCount: 1,
          columns: [
            {
              id: "col-mahakal-content",
              blocks: [
                {
                  id: "blk-mahakal-rich-text",
                  type: "rich_text",
                  visible: true,
                  order: 1,
                  content: {
                    html: `<p>${item.metaDescription}</p>`
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
    updatedBy: "system_migration",
    version: 1,
    hasScriptureModifications: false
  }
};

const pagesDir = path.resolve(process.cwd(), "src/data/pagebuilder/pages");
const origDir = path.resolve(process.cwd(), "src/data/pagebuilder/original_snapshots");

fs.writeFileSync(path.join(pagesDir, "blog__mahakal-chalisa.json"), JSON.stringify(page, null, 2), "utf8");
fs.writeFileSync(path.join(origDir, "blog__mahakal-chalisa.json"), JSON.stringify(page, null, 2), "utf8");
console.log("Generated blog__mahakal-chalisa.json");
