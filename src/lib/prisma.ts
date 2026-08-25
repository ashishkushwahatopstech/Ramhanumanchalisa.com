import { PrismaClient } from "@prisma/client";
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
    globalThis.prismaGlobal = new PrismaClient();
  }
  return globalThis.prismaGlobal;
}

declare global {
  var prismaGlobal: undefined | PrismaClient;
}

const prisma = getPrisma();
export default prisma;
