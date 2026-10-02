"use client";

import React, { useState, useMemo } from "react";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { ProductGrid } from "@/components/products/ProductGrid";
import { formatNaira } from "@/lib/currency";

const CATEGORIES = [
  "All",
  "Retro Gaming",
  "Music",
  "Cameras",
  "Keyboards",
  "Tech Art",
  "Custom Builds",
];

const ERAS = ["All", "80s", "90s", "00s", "Vintage"];

const AVAILABILITY = [
  { label: "All Statuses", value: "All" },
  { label: "Available Only", value: "available" },
  { label: "Low Stock", value: "low-stock" },
  { label: "Archived / Sold Out", value: "sold-out" },
];

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedEra, setSelectedEra] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "newest" | "price-asc" | "price-desc">("featured");
  const [maxPrice, setMaxPrice] = useState<number>(500000);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...PRODUCTS];

    if (selectedCategory !== "All") {
      list = list.filter((p) => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (selectedEra !== "All") {
      list = list.filter((p) => p.era === selectedEra);
    }

    if (selectedStatus !== "All") {
      list = list.filter((p) => p.status === selectedStatus);
    }

    if (maxPrice) {
      list = list.filter((p) => p.price <= maxPrice);
    }

    if (searchQuery.trim() !== "") {
      const q = searchQuery.toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.description.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.edition.toLowerCase().includes(q)
      );
    }

    switch (sortBy) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        list.sort((a, b) => (b.originalReleaseYear || 0) - (a.originalReleaseYear || 0));
        break;
      case "featured":
      default:
        list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }

    return list;
  }, [selectedCategory, selectedEra, selectedStatus, maxPrice, searchQuery, sortBy]);

  const hasActiveFilters =
    selectedCategory !== "All" ||
    selectedEra !== "All" ||
    selectedStatus !== "All" ||
    searchQuery.trim() !== "" ||
    maxPrice < 500000;

  const resetFilters = () => {
    setSelectedCategory("All");
    setSelectedEra("All");
    setSelectedStatus("All");
    setSearchQuery("");
    setMaxPrice(500000);
    setSortBy("featured");
  };

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* SHOP HEADER */}
        <div className="space-y-4 border-b border-white/10 pb-10">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              STUDIO CATALOG
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-[#F5F5F0]">
              ALL RESTORATIONS
            </h1>
            <p className="text-xs font-mono tracking-widest text-neutral-400 uppercase">
              SHOWING {filteredProducts.length} OF {PRODUCTS.length} COMMISSIONED PIECES
            </p>
          </div>
        </div>

        {/* SEARCH & MOBILE FILTER BAR */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 bg-[#0F0F0F] p-4 border border-white/10 rounded-sm">
          {/* Search Input */}
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="SEARCH CATALOG BY NAME, SPECS, OR ERA..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/[0.03] border border-white/10 pl-10 pr-4 py-2.5 text-xs font-mono text-[#F5F5F0] placeholder-neutral-500 rounded-sm focus:outline-none focus:border-[#00FF88] transition-colors"
            />
            <svg
              className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] font-mono text-neutral-400 hover:text-white"
              >
                CLEAR
              </button>
            )}
          </div>

          <div className="flex items-center gap-3">
            {/* Sort Selector */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 hidden sm:inline">
                SORT:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-white/[0.04] border border-white/10 px-3 py-2 text-xs font-mono text-[#F5F5F0] rounded-sm focus:outline-none"
              >
                <option value="featured" className="bg-[#111] text-white">Featured</option>
                <option value="newest" className="bg-[#111] text-white">Era / Heritage (Newest)</option>
                <option value="price-asc" className="bg-[#111] text-white">Price: Low → High</option>
                <option value="price-desc" className="bg-[#111] text-white">Price: High → Low</option>
              </select>
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="lg:hidden px-3 py-2 bg-white/[0.04] border border-white/10 text-xs font-mono text-[#F5F5F0] rounded-sm flex items-center gap-2"
            >
              <span>FILTERS</span>
              {hasActiveFilters && <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />}
            </button>
          </div>
        </div>

        {/* MAIN SHOP LAYOUT: SIDEBAR + GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* DESKTOP FILTER SIDEBAR */}
          <aside className={`lg:block ${isMobileFiltersOpen ? "block" : "hidden"} space-y-8 p-6 bg-[#0B0B0B] border border-white/10 rounded-sm`}>
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <span className="text-xs font-mono font-bold tracking-[0.2em] uppercase text-[#F5F5F0]">
                FILTERS
              </span>
              {hasActiveFilters && (
                <button
                  onClick={resetFilters}
                  className="text-[10px] font-mono uppercase tracking-widest text-[#00FF88] hover:underline"
                >
                  RESET ALL
                </button>
              )}
            </div>

            {/* CATEGORIES */}
            <div className="space-y-3">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                CATEGORY
              </span>
              <div className="space-y-1">
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`w-full text-left px-3 py-2 text-xs font-mono rounded-sm transition-all flex items-center justify-between ${
                      selectedCategory === cat
                        ? "bg-white text-black font-semibold"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{cat}</span>
                    {selectedCategory === cat && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* AVAILABILITY */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                AVAILABILITY
              </span>
              <div className="space-y-1">
                {AVAILABILITY.map((status) => (
                  <button
                    key={status.value}
                    onClick={() => setSelectedStatus(status.value)}
                    className={`w-full text-left px-3 py-2 text-xs font-mono rounded-sm transition-all flex items-center justify-between ${
                      selectedStatus === status.value
                        ? "bg-white text-black font-semibold"
                        : "text-neutral-400 hover:text-white hover:bg-white/[0.04]"
                    }`}
                  >
                    <span>{status.label}</span>
                    {selectedStatus === status.value && <span>✓</span>}
                  </button>
                ))}
              </div>
            </div>

            {/* ERA / DECADE */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 block">
                ERA ORIGIN
              </span>
              <div className="flex flex-wrap gap-2">
                {ERAS.map((era) => (
                  <button
                    key={era}
                    onClick={() => setSelectedEra(era)}
                    className={`px-3 py-1.5 text-xs font-mono rounded-sm border transition-all ${
                      selectedEra === era
                        ? "bg-[#00FF88] text-black border-[#00FF88] font-bold"
                        : "bg-white/[0.03] text-neutral-400 border-white/10 hover:text-white"
                    }`}
                  >
                    {era}
                  </button>
                ))}
              </div>
            </div>

            {/* PRICE LIMIT SLIDER */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <div className="flex justify-between text-xs font-mono">
                <span className="text-[11px] font-mono uppercase tracking-widest text-neutral-400">
                  MAX PRICE
                </span>
                <span className="text-[#00FF88] font-medium">{formatNaira(maxPrice)}</span>
              </div>
              <input
                type="range"
                min={100000}
                max={500000}
                step={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#00FF88] bg-neutral-800"
              />
              <div className="flex justify-between text-[10px] font-mono text-neutral-500">
                <span>₦100,000</span>
                <span>₦500,000</span>
              </div>
            </div>
          </aside>

          {/* PRODUCT CARDS GRID */}
          <main className="lg:col-span-3">
            <ProductGrid products={filteredProducts} />
          </main>
        </div>
      </div>
    </div>
  );
}
