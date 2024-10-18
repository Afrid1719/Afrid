import { IProject } from "@/interfaces/i-home";
import { LuCode as Code, LuGlobe as Globe } from "react-icons/lu";
import { FaArrowUpRightFromSquare as SquareArrowOutUpRight } from "react-icons/fa6";
import Image from "next/image";
import Link from "next/link";

type Props = {
  status: string;
  data: IProject[];
  reason: any;
};

export default async function MyProjects({ status, data, reason }: Props) {
  return (
    <div className="flex flex-col items-center p-4 md:p-5">
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
        My Projects
      </h2>
      <h3 className="lg:text-xl text-app-color-5">
        Explore the projects I&apos;ve worked on
      </h3>
      <section className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-max py-6 gap-4">
        {data.map((project) => (
          <div
            key={project._id.toString()}
            className="flex flex-col border-2 border-app-primary rounded-xl"
          >
            <Image
              src={project.preview}
              alt={project.name}
              width={800}
              height={800}
              priority={true}
              className="rounded-t-xl w-full h-auto object-cover"
              style={{ aspectRatio: 300 / 200 }}
            />
            <div className="flex flex-col grow p-4 border-t border-app-primary rounded-b-xl">
              <h2 className="text-xl lg:text-2xl font-bold text-app-tertiary">
                <Link href={project.url || ""} target="_blank">
                  {project.name}
                </Link>
              </h2>
              <p className="mt-2">
                Built using{" "}
                <strong className="text-app-tertiary">
                  {project.techs.join(", ")}
                </strong>
              </p>
              <div className="mt-2 flex flex-nowrap w-full justify-end gap-x-3 text-2xl">
                <Link
                  href={project.codeLink}
                  target="_blank"
                  className="text-[#111] bg-app-secondary border  border-app-secondary rounded-md px-2 py-1 text-base"
                  aria-label="View code"
                >
                  <Code className="w-6 h-6" aria-hidden="true" />
                </Link>
                {project.url && (
                  <Link
                    href={project.url}
                    target="_blank"
                    className="text-app-secondary hover:text-app-color-6 px-2 py-1"
                    aria-label="View live"
                  >
                    <Globe className="w-6 h-6" aria-hidden="true" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </section>
      {data.length > 3 && (
        <Link
          href="/projects"
          className="flex flex-row items-end text-app-secondary hover:text-app-color-6"
        >
          <div className="block">View All Projects</div>{" "}
          <SquareArrowOutUpRight className="ml-2 mb-1 w-4 h-4" />
        </Link>
      )}
    </div>
  );
}
