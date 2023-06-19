import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github';

export const authOptions: NextAuthOptions = {
    // Configure GitHub authentication provider
    providers: [
        GitHubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],
}

export default NextAuth(authOptions);