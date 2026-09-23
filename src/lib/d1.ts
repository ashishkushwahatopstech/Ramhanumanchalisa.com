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

// Media Images for Zero-Git Live SEO Uploads
export async function d1EnsureMediaTable(db: any): Promise<void> {
  if (!db || typeof db.prepare !== "function") return;
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS MediaImage (
        id TEXT NOT NULL PRIMARY KEY,
        path TEXT NOT NULL UNIQUE,
        fileName TEXT NOT NULL,
        folder TEXT NOT NULL,
        mimeType TEXT NOT NULL,
        dataBase64 TEXT NOT NULL,
        size INTEGER NOT NULL,
        createdAt TEXT NOT NULL
      )
    `).run();
    await db.prepare(`
      CREATE UNIQUE INDEX IF NOT EXISTS idx_MediaImage_path ON MediaImage(path)
    `).run();
  } catch (e) {
    console.warn("Notice: d1EnsureMediaTable:", e);
  }
}

export async function d1SaveImage(
  db: any,
  img: { path: string; fileName: string; folder: string; mimeType: string; dataBase64: string; size: number }
): Promise<boolean> {
  if (!db || typeof db.prepare !== "function") return false;
  try {
    await d1EnsureMediaTable(db);
    const now = new Date().toISOString();
    const id = `img-${Date.now()}-${Math.random().toString(36).substring(2, 8)}`;

    await db.prepare(`
      INSERT INTO MediaImage (
        id, path, fileName, folder, mimeType, dataBase64, size, createdAt
      ) VALUES (
        ?, ?, ?, ?, ?, ?, ?, ?
      )
      ON CONFLICT(path) DO UPDATE SET
        dataBase64 = excluded.dataBase64,
        size = excluded.size,
        mimeType = excluded.mimeType,
        createdAt = excluded.createdAt
    `).bind(
      id, img.path, img.fileName, img.folder, img.mimeType, img.dataBase64, img.size, now
    ).run();

    return true;
  } catch (e) {
    console.error("D1 saveImage error:", e);
    return false;
  }
}

export async function d1GetImage(
  db: any,
  imagePath: string
): Promise<{ mimeType: string; dataBase64: string; size: number; createdAt: string } | null> {
  if (!db || typeof db.prepare !== "function") return null;
  try {
    await d1EnsureMediaTable(db);
    const row = await db.prepare(
      "SELECT mimeType, dataBase64, size, createdAt FROM MediaImage WHERE path = ?"
    ).bind(imagePath).first();
    return row || null;
  } catch (e) {
    console.error("D1 getImage error:", e);
    return null;
  }
}

// Blog Layout & Sidebar Configuration in D1
export async function d1EnsureBlogConfigTable(db: any): Promise<void> {
  if (!db || typeof db.prepare !== "function") return;
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS BlogConfig (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `).run();
  } catch (e) {
    console.warn("Notice: d1EnsureBlogConfigTable:", e);
  }
}

export async function d1GetBlogConfig(db: any): Promise<any> {
  if (!db || typeof db.prepare !== "function") return null;
  try {
    await d1EnsureBlogConfigTable(db);
    const row = await db.prepare("SELECT value FROM BlogConfig WHERE key = 'main'").first();
    if (row && row.value) {
      return JSON.parse(row.value);
    }
    return null;
  } catch (e) {
    console.error("D1 getBlogConfig error:", e);
    return null;
  }
}

export async function d1SaveBlogConfig(db: any, config: any): Promise<boolean> {
  if (!db || typeof db.prepare !== "function") return false;
  try {
    await d1EnsureBlogConfigTable(db);
    const now = new Date().toISOString();
    await db.prepare(`
      INSERT INTO BlogConfig (key, value, updatedAt)
      VALUES ('main', ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updatedAt = excluded.updatedAt
    `).bind(JSON.stringify(config), now).run();
    return true;
  } catch (e) {
    console.error("D1 saveBlogConfig error:", e);
    return false;
  }
}

// Recitation Counter in D1 (Atomic & Edge-Optimized)
export async function d1EnsureRecitationTable(db: any): Promise<void> {
  if (!db || typeof db.prepare !== "function") return;
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS RecitationCounter (
        id TEXT PRIMARY KEY,
        date TEXT UNIQUE NOT NULL,
        count INTEGER NOT NULL DEFAULT 0
      )
    `).run();
  } catch (e) {
    console.warn("Notice: d1EnsureRecitationTable:", e);
  }
}

export async function d1GetRecitations(db: any, date: string): Promise<number> {
  if (!db || typeof db.prepare !== "function") return 0;
  try {
    await d1EnsureRecitationTable(db);
    const row = await db.prepare("SELECT count FROM RecitationCounter WHERE date = ?").bind(date).first();
    return row ? Number(row.count) : 0;
  } catch (e) {
    console.error("D1 getRecitations error:", e);
    return 0;
  }
}

export async function d1IncrementRecitations(db: any, date: string, incrementBy: number = 1): Promise<number> {
  if (!db || typeof db.prepare !== "function") return 0;
  try {
    await d1EnsureRecitationTable(db);
    const id = "rc_" + date;
    const countVal = Math.max(1, Math.min(incrementBy, 50)); // Safety boundary
    await db.prepare(`
      INSERT INTO RecitationCounter (id, date, count)
      VALUES (?, ?, ?)
      ON CONFLICT(date) DO UPDATE SET count = count + ?
    `).bind(id, date, countVal, countVal).run();

    const row = await db.prepare("SELECT count FROM RecitationCounter WHERE date = ?").bind(date).first();
    return row ? Number(row.count) : countVal;
  } catch (e) {
    console.error("D1 incrementRecitations error:", e);
    return 0;
  }
}

// Site Layout & Gadgets Configuration in D1
export async function d1EnsureSiteConfigTable(db: any): Promise<void> {
  if (!db || typeof db.prepare !== "function") return;
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS SiteConfig (
        key TEXT PRIMARY KEY,
        value TEXT NOT NULL,
        updatedAt TEXT NOT NULL
      )
    `).run();
  } catch (e) {
    console.warn("Notice: d1EnsureSiteConfigTable:", e);
  }
}

export async function d1GetSiteConfig(db: any): Promise<any> {
  if (!db || typeof db.prepare !== "function") return null;
  try {
    await d1EnsureSiteConfigTable(db);
    const row = await db.prepare("SELECT value FROM SiteConfig WHERE key = 'site_layout'").first();
    if (row && row.value) {
      return JSON.parse(row.value);
    }
    return null;
  } catch (e) {
    console.error("D1 getSiteConfig error:", e);
    return null;
  }
}

export async function d1SaveSiteConfig(db: any, config: any): Promise<boolean> {
  if (!db || typeof db.prepare !== "function") return false;
  try {
    await d1EnsureSiteConfigTable(db);
    const now = new Date().toISOString();
    await db.prepare(`
      INSERT INTO SiteConfig (key, value, updatedAt)
      VALUES ('site_layout', ?, ?)
      ON CONFLICT(key) DO UPDATE SET
        value = excluded.value,
        updatedAt = excluded.updatedAt
    `).bind(JSON.stringify(config), now).run();
    return true;
  } catch (e) {
    console.error("D1 saveSiteConfig error:", e);
    return false;
  }
}

// Newsletter Subscribers in D1
export async function d1EnsureSubscriberTable(db: any): Promise<void> {
  if (!db || typeof db.prepare !== "function") return;
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS NewsletterSubscriber (
        id TEXT PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        status TEXT NOT NULL DEFAULT 'active',
        source TEXT,
        createdAt TEXT NOT NULL
      )
    `).run();
  } catch (e) {
    console.warn("Notice: d1EnsureSubscriberTable:", e);
  }
}

export async function d1AddSubscriber(db: any, email: string, source: string = "morning_blessings"): Promise<{ success: boolean; isNew: boolean }> {
  if (!db || typeof db.prepare !== "function") return { success: false, isNew: false };
  try {
    await d1EnsureSubscriberTable(db);
    const now = new Date().toISOString();
    const id = `sub-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    
    // Check existing
    const existing = await db.prepare("SELECT id FROM NewsletterSubscriber WHERE email = ?").bind(email.toLowerCase().trim()).first();
    if (existing) {
      return { success: true, isNew: false };
    }

    await db.prepare(`
      INSERT INTO NewsletterSubscriber (id, email, status, source, createdAt)
      VALUES (?, ?, 'active', ?, ?)
    `).bind(id, email.toLowerCase().trim(), source, now).run();

    return { success: true, isNew: true };
  } catch (e) {
    console.error("D1 addSubscriber error:", e);
    return { success: false, isNew: false };
  }
}

export async function d1GetSubscribers(db: any): Promise<any[]> {
  if (!db || typeof db.prepare !== "function") return [];
  try {
    await d1EnsureSubscriberTable(db);
    const { results } = await db.prepare("SELECT * FROM NewsletterSubscriber ORDER BY createdAt DESC").all();
    return results || [];
  } catch (e) {
    console.error("D1 getSubscribers error:", e);
    return [];
  }
}

export async function d1DeleteSubscriber(db: any, id: string): Promise<boolean> {
  if (!db || typeof db.prepare !== "function") return false;
  try {
    await d1EnsureSubscriberTable(db);
    await db.prepare("DELETE FROM NewsletterSubscriber WHERE id = ?").bind(id).run();
    return true;
  } catch (e) {
    console.error("D1 deleteSubscriber error:", e);
    return false;
  }
}

// Contact Form Submissions in D1
export async function d1EnsureContactTable(db: any): Promise<void> {
  if (!db || typeof db.prepare !== "function") return;
  try {
    await db.prepare(`
      CREATE TABLE IF NOT EXISTS ContactSubmission (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        email TEXT NOT NULL,
        subject TEXT,
        message TEXT NOT NULL,
        createdAt TEXT NOT NULL
      )
    `).run();
  } catch (e) {
    console.warn("Notice: d1EnsureContactTable:", e);
  }
}

export async function d1SaveContactSubmission(
  db: any,
  data: { name: string; email: string; subject?: string; message: string }
): Promise<boolean> {
  if (!db || typeof db.prepare !== "function") return false;
  try {
    await d1EnsureContactTable(db);
    const now = new Date().toISOString();
    const id = `contact-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    await db.prepare(`
      INSERT INTO ContactSubmission (id, name, email, subject, message, createdAt)
      VALUES (?, ?, ?, ?, ?, ?)
    `).bind(id, data.name.trim(), data.email.trim(), data.subject || "Devotee Inquiry", data.message.trim(), now).run();
    return true;
  } catch (e) {
    console.error("D1 saveContactSubmission error:", e);
    return false;
  }
}

export async function d1GetContactSubmissions(db: any): Promise<any[]> {
  if (!db || typeof db.prepare !== "function") return [];
  try {
    await d1EnsureContactTable(db);
    const { results } = await db.prepare("SELECT * FROM ContactSubmission ORDER BY createdAt DESC LIMIT 50").all();
    return results || [];
  } catch (e) {
    console.error("D1 getContactSubmissions error:", e);
    return [];
  }
}

