import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* HERO SECTION */}
        <section className="space-y-6 max-w-4xl border-b border-white/10 pb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              STUDIO MANIFESTO
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F5F5F0] leading-[0.95]">
            TECHNOLOGY SHOULDN'T HAVE AN EXPIRATION DATE.
          </h1>

          <p className="text-lg sm:text-xl text-neutral-300 font-normal leading-relaxed">
            We live in an era of engineered disposability. Phones are replaced every 12 months. Laptops are glued shut. When an electronic part wears out, modern companies urge you to throw the whole machine into the bin.
          </p>

          <p className="text-base text-neutral-400 font-normal leading-relaxed">
            Repurposed Tech exists because we reject that premise entirely. The machines built in the 1970s, 80s, 90s, and early 2000s were crafted with character, weight, mechanical soul, and tactile joy that modern glass slabs will never match.
          </p>
        </section>

        {/* WORKBENCH & HUMAN ESSAY SECTION */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00FF88]">
                BORN IN LAGOS
              </span>
              <h2 className="text-3xl font-black uppercase tracking-tight text-[#F5F5F0]">
                REBUILDING THE WORLD'S GREATEST GADGETS BY HAND
              </h2>
            </div>

            <p className="text-sm text-neutral-300 leading-relaxed">
              Our studio was founded by a collective of Nigerian electronic engineers, vintage hardware collectors, and industrial designers who grew up in the bustling tech salvage markets of Lagos. In places like Computer Village, repair isn't an afterthought — it's an art form.
            </p>

            <p className="text-sm text-neutral-400 leading-relaxed">
              We took that deep reverence for repair and combined it with laboratory-grade precision: ultrasonic baths, tantalum recapping, custom laminated IPS optics, CNC-milled structural components, and high-density lithium polymer power cells.
            </p>

            <div className="pt-4 border-t border-white/10 grid grid-cols-3 gap-4 font-mono text-xs">
              <div>
                <span className="text-xl font-bold text-white block">500+</span>
                <span className="text-[10px] text-neutral-500 uppercase">DEVICES SAVED</span>
              </div>
              <div>
                <span className="text-xl font-bold text-[#00FF88] block">42 HRS</span>
                <span className="text-[10px] text-neutral-500 uppercase">AVG BENCH TIME</span>
              </div>
              <div>
                <span className="text-xl font-bold text-white block">100%</span>
                <span className="text-[10px] text-neutral-500 uppercase">INDEPENDENT</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/15 bg-[#121212]">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1200&q=85"
                alt="Electronics restoration workbench in Lagos"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-neutral-400">
                LAB WORKBENCH • ULTRASONIC DECONTAMINATION & SMD RECAPPING
              </div>
            </div>
          </div>
        </section>

        {/* OUR THREE PILLARS */}
        <section className="space-y-12 border-t border-white/10 pt-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              FOUNDATIONAL STANDARDS
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#F5F5F0]">
              THE REPURPOSED TECH COMMITMENT
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 font-mono">
            <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-4">
              <span className="text-xl font-bold text-[#00FF88]">01 • AUTHENTICITY</span>
              <h3 className="text-sm font-bold text-white">GENUINE VINTAGE SILICON</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                We never use fake clone system-on-chips or generic emulator boxes. The beating heart of every Game Boy, iPod, or camera is genuine period-correct hardware from Kyoto, Cupertino, or Wetzlar.
              </p>
            </div>

            <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-4">
              <span className="text-xl font-bold text-[#F59E0B]">02 • TIMELESS MODS</span>
              <h3 className="text-sm font-bold text-white">REVERSIBLE WHERE IT MATTERS</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                Our upgrades respect the industrial heritage of the designer. Screens look factory-integrated, USB-C ports align to factory bezels, and sound circuitry delivers crisp analog warmth without hum or hiss.
              </p>
            </div>

            <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-4">
              <span className="text-xl font-bold text-purple-400">03 • LIFETIME CRAFT</span>
              <h3 className="text-sm font-bold text-white">BUILT TO BE SERVICED</h3>
              <p className="text-xs text-neutral-400 leading-relaxed font-sans">
                We despise glue and non-repairable assemblies. Every machine we build can be opened, serviced, and maintained by future generations with standard screwdrivers.
              </p>
            </div>
          </div>
        </section>

        {/* STUDIO CONCIERGE & CONTACT */}
        <section id="contact" className="p-10 bg-[#0C0C0C] border border-white/15 rounded-sm space-y-8">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-widest text-[#00FF88]">
              STUDIO CONCIERGE
            </span>
            <h3 className="text-2xl font-black uppercase tracking-tight text-white">
              COMMISSION INQUIRIES & PRIVATE DROPS
            </h3>
            <p className="text-sm text-neutral-400 font-mono">
              Have a rare vintage machine you want custom-restored, or looking to commission a private edition?
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="space-y-1">
              <span className="text-neutral-500 uppercase">STUDIO WORKBENCH</span>
              <p className="text-white">Lekki Phase 1, Lagos, Nigeria</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 uppercase">PRIVATE DESK</span>
              <p className="text-[#00FF88]">concierge@repurposedtech.studio</p>
            </div>
            <div className="space-y-1">
              <span className="text-neutral-500 uppercase">DIRECT DISPATCH</span>
              <p className="text-white">+234 (0) 803 REPURPOSE</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
