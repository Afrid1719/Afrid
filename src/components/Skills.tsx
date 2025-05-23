"use client";
import Image from "next/image";
import { useState } from "react";
import Card from "@/components/Card";
import { ISkill } from "@/interfaces/i-home";

type Props = {
  status: string;
  data: ISkill[];
  reason: any;
};

export default function Skills({ status, data, reason }: Props) {
  const [showMore, setShowMore] = useState(false);
  return (
    <div className="flex flex-col items-center p-4 md:p-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
        My Skills
      </h2>
      <h3 className="lg:text-xl text-app-color-5">
        Explore the diverse range of skills I&apos;ve honed over the years
      </h3>
      <section className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 py-6 gap-4">
        {data.map((skill, i) => {
          if (i > 5 && !showMore) return null;
          return (
            <Card
              key={skill._id.toString()}
              mergeClasses={false}
              className="flex flex-col border-2 border-app-primary shadow hover:shadow-lg hover:scale-105 transition-all ease hover:shadow-app-primary/40 rounded-xl items-center justify-center p-2 md:p-5 z-[99]"
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                title={skill.name}
                width={48}
                height={48}
                placeholder="blur"
                blurDataURL={skill.blurDataUrl || ""}
              />
              <strong className="text-center">{skill.name}</strong>
              <span className="text-sm text-center">{`${skill.rating} / 10`}</span>
            </Card>
          );
        })}
      </section>
      {data.length > 6 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="bg-app-secondary hover:bg-app-color-5 text-[#111] transition-all ease-in-out duration-300 font-bold py-2 px-4 rounded mt-1"
        >
          {showMore ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
}
