import { Suspense } from "react";
import MobileNav from "./MobileNav";
import StickyHeader from "./StickyHeader";
import { isAllowed } from "@/utils/access";
import AuthProvider from "@/app/context/AuthProvider";

export default async function PageHeader() {
  const showLogout = await isAllowed();
  return (
    <>
      <AuthProvider>
        <MobileNav
          pageWrapperId="page-wrapper"
          outerContainerId="body-wrapper"
          className="block md:hidden"
          showLogout={showLogout}
        />
        <Suspense>
          <StickyHeader showLogout={showLogout} />
        </Suspense>
      </AuthProvider>
    </>
  );
}
