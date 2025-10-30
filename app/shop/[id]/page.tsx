import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { ProductDetails } from "@/components/shop/product-details"

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    return {
      title: "Product Not Found",
    }
  }

  return {
    title: `${product.name} | AppliFix Pro`,
    description: product.description || `Buy ${product.name} at competitive prices with free delivery.`,
  }
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    notFound()
  }

  // Get related products
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", id)
    .limit(4)

  return <ProductDetails product={product} relatedProducts={relatedProducts || []} />
}
