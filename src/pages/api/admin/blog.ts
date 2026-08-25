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
    const { title, slug, content, excerpt, published } = body;

    if (!title || !slug || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const post = await prisma.post.create({
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || "",
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
    const { id, title, slug, content, excerpt, published } = body;

    if (!id || !title || !slug || !content) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const post = await prisma.post.update({
      where: { id },
      data: {
        title,
        slug,
        content,
        excerpt: excerpt || "",
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
