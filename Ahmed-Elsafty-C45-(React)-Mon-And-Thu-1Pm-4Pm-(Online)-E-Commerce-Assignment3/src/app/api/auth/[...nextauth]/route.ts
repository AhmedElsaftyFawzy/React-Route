import NextAuth, { type NextAuthOptions } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { jwtDecode } from "jwt-decode"

export const nextAuthOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      name: "credential login",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/auth/signin`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        )

        const data = await res.json()

        if (res.ok) {
          const decodedToken: { id: string } = jwtDecode(data.token)
          return {
            id: decodedToken.id,
            name: data.user.name,
            email: data.user.email,
            role: data.user.role,
            tokenData: data.token,
          }
        } else {
          throw new Error(data.message)
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.tokenData
        token.user = {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        }
      }
      return token
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user
      }
      return session
    },
  },
}

const handler = NextAuth(nextAuthOptions)

export { handler as GET, handler as POST }
