import GetInTouch from "@/components/GetInTouch";
import Greetings from "@/components/Greetings";
import Introduction from "@/components/Introduction";
import MyProjects from "@/components/MyProjects";
import Skills from "@/components/Skills";
import ToolsIUse from "@/components/ToolsIUse";
import { IMyProject, ISkill, ITool } from "@/interfaces/i-home";

export default function Page() {
  return (
    <>
      <Greetings />
      <Introduction />
      <Skills data={skillSet} />
      <MyProjects data={myProjects} />
      <ToolsIUse data={toolsIUse} />
      <div className="w-full flex justify-center p-4 md:p-5">
        <hr className="w-2/4 border-app-tertiary-dark" />
      </div>
      <GetInTouch />
    </>
  );
}

const toolsIUse: ITool[] = [
  {
    id: "1",
    name: "Jira",
    icon: "https://img.icons8.com/color/48/000000/jira.png",
    rating: 8
  },
  {
    id: "2",
    name: "VS Code",
    icon: "https://img.icons8.com/?size=100&id=9OGIyU8hrxW5&format=png&color=000000",
    rating: 8
  },
  {
    id: "3",
    name: "Git",
    icon: "https://img.icons8.com/?size=100&id=20906&format=png&color=000000",
    rating: 8
  },
  {
    id: "4",
    name: "Windows",
    icon: "https://img.icons8.com/?size=100&id=gXoJoyTtYXFg&format=png&color=000000",
    rating: 8
  },
  {
    id: "5",
    name: "Windows",
    icon: "https://img.icons8.com/?size=100&id=gXoJoyTtYXFg&format=png&color=000000",
    rating: 8
  },
  {
    id: "6",
    name: "Windows",
    icon: "https://img.icons8.com/?size=100&id=gXoJoyTtYXFg&format=png&color=000000",
    rating: 8
  },
  {
    id: "7",
    name: "Windows",
    icon: "https://img.icons8.com/?size=100&id=gXoJoyTtYXFg&format=png&color=000000",
    rating: 8
  },
  {
    id: "8",
    name: "Windows",
    icon: "https://img.icons8.com/?size=100&id=gXoJoyTtYXFg&format=png&color=000000",
    rating: 8
  }
];

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

const skillSet: ISkill[] = [
  {
    id: "1",
    name: "HTML",
    icon: "https://img.icons8.com/color/48/000000/html-5--v1.png",
    rating: 8
  },
  {
    id: "2",
    name: "CSS",
    icon: "https://img.icons8.com/color/48/000000/css3.png",
    rating: 8
  },
  {
    id: "3",
    name: "JavaScript",
    icon: "https://img.icons8.com/color/48/000000/javascript--v1.png",
    rating: 8
  },
  {
    id: "4",
    name: "React",
    icon: "https://img.icons8.com/color/48/000000/react-native.png",
    rating: 8
  },
  {
    id: "5",
    name: "Laravel",
    icon: "https://img.icons8.com/?size=100&id=lRjcvhvtR81o&format=png&color=000000",
    rating: 8
  },
  {
    id: "6",
    name: "HTML",
    icon: "https://img.icons8.com/color/48/000000/html-5--v1.png",
    rating: 8
  },
  {
    id: "7",
    name: "CSS",
    icon: "https://img.icons8.com/color/48/000000/css3.png",
    rating: 8
  },
  {
    id: "8",
    name: "JavaScript",
    icon: "https://img.icons8.com/color/48/000000/javascript--v1.png",
    rating: 8
  },
  {
    id: "9",
    name: "React",
    icon: "https://img.icons8.com/color/48/000000/react-native.png",
    rating: 8
  },
  {
    id: "10",
    name: "Laravel",
    icon: "https://img.icons8.com/?size=100&id=lRjcvhvtR81o&format=png&color=000000",
    rating: 8
  },
  {
    id: "11",
    name: "HTML",
    icon: "https://img.icons8.com/color/48/000000/html-5--v1.png",
    rating: 8
  },
  {
    id: "12",
    name: "CSS",
    icon: "https://img.icons8.com/color/48/000000/css3.png",
    rating: 8
  },
  {
    id: "13",
    name: "JavaScript",
    icon: "https://img.icons8.com/color/48/000000/javascript--v1.png",
    rating: 8
  },
  {
    id: "14",
    name: "React",
    icon: "https://img.icons8.com/color/48/000000/react-native.png",
    rating: 8
  },
  {
    id: "15",
    name: "Laravel",
    icon: "https://img.icons8.com/?size=100&id=lRjcvhvtR81o&format=png&color=000000",
    rating: 8
  }
];
