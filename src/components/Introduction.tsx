import { IAdminWOPassword } from "@/interfaces/i-admin";
import { getAdminByEmailOrId } from "@/models/Admin";
import { LuArrowDownToLine as ArrowDownToLine } from "react-icons/lu";
import Image from "next/image";
import Link from "next/link";

export default async function Introduction() {
  const user: IAdminWOPassword = await getAdminByEmailOrId("admin@mail.com");
  return (
    <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
      <article className="flex flex-col justify-center items-center md:flex-row gap-y-4 ">
        <section className="flex justify-center items-center gap-3 md:flex-col md:w-1/2">
          <Image
            src={user.image?.secureUrl || ""}
            width={200}
            height={200}
            alt="Afrid"
            placeholder={!!user?.blurDataUrl ? "blur" : "empty"}
            blurDataURL={user?.blurDataUrl || ""}
            className="shadow-xl shadow-slate-950 rounded-full w-40 h-40 md:w-64 md:h-64 object-fill aspect-auto"
          />
          <a
            href="/resume.pdf"
            download="Afrid-resume.pdf"
            className="text-app-secondary border-2 border-app-secondary  hover:bg-app-secondary hover:text-[#111] transition-all ease-in-out duration-300 text-center font-bold py-2 px-2 sm:px-4 rounded-lg md:mt-4"
          >
            <span className="hidden md:inline">Download</span>
            <span className="inline-block md:hidden w-4 h-4 mr-1">
              <ArrowDownToLine aria-hidden="true" />
            </span>{" "}
            Resume
          </a>
        </section>
        <section className="md:w-1/2">
          I&apos;m a Full Stack Web Developer
          <span>
            <Image
              className="inline"
              src="/spiderweb.png"
              width={36}
              height={36}
              alt={""}
            />
          </span>
          —based in Kolkata, West Bengal, India—a vibrant city known for its
          rich cultural heritage, historic landmarks, and diverse cuisine. With
          extensive experience in the field, I specialize in developing
          efficient, scalable, and user-friendly web applications using
          technologies like JavaScript, Laravel, Next.js, and MongoDB. Beyond my
          work, I have a keen interest in exploring AI tools, delving into the
          Marvel and Harry Potter universes, and learning Japanese. Go to{" "}
          <Link
            href={"/professional"}
            className="text-app-color-5 hover:text-app-color-6 hover:underline"
          >
            Professional
          </Link>{" "}
          for my Work Experiences and Academics.
        </section>
      </article>
    </div>
  );
}
