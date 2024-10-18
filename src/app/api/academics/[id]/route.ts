import { IAcademics } from "@/interfaces/i-professional";
import { success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";
import { zAcademicsUpdateRequest } from "@/schemas/z-academics";
import { deleteAcademics, updateAcademics } from "@/models/Academics";
import { revalidatePath, revalidateTag } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const data: Partial<IAcademics> = await req.json();
    zAcademicsUpdateRequest.parse(data);
    const res = await updateAcademics(params.id, data);
    revalidateTag("profile.academics");
    revalidatePath("/professional");
    return success(res);
  };
  return await authorizedController(req, fn);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const res = await deleteAcademics(params.id);
    revalidateTag("profile.academics");
    revalidatePath("/professional");
    return success(res);
  };
  return await authorizedController(req, fn);
}
