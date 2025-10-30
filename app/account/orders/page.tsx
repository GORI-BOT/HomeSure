import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default async function OrdersPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/auth/login")
  }

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*, products(*))")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "default"
      case "shipped":
        return "secondary"
      case "processing":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Link
            href="/account"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Account
          </Link>

          <h1 className="text-3xl font-bold mb-8">Order History</h1>

          {orders && orders.length > 0 ? (
            <div className="space-y-6">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardContent className="pt-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-lg">Order #{order.id.slice(0, 8)}</p>
                        <p className="text-sm text-muted-foreground">
                          Placed on {new Date(order.created_at).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant={getStatusColor(order.status)} className="capitalize">
                        {order.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      {order.order_items?.map((item: any) => (
                        <div key={item.id} className="flex gap-4">
                          <div className="w-16 h-16 bg-muted rounded overflow-hidden flex-shrink-0">
                            <img
                              src={item.products.image_url || "/placeholder.svg?height=64&width=64"}
                              alt={item.products.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold">{item.products.name}</p>
                            <p className="text-sm text-muted-foreground">Quantity: {item.quantity}</p>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>

                    <div className="border-t pt-4 flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Shipping Address</p>
                        <p className="text-sm">{order.shipping_address}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-muted-foreground">Total</p>
                        <p className="text-xl font-bold">${order.total_amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="pt-6 text-center py-12">
                <p className="text-muted-foreground mb-4">You haven't placed any orders yet</p>
                <Link href="/shop">
                  <Button>Start Shopping</Button>
                </Link>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
