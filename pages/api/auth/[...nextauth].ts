import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import GitHubProvider from 'next-auth/providers/github';


interface SessionType {
    id: string
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
                // I am trying to add the single property as Id in session, but TS gives me an error. It needs a type of Id. I trying to add it, but can't 
                session.user.id = token.sub;
            }
            return session
        }
    }
}

export default NextAuth(authOptions);

// import { NextAuthOptions } from 'next-auth';
// import { Session } from 'next-auth';
// import { User } from 'next-auth';
// import NextAuth from 'next-auth';
// import GitHubProvider from 'next-auth/providers/github';

// interface SessionType extends Session {
//     user: {
//         id: string;
//     };
// }

// export const authOptions: NextAuthOptions<SessionType> = {
//     providers: [
//         GitHubProvider({
//             clientId: process.env.GITHUB_CLIENT_ID as string,
//             clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
//         }),
//     ],
//     callbacks: {
//         async session({ session, token, user }) {
//             if (session?.user) {
//                 session.user.id = token.sub;
//             }
//             return session;
//         },
//     },
// };

// export default NextAuth(authOptions);