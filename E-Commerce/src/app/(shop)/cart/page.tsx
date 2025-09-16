"use client"
import PageLoading from "@/_Components/PageLoading/PageLoading"
import { Button } from "@/components/ui/button"
import { cartContext } from "@/context/CartContext"
import {
  deleteCart,
  deleteItem,
  getLoggedCart,
  updateCount,
} from "@/services/cart.services"
import { CartData, ProductElement } from "@/types/cartData.type"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export default function Page() {
  const router = useRouter()
  const cartCount = useContext(cartContext)
  const [cart, setCart] = useState<null | CartData>()
  const [disable, setDisable] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [pageloading, setPageLoading] = useState<boolean>(true)
  const [loadingId, setLoadingId] = useState<string>("")

  useEffect(() => {
    document.title = "Cart"
    getCartProducts()
  }, [])

  async function getCartProducts() {
    const response = await getLoggedCart()
    setPageLoading(false)
    setCart(response)
  }

  async function countHandle(count: number, id: string) {
    setLoadingId(id)
    setLoading(true)
    setDisable(true)
    const response = await updateCount(count, id)
    setLoading(false)
    setDisable(false)
    if (response.status == "success") {
      toast(<h2 className="text-main">The Cart Updated</h2>, {
        position: "top-center",
      })
      let sum: number = 0
      response.data.products.forEach((item: ProductElement) => {
        sum += item.count
      })
      cartCount?.setCount(sum)
    } else {
      toast(<h2 className="text-red-500">{response.message}</h2>, {
        position: "top-center",
      })
    }
    setCart(response)
  }

  async function deleteItemHandle(id: string) {
    const response = await deleteItem(id)
    if (response.status == "success") {
      toast(<h2 className="text-main">The Item Is Removed </h2>, {
        position: "top-center",
      })
      let sum: number = 0
      response.data.products.forEach((item: ProductElement) => {
        sum += item.count
      })
      cartCount?.setCount(sum)
    } else {
      toast(<h2 className="text-red-500">{response.message}</h2>, {
        position: "top-center",
      })
    }
    setCart(response)
  }

  async function clearCartHandle() {
    const response = await deleteCart()
    toast(<h2 className="text-main">The Cart Is Cleared </h2>, {
      position: "top-center",
    })
    cartCount?.setCount(0)
    setCart(response)
  }

  return (
    <div className="min-h-screen">
      {pageloading ? (
        <PageLoading />
      ) : cart?.data?.products?.length ? (
        <>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 mx-auto w-10/12">
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs bg-main text-white">
                <tr>
                  <th scope="col" className="px-16 py-3">
                    <span className="sr-only">Image</span>
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Product
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Qty
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {cart?.data.products.map((item) => {
                  return (
                    <tr
                      key={item.product._id}
                      className="bg-white border-b text-main"
                    >
                      <td className="p-4">
                        <Image
                          src={item.product.imageCover}
                          width={100}
                          height={100}
                          className="w-16 md:w-32 max-w-full max-h-full"
                          alt={item.product.title}
                        />
                      </td>
                      <td className="px-6 py-4 font-semibold ">
                        {item.product.title}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center">
                          <Button
                            onClick={() => {
                              countHandle((item.count -= 1), item.product._id)
                            }}
                            disabled={disable}
                            className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
                            type="button"
                          >
                            {item.count == 1 ? (
                              <i className="fa-solid fa-trash text-red-500"></i>
                            ) : (
                              <>
                                <span className="sr-only">Quantity button</span>
                                <svg
                                  className="w-3 h-3"
                                  aria-hidden="true"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 18 2"
                                >
                                  <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M1 1h16"
                                  />
                                </svg>
                              </>
                            )}
                          </Button>
                          <div>
                            {loading && item.product._id == loadingId ? (
                              <i className="fa-solid fa-spinner fa-spin text-main"></i>
                            ) : (
                              <input
                                type="number"
                                readOnly
                                id="first_product"
                                className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                placeholder={`${item.count}`}
                                required
                              />
                            )}
                          </div>
                          <Button
                            disabled={disable}
                            onClick={() => {
                              countHandle((item.count += 1), item.product._id)
                            }}
                            className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700 cursor-pointer"
                            type="button"
                          >
                            <span className="sr-only">Quantity button</span>
                            <svg
                              className="w-3 h-3"
                              aria-hidden="true"
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 18 18"
                            >
                              <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 1v16M1 9h16"
                              />
                            </svg>
                          </Button>
                        </div>
                      </td>
                      <td className="px-6 py-4 font-semibold ">{item.price}</td>
                      <td className="px-6 py-4">
                        <Button
                          onClick={() => {
                            deleteItemHandle(item.product._id)
                          }}
                          className="bg-red-500"
                        >
                          Remove
                        </Button>
                      </td>
                    </tr>
                  )
                })}
                <tr>
                  <td colSpan={4}>
                    <h3 className="p-10 text-main font-extrabold">
                      Total Cost
                    </h3>
                  </td>
                  <td>
                    <p className="text-main p-10 font-extrabold">
                      {cart.data.totalCartPrice}
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="flex justify-end gap-2 w-10/12 mx-auto my-5 ">
            <Button
              className="bg-main cursor-pointer"
              onClick={() => {
                router.push(`/checkout/${cart.cartId}`)
              }}
            >
              Checkout
            </Button>
            <Button
              onClick={() => {
                clearCartHandle()
              }}
              className="bg-orange-700 cursor-pointer"
            >
              Clear Cart
            </Button>
          </div>
        </>
      ) : (
        <div className="bg-red-900 my-10 shadow-lg w-10/12 mx-auto p-5">
          <h3 className="text-center text-white">The Cart Is Empty</h3>
        </div>
      )}
    </div>
  )
}
