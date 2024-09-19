import GetInTouch from "@/components/GetInTouch";
import Greetings from "@/components/Greetings";
import Introduction from "@/components/Introduction";
import MyProjects from "@/components/MyProjects";
import GreetingsSkeleton from "@/components/skeletons/GreetingsSkeleton";
import IntroductionSkeleton from "@/components/skeletons/IntroductionSkeleton";
import Skills from "@/components/Skills";
import ToolsIUse from "@/components/ToolsIUse";
import { IProject, ISkill, ITool } from "@/interfaces/i-home";
import { getAllProjects } from "@/models/Project";
import { getSkills } from "@/models/Skill";
import { getTools } from "@/models/Tool";
import { Suspense } from "react";

export default async function Page() {
  const [skills, projects, tools]: PromiseSettledResult<
    ISkill[] | IProject[] | ITool[]
  >[] = await Promise.allSettled([getSkills(), getAllProjects(), getTools()]);

  const skillsResponse = JSON.parse(
    JSON.stringify((skills as PromiseFulfilledResult<ISkill[]>)?.value)
  );
  const projectsResponse = JSON.parse(
    JSON.stringify((projects as PromiseFulfilledResult<IProject[]>)?.value)
  );
  const toolsResponse = JSON.parse(
    JSON.stringify((tools as PromiseFulfilledResult<ITool[]>)?.value)
  );
  return (
    <>
      <Suspense fallback={<GreetingsSkeleton />}>
        <Greetings />
      </Suspense>
      <Suspense fallback={<IntroductionSkeleton />}>
        <Introduction />
      </Suspense>
      <Skills
        data={skillsResponse}
        status={skills.status}
        reason={(skills as PromiseRejectedResult)?.reason}
      />
      <MyProjects
        data={projectsResponse}
        status={projectsResponse.status}
        reason={(projectsResponse as PromiseRejectedResult)?.reason}
      />
      <ToolsIUse
        data={toolsResponse}
        status={toolsResponse.status}
        reason={(toolsResponse as PromiseRejectedResult)?.reason}
      />
      <div className="w-full flex justify-center p-4 md:p-5">
        <hr className="w-2/4 border-app-tertiary-dark" />
      </div>
      <GetInTouch />
    </>
  );
}
