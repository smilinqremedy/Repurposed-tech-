import React from "react";
import { Product } from "@/types/product";
import { ProductCard } from "./ProductCard";

interface ProductGridProps {
  products: Product[];
  emptyMessage?: string;
}

export function ProductGrid({
  products,
  emptyMessage = "No restored machines found matching your criteria.",
}: ProductGridProps) {
  if (products.length === 0) {
    return (
      <div className="py-20 text-center border border-dashed border-white/10 rounded-sm p-8 bg-white/[0.01]">
        <p className="text-sm font-mono text-neutral-400">{emptyMessage}</p>
        <p className="text-xs text-neutral-500 mt-2 font-mono">
          Try resetting filters or adjusting your price limits.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
      {products.map((product, idx) => (
        <ProductCard
          key={product.id}
          product={product}
          priority={idx < 3}
        />
      ))}
    </div>
  );
}
