"use client";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  LuChevronDown as ChevronDown,
  LuChevronUp as ChevronUp,
  LuPlus as Plus,
  LuTrash2 as Trash2
} from "react-icons/lu";
import { FiEdit as Edit } from "react-icons/fi";
import { memo, startTransition, useCallback, useEffect, useState } from "react";
import { IProject } from "@/interfaces/i-home";
import Image from "next/image";
import ProjectFormWrapper from "@/components/forms/ProjectForm";
import toast from "react-hot-toast";
import ConfirmationDialog from "@/components/ConfirmationDialog";
import Uploader from "@/components/Uploader";
import { UploadApiResponse } from "cloudinary";

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
      const data = await fetch(`/api/projects`, {
        next: { tags: ["profile.projects"] }
      });
      const json = await data.json();
      setProjects(json);
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
  const [localData, setLocalData] = useState(data);

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
        const response = await fetch(`/api/projects/${data._id}`, {
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
    [data._id, localData]
  );

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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
                <Button
                  variant="secondary"
                  size="icon"
                  className="invisible group-hover:visible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-app-secondary"
                  onClick={() => o_setIsPreviewUploaderOpen(true)}
                >
                  <Edit className="h-6 w-6" />
                </Button>
              </div>
              <p className="text-sm">{localData.description}</p>
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
          </div>
        </CardContent>
      </Card>
      <ProjectFormWrapper
        isProjectFormOpen={isProjectEdiFormOpen}
        setIsProjectFormOpen={o_setIsProjectEditOpen}
        setShouldFetch={setShouldFetch}
        project={localData}
      />
      <ConfirmationDialog
        title="Do you really want to delete this project?"
        onConfirm={onDelete}
        confirmText="Yes, Delete"
        isOpen={confirmDelete}
        setIsOpen={o_setConfirmDelete}
      />
      <Uploader
        isUploaderOpen={isPreviewUploaderOpen}
        setIsUploaderOpen={o_setIsPreviewUploaderOpen}
        acceptFileType="image/*"
        title="Preview Images"
        filesLimit={1}
        onUploadComplete={onPreviewUpload}
      />
    </>
  );
};
