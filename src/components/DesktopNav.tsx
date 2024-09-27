import { routes } from "@/app/routes.config";
import { IRoute } from "@/interfaces/i-routes";
import Link from "next/link";
// import { getServerSession } from "next-auth";
// import { authOptions } from "@/lib/auth";
// import { isAllowed } from "@/utils/access";

const DesktopNav = async () => {
  // const showLogout = await isAllowed();
  // const { status } = { status: "unauthenticated" };
  // const session = await getServerSession(authOptions);

  return (
    <div className=" z-[101] ease container mx-auto md:flex hidden flex-wrap items-center p-4 md:p-0 md:mb-4 mb-5">
      <nav className="nav--desktop md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
        {routes
          .filter((route) => !route.off)
          .map((route: IRoute, $idx: number) => {
            return (
              <Link
                key={`route-${$idx}`}
                href={route.path}
                className="inline-block px-2 py-0.5 mr-3 text-app-secondary nav-links--desktop"
              >
                {route.menuName}
              </Link>
            );
            // else {
            // return (
            //   <Link
            //     key="route-loginlogout"
            //     href="#"
            //     onClick={handleLoginLogout}
            //     className="inline-block px-2 py-0.5 mr-3 text-app-secondary nav-links--desktop"
            //   >
            //     {status === "authenticated" ? "Logout" : "Login"}
            //   </Link>
            // );
            // }
          })}
      </nav>
    </div>
  );
};

export default DesktopNav;
