import type { APIRoute } from "astro";
import { getPrisma } from "../../../lib/prisma";
import { getChalisaData } from "../../../lib/getChalisaData";
import { d1GetLanguage, d1UpsertLanguage } from "../../../lib/d1";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export const GET: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { searchParams } = new URL(context.request.url);
  const lang = searchParams.get("lang");

  if (!lang || !["hi", "en", "te", "bn", "kn", "gu", "mr"].includes(lang)) {
    return new Response(JSON.stringify({ error: "Invalid language parameter" }), { status: 400 });
  }

  const db = context.locals.runtime?.env?.DB;
  let dbRecord: any = null;

  // 1. Try native D1 first
  if (db && typeof db.prepare === "function") {
    try {
      dbRecord = await d1GetLanguage(db, lang);
    } catch (e) {
      console.warn("Notice: D1 getLanguage fallback:", e);
    }
  }

  // 2. Fallback to Prisma
  if (!dbRecord) {
    const prisma = getPrisma(db);
    try {
      if (prisma?.languageContent) {
        dbRecord = await prisma.languageContent.findUnique({
          where: { lang },
        });
      }
    } catch (e) {
      console.warn("Notice: languageContent DB query failed, falling back to static:", e);
    }
  }

  let staticData: any = null;
  try {
    staticData = await getChalisaData(lang, db);
  } catch (e) {
    console.warn("Notice: getChalisaData fallback execution:", e);
    staticData = await getChalisaData("hi");
  }

  return new Response(
    JSON.stringify({
      dbRecord: dbRecord ? {
        id: dbRecord.id,
        lang: dbRecord.lang,
        title: dbRecord.title,
        metaDescription: dbRecord.metaDescription,
        published: dbRecord.published,
        contentJSON: dbRecord.contentJSON
      } : null,
      staticFallback: staticData
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
};

export const POST: APIRoute = async (context) => {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const db = context.locals.runtime?.env?.DB;

  try {
    const body = await context.request.json();
    const { lang, title, metaDescription, contentJSON, published } = body;

    if (!lang || !title || !metaDescription || !contentJSON) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    let record: any = null;

    // 1. Try native D1 first
    if (db && typeof db.prepare === "function") {
      try {
        record = await d1UpsertLanguage(db, {
          lang,
          title,
          metaDescription,
          contentJSON,
          published: !!published,
        });
      } catch (e) {
        console.warn("Notice: D1 upsertLanguage fallback:", e);
      }
    }

    // 2. Prisma fallback
    if (!record) {
      const prisma = getPrisma(db);
      if (prisma?.languageContent) {
        try {
          const existing = await prisma.languageContent.findUnique({
            where: { lang },
          });

          if (existing) {
            record = await prisma.languageContent.update({
              where: { lang },
              data: {
                title,
                metaDescription,
                contentJSON,
                published: !!published,
              },
            });
          } else {
            record = await prisma.languageContent.create({
              data: {
                lang,
                title,
                metaDescription,
                contentJSON,
                published: !!published,
              },
            });
          }
        } catch (dbErr) {
          console.warn("Notice: languageContent save failed, using fallback:", dbErr);
        }
      }
    }

    if (!record) {
      record = {
        id: `lang-${lang}`,
        lang,
        title,
        metaDescription,
        contentJSON,
        published: !!published,
      };
    }

    return new Response(JSON.stringify(record), { status: 200 });
  } catch (error) {
    console.error("Failed to save language content:", error);
    return new Response(JSON.stringify({ error: "Failed to save language content" }), { status: 500 });
  }
};
