import { ISkill } from "@/interfaces/i-home";
import { createSkill, getSkills } from "@/models/Skill";
import { success } from "@/utils/response";
import { authorizedController, unauthorizedController } from "../controller";
import { NextRequest } from "next/server";
import { zSkillCreateRequest } from "@/schemas/z-skill";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET() {
  const fn = async function () {
    const data: ISkill[] = await getSkills();
    return success(data);
  };
  return await unauthorizedController(fn);
}

export async function POST(req: NextRequest) {
  const fn = async function () {
    const data: ISkill = await req.json();
    zSkillCreateRequest.parse(data);
    const res = await createSkill(data);
    revalidateTag("profile.skills");
    revalidatePath("/home");
    return success(res);
  };
  return await authorizedController(req, fn);
}
