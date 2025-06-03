import { Button } from "@/components/ui/button"
import { getProductById } from "@/lib/products"
import Image from "next/image"
import { notFound } from "next/navigation"
import { AddToCartButton } from "@/components/add-to-cart-button"

export default function ProductPage({ params }: { params: { id: string } }) {
  const product = getProductById(params.id)

  if (!product) {
    notFound()
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-square overflow-hidden rounded-lg">
          <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" priority />
        </div>
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-2xl font-semibold mb-4">{product.price.toLocaleString("pt-MZ")} MZN</p>
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Description</h2>
            <p className="text-gray-600">{product.description}</p>
          </div>
          <div className="mb-6">
            <h2 className="text-lg font-medium mb-2">Category</h2>
            <div className="inline-block bg-gray-100 px-3 py-1 rounded-full text-sm">{product.category}</div>
          </div>
          <AddToCartButton product={product} />
          <Button variant="outline" className="w-full mt-4">
            Comprar agora
          </Button>
        </div>
      </div>
    </div>
  )
}
