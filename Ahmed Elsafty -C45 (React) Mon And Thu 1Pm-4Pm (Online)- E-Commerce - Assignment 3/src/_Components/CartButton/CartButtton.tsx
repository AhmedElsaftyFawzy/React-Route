"use client"

import { Button } from "@/components/ui/button"
import { cartContext } from "@/context/CartContext"
import { addToCart } from "@/services/cart.services"
import { ProductElement } from "@/types/cartData.type"
import { useContext } from "react"
import { toast } from "sonner"

export default function CartButtton({ productId }: { productId: string }) {
  const cart = useContext(cartContext)

  async function addToCartHandler() {
    const data = await addToCart(productId)
    if (data.status == "success") {
      toast(<div className="text-main">{data.message}</div>, {
        position: "top-center",
      })
      let sum: number = 0
      data.data.products.forEach((item: ProductElement) => {
        sum += item.count
      })
      cart?.setCount(sum)
    } else {
      toast(<div className="text-red-500">{data.message}</div>, {
        position: "top-center",
      })
    }
  }
  return (
    <>
      <Button
        onClick={() => {
          addToCartHandler()
        }}
        className="bg-main w-full cursor-pointer"
      >
        Add To Cart
      </Button>
    </>
  )
}
