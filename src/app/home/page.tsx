import GetInTouch from "@/components/GetInTouch";
import Greetings from "@/components/Greetings";
import Introduction from "@/components/Introduction";
import MyProjects from "@/components/MyProjects";
import Skills from "@/components/Skills";
import ToolsIUse from "@/components/ToolsIUse";
import { IMyProject, ISkill, ITool } from "@/interfaces/i-home";
import { readData } from "@/utils/json-reader";

export default async function Page() {
  const skillSet: { skills: ISkill[] } = await readData("data/skills.json");
  const toolsIUse: { tools: ITool[] } = await readData("data/tools.json");
  return (
    <>
      <Greetings />
      <Introduction />
      <Skills data={skillSet.skills} />
      <MyProjects data={myProjects} />
      <ToolsIUse data={toolsIUse.tools} />
      <div className="w-full flex justify-center p-4 md:p-5">
        <hr className="w-2/4 border-app-tertiary-dark" />
      </div>
      <GetInTouch />
    </>
  );
}

const myProjects: IMyProject[] = [
  {
    id: "1",
    name: "My Portfolio",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    preview: "/preview1.png",
    codeLink: "https://github.com/afriddev/afrid.dev",
    techs: [
      "Next.js",
      "Tailwind",
      "Typescript",
      "Vercel",
      "React",
      "MongoDB",
      "PostgreSQL"
    ]
  },
  {
    id: "2",
    name: "Gaming Hub",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    preview:
      "https://lh3.googleusercontent.com/7PoLcOh1bDmrlxz4ZrJK_VnlcUv7ATdaNLm3eOUOIjAGctQhqcAM73-T1uznL2Celw53XdM9GrzKz76MRjdhuT0-=s1280-w1280-h800",
    codeLink: "https://github.com/afriddev/afrid.dev",
    techs: ["PHP", "Laravel", "MySql", "CSS"]
  },
  {
    id: "3",
    name: "Gaming Hub",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.",
    preview: "/preview2.png",
    codeLink: "https://github.com/afriddev/afrid.dev",
    techs: ["PHP", "Laravel", "MySql", "JavaScript"]
  }
];
