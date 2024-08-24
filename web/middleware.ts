import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher(["/auth/login(.*)", "/auth/signup(.*)", "/"]);

const a = (request: NextRequest) => {};
const func = [a];

export default clerkMiddleware((auth, request) => {
  if (!isPublicRoute(request)) auth().protect();

  // Onboarding middleware
  if (
    request.nextUrl.pathname.startsWith("/dashboard") &&
    !request.nextUrl.pathname.includes("/onboarding")
  ) {
    return NextResponse.redirect(new URL("/dashboard/onboarding", request.url));
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
