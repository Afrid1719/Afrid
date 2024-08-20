import Card from "./Card";
import Svg from "./Svg";

export default function AboutApp() {
  return (
    <Card>
      <div className="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div className="w-full">
          <h3 className="text-left text-3xl font-bold">About the App</h3>
        </div>
        <br />
        <article className="">
          This portfolio website is designed to present my work and skills in a
          visually appealing and user-friendly way. With a focus on simplicity
          and responsiveness, it ensures that the content looks great on any
          device. Smooth animations and thoughtful interactions add a touch of
          elegance, making navigation a breeze. Each project is carefully
          highlighted to tell its story, offering a glimpse into my expertise
          and passion for development. From the modern design to the seamless
          experience, this website is a reflection of my commitment to
          delivering high-quality, engaging digital experiences.
          <br /> <br />
          <div className="flex flex-row space-x-1">
            <span className="text-sm">Technologies:</span>
            <Svg src="react.svg" alt="react logo" title="Reactjs" />
            <Svg src="tailwind.svg" alt="tailwind logo" title="Tailwind CSS" />
            <Svg
              src="typescript.svg"
              alt="typescript logo"
              title="TypeScript"
            />
            <Svg src="prisma.svg" alt="prisma logo" title="Prisma" />
            <Svg src="mongodb.svg" alt="mongodb logo" title="MongoDB" />
            <Svg src="nextjs.svg" alt="nextjs logo" title="Next.js" />
          </div>
        </article>
      </div>
    </Card>
  );
}
