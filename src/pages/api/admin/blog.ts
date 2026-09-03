import type { APIRoute } from "astro";
import { getPrisma } from "../../../lib/prisma";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export const GET: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: "desc" },
    });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch posts" }), { status: 500 });
  }
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
      published,
    } = body;

    if (!title || !slug || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields: title, slug, and content are mandatory" }), { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
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
        focusKeywords: focusKeywords || null,
        internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
        sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
        faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
        published: !!published,
      },
    });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error: any) {
    console.error("Failed to create post:", error);
    if (error.code === "P2002") {
      return new Response(JSON.stringify({ error: "Slug already exists" }), { status: 400 });
    }
    return new Response(JSON.stringify({ error: "Failed to create post" }), { status: 500 });
  }
};

export const PUT: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

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
      published,
    } = body;

    if (!id || !title || !slug || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields: id, title, slug, and content are mandatory" }), { status: 400 });
    }

    const post = await prisma.post.upsert({
      where: id.startsWith("fallback-") ? { slug } : { id },
      update: {
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
        focusKeywords: focusKeywords || null,
        internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
        sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
        faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
        published: !!published,
      },
      create: {
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
        focusKeywords: focusKeywords || null,
        internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
        sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
        faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
        published: !!published,
      },
    });

    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    console.error("Failed to update post:", error);
    return new Response(JSON.stringify({ error: "Failed to update post" }), { status: 500 });
  }
};

export const DELETE: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const { searchParams } = new URL(context.request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing post ID" }), { status: 400 });
    }

    await prisma.post.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to delete post:", error);
    return new Response(JSON.stringify({ error: "Failed to delete post" }), { status: 500 });
  }
};
