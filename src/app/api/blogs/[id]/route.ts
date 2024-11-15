import { deleteBlogById, getBlogById, updateBlogById } from "@/models/Blog";
import { badRequest, success } from "@/utils/response";
import { NextRequest } from "next/server";
import {
  authorizedController,
  unauthorizedController
} from "@/app/api/controller";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const blog = await getBlogById(params.id);
    return success(blog);
  };
  return await unauthorizedController(fn);
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const data = await request.json();
    const blog = await getBlogById(params.id);
    if (!blog) {
      return badRequest("Blog not found");
    }
    const updatedBlog = await updateBlogById(params.id, data);
    revalidatePath("/blog");
    revalidateTag("blogs.list");
    return success(updatedBlog);
  };
  return await authorizedController(request, fn);
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const fn = async function () {
    const blog = await getBlogById(params.id);
    if (!blog) {
      return badRequest("Blog not found");
    }
    const res = await deleteBlogById(params.id);
    revalidatePath("/blog");
    revalidateTag("blogs.list");
    return success(res);
  };
  return await authorizedController(request, fn);
}
