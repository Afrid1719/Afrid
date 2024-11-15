import { createBlog, getBlogs } from "@/models/Blog";
import { created, success } from "@/utils/response";
import {
  authorizedController,
  unauthorizedController
} from "@/app/api/controller";
import { NextRequest } from "next/server";
import { IBlog, IPaginationResult } from "@/interfaces/i-home";
import { revalidatePath, revalidateTag } from "next/cache";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams.get("query");
  const pageNumber = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("pageSize") || "10");
  const fn = async function () {
    const data: IPaginationResult<IBlog> = await getBlogs(
      pageNumber,
      pageSize,
      query
    );
    return success(data);
  };
  return await unauthorizedController(fn);
}

export async function POST(req: NextRequest) {
  const fn = async function () {
    const data: IBlog = await req.json();
    const res = await createBlog(data);
    revalidatePath("/blog");
    revalidateTag("blogs.list");
    return created(res);
  };
  return await authorizedController(req, fn);
}
