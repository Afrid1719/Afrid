"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ExperienceTab from "./ExperienceTab";
import EducationTab from "./EducationCard";
import SkillsTab from "./SkillsTab";
import ProjectsTab from "./ProjectsTab";
import Introduction from "./Introduction";

export default function AdminProfile({
  imageUrl,
  dataUrl
}: {
  imageUrl: string;
  dataUrl: any;
}) {
  return (
    <div className="p-4 md:p-0">
      <div className="max-w-4xl mx-auto space-y-8">
        <Introduction imageUrl={imageUrl} dataUrl={dataUrl} />
        <Tabs defaultValue="experience" className="w-full">
          <TabsList className="w-auto h-auto flex justify-between bg-transparent mx-auto p-1 border border-app-primary">
            <TabsTrigger
              value="experience"
              className="grow text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="grow text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="grow text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="grow text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Projects
            </TabsTrigger>
          </TabsList>
          <TabsContent value="experience" className="mt-4">
            <ExperienceTab />
          </TabsContent>
          <TabsContent value="education" className="mt-6">
            <EducationTab />
          </TabsContent>
          <TabsContent value="skills" className="mt-6">
            <SkillsTab />
          </TabsContent>
          <TabsContent value="projects" className="mt-6">
            <ProjectsTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
