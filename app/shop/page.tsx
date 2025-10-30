import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { ProductGrid } from "@/components/shop/product-grid";
import { ProductFilters } from "@/components/shop/product-filters";

export const metadata: Metadata = {
  title: "Shop Appliances | Top Brands at Competitive Prices",
  description:
    "Browse our selection of quality appliances from top brands. Refrigerators, washers, dryers, ovens, dishwashers & more. Free delivery available.",
  keywords:
    "buy appliances, refrigerator for sale, washing machine, dryer, oven, dishwasher, appliance store",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; search?: string }>;
}) {
  const params = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  if (params.category && params.category !== "all") {
    query = query.eq("category", params.category);
  }

  if (params.search) {
    query = query.or(
      `name.ilike.%${params.search}%,description.ilike.%${params.search}%,brand.ilike.%${params.search}%`
    );
  }

  const { data: products } = await query;

  // Get unique categories
  const { data: allProducts } = await supabase
    .from("products")
    .select("category");
  const categories = Array.from(
    new Set(allProducts?.map((p) => p.category) || [])
  );

  return (
    <div className="min-h-screen">
      {/* Hero Section with Image Slider Background - 90vh */}
      <section className="relative h-[90vh] overflow-hidden">
        {/* Animated Background Slider */}
        <div className="absolute inset-0 z-0">
          <div className="animate-slide-slow absolute inset-0 flex">
            <div className="min-w-full h-full relative">
              <img
                src="/modern-kitchen-with-stainless-steel-appliances-ref.jpg"
                alt="Modern Kitchen Appliances"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-full h-full relative">
              <img
                src="/luxury-home-appliances-showroom-with-washing-machi.jpg"
                alt="Appliance Showroom"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="min-w-full h-full relative">
              <img
                src="/contemporary-kitchen-with-built-in-appliances-and-.jpg"
                alt="Contemporary Kitchen"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-20 h-full flex items-center">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-5xl lg:text-7xl font-bold mb-6 drop-shadow-2xl text-balance">
                Shop Quality Appliances
              </h1>
              <p className="text-xl lg:text-2xl mb-8 drop-shadow-xl text-pretty">
                Top brands at competitive prices with free delivery on all
                orders
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="glass-strong rounded-lg px-6 py-3 shadow-lg">
                  <p className="text-sm font-semibold">Free Delivery</p>
                </div>
                <div className="glass-strong rounded-lg px-6 py-3 shadow-lg">
                  <p className="text-sm font-semibold">90-Day Warranty</p>
                </div>
                <div className="glass-strong rounded-lg px-6 py-3 shadow-lg">
                  <p className="text-sm font-semibold">Top Brands</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2">
            <div className="w-1 h-3 bg-white/50 rounded-full animate-pulse" />
          </div>
        </div>
      </section>

      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <ProductFilters
            categories={categories}
            currentCategory={params.category}
          />
        </div>
      </section>

      {/* Products Section - Full Width */}
      <section className="py-8 bg-background">
        <div className="container mx-auto px-4">
          <ProductGrid products={products || []} />
        </div>
      </section>
    </div>
  );
}
