import { IProject } from "@/interfaces/i-home";
import { createProject, getAllProjects } from "@/models/Project";
import { zProjectCreateRequest } from "@/schemas/z-project";
import { created, success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController, unauthorizedController } from "../controller";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET() {
  const fn = async function () {
    const data: IProject[] = await getAllProjects();
    return success(data);
  };
  return await unauthorizedController(fn);
}

export async function POST(req: NextRequest) {
  const fn = async function () {
    const data: IProject = await req.json();
    zProjectCreateRequest.parse(data);
    const res = await createProject(data);
    revalidatePath("/home");
    revalidateTag("profile.projects");
    return created(res);
  };
  return await authorizedController(req, fn);
}
