"use client";
import { TypeAnimation } from "react-type-animation";
import styles from "@/components/styles/greetings.module.css";
import { Grey_Qo } from "@next/font/google";

const greyQo = Grey_Qo({ weight: "400", subsets: ["latin"] });

export default function Greetings() {
  const text1 = "Greetings";
  const text2 = "I'm Syed Afrid Ali";
  const text3 = "A Wizard Who Codes ...";
  const text4 = "... and A Cosmophile";
  return (
    <div
      className={`${greyQo.className} text-center text-app-tertiary w-full text-5xl md:text-7xl lg:text-9xl`}
    >
      <TypeAnimation
        sequence={[text1, 1000, text2, 1000, text3, 1000, text4, 1000]}
        className={styles.typing_wrapper}
        wrapper="h1"
        cursor={false}
        repeat={Infinity}
      />
    </div>
  );
}
