import { PrismaClient } from "@prisma/client/edge";
import { PrismaD1 } from "@prisma/adapter-d1";

let prismaInstance: PrismaClient | null = null;

export function getPrisma(db?: any): PrismaClient {
  if (db) {
    try {
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
      console.warn("Prisma local client fallback initialization failed on Edge:", e);
      // Return a safe mock client to let the app fall back to local JSON stores cleanly
      return new Proxy({} as any, {
        get: () => {
          return () => ({
            findUnique: () => Promise.resolve(null),
            findMany: () => Promise.resolve([]),
            findFirst: () => Promise.resolve(null),
            count: () => Promise.resolve(0),
          });
        }
      });
    }
  }
  return globalThis.prismaGlobal;
}

declare global {
  var prismaGlobal: undefined | PrismaClient;
}

const prisma = getPrisma();
export default prisma;
