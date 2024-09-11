import { ISkill } from "@/interfaces/i-home";
import { deleteSkill, updateSkill } from "@/models/Skill";
import { zSkillUpdateRequest } from "@/schemas/z-skill";
import { success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const skill: Partial<ISkill> = await req.json();
    const updatedSkill = await updateSkill(params.id, skill);
    zSkillUpdateRequest.parse(skill);
    return success(updatedSkill);
  };
  return await authorizedController(req, fn);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const res = await deleteSkill(params.id);
    return success(res);
  };
  return await authorizedController(req, fn);
}
