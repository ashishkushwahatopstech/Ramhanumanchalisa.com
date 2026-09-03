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

  let prismaError: any = null;
  let prismaPostCount: number | null = null;
  let prismaPostData: any = null;
  try {
    const prisma = getPrisma(db);
    const posts = await prisma.post.findMany();
    prismaPostCount = posts ? posts.length : 0;
    prismaPostData = posts?.map((p) => ({ id: p.id, slug: p.slug, coverImage: p.coverImage }));
  } catch (pe: any) {
    prismaError = pe.message || String(pe);
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
      prismaError,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
};
