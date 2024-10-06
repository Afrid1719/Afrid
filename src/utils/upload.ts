import {
  UploadApiErrorResponse,
  UploadApiOptions,
  UploadApiResponse,
  v2 as cloudinary
} from "cloudinary";
import streamifier from "streamifier";

export const CLOUDINARY_OPTIONS: UploadApiOptions = {
  use_filename: true,
  unique_filename: false,
  overwrite: true,
  resource_type: "auto",
  folder: process.env.CLOUDINARY_FOLDER,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
};

export function uploadToCloudinary(
  file: File
): Promise<UploadApiResponse | UploadApiErrorResponse> {
  return new Promise<UploadApiResponse | UploadApiErrorResponse>(
    async (resolve, reject) => {
      let uploadStream = cloudinary.uploader.upload_stream(
        { ...CLOUDINARY_OPTIONS, filename_override: file.name },
        (error, result) => {
          if (error) {
            reject(error as UploadApiErrorResponse);
          } else {
            resolve(result as UploadApiResponse);
          }
        }
      );
      streamifier
        .createReadStream(Buffer.from(await file.arrayBuffer()))
        .pipe(uploadStream);
    }
  );
}

export function deleteFromCloudinary(publicId: string) {
  cloudinary.config(CLOUDINARY_OPTIONS);
  return new Promise<void>((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve();
      }
    });
  });
}
