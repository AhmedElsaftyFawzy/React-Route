import React from "react"
import { ProductData } from "@/types/products.type"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import Link from "next/link"
import CartButtton from "../CartButton/CartButtton"
import WhishButton from "../WhishButton/WhishButton"

export default function ProductCard({ product }: { product: ProductData }) {
  return (
    <div className="lg:col-span-2 md:col-span-4 sm:col-span-6 col-span-12">
      <Card>
        <CardHeader>
          <Image
            src={product.imageCover}
            alt={product.title}
            width={100}
            height={100}
            className="w-full"
          ></Image>
          <WhishButton id={product._id}></WhishButton>
        </CardHeader>
        <CardContent>
          <Link href={`/product/${product._id}`}>
            <CardTitle>
              {product.title.split(" ").slice(0, 2).join(" ")}
            </CardTitle>
          </Link>
          <CardTitle className="my-5 text-main">
            {product.category.name}
          </CardTitle>
          <div className="flex justify-between items-center my-5">
            <span>{product.price} EGP</span>
            <span>
              <i className="fa-solid fa-star rating-color "></i>
              {product.ratingsAverage}
            </span>
          </div>
        </CardContent>
        <CardFooter>
          <CartButtton productId={product._id}></CartButtton>
        </CardFooter>
      </Card>
    </div>
  )
}
