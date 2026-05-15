import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const defaultLocale = "en";
const bareLocaleRedirectSegments = new Set([
  "admin",
  "agents",
  "leaderboard",
  "learn",
  "profile",
  "references",
]);

const isProtectedRoute = createRouteMatcher([
  "/:locale/profile(.*)",
  "/:locale/admin(.*)",
]);

export default clerkMiddleware(async (auth, request) => {
  const firstPathSegment = request.nextUrl.pathname.split("/")[1];

  if (bareLocaleRedirectSegments.has(firstPathSegment)) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = `/${defaultLocale}${request.nextUrl.pathname}`;
    return NextResponse.redirect(redirectUrl);
  }

  if (isProtectedRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
