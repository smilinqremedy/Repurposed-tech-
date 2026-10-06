"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { DROPS } from "@/lib/drops";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";
import { Badge } from "@/components/ui/Badge";

interface DropPageProps {
  params: Promise<{ slug: string }>;
}

export default function DropDetailPage({ params }: DropPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const drop = DROPS.find((d) => d.slug === slug || d.id === slug);

  const [passEmail, setPassEmail] = useState("");
  const [passClaimed, setPassClaimed] = useState(false);

  if (!drop) {
    notFound();
  }

  const dropProducts = PRODUCTS.filter((p) => drop.productIds.includes(p.id));

  const handleClaimPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (passEmail) {
      setPassClaimed(true);
      setPassEmail("");
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/drops" className="hover:text-white transition-colors">DROPS</Link>
          <span>/</span>
          <span className="text-[#00FF88] uppercase">{drop.number}</span>
        </nav>

        {/* HERO SECTION */}
        <div className="relative border border-white/10 rounded-sm overflow-hidden bg-gradient-to-b from-[#111111] to-[#0A0A0A]">
          {/* Banner Image */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full overflow-hidden">
            <Image
              src={drop.bannerImage}
              alt={drop.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-45"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
          </div>

          {/* Hero Content Overlay */}
          <div className="p-6 sm:p-10 lg:p-12 space-y-6 relative -mt-20 z-10">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-[#00FF88]/40 text-[#00FF88] text-xs font-mono uppercase tracking-widest">
                {drop.number}
              </span>
              <Badge variant={drop.status === "RELEASED" ? "available" : drop.status === "COMING SOON" ? "low-stock" : "sold-out"}>
                {drop.status}
              </Badge>
              <span className="text-xs font-mono text-neutral-400">
                SCHEDULE: {drop.releaseDate} • {drop.pieceCount} PIECES TOTAL
              </span>
            </div>

            <div className="space-y-2 max-w-3xl">
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F5F5F0]">
                {drop.name}
              </h1>
              <p className="text-lg sm:text-xl font-mono text-neutral-300">
                {drop.tagline}
              </p>
            </div>

            <p className="text-sm sm:text-base text-neutral-400 leading-relaxed max-w-3xl">
              {drop.description}
            </p>
          </div>
        </div>

        {/* CURATOR DOSSIER STATEMENT */}
        <section className="p-8 sm:p-10 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              CURATORIAL DOSSIER NOTE
            </span>
          </div>
          <blockquote className="text-base sm:text-lg italic text-neutral-200 leading-relaxed font-serif">
            "{drop.curatorNote}"
          </blockquote>
          <p className="text-[11px] font-mono text-neutral-500 uppercase tracking-widest pt-2 border-t border-white/5">
            REPURPOSED TECH STUDIO ARCHIVE REGISTRY • LAGOS BENCH
          </p>
        </section>

        {/* PIECES IN THIS DROP */}
        <section className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                CATALOG ALLOCATION
              </span>
              <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
                PIECES IN THIS DROP
              </h2>
            </div>
            <span className="text-xs font-mono text-neutral-400">
              {dropProducts.length} COMMISSIONED SPECIFICATIONS
            </span>
          </div>

          {dropProducts.length === 0 ? (
            <div className="py-20 text-center border border-dashed border-white/10 p-8 space-y-4">
              <p className="text-sm font-mono text-neutral-400">
                HARDWARE RESTORATION CURRENTLY UNDER BENCH QC
              </p>
              <p className="text-xs font-mono text-neutral-500 max-w-md mx-auto">
                Individual hardware specifications and forensic case reports will unlock 60 minutes before drop release.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {dropProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>

        {/* PRIORITY PASS / CIPHER KEY CALLOUT */}
        {drop.status === "COMING SOON" && (
          <section className="p-8 sm:p-12 bg-gradient-to-r from-[#111111] via-[#0C0C0C] to-[#111111] border border-cyan-500/30 rounded-sm space-y-6">
            <div className="space-y-2 max-w-2xl">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-cyan-400">
                RESTRICTED ACCESS PROTOCOL
              </span>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-white">
                REQUEST EARLY ACCESS CIPHER KEY
              </h3>
              <p className="text-xs font-mono text-neutral-400 leading-relaxed">
                Registered collectors receive priority access 60 minutes before public deployment. Strict limit of one hardware commission per verified collector address.
              </p>
            </div>

            {passClaimed ? (
              <div className="p-4 bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 font-mono text-xs rounded-sm inline-block">
                ✓ CIPHER QUEUE RESERVED. YOU WILL RECEIVE TELEMETRY DISPATCH PRIOR TO RELEASE.
              </div>
            ) : (
              <form onSubmit={handleClaimPass} className="flex flex-col sm:flex-row gap-3 max-w-md">
                <input
                  type="email"
                  required
                  placeholder="YOUR COLLECTOR EMAIL..."
                  value={passEmail}
                  onChange={(e) => setPassEmail(e.target.value)}
                  className="flex-1 bg-white/[0.04] border border-white/15 px-4 py-3 text-xs font-mono text-white rounded-sm focus:outline-none focus:border-cyan-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-cyan-400 text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-cyan-300 transition-colors rounded-sm flex-shrink-0"
                >
                  SECURE PASS
                </button>
              </form>
            )}
          </section>
        )}

        {/* BOTTOM NAVIGATION */}
        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <Link
            href="/drops"
            className="text-neutral-400 hover:text-white transition-colors flex items-center gap-2"
          >
            <span>←</span>
            <span>BACK TO ALL DROPS</span>
          </Link>
          <Link
            href="/shop"
            className="text-[#00FF88] hover:underline flex items-center gap-2"
          >
            <span>EXPLORE ENTIRE CATALOG</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
