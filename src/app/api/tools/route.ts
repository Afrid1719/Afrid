import { success } from "@/utils/response";
import { authorizedController, unauthorizedController } from "../controller";
import { NextRequest } from "next/server";
import { ITool } from "@/interfaces/i-home";
import { createTool, getTools } from "@/models/Tool";
import { zToolCreateRequest } from "@/schemas/z-tool";

export async function GET() {
  const fn = async function () {
    const data: ITool[] = await getTools();
    return success(data);
  };
  return await unauthorizedController(fn);
}

export async function POST(req: NextRequest) {
  const fn = async function () {
    const data: ITool = await req.json();
    zToolCreateRequest.parse(data);
    const res = await createTool(data);
    return success(res);
  };
  return await authorizedController(req, fn);
}
