import { success } from "@/utils/response";
import { authorizedController, unauthorizedController } from "../controller";
import { NextRequest } from "next/server";
import { createAcademics, getAllAcademics } from "@/models/Academics";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET() {
  const fn = async function () {
    const data = await getAllAcademics();
    return success(data);
  };
  return await unauthorizedController(fn);
}

export async function POST(req: NextRequest) {
  const fn = async function () {
    const data = await req.json();
    const res = await createAcademics(data);
    revalidateTag("profile.academics");
    revalidatePath("/professional");
    return success(res);
  };
  return await authorizedController(req, fn);
}
