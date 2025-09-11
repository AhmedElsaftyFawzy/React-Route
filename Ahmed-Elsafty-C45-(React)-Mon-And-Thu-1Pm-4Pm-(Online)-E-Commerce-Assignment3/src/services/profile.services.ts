"use server"

import { getUserToken } from "./getUserToken"

export async function updateData(values: {
  name: string
  email: string
  phone: string
}) {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_Base_URL}/api/v1/users/updateMe/`,
    {
      method: "PUT",
      headers: { "content-type": "application/json", token: token },
      body: JSON.stringify(values),
    }
  )
  const data = await res.json()

  return data
}

export async function updatePassword(values: {
  currentPassword: string
  password: string
  rePassword: string
}) {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_Base_URL}/api/v1/users/changeMyPassword`,
    {
      method: "PUT",
      headers: { "content-type": "application/json", token: token },
      body: JSON.stringify(values),
    }
  )
  const data = await res.json()

  return data
}
