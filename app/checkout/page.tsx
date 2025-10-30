import type { Metadata } from "next"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { CheckoutForm } from "@/components/checkout/checkout-form"

export const metadata: Metadata = {
  title: "Checkout | AppliFix Pro",
  description: "Complete your purchase",
}

export default async function CheckoutPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: cartItems } = await supabase.from("cart_items").select("*, products(*)").eq("user_id", user.id)

  if (!cartItems || cartItems.length === 0) {
    redirect("/cart")
  }

  const { data: profile } = await supabase.from("profiles").select("*").eq("id", user.id).single()

  return <CheckoutForm cartItems={cartItems} profile={profile} />
}
