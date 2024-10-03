"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Folder,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  Plus,
  Edit
} from "lucide-react";
import ExperienceTab from "./ExperienceTab";
import EducationTab from "./EducationCard";
import SkillsTab from "./SkillsTab";
import ProjectsTab from "./ProjectsTab";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";
import ImageUploader from "../ImageUploader";

export default function AdminProfile({
  imageUrl,
  dataUrl
}: {
  imageUrl: string;
  dataUrl: any;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    if (isDialogOpen) {
      document.body.style.width = "100vw";
    } else {
      document.body.style.width = "100%";
    }
  }, [isDialogOpen]);
  return (
    <div className="p-4 md:p-0">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="block">
            <Avatar className="group w-40 h-40 md:w-64 md:h-64 mx-auto relative shadow-md">
              <Image
                src={imageUrl}
                width={200}
                height={200}
                alt="Afrid"
                placeholder="blur"
                blurDataURL={dataUrl.base64}
                className="shadow-xl shadow-slate-950 rounded-full w-40 h-40 md:w-64 md:h-64 object-fill aspect-auto group-hover:blur-lg transition-all ease-in-out duration-300"
              />
              <Button
                variant="secondary"
                size="icon"
                className="invisible group-hover:visible absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white text-app-secondary"
                onClick={() => setIsDialogOpen(true)}
              >
                <Edit className="h-6 w-6" />
              </Button>
            </Avatar>
          </div>
          <div>
            <h1 className="text-3xl font-bold">Syed Afrid Ali</h1>
            <p className="text-xl">Full Stack Web Developer</p>
          </div>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              size="icon"
              style={{ color: "#79c4f2", borderColor: "#79c4f2" }}
            >
              <Github className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              style={{ color: "#79c4f2", borderColor: "#79c4f2" }}
            >
              <Linkedin className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              style={{ color: "#79c4f2", borderColor: "#79c4f2" }}
            >
              <Twitter className="h-4 w-4" />
            </Button>
          </div>
          <div className="container flex flex-col sm:flex-row justify-center items-end space-x-2 space-y-2">
            <Badge
              variant="secondary"
              className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
            >
              <Mail className="w-4 h-4" /> john.doe@example.com
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
            >
              <Phone className="w-4 h-4" /> +1 (555) 123-4567
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-app-tertiary text-app-primary hover:bg-app-primary hover:text-white"
            >
              <MapPin className="w-4 h-4" /> San Francisco, CA
            </Badge>
          </div>
        </div>

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

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="bg-app-primary/50 backdrop-blur-lg text-app-secondary mt-4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Profile Image</DialogTitle>
          </DialogHeader>
          <ImageUploader limit={3} acceptFileType="image/*" />
        </DialogContent>
      </Dialog>
    </div>
  );
}
