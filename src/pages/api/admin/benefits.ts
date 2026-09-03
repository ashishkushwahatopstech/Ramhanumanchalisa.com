import type { APIRoute } from "astro";
import { getPrisma } from "../../../lib/prisma";
import { BENEFITS_DATA } from "../../../data/benefits";

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

  let benefits: any[] = [];
  try {
    const dbBenefits = await prisma.benefit.findMany({
      orderBy: { createdAt: "desc" },
    });
    if (dbBenefits && Array.isArray(dbBenefits)) {
      benefits = dbBenefits;
    }
  } catch (error) {
    console.warn("Notice: DB benefits query fallback in GET API:", error);
  }

  const dbSlugs = new Set(benefits.map((b) => b.slug));
  const fallbackList = Object.values(BENEFITS_DATA).filter((b) => !dbSlugs.has(b.slug)).map((b) => ({
    id: `fallback-${b.slug}`,
    slug: b.slug,
    title: b.title,
    situation: b.situation,
    icon: b.icon || "🙏",
    description: b.description,
    recommendedChants: b.recommendedChants || "",
    targetVerseNumber: b.targetVerseNumber || 1,
    targetVerseText: b.targetVerseText || "",
    targetVerseTranslation: b.targetVerseTranslation || "",
    detailedExposition: b.detailedExposition || "",
    actionSteps: b.actionSteps ? JSON.stringify(b.actionSteps) : "[]",
    published: true,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }));

  return new Response(JSON.stringify([...benefits, ...fallbackList]), { status: 200 });
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
      situation,
      icon,
      description,
      recommendedChants,
      targetVerseNumber,
      targetVerseText,
      targetVerseTranslation,
      detailedExposition,
      actionSteps,
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

    if (!title || !slug || !description || !detailedExposition) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: title, slug, description, and detailedExposition are required" }),
        { status: 400 }
      );
    }

    const benefit = await prisma.benefit.create({
      data: {
        title,
        slug,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        situation: situation || "",
        icon: icon || "🙏",
        description,
        recommendedChants: recommendedChants || null,
        targetVerseNumber: targetVerseNumber ? Number(targetVerseNumber) : null,
        targetVerseText: targetVerseText || null,
        targetVerseTranslation: targetVerseTranslation || null,
        detailedExposition,
        actionSteps: actionSteps ? (typeof actionSteps === "string" ? actionSteps : JSON.stringify(actionSteps)) : null,
        coverImage: coverImage || null,
        imageAlt: imageAlt || null,
        imageTitle: imageTitle || null,
        imageCaption: imageCaption || null,
        focusKeywords: focusKeywords || null,
        internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
        sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
        faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
        published: published !== undefined ? !!published : true,
      },
    });

    return new Response(JSON.stringify(benefit), { status: 200 });
  } catch (error: any) {
    console.error("Failed to create benefit:", error);
    if (error.code === "P2002") {
      return new Response(JSON.stringify({ error: "Benefit slug already exists" }), { status: 400 });
    }
    return new Response(JSON.stringify({ error: "Failed to create benefit" }), { status: 500 });
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
      situation,
      icon,
      description,
      recommendedChants,
      targetVerseNumber,
      targetVerseText,
      targetVerseTranslation,
      detailedExposition,
      actionSteps,
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

    if (!id || !title || !slug || !description || !detailedExposition) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: id, title, slug, description, and detailedExposition are required" }),
        { status: 400 }
      );
    }

    const benefit = await prisma.benefit.upsert({
      where: id.startsWith("fallback-") ? { slug } : { id },
      update: {
        title,
        slug,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        situation: situation || "",
        icon: icon || "🙏",
        description,
        recommendedChants: recommendedChants || null,
        targetVerseNumber: targetVerseNumber ? Number(targetVerseNumber) : null,
        targetVerseText: targetVerseText || null,
        targetVerseTranslation: targetVerseTranslation || null,
        detailedExposition,
        actionSteps: actionSteps ? (typeof actionSteps === "string" ? actionSteps : JSON.stringify(actionSteps)) : null,
        coverImage: coverImage || null,
        imageAlt: imageAlt || null,
        imageTitle: imageTitle || null,
        imageCaption: imageCaption || null,
        focusKeywords: focusKeywords || null,
        internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
        sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
        faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
        published: published !== undefined ? !!published : true,
      },
      create: {
        title,
        slug,
        metaTitle: metaTitle || null,
        metaDescription: metaDescription || null,
        situation: situation || "",
        icon: icon || "🙏",
        description,
        recommendedChants: recommendedChants || null,
        targetVerseNumber: targetVerseNumber ? Number(targetVerseNumber) : null,
        targetVerseText: targetVerseText || null,
        targetVerseTranslation: targetVerseTranslation || null,
        detailedExposition,
        actionSteps: actionSteps ? (typeof actionSteps === "string" ? actionSteps : JSON.stringify(actionSteps)) : null,
        coverImage: coverImage || null,
        imageAlt: imageAlt || null,
        imageTitle: imageTitle || null,
        imageCaption: imageCaption || null,
        focusKeywords: focusKeywords || null,
        internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
        sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
        faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
        published: published !== undefined ? !!published : true,
      },
    });

    return new Response(JSON.stringify(benefit), { status: 200 });
  } catch (error) {
    console.error("Failed to update benefit:", error);
    return new Response(JSON.stringify({ error: "Failed to update benefit" }), { status: 500 });
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
      return new Response(JSON.stringify({ error: "Missing benefit ID" }), { status: 400 });
    }

    await prisma.benefit.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to delete benefit:", error);
    return new Response(JSON.stringify({ error: "Failed to delete benefit" }), { status: 500 });
  }
};
