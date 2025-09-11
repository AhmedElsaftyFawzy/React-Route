import React from "react"
import { Card } from "@/components/ui/card"
import { getAllCategories } from "@/services/category.services"
import { CategoryData } from "@/types/categoryData"
import Image from "next/image"
import Link from "next/link"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Category",
}
export default async function page() {
  const res: CategoryData = await getAllCategories()
  return (
    <div className="grid grid-cols-12 gap-5 my-5 px-5">
      {res.data.map((category) => {
        return (
          <Card
            key={category._id}
            className="relative lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12 rounded-4xl h-50 overflow-hidden"
          >
            <Image
              src={category.image}
              alt={category.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
              <Link href={`category/${category._id}`}>
                <h2 className="text-white text-lg font-semibold">
                  {category.name}
                </h2>
              </Link>
            </div>
          </Card>
        )
      })}
    </div>
  )
}
