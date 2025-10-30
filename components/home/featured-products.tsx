import { createClient } from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export async function FeaturedProducts() {
  const supabase = await createClient();
  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("featured", true)
    .limit(4);

  if (!products || products.length === 0) {
    return null;
  }

  return (
    <section className="py-20 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">
              Featured Appliances
            </h2>
            <p className="text-lg text-muted-foreground">
              Top-quality appliances at competitive prices
            </p>
          </div>
          <Link href="/shop">
            <Button variant="outline">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-square relative bg-muted overflow-hidden">
                <img
                  src={
                    product.image_url ||
                    "/placeholder.svg?height=400&width=400&query=appliance"
                  }
                  alt={product.name}
                  className="block object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
              <CardContent className="pt-4">
                <p className="text-sm text-muted-foreground mb-1">
                  {product.brand}
                </p>
                <h3 className="font-semibold mb-2 line-clamp-2">
                  {product.name}
                </h3>
                <p className="text-2xl font-bold text-primary">
                  ${product.price.toFixed(2)}
                </p>
              </CardContent>
              <CardFooter>
                <Link href={`/shop/${product.id}`} className="w-full">
                  <Button className="w-full">View Details</Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
