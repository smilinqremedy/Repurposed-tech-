"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/types/product";
import { formatNaira } from "@/lib/currency";
import { Badge } from "@/components/ui/Badge";

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export function ProductCard({ product, priority = false }: ProductCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const secondaryImage = product.images[1] || product.images[0];

  return (
    <Link
      href={`/product/${product.slug}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group block relative bg-[#0D0D0D] border border-white/10 rounded-sm overflow-hidden transition-all duration-300 hover:border-white/30 focus:outline-none focus:ring-1 focus:ring-white/40"
    >
      {/* BADGES BAR */}
      <div className="absolute top-3.5 left-3.5 right-3.5 z-20 flex items-center justify-between pointer-events-none">
        <Badge variant={product.status}>
          {product.status === "available"
            ? "AVAILABLE"
            : product.status === "low-stock"
            ? "LOW STOCK"
            : "SOLD OUT"}
        </Badge>
        <span className="px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase bg-black/70 backdrop-blur-md border border-white/10 text-neutral-300">
          {product.edition}
        </span>
      </div>

      {/* LARGE PHOTOGRAPHY WRAPPER */}
      <div className="relative aspect-[4/3] sm:aspect-square w-full overflow-hidden bg-[#141414]">
        {/* Primary Image */}
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          priority={priority}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
            isHovered && secondaryImage ? "opacity-0" : "opacity-100"
          }`}
        />

        {/* Secondary Cross-fade Image on Hover */}
        {secondaryImage && (
          <Image
            src={secondaryImage}
            alt={`${product.name} alternate view`}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className={`object-cover transition-all duration-700 ease-out group-hover:scale-105 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
          />
        )}

        {/* Subtle Gradient Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 opacity-60 group-hover:opacity-40 transition-opacity" />

        {/* FLOATING "VIEW PIECE" ACTION ON HOVER */}
        <div className="absolute inset-x-4 bottom-4 z-20 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 hidden sm:block">
          <div className="w-full py-2.5 bg-white text-black text-center text-xs font-mono font-bold tracking-[0.2em] uppercase rounded-sm shadow-xl">
            VIEW PIECE →
          </div>
        </div>
      </div>

      {/* PRODUCT INFORMATION */}
      <div className="p-5 border-t border-white/5 space-y-3 bg-[#0A0A0A]">
        <div className="flex items-center justify-between text-[11px] font-mono tracking-widest text-neutral-400">
          <span className="uppercase text-neutral-400">{product.category}</span>
          <span>{product.originalReleaseYear}</span>
        </div>

        <div>
          <h3 className="text-base font-medium text-[#F5F5F0] group-hover:text-white transition-colors tracking-tight line-clamp-1">
            {product.name}
          </h3>
          <p className="text-xs text-neutral-400 mt-1 line-clamp-2 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        <div className="pt-2 border-t border-white/5 flex items-center justify-between">
          <span className="text-base font-mono font-medium text-[#F5F5F0]">
            {formatNaira(product.price)}
          </span>
          <span className="sm:hidden text-xs font-mono uppercase tracking-widest text-[#00FF88]">
            VIEW PIECE →
          </span>
        </div>
      </div>
    </Link>
  );
}
