import { auth } from "@/auth";
import { NextResponse, type NextRequest } from "next/server";

// Rename this file to proxy.ts as the middleware convention is deprecated.
// Update imports and references to this file accordingly.

// Use the auth() wrapper — the recommended NextAuth v5 middleware pattern
export default auth(function proxyHandler(req) {
  const nextUrl = (req as NextRequest).nextUrl;
  const session = req.auth;
  const isLoggedIn = !!session?.user;
  // role is added to session via JWT callback in auth.ts
  const isAdmin = (session?.user as { role?: string } | undefined)?.role === "admin";
  const isAdminRoute = nextUrl.pathname.startsWith("/admin");

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/", nextUrl));
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/admin/:path*"],
};