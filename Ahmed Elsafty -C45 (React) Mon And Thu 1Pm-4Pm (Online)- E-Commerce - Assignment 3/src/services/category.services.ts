"use server"
export async function getAllCategories() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories`
  )

  const data = await res.json()
  return data
}

export async function getAllSubCategories(id: string) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/v1/categories/${id}/subcategories`
  )

  const data = await res.json()
  return data
}
