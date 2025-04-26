import Link from "next/link";
import { LuArrowLeft as ArrowLeft } from "react-icons/lu";
import { IBlog } from "@/interfaces/i-home";
import BlogContent from "@/components/BlogContent";

export default function BlogPage({ data }: { data: IBlog }) {
  if (!data) {
    return;
  }

  return (
    <div className="flex flex-col gap-y-4 w-full h-full">
      <Link
        href="/blog"
        className="flex flex-row items-end gap-2 text-app-tertiary hover:text-app-tertiary-dark mb-6"
      >
        <ArrowLeft className="w-6 h-6" /> Back to Blog
      </Link>
      {!data && (
        <h2 className="ml-2 mt-2 w-full text-center text-2xl">
          Blog not found
        </h2>
      )}
      {data && <BlogContent data={data} />}
    </div>
  );
}
