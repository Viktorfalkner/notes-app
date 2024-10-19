import { NextResponse, type NextRequest } from "next/server";
import { updateSession } from './utils/supabase/middleware'
import { createClient } from '@/utils/supabase/server'


export async function middleware(request: NextRequest) {
  // return await updateSession(request)

  console.log("MIDDLEWARE HIT");


  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });
  const path = new URL(request.url).pathname;

  const unprotectedPaths = ["/login"];

  const supabase = createClient()

  const { data, error } = await supabase.auth.getUser()
  const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up));

  const user = data.user

  if (user && isUnprotectedPath) {
    console.log("User logged in - redirecting to Dash", user)
    return NextResponse.redirect(new URL("/", request.url));
  } else if (!user && !isUnprotectedPath) {
    console.log("User not logged in - redirecting to login", user)
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}