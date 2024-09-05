import { local, ReturnType } from "@/utils/image-placeholder";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  params: { params: { returnType: ReturnType } }
) {
  const { returnType } = params.params;
  let src = req.nextUrl.searchParams.get("src");

  if (!src) {
    return NextResponse.json({ error: "Missing src" }, { status: 400 });
  }
  if (!returnType) {
    return NextResponse.json({ error: "Missing returnType" }, { status: 400 });
  }
  const data = await local(src);
  return NextResponse.json({ data: data[returnType as keyof typeof data] });
}
