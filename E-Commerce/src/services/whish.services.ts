"use server"

import { WishData } from "@/types/wishListData.type"
import { getUserToken } from "./getUserToken"

export async function addToWishList(id: string) {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "POST",
      body: JSON.stringify({ productId: id }),
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )

  const data = await res.json()

  return data
}

export async function getWishList(): Promise<WishData> {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist`,
    {
      method: "Get",
      headers: {
        token: token,
        "Content-Type": "application/json",
      },
    }
  )

  const data = await res.json()

  return data
}
export async function deleteWishItem(id: string) {
  const tokenData = await getUserToken()
  const token = tokenData?.accessToken as string

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/wishlist/${id}`,
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
