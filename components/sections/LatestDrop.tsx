import React from "react";
import Link from "next/link";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

export function LatestDrop() {
  // Drop 001 contains the first 5 products
  const dropProducts = PRODUCTS.slice(0, 5);

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* SECTION HEADER */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
                COLLECTION RELEASE
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F5F5F0]">
              DROP 001 — THE REBIRTH COLLECTION
            </h2>
            <p className="text-base text-neutral-400 font-mono tracking-wide">
              Five forgotten machines. Five second lives.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/drops"
              className="text-xs font-mono tracking-[0.2em] uppercase text-neutral-400 hover:text-[#00FF88] transition-colors flex items-center gap-1.5"
            >
              <span>VIEW DROP DOSSIER</span>
              <span>→</span>
            </Link>
          </div>
        </div>

        {/* EDITORIAL PRODUCTS GRID */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {dropProducts.map((product, idx) => (
            <div
              key={product.id}
              className={idx === 0 ? "sm:col-span-2 lg:col-span-2" : "col-span-1"}
            >
              <ProductCard product={product} priority={idx === 0} />
            </div>
          ))}
        </div>

        {/* BOTTOM CALLOUT */}
        <div className="mt-16 p-8 rounded-sm bg-[#080808] border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <h4 className="text-sm font-bold font-mono tracking-widest uppercase text-[#F5F5F0]">
              LIMITED COMMISSIONS • NO MASS PRODUCTION
            </h4>
            <p className="text-xs text-neutral-400 font-mono">
              Once an edition is marked SOLD OUT, that exact specification is retired permanently to our vault archive.
            </p>
          </div>
          <Link
            href="/shop"
            className="px-6 py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00FF88] transition-colors flex-shrink-0"
          >
            EXPLORE FULL CATALOG →
          </Link>
        </div>
      </div>
    </section>
  );
}
