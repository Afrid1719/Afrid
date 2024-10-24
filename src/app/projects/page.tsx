import ProjectsList from "@/components/ProjectsList";
import { IPaginationResult, IProject } from "@/interfaces/i-home";
import { getAllProjects } from "@/models/Project";

export default async function Page() {
  const projects: IPaginationResult<IProject> = await getAllProjects();
  return (
    <div className="flex flex-col gap-y-4 justify-center items-center w-full h-full">
      <ProjectsList data={projects} />
    </div>
  );
}
