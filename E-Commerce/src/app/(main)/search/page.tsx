"use client"

import { Input } from "@/components/ui/input"
import { useEffect, useState } from "react"
import { getAllProduct } from "@/services/products.services"
import { Product, ProductData } from "@/types/products.type"
import ProductCard from "@/_Components/ProductCard/ProductCard"

let debounceTimeout: ReturnType<typeof setTimeout>

export default function SearchInput() {
  const [query, setQuery] = useState("")
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const fetchAndFilterProducts = async (searchTerm: string) => {
    try {
      setLoading(true)
      setError("")
      const res: Product = await getAllProduct()
      const data: ProductData[] = res.data
      const searched = data?.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      )
      setFilteredProducts(searched)
    } catch (err) {
      console.error(err)
      setError("Something went wrong while searching.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (query.trim()) {
      clearTimeout(debounceTimeout)
      debounceTimeout = setTimeout(() => {
        fetchAndFilterProducts(query)
      }, 300) // Adjust debounce delay as needed
    } else {
      setFilteredProducts([])
    }

    return () => clearTimeout(debounceTimeout)
  }, [query])

  return (
    <div className="h-screen">
      <Input
        className="my-5 w-10/12 mx-auto"
        id="search"
        name="search"
        placeholder="Search ....."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      {loading && (
        <h3 className="text-center text-main text-6xl my-10">Loading...</h3>
      )}
      {error && <h3 className="text-red-500 text-center">{error}</h3>}
      {!loading && filteredProducts.length === 0 && query && (
        <h3 className="text-4xl text-center my-10">No products found.</h3>
      )}
      <div className="my-5 w-10/12 mx-auto grid grid-cols-12 gap-5">
        {filteredProducts.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  )
}
