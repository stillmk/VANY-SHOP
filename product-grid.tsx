"use client"
import { ProductCard } from "./product-card"
import { products } from "@/lib/products"
import { useSearchParams } from "next/navigation"

export function ProductGrid() {
  const searchParams = useSearchParams()
  const query = searchParams.get("q")?.toLowerCase() || ""
  const category = searchParams.get("category")?.toLowerCase() || ""

  // Get unique categories for filter
  const categories = Array.from(new Set(products.map((product) => product.category)))

  // Filter products based on search query and category
  const filteredProducts = products.filter((product) => {
    const matchesQuery = query
      ? product.name.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
      : true

    const matchesCategory = category ? product.category.toLowerCase() === category : true

    return matchesQuery && matchesCategory
  })

  return (
    <div>
      <div className="flex flex-wrap gap-2 mb-6">
        <button
          className={`px-4 py-2 rounded-full text-sm ${!category ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
          onClick={() => {
            const url = new URL(window.location.href)
            url.searchParams.delete("category")
            window.history.pushState({}, "", url)
          }}
        >
          All
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm ${category === cat.toLowerCase() ? "bg-purple-600 text-white" : "bg-gray-100 text-gray-800 hover:bg-gray-200"}`}
            onClick={() => {
              const url = new URL(window.location.href)
              url.searchParams.set("category", cat.toLowerCase())
              window.history.pushState({}, "", url)
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-xl font-medium mb-2">No products found</h3>
          <p className="text-gray-500">Try adjusting your search or filter criteria</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
