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
    const { searchParams } = new URL(context.request.url);
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
    
    return new Response(JSON.stringify(faqs), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch FAQs" }), { status: 500 });
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
    const { pageSlug, question, answer, order } = body;

    if (!pageSlug || !question || !answer) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const faq = await prisma.faq.create({
      data: {
        pageSlug,
        question,
        answer,
        order: order !== undefined ? parseInt(order) : 0,
      },
    });

    return new Response(JSON.stringify(faq), { status: 200 });
  } catch (error) {
    console.error("Failed to create FAQ:", error);
    return new Response(JSON.stringify({ error: "Failed to create FAQ" }), { status: 500 });
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
    const { id, pageSlug, question, answer, order } = body;

    if (!id || !pageSlug || !question || !answer) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
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

    return new Response(JSON.stringify(faq), { status: 200 });
  } catch (error) {
    console.error("Failed to update FAQ:", error);
    return new Response(JSON.stringify({ error: "Failed to update FAQ" }), { status: 500 });
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
      return new Response(JSON.stringify({ error: "Missing FAQ ID" }), { status: 400 });
    }

    await prisma.faq.delete({
      where: { id },
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Failed to delete FAQ:", error);
    return new Response(JSON.stringify({ error: "Failed to delete FAQ" }), { status: 500 });
  }
};
