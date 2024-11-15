export async function deleteResource(
  publicId: string,
  signature: string,
  timestamp: number
) {
  const url = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/destroy`;
  const formData = new FormData();
  formData.append("public_id", publicId);
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);

  const response = await fetch(url, {
    method: "POST",
    body: formData
  });

  if (!response.ok) {
    throw new Error("Failed to delete resource");
  }

  return await response.json();
}
