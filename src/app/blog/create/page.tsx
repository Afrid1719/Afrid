import BlogForm from "@/components/forms/BlogForm";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerSession();
  if (!session) return redirect("/login");
  return (
    <>
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">Create Blog Post</h1>
      <BlogForm />
    </>
  );
}
