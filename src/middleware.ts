import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getCurrentUser } from "./service/Auth";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // 1. Attempt to get the user from token/cookie
  let user = null;
  try {
    user = await getCurrentUser(); // Make sure this reads cookie or header token
  } catch (error) {
    console.error("Error fetching user:", error);
  }

  if (user) {
    return NextResponse.next();
  }

  // 6. Block access and redirect to home
  return NextResponse.redirect(new URL("/", request.url));
}

// 7. Configure route matching
export const config = {
  matcher: ["/dashboard/:path*"],
};
