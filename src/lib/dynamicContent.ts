// High-availability runtime cache for Edge and fallback persistence

declare global {
  var __POSTS_CACHE__: Record<string, any> | undefined;
  var __BENEFITS_CACHE__: Record<string, any> | undefined;
}

if (!globalThis.__POSTS_CACHE__) {
  globalThis.__POSTS_CACHE__ = {};
}

if (!globalThis.__BENEFITS_CACHE__) {
  globalThis.__BENEFITS_CACHE__ = {};
}

export function saveCachedPost(post: any) {
  if (post && post.slug) {
    if (!globalThis.__POSTS_CACHE__) globalThis.__POSTS_CACHE__ = {};
    globalThis.__POSTS_CACHE__[post.slug] = {
      ...post,
      updatedAt: post.updatedAt || new Date().toISOString(),
      createdAt: post.createdAt || new Date().toISOString(),
    };
  }
}

export function getCachedPost(slug: string) {
  return globalThis.__POSTS_CACHE__?.[slug] || null;
}

export function getAllCachedPosts(): any[] {
  return Object.values(globalThis.__POSTS_CACHE__ || {});
}

export function saveCachedBenefit(benefit: any) {
  if (benefit && benefit.slug) {
    if (!globalThis.__BENEFITS_CACHE__) globalThis.__BENEFITS_CACHE__ = {};
    globalThis.__BENEFITS_CACHE__[benefit.slug] = {
      ...benefit,
      updatedAt: benefit.updatedAt || new Date().toISOString(),
      createdAt: benefit.createdAt || new Date().toISOString(),
    };
  }
}

export function getCachedBenefit(slug: string) {
  return globalThis.__BENEFITS_CACHE__?.[slug] || null;
}

export function getAllCachedBenefits(): any[] {
  return Object.values(globalThis.__BENEFITS_CACHE__ || {});
}

// Blog Layout & Sidebar Configuration Cache
export interface BlogLayoutConfig {
  postsPerPage: number;
  sidebarEnabled: boolean;
  aboutTitle: string;
  aboutContent: string;
  featuredHymnTitle: string;
  featuredHymnUrl: string;
  featuredHymnDesc: string;
  customHtmlWidget: string;
  showRecentPosts: boolean;
  showCategories: boolean;
}

export const DEFAULT_BLOG_CONFIG: BlogLayoutConfig = {
  postsPerPage: 15,
  sidebarEnabled: true,
  aboutTitle: "About Mandir Library",
  aboutContent: "A consecrated digital sanctuary preserving sacred Awadhi, Sanskrit, and Hindi hymns, Chalisas, and Vedic stotras with word-by-word meanings.",
  featuredHymnTitle: "Shri Hanuman Chalisa (हिंदी व English)",
  featuredHymnUrl: "/",
  featuredHymnDesc: "Recite the original 40 quatrains composed by Goswami Tulsidas with synced audio and Devanagari lyrics.",
  customHtmlWidget: "",
  showRecentPosts: true,
  showCategories: true,
};

declare global {
  var __BLOG_CONFIG__: BlogLayoutConfig | undefined;
}

export function getBlogConfig(): BlogLayoutConfig {
  return globalThis.__BLOG_CONFIG__ || DEFAULT_BLOG_CONFIG;
}

export function saveBlogConfig(config: Partial<BlogLayoutConfig>): BlogLayoutConfig {
  const current = getBlogConfig();
  globalThis.__BLOG_CONFIG__ = { ...current, ...config };
  return globalThis.__BLOG_CONFIG__;
}
