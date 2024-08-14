import { connectDB, disconnectDB } from "@/lib/mongo";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          await connectDB();
          // @ts-ignore
          const user = await User.findOne({ email: credentials?.email }).select(
            "+password",
          );
          console.log("user", user);
          if (!user) {
            throw new Error("Invalid email");
          }
          const passwordMatch = await bcrypt.compare(
            credentials!.password,
            user.password,
          );
          if (!passwordMatch) {
            throw new Error("Invalid password");
          }
          return user;
        } catch (error) {
          console.log(error);
        } finally {
          await disconnectDB();
        }
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile.id;
      }
      return token;
    },
  },
  session: {
    strategy: "jwt",
  },
  debug: process.env.NODE_ENV === "development",
};
