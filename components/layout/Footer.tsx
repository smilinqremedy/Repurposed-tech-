import React from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="bg-[#050505] border-t border-white/10 text-neutral-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8">
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-2 space-y-4 pr-0 lg:pr-8">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 bg-[#00FF88] rounded-full inline-block" />
              <span className="text-sm font-bold tracking-[0.25em] text-[#F5F5F0]">
                REPURPOSED TECH
              </span>
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              We rescue forgotten, obsolete, and historic technology from attics, salvage yards, and electronic waste facilities. Every machine is meticulously cleaned, restored, upgraded, and numbered by hand in our studio.
            </p>
            <div className="pt-2">
              <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-sm bg-white/[0.03] border border-white/10 text-[11px] text-neutral-300">
                <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" />
                STUDIO STATUS: DROP 001 ACTIVE
              </span>
            </div>
          </div>

          {/* SHOP Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-semibold">
              SHOP
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors">
                  All Products
                </Link>
              </li>
              <li>
                <Link href="/drops" className="hover:text-white transition-colors">
                  Latest Drop (Drop 001)
                </Link>
              </li>
              <li>
                <Link href="/build" className="hover:text-white transition-colors">
                  Custom Builds
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Retro+Gaming" className="hover:text-white transition-colors">
                  Retro Gaming
                </Link>
              </li>
              <li>
                <Link href="/shop?category=Music" className="hover:text-white transition-colors">
                  Audiophile Music
                </Link>
              </li>
            </ul>
          </div>

          {/* ABOUT Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-semibold">
              ABOUT
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Our Story
                </Link>
              </li>
              <li>
                <Link href="/restoration" className="hover:text-white transition-colors">
                  Restoration Process
                </Link>
              </li>
              <li>
                <Link href="/about#contact" className="hover:text-white transition-colors">
                  Contact Studio
                </Link>
              </li>
              <li>
                <Link href="/admin" className="hover:text-white transition-colors text-neutral-500">
                  Admin Portal
                </Link>
              </li>
            </ul>
          </div>

          {/* HELP & SOCIAL Column */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-[0.2em] text-[#F5F5F0] font-semibold">
              CONNECT & HELP
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/about#shipping" className="hover:text-white transition-colors">
                  Shipping (Nigeria & Global)
                </Link>
              </li>
              <li>
                <Link href="/about#authenticity" className="hover:text-white transition-colors">
                  Authenticity Certificates
                </Link>
              </li>
              <li>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  Instagram ↗
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  TikTok ↗
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-1.5"
                >
                  YouTube ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* BOTTOM COPYRIGHT */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-neutral-500">
          <p>
            REPURPOSED TECH © {SITE_CONFIG.established}. ALL RIGHTS RESERVED.
          </p>
          <p className="tracking-[0.25em] text-[#F5F5F0]/80">
            OLD TECH. REIMAGINED.
          </p>
        </div>
      </div>
    </footer>
  );
}
