import Timeline from "@/components/Timeline";
import { IAcademics, IExperience } from "@/interfaces/i-professional";
import { config } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBriefcase, faBook } from "@fortawesome/free-solid-svg-icons";
import Academics from "@/components/Academics";
import { getAllExperiences } from "@/models/Experience";
import { getAllAcademics } from "@/models/Academics";

config.autoAddCss = false;

export default async function Page() {
  const workExperience: IExperience[] = await getAllExperiences();
  const academicsData: IAcademics[] = await getAllAcademics();
  return (
    <div className="flex flex-col items-center justify-center gap-y-4">
      <div className="flex flex-col items-center justify-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
          Work Experience{" "}
          <FontAwesomeIcon icon={faBriefcase} style={{ color: "#5b7327" }} />
        </h2>
        <div className="flex flex-col p-4 md:p-0 lg:w-3/4">
          <Timeline data={workExperience} />
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
