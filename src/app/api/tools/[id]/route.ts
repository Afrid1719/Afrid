import { ITool } from "@/interfaces/i-home";
import { success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";
import { deleteTool, updateTool } from "@/models/Tool";
import { zToolUpdateRequest } from "@/schemas/z-tool";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const data: Partial<ITool> = await req.json();
    zToolUpdateRequest.parse(data);
    const updatedTool = await updateTool(params.id, data);
    return success(updatedTool);
  };
  return await authorizedController(req, fn);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const res = await deleteTool(params.id);
    return success(res);
  };
  return await authorizedController(req, fn);
}
