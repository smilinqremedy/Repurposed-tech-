"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-[#050505] border-t border-white/10 text-neutral-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 space-y-16">
        {/* TOP SECTION: BRAND + NEWSLETTER */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          <div className="lg:col-span-6 space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00FF88] rounded-full inline-block" />
              <span className="text-sm font-bold tracking-[0.25em] text-[#F5F5F0]">
                REPURPOSED TECH
              </span>
            </div>
            <p className="text-sm font-semibold tracking-widest text-[#F5F5F0] uppercase">
              OLD TECH. REIMAGINED.
            </p>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-md">
              We rescue forgotten, obsolete, and historic technology from attics, salvage yards, and electronic waste facilities. Every machine is meticulously cleaned, restored, upgraded, and numbered by hand in our studio.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.03] border border-white/10 text-[11px] text-neutral-300">
                <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full animate-pulse" />
                STUDIO STATUS: DROP 001 ACTIVE • LAGOS BENCH
              </span>
            </div>
          </div>

          {/* NEWSLETTER: JOIN THE DROP LIST */}
          <div className="lg:col-span-6 bg-[#090909] border border-white/10 p-6 sm:p-8 rounded-sm space-y-4">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-[0.25em] text-[#00FF88] font-bold">
                PRIORITY TELEMETRY
              </span>
              <h3 className="text-base sm:text-lg font-black uppercase text-[#F5F5F0] tracking-tight">
                JOIN THE DROP LIST
              </h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-mono">
                Subscribers receive one-time early checkout links 60 minutes before public drop deployment. Strictly no spam.
              </p>
            </div>

            {subscribed ? (
              <div className="p-3 bg-[#00FF88]/10 border border-[#00FF88]/30 text-[#00FF88] text-xs font-mono rounded-sm">
                ✓ YOU ARE ON THE DROP LIST. NEXT DISPATCH WILL ARRIVE IN YOUR INBOX.
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  required
                  placeholder="YOUR EMAIL ADDRESS..."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 bg-white/[0.04] border border-white/15 px-3.5 py-2.5 text-xs font-mono text-white rounded-sm focus:outline-none focus:border-[#00FF88]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00FF88] transition-colors rounded-sm flex-shrink-0"
                >
                  JOIN LIST
                </button>
              </form>
            )}
          </div>
        </div>

        {/* NAVIGATION LINKS GRID */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {/* NAVIGATION */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-semibold">
              NAVIGATION
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  SHOP
                </Link>
              </li>
              <li>
                <Link href="/drops" className="hover:text-white transition-colors">
                  DROPS
                </Link>
              </li>
              <li>
                <Link href="/restoration" className="hover:text-white transition-colors">
                  RESTORATION
                </Link>
              </li>
              <li>
                <Link href="/build" className="hover:text-white transition-colors">
                  BUILD YOUR OWN
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  ABOUT
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors text-[#00FF88]">
                  CONTACT
                </Link>
              </li>
            </ul>
          </div>

          {/* CATALOG HIGHLIGHTS */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-semibold">
              COLLECTIONS
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop?category=Retro+Gaming" className="hover:text-white transition-colors">
                  Retro Gaming (Game Boy)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Music" className="hover:text-white transition-colors">
                  Audiophile Music (iPod)
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Keyboards" className="hover:text-white transition-colors">
                  Mechanical Keyboards
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Cameras" className="hover:text-white transition-colors">
                  Vintage 35mm Cameras
                </Link>
              </li>
              <li>
                <Link href="/drops/drop-001" className="hover:text-white transition-colors">
                  Drop 001 — The Rebirth
                </Link>
              </li>
            </ul>
          </div>

          {/* PROTOCOLS & STUDIO */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-semibold">
              STUDIO
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Philosophy & Lagos Bench
                </Link>
              </li>
              <li>
                <Link href="/restoration" className="hover:text-white transition-colors">
                  7-Stage Restoration Protocol
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Custom Commission Inquiry
                </Link>
              </li>
              <li>
                <Link href="/checkout/success" className="hover:text-white transition-colors">
                  Order Telemetry Tracking
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-neutral-500">
                  Admin Console
                </Link>
              </li>
            </ul>
          </div>

          {/* SOCIAL CHANNELS */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-semibold">
              CHANNELS
            </h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  INSTAGRAM ↗
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  TIKTOK ↗
                </a>
              </li>
              <li>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  X ↗
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  YOUTUBE ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            © {SITE_CONFIG.established} REPURPOSED TECH. ALL RIGHTS RESERVED.
          </p>
          <p className="tracking-[0.25em] text-[#F5F5F0]/80">
            OLD TECH. REIMAGINED.
          </p>
        </div>
      </div>
    </footer>
  );
}
