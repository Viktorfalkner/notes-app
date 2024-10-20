import { updateSession } from './utils/supabase/middleware'
import { NextResponse, type NextRequest } from 'next/server'



export async function middleware(request: NextRequest) {
  let { user, supabaseResponse } = await updateSession(request);

const path = new URL(request.url).pathname;

const unprotectedPaths = ["/login", "/create-account"];
const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up));

console.log("User & isUnprotectedPath", user?.id, isUnprotectedPath)

if (user && isUnprotectedPath) {
  console.log("User logged in - redirecting to Dash", user)
  return NextResponse.redirect(new URL("/", request.url));
} else if (!user && !isUnprotectedPath) {
  console.log("User not logged in - redirecting to login", user)
  return NextResponse.redirect(new URL("/login", request.url));
}

  supabaseResponse = NextResponse.next();
  return supabaseResponse;
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
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}