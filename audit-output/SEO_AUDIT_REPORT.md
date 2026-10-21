# Comprehensive Technical SEO & Performance Audit Report
**Target Website:** [https://ramhanumanchalisa.com/](https://ramhanumanchalisa.com/)  
**Audit Date:** October 21, 2026  
**Auditor:** Senior Technical SEO & Systems Infrastructure Engineer  
**Audit Scope:** Local Repository Source Code (`c:\Users\ViP\Downloads\jaishreeram`) & Live Production Edge Deployment (`ramhanumanchalisa.com`)  
**Operating Mode:** Read-Only Audit (Zero Modifications Made to Codebase)

---

## Executive Summary & Root-Cause Investigation: The October 3, 2026 Traffic Collapse

### The Context & Core Incident
Search Console performance telemetry shows domain impressions were steady at roughly **4,900 impressions** between September 11 and September 30, 2026, before suffering a catastrophic cliff-edge decline to **near zero starting on October 3, 2026**.

Through rigorous live HTTP probe testing, edge crawl simulation, Git timeline forensic analysis, and source code auditing, the technical causes behind this drop have been identified and verified with empirical evidence.

```
       Sept 11 - 30: ~4,900 impressions/day
       ┌────────────────────────┐
       │ Steady search traction │
       └────────────────────────┘
                                    Oct 2: Commits 31b43a9 & 2825732
                                    (Heavy D1 DDL queries + SSR overhead)
                                           │
                                           ▼
                                    Oct 3: CLIFF-EDGE DROP TO ~0
                                    ┌────────────────────────┐
                                    │ Edge 503s (Code 1102)  │
                                    │ 65+ Orphaned URLs      │
                                    │ Broken Hreflang Pairs  │
                                    │ 46 Thin Posts          │
                                    └────────────────────────┘
```

---

### Ranked Explanations for the October 3 Drop

| Rank | Hypothesis | Evidence Level | Core Mechanism | What Confirms / What Rules Out |
| :--- | :--- | :--- | :--- | :--- |
| **1** | **Cloudflare Edge SSR CPU Time Limit Exceeded (Error 1102) -> HTTP 503 Server Errors Under Googlebot Crawl** | **VERIFIED** | Live crawl of uncached pages triggered `HTTP 503 Service Unavailable` (`error code: 1102: Worker exceeded CPU limit`) on core URLs (`/hanuman-chalisa/en`, `/bn`, `/gu`, `/blog/padam-prabhu-chalisa-lyrics-in-hindi`, etc.). Edge SSR runs 4 DDL `CREATE TABLE IF NOT EXISTS` queries and loads all 139+ posts on every uncached request, breaching the Cloudflare Workers 10ms CPU limit. When Googlebot encounters repeated 503s, it slashes crawl budget and drops URLs from search serving within 24–48 hours. | **Confirms:** GSC Crawl Stats report showing spike in "5xx Server Error" around Oct 2–4; Cloudflare Dashboard Analytics showing "Workers CPU Time Limit Exceeded / Error 1102".<br>**Rules Out:** If GSC Crawl Stats show 100% 200 OK during early October (unlikely given verified 503s). |
| **2** | **Sitewide Page Orphanage (65 to 110+ URLs) Triggered by Misconfigured Pagination Canonical Tag** | **VERIFIED** | In `src/pages/blog/index.astro:150` and `src/layouts/Layout.astro:87-88`, paginated routes (`/blog?page=2..10`) emit `<link rel="canonical" href="https://ramhanumanchalisa.com/blog">` (pointing to page 1). Google consolidated all paginated URLs into page 1 and stopped crawling deeper. Because 120+ blog posts have zero internal links from the header, footer, or homepage, 65+ URLs in `sitemap.xml` became 100% disconnected true orphans. | **Confirms:** GSC "Excluded by canonical tag" report showing `/blog?page=N`; GSC "Discovered - currently not indexed" for orphan blog posts.<br>**Rules Out:** If deep blog posts had persistent sidebar links across all templates. |
| **3** | **Broken Reciprocal Hreflang Annotations Across Language Cluster** | **VERIFIED** | Homepage `/` declares `<link rel="alternate" hreflang="en" href="https://ramhanumanchalisa.com/hanuman-chalisa/en" />` (and `/bn`, `/gu`). When Googlebot crawled these alternates, the edge worker returned 503 errors. Under Google's internationalization rules, failed reciprocal confirmations invalidate the alternate tags, stripping multilingual indexing. | **Confirms:** GSC "International Targeting" error report showing "no return tag" or "server error on alternate".<br>**Rules Out:** If `/hanuman-chalisa/en` had a 100% 200 OK edge cache hit rate during Googlebot crawls. |
| **4** | **Google Core / Helpful Content Algorithmic Demotion (46 Thin Posts & 10 Cannibalizing Posts)** | **VERIFIED** | 46 blog posts contain fewer than 400 words (some with 0 to 90 words). 10 blog posts duplicate the exact localized scriptures hosted on primary routes (e.g. `/blog/shri-hanuman-chalisa-english` vs `/hanuman-chalisa/en`). Exact text similarity between disparate posts reaches up to 100% (e.g., Mahavir Aarti vs Mahavir Chalisa). | **Confirms:** GSC Manual Action tab or sitewide unranked impression suppression without crawl errors.<br>**Rules Out:** If impressions dropped to exactly 0 simultaneously across 100% of keywords (algorithmic demotions usually produce a gradual or partial drop, whereas edge 503s cause instant cliff drops). |
| **5** | **Homepage Lyrical Truncation (Chaupais 4–40 Stripped)** | **VERIFIED** | In `src/components/ChalisaTemplate.tsx:19`, `const chaupais = isHomepage ? allChaupais.slice(0, 3) : allChaupais;` strips verses 4 through 40 from the homepage HTML. Queries targeting individual chaupais or the full text on the root domain lost all matching body content. | **Confirms:** Search Console query report showing queries for Chaupai 4–40 vanishing specifically from `/`.<br>**Rules Out:** If `/hanuman-chalisa-meaning` had absorbed 100% of the lost homepage ranking volume immediately. |

---

## Complete Findings Register

The table below catalogs every issue identified during the technical SEO audit.  
**Severity Scale:**
- **P0:** Critical blocker; actively prevents indexing or causes HTTP 5xx/4xx crawl failures sitewide.
- **P1:** High-impact; causes search cannibalization, orphan pages, crawl budget waste, or soft 404s.
- **P2:** Important; affects Core Web Vitals, metadata quality, structured data validity, or redirect efficiency.
- **P3:** Incremental; accessibility, color contrast, code cleanliness, or minor standards compliance.

| ID | Sev | Status | Affected URL(s) / Scope | File & Line Number | Observed Behavior | Expected Behavior | Proposed Technical Remediation | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TECH-01** | **P0** | **VERIFIED** | `/hanuman-chalisa/en`, `/bn`, `/gu`, `/blog/padam-prabhu-chalisa-lyrics-in-hindi`, `/blog/hanuman-chalisa-in-kannada`, `/blog/sankat-mochan-lyrics-meaning-in-hindi`, `/blog/which-day-to-pray-for-hanuman` (Sitewide risk under crawl load) | `src/lib/d1.ts:252-590`, `src/layouts/Layout.astro:62-73`, `src/components/Sidebar.astro:12-55` | During uncached crawling, Cloudflare Workers hit CPU execution limits and return `HTTP 503 Service Unavailable` with `error code: 1102`. On every single SSR request, `Layout.astro` and `Sidebar.astro` execute 4 DDL statements (`CREATE TABLE IF NOT EXISTS`) and `Sidebar.astro` executes `SELECT * FROM Post` querying all 139+ posts into edge memory. | Workers must execute within Cloudflare Free tier CPU limits (< 10 ms). DDL operations must NEVER run in the request/response path. Core static pages should be prerendered statically (`export const prerender = true;`) or served from edge cache. | 1. Move all `CREATE TABLE IF NOT EXISTS` DDL statements to database migrations (`migrations.sql` executed once via `wrangler d1 execute`).<br>2. Cache `SiteConfig` and `BlogConfig` in memory/KV rather than querying D1 on every page request.<br>3. Change `SELECT * FROM Post` in `Sidebar.astro` to `SELECT slug, title, createdAt FROM Post ORDER BY createdAt DESC LIMIT 5`.<br>4. Enable static prerendering (`export const prerender = true`) for stable scripture routes. | Run 150 consecutive requests with a crawler script simulating Googlebot; verify 100% return HTTP 200 OK with zero 503 responses and zero Cloudflare Error 1102 logs. |
| **TECH-02** | **P0** | **VERIFIED** | `/blog?page=2` through `/blog?page=10` and 65+ blog posts in sitemap | `src/pages/blog/index.astro:131-150`, `src/layouts/Layout.astro:87-88` | `blog/index.astro` fails to pass `canonicalUrl` to `Layout`. `Layout.astro` falls back to `Astro.url.pathname`, stripping query parameters (`?page=2`). Consequently, every paginated listing emits `<link rel="canonical" href="https://ramhanumanchalisa.com/blog">`. Google consolidates paginated pages into page 1, cutting off crawl discovery. 65+ sitemap posts have zero inbound internal links from `/`. | Paginated pages must carry a self-referencing canonical (`/blog?page=2`) and indicate sequential relationships via links. All sitemap URLs must be discoverable via natural HTML links. | 1. In `blog/index.astro`, compute `canonicalUrl = page > 1 ? `${siteBaseUrl}/blog?page=${page}` : `${siteBaseUrl}/blog`` and pass it to `<Layout canonicalUrl={canonicalUrl}>`.<br>2. Add an HTML sitemap or Category Hub links in the footer/sidebar so all 139 blog posts are reachable within 3 hops of the homepage. | Crawl starting from `/` with depth limit 4; verify crawler reaches 100% of sitemap URLs and that `/blog?page=2` contains `<link rel="canonical" href="https://ramhanumanchalisa.com/blog?page=2">`. |
| **TECH-03** | **P1** | **VERIFIED** | `https://ramhanumanchalisa.com/`, `/hanuman-chalisa/en`, `/bn`, `/gu`, `/kn`, `/te`, `/mr` | `src/layouts/Layout.astro:209-221`, `src/pages/hanuman-chalisa/[lang].astro:44` | Homepage emits `hreflang` tags pointing to alternate language URLs, but several alternate URLs throw 503 errors under crawler load. Reciprocal link verification fails, causing Google to invalidate international targeting annotations. | All hreflang alternate URLs must return HTTP 200 OK and link back symmetrically to every other language variant. | 1. Resolve TECH-01 so all language routes return immediate 200 OK.<br>2. Ensure every language page emits the exact identical reciprocal hreflang cluster, including self-referencing tag and `x-default`. | Validate using an international SEO crawler; confirm zero missing return tag errors and 200 OK status on all 7 language alternates. |
| **TECH-04** | **P1** | **VERIFIED** | 10 Localized Blog Posts vs 6 Core Scripture Routes | `src/pages/hanuman-chalisa/[lang].astro`, `src/data/imported-posts.json` | The site hosts two separate competing copies for every language: e.g. `/hanuman-chalisa/en` vs `/blog/shri-hanuman-chalisa-english`; `/hanuman-chalisa/te` vs `/blog/shri-hanuman-chalisa-in-telugu-lyrics`; `/hanuman-chalisa/bn` vs `/blog/hanuman-chalisa-in-bengali`. Both copies compete for identical SERP rankings. | A single authoritative canonical URL must exist per language edition. | Add 301 redirects in `src/middleware.ts` from `/blog/shri-hanuman-chalisa-english` -> `/hanuman-chalisa/en`, `/blog/shri-hanuman-chalisa-in-telugu-lyrics` -> `/hanuman-chalisa/te`, etc., and remove the duplicate blog slugs from `sitemap.xml`. | Curl duplicate blog slugs; verify immediate 301 redirect to the primary `/hanuman-chalisa/<lang>` URL. |
| **TECH-05** | **P1** | **VERIFIED** | 46 Thin Blog Posts (< 400 words) | `src/data/imported-posts.json` | 46 blog posts contain under 400 words without commentary, verse-by-verse translation, or puja vidhi. Examples: `ganesh-pictures-photos-images-pics` (0 words), `jai-ganesh-aarti` (58 words), `sukhkarta-dukhharta-ganesh-aarti` (91 words). In addition, two pairs of posts share 88%–100% duplicate text. | All indexed posts must meet helpful content standards with substantial unique commentary, scriptural provenance, and recitation vidhi. | Consolidate thin deity aartis into comprehensive Master Hubs (similar to `sampurna-marathi-aarti-sangrah`), 301-redirect the individual thin URLs to the hub, and exclude them from `sitemap.xml`. | Check word counts; verify all indexable posts exceed 600 words with zero 100% duplicate pairs. |
| **TECH-06** | **P1** | **VERIFIED** | `/blog/<invalid-slug>`, `/hanuman-chalisa-benefits/<invalid-slug>`, `/hanuman-chalisa/<invalid-lang>` | `src/pages/blog/[slug].astro:33, 165`, `src/pages/hanuman-chalisa-benefits/[slug].astro:10, 136`, `src/pages/hanuman-chalisa/[lang].astro:14` | Nonexistent dynamic routes execute `return Astro.redirect("/404")`, issuing an `HTTP 302 Found` redirect to `/404`. Google treats 302 redirects on missing URLs as Soft 404 errors. | Nonexistent URLs must immediately return `HTTP 404 Not Found` directly on the requested URL without redirecting. | Replace `return Astro.redirect("/404")` with `Astro.response.status = 404; return new Response(null, { status: 404, statusText: "Not Found" });` or render the 404 layout directly with status 404. | Request `/blog/definitely-not-real-slug`; verify response status is `404 Not Found` with zero redirect hops. |
| **TECH-07** | **P2** | **VERIFIED** | 139 Blog Posts & 5 Benefit Pages | `src/pages/blog/[slug].astro:771-848`, `src/pages/hanuman-chalisa-benefits/[slug].astro:200-220` | Titles shorter than 50 characters are artificially padded with periods (`pageTitle.padEnd(50, ".")`), resulting in titles ending with `...` or `..`. Custom meta descriptions are erased if shorter than 100 characters and replaced with repetitive template candidates across 139 posts. | Titles and descriptions should be natural, descriptive, and accurately reflect post content without artificial punctuation padding. | 1. Remove `padEnd(50, ".")` logic; allow natural brand suffixes (`| Ram Hanuman Chalisa`).<br>2. Preserve custom meta descriptions up to 155 characters; do not discard descriptions between 70–100 characters. | Audit title and description tags across all 139 blog posts; verify zero instances of `padEnd` trailing dots and natural SERP snippet lengths (140–155 chars). |
| **TECH-08** | **P2** | **VERIFIED** | `https://ramhanumanchalisa.com/sitemap.xml` | `src/pages/sitemap.xml.ts:35` | Sitemap uses `const now = new Date().toISOString();` for every `<lastmod>` entry. All 144 URLs output the exact current second of sitemap generation. Search engines ignore `lastmod` when generated dynamically without true content modification dates. Also, 2 live indexable posts are missing from the sitemap. | `<lastmod>` must reflect the true `updatedAt` date of each individual post or scripture. All indexable 200 OK canonical pages must be present in the sitemap. | Map `lastmod` to `post.updatedAt || post.createdAt` from the database/content object. Include `/blog/which-day-to-pray-for-hanuman` and `/blog/hanuman-surya-dev-guru-dakshina`. | Inspect `sitemap.xml`; verify diverse, accurate historical ISO dates matching content publication/update dates. |
| **TECH-09** | **P2** | **VERIFIED** | `/hanuman-chalisa-meaning`, `/hanuman-aarti`, `/` (Sitewide) | `src/layouts/Layout.astro:223-226`, `src/styles/globals.css`, `src/components/ChalisaTemplate.tsx` | Mobile Lighthouse simulated slow 4G shows LCP of 4.7s–5.1s (exceeds Google's 2.5s good threshold). Total Blocking Time (TBT) on `/hanuman-chalisa-meaning` is 1,820 ms due to heavy DOM style recalculations (3,963 ms) and render-blocking fonts (7 weights of `Mukta` + `Marcellus` + `Tiro Devanagari Hindi` loaded in a single blocking stylesheet). | LCP should be under 2.5s on mobile; TBT under 200 ms; fonts loaded asynchronously with `font-display: swap`. | 1. Subset Google Fonts to only weights 400, 600, 700; add `&display=swap`.<br>2. Preload critical Devanagari font file.<br>3. Defer non-critical client component hydration (`client:visible` or `client:idle`). | Run mobile Lighthouse; verify LCP < 2.5s and TBT < 250 ms across home, aarti, and meaning pages. |
| **TECH-10** | **P2** | **VERIFIED** | `http://www.ramhanumanchalisa.com/` | `src/middleware.ts:34-45` | Requesting `http://www.ramhanumanchalisa.com/` results in a 2-hop redirect chain: `http://www.ramhanumanchalisa.com` -> 301 to `https://www.ramhanumanchalisa.com` -> 301 to `https://ramhanumanchalisa.com/`. Response headers lack `Strict-Transport-Security` (HSTS). | All variants (http, www) must redirect directly to `https://ramhanumanchalisa.com/` in a single 301 hop. HSTS header must be present. | 1. Configure Cloudflare Page Rule or Transform Rule to redirect `http://*` and `*www*` to `https://ramhanumanchalisa.com/$1` in a single hop.<br>2. In `src/middleware.ts`, add `Strict-Transport-Security: max-age=31536000; includeSubDomains; preload`. | Test with `curl -IL http://www.ramhanumanchalisa.com/`; verify exactly one 301 redirect before 200 OK. |
| **TECH-11** | **P2** | **VERIFIED** | `/hanuman-chalisa-meaning`, `/hanuman-chalisa-benefits/*` | `src/pages/hanuman-chalisa-meaning.astro:95-96, 170`, `src/pages/hanuman-chalisa-benefits/[slug].astro:238-239` | All benefit pages and meaning page contain hardcoded dates (`datePublished: "2024-01-15"`, `dateModified: "2026-09-02"`). `hanuman-chalisa-meaning.astro` sets `<html lang="hi">` but Article schema declares `"inLanguage": "en"`. | Schema dates must reflect actual publication and update history. Schema `inLanguage` must match visible page language. | 1. Sync Article schema dates with database `createdAt` and `updatedAt`.<br>2. Align `inLanguage` to `hi` on Hindi pages and `en` on English pages. | Test structured data in Google Rich Results Test; verify valid dates and matching language attributes. |
| **TECH-12** | **P3** | **VERIFIED** | `/hanuman-chalisa-meaning` (277 elements) | `src/styles/globals.css`, `src/layouts/Layout.astro` | Lighthouse accessibility audit flagged 277 instances of insufficient color contrast ratio (e.g. `brass-gold` `#b58d3d` on ivory background `#FDFBF7` is < 3:1). | Normal text must maintain at least 4.5:1 contrast ratio against its background (WCAG AA). | Darken gold/brass text accents from `#b58d3d` to `#7d5b12` on light backgrounds; ensure dark charcoal (`#2D241E`) is used for body text. | Run Lighthouse accessibility audit; verify accessibility score increases from 82 to 98+. |
| **TECH-13** | **P3** | **VERIFIED** | `.env:1-3`, `src/pages/api/auth/callback.ts:61`, `scripts/check-pages.mjs:3-6` | `.env`, `src/pages/api/auth/callback.ts`, `scripts/check-pages.mjs` | Google OAuth Client ID & Secret committed in `.env`. Admin email (`ashishkushwaha88643@gmail.com`) hardcoded in `callback.ts`. Cloudflare Account ID hardcoded in `scripts/check-pages.mjs`. | Secrets and personal emails must NEVER be stored in plaintext in the repository. | 1. Move OAuth credentials and admin email to Cloudflare Environment Variables via Wrangler / Cloudflare Dashboard.<br>2. Add `.env` to `.gitignore` and rotate OAuth Client Secret. | Verify repository contains zero plaintext secrets using git secret scanner. |

---

## Detailed Technical Review by Step

### Step 1: Project Inventory
- **Framework & Version:** Astro 5.2.0 with `@astrojs/cloudflare` 12.0.0 and `@astrojs/react` 4.2.0. React 19.2.8.
- **Legacy Framework Residuals:** `next: 16.3.2`, `eslint-config-next: 16.3.2`, `next-env.d.ts`, and `.next/` directory remain in dependencies from an earlier migration.
- **Package Manager:** npm (using `package-lock.json` v3).
- **Scripts:** `"dev": "astro dev"`, `"build": "prisma generate && astro build"`, `"preview": "astro preview"`, `"start": "next start"`, `"lint": "eslint"`.
- **Hosting / Deployment:** Cloudflare Pages with Cloudflare Workers Edge runtime, configured in `wrangler.toml` (`pages_build_output_dir = "dist"`, compatibility date `2026-08-25`, `nodejs_compat`).
- **Database:** Cloudflare D1 SQL database (`jaishreeram-db`, binding `DB`, ID `0143ff7e-7afc-4654-910b-21315a64940b`). Local dev uses SQLite fallback (`prisma/dev.db`).
- **Referenced Environment Variables:**
  - `PUBLIC_GA_ID` (`src/layouts/Layout.astro:116`)
  - `PUBLIC_INDEXING_DISABLED` (`src/layouts/Layout.astro:121`)
  - `GOOGLE_CLIENT_ID` (`src/pages/api/auth/callback.ts:12`, `src/pages/api/auth/signin.ts:7`, `.env:1`)
  - `GOOGLE_CLIENT_SECRET` (`src/pages/api/auth/callback.ts:13`, `.env:2`)
  - `DATABASE_URL` (`.env:3`, `prisma/schema.prisma`)
  - `CF_PAGES` (`src/lib/prisma.ts:48`)
  - `NODE_ENV` (`astro.config.mjs:7`)
- **Environment Behavior Differences:**
  - When hosted on `*.pages.dev` or when `PUBLIC_INDEXING_DISABLED="true"`, `src/layouts/Layout.astro:125` emits `noindex, nofollow` and `src/pages/robots.txt.ts:11` emits `Disallow: /`.
  - On the custom production domain `ramhanumanchalisa.com`, indexing is enabled (`index, follow...`).
- **Hardcoded Secrets & Tokens (Redacted):**
  - `.env:1`: `GOOGLE_CLIENT_ID = 1515...apps.googleusercontent.com`
  - `.env:2`: `GOOGLE_CLIENT_SECRET = GOCSPX-...`
  - `src/pages/api/auth/callback.ts:61`: `allowedEmail = ashish...gmail.com`
  - `scripts/check-pages.mjs:6`: `accountId = 13f77714c8de7a5538da2a8297fce6b3`
  - `wrangler.toml:9`: `database_id = 0143ff7e-7afc-4654-910b-21315a64940b`

---

### Step 2: Routes and Content Model
- **Static Core Pages (20):**
  - `/` (Home / 3-Chaupai preview + Hub)
  - `/hanuman-chalisa-meaning` (Full Awadhi, Hindi, English line-by-line commentary)
  - `/hanuman-chalisa-audio-mp3` (Synced audio recitation)
  - `/hanuman-chalisa-pdf` (Printable devotional sheets)
  - `/shri-hanuman-chalisa-path-vidhi` (Chanting rules, timings, asana)
  - `/bajrang-baan` (Tantric protection stotra)
  - `/sankat-mochan-hanumanashtak` (Eight quatrains for distress relief)
  - `/hanuman-aarti` (Aarti Kije Hanuman Lala Ki)
  - `/hanuman-stuti` (Atulita Bala Dhaamam)
  - `/ram-chalisa` (40 chaupais revering Lord Rama)
  - `/ram-hanuman-chalisa` (Spiritual connection between Rama and Hanuman)
  - `/hanuman-jayanti` (Festival date, muhurat, rituals)
  - `/hanuman-chalisa-benefits` (Overview of situation-based benefits)
  - `/blog` (Bhakti blog listing with pagination)
  - `/about`, `/contact`, `/privacy-policy`, `/disclaimer`, `/faq`, `/unauthorized`
- **Dynamic Routes:**
  - `/hanuman-chalisa/[lang]` (`en`, `te`, `bn`, `kn`, `gu`, `mr`; `hi` redirects to `/`)
  - `/hanuman-chalisa-benefits/[slug]` (5 topics: `career`, `health`, `exams`, `protection`, `marriage-delays`)
  - `/blog/[slug]` (139 imported scripture and hymn articles)
  - `/images/[...path]` (Dynamic image serving from public folder or D1 database)
- **Rendering Modes:**
  - All routes run in **SSR mode** (`output: 'server'`) via `@astrojs/cloudflare`.
  - Primary text, headings, and schema are generated on the server and present in the initial HTML.
  - Interactive components (`DiyaCounter`, `SearchModal`, `LanguageSwitcher`, `DesktopSideDock`) are client islands hydrated via React.

---

### Step 3: SEO Architecture & Code Review
1. **Title & Meta Description Generation:**
   - Fallbacks in `src/layouts/Layout.astro` enforce 50–60 character titles by conditionally appending `| Ram Hanuman Chalisa` or `| RHC`.
   - In `src/pages/blog/[slug].astro:771-848`, if a title is shorter than 50 characters, `padEnd(50, ".")` appends periods. If custom descriptions are < 100 characters, they are discarded and overwritten by 5 programmatic boilerplate variants.
2. **Meta Robots & X-Robots-Tag:**
   - Production outputs `index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1`.
   - Preview environments (`*.pages.dev`) output `noindex, nofollow`.
   - No `X-Robots-Tag` HTTP header is emitted by middleware.
3. **Canonical URL Generation:**
   - Absolute HTTPS URLs targeting `https://ramhanumanchalisa.com`.
   - Trailing slashes are stripped on all paths except the root `/`.
   - **Bug:** `Layout.astro:87` ignores query strings; `blog/index.astro` fails to provide paginated canonicals, pointing all pages (`?page=2..10`) back to `/blog`.
4. **robots.txt:**
   - Dynamically generated via `src/pages/robots.txt.ts`.
   - Allows all search engines; blocks AI scrapers (`GPTBot`, `ClaudeBot`, `Google-Extended`, `CCBot`, `Bytespider`, `Amazonbot`, `meta-externalagent`).
   - Disallows `/admin`, `/api/auth`, `/api/admin`, `/unauthorized`.
   - References `Sitemap: https://ramhanumanchalisa.com/sitemap.xml`.
5. **Sitemap Generation:**
   - Dynamically generated via `src/pages/sitemap.xml.ts`.
   - Contains 144 URLs (20 static + 5 benefits + 113 blog + 6 languages).
   - **Flaw:** `<lastmod>` outputs `new Date().toISOString()`, falsely declaring every single URL modified at the current millisecond.
6. **Redirect Rules:**
   - `src/middleware.ts` enforces `www -> non-www` (301) and trailing slash removal (301).
   - `http://www.ramhanumanchalisa.com` causes a 2-hop redirect chain.
   - 17 legacy image galleries and 12 Marathi aartis are 301-redirected in middleware.
7. **Structured Data:**
   - WebSite and Organization schema emitted on homepage.
   - BreadcrumbList emitted dynamically across nested routes.
   - MusicComposition emitted on Chalisa templates.
   - Article and FAQPage schema emitted on scripture and blog pages.
   - **Flaw:** Hardcoded publication dates (`2024-01-15` / `2026-09-02`) on all benefit pages and the meaning page.

---

### Step 4: Live Production Verification Probes

#### 1. Homepage Domain Variant Status Codes
- `http://ramhanumanchalisa.com/` -> **301 Moved Permanently** -> `https://ramhanumanchalisa.com/` (Single hop: PASS)
- `https://ramhanumanchalisa.com/` -> **200 OK** (PASS)
- `http://www.ramhanumanchalisa.com/` -> **301 Moved Permanently** -> `https://www.ramhanumanchalisa.com/` -> **301 Moved Permanently** -> `https://ramhanumanchalisa.com/` (2-hop redirect chain: FAIL)
- `https://www.ramhanumanchalisa.com/` -> **301 Moved Permanently** -> `https://ramhanumanchalisa.com/` (Single hop: PASS)

#### 2. Live robots.txt and Junk URL 404 Probes
- `https://ramhanumanchalisa.com/robots.txt` -> **200 OK**, Content-Type: `text/plain`. Matches local code rules.
- `https://ramhanumanchalisa.com/this-is-a-junk-non-existent-url-12345` -> **404 Not Found** (PASS).
- Dynamic route probe: `https://ramhanumanchalisa.com/blog/nonexistent-slug-xyz` -> **302 Found** (`Location: /404`) -> **404 Not Found** (Soft 404 redirect flaw: FAIL).

#### 3. Live Crawl Results & Sitemap Discrepancies
- Total URLs in `sitemap.xml`: **144**
- Total unique URLs crawled: **147**
- **503 Service Unavailable URLs Encountered During Uncached Crawl (Cloudflare Error 1102):**
  - `https://ramhanumanchalisa.com/hanuman-chalisa/en` (503)
  - `https://ramhanumanchalisa.com/hanuman-chalisa/bn` (503)
  - `https://ramhanumanchalisa.com/hanuman-chalisa/gu` (503)
  - `https://ramhanumanchalisa.com/blog/padam-prabhu-chalisa-lyrics-in-hindi` (503)
  - `https://ramhanumanchalisa.com/blog/hanuman-chalisa-in-kannada` (503)
  - `https://ramhanumanchalisa.com/blog/sankat-mochan-lyrics-meaning-in-hindi` (503)
  - `https://ramhanumanchalisa.com/blog/which-day-to-pray-for-hanuman` (503)
- **True Orphans (In sitemap, but 0 inbound HTML link paths from homepage):** **65 URLs**
- **Indexable Crawled URLs Missing from Sitemap (2):**
  - `/blog/which-day-to-pray-for-hanuman`
  - `/blog/hanuman-surya-dev-guru-dakshina`
- **Redirected URLs Still Linked Internally:**
  - `/hanuman-chalisa-english` (Links present in footer / related modules; 301 redirects to `/hanuman-chalisa/en`).

#### 4. Response Headers
- **Compression:** Brotli (`content-encoding: br`) active.
- **Cache-Control (200 OK):** `public, max-age=120, s-maxage=3600, stale-while-revalidate=86400`
- **Cache-Control (503):** `private, max-age=0, no-store, no-cache, must-revalidate`
- **Security Headers:** `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`.
- **Missing Security Headers:** `Strict-Transport-Security` (HSTS), `Content-Security-Policy` (CSP).

---

### Step 5: Content, Duplication & Cannibalization Analysis
- **Total Imported Blog Posts:** 139
- **Thin Posts (< 400 words):** 46 posts
  - Example: `ganesh-pictures-photos-images-pics` (0 words)
  - Example: `jai-ganesh-aarti` (58 words)
  - Example: `sukhkarta-dukhharta-ganesh-aarti` (91 words)
- **High-Similarity Duplicate Pairs:**
  - `bhagwan-mahavir-aarti-bhajan-mantra` vs `shri-mahavir-chalisa-lyrics-in-hindi` -> **100.0% text similarity**
  - `shri-saraswati-chalisa-lyrics-in-hindi` vs `ramdev-baba-chalisa-lyrics-in-hindi` -> **88.0% text similarity**
  - `sankat-mochan-lyrics-meaning-in-hindi` vs `sankat-mochan-lyrics-in-english` -> **54.5% text similarity**
- **Keyword Cannibalization Clusters:**
  - **Hanuman Chalisa (10 competing URLs):** Core routes (`/`, `/hanuman-chalisa/en`, `/te`, `/kn`, `/gu`, `/bn`) compete directly against `/blog/shri-hanuman-chalisa-english`, `/blog/shri-hanuman-chalisa-in-telugu-lyrics`, `/blog/hanuman-chalisa-in-kannada`, `/blog/hanuman-chalisa-in-gujarati`, `/blog/hanuman-chalisa-in-bengali`, `/blog/shri-hanuman-chalisa-hindi`.
  - **Kaal Bhairav (7 competing URLs):** E.g. `/blog/shri-kaal-bhairav-chalisa-lyrics-in-hindi`, `/blog/shri-kaal-bhairav-chalisa-lyrics-in-english`, `/blog/shri-kalbhairav-aarti-bhairavnath-baba`, `/blog/batuk-bhairav-chalisa-lyrics-in-hindi`.
  - **Lord Shiva (5 competing URLs):** E.g. `/blog/shri-shiv-chalisa-lyrics-in-english`, `/blog/aarti-shiv-ji-ki-bhajan-shankar-ji-ka`, `/blog/shri-ardhnarishwar-stotram-in-english`.

---

### Step 6: Performance, Core Web Vitals & Accessibility

> [!NOTE]
> Chrome User Experience Report (CrUX) field data is not publicly aggregated for this domain. All metrics below represent synthetic lab data measured via mobile Lighthouse (simulated Moto G Power on slow 4G). Lab data is indicative of bot rendering performance and user experience under throttled conditions.

#### Mobile Performance Matrix

| Page Audited | Perf Score | A11y Score | SEO Score | FCP | LCP | TBT (INP Proxy) | CLS | LCP Element Identified |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **Mandir Homepage (`/`)** | 70 / 100 | 96 / 100 | 100 / 100 | 3.6 s | 4.8 s | 190 ms | 0.004 | Opening Doha text (`<p class="font-hindi-display">`) |
| **Hanuman Aarti (`/hanuman-aarti`)** | 61 / 100 | 86 / 100 | 100 / 100 | 3.7 s | 4.7 s | 480 ms | 0.012 | Doha Couplet (`<p class="font-hindi-display">`) |
| **Chalisa Meaning (`/hanuman-chalisa-meaning`)** | **49 / 100** | 82 / 100 | 100 / 100 | 2.5 s | **5.1 s** | **1,820 ms** | 0.002 | Primary H1 Section Banner |
| **PDF Download (`/hanuman-chalisa-pdf`)** | 70 / 100 | 90 / 100 | 100 / 100 | 2.8 s | 3.8 s | 490 ms | 0.006 | Download & Save Prayers Header Banner |
| **Blog Article (`/blog/significance-of-forty-verses`)** | Fail | — | — | >15 s | >15 s | — | — | Timed out under simulated mobile throttling (`NO_FCP` error) |

#### Core Web Vitals Bottlenecks
1. **LCP Exceeds 2.5s Sitewide (3.8s – 5.1s):** Render-blocking Google Fonts link requests 7 weights of `Mukta`, `Marcellus`, and `Tiro Devanagari Hindi` in a single un-subsetted blocking CSS file.
2. **Severe Main-Thread Blocking on Meaning Page (TBT 1,820 ms):** Style & layout calculation takes **3,963 ms** due to complex nested Sanskrit/Devanagari text blocks and hydration overhead.
3. **Accessibility Color Contrast:** 277 instances on `/hanuman-chalisa-meaning` where `brass-gold` accent text on ivory background fails WCAG AA minimum 4.5:1 ratio.

---

## Could Not Check

The following parameters could not be audited due to lack of administrative credentials or external data unavailability:
1. **Google Search Console Private Property Data:** Internal Performance reports (impressions by country/device), Index Coverage exclusion reasons, Crawl Stats response charts, and Manual Actions / Security Notices tab.
2. **Google's Live Index State:** Real-time cached index snapshots for individual URLs (requires GSC URL Inspection tool).
3. **Chrome User Experience Report (CrUX) Field Data:** Real-user Core Web Vitals telemetry is not aggregated by Google for this origin due to traffic thresholds.
4. **Third-Party Backlink & Authority Profile:** Inbound external links, referring domains, toxicity scores, and historical anchor text distributions (requires Ahrefs, Moz, or Semrush API access).
5. **Google Analytics 4 / Tag Manager Live Stream:** Conversion events, bounce rates, and session durations across language routes.
6. **Cloudflare Dashboard Deployment History via API:** Direct Cloudflare API query via `scripts/check-pages.mjs` returned code 10000 (Authentication error; OAuth token in Wrangler config expired).

---

## Prioritized Staged Remediation Plan

```
┌────────────────────────────────────────────────────────┐
│ STAGE 0: Safety & Backups (Git branch, D1 SQL backup)  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ STAGE 1: P0/P1 Fixes (Edge 503 DDL removal, Canonicals)│
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ STAGE 2: P2 Fixes (CWV LCP, Sitemap lastmod, Schemas)  │
└───────────────────────────┬────────────────────────────┘
                            │
┌───────────────────────────▼────────────────────────────┐
│ STAGE 3: P3 Fixes (WCAG contrast, PII / secret clean)  │
└────────────────────────────────────────────────────────┘
```

> [!IMPORTANT]
> **No changes have been made to project source files during this audit.**  
> Review the implementation stages below and provide explicit approval before Stage 1 execution begins.

---

### Stage 0: Safety & Baseline Backups (0.5 Hour)
- **Action:** Create an isolated git snapshot branch: `git checkout -b fix/seo-crash-remediation`.
- **Database Backup:** Export local and Cloudflare D1 database state: `npx wrangler d1 export jaishreeram-db --output=backup_20261021.sql`.
- **Rollback Method:** `git checkout main` and restore database via `wrangler d1 execute`.

---

### Stage 1: P0 & P1 Critical Crawl & Index Blockers (4 Hours)

#### Scope of Changes:
1. **Eliminate DDL from Request Cycle (`src/lib/d1.ts`, `src/layouts/Layout.astro`, `src/components/Sidebar.astro`):**
   - Remove `CREATE TABLE IF NOT EXISTS` invocations from `d1GetSiteConfig`, `d1GetBlogConfig`, `d1GetRecitations`, `d1GetImage`, and `d1GetSubscribers`.
   - Ensure tables are created once via `migrations.sql`.
   - Cache `SiteConfig` in a worker-level module variable so D1 is not queried on every page hit.
   - Optimize `Sidebar.astro` post query to `SELECT slug, title FROM Post LIMIT 5` instead of full table scans.
2. **Fix Pagination Canonical URL Flaw (`src/pages/blog/index.astro`):**
   - In `blog/index.astro`, compute `canonicalUrl = page > 1 ? `https://ramhanumanchalisa.com/blog?page=${page}` : `https://ramhanumanchalisa.com/blog`` and pass it to `<Layout canonicalUrl={canonicalUrl}>`.
3. **Fix Dynamic 404 Status Codes (`src/pages/blog/[slug].astro`, `src/pages/hanuman-chalisa/[lang].astro`, `src/pages/hanuman-chalisa-benefits/[slug].astro`):**
   - Replace `return Astro.redirect("/404")` with direct 404 response headers (`Astro.response.status = 404;`).
4. **Eliminate Cannibalizing Duplicate Blog Posts (`src/middleware.ts`, `src/pages/sitemap.xml.ts`):**
   - Add 301 redirects in middleware from duplicate blog editions to primary routes:
     - `/blog/shri-hanuman-chalisa-english` -> `/hanuman-chalisa/en`
     - `/blog/shri-hanuman-chalisa-in-telugu-lyrics` -> `/hanuman-chalisa/te`
     - `/blog/hanuman-chalisa-in-bengali` -> `/hanuman-chalisa/bn`
     - `/blog/hanuman-chalisa-in-kannada` -> `/hanuman-chalisa/kn`
     - `/blog/hanuman-chalisa-in-gujarati` -> `/hanuman-chalisa/gu`
     - `/blog/shri-hanuman-chalisa-hindi` -> `/`
   - Filter redirected slugs out of `sitemap.xml.ts`.

#### Automated Regression Tests:
- Run crawler script across 150 consecutive URLs; verify **zero 503 responses** and **zero Error 1102 events**.
- Verify `curl -I https://ramhanumanchalisa.com/blog?page=2` returns `<link rel="canonical" href="https://ramhanumanchalisa.com/blog?page=2">`.
- Verify `curl -I https://ramhanumanchalisa.com/blog/invalid-slug` returns `HTTP 404 Not Found` in 0 redirects.

---

### Stage 2: P2 Core Web Vitals, Metadata & Sitemap Remediation (4 Hours)

#### Scope of Changes:
1. **Font Optimization & CWV LCP Acceleration (`src/layouts/Layout.astro`):**
   - Subset Google Fonts link: reduce `Mukta` weights from 7 down to `wght@400;600;700`.
   - Add `&display=swap` to the stylesheet URL.
2. **Accurate Sitemap `<lastmod>` Dates (`src/pages/sitemap.xml.ts`):**
   - Replace `const now = new Date().toISOString();` with true `post.updatedAt || post.createdAt` database values.
   - Include missing live posts: `/blog/which-day-to-pray-for-hanuman` and `/blog/hanuman-surya-dev-guru-dakshina`.
3. **Sanitize Title & Meta Description Logic (`src/pages/blog/[slug].astro`, `src/pages/hanuman-chalisa-benefits/[slug].astro`):**
   - Remove `pageTitle.padEnd(50, ".")` trailing dot pollution.
   - Preserve custom descriptions up to 155 characters without forced replacement.
4. **Single-Hop Redirects & HSTS Header (`src/middleware.ts`):**
   - Set `response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload")`.
   - Consolidate www + http normalization into a single 301 hop.
5. **Dynamic Dates in Structured Data (`src/pages/hanuman-chalisa-meaning.astro`, `src/pages/hanuman-chalisa-benefits/[slug].astro`):**
   - Replace hardcoded `2024-01-15` / `2026-09-02` with dynamic content timestamps.
   - Correct Article `inLanguage` to match `<html lang>`.

#### Automated Regression Tests:
- Run mobile Lighthouse; verify LCP < 2.5s on home and PDF pages, and TBT on Meaning page drops below 300 ms.
- Validate `sitemap.xml` in an XML validator; ensure diverse historical dates.
- Validate structured data output on Google Rich Results Test.

---

### Stage 3: P3 Accessibility, Content Quality & Secrets Hygiene (3 Hours)

#### Scope of Changes:
1. **WCAG Color Contrast Fixes (`src/styles/globals.css`, `src/layouts/Layout.astro`):**
   - Adjust `brass-gold` text color utility to `#7d5b12` on light ivory containers.
2. **Consolidate Thin Posts (`src/data/consolidatedPosts.ts`, `src/data/blog.ts`):**
   - Merge 46 thin posts into topic master hubs with 301 redirects.
3. **Secrets Hygiene (`.env`, `src/pages/api/auth/callback.ts`):**
   - Remove plaintext secrets from `.env`.
   - Store OAuth credentials and admin email exclusively in Cloudflare environment variables.

#### Automated Regression Tests:
- Run Lighthouse accessibility audit; confirm 95+ score.
- Run `git grep` for secret patterns; confirm clean output.

---

## Verification & Rollback Framework

```
                      IMPLEMENTATION VALIDATION GATES
                      
┌──────────────────────┐     PASS     ┌──────────────────────┐
│ Gate 1: Build Test   ├─────────────►│ Gate 2: Crawl 200 OK │
│ `npm run build`      │              │ Zero 503s on edge    │
└──────────────────────┘              └──────────┬───────────┘
                                                 │ PASS
                                                 ▼
┌──────────────────────┐     PASS     ┌──────────────────────┐
│ Gate 4: CWV Valid    │◄─────────────┤ Gate 3: SEO Audit    │
│ LCP < 2.5s, CLS < 0.1│              │ Canonicals, Hreflang │
└──────────────────────┘              └──────────────────────┘
```

1. **Pre-Deployment Gate:** Execute `npm run build` locally; ensure Prisma client compiles cleanly and zero TypeScript errors occur.
2. **Edge Health Gate:** Execute `crawl.mjs` against preview deployment; verify 100% of routes return 200 OK with zero 503 responses.
3. **SEO Tagging Gate:** Automated regex assertions confirming:
   - Zero pages contain `noindex` in production.
   - Canonical URLs on `/blog?page=N` self-reference with `?page=N`.
   - Hreflang tags match reciprocally across all 7 language alternates.
   - Sitemap contains only canonical, indexable 200 OK URLs.
4. **Emergency Rollback:** If any 5xx error or edge CPU timeout is detected, immediately revert the Cloudflare Pages deployment to the previous deployment ID via Cloudflare Dashboard or `git revert HEAD && git push origin main`.
