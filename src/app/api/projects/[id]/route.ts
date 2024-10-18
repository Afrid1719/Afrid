import { IProject } from "@/interfaces/i-home";
import { deleteProject, updateProject } from "@/models/Project";
import { zProjectUpdateRequest } from "@/schemas/z-project";
import { success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";
import { revalidatePath, revalidateTag } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const data: Partial<IProject> = await req.json();
    zProjectUpdateRequest.parse(data);
    const res = await updateProject(params.id, data);
    revalidatePath("/home");
    revalidateTag("profile.projects");
    return success(res);
  };
  return await authorizedController(req, fn);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const res = await deleteProject(params.id);
    revalidatePath("/home");
    revalidateTag("profile.projects");
    return success(res);
  };
  return await authorizedController(req, fn);
}
