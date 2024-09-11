import { ISkill } from "@/interfaces/i-home";
import { createSkill, getSkills } from "@/models/Skill";
import { success } from "@/utils/response";
import { authorizedController, unauthorizedController } from "../controller";
import { NextRequest } from "next/server";
import { sanitize } from "sanitizer";
import { zSkillCreateRequest } from "@/schemas/z-skill";

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
    for (const key in data) {
      data[key] = sanitize(data[key]);
    }
    zSkillCreateRequest.parse(data);
    const res = await createSkill(data);
    return success(res);
  };
  return await authorizedController(req, fn);
}
