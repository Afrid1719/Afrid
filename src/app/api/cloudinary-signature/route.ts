import { success } from "@/utils/response";
import { CLOUDINARY_OPTIONS } from "@/utils/upload";
import { v2 as cloudinary, SignApiOptions } from "cloudinary";
import { NextRequest } from "next/server";
import { authorizedController } from "@/app/api/controller";

cloudinary.config(CLOUDINARY_OPTIONS);

export async function POST(req: NextRequest) {
  let data = await req.json();

  const fn = async () => {
    const timestamp = Math.floor(Date.now() / 1000);
    let paramsToSign: SignApiOptions = {};
    if (data?.publicId) {
      paramsToSign = { public_id: data.publicId, timestamp };
    } else {
      paramsToSign = {
        timestamp,
        upload_preset: process.env.NEXT_PUBLIC_SIGNED_UPLOAD_PRESET
      };
    }
    const signature = cloudinary.utils.api_sign_request(
      paramsToSign,
      process.env.CLOUDINARY_API_SECRET
    ); // Return the signature

    return success({ signature, timestamp });
  };

  return await authorizedController(req, fn);
}
