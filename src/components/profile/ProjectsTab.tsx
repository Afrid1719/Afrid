"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LuChevronDown as ChevronDown,
  LuChevronUp as ChevronUp,
  LuPlus as Plus,
  LuTrash2 as Trash2,
  LuTrash as Trash,
  LuCalendar as Calendar,
  LuEye as Eye
} from "react-icons/lu";
import { BsPlusCircle } from "react-icons/bs";
import { FiEdit as Edit } from "react-icons/fi";
import { memo, startTransition, useCallback, useEffect, useState } from "react";
import { IPaginationResult, IProject } from "@/interfaces/i-home";
import Image from "next/image";
import ProjectFormWrapper from "@/components/forms/ProjectForm";
import toast from "react-hot-toast";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Uploader from "@/components/Uploader";
import { UploadApiResponse } from "cloudinary";
import moment from "moment";
import ImageOverlay from "../ImageOverlay";

export default function ProjectsTab() {
  const [projects, setProjects] = useState<IProject[]>([]);
  const [isProjectFormOpen, setIsProjectFormOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(undefined);

  const o_setIsProjectFormOpen = useCallback(
    (value: boolean) => setIsProjectFormOpen(value),
    []
  );

  const o_setShouldFetch = useCallback(
    (value: boolean) => setShouldFetch(value),
    []
  );

  useEffect(() => {
    async function getProjects() {
      const data = await fetch(`/api/projects?pageSize=100`, {
        next: { tags: ["profile.projects"] }
      });
      const json: IPaginationResult<IProject> = await data.json();
      setProjects(json.data);
    }

    if (shouldFetch || shouldFetch === undefined) {
      getProjects();
    }

    return () => {
      setShouldFetch(false);
    };
  }, [shouldFetch]);
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button
          className="bg-app-secondary text-app-primary hover:bg-app-secondary/70"
          onClick={() => setIsProjectFormOpen(true)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>
      <MemoizedProjectsList data={projects} setShouldFetch={o_setShouldFetch} />
      <ProjectFormWrapper
        isProjectFormOpen={isProjectFormOpen}
        setIsProjectFormOpen={o_setIsProjectFormOpen}
        setShouldFetch={o_setShouldFetch}
      />
    </>
  );
}

const ProjectsList = ({
  data,
  setShouldFetch
}: {
  data: IProject[];
  setShouldFetch: (value: boolean) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {isExpanded
        ? data.map((project) => (
            <ProjectCard
              key={project._id.toString()}
              data={project}
              setShouldFetch={setShouldFetch}
            />
          ))
        : data
            .slice(0, 5)
            .map((project) => (
              <ProjectCard
                key={project._id.toString()}
                data={project}
                setShouldFetch={setShouldFetch}
              />
            ))}

      <Button
        variant="ghost"
        size="sm"
        className="flex w-1/2 mt-4 mx-auto text-app-secondary hover:bg-transparent hover:text-app-secondary/70"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {isExpanded ? (
          <>
            <ChevronUp className="mr-2 h-4 w-4" />
            Show Less
          </>
        ) : (
          <>
            <ChevronDown className="mr-2 h-4 w-4" />
            Show More
          </>
        )}
      </Button>
    </div>
  );
};

const MemoizedProjectsList = memo(ProjectsList);

const ProjectCard = ({
  data,
  setShouldFetch
}: {
  data: IProject;
  setShouldFetch: (value: boolean) => void;
}) => {
  const [isProjectEdiFormOpen, setIsProjectEditFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPreviewUploaderOpen, setIsPreviewUploaderOpen] = useState(false);
  const [isScreenshotsUploaderOpen, setIsScreenshotsUploaderOpen] =
    useState(false);
  const [localData, setLocalData] = useState(data);
  const [confirmDeleteScreenshot, setConfirmDeleteScreenshot] = useState<{
    open: boolean;
    image: string;
  }>({ open: false, image: "" });
  const [imageOverlay, setImageOverlay] = useState<{
    open: boolean;
    image: string;
  }>({ open: false, image: "" });
  const [asPreview, setAsPreview] = useState<{ open: boolean; image: string }>({
    open: false,
    image: ""
  });

  const o_setIsPreviewUploaderOpen = useCallback(
    (value: boolean) => setIsPreviewUploaderOpen(value),
    []
  );

  const o_setConfirmDelete = useCallback(
    (value: boolean) => setConfirmDelete(value),
    []
  );

  const o_setIsProjectEditOpen = useCallback(
    (value: boolean) => setIsProjectEditFormOpen(value),
    []
  );

  const o_setIsScreenshotsUploaderOpen = useCallback(
    (value: boolean) => setIsScreenshotsUploaderOpen(value),
    []
  );

  const o_setConfirmDeleteScreenshot = useCallback(
    (value: boolean) => setConfirmDeleteScreenshot({ open: value, image: "" }),
    []
  );

  const closeSetPreview = useCallback(
    (value: boolean) => setAsPreview({ open: value, image: "" }),
    []
  );

  const closeImageOverlay = useCallback(
    (value: boolean) => setImageOverlay({ open: value, image: "" }),
    []
  );

  const onDelete = useCallback(async () => {
    const response = await fetch(`/api/projects/${localData._id.toString()}`, {
      method: "DELETE"
    });
    const json = await response.json();
    if (json?.error) {
      console.log(json.error);
      toast.error(json.error.message);
    } else {
      toast.success("Tool deleted successfully.");
      setShouldFetch(true);
    }
    setConfirmDelete(false);
  }, [localData._id, setShouldFetch]);

  const onPreviewUpload = useCallback(
    async (uploadResults: any) => {
      try {
        const res: UploadApiResponse = await uploadResults[0].value.json();
        const response = await fetch(`/api/projects/${localData._id}`, {
          method: "PUT",
          body: JSON.stringify({
            preview: res.secure_url
          })
        });
        const updatedProject = await response.json();
        startTransition(() => {
          setLocalData({ ...localData, ...updatedProject });
        });
        toast.success("Project preview updated successfully.");
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    },
    [localData]
  );

  const onScreenshotsUpload = useCallback(
    async (uploadResults: any) => {
      try {
        let images: string[] = localData.images || [];
        for (const result of uploadResults) {
          const res: UploadApiResponse = await result.value.json();
          images = [...images, res.secure_url];
        }
        const response = await fetch(`/api/projects/${localData._id}`, {
          method: "PUT",
          body: JSON.stringify({
            images
          })
        });
        if (response.ok) {
          const updatedProject = await response.json();
          startTransition(() => {
            setLocalData({ ...localData, ...updatedProject });
          });
          toast.success("Screenshot added successfully.");
        } else {
          toast.error("Something went wrong");
        }
      } catch (err) {
        console.log(err);
        toast.error("Something went wrong");
      }
    },
    [localData]
  );

  const onPreviewSet = useCallback(async () => {
    try {
      const response = await fetch(
        `/api/projects/${localData._id}/set-preview`,
        {
          method: "PUT",
          body: JSON.stringify({
            preview: asPreview.image
          })
        }
      );
      const updatedProject = await response.json();
      startTransition(() => {
        setLocalData({ ...localData, ...updatedProject });
      });
      toast.success("Project preview changed successfully.");
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }, [localData, asPreview]);

  const onDeleteScreenshot = useCallback(async () => {
    try {
      const query = new URLSearchParams();
      query.append("image", confirmDeleteScreenshot.image);
      const response = await fetch(
        `/api/projects/${localData._id}/remove-image?${query.toString()}`,
        {
          method: "DELETE"
        }
      );
      if (response.ok) {
        const updatedProject = await response.json();
        startTransition(() => {
          setLocalData({ ...localData, ...updatedProject });
        });
        toast.success("Screenshot removed successfully.");
      } else {
        const err = (response as any)?.message || "Something went wrong";
        toast.error(err);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong");
    }
  }, [localData, confirmDeleteScreenshot]);

  useEffect(() => {
    setLocalData(data);
  }, [data]);

  return (
    <>
      <Card className="mb-4 border-app-color-5 bg-transparent text-app-secondary">
        <CardHeader className="pb-2">
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-xl">{localData.name}</h2>
            <div className="flex items-center justify-between">
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent text-app-color-5 hover:bg-white hover:text-app-primary"
                onClick={() => setIsProjectEditFormOpen(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="bg-transparent text-app-color-5 hover:bg-white hover:text-app-primary"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="group relative">
                <Image
                  src={localData.preview}
                  alt={localData.name}
                  width={800}
                  height={800}
                  priority={true}
                  className="rounded-xl w-full h-auto object-cover"
                  style={{ aspectRatio: 2 / 1 }}
                />
                <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full">
                  <Button
                    variant="secondary"
                    size="icon"
                    className="invisible group-hover:visible rounded-full bg-white text-app-secondary"
                    onClick={() => o_setIsPreviewUploaderOpen(true)}
                  >
                    <Edit className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    className="invisible group-hover:visible ml-2 rounded-full bg-white text-app-secondary"
                    onClick={() =>
                      setImageOverlay({
                        open: true,
                        image: localData.preview
                      })
                    }
                  >
                    <Eye className="h-6 w-6" />
                  </Button>
                </div>
              </div>
              <div className="flex flex-col space-y-2">
                <p className="text-sm">{localData.description}</p>
                <div className="flex text-sm">
                  <Calendar className="mr-2" size={16} />
                  <span className="mr-4">
                    {moment(localData.createdOn).format("DD-MM-YYYY")}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              {localData.techs.map((tech, index) => (
                <Badge
                  key={`${localData._id.toString()} - ${index}`}
                  className="text-app-primary bg-app-tertiary hover:bg-app-primary hover:text-white"
                >
                  {tech}
                </Badge>
              ))}
            </div>
            <div className="w-full flex flex-col space-y-2">
              <div className="ml-1">Screenshots</div>
              <Carousel
                opts={{
                  align: "start"
                }}
                className="w-full"
              >
                <CarouselContent>
                  {localData?.images?.map((image, index) => (
                    <CarouselItem
                      key={index}
                      className="basis-full sm:basis-1/2 lg:basis-1/3 group relative"
                    >
                      <div className="p-1">
                        <Card className="bg-transparent">
                          <CardContent className="flex items-center justify-center p-2">
                            <div className="relative">
                              <Image
                                src={image}
                                width={1920}
                                height={1080}
                                alt={`${localData.name} Screenshot ${
                                  index + 1
                                }`}
                                className="w-full h-32 object-contain rounded-lg"
                              />
                              {localData.preview === image && (
                                <div className="absolute bottom-0 left-0 w-full bg-app-primary/80 text-app-color-5 text-center text-sm rounded-t-sm">
                                  Preview
                                </div>
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center w-full h-full">
                        {localData.preview !== image && (
                          <Button
                            variant="secondary"
                            size="default"
                            className="invisible group-hover:visible font-semibold bg-app-color-5 text-app-primary hover:bg-app-color-4"
                            onClick={() => setAsPreview({ open: true, image })}
                          >
                            Set as Preview
                          </Button>
                        )}
                        <Button
                          variant="secondary"
                          size="icon"
                          className="invisible group-hover:visible ml-2 rounded-full bg-white text-app-secondary"
                          onClick={() =>
                            setImageOverlay({
                              open: true,
                              image
                            })
                          }
                        >
                          <Eye className="h-6 w-6" />
                        </Button>
                      </div>
                      <div className="absolute right-2 top-2">
                        <Button
                          variant="secondary"
                          size="icon"
                          className="invisible group-hover:visible bg-transparent hover:bg-transparent"
                          onClick={() =>
                            setConfirmDeleteScreenshot({
                              open: true,
                              image
                            })
                          }
                        >
                          <Trash className="h-5 w-5 text-red-500" />
                        </Button>
                      </div>
                    </CarouselItem>
                  ))}
                  <CarouselItem
                    key="add-more-images"
                    className="flex items-center justify-center basis-full sm:basis-1/2 lg:basis-1/3"
                  >
                    <div className="p-1">
                      <Card className="bg-transparent border-none">
                        <CardContent className="flex items-center justify-center p-2">
                          <div className="flex justify-center items-center w-full h-24 md:h-32">
                            <Button
                              className="px-4 py-4 bg-[#222]"
                              onClick={() =>
                                o_setIsScreenshotsUploaderOpen(true)
                              }
                            >
                              <BsPlusCircle className="w-8 h-8 text-app-tertiary" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                </CarouselContent>
              </Carousel>
            </div>
          </div>
        </CardContent>
      </Card>
      <ProjectFormWrapper
        isProjectFormOpen={isProjectEdiFormOpen}
        setIsProjectFormOpen={o_setIsProjectEditOpen}
        setShouldFetch={setShouldFetch}
        project={localData}
      />
      {/* Delete Project Confirmation */}
      <ConfirmationDialog
        title="Do you really want to delete this project?"
        onConfirm={onDelete}
        confirmText="Yes, Delete"
        isOpen={confirmDelete}
        setIsOpen={o_setConfirmDelete}
      />
      {/* Delete Screenshot Confirmation */}
      <ConfirmationDialog
        title="Do you really want to delete this screenshot?"
        onConfirm={onDeleteScreenshot}
        confirmText="Yes, Delete"
        isOpen={confirmDeleteScreenshot.open}
        setIsOpen={o_setConfirmDeleteScreenshot}
      />
      <ConfirmationDialog
        title="Are you sure you want to make this image as the project preview?"
        onConfirm={onPreviewSet}
        confirmText="Yes"
        isOpen={asPreview.open}
        setIsOpen={closeSetPreview}
      />
      {/* Preview Uploader */}
      <Uploader
        isUploaderOpen={isPreviewUploaderOpen}
        setIsUploaderOpen={o_setIsPreviewUploaderOpen}
        acceptFileType="image/*"
        title="Preview Images"
        filesLimit={1}
        onUploadComplete={onPreviewUpload}
      />
      {/* Screenshots Uploader */}
      <Uploader
        isUploaderOpen={isScreenshotsUploaderOpen}
        setIsUploaderOpen={o_setIsScreenshotsUploaderOpen}
        acceptFileType="image/*"
        title="Screenshots"
        filesLimit={10}
        onUploadComplete={onScreenshotsUpload}
      />

      {/* Image Overlay */}
      <ImageOverlay
        open={imageOverlay.open}
        onOpenChange={closeImageOverlay}
        image={imageOverlay.image}
      />
    </>
  );
};
