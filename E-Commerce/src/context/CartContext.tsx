"use client"
import { getLoggedCart } from "@/services/cart.services"
import { getUserToken } from "@/services/getUserToken"
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react"

export const cartContext = createContext<{
  count: number
  setCount: Dispatch<SetStateAction<number>>
  getCart: () => void
} | null>(null)

export default function CartProvider({ children }: { children: ReactNode }) {
  const [count, setCount] = useState<number>(0)

  async function getCart() {
    const tokenData = await getUserToken()
    const token = tokenData?.accessToken as string
    if (token) {
      const data = await getLoggedCart()
      let sum: number = 0
      data?.data?.products.forEach((item) => {
        sum += item.count
      })
      setCount(sum)
    }
  }

  useEffect(() => {
    getCart()
  }, [])

  return (
    <cartContext.Provider value={{ count, setCount, getCart }}>
      {children}
    </cartContext.Provider>
  )
}
