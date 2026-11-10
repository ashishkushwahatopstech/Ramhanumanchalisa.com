# Devotional Story Content Management Guide (Admin & Contributor)

This guide documents the workflow for creating, previewing, and publishing interactive Instagram-style devotional web stories on **RamHanumanChalisa.com**.

---

## 1. Storage Location & Architecture

Stories are maintained in structured TypeScript/JSON within:
[`src/data/stories.ts`](file:///d:/ramhanumanchalisa/src/data/stories.ts)

Every published story automatically receives:
1. An on-site 9:16 interactive story card in the homepage circular highlights carousel.
2. A dedicated, shareable, indexable URL at `https://ramhanumanchalisa.com/stories/{slug}`.
3. Automated inclusion in `sitemap.xml`.
4. WhatsApp 1-tap share format with pre-encoded verse snippets.
5. Standard OpenGraph meta and `Article` schema markup.

---

## 2. Story Schema Reference

Each entry in `DEVOTIONAL_STORIES` conforms to the following schema:

```typescript
export interface StorySlide {
  id: string;              // Unique slide identifier (e.g., "slide-1")
  title: string;           // Slide heading (e.g., "Tulsidas in Fatehpur Sikri")
  badge?: string;          // Rubric badge (e.g., "प्राकट्य कथा • १")
  verse?: string;          // Devanagari sacred verse (e.g., "जो सत बार पाठ कर कोई...")
  verseMeaning?: string;   // English/Hindi verse translation
  text: string;            // Core narrative description (2-4 readable sentences)
  bgGradient?: string;     // Tailwind gradient classes (e.g., "from-[#4A1216] via-[#6B1E23] to-[#2B1B12]")
  image?: string;          // Optional background image path in /public/
}

export interface DevotionalStory {
  id: string;              // Unique story ID (e.g., "story-1")
  slug: string;            // URL-safe unique slug (e.g., "shri-hanuman-chalisa-origin")
  title: string;           // English story title
  hindiTitle: string;      // Devanagari sacred title
  category: string;        // Category name (e.g., "Hanuman Chalisa", "Mantras")
  coverIcon: string;       // Emoji or SVG icon for circular highlights (e.g., "🕉️", "⚡")
  published: boolean;      // true = LIVE & in sitemap, false = DRAFT (hidden from public)
  publishedAt: string;     // YYYY-MM-DD format
  metaTitle: string;       // SEO Title (50-60 chars)
  metaDescription: string; // SEO snippet description (120-155 chars)
  relatedUrl: string;      // Internal link to full website article/stotra
  relatedLabel: string;    // CTA button text (e.g., "Read Complete Meaning")
  slides: StorySlide[];    // Minimum 1 slide (typically 2-4 slides per story)
}
```

---

## 3. Workflow: Adding a New Story

### Step 1: Open `src/data/stories.ts`
Add a new story object to the `DEVOTIONAL_STORIES` array:

```typescript
{
  id: "story-9",
  slug: "hanuman-surya-dev-disciple",
  title: "Hanuman and Surya Dev",
  hindiTitle: "सूर्य देव एवं गुरु दक्षिणा",
  category: "Spiritual Knowledge",
  coverIcon: "☀️",
  published: true, // Set to false to keep as a draft
  publishedAt: "2026-11-10",
  metaTitle: "Story: Lord Hanuman and Surya Dev's Guru Dakshina",
  metaDescription: "Learn how Lord Hanuman flew backward across the cosmic sky to receive divine knowledge from Surya Dev.",
  relatedUrl: "/blog/hanuman-surya-dev-guru-dakshina",
  relatedLabel: "Read Complete Treatise",
  slides: [
    {
      id: "slide-1",
      title: "Seeking the Solar Preceptor",
      badge: "गुरु भक्ति • १",
      text: "Recognizing that Lord Surya illuminates the entire cosmos without pausing, Hanuman approached the Sun God requesting to be accepted as his disciple.",
      bgGradient: "from-[#C95716] via-[#E87524] to-[#4A1216]",
    },
    {
      id: "slide-2",
      title: "Flying Face-to-Face",
      badge: "अद्भुत साधना • २",
      text: "Because Surya Dev could never halt his solar chariot, Hanuman assumed a colossal form and flew backwards matching the chariot's speed to study all Vedas.",
      bgGradient: "from-[#4A1216] via-[#6B1E23] to-[#2B1B12]",
    }
  ]
}
```

### Step 2: Validate Schema
Run the automated validation script:

```bash
node scripts/validate_stories.mjs
```

If any field is missing or invalid, the validator reports the exact line and error.

### Step 3: Preview Locally
Run the development server or build:
```bash
npm run build
```
Preview at `http://localhost:4321/stories/your-slug`.

### Step 4: Commit and Push
```bash
git add src/data/stories.ts
git commit -m "feat(stories): add hanuman-surya-dev-disciple devotional story"
```
Cloudflare Pages will build and publish automatically.
