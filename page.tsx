"use client"

import type React from "react"

import { useCart } from "@/context/cart-context"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import Link from "next/link"
import { Trash2 } from "lucide-react"

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart()
  const [name, setName] = useState("")
  const [eMolaNumber, setEMolaNumber] = useState("")
  const { toast } = useToast()

  const totalPrice = cart.reduce((total, item) => total + item.product.price * item.quantity, 0)

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name || !eMolaNumber) {
      toast({
        title: "Error",
        description: "Please fill in all payment details",
        variant: "destructive",
      })
      return
    }

    if (eMolaNumber.length !== 9 || !eMolaNumber.startsWith("84")) {
      toast({
        title: "Invalid eMola Number",
        description: "Please enter a valid eMola number (starting with 84, 9 digits)",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Order Placed!",
      description: "Your order has been successfully placed. Thank you for shopping with Van'lest!",
    })

    clearCart()
    setName("")
    setEMolaNumber("")
  }

  if (cart.length === 0) {
    return (
      <div className="container mx-auto max-w-6xl px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Your Cart is Empty</h1>
        <p className="mb-8">Looks like you haven't added any products to your cart yet.</p>
        <Link href="/products">
          <Button>Continue Shopping</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {cart.map((item) => (
              <div key={item.product.id} className="flex items-center py-4 border-b">
                <div className="relative w-20 h-20 rounded-md overflow-hidden flex-shrink-0">
                  <Image
                    src={item.product.image || "/placeholder.svg"}
                    alt={item.product.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="ml-4 flex-grow">
                  <h3 className="font-medium">{item.product.name}</h3>
                  <p className="text-gray-600">{item.product.price.toLocaleString("pt-MZ")} MZN</p>
                </div>
                <div className="flex items-center">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, Math.max(1, item.quantity - 1))}
                  >
                    -
                  </Button>
                  <span className="mx-2 w-8 text-center">{item.quantity}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                  >
                    +
                  </Button>
                </div>
                <div className="ml-4 text-right">
                  <p className="font-medium">{(item.product.price * item.quantity).toLocaleString("pt-MZ")} MZN</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-red-500 h-8 w-8"
                    onClick={() => removeFromCart(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Order Summary</h2>
            <div className="flex justify-between mb-2">
              <span>Subtotal</span>
              <span>{totalPrice.toLocaleString("pt-MZ")} MZN</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div className="border-t pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>{totalPrice.toLocaleString("pt-MZ")} MZN</span>
              </div>
              <p className="text-gray-500 text-sm mt-1">Including VAT</p>
            </div>

            <form onSubmit={handleCheckout} className="mt-6">
              <h3 className="font-bold mb-4">Payment with eMola</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="emola">eMola Number</Label>
                  <Input
                    id="emola"
                    value={eMolaNumber}
                    onChange={(e) => setEMolaNumber(e.target.value)}
                    placeholder="84XXXXXXX"
                    required
                    pattern="84[0-9]{7}"
                    title="eMola number must start with 84 and be 9 digits long"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Complete Payment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
