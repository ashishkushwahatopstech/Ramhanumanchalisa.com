import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { getChalisaData } from "@/lib/getChalisaData";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export async function GET(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  const { searchParams } = new URL(request.url);
  const lang = searchParams.get("lang");

  if (!lang || !["hi", "en", "te", "bn", "kn"].includes(lang)) {
    return NextResponse.json({ error: "Invalid language parameter" }, { status: 400 });
  }

  try {
    const dbRecord = await prisma.languageContent.findUnique({
      where: { lang },
    });

    const staticData = await getChalisaData(lang);

    return NextResponse.json({
      dbRecord: dbRecord ? {
        id: dbRecord.id,
        lang: dbRecord.lang,
        title: dbRecord.title,
        metaDescription: dbRecord.metaDescription,
        published: dbRecord.published,
        contentJSON: dbRecord.contentJSON
      } : null,
      staticFallback: staticData
    });
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch language data" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const body = await request.json();
    const { lang, title, metaDescription, contentJSON, published } = body;

    if (!lang || !title || !metaDescription || !contentJSON) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

    return NextResponse.json(record);
  } catch (error) {
    return NextResponse.json({ error: "Failed to save language content" }, { status: 500 });
  }
}
