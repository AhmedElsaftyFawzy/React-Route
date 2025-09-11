export async function getAllProduct(page: number = 1) {
  const respond = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products?page=${page}`
  )
  const respondData = await respond.json()
  return respondData
}

export async function getProductDetail(id: string) {
  const respond = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/products/${id}`
  )
  const respondData = await respond.json()
  return respondData
}
