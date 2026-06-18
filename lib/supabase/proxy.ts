import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

import { isAdminEmail } from "@/lib/admin/allowlist"

export async function updateAdminSession(request: NextRequest) {
  let response = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet, headers) {
          cookiesToSet.forEach(({ name, value }) => {
            request.cookies.set(name, value)
          })

          response = NextResponse.next({ request })

          cookiesToSet.forEach(({ name, value, options }) => {
            response.cookies.set(name, value, options)
          })

          Object.entries(headers).forEach(([key, value]) => {
            response.headers.set(key, value)
          })
        },
      },
    }
  )

  const { pathname } = request.nextUrl
  const isLoginPath = pathname === "/admin/login"
  const { data } = await supabase.auth.getClaims()
  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : null
  const isAdmin = isAdminEmail(email)

  if (!data?.claims && !isLoginPath) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("next", pathname)
    return NextResponse.redirect(url)
  }

  if (data?.claims && !isAdmin && !isLoginPath) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin/login"
    url.searchParams.set("error", "not_allowed")
    return NextResponse.redirect(url)
  }

  if (isAdmin && isLoginPath) {
    const url = request.nextUrl.clone()
    url.pathname = "/admin"
    url.search = ""
    return NextResponse.redirect(url)
  }

  return response
}
