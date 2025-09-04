import NextAuth, {type NextAuthOptions} from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import {MongoDBAdapter} from "@next-auth/mongodb-adapter";
import {clientPromise} from "../../../lib/mongodb";

// Extend NextAuth types to include "role" on User and Session.user
declare module "next-auth" {
    interface User {
        role?: "admin" | "user";
    }

    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            role?: "admin" | "user";
        };
    }
}

// Constants to avoid magic strings and centralize config
const DB_NAME = "redworld-blog-app";
const DEFAULT_ROLE: "admin" | "user" = "user";

// Small helper to ensure a user has a role assigned
async function ensureDefaultUserRole(email?: string | null) {
    if (!email) return;
    const client = await clientPromise;
    const db = client.db(DB_NAME);
    const users = db.collection("users");

    const existingUser = await users.findOne<{ role?: string }>({email});
    if (existingUser && !existingUser.role) {
        await users.updateOne({email}, {$set: {role: DEFAULT_ROLE}});
    }
}

export const authOptions: NextAuthOptions = {
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({session, user}) {
            // Propagate role to session; fall back to default
            if (session.user) {
                session.user.role = (user.role as "admin" | "user" | undefined) ?? DEFAULT_ROLE;
            }
            return session;
        },
        async signIn({user}) {
            // Ensure first-time users receive a default role
            await ensureDefaultUserRole(user.email);
            return true;
        },
    },
};

export default NextAuth(authOptions);
