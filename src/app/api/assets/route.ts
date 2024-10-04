import {
  v2 as cloudinary,
  UploadApiErrorResponse,
  UploadApiOptions
} from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import streamifier from "streamifier";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const files: File[] = formData.getAll("files") as File[];
  const options: UploadApiOptions = {
    folder: "Afrid",
    use_filename: true,
    unique_filename: true,
    overwrite: true,
    resource_type: "auto",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME
  };
  if (files.length === 0) {
    return NextResponse.json({ message: "No files found" }, { status: 400 });
  }
  try {
    const uploaders: Promise<string | UploadApiErrorResponse>[] = [];
    for (const file of files) {
      const uploader = new Promise<string | UploadApiErrorResponse>(
        async (resolve, reject) => {
          let uploadStream = cloudinary.uploader.upload_stream(
            { ...options, filename_override: file.name },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result.secure_url);
              }
            }
          );
          streamifier
            .createReadStream(Buffer.from(await file.arrayBuffer()))
            .pipe(uploadStream);
        }
      );
      uploaders.push(uploader);
    }
    const urls = await Promise.allSettled(uploaders);
    const response = urls.reduce((acc, curr) => {
      curr.status === "fulfilled"
        ? acc.push(curr.value)
        : acc.push(curr.reason.message);
      return acc;
    }, []);
    // TODO: Make a resource and save the url and id to the database
    return NextResponse.json({ success: true, data: response });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
