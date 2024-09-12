import { connectDB, disconnectDB } from "@/lib/mongo";
import User from "@/models/User";
import Admin from "@/models/Admin";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import clientPromise from "@/lib/mongo";
import type { Adapter } from "next-auth/adapters";
import { MongoClient } from "mongodb";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/admin"
  },
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
        isAdmin: { label: "Is Admin", type: "boolean" }
      },
      async authorize(
        credentials: Record<"email" | "password" | "isAdmin", string>
      ) {
        try {
          await connectDB();
          if (credentials.isAdmin === "true") {
            const admin = await Admin.findOne({
              email: credentials?.email
            }).select("+password");
            if (!admin) {
              throw new Error("Admin not found");
            }
            if (admin.blocked) {
              throw new Error("You are blocked");
            }
            const passwordMatch = await bcrypt.compare(
              credentials!.password,
              admin.password
            );
            if (!passwordMatch) {
              throw new Error("Password did not match");
            }
            return {
              id: admin._id.toString(),
              email: admin.email,
              name: admin.name
            };
          } else {
            const user = await User.findOne({
              email: credentials?.email
            }).select("+password");
            if (!user) {
              throw new Error("User not found");
            }
            if (!user.password) {
              throw new Error(
                "Password not set. Try signing using your Social Media account."
              );
            }
            const passwordMatch = await bcrypt.compare(
              credentials!.password,
              user.password
            );
            if (!passwordMatch) {
              throw new Error("Password did not match");
            }
            return {
              id: user._id.toString(),
              email: user.email,
              name: user.name
            };
          }
        } catch (error) {
          console.log("Authorization error:", error); // Log the error for debugging
          throw error;
        } finally {
          await disconnectDB();
        }
      }
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  adapter: MongoDBAdapter(
    clientPromise as unknown as Promise<MongoClient>
  ) as Adapter,
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60 // 30 days
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    }
  },
  debug: process.env.NODE_ENV === "development",
  secret: process.env.NEXTAUTH_SECRET
};
