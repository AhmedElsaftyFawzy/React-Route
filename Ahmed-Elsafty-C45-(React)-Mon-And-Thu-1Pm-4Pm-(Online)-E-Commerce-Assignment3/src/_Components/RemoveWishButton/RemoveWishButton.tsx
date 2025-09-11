"use client"

import { deleteWishItem } from "@/services/whish.services"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner"

export default function RemoveWishButton({ id }: { id: string }) {
  const router = useRouter()
  const [isWished, setIsWished] = useState(false)

  useEffect(() => {
    const stored = localStorage.getItem("wishlist")
    if (stored) {
      const wishlist: string[] = JSON.parse(stored)
      if (wishlist.includes(id)) {
        setIsWished(true)
      }
    }
  }, [id])

  async function removeWishHandler() {
    try {
      const res = await deleteWishItem(id)

      if (res.status === "success") {
        // Update localStorage
        const stored = localStorage.getItem("wishlist")
        let wishlist: string[] = stored ? JSON.parse(stored) : []

        wishlist = wishlist.filter((itemId) => itemId !== id)
        localStorage.setItem("wishlist", JSON.stringify(wishlist))

        setIsWished(false)

        toast(<div className="text-main">{res.message}</div>, {
          position: "top-center",
        })
        router.refresh()
      } else {
        toast(<div className="text-red-500">{res.message}</div>, {
          position: "top-center",
        })
      }
    } catch (error) {
      console.error("Error removing item:", error)
      toast(<div className="text-red-500">Something went wrong.</div>, {
        position: "top-center",
      })
    }
  }

  if (!isWished) return null // Optionally hide if not in wishlist

  return (
    <i
      className="fa-solid fa-heart-crack text-red-500 cursor-pointer ms-auto"
      onClick={removeWishHandler}
    ></i>
  )
}
