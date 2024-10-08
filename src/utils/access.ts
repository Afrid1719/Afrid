import "server-only";

import { NextRequest } from "next/server";
import { decode } from "next-auth/jwt";
import { allowedUsers } from "./allowed-users";
import { cookies } from "next/headers";

export async function decodeSession(token: string) {
  try {
    return await decode({ token, secret: process.env.NEXTAUTH_SECRET });
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function isAllowed(req?: NextRequest) {
  let token = "";
  let cookieName = "";
  if (process.env.NODE_ENV === "development") {
    cookieName = "next-auth.session-token";
  } else {
    cookieName = "__Secure-next-auth.session-token";
  }
  if (!req) {
    token = cookies().get(cookieName)?.value;
  } else {
    token = req.cookies.get(cookieName)?.value;
  }
  const session = await decodeSession(token);
  if (!session) {
    return false;
  }
  return allowedUsers.includes(session.email);
}
