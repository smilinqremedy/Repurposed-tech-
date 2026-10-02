"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { PRODUCTS } from "@/lib/products";
import { formatNaira } from "@/lib/currency";
import { Product } from "@/types/product";

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery("");
      setResults([]);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.edition.toLowerCase().includes(q)
    );
    setResults(filtered);
  }, [query]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-[#0F0F0F] border border-white/10 rounded-sm shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="flex items-center px-4 py-3.5 border-b border-white/10 bg-[#141414]">
          <svg
            className="w-5 h-5 text-neutral-400 mr-3"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search restored machines, categories, or edition tags..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-sm text-[#F5F5F0] placeholder-neutral-500 focus:outline-none tracking-wide"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="text-xs uppercase font-mono tracking-widest text-neutral-400 hover:text-white px-2 py-1"
            >
              CLEAR
            </button>
          )}
          <button
            onClick={onClose}
            className="ml-2 text-xs font-mono text-neutral-400 hover:text-white px-2 py-1 border border-white/10 rounded-sm"
          >
            ESC
          </button>
        </div>

        {/* Quick Filter Tags */}
        <div className="px-4 py-2.5 bg-[#111111] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-[11px] font-mono text-neutral-400">
          <span className="text-neutral-500 uppercase tracking-widest text-[10px]">SUGGESTIONS:</span>
          {["Atomic Purple", "iPod", "Keyboard", "Camera", "Artifact"].map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-2 py-0.5 rounded-sm bg-white/[0.04] hover:bg-white/[0.08] hover:text-white transition-colors"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-2">
          {query.trim() === "" ? (
            <div className="py-12 text-center">
              <p className="text-xs uppercase tracking-widest text-neutral-500 font-mono">
                ENTER A KEYWORD TO SEARCH DROP 001 ARCHIVES
              </p>
            </div>
          ) : results.length === 0 ? (
            <div className="py-12 text-center">
              <p className="text-sm text-neutral-400 font-mono">NO RESTORATIONS MATCHING "{query}"</p>
              <p className="text-xs text-neutral-500 mt-1 font-mono">
                Looking for a bespoke build? Check our{" "}
                <Link href="/build" onClick={onClose} className="text-[#00FF88] underline">
                  Custom Configurator
                </Link>
              </p>
            </div>
          ) : (
            results.map((product) => (
              <Link
                key={product.id}
                href={`/product/${product.slug}`}
                onClick={onClose}
                className="flex items-center gap-4 p-2.5 rounded-sm bg-white/[0.02] hover:bg-white/[0.06] border border-transparent hover:border-white/10 transition-all group"
              >
                <div className="relative w-14 h-14 bg-black rounded-sm overflow-hidden flex-shrink-0 border border-white/5">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    sizes="56px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-400">
                      {product.category}
                    </span>
                    <span className="text-[10px] font-mono text-neutral-500">•</span>
                    <span className="text-[10px] font-mono text-[#00FF88]">
                      {product.edition}
                    </span>
                  </div>
                  <h4 className="text-sm font-medium text-[#F5F5F0] truncate group-hover:text-white">
                    {product.name}
                  </h4>
                  <p className="text-xs text-neutral-400 truncate">{product.shortDescription}</p>
                </div>
                <div className="text-right flex-shrink-0">
                  <span className="text-sm font-mono font-medium text-[#F5F5F0]">
                    {formatNaira(product.price)}
                  </span>
                  <div className="text-[10px] uppercase font-mono tracking-wider text-neutral-500 group-hover:text-white">
                    VIEW →
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
