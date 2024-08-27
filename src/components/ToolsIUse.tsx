"use client";
import { ITool } from "@/interfaces/i-home";
import React from "react";
import Image from "next/image";
import Card from "./Card";

export default function ToolsIUse({ data }: { data: ITool[] }) {
  const [showMore, setShowMore] = React.useState(false);
  return (
    <div className="flex flex-col items-center p-4 md:p-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
        Tools I Use
      </h2>
      <h3 className="lg:text-xl text-app-color-5">
        Discover the tools and technologies I leverage to build amazing projects
      </h3>
      <section className="w-full grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 py-6 gap-4">
        {data.map((tool, i) => {
          if (i > 5 && !showMore) return null;
          return (
            <Card
              key={tool.id}
              mergeClasses={false}
              className="flex flex-col border-2 border-app-primary shadow hover:shadow-lg hover:scale-105 transition-all ease hover:shadow-app-primary/40 rounded-xl items-center justify-center p-2 md:p-5"
            >
              <Image
                src={tool.icon}
                alt={tool.name}
                title={tool.name}
                width={48}
                height={48}
              />
              <strong>{tool.name}</strong>
              {tool.rating && (
                <span className="text-sm">{`${tool.rating} / 10`}</span>
              )}
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
