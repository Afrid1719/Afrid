import Timeline from "@/components/Timeline";
import { IAcademics, IExperience } from "@/interfaces/i-professional";
import Academics from "@/components/Academics";
import { getAllExperiences } from "@/models/Experience";
import { getAllAcademics } from "@/models/Academics";
import { BriefcaseBusiness, GraduationCap } from "lucide-react";

export default async function Page() {
  const workExperience: IExperience[] = await getAllExperiences();
  const academicsData: IAcademics[] = await getAllAcademics();
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4 flex flex-row items-end">
          <div className="block">Work Experience</div>
          <BriefcaseBusiness color="#5b7327" className="ml-2 w-10 h-10" />
        </h2>
        <div className="flex flex-col p-4 md:p-0 lg:w-3/4">
          <Timeline data={workExperience} />
        </div>
      </div>
      <hr className="w-2/4 mt-4 border-app-tertiary-dark" />
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold my-2 md:my-4 flex flex-row items-end">
          <div>Academics</div>
          <GraduationCap color="#5b7327" className="ml-2 w-10 h-10" />
        </h2>
      </div>
      <div className="grid grid-cols-1 grid-rows-1 items-center justify-center gap-y-6">
        <Academics data={academicsData} />
      </div>
    </div>
  );
}
