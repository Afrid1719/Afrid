import AuthProvider from "@/components/AuthProvider";
import BlogPosts from "@/components/BlogPosts";
import { getBlogs } from "@/models/Blog";

export default async function Page() {
  const blogs = await getBlogs();
  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      <AuthProvider>
        <BlogPosts data={blogs} />
      </AuthProvider>
    </div>
  );
}
