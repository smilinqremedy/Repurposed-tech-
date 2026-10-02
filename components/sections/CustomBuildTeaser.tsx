import React from "react";
import Link from "next/link";
import Image from "next/image";

export function CustomBuildTeaser() {
  return (
    <section className="py-24 bg-[#080808] border-t border-white/10 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 bg-purple-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* LEFT: VISUAL TEASER */}
          <div className="lg:col-span-6 order-2 lg:order-1">
            <div className="relative aspect-[4/3] rounded-sm overflow-hidden border border-white/15 bg-[#101010] group">
              <Image
                src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=85"
                alt="Custom hardware configuration studio"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

              {/* Floating Blueprint Overlay */}
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-black/80 backdrop-blur-md border border-white/10 rounded-sm">
                <div className="flex items-center justify-between text-xs font-mono">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-[#00FF88] uppercase tracking-widest">
                      BESPOKE ATELIER
                    </span>
                    <p className="text-white font-medium">CUSTOM BUILD ENGINE ACTIVE</p>
                  </div>
                  <span className="text-[10px] font-mono text-neutral-400">
                    LIVE CONFIGURATOR
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: TEXT & CTA */}
          <div className="lg:col-span-6 space-y-6 order-1 lg:order-2">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
              <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
                COMMISSION ATELIER
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F5F5F0] leading-tight">
              BUILD SOMETHING THAT DOESN'T EXIST.
            </h2>

            <p className="text-base text-neutral-400 leading-relaxed font-normal">
              Choose the shell. Choose the screen. Choose the power unit and audio mods. Select your custom laser engraving. Our master technicians will handcraft your unique machine to exact laboratory specifications.
            </p>

            {/* Configurator preview items */}
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">STEP 01</span>
                <span className="text-neutral-200">BASE DEVICE</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">STEP 02</span>
                <span className="text-neutral-200">CUSTOM SHELL</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">STEP 03</span>
                <span className="text-neutral-200">LAMINATED IPS DISPLAY</span>
              </div>
              <div className="p-3 bg-white/[0.02] border border-white/10 rounded-sm">
                <span className="text-[10px] text-neutral-500 uppercase tracking-widest block">STEP 04</span>
                <span className="text-neutral-200">EXTRAS & LASER ENGRAVING</span>
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/build"
                className="inline-flex items-center gap-3 px-8 py-4 bg-white text-black font-mono text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#00FF88] transition-all rounded-sm shadow-xl"
              >
                <span>BUILD YOUR OWN</span>
                <span>→</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
