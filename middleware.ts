import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs"
import { NextResponse, type NextRequest } from "next/server"

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { session },
  } = await supabase.auth.getSession()

  // Protect the dashboard route and enforce email verification
  if (req.nextUrl.pathname.startsWith("/dashboard")) {
    if (!session) {
      // Redirect unauthenticated users to the sign-in page
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/auth/signin"
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname)
      return NextResponse.redirect(redirectUrl)
    } else if (!session.user.email_confirmed_at) {
      // Redirect authenticated but unverified users to the verify email page
      const redirectUrl = req.nextUrl.clone()
      redirectUrl.pathname = "/auth/verify-email"
      return NextResponse.redirect(redirectUrl)
    }
  }

  // Redirect authenticated users from auth pages to dashboard (if email is confirmed)
  if (req.nextUrl.pathname.startsWith("/auth")) {
    if (session && session.user.email_confirmed_at) {
      return NextResponse.redirect(new URL("/dashboard", req.url))
    }
  }

  return res
}

export const config = {
  matcher: ["/dashboard/:path*", "/auth/:path*"],
}
