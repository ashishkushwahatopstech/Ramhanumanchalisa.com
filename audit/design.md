# Comprehensive Block System Design Specification
**Branch:** `admin-pagebuilder`  
**Base Tag:** `pre-pagebuilder-backup`  
**Author:** CMS & SEO Architecture Team  
**Date:** 2026-11-10  
**Status:** Approved for Implementation (Stage 2 Exit Check)

---

## 1. Executive Summary & Design Principles

The Block System transforms RamHanumanChalisa.com from hardcoded Astro page templates into a modular, schema-validated, visual block-driven content architecture. The administrator can add, edit, reorder, duplicate, hide, and remove sections across **every page on the website** without modifying source code, while guaranteeing:
1. **Zero URL & SEO Regressions:** Every page's slug, canonical URL, title, meta description, H1, and JSON-LD schemas remain completely protected.
2. **Scripture Sanctity (Rule 3):** Sacred verses (Hanuman Chalisa, Ashtak, Baan, Stutis, Mantras) live in **LOCKED blocks** editable only under strict `scripture_editor` privileges with explicit warnings.
3. **Zero Unapproved Dependencies (Rule 4):** Operates on static JSON schema files (`src/data/pagebuilder/pages/*.json`) with zero external paid CMS or unapproved runtime dependencies.
4. **Static Build-Time Rendering:** All block content renders to pure, semantic, accessible HTML at build time for instant Google crawling and Core Web Vitals optimization.
5. **Fail-Safe Build Validation:** Every block and page is validated against strict JSON schemas at build time. Any malformed entry halts the build with a plain-language error message and never deploys broken content to production.

---

## 2. Directory & Storage Structure

```text
src/
├── data/
│   └── pagebuilder/
│       ├── pages/                      <-- Canonical page definitions keyed by slug
│       │   ├── home.json               <-- Homepage (/)
│       │   ├── sankat-mochan-hanumanashtak.json
│       │   ├── hanuman-jayanti.json
│       │   ├── bajrang-baan.json
│       │   ├── ram-chalisa.json
│       │   ├── hanuman-aarti.json
│       │   ├── hanuman-stuti.json
│       │   ├── hanuman-chalisa-meaning.json
│       │   ├── shri-hanuman-chalisa-path-vidhi.json
│       │   ├── ram-hanuman-chalisa.json
│       │   ├── hanuman-chalisa-audio-mp3.json
│       │   ├── hanuman-chalisa-pdf.json
│       │   ├── about.json
│       │   ├── contact.json
│       │   ├── faq.json
│       │   ├── privacy-policy.json
│       │   └── disclaimer.json
│       ├── original_snapshots/         <-- Read-only snapshots for "Reset to Original"
│       └── blockRegistry.ts            <-- Block schemas, definitions & renderer map
├── components/
│   └── pagebuilder/
│       ├── BlockRenderer.astro         <-- Master block dispatcher
│       ├── SectionContainer.astro      <-- 3-tier container (Section > Container > Columns)
│       └── blocks/                     <-- Modular UI block components
│           ├── HeroBlock.astro
│           ├── ScriptureBlock.astro    <-- [LOCKED]
│           ├── MeaningBlock.astro
│           ├── RichTextBlock.astro
│           ├── HeadingParagraphBlock.astro
│           ├── ImageBlock.astro
│           ├── GalleryBlock.astro
│           ├── DividerSpacerBlock.astro
│           ├── ContainerColumnsBlock.astro
│           ├── LinksListBlock.astro
│           ├── CallToActionBlock.astro
│           ├── AudioEmbedBlock.astro
│           ├── VideoEmbedBlock.astro
│           ├── FaqBlock.astro
│           ├── SidebarBlock.astro
│           ├── CategoryCardsBlock.astro
│           ├── RelatedArticlesBlock.astro
│           ├── LatestPostsBlock.astro
│           ├── InstagramCardBlock.astro
│           ├── InstagramGridBlock.astro
│           ├── WhatsAppShareBlock.astro
│           ├── SocialChannelsBlock.astro
│           ├── NewsletterBlock.astro
│           ├── CustomHtmlBlock.astro   <-- Sanitized allow-list
│           └── AdSlotBlock.astro       <-- [LOCKED RULES]
├── lib/
│   └── pagebuilder/
│       ├── schema.ts                   <-- TypeScript interfaces & Zod validators
│       ├── validator.ts                <-- Build-time validator & lint checks
│       └── store.ts                    <-- Page CRUD, version history & rollback logic
└── pages/
    └── admin/
        ├── pagebuilder/                <-- Admin interface for page editing
        │   ├── index.astro             <-- Page listing & search
        │   ├── [slug].astro            <-- Visual block editor & live preview
        │   └── reset.astro             <-- "Reset to Original" confirmation
        └── api/
            └── admin/
                └── pagebuilder/
                    ├── save.ts         <-- Page save API endpoint
                    ├── publish.ts      <-- Publish / Unpublish endpoint
                    └── reset.ts        <-- Reset to original endpoint
```

---

## 3. Page Model Specification

Every page is represented by a single JSON document keyed by its existing canonical URL slug:

```typescript
export interface PageModel {
  /** Read-only canonical slug for existing pages (e.g. "sankat-mochan-hanumanashtak") */
  slug: string;
  
  /** Template family determining available layouts and default schemas */
  template: "homepage" | "prayer_text" | "festival" | "article" | "benefit" | "story" | "category" | "legal_informational";
  
  /** Publication state. Drafts are automatically excluded from sitemap and noindexed. */
  status: "published" | "draft";
  
  /** If unpublished/draft, optional 301 redirect target to preserve SEO equity */
  redirectTarget?: string;
  
  /** Strict SEO metadata ensuring zero loss of search ranking */
  seo: {
    title: string;
    description: string;
    canonicalUrl: string;
    ogImage?: string;
    ogType?: "website" | "article";
    noindex?: boolean;
    language?: string;
    structuredData?: Record<string, any>;
  };

  /** Page-level heading structure configuration */
  h1: {
    text: string;
    subheading?: string;
    devanagariTag?: string;
  };

  /** Ordered array of sections (max 3 levels of nesting: Section > Container > Columns) */
  sections: SectionModel[];

  /** Audit & Version Control timestamps */
  auditMeta: {
    createdAt: string;
    updatedAt: string;
    updatedBy: string;
    version: number;
    hasScriptureModifications: boolean;
  };
}
```

---

## 4. Section & Block Nesting Hierarchy

The nesting hierarchy is strictly capped at **3 levels** to preserve rendering speed and maintain DOM simplicity:

```text
Level 1: Section (Visual background bands, vertical spacing, dividers)
  └── Level 2: Container (Max-width constraints: max-w-4xl, max-w-6xl, full-bleed)
        └── Level 3: Columns (1, 2, 3, or 4 columns)
              └── Blocks (Modular interactive devotional components)
```

```typescript
export interface SectionModel {
  id: string;
  name: string;
  visible: boolean;
  order: number;
  settings: {
    background: "warm_cream" | "soft_bg" | "maroon_deep" | "dark_brown" | "gradient_saffron" | "transparent";
    paddingY: "none" | "small" | "medium" | "large";
    width: "contained_4xl" | "contained_6xl" | "contained_7xl" | "full_width";
    hideOnMobile?: boolean;
    dividerTop?: boolean;
    dividerBottom?: boolean;
    customCssClass?: string;
  };
  containers: ContainerModel[];
}

export interface ContainerModel {
  id: string;
  columnsCount: 1 | 2 | 3 | 4;
  columns: ColumnModel[];
}

export interface ColumnModel {
  id: string;
  span?: number; // Tailwind grid span
  blocks: BlockInstance[];
}
```

---

## 5. Complete Block Registry (25 Block Types)

Every block instance follows the uniform schema:
`{ id: string, type: BlockType, visible: boolean, order: number, settings: BlockSettings, content: BlockContent }`

| Block Type | Locked? | Description & Allowed Content |
| :--- | :---: | :--- |
| `hero` | No | Full-width poster image, sacred Devanagari badge, grand H1, epigraph quote, primary/secondary/tertiary CTAs. |
| `scripture_verses` | **LOCKED** | Sacred hymns, chaupais, dohas, and stotras. Read-only for regular editors. Modifiable only by `scripture_editor` with safety alert. Byte-for-byte fidelity guaranteed. |
| `meaning_explanation` | No | Verse-by-verse word breakdown, Hindi Bhavaarth, English meaning, and spiritual benefit context. |
| `rich_text` | No | Markdown/HTML paragraphs, sacred bullet lists, Devanagari typography, blockquotes. |
| `heading_paragraph` | No | H2/H3 section headers, rubric markers (`॥ श्री हनुमते नमः ॥`), and explanatory lead copy. |
| `image` | No | High-res WebP/JPG devotional image with required alt text, caption, width/height, aspect ratio. |
| `gallery` | No | Multi-image devotional grid with lightbox preview and captions. |
| `divider_spacer` | No | Decorative gold carved divider with sacred symbols (`🪔`, `🕉️`, `🔔`, `🏹`, `✨`), or vertical whitespace spacers. |
| `container_columns`| No | Multi-column flexible layout (1 to 4 columns). |
| `links_list` | No | Categorized navigation links, quick scripture jumps, related topic lists. |
| `call_to_action` | No | Saffron/gold devotional banner, headline, description, action button with URL. |
| `audio_embed` | No | Synchronized Awadhi/Sanskrit audio player with recitation track selector and play/pause controls. |
| `video_embed` | No | Responsive 16:9 video embed from allow-listed sources (YouTube / Vimeo). Lazy-loaded with placeholder. |
| `faq_block` | No | Dynamic FAQ accordion with automatic schema.org `FAQPage` JSON-LD generation. |
| `sidebar_block` | No | Global or page-specific devotional sidebar gadgets (diya counter, recent posts, popular links). |
| `category_cards` | No | Visual grid linking to Hanuman Ji, Shri Ram, Shiv Ji, Ganesh Ji, Krishna Ji, and Durga Maa collections. |
| `related_articles` | No | Curated or auto-populated devotional articles from the editorial repository. |
| `latest_posts` | No | Live listing of latest published devotional hymns and guides. |
| `instagram_card` | No | Official follow card for `@ramhanumanchalisadotcom` with verified badge, bio, and follow CTA. |
| `instagram_grid` | No | Curated grid of devotional post cards linking directly to Instagram (manual URL list, zero scraping). |
| `whatsapp_share` | No | 1-tap WhatsApp sharing card with pre-formatted quote and URL. |
| `social_channels` | No | Community hub links (YouTube, Facebook, X, Telegram, Instagram). |
| `newsletter` | No | Morning blessings newsletter subscription form (`SubscriptionGadget`). |
| `custom_html` | No | Restricted sanitized HTML. Whitelisted tags only (`<div>`, `<p>`, `<span>`, `<a>`, `<img>`). No arbitrary `<script>` tags. |
| `ad_slot` | **LOCKED RULES** | Predefined Google AdSense slot (`aboveFold`, `inContent`, `footer`). Client `ca-pub-2458897753508445`. Forbidden near deceptive buttons or inside story viewer. Reserved CSS height prevents CLS. |

---

## 6. Strict Governance & Validation Rules

### 6.1 Heading Hierarchy & H1 Protection
- Every page must contain **exactly one H1**.
- If a page has 0 or >1 H1s, the validator rejects the save with: `Validation Error: Page must have exactly one H1 tag.`
- Heading order must not skip levels (e.g., H2 cannot be immediately followed by H4 without an H3).

### 6.2 Scripture Integrity Rules
- Any block of type `scripture_verses` is locked.
- If an editor attempts to edit a scripture block without the `scripture_editor` permission, the request is rejected with `403 Forbidden: Scripture verses are locked to prevent religious text corruption.`
- The text is compared against the baseline snapshot in `/audit/before.json` to verify byte-for-byte identity.

### 6.3 URL and SEO Protection
- The `slug` field is **permanently read-only** for all existing pages.
- Canonical URLs must strictly match `https://ramhanumanchalisa.com/{slug}` (or root for home).
- Draft pages are dynamically excluded from `sitemap.xml` and emit `<meta name="robots" content="noindex, nofollow" />`.

### 6.4 Ad Slot Positioning Rules
- Ad slots can only be placed in `aboveFold`, `inContent`, or `footer` positions.
- Ad slots must have reserved height (`min-h-[90px] sm:min-h-[250px]`) with `aspect-ratio` to prevent Cumulative Layout Shift (CLS target &le; 0.1).
- Ads are forbidden inside modal viewers (`StoryViewer`) or within 100px of primary scripture recitation buttons.

---

## 7. CSP & Security Headers Analysis

- **Allowed Embed Domains:**
  - `https://www.youtube.com`, `https://www.youtube-nocookie.com`
  - `https://www.instagram.com`
  - `https://api.whatsapp.com`
  - `https://pagead2.googlesyndication.com` (Google AdSense)
  - `https://www.googletagmanager.com`, `https://www.google-analytics.com`
- **Headers Configuration:** All external embeds will use sandboxed iframes (`sandbox="allow-scripts allow-same-origin allow-popups"`). No changes to Cloudflare `_headers` are required, preserving 100% compatibility with existing ad and analytics tags.

---

## 8. Exit Check Verification
- [x] Simple, zero-cost, Git-native block system designed.
- [x] Page model keys strictly by read-only existing slugs.
- [x] 25 block types specified with locked scripture and ad slot rules.
- [x] Static build-time rendering guarantees zero SEO regression.
- [x] Design doc saved at [`/audit/design.md`](file:///d:/ramhanumanchalisa/audit/design.md).
- **Stage 2 Exit Status:** PASSED. Proceeding to Stage 3.
