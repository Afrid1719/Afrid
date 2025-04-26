import AuthProvider from "@/components/AuthProvider";
import BlogPosts from "@/components/BlogPosts";
import { IBlog, IPaginationResult } from "@/interfaces/i-home";
import { getBlogs } from "@/models/Blog";
import { getServerSession } from "next-auth";

export default async function Page() {
  const blogs: IPaginationResult<IBlog> = await getBlogs();
  const status = await getServerSession();

  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      <AuthProvider>
        <BlogPosts data={blogs} isAuthenticated={!!status} />
      </AuthProvider>
    </div>
  );
}
