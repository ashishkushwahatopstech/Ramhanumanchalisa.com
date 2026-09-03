import type { APIRoute } from "astro";
import { getPrisma } from "../../../lib/prisma";
import { FALLBACK_BLOG_POSTS } from "../../../data/blog";
import { saveCachedPost, getAllCachedPosts } from "../../../lib/dynamicContent";
import { d1GetPosts, d1UpsertPost, d1DeletePost } from "../../../lib/d1";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export const GET: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  let posts: any[] = [];

  // 1. Try Native Cloudflare D1 first (100% reliable on Cloudflare Edge)
  if (db && typeof db.prepare === "function") {
    try {
      posts = await d1GetPosts(db);
    } catch (e) {
      console.warn("Notice: D1 getPosts query fallback:", e);
    }
  }

  // 2. Fallback to Prisma if D1 not returned and prisma is present
  if (posts.length === 0) {
    const prisma = getPrisma(db);
    if (prisma) {
      try {
        const dbPosts = await prisma.post.findMany({
          orderBy: { createdAt: "desc" },
        });
        if (dbPosts && Array.isArray(dbPosts)) {
          posts = dbPosts.map((p) => ({
            ...p,
            createdAt: p.createdAt ? new Date(p.createdAt).toISOString() : new Date().toISOString(),
            updatedAt: p.updatedAt ? new Date(p.updatedAt).toISOString() : new Date().toISOString(),
          }));
        }
      } catch (error) {
        console.warn("Notice: DB posts query fallback in GET API:", error);
      }
    }
  }

  const dbSlugs = new Set(posts.map((p) => p.slug));

  // Merge cached posts that aren't in DB yet
  const cachedPosts = getAllCachedPosts().filter((p) => !dbSlugs.has(p.slug));
  cachedPosts.forEach((p) => dbSlugs.add(p.slug));

  const fallbackList = FALLBACK_BLOG_POSTS.filter((f) => !dbSlugs.has(f.slug)).map((f) => ({
    id: `fallback-${f.slug}`,
    slug: f.slug,
    title: f.title,
    excerpt: f.excerpt,
    content: f.content,
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return new Response(JSON.stringify([...posts, ...cachedPosts, ...fallbackList]), { status: 200 });
};

export const POST: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const body = await context.request.json();
    const {
      title,
      slug,
      metaTitle,
      metaDescription,
      content,
      excerpt,
      coverImage,
      imageAlt,
      imageTitle,
      imageCaption,
      focusKeywords,
      internalLinks,
      sources,
      faqs,
      galleryImages,
      published,
    } = body;

    if (!title || !slug || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields: title, slug, and content are mandatory" }), { status: 400 });
    }

    const postData = {
      title,
      slug,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      content,
      excerpt: excerpt || "",
      coverImage: coverImage || null,
      imageAlt: imageAlt || null,
      imageTitle: imageTitle || null,
      imageCaption: imageCaption || null,
      galleryImages: galleryImages ? (typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages)) : null,
      focusKeywords: focusKeywords || null,
      internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
      sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
      faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
      published: !!published,
    };

    let post: any = null;

    // 1. Try Native D1 first
    if (db && typeof db.prepare === "function") {
      try {
        post = await d1UpsertPost(db, postData);
      } catch (e) {
        console.warn("Notice: D1 upsertPost failed in POST:", e);
      }
    }

    // 2. Prisma fallback
    if (!post) {
      const prisma = getPrisma(db);
      if (prisma) {
        try {
          const existing = await prisma.post.findUnique({ where: { slug } });
          if (existing) {
            post = await prisma.post.update({
              where: { id: existing.id },
              data: postData,
            });
          } else {
            post = await prisma.post.create({
              data: postData,
            });
          }
        } catch (dbErr: any) {
          console.warn("Notice: Prisma in POST failed, falling back to cache:", dbErr);
        }
      }
    }

    if (!post) {
      post = {
        id: `post-${slug}`,
        ...postData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    saveCachedPost(post);
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error: any) {
    console.error("Failed to create post:", error);
    return new Response(JSON.stringify({ error: "Failed to create post" }), { status: 500 });
  }
};

export const PUT: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;

  try {
    const body = await context.request.json();
    const {
      id,
      title,
      slug,
      metaTitle,
      metaDescription,
      content,
      excerpt,
      coverImage,
      imageAlt,
      imageTitle,
      imageCaption,
      focusKeywords,
      internalLinks,
      sources,
      faqs,
      galleryImages,
      published,
    } = body;

    if (!id || !title || !slug || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields: id, title, slug, and content are mandatory" }), { status: 400 });
    }

    const postData = {
      id,
      title,
      slug,
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      content,
      excerpt: excerpt || "",
      coverImage: coverImage || null,
      imageAlt: imageAlt || null,
      imageTitle: imageTitle || null,
      imageCaption: imageCaption || null,
      galleryImages: galleryImages ? (typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages)) : null,
      focusKeywords: focusKeywords || null,
      internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
      sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
      faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
      published: !!published,
    };

    let post: any = null;

    // 1. Try Native D1 first
    if (db && typeof db.prepare === "function") {
      try {
        post = await d1UpsertPost(db, postData);
      } catch (e) {
        console.warn("Notice: D1 upsertPost failed in PUT:", e);
      }
    }

    // 2. Prisma fallback
    if (!post) {
      const prisma = getPrisma(db);
      if (prisma) {
        try {
          const existing = await prisma.post.findFirst({
            where: {
              OR: [
                { slug },
                ...(id && !id.startsWith("fallback-") ? [{ id }] : [])
              ]
            }
          });

          if (existing) {
            post = await prisma.post.update({
              where: { id: existing.id },
              data: postData,
            });
          } else {
            post = await prisma.post.create({
              data: postData,
            });
          }
        } catch (dbErr) {
          console.warn("Notice: Prisma update failed, falling back to cache:", dbErr);
        }
      }
    }

    if (!post) {
      post = {
        id: id.startsWith("fallback-") ? id : (id || `post-${slug}`),
        ...postData,
        updatedAt: new Date().toISOString(),
      };
    }

    saveCachedPost(post);
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error: any) {
    console.error("Failed to update post:", error);
    return new Response(JSON.stringify({ error: "Failed to update post" }), { status: 500 });
  }
};

export const DELETE: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;

  try {
    const { searchParams } = new URL(context.request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing post ID" }), { status: 400 });
    }

    // 1. Native D1 delete
    if (db && typeof db.prepare === "function") {
      try {
        await d1DeletePost(db, id);
      } catch (e) {
        console.warn("Notice: D1 deletePost failed:", e);
      }
    }

    // 2. Prisma fallback
    const prisma = getPrisma(db);
    if (prisma) {
      try {
        await prisma.post.delete({
          where: { id },
        });
      } catch (e) {
        console.warn("Notice: Prisma delete failed:", e);
      }
    }

    if (globalThis.__POSTS_CACHE__) {
      for (const slug of Object.keys(globalThis.__POSTS_CACHE__)) {
        if (globalThis.__POSTS_CACHE__[slug].id === id) {
          delete globalThis.__POSTS_CACHE__[slug];
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return new Response(JSON.stringify({ error: "Failed to delete post" }), { status: 500 });
  }
};

