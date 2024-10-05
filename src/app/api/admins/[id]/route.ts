import { IAdmin } from "@/interfaces/i-admin";
import { updateAdmin } from "@/models/Admin";
import { zAdminUpdateRequest } from "@/schemas/z-admin";
import { success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const data: Partial<IAdmin> = await req.json();
    zAdminUpdateRequest.parse(data);
    const res = await updateAdmin(params.id, data);
    return success(res);
  };
  return await authorizedController(req, fn);
}
