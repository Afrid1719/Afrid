import BlogPage from "@/components/BlogPage";
import { IBlog } from "@/interfaces/i-home";
import Blog from "@/models/Blog";

export const dynamicParams = true;

export const revalidate = 60 * 5; // 5 minutes

export async function generateStaticParams() {
  const posts = await Blog.find({}, { _id: 1 });
  return posts.map((post) => ({ id: post._id.toString() }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const blog: IBlog = await Blog.findById(params.id, {
    __v: 0,
    _id: 0,
    updatedAt: 0
  }).lean();
  return (
    <>
      <BlogPage data={blog} />
    </>
  );
}
