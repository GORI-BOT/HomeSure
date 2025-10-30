"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { Product } from "@/lib/types"
import { ShoppingCart, Check, Truck, Shield, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface ProductDetailsProps {
  product: Product
  relatedProducts: Product[]
}

export function ProductDetails({ product, relatedProducts }: ProductDetailsProps) {
  const [quantity, setQuantity] = useState(1)
  const [isAdding, setIsAdding] = useState(false)
  const [isAdded, setIsAdded] = useState(false)
  const router = useRouter()

  const handleAddToCart = async () => {
    setIsAdding(true)

    try {
      const supabase = createClient()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.push("/auth/login")
        return
      }

      // Check if item already in cart
      const { data: existingItem } = await supabase
        .from("cart_items")
        .select("*")
        .eq("user_id", user.id)
        .eq("product_id", product.id)
        .single()

      if (existingItem) {
        // Update quantity
        await supabase
          .from("cart_items")
          .update({ quantity: existingItem.quantity + quantity })
          .eq("id", existingItem.id)
      } else {
        // Insert new item
        await supabase.from("cart_items").insert({
          user_id: user.id,
          product_id: product.id,
          quantity,
        })
      }

      setIsAdded(true)
      setTimeout(() => setIsAdded(false), 2000)
    } catch (error) {
      console.error("Error adding to cart:", error)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link
          href="/shop"
          className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Shop
        </Link>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Product Image */}
          <div className="relative aspect-square bg-muted rounded-lg overflow-hidden">
            <img
              src={product.image_url || "/placeholder.svg?height=600&width=600"}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
              <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-4">
                <p className="text-4xl font-bold text-primary">${product.price.toFixed(2)}</p>
                {product.stock_quantity > 0 && product.stock_quantity < 5 && (
                  <Badge variant="secondary">Only {product.stock_quantity} left</Badge>
                )}
                {product.stock_quantity === 0 && <Badge variant="destructive">Out of Stock</Badge>}
              </div>
              <p className="text-muted-foreground leading-relaxed">{product.description}</p>
            </div>

            <Separator />

            {/* Quantity Selector */}
            {product.stock_quantity > 0 && (
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <label className="font-semibold">Quantity:</label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      disabled={quantity <= 1}
                    >
                      -
                    </Button>
                    <span className="w-12 text-center font-semibold">{quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setQuantity(Math.min(product.stock_quantity, quantity + 1))}
                      disabled={quantity >= product.stock_quantity}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full"
                  onClick={handleAddToCart}
                  disabled={isAdding || isAdded || product.stock_quantity === 0}
                >
                  {isAdded ? (
                    <>
                      <Check className="mr-2 h-5 w-5" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-5 w-5" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>
            )}

            <Separator />

            {/* Features */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="h-5 w-5 text-primary" />
                <span className="text-sm">Free delivery on all orders</span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="h-5 w-5 text-primary" />
                <span className="text-sm">Manufacturer warranty included</span>
              </div>
              <div className="flex items-center gap-3">
                <Check className="h-5 w-5 text-primary" />
                <span className="text-sm">Professional installation available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div>
            <h2 className="text-2xl font-bold mb-6">Related Products</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Card key={relatedProduct.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="aspect-square relative bg-muted">
                    <img
                      src={relatedProduct.image_url || "/placeholder.svg?height=400&width=400"}
                      alt={relatedProduct.name}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <CardContent className="pt-4">
                    <p className="text-sm text-muted-foreground mb-1">{relatedProduct.brand}</p>
                    <h3 className="font-semibold mb-2 line-clamp-2">{relatedProduct.name}</h3>
                    <p className="text-xl font-bold text-primary">${relatedProduct.price.toFixed(2)}</p>
                    <Link href={`/shop/${relatedProduct.id}`} className="block mt-4">
                      <Button variant="outline" className="w-full bg-transparent">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
