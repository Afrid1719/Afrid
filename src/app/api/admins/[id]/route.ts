import { IAdmin } from "@/interfaces/i-admin";
import { getAdminByEmailOrId, updateAdmin } from "@/models/Admin";
import { zAdminUpdateRequest } from "@/schemas/z-admin";
import { success } from "@/utils/response";
import { NextRequest } from "next/server";
import { authorizedController } from "../../controller";
import { remote } from "@/utils/image-placeholder";
import { deleteFromCloudinary } from "@/utils/upload";
import { revalidatePath } from "next/cache";

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const data: Partial<IAdmin> = await req.json();
    zAdminUpdateRequest.parse(data);
    // Check if the data to update is the image
    if ("image" in data) {
      /*** Commented code takes a long time to run resulting in TimeoutError ***/

      //   const existingAdmin = await getAdminByEmailOrId(params.id);
      //   if (!!existingAdmin && !!existingAdmin.image?.publicId) {
      //     if (existingAdmin.image.publicId !== data.image.publicId) {
      //       // Delete the old image
      //       await deleteFromCloudinary(existingAdmin.image.publicId);
      //     }
      //   }

      data.blurDataUrl = ((await remote(data.image.secureUrl)) as any)?.base64;
    }
    const res = await updateAdmin(params.id, data);
    revalidatePath("/profile");
    revalidatePath("/home");
    return success(res);
  };
  return await authorizedController(req, fn);
}
