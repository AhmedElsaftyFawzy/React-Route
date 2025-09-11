"use client"

import { addToWishList } from "@/services/whish.services"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function WishButton({ id }: { id: string }) {
  const [isWished, setIsWished] = useState(false)

  useEffect(() => {
    // Check if this id exists in localStorage (wishlist)
    const stored = localStorage.getItem("wishlist")
    if (stored) {
      const wishlist: string[] = JSON.parse(stored)
      if (wishlist.includes(id)) {
        setIsWished(true)
      }
    }
  }, [id])

  async function addToWishListHandler() {
    try {
      const data = await addToWishList(id)

      if (data.status === "success") {
        // Save to localStorage
        const stored = localStorage.getItem("wishlist")
        const wishlist: string[] = stored ? JSON.parse(stored) : []

        if (!wishlist.includes(id)) {
          wishlist.push(id)
          localStorage.setItem("wishlist", JSON.stringify(wishlist))
        }

        setIsWished(true)

        toast(<div className="text-main">Item added to wishlist!</div>, {
          position: "top-center",
        })
      } else {
        toast(<div className="text-red-500">{data.message}</div>, {
          position: "top-center",
        })
      }
    } catch (err) {
      console.error(err)
      toast(<div className="text-red-500">Something went wrong.</div>, {
        position: "top-center",
      })
    }
  }

  return (
    <i
      className={`fa-solid fa-heart ${
        isWished ? "text-red-500" : "text-amber-500"
      } cursor-pointer ms-auto`}
      onClick={addToWishListHandler}
    ></i>
  )
}
