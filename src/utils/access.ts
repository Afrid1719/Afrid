import "server-only";

import { NextRequest } from "next/server";
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";
import { getAdminByEmailOrId } from "@/models/Admin";

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
  const admin = await getAdminByEmailOrId(session.email);
  return admin && !admin?.blocked;
}
