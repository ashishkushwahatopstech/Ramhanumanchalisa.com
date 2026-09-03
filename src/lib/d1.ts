// Native Cloudflare D1 Database Layer
// High-performance, zero-external-dependency persistence directly on Cloudflare Edge

export interface D1Post {
  id: string;
  slug: string;
  title: string;
  metaTitle?: string | null;
  metaDescription?: string | null;
  content: string;
  excerpt: string;
  coverImage?: string | null;
  imageAlt?: string | null;
  imageTitle?: string | null;
  imageCaption?: string | null;
  focusKeywords?: string | null;
  internalLinks?: string | null;
  sources?: string | null;
  faqs?: string | null;
  galleryImages?: string | null;
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

export async function d1GetPosts(db: any): Promise<D1Post[]> {
  if (!db || typeof db.prepare !== "function") return [];
  try {
    const { results } = await db.prepare("SELECT * FROM Post ORDER BY createdAt DESC").all();
    return (results || []).map((r: any) => ({
      ...r,
      published: Boolean(r.published),
    }));
  } catch (e) {
    console.error("D1 getPosts error:", e);
    return [];
  }
}

export async function d1GetPostBySlug(db: any, slug: string): Promise<D1Post | null> {
  if (!db || typeof db.prepare !== "function") return null;
  try {
    const row = await db.prepare("SELECT * FROM Post WHERE slug = ?").bind(slug).first();
    if (!row) return null;
    return {
      ...row,
      published: Boolean(row.published),
    };
  } catch (e) {
    console.error("D1 getPostBySlug error:", e);
    return null;
  }
}

export async function d1UpsertPost(
  db: any,
  post: Partial<D1Post> & { slug: string; title: string; content: string }
): Promise<D1Post | null> {
  if (!db || typeof db.prepare !== "function") return null;
  const now = new Date().toISOString();
  const id = post.id && !post.id.startsWith("fallback-") ? post.id : `post-${post.slug}`;
  const published = post.published ? 1 : 0;

  await db.prepare(`
    INSERT INTO Post (
      id, slug, title, metaTitle, metaDescription, content, excerpt,
      coverImage, imageAlt, imageTitle, imageCaption, focusKeywords,
      internalLinks, sources, faqs, galleryImages, published, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      metaTitle = excluded.metaTitle,
      metaDescription = excluded.metaDescription,
      content = excluded.content,
      excerpt = excluded.excerpt,
      coverImage = excluded.coverImage,
      imageAlt = excluded.imageAlt,
      imageTitle = excluded.imageTitle,
      imageCaption = excluded.imageCaption,
      focusKeywords = excluded.focusKeywords,
      internalLinks = excluded.internalLinks,
      sources = excluded.sources,
      faqs = excluded.faqs,
      galleryImages = excluded.galleryImages,
      published = excluded.published,
      updatedAt = excluded.updatedAt
  `).bind(
    id, post.slug, post.title, post.metaTitle || null, post.metaDescription || null, post.content, post.excerpt || "",
    post.coverImage || null, post.imageAlt || null, post.imageTitle || null, post.imageCaption || null, post.focusKeywords || null,
    post.internalLinks || null, post.sources || null, post.faqs || null, post.galleryImages || null, published, now, now
  ).run();

  return await d1GetPostBySlug(db, post.slug);
}

export async function d1DeletePost(db: any, idOrSlug: string): Promise<boolean> {
  if (!db || typeof db.prepare !== "function") return false;
  try {
    await db.prepare("DELETE FROM Post WHERE id = ? OR slug = ?").bind(idOrSlug, idOrSlug).run();
    return true;
  } catch (e) {
    console.error("D1 deletePost error:", e);
    return false;
  }
}

// Benefits
export async function d1GetBenefits(db: any): Promise<any[]> {
  if (!db || typeof db.prepare !== "function") return [];
  try {
    const { results } = await db.prepare("SELECT * FROM Benefit ORDER BY createdAt DESC").all();
    return (results || []).map((r: any) => ({
      ...r,
      published: Boolean(r.published),
      actionSteps: typeof r.actionSteps === "string" ? (() => { try { return JSON.parse(r.actionSteps); } catch { return []; } })() : (r.actionSteps || []),
    }));
  } catch (e) {
    console.error("D1 getBenefits error:", e);
    return [];
  }
}

export async function d1GetBenefitBySlug(db: any, slug: string): Promise<any | null> {
  if (!db || typeof db.prepare !== "function") return null;
  try {
    const row = await db.prepare("SELECT * FROM Benefit WHERE slug = ?").bind(slug).first();
    if (!row) return null;
    return {
      ...row,
      published: Boolean(row.published),
      actionSteps: typeof row.actionSteps === "string" ? (() => { try { return JSON.parse(row.actionSteps); } catch { return []; } })() : (row.actionSteps || []),
    };
  } catch (e) {
    console.error("D1 getBenefitBySlug error:", e);
    return null;
  }
}

export async function d1UpsertBenefit(db: any, b: any): Promise<any> {
  if (!db || typeof db.prepare !== "function") return null;
  const now = new Date().toISOString();
  const id = b.id && !b.id.startsWith("fallback-") ? b.id : `benefit-${b.slug}`;
  const published = b.published !== undefined ? (b.published ? 1 : 0) : 1;
  const actionSteps = typeof b.actionSteps === "string" ? b.actionSteps : JSON.stringify(b.actionSteps || []);

  await db.prepare(`
    INSERT INTO Benefit (
      id, slug, title, metaTitle, metaDescription, situation, icon, description,
      recommendedChants, targetVerseNumber, targetVerseText, targetVerseTranslation,
      detailedExposition, actionSteps, coverImage, imageAlt, imageTitle, imageCaption,
      galleryImages, focusKeywords, internalLinks, sources, faqs, published, createdAt, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?,
      ?, ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(slug) DO UPDATE SET
      title = excluded.title,
      metaTitle = excluded.metaTitle,
      metaDescription = excluded.metaDescription,
      situation = excluded.situation,
      icon = excluded.icon,
      description = excluded.description,
      recommendedChants = excluded.recommendedChants,
      targetVerseNumber = excluded.targetVerseNumber,
      targetVerseText = excluded.targetVerseText,
      targetVerseTranslation = excluded.targetVerseTranslation,
      detailedExposition = excluded.detailedExposition,
      actionSteps = excluded.actionSteps,
      coverImage = excluded.coverImage,
      imageAlt = excluded.imageAlt,
      imageTitle = excluded.imageTitle,
      imageCaption = excluded.imageCaption,
      galleryImages = excluded.galleryImages,
      focusKeywords = excluded.focusKeywords,
      internalLinks = excluded.internalLinks,
      sources = excluded.sources,
      faqs = excluded.faqs,
      published = excluded.published,
      updatedAt = excluded.updatedAt
  `).bind(
    id, b.slug, b.title, b.metaTitle || null, b.metaDescription || null, b.situation || "", b.icon || "🙏", b.description || "",
    b.recommendedChants || null, b.targetVerseNumber ? Number(b.targetVerseNumber) : null, b.targetVerseText || null, b.targetVerseTranslation || null,
    b.detailedExposition || "", actionSteps, b.coverImage || null, b.imageAlt || null, b.imageTitle || null, b.imageCaption || null,
    b.galleryImages || null, b.focusKeywords || null, b.internalLinks || null, b.sources || null, b.faqs || null, published, now, now
  ).run();

  return await d1GetBenefitBySlug(db, b.slug);
}

export async function d1DeleteBenefit(db: any, idOrSlug: string): Promise<boolean> {
  if (!db || typeof db.prepare !== "function") return false;
  try {
    await db.prepare("DELETE FROM Benefit WHERE id = ? OR slug = ?").bind(idOrSlug, idOrSlug).run();
    return true;
  } catch (e) {
    console.error("D1 deleteBenefit error:", e);
    return false;
  }
}

// Languages
export async function d1GetLanguage(db: any, lang: string): Promise<any | null> {
  if (!db || typeof db.prepare !== "function") return null;
  try {
    const row = await db.prepare("SELECT * FROM LanguageContent WHERE lang = ?").bind(lang).first();
    if (!row) return null;
    return {
      ...row,
      published: Boolean(row.published),
    };
  } catch (e) {
    console.error("D1 getLanguage error:", e);
    return null;
  }
}

export async function d1UpsertLanguage(
  db: any,
  langData: { lang: string; title: string; metaDescription: string; contentJSON: string; published?: boolean }
): Promise<any> {
  if (!db || typeof db.prepare !== "function") return null;
  const now = new Date().toISOString();
  const id = `lang-${langData.lang}`;
  const published = langData.published ? 1 : 0;

  await db.prepare(`
    INSERT INTO LanguageContent (
      id, lang, title, metaDescription, contentJSON, published, updatedAt
    ) VALUES (
      ?, ?, ?, ?, ?, ?, ?
    )
    ON CONFLICT(lang) DO UPDATE SET
      title = excluded.title,
      metaDescription = excluded.metaDescription,
      contentJSON = excluded.contentJSON,
      published = excluded.published,
      updatedAt = excluded.updatedAt
  `).bind(
    id, langData.lang, langData.title, langData.metaDescription, langData.contentJSON, published, now
  ).run();

  return await d1GetLanguage(db, langData.lang);
}
