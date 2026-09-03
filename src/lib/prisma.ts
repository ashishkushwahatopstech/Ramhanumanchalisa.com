import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

let prismaInstance: PrismaClient | null = null;

export function getPrisma(db?: any): PrismaClient | null {
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
      console.warn("Notice: Prisma local client initialization not available in current environment:", e);
      return null;
    }
  }
  return globalThis.prismaGlobal || null;
}

declare global {
  var prismaGlobal: undefined | PrismaClient;
}

const prisma = getPrisma();
export default prisma;

