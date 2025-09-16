import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getWishList } from "@/services/whish.services"
import { Datum, WishData } from "@/types/wishListData.type"
import Image from "next/image"
import RemoveWishButton from "@/_Components/RemoveWishButton/RemoveWishButton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Wish List",
}
export default async function Page() {
  const respondData: WishData = await getWishList()
  const products: Datum[] = respondData.data

  if (products.length === 0) {
    return (
      <h3 className="bg-red-500 text-white p-4 text-center my-5">
        The WishList Is Empty
      </h3>
    )
  }

  return (
    <div className="grid grid-cols-1 gap-6 p-10 min-h-screen">
      {products.map((product) => (
        <Card key={product._id} className="grid grid-cols-12 gap-10">
          <div className="col-span-3 md:col-span-4 lg:col-span-6">
            <Image
              width={100}
              height={100}
              className="w-full h-100 object-contain"
              src={product.imageCover}
              alt={product.title}
            />
          </div>

          <div className="col-span-7 md:col-span-8 lg:col-span-6 flex flex-col justify-between">
            <CardContent>
              <h2 className="text-2xl font-bold">{product?.title}</h2>
              <p className="my-5 text-main text-lg font-medium">
                {product?.category.name}
              </p>
              <p className="my-5 text-green-700 text-lg font-medium">
                {product?.subcategory.map((sub) => (
                  <span key={sub._id}>{sub.name} </span>
                ))}
              </p>

              <div className="flex justify-between items-center my-5">
                <span className="text-lg">{product?.price} EGP</span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <i className="fa-solid fa-star"></i>
                  {product?.ratingsAverage}
                </span>
              </div>

              <p>{product?.description}</p>
              <h3 className="text-main my-5">{product?.brand.name}</h3>
            </CardContent>

            <CardFooter>
              <RemoveWishButton id={product._id} />
            </CardFooter>
          </div>
        </Card>
      ))}
    </div>
  )
}
