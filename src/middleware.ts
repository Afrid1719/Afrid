import { MiddlewareConfig, NextResponse, type NextRequest } from "next/server";
import { routes } from "./app/routes.config";
import { isAllowed } from "./utils/access";

const protectedRoutes: string[] = routes
  .filter((route) => route.off)
  .map((route) => route.path);

export const config: MiddlewareConfig = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)"
  ]
};

export async function middleware(req: NextRequest) {
  if (
    protectedRoutes.some((item) => req.nextUrl.pathname.startsWith(item)) &&
    !(await isAllowed(req))
  ) {
    return NextResponse.redirect(new URL("/home", req.url));
  }
}
