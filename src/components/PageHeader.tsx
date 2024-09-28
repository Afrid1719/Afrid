import { Suspense } from "react";
import MobileNav from "./MobileNav";
import StickyHeader from "./StickyHeader";
import { isAllowed } from "@/utils/access";

export default async function PageHeader() {
  const isAdmin = await isAllowed();
  return (
    <>
      <MobileNav
        pageWrapperId="page-wrapper"
        outerContainerId="body-wrapper"
        className="block md:hidden"
        showLogout={isAdmin}
      />
      <Suspense>
        <StickyHeader isAdmin={isAdmin} />
      </Suspense>
    </>
  );
}
