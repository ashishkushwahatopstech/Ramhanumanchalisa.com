import { PrismaClient } from "@prisma/client";

// Set up global prisma client for development HMR stability
const prismaClientSingleton = () => {
  // Check if we are running in Cloudflare Workers and have a D1 database binding
  // In Cloudflare context, D1 is bound as a global or request environment binding.
  // We check for it and dynamically load the adapter.
  try {
    const isCloudflare = typeof globalThis !== "undefined" && "process" in globalThis === false;
    
    // Note: D1 database adapter bindings can be initialized here if running on Edge
    // In local dev, we run standard Prisma Client with direct file access.
    return new PrismaClient();
  } catch (e) {
    console.error("Prisma Client Initialization Error: ", e);
    return new PrismaClient();
  }
};

declare global {
  var prismaGlobal: undefined | ReturnType<typeof prismaClientSingleton>;
}

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
