import { success } from "@/utils/response";
import { CLOUDINARY_OPTIONS } from "@/utils/upload";
import { v2 as cloudinary } from "cloudinary";
import { NextRequest } from "next/server";
import { authorizedController } from "../controller";

cloudinary.config(CLOUDINARY_OPTIONS);

export async function GET(req: NextRequest) {
  const fn = () => {
    const timestamp = Math.floor(Date.now() / 1000);
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp,
        upload_preset: process.env.NEXT_PUBLIC_SIGNED_UPLOAD_PRESET
        // Add other parameters you want to include in the signature
      },
      process.env.CLOUDINARY_API_SECRET
    ); // Return the signature

    return success({ signature, timestamp });
  };

  return await authorizedController(req, fn);
}
