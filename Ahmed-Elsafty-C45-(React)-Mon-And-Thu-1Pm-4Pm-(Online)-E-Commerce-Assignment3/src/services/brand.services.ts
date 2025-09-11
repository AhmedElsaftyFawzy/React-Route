"use server"

export async function getAllBrands(page: number = 1) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/brands?page=${page}`
  )

  const data = await res.json()
  return data
}
