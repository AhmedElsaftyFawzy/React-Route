"use server"

import { CartData } from "@/types/cartData.type"
import { getUserToken } from "./getUserToken"

export async function addToCart(productId: string) {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "POST",
    body: JSON.stringify({ productId: productId }),
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()

  return data
}

export async function getLoggedCart(): Promise<CartData> {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart`, {
    method: "Get",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()

  return data
}

export async function updateCount(count: number, id: string) {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
    {
      method: "PUT",
      body: JSON.stringify({ count: count }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )

  const data = await res.json()

  return data
}

export async function deleteItem(id: string) {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/${id}`,
    {
      method: "DELETE",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )

  const data = await res.json()

  return data
}

export async function deleteCart() {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/cart/`, {
    method: "DELETE",
    headers: {
      token: token,
      "Content-Type": "application/json",
    },
  })

  const data = await res.json()

  return data
}
