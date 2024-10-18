"use client";
import { routes } from "@/app/routes.config";
import { IRoute } from "@/interfaces/i-routes";
import Link from "next/link";
import { slide as Menu } from "react-burger-menu";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Props = {
  pageWrapperId: string;
  outerContainerId: string;
  className: string;
  isAdmin: boolean;
};

var mobileNavStyles = {
  bmBurgerButton: {
    position: "fixed",
    width: "28px",
    height: "20px",
    right: "30px",
    top: "16px"
  },
  bmBurgerBars: {
    background: "#79c4f2"
  },
  bmBurgerBarsHover: {
    background: "#3286cf"
  },
  bmCrossButton: {
    height: "24px",
    width: "24px",
    top: "30px",
    right: "30px"
  },
  bmCross: {
    background: "#5b7327"
  },
  bmMenuWrap: {
    position: "fixed",
    height: "100%"
  },
  bmMenu: {
    background: "rgb(7,31,53)",
    padding: "2.5em 1.5em 0",
    fontSize: "1.15em"
  },
  bmMorphShape: {
    fill: "#e0fdf8"
  },
  bmItemList: {
    color: "#e0fdf8",
    padding: "0.8em",
    marginTop: "2em"
  },
  bmItem: {
    padding: "8px 6px",
    textAlign: "center"
  },
  bmOverlay: {
    background: "rgba(0, 0, 0, 0.3)"
  }
};

const MobileNav = (props: Props) => {
  const { status } = useSession();
  const router = useRouter();
  const pathName = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(true);

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

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathName]);

  return (
    <Menu
      styles={mobileNavStyles}
      right
      burgerButtonClassName={props.className}
      isOpen={isMenuOpen}
      onStateChange={({ isOpen }) => setIsMenuOpen(isOpen)}
    >
      {routes
        .filter((route) => !route.off)
        .map((route: IRoute, $idx: number) => {
          if (route.path !== "/login") {
            if (route.path === "/profile" && !props.isAdmin) return null;
            return (
              <Link
                key={`route-${$idx}`}
                href={route.path}
                className="mr-5 hover:text-app-color-6 text-app-secondary"
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
                className="mr-5 hover:text-app-color-6 text-app-secondary"
              >
                {status === "authenticated" ? "Logout" : "Login"}
              </Link>
            );
          }
        })}
      {props.isAdmin && (
        <a
          key="route-logout"
          onClick={async () => await signOut()}
          className="cursor-pointer mr-5 rounded text-app-primary bg-app-secondary "
        >
          Logout
        </a>
      )}
    </Menu>
  );
};

export default MobileNav;
