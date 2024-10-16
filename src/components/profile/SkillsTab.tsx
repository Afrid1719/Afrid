"use client";
import { ISkill, ITool } from "@/interfaces/i-home";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { memo, useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  LuBrain as Brain,
  LuChevronDown as ChevronDown,
  LuChevronUp as ChevronUp,
  LuPlus as Plus,
  LuTrash2 as Trash2,
  LuWrench as Wrench
} from "react-icons/lu";
import { FiEdit as Edit } from "react-icons/fi";
import Pill from "@/components/Pill";
import SkillFormWrapper from "@/components/forms/SkillForm";
import toast from "react-hot-toast";
import ConfirmationDialog from "@/components/ConfirmationDialog";

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
  const [isAddSkillFormOpen, setIsAddSkillFormOpen] = useState(false);
  const [shouldFetch, setShouldFetch] = useState(undefined);

  const o_setIsAddSkillFormOpen = useCallback(
    (value: boolean) => setIsAddSkillFormOpen(value),
    []
  );

  const o_setShouldFetch = useCallback(
    (value: boolean) => setShouldFetch(value),
    []
  );

  useEffect(() => {
    async function getSkills() {
      const data = await fetch(`/api/skills`, {
        next: { tags: ["profile.skills"] }
      });
      const json = await data.json();
      setSkills(json);
    }

    if (shouldFetch || shouldFetch === undefined) {
      getSkills();
    }

    return () => {
      setShouldFetch(false);
    };
  }, [shouldFetch]);
  return (
    <>
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
              onClick={() => o_setIsAddSkillFormOpen(true)}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Skill
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <MemoizedSkillsList
            skills={skills}
            setShouldFetch={o_setShouldFetch}
          />
        </CardContent>
      </Card>
      <SkillFormWrapper
        isSkillFormOpen={isAddSkillFormOpen}
        setIsSkillFormOpen={o_setIsAddSkillFormOpen}
        setShouldFetch={o_setShouldFetch}
      />
    </>
  );
};

const SkillsList = ({
  skills,
  setShouldFetch
}: {
  skills: ISkill[];
  setShouldFetch: (value: boolean) => void;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isExpanded
          ? skills.map((skill: ISkill) => (
              <Skill
                key={skill._id.toString()}
                data={skill}
                setShouldFetch={setShouldFetch}
              />
            ))
          : skills
              .slice(0, 5)
              .map((skill: ISkill) => (
                <Skill
                  key={skill._id.toString()}
                  data={skill}
                  setShouldFetch={setShouldFetch}
                />
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

const MemoizedSkillsList = memo(SkillsList);

const Skill = ({
  data,
  setShouldFetch
}: {
  data: ISkill;
  setShouldFetch: (value: boolean) => void;
}) => {
  const [isEditSkillFormOpen, setIsEditSkillFormOpen] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const o_setIsEditSkillFormOpen = useCallback(
    (value: boolean) => setIsEditSkillFormOpen(value),
    []
  );

  const memoizedSetConfirmDelete = useCallback((value: boolean) => {
    setConfirmDelete(value);
  }, []);

  const onDelete = useCallback(async () => {
    const response = await fetch(`/api/skills/${data._id.toString()}`, {
      method: "DELETE"
    });
    const json = await response.json();
    if (json?.error) {
      console.log(json.error);
      toast.error(json.error.message);
    } else {
      console.log(json);
      toast.success("Skill deleted successfully.");
      setShouldFetch(true);
    }
    setConfirmDelete(false);
  }, [data._id, setShouldFetch]);

  return (
    <>
      <Card
        className="bg-transparent text-app-color-4 bg-auto bg-origin-border bg-center bg-no-repeat backdrop-blur-md"
        style={{ backgroundImage: `url('${data.icon || ""}')` }}
      >
        <CardContent className="p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{data.name}</span>
            <div className="flex items-center space-x-2">
              <span className="text-app-tertiary">{data.rating * 10}%</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => o_setIsEditSkillFormOpen(true)}
              >
                <Edit className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setConfirmDelete(true)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <Progress
            value={data.rating * 10}
            className="w-full h-3 bg-slate-300"
          />
        </CardContent>
      </Card>
      <SkillFormWrapper
        isSkillFormOpen={isEditSkillFormOpen}
        setIsSkillFormOpen={o_setIsEditSkillFormOpen}
        setShouldFetch={setShouldFetch}
        skill={data}
      />
      <ConfirmationDialog
        title="Do you really want to delete this skill?"
        onConfirm={onDelete}
        confirmText="Yes, Delete"
        isOpen={confirmDelete}
        setIsOpen={memoizedSetConfirmDelete}
      />
    </>
  );
};

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
