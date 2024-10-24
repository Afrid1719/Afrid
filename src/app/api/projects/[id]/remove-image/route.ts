import { deleteProjectScreenshot } from "@/models/Project";
import { badRequest, success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController } from "@/app/api/controller";
import { revalidatePath, revalidateTag } from "next/cache";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const searchParams = req.nextUrl.searchParams;
    if (!searchParams.get("image")) {
      return badRequest("Missing image for deletion");
    }
    const res = await deleteProjectScreenshot(
      params.id,
      searchParams.get("image")
    );
    revalidatePath("/home");
    revalidateTag("profile.projects");
    revalidateTag("projects.list");
    return success(res);
  };
  return await authorizedController(req, fn);
}
