"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { SITE_CONFIG } from "@/lib/constants";
import { useCart } from "@/lib/cartContext";
import { MobileMenu } from "@/components/navigation/MobileMenu";
import { SearchModal } from "@/components/navigation/SearchModal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const pathname = usePathname();
  const { itemCount, openCart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-[#080808]/85 backdrop-blur-md border-b border-white/10 py-3.5 shadow-2xl"
            : "bg-transparent border-b border-white/5 py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* BRAND LOGO */}
            <div className="flex items-center gap-6">
              <Link
                href="/"
                className="group flex items-center gap-2.5 focus:outline-none"
              >
                <div className="w-2.5 h-2.5 bg-[#00FF88] rounded-full group-hover:scale-125 transition-transform" />
                <span className="text-sm font-extrabold tracking-[0.25em] uppercase font-mono text-[#F5F5F0]">
                  REPURPOSED TECH
                </span>
              </Link>
              <span className="hidden xl:inline-block text-[10px] font-mono tracking-widest uppercase text-neutral-500 border-l border-white/10 pl-6">
                OLD TECH. REIMAGINED.
              </span>
            </div>

            {/* DESKTOP NAVIGATION */}
            <nav className="hidden lg:flex items-center space-x-8">
              {SITE_CONFIG.navLinks.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    className={`text-xs font-mono tracking-[0.18em] uppercase transition-colors relative py-1 ${
                      isActive ? "text-[#00FF88]" : "text-neutral-400 hover:text-white"
                    }`}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#00FF88]" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* RIGHT SIDE ACTIONS */}
            <div className="flex items-center space-x-3 sm:space-x-5">
              {/* Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Open search modal"
                className="p-2 text-neutral-400 hover:text-white transition-colors rounded-sm hover:bg-white/[0.05]"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </button>

              {/* Admin / Portal Shortcut */}
              <Link
                href="/admin"
                title="Admin Studio Portal"
                className="hidden sm:flex items-center text-[11px] font-mono text-neutral-400 hover:text-white px-2 py-1 border border-white/10 rounded-sm hover:border-white/20 transition-all"
              >
                STUDIO
              </Link>

              {/* Cart Button */}
              <button
                onClick={openCart}
                aria-label={`Open shopping cart with ${itemCount} items`}
                className="relative flex items-center gap-2 py-1.5 px-3 rounded-sm bg-white/[0.04] hover:bg-white/[0.08] border border-white/10 hover:border-white/25 transition-all text-xs font-mono text-[#F5F5F0]"
              >
                <svg
                  className="w-4 h-4 text-neutral-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.75}
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                  />
                </svg>
                <span className="hidden sm:inline text-xs tracking-wider">CART</span>
                <span
                  className={`text-[11px] font-mono px-1.5 py-0.2 rounded-sm font-bold ${
                    itemCount > 0
                      ? "bg-[#00FF88] text-black"
                      : "bg-white/10 text-neutral-400"
                  }`}
                >
                  {itemCount}
                </span>
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="lg:hidden p-2 text-neutral-300 hover:text-white transition-colors"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SEARCH MODAL */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />

      {/* MOBILE DRAWER */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenCart={openCart}
        cartCount={itemCount}
      />
    </>
  );
}
