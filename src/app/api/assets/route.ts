import { badRequest, success } from "@/utils/response";
import { uploadToCloudinary } from "@/utils/upload";
import { NextRequest } from "next/server";
import { authorizedController } from "../controller";

export async function POST(req: NextRequest) {
  const fn = async function () {
    const formData = await req.formData();
    const asset: File = formData.get("file") as File;
    if (!asset) {
      return badRequest("Asset not found");
    }
    const uploadResponse = await uploadToCloudinary(asset);
    return success(uploadResponse);
  };
  return await authorizedController(req, fn);
}
