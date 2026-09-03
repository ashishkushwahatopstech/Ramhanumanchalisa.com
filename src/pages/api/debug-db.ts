import type { APIRoute } from "astro";
import { getPrisma } from "../../lib/prisma";

export const GET: APIRoute = async (context) => {
  const runtime = context.locals.runtime;
  const env = runtime?.env || (globalThis as any).__env__ || {};
  const db = env.DB;

  let d1QuerySuccess = false;
  let d1Error: any = null;
  let postCount: number | null = null;

  if (db && typeof db.prepare === "function") {
    try {
      const result = await db.prepare("SELECT count(*) as count FROM Post").first();
      d1QuerySuccess = true;
      postCount = result ? (result.count as number) : 0;
    } catch (e: any) {
      d1Error = e.message || String(e);
    }
  }

  let d1AdapterError: any = null;
  let d1AdapterWorks = false;
  let prismaPostCount: number | null = null;
  let prismaPostData: any = null;
  try {
    const { PrismaD1 } = await import("@prisma/adapter-d1");
    const { PrismaClient } = await import("@prisma/client");
    const adapter = new PrismaD1(db);
    const client = new PrismaClient({ adapter });
    const p = await client.post.findMany();
    d1AdapterWorks = true;
    prismaPostCount = p ? p.length : 0;
    prismaPostData = p?.map((x) => ({ id: x.id, slug: x.slug, coverImage: x.coverImage }));
  } catch (err: any) {
    d1AdapterError = {
      message: err.message,
      stack: err.stack,
      name: err.name
    };
  }

  return new Response(
    JSON.stringify({
      hasRuntime: !!runtime,
      hasEnv: !!runtime?.env,
      envKeys: Object.keys(env),
      hasDB: !!db,
      isD1Instance: !!(db && typeof db.prepare === "function"),
      d1QuerySuccess,
      postCount,
      d1Error,
      prismaPostCount,
      prismaPostData,
      d1AdapterWorks,
      d1AdapterError,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
