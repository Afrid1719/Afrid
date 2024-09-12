import { IExperience } from "@/interfaces/i-professional";
import { deleteExperience, updateExperience } from "@/models/Experience";
import { zExperienceUpdateRequest } from "@/schemas/z-experience";
import { success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const data: Partial<IExperience> = await req.json();
    zExperienceUpdateRequest.parse(data);
    const res = await updateExperience(params.id, data);
    return success(res);
  };
  return await authorizedController(req, fn);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const res = await deleteExperience(params.id);
    return success(res);
  };
  return await authorizedController(req, fn);
}
