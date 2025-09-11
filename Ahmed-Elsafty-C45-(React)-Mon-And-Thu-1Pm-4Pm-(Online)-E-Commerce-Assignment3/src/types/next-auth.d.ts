import NextAuth from "next-auth"
import { JWT as DefaultJWT } from "next-auth/jwt"

declare module "next-auth" {
  interface User {
    id: string
    name: string
    email: string
    role: string
    tokenData: string
  }

  interface Session {
    user: {
      id: string
      name: string
      email: string
      role: string
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    user: {
      id: string
      name: string
      email: string
      role: string
    }
    accessToken?: string
  }
}
