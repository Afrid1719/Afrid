import { IProject } from "@/interfaces/i-home";
import { createProject, getAllProjects } from "@/models/Project";
import { zProjectCreateRequest } from "@/schemas/z-project";
import { created, success } from "@/utils/response";
import { NextRequest } from "next/server";
import { sanitize } from "sanitizer";
import { authorizedController, unauthorizedController } from "../controller";

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
    for (const key in data) {
      if (Array.isArray(data[key])) {
        data[key] = (data[key] as string[]).map((item) => sanitize(item));
      } else {
        data[key] = sanitize(data[key] as string);
      }
    }
    zProjectCreateRequest.parse(data);
    const res = await createProject(data);
    return created(res);
  };
  return await authorizedController(req, fn);
}
