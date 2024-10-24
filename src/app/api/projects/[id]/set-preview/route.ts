import { authorizedController } from "@/app/api/controller";
import { IProject } from "@/interfaces/i-home";
import { updateProject } from "@/models/Project";
import { zProjectUpdateRequest } from "@/schemas/z-project";
import { success } from "@/utils/response";
import { revalidatePath, revalidateTag } from "next/cache";
import { NextRequest } from "next/server";

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
    revalidateTag("projects.list");
    return success({ preview: res.preview });
  };
  return await authorizedController(req, fn);
}
