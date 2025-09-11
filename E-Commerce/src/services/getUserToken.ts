"use server"
import { decode } from "next-auth/jwt"
import { cookies } from "next/headers"

export async function getUserToken() {
  const tokenSession =
    process.env.NODE_ENV == "production"
      ? "_Secure-next-auth.session-token"
      : "next-auth.session-token"
  const cookie = (await cookies()).get(tokenSession)?.value
  const data = await decode({
    token: cookie,
    secret: process.env.AUTH_SECRET!,
  })
  return data
}
