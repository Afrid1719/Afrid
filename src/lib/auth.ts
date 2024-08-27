import { connectDB, disconnectDB } from "@/lib/mongo";
import User from "@/models/User";
import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import Google from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { CredentialsUser } from "@/interfaces/i-auth";

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login"
  },
  providers: [
    Credentials({
      name: "credentials",
      id: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<CredentialsUser | null> {
        try {
          await connectDB();
          // @ts-ignore
          const user = await User.findOne({ email: credentials?.email }).select(
            "+password"
          );
          if (!user) {
            return {
              error: "Invalid email"
            } as CredentialsUser;
          }
          if (!user.password) {
            return {
              error:
                "Password not set. Try signing using your Social Media account."
            } as CredentialsUser;
          }
          const passwordMatch = await bcrypt.compare(
            credentials!.password,
            user.password
          );
          if (!passwordMatch) {
            return {
              error: "Invalid password"
            } as CredentialsUser;
          }
          return user as CredentialsUser;
        } catch (error) {
          console.log(error);
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
  // @ts-ignore
  adapter: MongoDBAdapter(clientPromise),
  session: {
    strategy: "jwt"
  },
  callbacks: {
    async signIn({ user }) {
      let credentialUser = user as CredentialsUser;
      if (credentialUser.error) {
        throw new Error(credentialUser.error);
      }
      return true;
    }
  },
  debug: process.env.NODE_ENV === "development"
};
