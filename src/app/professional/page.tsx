import Timeline from "@/components/Timeline";
import { IAcademics, IWorkExperience } from "@/interfaces/i-professional";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBook } from "@fortawesome/free-solid-svg-icons";
import Academics from "@/components/Academics";

const dummyData: IWorkExperience[] = [
  {
    id: "1",
    position: "Team Lead",
    company: "Company A",
    duration: "04/2024 - Present",
    description: [
      "Spearheaded a comprehensive project analysis initiative that identified key delay factors, leading to a redefined workflow; adjustments contributed to a smoother release process and enhanced stakeholder satisfaction ratings by 15%",
      "Mentored a team of 3 developers and 1 QA through complex technical challenges by developing tailored troubleshooting guides, resulting in a 15% reduction in project delays and fostering an environment of continuous improvement and growth.",
      "Reviewed over 30 pull requests and addressed 3-5 critical bug fixes before pushing to production, allowing other team members to focus on priority tasks and maintain project momentum."
    ],
    techs: ["React", "Nextjs", "JavaScript", "Laravel", "MySQL"]
  },
  {
    id: "2",
    position: "Freelancer",
    company: "Freelance",
    duration: "2021-2022",
    description: [
      "Built a custom e-commerce website using React and Next.js",
      "Worked with a client to design and develop a new feature",
      "Participated in weekly progress meetings and daily code reviews"
    ],
    techs: ["React", "Next.js", "JavaScript"]
  },
  {
    id: "3",
    position: "Freelancer",
    company: "Freelance",
    duration: "2021-2022",
    description: [
      "Built a custom e-commerce website using React and Next.js",
      "Worked with a client to design and develop a new feature",
      "Participated in weekly progress meetings and daily code reviews"
    ],
    techs: ["React", "Next.js", "JavaScript"]
  },
  {
    id: "4",
    position: "Team Lead",
    company: "Company A",
    duration: "04/2024 - Present",
    description: [
      "Spearheaded a comprehensive project analysis initiative that identified key delay factors, leading to a redefined workflow; adjustments contributed to a smoother release process and enhanced stakeholder satisfaction ratings by 15%",
      "Mentored a team of 3 developers and 1 QA through complex technical challenges by developing tailored troubleshooting guides, resulting in a 15% reduction in project delays and fostering an environment of continuous improvement and growth.",
      "Reviewed over 30 pull requests and addressed 3-5 critical bug fixes before pushing to production, allowing other team members to focus on priority tasks and maintain project momentum."
    ],
    techs: ["React", "Nextjs", "JavaScript", "Laravel", "MySQL"]
  },
  {
    id: "5",
    position: "Freelancer",
    company: "Freelance",
    duration: "2021-2022",
    description: [
      "Built a custom e-commerce website using React and Next.js",
      "Worked with a client to design and develop a new feature",
      "Participated in weekly progress meetings and daily code reviews"
    ],
    techs: ["React", "Next.js", "JavaScript"]
  }
];

const academicsData: IAcademics[] = [
  {
    id: "1",
    level: "Masters",
    degree: "Masters of Computer Application",
    institutionImage: "/lpu.png",
    institutionName: "Lovely Professional University",
    startYear: "2024",
    endYear: "2026 (Expected)"
  },
  {
    id: "2",
    level: "Bachelors",
    degree: "Bachelors of Computer Application",
    institutionImage: "/lpu.png",
    institutionName: "Lovely Professional University",
    startYear: "2016",
    endYear: "2019"
  },
  {
    id: "3",
    level: "Certification",
    degree: "Programming in C++",
    institutionImage: "/lpu.png",
    institutionName: "NPTEL",
    startYear: "2017"
  }
];

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
          Work Experience{" "}
          <FontAwesomeIcon icon={faBriefcase} style={{ color: "#5b7327" }} />
        </h2>
        <div className="flex flex-col p-4 md:p-0 lg:w-3/4">
          <Timeline data={dummyData} />
        </div>
      </div>
      <hr className="w-2/4 mt-4 border-app-tertiary-dark" />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold my-2 md:my-4">
          Academics{" "}
          <FontAwesomeIcon icon={faBook} style={{ color: "#5b7327" }} />
        </h2>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 items-center justify-center gap-y-6">
        <Academics data={academicsData} />
      </div>
    </div>
  );
}
