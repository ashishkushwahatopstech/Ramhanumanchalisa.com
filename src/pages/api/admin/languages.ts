import type { APIRoute } from "astro";
import { getPrisma } from "../../../lib/prisma";
import { getChalisaData } from "../../../lib/getChalisaData";

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

  if (!lang || !["hi", "en", "te", "bn", "kn"].includes(lang)) {
    return new Response(JSON.stringify({ error: "Invalid language parameter" }), { status: 400 });
  }

  const db = context.locals.runtime?.env?.DB;
  const prisma = getPrisma(db);

  try {
    const dbRecord = await prisma.languageContent.findUnique({
      where: { lang },
    });

    const staticData = await getChalisaData(lang, db);

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
  } catch (error) {
    console.error("Failed to fetch language data:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch language data" }), { status: 500 });
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
    const { lang, title, metaDescription, contentJSON, published } = body;

    if (!lang || !title || !metaDescription || !contentJSON) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const record = await prisma.languageContent.upsert({
      where: { lang },
      update: {
        title,
        metaDescription,
        contentJSON,
        published: !!published,
      },
      create: {
        lang,
        title,
        metaDescription,
        contentJSON,
        published: !!published,
      },
    });

    return new Response(JSON.stringify(record), { status: 200 });
  } catch (error) {
    console.error("Failed to save language content:", error);
    return new Response(JSON.stringify({ error: "Failed to save language content" }), { status: 500 });
  }
};
