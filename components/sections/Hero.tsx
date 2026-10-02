"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-24 pb-16 overflow-hidden bg-[#080808]">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#00FF88]/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[450px] h-[450px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-grid-pattern opacity-40 pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* LEFT: EDITORIAL COPY & CALLS TO ACTION */}
          <div className="lg:col-span-7 space-y-8 text-left">
            {/* Tagline Pill */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
              <span className="text-[11px] font-mono tracking-[0.2em] uppercase text-neutral-300">
                DROP 001 AVAILABLE • LIMITED NUMBERED PIECES
              </span>
            </div>

            {/* Huge Headline */}
            <div className="space-y-1">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[-0.04em] uppercase text-[#F5F5F0] leading-[0.92]">
                OLD TECH.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5F5F0] via-neutral-300 to-neutral-500">
                  REIMAGINED.
                </span>
              </h1>
            </div>

            {/* Supporting Brand Paragraph */}
            <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-xl text-balance">
              Forgotten technology, restored by hand and rebuilt for another generation. We rescue obsolete machines from obscurity, equipping them with laminated IPS displays, solid-state storage, and audiophile internals.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-2">
              <Link
                href="/drops"
                className="px-8 py-4 bg-[#F5F5F0] text-black font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#00FF88] transition-all duration-300 rounded-sm text-center shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(0,255,136,0.3)] flex items-center justify-center gap-2"
              >
                <span>SHOP THE LATEST DROP</span>
                <span>→</span>
              </Link>

              <Link
                href="/restoration"
                className="px-7 py-4 bg-transparent text-[#F5F5F0] border border-white/15 hover:border-white/40 hover:bg-white/[0.04] font-mono text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 rounded-sm text-center"
              >
                EXPLORE THE PROCESS
              </Link>
            </div>

            {/* Quick Metrics */}
            <div className="pt-8 border-t border-white/10 grid grid-cols-3 gap-6 font-mono">
              <div>
                <span className="block text-xl font-bold text-[#F5F5F0]">100%</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                  HAND RESTORED
                </span>
              </div>
              <div>
                <span className="block text-xl font-bold text-[#00FF88]">01 / 03</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                  STRICT EDITIONS
                </span>
              </div>
              <div>
                <span className="block text-xl font-bold text-[#F5F5F0]">1 YR</span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500">
                  STUDIO WARRANTY
                </span>
              </div>
            </div>
          </div>

          {/* RIGHT: LUXURY PRODUCT SHOWCASE */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Glass container */}
              <div className="relative aspect-[4/5] rounded-sm overflow-hidden bg-gradient-to-b from-[#141414] to-[#0A0A0A] border border-white/15 shadow-[0_20px_60px_rgba(0,0,0,0.8)] group">
                {/* Hero Product Image */}
                <Image
                  src="https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1200&q=90"
                  alt="Game Boy Color Atomic Purple - Reimagined"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover object-center transition-transform duration-1000 group-hover:scale-105"
                />

                {/* Subtle vignette & scanline effect */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-80" />

                {/* Floating Specs Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-2.5 py-1 bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono tracking-widest uppercase text-[#00FF88]">
                    PIECE 01 • DROP 001
                  </span>
                </div>

                {/* Bottom Card Detail */}
                <div className="absolute inset-x-4 bottom-4 z-10 p-4 bg-[#0A0A0A]/90 backdrop-blur-md border border-white/10 rounded-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                        RETRO GAMING
                      </span>
                      <h3 className="text-sm font-medium text-white">
                        Game Boy Color — Atomic Purple
                      </h3>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-mono text-[#00FF88]">₦145,000</span>
                      <span className="block text-[9px] font-mono text-neutral-400">1 OF 3</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative side accent lines */}
              <div className="absolute -bottom-4 -left-4 w-12 h-12 border-l border-b border-[#00FF88]/40 pointer-events-none" />
              <div className="absolute -top-4 -right-4 w-12 h-12 border-r border-t border-white/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
