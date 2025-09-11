import { getAllProduct } from "@/services/products.services"
import { Product, ProductData } from "@/types/products.type"
import ProductCard from "@/_Components/ProductCard/ProductCard"
import { Suspense } from "react"
import Loading from "@/_Components/Loading/Loading"
import type { Metadata } from "next"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

type PageProps = {
  searchParams: {
    page?: string
  }
}
export const metadata: Metadata = {
  title: "Products",
}
export default async function page({ searchParams }: PageProps) {
  const params = await searchParams
  const pageNum = parseInt(params?.page ?? "1", 10)
  const respondData: Product = await getAllProduct(pageNum)
  const productList: ProductData[] = respondData.data

  return (
    <>
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
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href={`?page=${Math.max(pageNum - 1, 1)}`} />
          </PaginationItem>
          {Array.from({ length: respondData.metadata.numberOfPages }).map(
            (el, index) => {
              return (
                <PaginationItem key={index}>
                  <PaginationLink href={`?page=${index + 1}`}>
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              )
            }
          )}

          <PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>
          <PaginationItem>
            <PaginationNext
              href={`?page=${Math.min(
                pageNum + 1,
                respondData.metadata.numberOfPages
              )}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
