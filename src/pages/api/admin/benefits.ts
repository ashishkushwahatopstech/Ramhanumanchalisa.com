import type { APIRoute } from "astro";
import { getPrisma } from "../../../lib/prisma";
import { BENEFITS_DATA } from "../../../data/benefits";
import { saveCachedBenefit, getAllCachedBenefits } from "../../../lib/dynamicContent";
import { d1GetBenefits, d1UpsertBenefit, d1DeleteBenefit } from "../../../lib/d1";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export const GET: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;
  let benefits: any[] = [];

  // 1. Try Native Cloudflare D1 first
  if (db && typeof db.prepare === "function") {
    try {
      benefits = await d1GetBenefits(db);
    } catch (e) {
      console.warn("Notice: D1 getBenefits query fallback:", e);
    }
  }

  // 2. Prisma fallback
  if (benefits.length === 0) {
    const prisma = getPrisma(db);
    if (prisma) {
      try {
        const dbBenefits = await prisma.benefit.findMany({
          orderBy: { createdAt: "desc" },
        });
        if (dbBenefits && Array.isArray(dbBenefits)) {
          benefits = dbBenefits.map((b) => ({
            ...b,
            createdAt: b.createdAt ? new Date(b.createdAt).toISOString() : new Date().toISOString(),
            updatedAt: b.updatedAt ? new Date(b.updatedAt).toISOString() : new Date().toISOString(),
          }));
        }
      } catch (error) {
        console.warn("Notice: DB benefits query fallback in GET API:", error);
      }
    }
  }

  const dbSlugs = new Set(benefits.map((b) => b.slug));

  // Merge cached benefits
  const cachedBenefits = getAllCachedBenefits().filter((b) => !dbSlugs.has(b.slug));
  cachedBenefits.forEach((b) => dbSlugs.add(b.slug));

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

  return new Response(JSON.stringify([...benefits, ...cachedBenefits, ...fallbackList]), { status: 200 });
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
      galleryImages,
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

    let benefit: any = null;
    const benefitData = {
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
      galleryImages: galleryImages ? (typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages)) : null,
      focusKeywords: focusKeywords || null,
      internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
      sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
      faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
      published: published !== undefined ? !!published : true,
    };

    // 1. Try Native D1 first
    if (db && typeof db.prepare === "function") {
      try {
        benefit = await d1UpsertBenefit(db, benefitData);
      } catch (e) {
        console.warn("Notice: D1 upsertBenefit failed in POST:", e);
      }
    }

    // 2. Prisma fallback
    if (!benefit) {
      const prisma = getPrisma(db);
      if (prisma) {
        try {
          const existing = await prisma.benefit.findUnique({ where: { slug } });
          if (existing) {
            benefit = await prisma.benefit.update({
              where: { id: existing.id },
              data: benefitData,
            });
          } else {
            benefit = await prisma.benefit.create({
              data: benefitData,
            });
          }
        } catch (dbErr: any) {
          console.warn("Notice: Prisma in POST failed, falling back to cache:", dbErr);
        }
      }
    }

    if (!benefit) {
      benefit = {
        id: `benefit-${slug}`,
        ...benefitData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    saveCachedBenefit(benefit);
    return new Response(JSON.stringify(benefit), { status: 200 });
  } catch (error) {
    console.error("Failed to create benefit:", error);
    return new Response(JSON.stringify({ error: "Failed to create benefit" }), { status: 500 });
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
      galleryImages,
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

    let benefit: any = null;
    const benefitData = {
      id,
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
      galleryImages: galleryImages ? (typeof galleryImages === "string" ? galleryImages : JSON.stringify(galleryImages)) : null,
      focusKeywords: focusKeywords || null,
      internalLinks: internalLinks ? (typeof internalLinks === "string" ? internalLinks : JSON.stringify(internalLinks)) : null,
      sources: sources ? (typeof sources === "string" ? sources : JSON.stringify(sources)) : null,
      faqs: faqs ? (typeof faqs === "string" ? faqs : JSON.stringify(faqs)) : null,
      published: published !== undefined ? !!published : true,
    };

    // 1. Try Native D1 first
    if (db && typeof db.prepare === "function") {
      try {
        benefit = await d1UpsertBenefit(db, benefitData);
      } catch (e) {
        console.warn("Notice: D1 upsertBenefit failed in PUT:", e);
      }
    }

    // 2. Prisma fallback
    if (!benefit) {
      const prisma = getPrisma(db);
      if (prisma) {
        try {
          const existing = await prisma.benefit.findFirst({
            where: {
              OR: [
                { slug },
                ...(id && !id.startsWith("fallback-") ? [{ id }] : [])
              ]
            }
          });

          if (existing) {
            benefit = await prisma.benefit.update({
              where: { id: existing.id },
              data: benefitData,
            });
          } else {
            benefit = await prisma.benefit.create({
              data: benefitData,
            });
          }
        } catch (dbErr) {
          console.warn("Notice: Prisma update benefit failed, falling back to cache:", dbErr);
        }
      }
    }

    if (!benefit) {
      benefit = {
        id: id.startsWith("fallback-") ? id : (id || `benefit-${slug}`),
        ...benefitData,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
    }

    saveCachedBenefit(benefit);
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

  try {
    const { searchParams } = new URL(context.request.url);
    const id = searchParams.get("id");

    if (!id) {
      return new Response(JSON.stringify({ error: "Missing benefit ID" }), { status: 400 });
    }

    // 1. Native D1 delete
    if (db && typeof db.prepare === "function") {
      try {
        await d1DeleteBenefit(db, id);
      } catch (e) {
        console.warn("Notice: D1 deleteBenefit failed:", e);
      }
    }

    // 2. Prisma fallback
    const prisma = getPrisma(db);
    if (prisma) {
      try {
        await prisma.benefit.delete({
          where: { id },
        });
      } catch (e) {
        console.warn("Notice: Prisma delete benefit failed:", e);
      }
    }

    if (globalThis.__BENEFITS_CACHE__) {
      for (const slug of Object.keys(globalThis.__BENEFITS_CACHE__)) {
        if (globalThis.__BENEFITS_CACHE__[slug].id === id) {
          delete globalThis.__BENEFITS_CACHE__[slug];
        }
      }
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to delete benefit:", error);
    return new Response(JSON.stringify({ error: "Failed to delete benefit" }), { status: 500 });
  }
};
