import { getAllProduct } from "@/services/products.services"
import { Product, ProductData } from "@/types/products.type"
import ProductCard from "@/_Components/ProductCard/ProductCard"
import HeroSection from "@/_Components/HeroSection/HeroSection"
import { Suspense } from "react"
import Loading from "@/_Components/Loading/Loading"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "FreshCart",
}
export default async function Home() {
  const respondData: Product = await getAllProduct()
  const productList: ProductData[] = respondData.data

  return (
    <>
      <HeroSection></HeroSection>
      <div className="m-5 mt-10 grid grid-cols-12 gap-5">
        <Suspense
          fallback={Array.from({ length: 6 }).map((e, i) => {
            return <Loading key={i}></Loading>
          })}
        >
          {productList.map((product) => {
            return (
              <ProductCard key={product._id} product={product}></ProductCard>
            )
          })}
        </Suspense>
      </div>
    </>
  )
}
