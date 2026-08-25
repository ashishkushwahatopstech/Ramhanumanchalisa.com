import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import prisma from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as any,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "PLACEHOLDER_CLIENT_ID",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "PLACEHOLDER_CLIENT_SECRET",
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ user }) {
      // Hardcoded server-side gate check
      if (user.email === "ashishkushwaha88643@gmail.com") {
        return true;
      }
      // Rejects any other sign-in attempt with a 403 / Access Denied error page
      return false;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.email = token.email || "";
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.email = user.email || "";
      }
      return token;
    },
  },
  pages: {
    signIn: "/admin/login",
    error: "/admin/login",
  },
  secret: process.env.NEXTAUTH_SECRET || "fallback-secret-key-123456",
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
