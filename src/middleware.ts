// src/middleware.ts
import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    // Here you can define custom logic if needed
    return NextResponse.next();
  },
  {
    pages: {
      // signIn: "/sign-in", // Redirect unauthenticated users to sign-in page
    },
  }
);

// Protect the `/inventory-management/home/dashboard` route
export const config = {
  matcher: [
    // "/inventory-management/home/dashboard", "/protected-route-path",
    // "/inventory-management/:path*",
  ],
};
