import { Card } from "@/components/ui/card"
import { getAllSubCategories } from "@/services/category.services"
import { CategoryData } from "@/types/categoryData"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "SubCategory",
}

export default async function page({ params }: { params: { id: string } }) {
  const id = await params.id
  const res: CategoryData = await getAllSubCategories(id)
  return (
    <>
      {res.data.length > 0 ? (
        <div className="grid grid-cols-12 gap-5 my-5 px-5">
          {res?.data.map((category) => {
            return (
              <Card
                key={category._id}
                className="relative lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12 rounded-4xl h-50 overflow-hidden"
              >
                <div className="absolute inset-0 bg-black/50 flex justify-center items-center">
                  <h2 className="text-white text-lg font-semibold">
                    {category.name}
                  </h2>
                </div>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="my-5 bg-red-500">
          <h3>There Is No SubCategory</h3>
        </div>
      )}
    </>
  )
}
