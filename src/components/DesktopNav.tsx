"use client";
import { routes } from "@/app/routes.config";
import { IRoute } from "@/interfaces/i-routes";
import Link from "next/link";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const DesktopNav = ({
  shrunk,
  showLogout
}: {
  shrunk: boolean;
  showLogout: boolean;
}) => {
  const { status } = useSession();
  const router = useRouter();

  const handleLoginLogout = async (
    evt: React.MouseEvent<HTMLAnchorElement>
  ) => {
    evt.preventDefault();
    if (status === "authenticated") {
      await signOut();
    } else {
      router.push("/login");
    }
  };

  return (
    <div
      className={`${
        shrunk
          ? "fixed z-[101] h-[72px] top-0 left-1/2 -translate-x-1/2 ease"
          : ""
      } container mx-auto md:flex hidden flex-wrap items-center p-4 md:p-0 md:mb-4 mb-5`}
    >
      <nav className="nav--desktop md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        {routes
          .filter((route) => !route.off)
          .map((route: IRoute, $idx: number) => {
            if (route.path !== "/login") {
              return (
                <Link
                  key={`route-${$idx}`}
                  href={route.path}
                  className="inline-block px-2 py-0.5 mr-3 text-app-secondary nav-links--desktop"
                >
                  {route.menuName}
                </Link>
              );
            } else {
              return (
                <Link
                  key="route-loginlogout"
                  href="#"
                  onClick={handleLoginLogout}
                  className="inline-block px-2 py-0.5 mr-3 text-app-secondary nav-links--desktop"
                >
                  {status === "authenticated" ? "Logout" : "Login"}
                </Link>
              );
            }
          })}
        {showLogout && (
          <button
            key="route-logout"
            onClick={async () => await signOut()}
            className="inline-block px-2 py-0.5 mr-3 font-semibold bg-app-secondary text-app-primary rounded"
          >
            Logout
          </button>
        )}
      </nav>
    </div>
  );
};

export default DesktopNav;
