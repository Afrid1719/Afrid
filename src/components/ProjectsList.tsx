"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LuCode as Code,
  LuExternalLink as ExternalLink,
  LuCalendar as Calendar,
  LuChevronLeft as ChevronLeft,
  LuChevronRight as ChevronRight
} from "react-icons/lu";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from "@/components/ui/carousel";
import Image from "next/image";
import { IPaginationResult, IProject } from "@/interfaces/i-home";
import Link from "next/link";
import toast from "react-hot-toast";
import { debounce } from "lodash";
import PageLoading from "@/components/PageLoading";
import ImageOverlay from "@/components/ImageOverlay";
import SearchBar from "@/components/SearchBar";

export default function ProjectsList({
  data
}: {
  data: IPaginationResult<IProject>;
}) {
  const [pageData, setPageData] = useState(data);
  const [currentPage, setCurrentPage] = useState(data.currentPage);
  const [searchTerm, setSearchTerm] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [filteredProjects, setFilteredProjects] = useState(data.data);
  const [loading, setLoading] = useState(false);
  const [imageOverlay, setImageOverlay] = useState<{
    open: boolean;
    image: string;
  }>({
    open: false,
    image: ""
  });
  const projectsPerPage = 2;

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

  const closeImageOverlay = useCallback(() => {
    setImageOverlay({ open: false, image: "" });
  }, []);

  // Fetch projects based on current page or search term
  const fetchProjects = useCallback(async () => {
    setLoading(true);
    let queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set("query", searchTerm);
    queryParams.set("page", currentPage.toString());
    queryParams.set("pageSize", projectsPerPage.toString());

    try {
      const res = await fetch(`/api/projects?${queryParams.toString()}`, {
        next: { tags: ["projects.list"] }
      });
      if (res.ok) {
        const data = await res.json();
        setPageData(data);
        setFilteredProjects(data.data);
      } else {
        throw new Error("Failed to fetch projects");
      }
    } catch (error) {
      toast.error("Failed to fetch projects");
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchTerm]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const paginate = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= pageData.totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 min-h-screen text-gray-100">
      <section className="mb-12 flex justify-center items-center">
        <SearchBar
          inputValue={inputValue}
          handleInputChange={handleInputChange}
          placeholder="Search Projects..."
        />
      </section>

      {loading ? (
        <PageLoading />
      ) : (
        <AnimatePresence>
          <ul className="mx-auto space-y-16 max-w-4xl">
            {filteredProjects.map((project) => (
              <motion.li
                key={project._id.toString()}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col gap-6 bg-transparent border-2 border-app-primary rounded-lg overflow-hidden shadow-lg hover:shadow-app-secondary/50 transition-shadow duration-300"
              >
                <Carousel className="w-full">
                  <CarouselContent>
                    {project?.images?.length > 0 ? (
                      project.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div
                            className="p-4 pb-0 cursor-pointer"
                            onClick={() =>
                              setImageOverlay({
                                open: true,
                                image
                              })
                            }
                          >
                            <Image
                              src={image}
                              width={1200}
                              height={800}
                              alt={`${project.title} - Image ${index + 1}`}
                              className="w-full h-64 object-cover rounded-md"
                            />
                          </div>
                        </CarouselItem>
                      ))
                    ) : (
                      <CarouselItem>
                        <div className="p-4 pb-0">
                          <Image
                            src={project.preview}
                            width={1200}
                            height={800}
                            alt={`${project.name} - Image`}
                            className="w-full h-64 object-cover rounded-md"
                          />
                        </div>
                      </CarouselItem>
                    )}
                  </CarouselContent>
                  <CarouselPrevious className="bg-gray-800 text-gray-100 hover:bg-gray-700" />
                  <CarouselNext className="bg-gray-800 text-gray-100 hover:bg-gray-700" />
                </Carousel>
                <div className="flex-grow p-4 pt-0">
                  <h2 className="text-2xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-r from-app-secondary to-app-tertiary">
                    {project.title}
                  </h2>
                  <p className="text-base mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.techs.map((tech, index) => (
                      <Badge
                        key={index}
                        variant="secondary"
                        className="bg-app-tertiary text-app-primary hover:bg-app-secondary hover:text-app-primary"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center text-sm mb-4 text-app-color-4">
                    <Calendar className="mr-2 " size={16} />
                    <span className="mr-4">{project.date || "2023-05-15"}</span>
                    {/* Keeping this Author section, in case we need it in future */}
                    {/* <User className="mr-2" size={16} />
                  <span>{project.author}</span> */}
                  </div>
                  <div className="flex flex-wrap gap-3">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex items-center justify-center text-[#111] bg-app-secondary border border-app-secondary hover:bg-app-secondary"
                      asChild
                    >
                      <Link
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Code className="mr-2" size={16} />
                        Source Code
                      </Link>
                    </Button>
                    {project.url && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex items-center justify-center text-[#111] bg-app-secondary border border-app-secondary hover:bg-app-secondary"
                        asChild
                      >
                        <Link
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <ExternalLink className="mr-2" size={16} />
                          Live Demo
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        </AnimatePresence>
      )}

      <div className="mt-12 flex justify-between items-center">
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
      {/* Image Overlay */}
      <ImageOverlay
        open={imageOverlay.open}
        onOpenChange={closeImageOverlay}
        image={imageOverlay.image}
      />
    </div>
  );
}
