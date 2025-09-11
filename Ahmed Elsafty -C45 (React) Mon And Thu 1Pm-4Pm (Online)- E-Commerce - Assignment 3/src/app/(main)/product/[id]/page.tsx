import CartButtton from "@/_Components/CartButton/CartButtton"
import DetailSlider from "@/_Components/DetailSlider/DetailSlider"
import Loading from "@/_Components/Loading/Loading"
import WishButton from "@/_Components/WhishButton/WhishButton"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { getProductDetail } from "@/services/products.services"
import { Data, ProductDetails } from "@/types/productDetails.type"
import { Suspense } from "react"

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = await params
  const respondData: ProductDetails = await getProductDetail(id)
  const product: Data = respondData.data

  return (
    <Suspense fallback={<Loading></Loading>}>
      <div>
        <Card className="grid grid-cols-12 gap-10 m-10">
          <div className="col-span-6">
            <DetailSlider images={product?.images} />
          </div>

          <div className="col-span-6 flex flex-col justify-between">
            <CardContent>
              <h2 className="text-2xl font-bold">{product?.title}</h2>

              <p className="my-5 text-main text-lg font-medium">
                {product?.category.name}
              </p>

              <div className="flex justify-between items-center my-5">
                <span className="text-lg">{product?.price} EGP</span>
                <span className="flex items-center gap-1 text-yellow-500">
                  <i className="fa-solid fa-star"></i>
                  {product?.ratingsAverage}
                </span>
              </div>
              <WishButton id={product._id}></WishButton>
            </CardContent>
            <CardFooter>
              <CartButtton productId={product._id}></CartButtton>
            </CardFooter>
          </div>
        </Card>
      </div>
    </Suspense>
  )
}
