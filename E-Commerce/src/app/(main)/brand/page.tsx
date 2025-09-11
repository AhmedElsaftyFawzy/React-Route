import React from "react"
import { Card } from "@/components/ui/card"
import Image from "next/image"
import { BrandData } from "@/types/brandData.type"
import { getAllBrands } from "@/services/brand.services"
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import { Metadata } from "next"

type PageProps = {
  searchParams: {
    page?: string
  }
}

export const metadata: Metadata = {
  title: "Brands",
}

export default async function Page({ searchParams }: PageProps) {
  const pageNum = parseInt(searchParams?.page ?? "1", 10)
  const res: BrandData = await getAllBrands(pageNum)
  const totalPages = res.metadata.numberOfPages

  // Pagination window size
  const maxButtons = 5
  const half = Math.floor(maxButtons / 2)

  // Calculate start and end pages for pagination buttons
  let startPage = Math.max(1, pageNum - half)
  const endPage = Math.min(totalPages, startPage + maxButtons - 1)

  // Adjust startPage if we are near the end
  if (endPage - startPage + 1 < maxButtons) {
    startPage = Math.max(1, endPage - maxButtons + 1)
  }

  // Generate page numbers to display
  const pageNumbers = []
  for (let i = startPage; i <= endPage; i++) {
    pageNumbers.push(i)
  }

  return (
    <>
      <div className="grid grid-cols-12 gap-5 my-5 px-5">
        {res.data.map((brand) => (
          <Card
            key={brand._id}
            className="relative lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12 rounded-4xl h-48 overflow-hidden"
          >
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              priority={pageNum === 1} // prioritize images on first page
            />
            <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
              <h2 className="text-white text-lg font-semibold">{brand.name}</h2>
            </div>
          </Card>
        ))}
      </div>

      <Pagination>
        <PaginationContent>
          {/* Previous Button */}
          <PaginationItem>
            <PaginationPrevious href={`?page=${Math.max(pageNum - 1, 1)}`} />
          </PaginationItem>

          {/* First page link */}
          {startPage > 1 && (
            <>
              <PaginationItem>
                <PaginationLink
                  href={`?page=1`}
                  aria-current={pageNum === 1 ? "page" : undefined}
                >
                  1
                </PaginationLink>
              </PaginationItem>
              {startPage > 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
            </>
          )}

          {/* Page number links */}
          {pageNumbers.map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href={`?page=${page}`}
                aria-current={pageNum === page ? "page" : undefined}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          {/* Last page link */}
          {endPage < totalPages && (
            <>
              {endPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              <PaginationItem>
                <PaginationLink
                  href={`?page=${totalPages}`}
                  aria-current={pageNum === totalPages ? "page" : undefined}
                >
                  {totalPages}
                </PaginationLink>
              </PaginationItem>
            </>
          )}

          {/* Next Button */}
          <PaginationItem>
            <PaginationNext
              href={`?page=${Math.min(pageNum + 1, totalPages)}`}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </>
  )
}
