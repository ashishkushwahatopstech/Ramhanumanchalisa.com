import { PrismaClient } from "@prisma/client";
import { PrismaD1 } from "@prisma/adapter-d1";

const prismaClientSingleton = () => {
  try {
    // Check if we are compiling or running in the Edge Runtime
    const isEdge = process.env.NEXT_RUNTIME === "edge" || (process.env as any).DB;
    
    if (isEdge) {
      const d1Database = (process.env as any).DB || {
        prepare: (query: string) => ({
          bind: (...args: any[]) => ({
            first: () => Promise.resolve(null),
            all: () => Promise.resolve({ results: [] }),
            run: () => Promise.resolve({ success: true, meta: {} }),
          }),
        }),
        batch: (statements: any[]) => Promise.resolve([]),
        exec: (query: string) => Promise.resolve({ count: 0, duration: 0 }),
      };
      
      const adapter = new PrismaD1(d1Database);
      return new PrismaClient({ adapter });
    }
  } catch (e) {
    console.error("Prisma Client Edge Initialization Error: ", e);
  }
  return new PrismaClient();
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
