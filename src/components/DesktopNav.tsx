import { routes } from "@/app/routes.config";
import { IRoute } from "@/interfaces/i-routes";
import Link from "next/link";
import React from "react";
import LoginLogout from "./LoginLogout";

const DesktopNav = () => {
  return (
    <div className="container mx-auto md:flex hidden flex-wrap items-center p-4 md:p-0 md:mb-8 mb-5">
      <nav className="nav--desktop md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        {routes.map((route: IRoute, $idx: number) => (
          <Link
            key={`route-${$idx}`}
            href={route.path}
            className="inline-block px-2 py-0.5 mr-3 text-app-secondary nav-links--desktop"
          >
            {route.menuName}
          </Link>
        ))}
        <LoginLogout className="nav-links--desktop" />
      </nav>
    </div>
  );
};

export default DesktopNav;
