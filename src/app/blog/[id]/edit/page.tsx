import BlogForm from "@/components/forms/BlogForm";
import { getBlogById } from "@/models/Blog";

export default async function Page({ params }: { params: { id: string } }) {
  const blog = await getBlogById(params.id);
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Edit Blog Post</h1>
      <BlogForm data={blog} />
    </>
  );
}
