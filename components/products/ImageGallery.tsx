"use client";

import React, { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
  images: string[];
  productName: string;
}

export function ImageGallery({ images, productName }: ImageGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-4">
      {/* MAIN LARGE VIEWER */}
      <div className="relative aspect-square sm:aspect-[4/3] w-full bg-[#121212] border border-white/10 rounded-sm overflow-hidden group">
        <Image
          src={images[activeIndex]}
          alt={`${productName} - View ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 50vw"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Counter indicator */}
        <div className="absolute bottom-4 right-4 z-10 px-2.5 py-1 bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono tracking-widest text-neutral-300 rounded-sm">
          {activeIndex + 1} / {images.length}
        </div>

        {/* Image Controls (Arrows for mobile & desktop) */}
        {images.length > 1 && (
          <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={() => setActiveIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1))}
              className="pointer-events-auto p-2 bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full hover:bg-black transition-colors"
              aria-label="Previous view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setActiveIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0))}
              className="pointer-events-auto p-2 bg-black/60 backdrop-blur-md text-white border border-white/10 rounded-full hover:bg-black transition-colors"
              aria-label="Next view"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        )}
      </div>

      {/* THUMBNAIL STRIP */}
      {images.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`relative aspect-square rounded-sm overflow-hidden border transition-all ${
                activeIndex === idx
                  ? "border-white ring-1 ring-white"
                  : "border-white/10 opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${productName} thumbnail ${idx + 1}`}
                fill
                sizes="100px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
