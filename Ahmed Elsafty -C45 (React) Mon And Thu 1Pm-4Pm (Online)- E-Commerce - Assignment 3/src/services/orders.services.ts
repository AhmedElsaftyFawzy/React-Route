"use server"

import { UserOrderData } from "@/types/userOrderData.type"
import { getUserToken } from "./getUserToken"
import { jwtDecode } from "jwt-decode"
import { TokenData } from "@/types/tokenData.type"

export async function checkout(
  values: { details: string; phone: string; city: string },
  cartId: string,
  method: "Card" | "Cash"
) {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string
  if (method === "Card") {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/checkout-session/${cartId}?url=${process.env.NEXT_PUBLIC_URL}`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    )

    const data = await res.json()

    return data
  } else {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/${cartId}`,
      {
        method: "POST",
        body: JSON.stringify(values),
        headers: {
          token: token,
          "Content-Type": "application/json",
        },
      }
    )

    const data = await res.json()

    return data
  }
}

export async function getUserOrder() {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string
  const decodedToken = jwtDecode<TokenData>(token)
  const userId = decodedToken.id

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/orders/user/${userId}`
  )

  const data: UserOrderData[] = await res.json()
  return data
}
