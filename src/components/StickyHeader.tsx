"use client";

import { debounce } from "lodash";
import { useEffect, useState } from "react";
import Header from "./Header";
import DesktopNav from "./DesktopNav";

export default function StickyHeader() {
  const [shrunk, setShurnk] = useState<boolean>(false);

  const handleScroll = debounce(
    () => {
      if (window.scrollY > 0) {
        setShurnk(true);
      } else {
        setShurnk(false);
      }
    },
    100,
    { leading: true, trailing: true }
  );

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll.cancel);
    };
  });

  return (
    <>
      <Header shrunk={shrunk} />
      <DesktopNav shrunk={shrunk} />
    </>
  );
}
