import { IAdminRequest } from "@/interfaces/i-admin";
import { zAdminCreateRequest } from "@/schemas/z-admin";
import { createAdmin } from "@/services/admin.mongo";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

export async function POST(request: NextRequest) {
  const data: IAdminRequest = await request.json();
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
