"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Briefcase,
  GraduationCap,
  Folder,
  Wrench,
  Brain,
  Mail,
  Phone,
  MapPin,
  Github,
  Linkedin,
  Twitter,
  ChevronDown,
  ChevronUp,
  Plus,
  Edit
} from "lucide-react";

const SkillCard = ({ skill, level }) => (
  <Card style={{ backgroundColor: "#79c4f2", color: "#071f35" }}>
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{skill}</span>
        <span style={{ color: "#38451c" }}>{level}%</span>
      </div>
      <Progress
        value={level}
        className="w-full"
        style={{ backgroundColor: "#84b6e3" }}
      />
    </CardContent>
  </Card>
);

const ExperienceCard = ({
  title,
  company,
  period,
  description,
  achievements
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Card
      className="mb-4"
      style={{ backgroundColor: "#79c4f2", color: "#071f35" }}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{title}</CardTitle>
            <p style={{ color: "#38451c" }}>
              {company} | {period}
            </p>
          </div>
          <Button variant="ghost" size="icon" style={{ color: "#071f35" }}>
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-2">{description}</p>
        {isExpanded && (
          <ul className="list-disc list-inside text-sm">
            {achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="mt-2"
          style={{ color: "#071f35" }}
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
      </CardContent>
    </Card>
  );
};

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
          <div className="container flex flex-col sm:flex-row justify-center items-center space-x-2 space-y-2">
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
          <TabsList className="w-full h-auto grid grid-cols-4 bg-transparent border border-app-primary mx-auto p-1">
            <TabsTrigger
              value="experience"
              className="text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Experience
            </TabsTrigger>
            <TabsTrigger
              value="education"
              className="text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Education
            </TabsTrigger>
            <TabsTrigger
              value="skills"
              className="text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Skills
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Projects
            </TabsTrigger>
            <TabsTrigger
              value="projects"
              className="text-base text-white data-[state=active]:bg-app-primary data-[state=active]:text-white"
            >
              Something
            </TabsTrigger>
          </TabsList>
          <TabsContent value="experience" className="mt-6">
            <div className="flex justify-end mb-4">
              <Button style={{ backgroundColor: "#749433", color: "#071f35" }}>
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </div>
            <ExperienceCard
              title="Senior Software Engineer"
              company="TechCorp Inc."
              period="2018 - Present"
              description="Led development of cloud-based solutions and mentored junior developers."
              achievements={[
                "Implemented CI/CD pipelines, improving deployment efficiency by 40%",
                "Architected and developed a microservices-based platform",
                "Reduced system downtime by 60% through implementing robust error handling and monitoring"
              ]}
            />
            <ExperienceCard
              title="Software Developer"
              company="StartUp Co."
              period="2015 - 2018"
              description="Developed and maintained web applications, collaborating with cross-functional teams."
              achievements={[
                "Reduced application load time by 30% through optimization techniques",
                "Implemented responsive design, increasing mobile user engagement by 25%",
                "Developed RESTful APIs consumed by multiple client applications"
              ]}
            />
          </TabsContent>
          <TabsContent value="education" className="mt-6">
            <Card style={{ backgroundColor: "#79c4f2", color: "#071f35" }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <GraduationCap className="mr-2" />
                    Education
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ color: "#071f35", borderColor: "#071f35" }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold">
                    Master of Science in Computer Science
                  </h3>
                  <p style={{ color: "#38451c" }}>
                    Stanford University | 2013 - 2015
                  </p>
                  <p className="text-sm mt-1">
                    Thesis: "Optimizing Neural Networks for Edge Computing
                    Devices"
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold">
                    Bachelor of Science in Computer Engineering
                  </h3>
                  <p style={{ color: "#38451c" }}>MIT | 2009 - 2013</p>
                  <p className="text-sm mt-1">
                    Minor in Artificial Intelligence
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="skills" className="mt-6">
            <Card style={{ backgroundColor: "#79c4f2", color: "#071f35" }}>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Brain className="mr-2" />
                    Skills
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ color: "#071f35", borderColor: "#071f35" }}
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Skill
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <SkillCard skill="JavaScript" level={90} />
                  <SkillCard skill="React" level={85} />
                  <SkillCard skill="Node.js" level={80} />
                  <SkillCard skill="Python" level={75} />
                  <SkillCard skill="SQL" level={70} />
                  <SkillCard skill="GraphQL" level={65} />
                </div>
              </CardContent>
            </Card>
            <Card
              className="mt-4"
              style={{ backgroundColor: "#79c4f2", color: "#071f35" }}
            >
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="flex items-center">
                    <Wrench className="mr-2" />
                    Tools
                  </CardTitle>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{ color: "#071f35", borderColor: "#071f35" }}
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    VS Code
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    Git
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    Docker
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    Kubernetes
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    AWS
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    Jira
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    Figma
                  </Badge>
                  <Badge
                    style={{ backgroundColor: "#749433", color: "#071f35" }}
                  >
                    Postman
                  </Badge>
                </div>
              </CardContent>
            </Card>
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
