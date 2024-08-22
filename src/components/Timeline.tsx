import { IWorkExperience } from "@/interfaces/i-professional";
import { Fragment } from "react";
import DocumentDownload from "./DocumentDownload";

const Timeline = ({ data }: { data: IWorkExperience[] }) => (
  <div className="flex flex-col gap-y-2">
    {data.map((item, index) => (
      <TimelineItem key={index} item={item} />
    ))}
  </div>
);

function TimelineItem({ item }: { item: IWorkExperience }) {
  return (
    <Fragment>
      <div className="gap-y-2 gap-x-3 grid grid-cols-[20px_1fr] grid-rows-[minmax(2rem, auto)_1fr]">
        <div className="flex justify-center items-center">
          <div className="w-2 h-2 rounded-full bg-app-color-5"></div>
        </div>
        <div className="flex flex-row justify-between">
          <h3 className="font-bold text-xl text-app-secondary">
            {item.position}
          </h3>
          <DocumentDownload />
        </div>
        <div className="flex justify-center items-center">
          <div className="w-[2px] h-full bg-app-primary"></div>
        </div>
        <div className="flex flex-col items-start px-4 py-2 rounded-md bg-app-primary bg-opacity-50 shadow-md">
          <h4 className="">
            {item.company} <span className="text-2xl leading-tight">|</span>
            <em className="text-sm"> {item.duration}</em>
          </h4>
          <h4 className="italic text-sm"></h4>
          <section className="mt-2">
            {item.description.map((desc, index) => (
              <p key={index} className="py-2">
                {desc}
              </p>
            ))}
            <p className="py-2">
              Technologies &amp; Tools -{" "}
              <strong className="text-app-tertiary">
                {item.techs.join(", ")}
              </strong>
            </p>
          </section>
        </div>
      </div>
    </Fragment>
  );
}

export default Timeline;
