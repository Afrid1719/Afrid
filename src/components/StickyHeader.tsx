"use client";

import { useEffect, useState } from "react";
import Header from "./Header";
import DesktopNav from "./DesktopNav";

export default function StickyHeader() {
  const [shrunk, setShurnk] = useState<boolean>(false);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShurnk(true);
    } else {
      setShurnk(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  });

  return (
    <>
      <Header shrunk={shrunk} />
      <DesktopNav shrunk={shrunk} />
    </>
  );
}
