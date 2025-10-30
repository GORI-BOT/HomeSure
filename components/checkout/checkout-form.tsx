"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import type { CartItem, Profile } from "@/lib/types"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { CheckCircle } from "lucide-react"

interface CheckoutFormProps {
  cartItems: (CartItem & { products: any })[]
  profile: Profile | null
}

export function CheckoutForm({ cartItems, profile }: CheckoutFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)
  const router = useRouter()

  const subtotal = cartItems.reduce((sum, item) => sum + item.products.price * item.quantity, 0)
  const shipping = 0 // Free shipping
  const total = subtotal + shipping

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const shippingData = {
      shipping_name: formData.get("name") as string,
      shipping_phone: formData.get("phone") as string,
      shipping_address: `${formData.get("address")}, ${formData.get("city")}, ${formData.get("state")} ${formData.get("zip")}`,
    }

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) throw new Error("Not authenticated")

      // Create order
      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          user_id: user.id,
          total_amount: total,
          ...shippingData,
        })
        .select()
        .single()

      if (orderError) throw orderError

      // Create order items
      const orderItems = cartItems.map((item) => ({
        order_id: order.id,
        product_id: item.product_id,
        quantity: item.quantity,
        price: item.products.price,
      }))

      const { error: itemsError } = await supabase.from("order_items").insert(orderItems)

      if (itemsError) throw itemsError

      // Clear cart
      await supabase.from("cart_items").delete().eq("user_id", user.id)

      setOrderId(order.id)
      setIsSuccess(true)
    } catch (error) {
      console.error("Error creating order:", error)
      alert("Failed to create order. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Card className="border-2 border-primary">
              <CardContent className="pt-6 text-center">
                <CheckCircle className="h-24 w-24 text-primary mx-auto mb-6" />
                <h1 className="text-3xl font-bold mb-4">Order Placed Successfully!</h1>
                <p className="text-lg text-muted-foreground mb-2">Thank you for your purchase.</p>
                <p className="text-sm text-muted-foreground mb-8">Order ID: {orderId}</p>
                <p className="text-muted-foreground mb-8">
                  We'll send you an email confirmation shortly. Your order will be delivered within 3-5 business days.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button onClick={() => router.push("/account/orders")} size="lg">
                    View Orders
                  </Button>
                  <Button onClick={() => router.push("/shop")} variant="outline" size="lg" className="bg-transparent">
                    Continue Shopping
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        <form onSubmit={handleSubmit}>
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Shipping Information */}
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      name="name"
                      required
                      defaultValue={profile?.full_name || ""}
                      placeholder="John Doe"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      defaultValue={profile?.phone || ""}
                      placeholder="(123) 456-7890"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      name="address"
                      required
                      defaultValue={profile?.address || ""}
                      placeholder="123 Main St"
                    />
                  </div>

                  <div className="grid sm:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input id="city" name="city" required placeholder="City" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State *</Label>
                      <Input id="state" name="state" required placeholder="State" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code *</Label>
                      <Input id="zip" name="zip" required placeholder="12345" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Payment will be collected upon delivery (Cash on Delivery)</p>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="sticky top-20">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex justify-between text-sm">
                        <span className="text-muted-foreground">
                          {item.products.name} x {item.quantity}
                        </span>
                        <span className="font-semibold">${(item.products.price * item.quantity).toFixed(2)}</span>
                      </div>
                    ))}
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span className="font-semibold">${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span className="font-semibold text-primary">Free</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="flex justify-between text-lg">
                    <span className="font-bold">Total</span>
                    <span className="font-bold">${total.toFixed(2)}</span>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Place Order"}
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
