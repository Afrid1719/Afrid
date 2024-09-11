"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Card from "./Card";
import { ISkill } from "@/interfaces/i-home";

export default function Skills() {
  const [showMore, setShowMore] = useState(false);
  const [data, setData] = useState<ISkill[]>([]);
  useEffect(() => {
    fetch("/api/skills")
      .then((res) => res.json())
      .then((res) => setData(res));
  }, []);
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
              key={skill.id}
              mergeClasses={false}
              className="flex flex-col border-2 border-app-primary shadow hover:shadow-lg hover:scale-105 transition-all ease hover:shadow-app-primary/40 rounded-xl items-center justify-center p-2 md:p-5 z-[99]"
            >
              <Image
                src={skill.icon}
                alt={skill.name}
                title={skill.name}
                width={48}
                height={48}
                priority={true}
              />
              <strong>{skill.name}</strong>
              <span className="text-sm">{`${skill.rating} / 10`}</span>
            </Card>
          );
        })}
      </section>
      {data.length > 6 && (
        <button
          onClick={() => setShowMore(!showMore)}
          className="bg-app-color-6 hover:bg-app-color-5 text-white font-bold py-2 px-4 rounded mt-1"
        >
          {showMore ? "View Less" : "View More"}
        </button>
      )}
    </div>
  );
}
