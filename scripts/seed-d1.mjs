import fs from "fs";
import path from "path";
import { FALLBACK_BLOG_POSTS } from "../src/data/blog.js";
import { BENEFITS_DATA } from "../src/data/benefits.js";

function escapeSql(str) {
  if (str === null || str === undefined) return "NULL";
  return "'" + String(str).replace(/'/g, "''") + "'";
}

const sqlStatements = [];

// Seed Posts
for (const post of FALLBACK_BLOG_POSTS) {
  const id = `post-${post.slug}`;
  const now = new Date().toISOString();
  sqlStatements.push(`
INSERT INTO "Post" ("id", "slug", "title", "excerpt", "content", "published", "createdAt", "updatedAt")
VALUES (${escapeSql(id)}, ${escapeSql(post.slug)}, ${escapeSql(post.title)}, ${escapeSql(post.excerpt)}, ${escapeSql(post.content)}, 1, ${escapeSql(now)}, ${escapeSql(now)})
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "excerpt" = excluded."excerpt",
  "content" = excluded."content",
  "published" = 1;
`);
}

// Seed Benefits
for (const [key, b] of Object.entries(BENEFITS_DATA)) {
  const id = `benefit-${b.slug}`;
  const now = new Date().toISOString();
  const actionStepsJson = JSON.stringify(b.actionSteps || []);
  sqlStatements.push(`
INSERT INTO "Benefit" ("id", "slug", "title", "situation", "icon", "description", "recommendedChants", "targetVerseNumber", "targetVerseText", "targetVerseTranslation", "detailedExposition", "actionSteps", "published", "createdAt", "updatedAt")
VALUES (${escapeSql(id)}, ${escapeSql(b.slug)}, ${escapeSql(b.title)}, ${escapeSql(b.situation)}, ${escapeSql(b.icon)}, ${escapeSql(b.description)}, ${escapeSql(b.recommendedChants)}, ${b.targetVerseNumber || 1}, ${escapeSql(b.targetVerseText)}, ${escapeSql(b.targetVerseTranslation)}, ${escapeSql(b.detailedExposition)}, ${escapeSql(actionStepsJson)}, 1, ${escapeSql(now)}, ${escapeSql(now)})
ON CONFLICT("slug") DO UPDATE SET
  "title" = excluded."title",
  "situation" = excluded."situation",
  "description" = excluded."description",
  "detailedExposition" = excluded."detailedExposition",
  "published" = 1;
`);
}

// Seed Languages
const langs = ["hi", "en", "te", "bn", "kn", "gu", "mr"];
for (const lang of langs) {
  const filePath = path.resolve(process.cwd(), `src/data/chalisa/${lang}.json`);
  if (fs.existsSync(filePath)) {
    const raw = fs.readFileSync(filePath, "utf-8");
    const json = JSON.parse(raw);
    const id = `lang-${lang}`;
    const now = new Date().toISOString();
    sqlStatements.push(`
INSERT INTO "LanguageContent" ("id", "lang", "title", "metaDescription", "contentJSON", "published", "updatedAt")
VALUES (${escapeSql(id)}, ${escapeSql(lang)}, ${escapeSql(json.title || "Hanuman Chalisa")}, ${escapeSql(json.metaDescription || "")}, ${escapeSql(raw)}, 1, ${escapeSql(now)})
ON CONFLICT("lang") DO UPDATE SET
  "title" = excluded."title",
  "metaDescription" = excluded."metaDescription",
  "contentJSON" = excluded."contentJSON",
  "published" = 1;
`);
  }
}

const outSql = sqlStatements.join("\n");
fs.writeFileSync("prisma/seed.sql", outSql, "utf-8");
console.log(`Generated prisma/seed.sql with ${sqlStatements.length} statements.`);
