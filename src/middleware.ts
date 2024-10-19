import { NextResponse, type NextRequest } from "next/server";
import { createServerClient, type CookieOptions } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const path = new URL(request.url).pathname;

  const unprotectedPaths = ["/login", "/create-account"];

  const user = await getUser(request, response);
  const isUnprotectedPath = unprotectedPaths.some((up) => path.startsWith(up));

  // If signed-in AND an unprotected Path -> Go to home
  if (user && isUnprotectedPath) {
    console.log("im here")
    return NextResponse.redirect(new URL("/", request.url));

    // Not logged in? and going to a protected Path? 
  } else if (!user && !isUnprotectedPath) {
    console.log("im herely")

    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};

async function getUser(request: NextRequest, response: NextResponse) {
  const supabaseClient = createServerClient(
    process.env.SUPABASE_URL!,
    process.env.SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value,
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          request.cookies.set({
            name,
            value: "",
            ...options,
          });
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          });
          response.cookies.set({
            name,
            value: "",
            ...options,
          });
        },
      },
    },
  );

  const user = (await supabaseClient.auth.getUser()).data.user;

  return user;
}