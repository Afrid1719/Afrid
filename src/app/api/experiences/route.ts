import { createExperience, getAllExperiences } from "@/models/Experience";
import { success } from "@/utils/response";
import { authorizedController, unauthorizedController } from "../controller";
import { NextRequest } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET() {
  const fn = async function () {
    const data = await getAllExperiences();
    return success(data);
  };
  return await unauthorizedController(fn);
}

export async function POST(req: NextRequest) {
  const fn = async function () {
    const data = await req.json();
    const res = await createExperience(data);
    revalidatePath("/professional");
    revalidateTag("profile.experiences");
    return success(res);
  };
  return await authorizedController(req, fn);
}
