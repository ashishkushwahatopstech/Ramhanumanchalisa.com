import fs from "fs";
import path from "path";

// Read stories file
const storiesPath = path.resolve(process.cwd(), "src", "data", "stories.ts");
const content = fs.readFileSync(storiesPath, "utf8");

// Simple check
const hasStories = content.includes("export const DEVOTIONAL_STORIES");
if (!hasStories) {
  console.error("FAIL: DEVOTIONAL_STORIES export not found in src/data/stories.ts");
  process.exit(1);
}

// Dynamically evaluate stories
import("../src/data/stories.ts")
  .then(({ DEVOTIONAL_STORIES }) => {
    if (!Array.isArray(DEVOTIONAL_STORIES)) {
      throw new Error("DEVOTIONAL_STORIES is not an array");
    }

    const seenIds = new Set();
    const seenSlugs = new Set();
    let errors = 0;

    console.log(`\nValidating ${DEVOTIONAL_STORIES.length} Devotional Stories...\n`);

    DEVOTIONAL_STORIES.forEach((story, idx) => {
      const prefix = `[Story #${idx + 1}: ${story.slug || story.id || "unnamed"}]`;

      // 1. Unique ID
      if (!story.id) {
        console.error(`${prefix} Missing required field: id`);
        errors++;
      } else if (seenIds.has(story.id)) {
        console.error(`${prefix} Duplicate id: "${story.id}"`);
        errors++;
      } else {
        seenIds.add(story.id);
      }

      // 2. Unique URL Slug
      if (!story.slug) {
        console.error(`${prefix} Missing required field: slug`);
        errors++;
      } else if (!/^[a-z0-9-]+$/.test(story.slug)) {
        console.error(`${prefix} Invalid slug format (must be lowercase alphanumeric + hyphens): "${story.slug}"`);
        errors++;
      } else if (seenSlugs.has(story.slug)) {
        console.error(`${prefix} Duplicate slug: "${story.slug}"`);
        errors++;
      } else {
        seenSlugs.add(story.slug);
      }

      // 3. Titles
      if (!story.title || typeof story.title !== "string") {
        console.error(`${prefix} Missing or invalid 'title'`);
        errors++;
      }
      if (!story.hindiTitle || typeof story.hindiTitle !== "string") {
        console.error(`${prefix} Missing or invalid 'hindiTitle'`);
        errors++;
      }

      // 4. Category
      if (!story.category || typeof story.category !== "string") {
        console.error(`${prefix} Missing or invalid 'category'`);
        errors++;
      }

      // 5. Publication Status
      if (typeof story.published !== "boolean") {
        console.error(`${prefix} Missing or invalid boolean 'published'`);
        errors++;
      }

      // 6. SEO metadata
      if (!story.metaTitle || story.metaTitle.length < 10) {
        console.error(`${prefix} 'metaTitle' too short or missing`);
        errors++;
      }
      if (!story.metaDescription || story.metaDescription.length < 20) {
        console.error(`${prefix} 'metaDescription' too short or missing`);
        errors++;
      }

      // 7. Slides validation
      if (!Array.isArray(story.slides) || story.slides.length === 0) {
        console.error(`${prefix} Must have at least 1 slide in 'slides' array`);
        errors++;
      } else {
        story.slides.forEach((slide, sIdx) => {
          if (!slide.id) {
            console.error(`${prefix} Slide #${sIdx + 1} missing 'id'`);
            errors++;
          }
          if (!slide.title) {
            console.error(`${prefix} Slide #${sIdx + 1} missing 'title'`);
            errors++;
          }
          if (!slide.text) {
            console.error(`${prefix} Slide #${sIdx + 1} missing 'text'`);
            errors++;
          }
        });
      }

      const statusBadge = story.published ? "✓ PUBLISHED" : "○ DRAFT";
      console.log(`  ${statusBadge} | ${story.slug} (${story.slides?.length || 0} slides) - "${story.title}"`);
    });

    if (errors > 0) {
      console.error(`\nValidation failed with ${errors} error(s). Please correct them.`);
      process.exit(1);
    } else {
      console.log(`\nAll ${DEVOTIONAL_STORIES.length} stories passed schema validation successfully!\n`);
    }
  })
  .catch((err) => {
    console.error("Schema validation runner error:", err);
    process.exit(1);
  });
