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
    const configs = await prisma.jayantiConfig.findMany({
      orderBy: { year: "desc" },
    });
    return new Response(JSON.stringify(configs), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch Jayanti configurations:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch Jayanti configurations" }), { status: 500 });
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
    const { year, date, pujaMuhurat, description } = body;

    if (!year || !date || !pujaMuhurat) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), { status: 400 });
    }

    const config = await prisma.jayantiConfig.upsert({
      where: { year: parseInt(year) },
      update: {
        date,
        pujaMuhurat,
        description: description || "",
      },
      create: {
        year: parseInt(year),
        date,
        pujaMuhurat,
        description: description || "",
      },
    });

    return new Response(JSON.stringify(config), { status: 200 });
  } catch (error) {
    console.error("Failed to save Jayanti configuration:", error);
    return new Response(JSON.stringify({ error: "Failed to save Jayanti configuration" }), { status: 500 });
  }
};
