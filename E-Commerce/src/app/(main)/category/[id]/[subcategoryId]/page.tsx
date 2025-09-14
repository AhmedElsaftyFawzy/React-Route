import Loading from "@/_Components/Loading/Loading"
import ProductCard from "@/_Components/ProductCard/ProductCard"
import { getAllProduct } from "@/services/products.services"
import { Product, ProductData } from "@/types/products.type"
import { Metadata } from "next"
import React, { Suspense } from "react"

export const metadata: Metadata = {
  title: "SubCategory",
}
export default async function page({
  params,
}: {
  params: { subcategoryId: string }
}) {
  const param = await params
  const id = param.subcategoryId
  const respondData: Product = await getAllProduct()
  const productList: ProductData[] = respondData.data
  const selectedProduct = productList.filter((item) =>
    item.subcategory.some((sub) => sub._id == id)
  )

  return (
    <>
      {selectedProduct.length > 0 ? (
        <div className="m-5 mt-10 grid grid-cols-12 gap-5">
          <Suspense
            fallback={Array.from({ length: 6 }).map((e, i) => {
              return <Loading key={i}></Loading>
            })}
          >
            {selectedProduct.map((product) => {
              return (
                <ProductCard key={product._id} product={product}></ProductCard>
              )
            })}
          </Suspense>
        </div>
      ) : (
        <div className="my-5 bg-red-500">
          <h3 className="p-5 text-center text-white font-extrabold">
            There Is No Products
          </h3>
        </div>
      )}
    </>
  )
}
