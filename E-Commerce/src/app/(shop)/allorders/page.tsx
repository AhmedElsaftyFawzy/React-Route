import { getUserOrder } from "@/services/orders.services"
import { Metadata } from "next"
import Image from "next/image"

export const metadata: Metadata = {
  title: "Orders",
}
export default async function Page() {
  const res = await getUserOrder()

  return (
    <div className="min-h-screen">
      {res?.length > 0 ? (
        res.map((data) => {
          return (
            <div
              key={data._id}
              className="relative overflow-x-auto shadow-md sm:rounded-lg my-5 mx-auto w-10/12"
            >
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
                      Brand
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {data.cartItems.map((item) => (
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
                      <td className="px-6 py-4 font-semibold">
                        {item.product.title}
                      </td>
                      <td className="px-6 py-4 font-semibold">{item.count}</td>
                      <td className="px-6 py-4 font-semibold">${item.price}</td>
                      <td className="px-6 py-4 font-semibold">
                        {item.product.brand.name}
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>
                      <p className="p-10 text-main font-extrabold capitalize">
                        {`Paid : ${data.isPaid}`}
                      </p>
                    </td>
                    <td>
                      <p className="p-10 text-main font-extrabold capitalize">
                        {`Delivered : ${data.isDelivered}`}
                      </p>
                    </td>
                    <td>
                      <p className="p-10 text-main font-extrabold">{`Shipping Price : ${data.shippingPrice}`}</p>
                    </td>
                    <td>
                      <p className="text-main p-10 font-extrabold">
                        {`Total Price : ${data.totalOrderPrice}$`}
                      </p>
                    </td>
                    <td>
                      <p className="text-main p-10 font-extrabold capitalize">
                        {`Method : ${data.paymentMethodType}`}
                      </p>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )
        })
      ) : (
        <div className="bg-red-900 my-10 shadow-lg w-10/12 mx-auto p-5">
          <h3 className="text-center text-white">The Order Is Empty</h3>
        </div>
      )}
    </div>
  )
}
