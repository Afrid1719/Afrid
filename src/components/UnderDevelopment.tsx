"use client";

import Lottie from "lottie-react";
import Development from "./data/Development-Lottie.json";

export default function UnderDevelopment() {
  return (
    <Lottie
      animationData={Development}
      loop={true}
      className="w-3/4 lg:w-[400px] h-3/4"
    />
  );
}
