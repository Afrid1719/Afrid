"use client";

import { useState, useRef, useEffect, useMemo, useCallback, memo } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  LuCalendar as Calendar,
  LuClock3 as Clock,
  LuArrowRight as ArrowRight,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight
} from "react-icons/lu";
import { IBlog, IPaginationResult } from "@/interfaces/i-home";
import { debounce } from "lodash";
import SearchBar from "@/components/SearchBar";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import moment from "moment";
import ConfirmationDialog from "@/components/ConfirmationDialog";

const oddPostsBg = "from-app-primary to-app-color-5";
const evenPostsBg = "from-app-secondary to-app-color-4";

export default function BlogPosts({
  data
}: {
  data: IPaginationResult<IBlog>;
}) {
  const [pageData, setPageData] = useState(data);
  const [currentPage, setCurrentPage] = useState(data.currentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState(data.data);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldFetch, setShouldFetch] = useState(false);
  const blogsPerPage = 10;

  // Debounce the search term input to delay API calls
  const debouncedSearch = useMemo(
    () =>
      debounce((term: string) => {
        setSearchTerm(term);
      }, 500),
    []
  );

  // Handle input change with debounced effect
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value); // Update input value instantly
    debouncedSearch(value); // Debounce API call
  };

  const o_setShouldFetch = useCallback(
    (value: boolean) => setShouldFetch(value),
    []
  );

  // Fetch blogs based on current page or search term
  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    let queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set("query", searchTerm);
    queryParams.set("page", currentPage.toString());
    queryParams.set("pageSize", blogsPerPage.toString());

    try {
      const res = await fetch(`/api/blogs?${queryParams.toString()}`, {
        next: { tags: ["blogs.list"] }
      });
      if (res.ok) {
        const data = await res.json();
        setPageData(data);
        setFilteredBlogs(data.data);
      } else {
        throw new Error("Failed to fetch blogs");
      }
    } catch (error) {
      toast.error("Failed to fetch blogs");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchBlogs();
  }, [searchTerm, fetchBlogs]);

  useEffect(() => {
    if (shouldFetch || shouldFetch === undefined) {
      fetchBlogs();
    }

    return () => {
      setShouldFetch(false);
    };
  }, [shouldFetch, fetchBlogs]);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= pageData.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        className="container flex flex-col items-center justify-start mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-6"
      >
        <motion.section
          className="w-full mx-auto flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SearchBar
            placeholder="Search Blogs..."
            inputValue={inputValue}
            handleInputChange={handleInputChange}
          />
        </motion.section>
        <div className="w-full flex justify-end">
          <motion.section
            initial={{ opacity: 0, marginRight: "-100px" }}
            animate={{ opacity: 1, marginRight: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Button
              asChild
              className="bg-app-primary text-app-color-5 hover:bg-app-primary/60"
            >
              <Link href="/blog/create">Create a Blog</Link>
            </Button>
          </motion.section>
        </div>
        <motion.div
          className="w-full mx-auto mb-12 flex justify-center items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
            {filteredBlogs.map((blog, index) => (
              <MemoizedBlogCard
                blog={blog}
                key={blog._id}
                index={index}
                setShouldFetch={o_setShouldFetch}
              />
            ))}
          </div>
        </motion.div>
        <div className="mt-12 w-full lg:w-3/4 flex justify-between items-center">
          <Button
            variant="outline"
            onClick={() => paginate(currentPage - 1)}
            disabled={!pageData.prevPage}
            className="text-[#111] bg-app-secondary border border-app-secondary hover:bg-app-secondary transition-all ease duration-350 hover:shadow-md hover:shadow-slate-600 font-semibold"
          >
            <ChevronLeft className="mr-2" size={16} />
            Previous
          </Button>
          <span className="text-sm text-gray-300">
            Page {currentPage} of {pageData.totalPages}
          </span>
          <Button
            variant="outline"
            onClick={() => paginate(currentPage + 1)}
            disabled={!pageData.nextPage}
            className="text-[#111] bg-app-secondary border border-app-secondary transition-all ease duration-350 hover:bg-app-secondary hover:shadow-md hover:shadow-slate-600 font-semibold"
          >
            Next
            <ChevronRight className="ml-2" size={16} />
          </Button>
        </div>
      </div>
    </>
  );
}

const MemoizedBlogCard = memo(BlogCard);

function BlogCard({
  blog,
  index,
  setShouldFetch
}: {
  blog: IBlog;
  index: number;
  setShouldFetch: (value: boolean) => void;
}) {
  const { status } = useSession();
  const [hovered, setHovered] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const o_setConfirmDelete = useCallback(
    (value: boolean) => setConfirmDelete(value),
    []
  );

  const onDelete = useCallback(async () => {
    const response = await fetch(`/api/blogs/${blog._id.toString()}`, {
      method: "DELETE"
    });
    const json = await response.json();
    if (json?.error) {
      console.log(json.error);
      toast.error(json.error.message);
    } else {
      toast.success("Blog deleted successfully.");
      setShouldFetch(true);
    }
    setConfirmDelete(false);
  }, [blog, setShouldFetch]);

  return (
    <>
      <motion.article
        key={blog._id}
        className="relative overflow-hidden rounded-lg shadow-lg bg-gray-800"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div
          className={`absolute inset-0 bg-gradient-to-br ${
            (index + 1) % 2 === 0 ? oddPostsBg : evenPostsBg
          } opacity-50`}
        />
        <div className="relative p-6">
          <div className="flex justify-start space-x-1 mb-2">
            {blog.tags.map((tag, index) => (
              <Badge
                className="mb-1 bg-app-primary/70 text-gray-200 hover:bg-gray-600"
                key={index}
              >
                {tag}
              </Badge>
            ))}
          </div>
          <h2 className="text-2xl font-bold mb-2 text-gray-100">
            {blog.title}
          </h2>
          <p className="text-gray-300 mb-4">{blog.excerpt}</p>
          <div className="flex flex-col items-start space-y-1 text-sm text-gray-400 mb-4">
            <div className="flex justify-center">
              <Calendar className="mr-1 h-4 w-4" />
              <span className="mr-4">
                {moment(blog.createdAt).format("LL")}
              </span>
            </div>
            <div className="flex justify-center">
              <Clock className="mr-1 h-4 w-4" />
              <span>{blog.readTime} min</span>
            </div>
          </div>
          <Button
            asChild
            variant="secondary"
            className="mt-4 bg-app-primary text-app-tertiary hover:bg-app-primary/90"
          >
            <Link
              href={`/blog/${blog._id.toString()}`}
              className="inline-flex items-center"
            >
              Read more
              <motion.span
                className="ml-2"
                animate={{ x: hovered ? 5 : 0 }}
                transition={{
                  type: "spring",
                  stiffness: 400,
                  damping: 10
                }}
              >
                <ArrowRight className="h-4 w-4" />
              </motion.span>
            </Link>
          </Button>
          {status === "authenticated" && (
            <div className="flex flex-row justify-center space-x-4">
              <Button
                asChild
                variant="secondary"
                className="mt-4 bg-app-secondary text-app-primary hover:bg-app-secondary/90"
              >
                <Link
                  href={`/blog/${blog._id.toString()}/edit`}
                  className="inline-flex items-center"
                >
                  Edit
                </Link>
              </Button>
              <Button
                onClick={() => setConfirmDelete(true)}
                variant="secondary"
                className="mt-4 bg-red-700 text-white hover:bg-red-700/90"
              >
                Delete
              </Button>
            </div>
          )}
        </div>
      </motion.article>
      {/* Delete Blog Confirmation */}
      <ConfirmationDialog
        title="Do you really want to delete this blog?"
        onConfirm={onDelete}
        confirmText="Yes, Delete"
        isOpen={confirmDelete}
        setIsOpen={o_setConfirmDelete}
      />
    </>
  );
}
