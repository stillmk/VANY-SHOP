import Image from "next/image"
import type { Product } from "@/lib/types"
import Link from "next/link"
import { AddToCartButton } from "./add-to-cart-button"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <Link href={`/products/${product.id}`}>
        <div className="relative aspect-square">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-lg mb-1 hover:text-purple-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-500 text-sm mb-2">{product.category}</p>
        <p className="font-bold text-lg mb-3">{product.price.toLocaleString("pt-MZ")} MZN</p>
        <AddToCartButton product={product} />
      </div>
    </div>
  )
}
