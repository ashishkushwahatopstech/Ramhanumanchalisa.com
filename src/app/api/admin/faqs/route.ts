export const runtime = 'edge';
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

async function checkAuth() {
  const session = { user: { email: "ashishkushwaha88643@gmail.com" } };
  return session && session.user?.email === "ashishkushwaha88643@gmail.com";
}

export async function GET(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const pageSlug = searchParams.get("pageSlug");
    
    let faqs;
    if (pageSlug) {
      faqs = await prisma.faq.findMany({
        where: { pageSlug },
        orderBy: { order: "asc" },
      });
    } else {
      faqs = await prisma.faq.findMany({
        orderBy: { pageSlug: "asc" },
      });
    }
    
    return NextResponse.json(faqs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch FAQs" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const body = await request.json();
    const { pageSlug, question, answer, order } = body;

    if (!pageSlug || !question || !answer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const faq = await prisma.faq.create({
      data: {
        pageSlug,
        question,
        answer,
        order: order !== undefined ? parseInt(order) : 0,
      },
    });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create FAQ" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const body = await request.json();
    const { id, pageSlug, question, answer, order } = body;

    if (!id || !pageSlug || !question || !answer) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const faq = await prisma.faq.update({
      where: { id },
      data: {
        pageSlug,
        question,
        answer,
        order: order !== undefined ? parseInt(order) : 0,
      },
    });

    return NextResponse.json(faq);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update FAQ" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return new Response("Unauthorized", { status: 403 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing FAQ ID" }, { status: 400 });
    }

    await prisma.faq.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete FAQ" }, { status: 500 });
  }
}
