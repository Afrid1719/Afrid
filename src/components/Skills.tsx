import Image from "next/image";
import React from "react";
import Card from "./Card";
import { ISkill } from "@/interfaces/i-home";

export default function Skills({ skillSet }: { skillSet: ISkill[] }) {
  return (
    <div className="flex flex-col items-center p-4 md:p-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
        My Skills
      </h2>
      <h3 className="lg:text-xl text-app-color-5">
        Explore the diverse range of skills I&apos;ve honed over the years
      </h3>
      <section className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 py-6 gap-4">
        {skillSet.map((skill) => (
          <Card
            key={skill.id}
            mergeClasses={false}
            className="flex flex-col border-2 bg-app-primary border-app-primary shadow hover:shadow-xl hover:scale-105 transition-all ease hover:shadow-app-primary/40 rounded-xl items-center justify-center p-4 md:p-5"
          >
            <Image
              src={skill.icon}
              alt={skill.name}
              title={skill.name}
              width={48}
              height={48}
            />
            <strong>{skill.name}</strong>
            <span className="text-sm">{`${skill.rating} / 10`}</span>
          </Card>
        ))}
      </section>
    </div>
  );
}
