import { IRoute } from "@/interfaces/i-routes";

export const routes: IRoute[] = [
  {
    menuName: "Home",
    path: "/home",
    off: false,
    showInMenu: true
  },
  {
    menuName: "Incidents",
    path: "/incidents",
    off: true,
    showInMenu: false
  },
  {
    menuName: "Memories",
    path: "/memories",
    off: true,
    showInMenu: false
  },
  {
    menuName: "Gallery",
    path: "/gallery",
    off: true,
    showInMenu: false
  },
  {
    menuName: "Professional",
    path: "/professional",
    off: false,
    showInMenu: true
  },
  {
    menuName: "Blog",
    path: "/blog",
    off: false,
    showInMenu: true
  },
  {
    menuName: "Projects",
    path: "/projects",
    off: false,
    showInMenu: true
  },
  {
    menuName: "Thoughts",
    path: "/thoughts",
    off: true,
    showInMenu: false
  },
  {
    menuName: "Profile",
    path: "/profile",
    off: false,
    showInMenu: true
  },
  {
    menuName: "Login",
    path: "/login",
    off: false,
    showInMenu: true
  },
  {
    menuName: "Register",
    path: "/register",
    off: false,
    showInMenu: false
  }
];
