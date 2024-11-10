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
      signIn: "/inventory-management/sign-in",
    },
  }
);

// Protect the `/inventory-management/home/dashboard` route
export const config = {
  matcher: [
    "/inventory-management/home/dashboard",
    "/inventory-management/user/(.*)",
    "/inventory-management/product/(.*)",
    "/inventory-management/category/(.*)",
    "/inventory-management/supplier/(.*)",
    "/inventory-management/transaction/(.*)",
  ],
};
