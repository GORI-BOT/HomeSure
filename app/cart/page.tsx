import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CartContent } from "@/components/cart/cart-content"

export const metadata: Metadata = {
  title: "Shopping Cart | AppliFix Pro",
  description: "Review your cart and proceed to checkout",
}

export default async function CartPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: cartItems } = await supabase
    .from("cart_items")
    .select("*, products(*)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  return <CartContent cartItems={cartItems || []} />
}
