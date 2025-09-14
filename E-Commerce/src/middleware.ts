import { getToken } from "next-auth/jwt"
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request })
  const path = request.nextUrl.pathname

  const isAuthPage = path === "/login" || path === "/register"
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  if (!token && ["/cart", "/wishList", "/allorders"].includes(path)) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/cart", "/wishList", "/allorders", "/login", "/register"],
}
