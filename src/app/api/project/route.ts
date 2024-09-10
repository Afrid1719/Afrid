import { IProject } from "@/interfaces/i-home";
import { createProject } from "@/models/Project";
import { zProjectCreateRequest } from "@/schemas/z-project";
import { isAllowed } from "@/utils/access";
import { NextRequest, NextResponse } from "next/server";
import { sanitize } from "sanitizer";
import { z } from "zod";

export async function GET() {}

export async function POST(req: NextRequest) {
  if (!(await isAllowed(req))) {
    return NextResponse.json(
      { id: "auth_failed", message: "Unauthorized" },
      { status: 401 }
    );
  }
  const data: IProject = await req.json();
  try {
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key] = (data[key] as string[]).map((item) => sanitize(item));
      }
      data[key] = sanitize(data[key] as string);
    }
    zProjectCreateRequest.parse(data);
    const res = await createProject(data);
    return NextResponse.json(res);
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
