"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSearch: () => void;
  onOpenCart: () => void;
  cartCount: number;
}

export function MobileMenu({
  isOpen,
  onClose,
  onOpenSearch,
  onOpenCart,
  cartCount,
}: MobileMenuProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Drawer panel */}
      <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-[#0C0C0C] border-l border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 transition-transform duration-300">
        {/* Top Header */}
        <div>
          <div className="flex items-center justify-between pb-6 border-b border-white/10">
            <Link
              href="/"
              onClick={onClose}
              className="text-sm font-bold tracking-widest uppercase font-mono text-[#F5F5F0]"
            >
              REPURPOSED TECH
            </Link>
            <button
              onClick={onClose}
              aria-label="Close menu"
              className="p-2 -mr-2 text-neutral-400 hover:text-white"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Quick Action Buttons */}
          <div className="grid grid-cols-2 gap-2 my-6">
            <button
              onClick={() => {
                onClose();
                onOpenSearch();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider text-neutral-300 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              SEARCH
            </button>
            <button
              onClick={() => {
                onClose();
                onOpenCart();
              }}
              className="flex items-center justify-center gap-2 py-3 px-4 rounded-sm bg-white/[0.04] border border-white/10 text-xs font-mono tracking-wider text-neutral-300 hover:text-white"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              CART ({cartCount})
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col space-y-1">
            {SITE_CONFIG.navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className="py-3.5 px-3 rounded-sm text-base tracking-widest uppercase font-mono text-neutral-300 hover:text-white hover:bg-white/[0.04] transition-all flex items-center justify-between group"
              >
                <span>{link.label}</span>
                <span className="text-neutral-600 group-hover:text-neutral-400 text-xs font-mono">→</span>
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={onClose}
              className="py-3.5 px-3 rounded-sm text-xs tracking-widest uppercase font-mono text-neutral-500 hover:text-neutral-300 hover:bg-white/[0.02] transition-all flex items-center justify-between"
            >
              <span>ADMIN PORTAL</span>
              <span className="text-[10px] font-mono border border-white/10 px-1.5 py-0.5 rounded-sm">DEV</span>
            </Link>
          </nav>
        </div>

        {/* Footer Meta */}
        <div className="pt-6 border-t border-white/10">
          <div className="p-3 bg-white/[0.02] border border-white/5 rounded-sm mb-4">
            <span className="text-[10px] font-mono uppercase tracking-widest text-[#00FF88] block mb-1">
              CURRENT RELEASE
            </span>
            <p className="text-xs font-medium text-[#F5F5F0]">DROP 001 — THE REBIRTH</p>
            <p className="text-[11px] text-neutral-400 mt-0.5">5 pieces commissioned. Hand-tested in Lagos.</p>
          </div>
          <p className="text-[10px] uppercase font-mono tracking-widest text-neutral-500 text-center">
            REPURPOSED TECH © {SITE_CONFIG.established} • OLD TECH. REIMAGINED.
          </p>
        </div>
      </div>
    </div>
  );
}
