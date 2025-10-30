"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CartItem } from "@/lib/types"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface CartContentProps {
  cartItems: (CartItem & { products: any })[]
}

export function CartContent({ cartItems: initialCartItems }: CartContentProps) {
  const [cartItems, setCartItems] = useState(initialCartItems)
  const [isUpdating, setIsUpdating] = useState<string | null>(null)
  const router = useRouter()

  const updateQuantity = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return

    setIsUpdating(itemId)
    const supabase = createClient()

    try {
      await supabase.from("cart_items").update({ quantity: newQuantity }).eq("id", itemId)

      setCartItems((items) => items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
    } catch (error) {
      console.error("Error updating quantity:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  const removeItem = async (itemId: string) => {
    setIsUpdating(itemId)
    const supabase = createClient()

    try {
      await supabase.from("cart_items").delete().eq("id", itemId)

      setCartItems((items) => items.filter((item) => item.id !== itemId))
    } catch (error) {
      console.error("Error removing item:", error)
    } finally {
      setIsUpdating(null)
    }
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 0 : 0 // Free shipping
  const total = subtotal + shipping

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="h-24 w-24 text-muted-foreground mx-auto mb-6" />
            <h1 className="text-3xl font-bold mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Start shopping to add items to your cart</p>
            <Link href="/shop">
              <Button size="lg">Browse Products</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Shopping Cart</h1>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.products.image_url || "/placeholder.svg?height=96&width=96"}
                        alt={item.products.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-semibold">{item.products.name}</h3>
                          <p className="text-sm text-muted-foreground">{item.products.brand}</p>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.id)}
                          disabled={isUpdating === item.id}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1 || isUpdating === item.id}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          <span className="w-8 text-center font-semibold">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-transparent"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            disabled={item.quantity >= item.products.stock_quantity || isUpdating === item.id}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        <p className="text-lg font-bold">${(item.products.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold text-primary">Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>
                </div>
                <Link href="/checkout" className="block mt-6">
                  <Button size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>
                <Link href="/shop" className="block mt-3">
                  <Button variant="outline" size="lg" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
