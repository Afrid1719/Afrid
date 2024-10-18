import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import ExperienceTab from "@/components/profile/ExperienceTab";
import SkillsTab from "@/components/profile/SkillsTab";
import ProjectsTab from "@/components/profile/ProjectsTab";
import Introduction from "@/components/profile/Introduction";
import AcademicsTab from "@/components/profile/AcademicsTab";
import { IAdminWOPassword } from "@/interfaces/i-admin";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

export default function AdminProfile({ user }: { user: IAdminWOPassword }) {
  return (
    <div className="p-4 md:p-0">
      <div className="max-w-4xl mx-auto space-y-8">
        <Introduction user={user} />
        <Tabs defaultValue="experience" className="w-full">
          <ScrollArea>
            <TabsList className="w-auto h-auto flex justify-between bg-transparent mx-auto p-1 border border-app-primary">
              <TabsTrigger
                value="experience"
                className="grow text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
              >
                Experience
              </TabsTrigger>
              <TabsTrigger
                value="academics"
                className="grow text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
              >
                Academics
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
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
          <TabsContent value="experience" className="mt-4">
            <ExperienceTab />
          </TabsContent>
          <TabsContent value="academics" className="mt-6">
            <AcademicsTab />
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
