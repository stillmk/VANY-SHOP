"use client"

import { Button } from "@/components/ui/button"
import { useCart } from "@/context/cart-context"
import type { Product } from "@/lib/types"
import { ShoppingCart } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

interface AddToCartButtonProps {
  product: Product
  variant?: "default" | "outline"
}

export function AddToCartButton({ product, variant = "default" }: AddToCartButtonProps) {
  const { addToCart } = useCart()
  const { toast } = useToast()

  const handleAddToCart = () => {
    addToCart(product)
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
  }

  return (
    <Button onClick={handleAddToCart} className="w-full" variant={variant}>
      <ShoppingCart className="mr-2 h-4 w-4" /> Adicionar ao Carrinho
    </Button>
  )
}
