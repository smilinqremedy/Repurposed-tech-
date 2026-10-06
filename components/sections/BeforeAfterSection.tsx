"use client";

import React, { useState } from "react";
import Link from "next/link";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export function BeforeAfterSection() {
  const [activeTab, setActiveTab] = useState<"gbc" | "ipod">("gbc");

  const transformations = {
    gbc: {
      title: "Game Boy Color (1998)",
      subtitle: "FROM ACID-CORRODED PLASTIC TO CRYSTAL BACKLIT MASTERPIECE",
      beforeImage: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1200&q=80",
      story: "Rescued with dissolved alkaline batteries, ruined motherboard power pins, and a heavily scratched unlit screen. Over 18 hours, we reconstructed the power traces, added solid tantalum caps, fitted an ultra-vivid FunnyPlaying laminated IPS display, and installed USB-C rechargeable power.",
      slug: "game-boy-color-atomic-purple",
    },
    ipod: {
      title: "iPod Classic 5.5th Gen (2006)",
      subtitle: "FROM CLICK-OF-DEATH CORROSION TO SILENT 512GB LOSSLESS AUDIO",
      beforeImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&w=1200&q=80",
      afterImage: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80",
      story: "Retrieved with an unreadable clicking 30GB magnetic hard disk and battered mirror stainless steel backing. We retrofitted a quad solid-state microSD storage board with 512GB flash memory, installed a 3,000mAh extended battery cell, and encased it in a scratch-resistant obsidian PVD casing.",
      slug: "ipod-classic-midnight-edition",
    },
  };

  const current = transformations[activeTab];

  return (
    <section className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-white/10">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#F59E0B]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B]">
                FORENSIC TRANSFORMATION
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F5F5F0]">
              THE TRANSFORMATION BENCH
            </h2>
            <p className="text-sm sm:text-base text-neutral-400 font-mono tracking-wide">
              Slide horizontally to witness 20 years of decay reversed by master craftsmanship.
            </p>
          </div>

          {/* Device Selector Tabs */}
          <div className="flex items-center p-1 bg-white/[0.03] border border-white/10 rounded-sm">
            <button
              onClick={() => setActiveTab("gbc")}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                activeTab === "gbc"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              GAME BOY COLOR
            </button>
            <button
              onClick={() => setActiveTab("ipod")}
              className={`px-4 py-2 text-xs font-mono tracking-wider uppercase rounded-sm transition-all ${
                activeTab === "ipod"
                  ? "bg-white text-black font-semibold shadow-sm"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              IPOD CLASSIC
            </button>
          </div>
        </div>

        {/* Interactive Comparison Slider */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-8">
            <BeforeAfterSlider
              beforeImage={current.beforeImage}
              afterImage={current.afterImage}
              beforeLabel="BEFORE: SALVAGE STATE"
              afterLabel="AFTER: STUDIO RESTORED"
              aspectRatio="aspect-[16/10]"
            />
          </div>

          {/* Transformation Narrative Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00FF88]">
                CASE REPORT
              </span>
              <h3 className="text-xl font-bold text-[#F5F5F0] tracking-tight">
                {current.title}
              </h3>
              <p className="text-xs font-mono text-neutral-400 tracking-wider">
                {current.subtitle}
              </p>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed font-normal">
              {current.story}
            </p>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <Link
                href={`/shop/${current.slug}`}
                className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88] hover:underline"
              >
                <span>VIEW THIS PIECE</span>
                <span>→</span>
              </Link>
              <Link
                href="/restoration"
                className="text-xs font-mono uppercase tracking-[0.18em] text-neutral-400 hover:text-white"
              >
                FULL 7-STEP PROTOCOL
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
