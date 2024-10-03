import { ChevronDown, ChevronUp, Edit, Plus, Trash2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { IProject } from "@/interfaces/i-home";
import Image from "next/image";

export default function ProjectsTab() {
  const [projects, setProjects] = useState<IProject[]>([]);

  useEffect(() => {
    async function getProjects() {
      const data = await fetch(`/api/projects`);
      const json = await data.json();
      setProjects(json);
    }

    getProjects();
  }, []);
  return (
    <>
      <div className="flex justify-end mb-4">
        <Button className="bg-app-secondary text-app-primary hover:bg-app-secondary/70">
          <Plus className="mr-2 h-4 w-4" />
          Add Project
        </Button>
      </div>
      <ProjectsList data={projects} />
    </>
  );
}

const ProjectsList = ({ data }: { data: IProject[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div>
      {isExpanded
        ? data.map((project) => (
            <ProjectCard key={project._id.toString()} data={project} />
          ))
        : data
            .slice(0, 5)
            .map((project) => (
              <ProjectCard key={project._id.toString()} data={project} />
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

const ProjectCard = ({ data }: { data: IProject }) => {
  return (
    <Card className="mb-4 border-app-color-5 bg-transparent text-app-secondary">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-xl">{data.name}</h2>
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent text-app-color-5 hover:bg-white hover:text-app-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="bg-transparent text-app-color-5 hover:bg-white hover:text-app-primary"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <Image
              src={data.preview}
              alt={data.name}
              width={200}
              height={200}
              priority={true}
              className="rounded-xl w-full h-auto object-cover"
              style={{ aspectRatio: 200 / 100 }}
            />
            <p className="text-sm">{data.description}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {data.techs.map((tech, index) => (
              <Badge
                key={`${data._id.toString()} - ${index}`}
                className="text-app-primary bg-app-tertiary hover:bg-app-primary hover:text-white"
              >
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
