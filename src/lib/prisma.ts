import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

function createSafePrismaMock() {
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

let prismaInstance: PrismaClient | null = null;

export function getPrisma(db?: any): PrismaClient {
  if (db) {
    try {
      // In Cloudflare D1 worker execution
      if (!prismaInstance) {
        const adapter = new PrismaD1(db);
        prismaInstance = new PrismaClient({ adapter });
      }
      return prismaInstance;
    } catch (e) {
      console.error("Prisma D1 Client Initialization Error: ", e);
    }
  }

  // Local development / fallback
  if (!globalThis.prismaGlobal) {
    try {
      globalThis.prismaGlobal = new PrismaClient();
    } catch (e) {
      console.warn("Notice: Prisma local client not available, using safe mock client:", e);
      return createSafePrismaMock() as PrismaClient;
    }
  }
  return globalThis.prismaGlobal || (createSafePrismaMock() as PrismaClient);
}

declare global {
  var prismaGlobal: undefined | PrismaClient;
}

const prisma = getPrisma();
export default prisma;


