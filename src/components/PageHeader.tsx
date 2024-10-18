import { Suspense } from "react";
import MobileNav from "@/components/MobileNav";
import StickyHeader from "@/components/StickyHeader";
import { isAllowed } from "@/utils/access";
import AuthProvider from "@/components/AuthProvider";

export default async function PageHeader() {
  const isAdmin = await isAllowed();
  return (
    <>
      <AuthProvider>
        <MobileNav
          pageWrapperId="page-wrapper"
          outerContainerId="body-wrapper"
          className="block md:hidden"
          isAdmin={isAdmin}
        />
        <Suspense>
          <StickyHeader isAdmin={isAdmin} />
        </Suspense>
      </AuthProvider>
    </>
  );
}
