"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PRODUCTS } from "@/lib/products";
import { formatNaira } from "@/lib/currency";
import { useCart } from "@/lib/cartContext";
import { useAudio } from "@/lib/audioContext";
import { ImageGallery } from "@/components/products/ImageGallery";
import { ProductSpecs } from "@/components/products/ProductSpecs";
import { RestorationTimeline } from "@/components/products/RestorationTimeline";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";
import { Badge } from "@/components/ui/Badge";
import { ProductCard } from "@/components/products/ProductCard";

interface ProductPageProps {
  params: Promise<{ slug: string }>;
}

export default function ShopProductDetailPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;
  const product = PRODUCTS.find((p) => p.slug === slug);

  const { addItem } = useCart();
  const { playClick, playChime, playHardwareSample, activeSample } = useAudio();
  const [savedForLater, setSavedForLater] = useState(false);
  const [addedToast, setAddedToast] = useState(false);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      productId: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      image: product.images[0],
      edition: product.edition,
      maxStock: product.stock,
    });
    setAddedToast(true);
    setTimeout(() => setAddedToast(false), 3000);
  };

  const relatedProducts = PRODUCTS.filter((p) => p.id !== product.id).slice(0, 3);

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      {/* Toast Notification */}
      {addedToast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] border border-[#00FF88]/40 text-[#F5F5F0] px-4 py-3 rounded-sm shadow-2xl flex items-center gap-3 animate-in fade-in slide-in-from-bottom-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
          <span className="text-xs font-mono tracking-wider">
            COMMISSION RESERVED IN VAULT
          </span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* BREADCRUMB */}
        <nav className="flex items-center gap-2 text-xs font-mono text-neutral-400">
          <Link href="/" className="hover:text-white transition-colors">HOME</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">SHOP</Link>
          <span>/</span>
          <span className="text-neutral-500 uppercase">{product.category}</span>
          <span>/</span>
          <span className="text-white truncate max-w-xs">{product.name}</span>
        </nav>

        {/* PRIMARY PRODUCT HERO GRID: GALLERY + DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: IMAGE GALLERY */}
          <div className="lg:col-span-7">
            <ImageGallery images={product.images} productName={product.name} />
          </div>

          {/* RIGHT: PRODUCT INFO & PURCHASE CONTROLS */}
          <div className="lg:col-span-5 space-y-8 lg:sticky lg:top-28">
            {/* Header info */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Badge variant={product.status}>
                    {product.status === "available"
                      ? "AVAILABLE"
                      : product.status === "limited"
                      ? "LIMITED"
                      : product.status === "coming-soon"
                      ? "COMING SOON"
                      : product.status === "low-stock"
                      ? "LOW STOCK"
                      : "SOLD OUT"}
                  </Badge>
                  <span className="text-xs font-mono tracking-widest text-[#00FF88] uppercase">
                    {product.edition}
                  </span>
                </div>
                <span className="text-xs font-mono text-neutral-400">
                  ORIGIN: {product.originalReleaseYear}
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F5F5F0]">
                {product.name}
              </h1>

              <div className="text-2xl font-mono font-medium text-[#F5F5F0]">
                {formatNaira(product.price)}
              </div>
            </div>

            {/* Description & Narrative */}
            <div className="space-y-4 text-sm text-neutral-300 leading-relaxed font-normal border-t border-b border-white/10 py-6">
              <p>{product.description}</p>
              <p className="text-xs font-mono text-neutral-400 tracking-wide uppercase">
                CONDITION: <span className="text-white">{product.condition}</span> • {product.era} HERITAGE
              </p>
            </div>

            {/* ACOUSTIC BENCHMARK SOUND CHECK */}
            {(() => {
              const sample = (() => {
                if (product.id === "rt-002") {
                  return { type: "wolfson" as const, label: "WOLFSON WM8758 DAC WARMTH", desc: "Warm harmonic audio reproduction benchmarked through studio monitors." };
                }
                if (product.id === "rt-004") {
                  return { type: "thock" as const, label: "180Hz MECHANICAL THOCK", desc: "Acoustic resonance frequency of lubed switches against 4mm solid brass plate." };
                }
                if (product.id === "rt-005") {
                  return { type: "shutter" as const, label: "1974 LEAF SHUTTER ACTION", desc: "Full clockwork mechanical escapement and leaf curtain timing capture." };
                }
                if (product.id === "rt-006" || product.id === "rt-008") {
                  return { type: "cyberdeck" as const, label: "AVIONICS TELEMETRY PING", desc: "High-contrast piezoelectric terminal frequency telemetry pulse." };
                }
                if (product.id === "rt-007") {
                  return { type: "braun" as const, label: "DIETER RAMS 440Hz PURITY", desc: "Laboratory sine wave calibration tone through Class-D amplifier stage." };
                }
                return { type: "chiptune" as const, label: "CLEANAMP PRO CHIPTUNE SWEEP", desc: "High-output ceramic transducer pulse wave with zero hum filtering." };
              })();

              const isPlaying = activeSample === sample.type;

              return (
                <div className="p-4 bg-[#0F0F0F] border border-white/10 rounded-sm space-y-3 font-mono">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full ${isPlaying ? "bg-[#00FF88] animate-ping" : "bg-[#00FF88]"}`} />
                      <span className="text-[10px] uppercase tracking-widest text-[#00FF88] font-bold">
                        ACOUSTIC BENCHMARK & SOUND CHECK
                      </span>
                    </div>
                    <span className="text-[9px] text-neutral-500 uppercase border border-white/10 px-1.5 py-0.5 rounded-sm">
                      LAB CALIBRATED
                    </span>
                  </div>
                  <p className="text-[11px] text-neutral-400 leading-relaxed font-sans">
                    {sample.desc}
                  </p>
                  <button
                    type="button"
                    onClick={() => playHardwareSample(sample.type)}
                    className={`w-full py-2.5 px-3 border rounded-sm transition-all flex items-center justify-center gap-2.5 text-xs uppercase font-bold tracking-wider ${
                      isPlaying
                        ? "bg-[#00FF88] text-black border-[#00FF88] shadow-lg shadow-[#00FF88]/20"
                        : "bg-white/[0.04] text-white border-white/15 hover:border-[#00FF88] hover:text-[#00FF88]"
                    }`}
                  >
                    <div className="flex items-end gap-0.5 h-3.5 w-3.5">
                      <span className={`w-0.5 bg-current rounded-full transition-all ${isPlaying ? "h-3 animate-pulse" : "h-1"}`} />
                      <span className={`w-0.5 bg-current rounded-full transition-all ${isPlaying ? "h-3.5 animate-bounce" : "h-2"}`} />
                      <span className={`w-0.5 bg-current rounded-full transition-all ${isPlaying ? "h-2 animate-pulse" : "h-1.5"}`} />
                    </div>
                    <span>{isPlaying ? `AUDITIONING: ${sample.label}...` : `▶ AUDITION: ${sample.label}`}</span>
                  </button>
                </div>
              );
            })()}

            {/* CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => {
                  playChime();
                  handleAddToCart();
                }}
                disabled={product.status === "sold-out" || product.status === "coming-soon"}
                className="w-full py-4 bg-white text-black font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#00FF88] transition-all rounded-sm shadow-xl flex items-center justify-center gap-2 disabled:bg-neutral-800 disabled:text-neutral-500 disabled:cursor-not-allowed"
              >
                {product.status === "sold-out" ? (
                  "PIECE SOLD OUT — JOIN NEXT DROP WAITLIST"
                ) : product.status === "coming-soon" ? (
                  "COMING SOON — NOTIFY FOR PRIORITY PASS"
                ) : (
                  <>
                    <span>ADD TO CART</span>
                    <span>•</span>
                    <span>{formatNaira(product.price)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  playClick("toggle");
                  setSavedForLater(!savedForLater);
                }}
                className={`w-full py-3.5 border font-mono text-xs uppercase tracking-widest transition-colors rounded-sm flex items-center justify-center gap-2 ${
                  savedForLater
                    ? "border-[#00FF88] text-[#00FF88] bg-[#00FF88]/5"
                    : "border-white/15 text-neutral-400 hover:text-white hover:border-white/30"
                }`}
              >
                <svg className="w-4 h-4" fill={savedForLater ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
                <span>{savedForLater ? "SAVED IN VAULT WISHLIST" : "SAVE FOR LATER"}</span>
              </button>
            </div>

            {/* Studio Guarantees */}
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 text-[11px] font-mono text-neutral-400">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                <span>1-YEAR STUDIO WARRANTY</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                <span>CERTIFICATE OF RESTORATION</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                <span>WHITE GLOVE DISPATCH</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88]" />
                <span>AUTHENTIC RETRO HARDWARE</span>
              </div>
            </div>

            {/* SPECIFICATIONS TABLE */}
            <div className="pt-6">
              <ProductSpecs specifications={product.specifications} />
            </div>
          </div>
        </div>

        {/* BEFORE & AFTER COMPARISON FOR THIS PRODUCT */}
        {product.beforeImage && product.afterImage && (
          <section className="py-12 border-t border-white/10 space-y-8">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B]">
                FORENSIC RESTORATION PROOF
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold uppercase tracking-tight text-[#F5F5F0]">
                SALVAGE DISCOVERY VS. COMMISSIONED PIECE
              </h2>
              <p className="text-xs font-mono text-neutral-400 uppercase tracking-wider">
                DRAG THE CENTRAL DIVIDER TO INSPECT THE WORK PERFORMED ON THIS SERIAL NUMBER
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <BeforeAfterSlider
                beforeImage={product.beforeImage}
                afterImage={product.afterImage}
                beforeLabel="SALVAGE DISCOVERY STATE"
                afterLabel="STUDIO RESTORED"
                aspectRatio="aspect-[16/10]"
              />
            </div>
          </section>
        )}

        {/* RESTORATION STORY TIMELINE */}
        <RestorationTimeline
          stages={product.restorationStages}
          storyQuote={product.storyQuote}
        />

        {/* RELATED PIECES FROM THIS DROP */}
        <section className="py-12 border-t border-white/10 space-y-8">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
                COLLECTION ARCHIVE
              </span>
              <h3 className="text-2xl font-bold uppercase tracking-tight text-[#F5F5F0]">
                MORE PIECES FROM DROP 001
              </h3>
            </div>
            <Link
              href="/shop"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white"
            >
              VIEW ALL →
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
