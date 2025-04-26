import BlogPage from "@/components/BlogPage";
import { IBlog } from "@/interfaces/i-home";
import { getBlogById, getBlogs } from "@/models/Blog";

export const dynamicParams = true;

export const revalidate = 60 * 5; // 5 minutes

export async function generateStaticParams() {
  const { data: posts } = await getBlogs(1, 20); // Get first 20 blogs to be generated statically and rest will at runtime
  return posts.map((post) => ({ id: post._id.toString() }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const blog: IBlog = await getBlogById(params.id);
  return (
    <>
      <BlogPage data={blog} />
    </>
  );
}
