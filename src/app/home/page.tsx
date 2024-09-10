import GetInTouch from "@/components/GetInTouch";
import Greetings from "@/components/Greetings";
import Introduction from "@/components/Introduction";
import MyProjects from "@/components/MyProjects";
import Skills from "@/components/Skills";
import ToolsIUse from "@/components/ToolsIUse";
import { IProject, ISkill, ITool } from "@/interfaces/i-home";
import { readData } from "@/utils/json-reader";

export default async function Page() {
  const skillSet: { skills: ISkill[] } = await readData("data/skills.json");
  const toolsIUse: { tools: ITool[] } = await readData("data/tools.json");
  return (
    <>
      <Greetings />
      <Introduction />
      <Skills data={skillSet.skills} />
      <MyProjects />
      <ToolsIUse data={toolsIUse.tools} />
      <div className="w-full flex justify-center p-4 md:p-5">
        <hr className="w-2/4 border-app-tertiary-dark" />
      </div>
      <GetInTouch />
    </>
  );
}
