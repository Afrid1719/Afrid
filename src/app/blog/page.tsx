import AuthProvider from "@/components/AuthProvider";
import BlogPosts from "@/components/BlogPosts";
import { IBlog, IPaginationResult } from "@/interfaces/i-home";
import { getBlogs } from "@/models/Blog";

export default async function Page() {
  const blogs: IPaginationResult<IBlog> = await getBlogs();
  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      {blogs.totalCount <= 0 ? (
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold text-center">
          No Blogs Found
        </h2>
      ) : (
        <AuthProvider>
          <BlogPosts data={blogs} />
        </AuthProvider>
      )}
    </div>
  );
}
