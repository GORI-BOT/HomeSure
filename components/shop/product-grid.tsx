"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { Product } from "@/lib/types";
import Link from "next/link";

interface ProductGridProps {
  products: Product[];
}

export function ProductGrid({ products }: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-muted-foreground">
          No products found. Try adjusting your filters.
        </p>
      </div>
    );
  }

  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <Card
          key={product.id}
          className="overflow-hidden hover:shadow-lg transition-shadow flex flex-col"
        >
          <div className="aspect-square relative bg-muted overflow-hidden">
            <img
              src={
                product.image_url ||
                "/placeholder.svg?height=400&width=400&query=appliance"
              }
              alt={product.name}
              className="block object-cover w-full h-full hover:scale-105 transition-transform duration-300"
              onError={(e) => {
                console.log("[v0] Image failed to load:", product.image_url);
                e.currentTarget.src = "/modern-kitchen-appliances.png";
              }}
            />
            {product.stock_quantity === 0 && (
              <Badge className="absolute top-2 right-2" variant="destructive">
                Out of Stock
              </Badge>
            )}
            {product.stock_quantity > 0 && product.stock_quantity < 5 && (
              <Badge className="absolute top-2 right-2" variant="secondary">
                Only {product.stock_quantity} left
              </Badge>
            )}
          </div>
          <CardContent className="pt-4 flex-1">
            <p className="text-sm text-muted-foreground mb-1">
              {product.brand}
            </p>
            <h3 className="font-semibold mb-2 line-clamp-2">{product.name}</h3>
            <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
              {product.description}
            </p>
            <p className="text-2xl font-bold text-primary">
              ${product.price.toFixed(2)}
            </p>
          </CardContent>
          <CardFooter className="pt-0">
            <Link href={`/shop/${product.id}`} className="w-full">
              <Button
                className="w-full"
                disabled={product.stock_quantity === 0}
              >
                {product.stock_quantity === 0 ? "Out of Stock" : "View Details"}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
