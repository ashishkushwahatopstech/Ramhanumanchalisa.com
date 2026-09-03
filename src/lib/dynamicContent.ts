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
