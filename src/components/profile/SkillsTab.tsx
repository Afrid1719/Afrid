import { ISkill, ITool } from "@/interfaces/i-home";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Brain,
  ChevronDown,
  ChevronUp,
  Edit,
  Plus,
  Trash2,
  Wrench
} from "lucide-react";
import Pill from "@/components/Pill";

export default function SkillsTab() {
  return (
    <>
      <SkillsSection />
      <ToolsSection />
    </>
  );
}

const SkillsSection = () => {
  const [skills, setSkills] = useState<ISkill[]>([]);

  useEffect(() => {
    async function getSkills() {
      const data = await fetch(`/api/skills`);
      const json = await data.json();
      setSkills(json);
    }

    getSkills();
  }, []);
  return (
    <Card className="border-app-color-5 bg-transparent text-app-secondary">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Brain className="mr-2" />
            Skills
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="bg-app-secondary text-app-primary hover:bg-app-secondary/70 border-none"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Skill
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <SkillsList skills={skills} />
      </CardContent>
    </Card>
  );
};

const SkillsList = ({ skills }: { skills: ISkill[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isExpanded
          ? skills.map((skill: ISkill) => (
              <Skill key={skill._id.toString()} data={skill} />
            ))
          : skills
              .slice(0, 5)
              .map((skill: ISkill) => (
                <Skill key={skill._id.toString()} data={skill} />
              ))}
      </div>
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
    </>
  );
};

const Skill = ({ data }: { data: ISkill }) => (
  <Card className="bg-app-secondary text-app-primary">
    <CardContent className="p-4">
      <div className="flex justify-between items-center mb-2">
        <span className="font-semibold">{data.name}</span>
        <div className="flex items-center space-x-2">
          <span className="text-app-tertiary-dark">{data.rating * 10}%</span>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <Progress value={data.rating * 10} className="w-full bg-app-color-5" />
    </CardContent>
  </Card>
);

const ToolsSection = () => {
  const [tools, setTools] = useState<ITool[]>([]);

  useEffect(() => {
    async function getTools() {
      const data = await fetch(`/api/tools`);
      const json = await data.json();
      setTools(json);
    }

    getTools();
  }, []);

  return (
    <Card className="mt-4 border-app-color-5 bg-transparent text-app-secondary">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <Wrench className="mr-2" />
            Tools
          </CardTitle>
          <Button
            variant="outline"
            size="sm"
            className="bg-app-secondary text-app-primary hover:bg-app-secondary/70 border-none"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Tool
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ToolsList tools={tools} />
      </CardContent>
    </Card>
  );
};

const ToolsList = ({ tools }: { tools: ITool[] }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isExpanded
          ? tools.map((tool: ITool) => (
              <Tool key={tool._id.toString()} data={tool} />
            ))
          : tools
              .slice(0, 5)
              .map((tool: ITool) => (
                <Tool key={tool._id.toString()} data={tool} />
              ))}
      </div>
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
    </>
  );
};

const Tool = ({ data }: { data: ITool }) => (
  <Pill>
    <span className="inline-flex justify-between w-full">
      <span className="text-base">{data.name}</span>
      <span>
        <Button
          variant="ghost"
          size="icon"
          className="h-auto w-auto p-1 text-app-color-5 hover:bg-white hover:text-app-primary"
        >
          <Edit className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="ml-2 h-auto w-auto p-1 text-app-color-5 hover:bg-white hover:text-app-primary"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </span>
    </span>
  </Pill>
);
