import { IMyProject } from "@/interfaces/i-home";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { faGlobe } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MyProjects({ data }: { data: IMyProject[] }) {
  return (
    <div className="flex flex-col items-center p-4 md:p-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
        My Projects
      </h2>
      <h3 className="lg:text-xl text-app-color-5">
        Explore the projects I&apos;ve worked on.
      </h3>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-max py-6 gap-4">
        {data.map((project) => (
          <div
            key={project.id}
            className="flex flex-col border-2 border-app-primary rounded-xl"
          >
            <Image
              src={project.preview}
              alt={project.name}
              width={800}
              height={800}
              className="rounded-t-xl w-full h-auto object-cover"
              style={{ aspectRatio: 300 / 200 }}
            />
            <div className="p-4 bg-app-primary bg-opacity-50 rounded-b-xl">
              <h2 className="text-xl lg:text-2xl font-bold text-app-tertiary">
                <Link href={project.url || ""} target="_blank">
                  {project.name}
                </Link>
              </h2>
              {project.description && (
                <p className="mt-2 text-white">
                  {project.description.length > 200
                    ? project.description.substring(0, 200) + "..."
                    : project.description}
                </p>
              )}
              <p className="mt-2">
                Technologies:{" "}
                <strong className="text-app-tertiary">
                  {project.techs.join(", ").length > 100
                    ? project.techs.join(", ").slice(0, 100) + "..."
                    : project.techs.join(", ")}
                </strong>
              </p>
              <div className="mt-2 flex flex-nowrap w-full justify-end gap-x-3 text-2xl">
                <Link
                  href={project.codeLink}
                  target="_blank"
                  className="text-app-secondary hover:text-app-color-6"
                >
                  <FontAwesomeIcon icon={faGithub} />
                </Link>
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    className="text-app-secondary hover:text-app-color-6"
                  >
                    <FontAwesomeIcon icon={faGlobe} />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}