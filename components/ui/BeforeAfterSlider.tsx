"use client";

import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";

interface BeforeAfterSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeLabel?: string;
  afterLabel?: string;
  title?: string;
  subtitle?: string;
  aspectRatio?: string; // e.g. "aspect-[4/3]" or "aspect-[16/10]"
  className?: string;
}

export function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = "BEFORE — DEGRADED & CORRODED",
  afterLabel = "AFTER — RESTORED & UPGRADED",
  title,
  subtitle,
  aspectRatio = "aspect-[16/10]",
  className = "",
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedX = Math.max(0, Math.min(x, rect.width));
    const percentage = (clampedX / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      setSliderPosition((prev) => Math.max(0, prev - 5));
    } else if (e.key === "ArrowRight") {
      setSliderPosition((prev) => Math.min(100, prev + 5));
    }
  };

  return (
    <div className={`w-full ${className}`}>
      {(title || subtitle) && (
        <div className="mb-4 flex flex-col md:flex-row md:items-end justify-between gap-2">
          {title && <h3 className="text-xl font-medium tracking-tight text-[#F5F5F0]">{title}</h3>}
          {subtitle && <p className="text-xs uppercase tracking-widest text-[#888888]">{subtitle}</p>}
        </div>
      )}

      <div
        ref={containerRef}
        role="slider"
        aria-label="Before and after transformation slider"
        aria-valuenow={Math.round(sliderPosition)}
        aria-valuemin={0}
        aria-valuemax={100}
        tabIndex={0}
        onKeyDown={handleKeyDown}
        onMouseDown={(e) => {
          setIsDragging(true);
          handleMove(e.clientX);
        }}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={(e) => {
          setIsDragging(true);
          handleMove(e.touches[0].clientX);
        }}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className={`relative w-full ${aspectRatio} overflow-hidden rounded-sm bg-[#111111] select-none border border-white/10 cursor-ew-resize focus:outline-none focus:ring-1 focus:ring-[#F5F5F0]/50`}
      >
        {/* AFTER IMAGE (Base / Background) */}
        <div className="absolute inset-0">
          <Image
            src={afterImage}
            alt="Restored technology"
            fill
            sizes="(max-width: 1200px) 100vw, 1200px"
            className="object-cover pointer-events-none"
            priority={false}
          />
          <div className="absolute top-4 right-4 z-10 px-2.5 py-1 bg-[#080808]/80 backdrop-blur-md border border-white/10 text-[10px] tracking-widest uppercase font-mono text-[#00FF88]">
            {afterLabel}
          </div>
        </div>

        {/* BEFORE IMAGE (Clipped Overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <div className="relative w-full h-full" style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : "100%" }}>
            <Image
              src={beforeImage}
              alt="Before restoration"
              fill
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover pointer-events-none filter grayscale contrast-125 brightness-90"
              priority={false}
            />
          </div>
          <div className="absolute top-4 left-4 z-10 px-2.5 py-1 bg-[#080808]/80 backdrop-blur-md border border-white/10 text-[10px] tracking-widest uppercase font-mono text-[#F59E0B]">
            {beforeLabel}
          </div>
        </div>

        {/* SLIDER DIVIDER LINE */}
        <div
          className="absolute top-0 bottom-0 z-20 w-[2px] bg-white/80 pointer-events-none shadow-[0_0_10px_rgba(0,0,0,0.8)]"
          style={{ left: `${sliderPosition}%` }}
        >
          {/* DRAG HANDLE BUTTON */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-[#080808] border border-white/40 flex items-center justify-center text-white shadow-xl backdrop-blur-sm pointer-events-none">
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 9l-4 4 4 4m8-8l4 4-4 4"
              />
            </svg>
          </div>
        </div>

        {/* BOTTOM HINT */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 px-3 py-1 bg-black/60 backdrop-blur-sm border border-white/5 rounded-full text-[10px] font-mono tracking-wider text-white/60 pointer-events-none">
          DRAG TO REVEAL TRANSFORMATION
        </div>
      </div>
    </div>
  );
}
