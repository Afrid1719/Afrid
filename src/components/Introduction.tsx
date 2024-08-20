import Image from "next/image";

export default function Introduction() {
  return (
    <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
      <article>
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
        —based in Kolkata, West Bengal, India—a vibrant city known for its rich
        cultural heritage, historic landmarks, and diverse cuisine. With
        extensive experience in the field, I specialize in developing efficient,
        scalable, and user-friendly web applications using technologies like
        JavaScript, Laravel, Next.js, and MongoDB. Beyond my work, I have a keen
        interest in exploring AI tools, delving into the Marvel and Harry Potter
        universes, and learning Japanese.
      </article>
    </div>
  );
}
