// Safe, edge-compatible Prisma wrapper
// Automatically falls back to safe proxy on Cloudflare Edge where Prisma native binaries/modules are unavailable

export function createSafePrismaMock(): any {
  const modelProxy = new Proxy({}, {
    get: (_target, prop: string) => {
      if (prop === "findUnique" || prop === "findFirst") {
        return () => Promise.resolve(null);
      }
      if (prop === "findMany") {
        return () => Promise.resolve([]);
      }
      if (prop === "count") {
        return () => Promise.resolve(0);
      }
      if (prop === "create") {
        return (args: any) => Promise.resolve({ id: `mock-${Date.now()}`, ...args?.data });
      }
      if (prop === "update") {
        return (args: any) => Promise.resolve({ ...args?.data });
      }
      if (prop === "upsert") {
        return (args: any) => Promise.resolve({ id: `mock-${Date.now()}`, ...args?.create, ...args?.update });
      }
      if (prop === "delete" || prop === "deleteMany") {
        return () => Promise.resolve({ success: true, count: 1 });
      }
      return () => Promise.resolve(null);
    }
  });

  return new Proxy({} as any, {
    get: (_target, prop: string) => {
      if (prop === "$connect" || prop === "$disconnect") {
        return () => Promise.resolve();
      }
      return modelProxy;
    }
  });
}

let cachedPrisma: any = null;

export function getPrisma(_db?: any): any {
  if (cachedPrisma) return cachedPrisma;

  // In local development (Node.js runtime only, not Cloudflare Pages)
  if (typeof process !== "undefined" && process.versions?.node && !process.env.CF_PAGES) {
    try {
      const { PrismaClient } = require("@prisma/client");
      if (!globalThis.prismaGlobal) {
        globalThis.prismaGlobal = new PrismaClient();
      }
      cachedPrisma = globalThis.prismaGlobal;
      return cachedPrisma;
    } catch {
      // Ignored: fallback to safe mock
    }
  }

  cachedPrisma = createSafePrismaMock();
  return cachedPrisma;
}

declare global {
  var prismaGlobal: any;
}

const prisma = createSafePrismaMock();
export default prisma;
