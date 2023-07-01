import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from "next-auth/providers/github";

interface SessionType {
  id: string;
}

export const authOptions: NextAuthOptions = {
  // Configure GitHub authentication provider
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      if (session?.user) {
        // I am trying to add the single property as Id in session, but TS gives me an error. It needs a type of Id. I trying to add it, but can't and if we use email it gives ID but in email properties
        session.user.email = token.sub;
      }
      return session;
    },
  },
};

export default NextAuth(authOptions);
