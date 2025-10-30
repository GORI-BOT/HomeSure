import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse, type NextRequest } from "next/server";

export async function updateSession(request: NextRequest) {
  // Create a NextResponse (needed for Edge middleware)
  const response = NextResponse.next();

  // Create an Edge-safe Supabase client
  const supabase = createMiddlewareClient({ req: request, res: response });

  // Retrieve the user session
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect admin and account routes
  if (
    !user &&
    (request.nextUrl.pathname.startsWith("/admin") ||
      request.nextUrl.pathname.startsWith("/account"))
  ) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  // Return response (with session cookies updated)
  return response;
}
