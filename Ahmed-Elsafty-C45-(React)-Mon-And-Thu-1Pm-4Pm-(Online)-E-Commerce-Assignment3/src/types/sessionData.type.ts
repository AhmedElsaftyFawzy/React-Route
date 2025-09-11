export interface SessionData {
  sub: string
  accessToken: string
  user: User
  iat: string
  exp: string
  jti: string
}

export interface User {
  name: string
  email: string
  role: string
}
