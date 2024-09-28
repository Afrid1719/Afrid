import { IRoute } from "@/interfaces/i-routes";

export const routes: IRoute[] = [
  {
    menuName: "Home",
    path: "/home",
    off: false
  },
  {
    menuName: "Incidents",
    path: "/incidents",
    off: true
  },
  {
    menuName: "Memories",
    path: "/memories",
    off: true
  },
  {
    menuName: "Gallery",
    path: "/gallery",
    off: true
  },
  {
    menuName: "Professional",
    path: "/professional",
    off: false
  },
  {
    menuName: "Blog",
    path: "/blog",
    off: false
  },
  {
    menuName: "Projects",
    path: "/projects",
    off: false
  },
  {
    menuName: "Thoughts",
    path: "/thoughts",
    off: true
  },
  {
    menuName: "Profile",
    path: "/profile",
    off: false
  },
  {
    menuName: "Login",
    path: "/login",
    off: true
  },
  {
    menuName: "Register",
    path: "/register",
    off: true
  }
];
