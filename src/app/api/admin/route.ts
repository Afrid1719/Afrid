import { IAdmin } from "@/interfaces/i-admin";
import { createAdmin } from "@/models/Admin";
import { zAdminCreateRequest } from "@/schemas/z-admin";
import { isAllowed } from "@/utils/access";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const data: IAdmin = await request.json();
  if (!(await isAllowed(request))) {
    return NextResponse.json(
      { id: "auth_failed", message: "Unauthorized" },
      { status: 401 }
    );
  }
  try {
    zAdminCreateRequest.parse(data);
    const admin = await createAdmin(data);
    return NextResponse.json(admin);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        error.errors.map((err) => err.message),
        { status: 400 }
      );
    }
    return NextResponse.json((error as Error).message, { status: 500 });
  }
}
