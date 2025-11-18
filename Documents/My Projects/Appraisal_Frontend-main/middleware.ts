//
// // middleware.ts
import { NextResponse } from "next/server";

// Define protected routes and required roles

export default function middleware() {
  return NextResponse.next();
}

// No-op middleware; add route protection here if needed later.

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)"],
};
