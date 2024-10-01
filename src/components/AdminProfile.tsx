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

export default function AdminProfile() {
  return (
    <div className="p-4 md:p-0">
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="text-center space-y-4">
          <div className="relative inline-block">
            <Avatar className="w-32 h-32 mx-auto">
              <AvatarImage
                src="/placeholder.svg?height=128&width=128"
                alt="John Doe"
              />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-0 right-0 rounded-full bg-app-color-4 text-app-primary"
            >
              <Edit className="h-4 w-4" />
            </Button>
          </div>
          <div>
            <h1 className="text-3xl font-bold">John Doe</h1>
            <p className="text-xl">Senior Software Engineer</p>
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
              className="gap-1 bg-app-tertiary text-app-primary"
            >
              <Mail className="w-4 h-4" /> john.doe@example.com
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-app-tertiary text-app-primary"
            >
              <Phone className="w-4 h-4" /> +1 (555) 123-4567
            </Badge>
            <Badge
              variant="secondary"
              className="gap-1 bg-app-tertiary text-app-primary"
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
            <Card style={{ backgroundColor: "#79c4f2", color: "#071f35" }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Folder className="mr-2" />
                    Projects
                  </CardTitle>
                  <Button
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">AI-Powered Task Manager</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      style={{ color: "#071f35" }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm">
                    A smart to-do list application that uses AI to prioritize
                    tasks.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      style={{ backgroundColor: "#749433", color: "#071f35" }}
                    >
                      React
                    </Badge>
                    <Badge
                      style={{ backgroundColor: "#749433", color: "#071f35" }}
                    >
                      Node.js
                    </Badge>
                    <Badge
                      style={{ backgroundColor: "#749433", color: "#071f35" }}
                    >
                      TensorFlow.js
                    </Badge>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between items-start">
                    <h3 className="font-semibold">Blockchain Voting System</h3>
                    <Button
                      variant="ghost"
                      size="icon"
                      style={{ color: "#071f35" }}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-sm">
                    A secure and transparent voting system built on blockchain
                    technology.
                  </p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Badge
                      style={{ backgroundColor: "#749433", color: "#071f35" }}
                    >
                      Solidity
                    </Badge>
                    <Badge
                      style={{ backgroundColor: "#749433", color: "#071f35" }}
                    >
                      Ethereum
                    </Badge>
                    <Badge
                      style={{ backgroundColor: "#749433", color: "#071f35" }}
                    >
                      Web3.js
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
