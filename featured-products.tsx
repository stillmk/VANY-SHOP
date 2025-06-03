import { products } from "@/lib/products"
import { ProductCard } from "./product-card"

export function FeaturedProducts() {
  // Get 4 featured products
  const featuredProducts = products.slice(0, 4)

  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">Featured Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {featuredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}
