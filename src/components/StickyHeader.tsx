"use client";

import { useEffect, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import Header from "./Header";
import DesktopNav from "./DesktopNav";

export default function StickyHeader({ showLogout }: { showLogout: boolean }) {
  const [headerHeight, setHeaderHeight] = useState(0);
  const [documentHeight, setDocumentHeight] = useState(0);
  const [shrunk, setShurnk] = useState<boolean>(false);
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setShurnk(true);
    } else {
      setShurnk(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      setHeaderHeight(
        document.querySelector("header").getBoundingClientRect().height || 0
      );
      setDocumentHeight(document.body.scrollHeight);
      if (documentHeight > window.innerHeight + headerHeight + 72) {
        window.addEventListener("scroll", handleScroll);
        return () => {
          window.removeEventListener("scroll", handleScroll);
        };
      }
    }
  }, [pathName, searchParams, documentHeight, headerHeight]);

  return (
    <>
      <Header shrunk={shrunk} stickyHeight={"72px"} />
      <DesktopNav shrunk={shrunk} showLogout={showLogout} />
    </>
  );
}
