import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Package, Wrench, User } from "lucide-react";

export default async function AccountPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/auth/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const { data: repairRequests } = await supabase
    .from("repair_requests")
    .select("*")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">My Account</h1>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/account/profile">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <User className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold">Profile</h3>
                  <p className="text-sm text-muted-foreground">
                    Manage your account
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/account/orders">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <Package className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold">Orders</h3>
                  <p className="text-sm text-muted-foreground">
                    View order history
                  </p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/account/repairs">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <Wrench className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="font-semibold">Repairs</h3>
                  <p className="text-sm text-muted-foreground">
                    Track repair requests
                  </p>
                </CardContent>
              </Card>
            </Link>
          </div>

          <div className="space-y-6">
            {/* Recent Orders */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Orders</CardTitle>
                  <Link href="/account/orders">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {orders && orders.length > 0 ? (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="flex justify-between items-center border-b pb-4 last:border-0"
                      >
                        <div>
                          <p className="font-semibold">
                            Order #{order.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">
                            ${order.total_amount.toFixed(2)}
                          </p>
                          <p className="text-sm text-muted-foreground capitalize">
                            {order.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No orders yet
                  </p>
                )}
              </CardContent>
            </Card>

            {/* Recent Repair Requests */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Repair Requests</CardTitle>
                  <Link href="/account/repairs">
                    <Button variant="ghost" size="sm">
                      View All
                    </Button>
                  </Link>
                </div>
              </CardHeader>
              <CardContent>
                {repairRequests && repairRequests.length > 0 ? (
                  <div className="space-y-4">
                    {repairRequests.map((request) => (
                      <div
                        key={request.id}
                        className="flex justify-between items-center border-b pb-4 last:border-0"
                      >
                        <div>
                          <p className="font-semibold">
                            {request.appliance_type}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(request.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold capitalize">
                            {request.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground text-center py-4">
                    No repair requests yet
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
