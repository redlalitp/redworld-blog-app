import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import {clientPromise} from "../../../lib/mongodb";

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async session({ session, user }) {
        // Add role to session
        session.user.role = user.role ?? "user";
        return session;
      },
      async signIn({ user, account, profile }) {
        const client = await clientPromise;
        const db = client.db("redworld-blog-app");

        // Check if user already has a role, otherwise assign based on email
        const existingUser = await db.collection("users").findOne({ email: user.email });

        if (existingUser && !existingUser.role) {
          // Assign admin role to this user
          await db.collection("users").updateOne(
              { email: user.email },
              { $set: { role: "user" } }
          );
        }

        return true;
      },
    },
};

export default NextAuth(authOptions);
