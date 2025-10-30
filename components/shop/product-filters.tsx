"use client";

import type React from "react";

import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { Search } from "lucide-react";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface ProductFiltersProps {
  categories: string[];
  currentCategory?: string;
}

export function ProductFilters({
  categories,
  currentCategory,
}: ProductFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || ""
  );

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (category === "all") {
      params.delete("category");
    } else {
      params.set("category", category);
    }
    router.push(`/shop?${params.toString()}`);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (searchQuery) {
      params.set("search", searchQuery);
    } else {
      params.delete("search");
    }
    router.push(`/shop?${params.toString()}`);
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
      <form onSubmit={handleSearch} className="relative flex-1 max-w-md w-full">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-9"
        />
      </form>

      <div className="flex items-center gap-2 w-full md:w-auto">
        <span className="text-sm font-medium whitespace-nowrap">Category:</span>
        <Select
          value={currentCategory || "all"}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger className="w-full md:w-[200px]">
            <SelectValue placeholder="All Products" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Products</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
