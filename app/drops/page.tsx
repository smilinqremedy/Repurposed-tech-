"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { DROPS } from "@/lib/drops";
import { PRODUCTS } from "@/lib/products";
import { ProductCard } from "@/components/products/ProductCard";

export default function DropsPage() {
  const [notifiedDrops, setNotifiedDrops] = useState<Record<string, boolean>>({});
  const [notifyModalDrop, setNotifyModalDrop] = useState<string | null>(null);
  const [notifyEmail, setNotifyEmail] = useState("");

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (notifyModalDrop && notifyEmail) {
      setNotifiedDrops((prev) => ({ ...prev, [notifyModalDrop]: true }));
      setNotifyModalDrop(null);
      setNotifyEmail("");
    }
  };

  const drop001 = DROPS.find((d) => d.id === "drop-001")!;
  const drop001Products = PRODUCTS.filter((p) => drop001.productIds.includes(p.id));
  const upcomingDrops = DROPS.filter((d) => d.status === "COMING SOON");
  const archivedDrops = DROPS.filter((d) => d.status === "ARCHIVED");

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      {/* NOTIFICATION MODAL */}
      {notifyModalDrop && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-md bg-[#111111] border border-white/15 p-6 rounded-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00FF88]">
                PRIORITY PASS: {notifyModalDrop}
              </span>
              <button
                onClick={() => setNotifyModalDrop(null)}
                className="text-neutral-400 hover:text-white text-xs font-mono"
              >
                ESC ✕
              </button>
            </div>
            <h3 className="text-lg font-bold uppercase text-white">
              GET EARLY ACCESS CIPHER KEY
            </h3>
            <p className="text-xs text-neutral-400 leading-relaxed font-mono">
              We send one-time checkout links 60 minutes before the public release. Enter your collector email to secure your priority queue.
            </p>
            <form onSubmit={handleNotifySubmit} className="space-y-3 pt-2">
              <input
                type="email"
                required
                placeholder="YOUR EMAIL ADDRESS..."
                value={notifyEmail}
                onChange={(e) => setNotifyEmail(e.target.value)}
                className="w-full bg-white/[0.04] border border-white/15 px-3.5 py-3 text-xs font-mono text-white rounded-sm focus:outline-none focus:border-[#00FF88]"
              />
              <button
                type="submit"
                className="w-full py-3 bg-[#00FF88] text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-white transition-colors rounded-sm"
              >
                CONFIRM PRIORITY REGISTRATION
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* DROPS HERO */}
        <section className="space-y-6 max-w-4xl border-b border-white/10 pb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              COLLECTIBLE RELEASES
            </span>
          </div>

          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-[#F5F5F0] leading-[0.92]">
            LIMITED PIECES.
            <br />
            NO REPEATS.
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl">
            We do not manufacture on demand. Every drop is a tightly curated batch of historic machines rebuilt to uncompromising standards. Once an edition is claimed, that specific combination of components is permanently retired to our archive.
          </p>
        </section>

        {/* ACTIVE DROP: DROP 001 — THE REBIRTH COLLECTION */}
        <section className="space-y-12">
          {/* Drop Banner / Header */}
          <div className="relative aspect-[21/9] sm:aspect-[24/9] w-full rounded-sm overflow-hidden border border-white/15 bg-[#111111]">
            <Image
              src={drop001.bannerImage}
              alt={drop001.name}
              fill
              priority
              sizes="100vw"
              className="object-cover opacity-70"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />

            <div className="absolute inset-0 p-6 sm:p-12 flex flex-col justify-between">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 bg-[#00FF88] text-black font-mono text-xs font-bold tracking-widest uppercase rounded-sm">
                  {drop001.status}
                </span>
                <span className="px-3 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-neutral-300 font-mono text-xs tracking-widest uppercase rounded-sm">
                  {drop001.pieceCount} MASTER PIECES
                </span>
              </div>

              <div className="space-y-2 max-w-xl">
                <span className="text-xs font-mono tracking-widest text-[#00FF88] uppercase">
                  {drop001.number} • {drop001.releaseDate}
                </span>
                <h2 className="text-2xl sm:text-4xl font-black uppercase text-[#F5F5F0]">
                  {drop001.name}
                </h2>
                <p className="text-xs sm:text-sm text-neutral-300 font-mono">
                  {drop001.tagline}
                </p>
              </div>
            </div>
          </div>

          {/* Curator Note */}
          <div className="p-6 bg-white/[0.02] border border-white/10 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500">
                CURATOR NOTE
              </span>
              <p className="text-xs text-neutral-300 leading-relaxed font-mono">
                "{drop001.curatorNote}"
              </p>
            </div>
            <span className="text-xs font-mono text-[#00FF88] uppercase tracking-wider flex-shrink-0">
              DISPATCH READY
            </span>
          </div>

          {/* Products in Drop 001 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {drop001Products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* UPCOMING DROPS */}
        <section className="space-y-12 border-t border-white/10 pt-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B]">
              FORWARD SCHEDULE
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F5F5F0]">
              UPCOMING RELEASES
            </h2>
            <p className="text-sm text-neutral-400 font-mono">
              In development at our Lagos workbench. Priority passes grant early access.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingDrops.map((drop) => (
              <div
                key={drop.id}
                className="bg-[#0C0C0C] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between group hover:border-white/25 transition-all"
              >
                <div className="relative aspect-[16/9] w-full bg-[#141414] overflow-hidden">
                  <Image
                    src={drop.bannerImage}
                    alt={drop.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 filter grayscale"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <div className="absolute top-4 left-4">
                    <span className="px-2.5 py-1 bg-[#F59E0B]/20 border border-[#F59E0B]/40 text-[#F59E0B] font-mono text-[10px] tracking-widest uppercase rounded-sm">
                      {drop.status}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block">
                      {drop.number} • {drop.releaseDate}
                    </span>
                    <h3 className="text-xl font-bold uppercase text-white tracking-tight">
                      {drop.name}
                    </h3>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-[#00FF88] uppercase tracking-wider">
                      {drop.tagline}
                    </p>
                    <p className="text-xs text-neutral-400 leading-relaxed">
                      {drop.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-500 uppercase">
                      {drop.pieceCount} PIECES COMMISSIONED
                    </span>

                    {notifiedDrops[drop.number] ? (
                      <span className="text-xs font-mono text-[#00FF88] uppercase tracking-wider">
                        ✓ PRIORITY REGISTERED
                      </span>
                    ) : (
                      <button
                        onClick={() => setNotifyModalDrop(drop.number)}
                        className="px-4 py-2 bg-white/[0.05] hover:bg-white text-white hover:text-black border border-white/10 font-mono text-xs uppercase tracking-widest transition-all rounded-sm"
                      >
                        NOTIFY ME →
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARCHIVE VAULT */}
        <section className="space-y-8 border-t border-white/10 pt-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-neutral-500">
              PERMANENT COLLECTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F5F5F0]">
              THE VAULT ARCHIVE
            </h2>
            <p className="text-sm text-neutral-400 font-mono">
              Sold out and experimental foundation prototypes retired permanently from reproduction.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PRODUCTS.slice(5).map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
