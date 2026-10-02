import React from "react";
import Link from "next/link";
import Image from "next/image";
import { BeforeAfterSlider } from "@/components/ui/BeforeAfterSlider";

export default function RestorationPage() {
  const steps = [
    {
      num: "01",
      title: "SOURCE",
      headline: "We Find Forgotten, Damaged, and Obsolete Technology.",
      description: "Our scouts search decommissioned telecommunications centers, closed electronics repair depots, estate auctions, and recycling yards across Nigeria, Japan, and Europe. We identify machines designed during the golden era of industrial hardware that deserve rescue.",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1000&q=80",
      specs: ["Industrial scrap scouting", "Authenticity verification", "Original motherboard matching"],
    },
    {
      num: "02",
      title: "INSPECT",
      headline: "Every Device Is Diagnosed Before Restoration Begins.",
      description: "We hook incoming boards up to multi-channel oscilloscopes, digital multimeters, and thermal cameras to identify dead capacitors, short circuits, trace corrosion, and mechanical friction points.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
      specs: ["Thermal leakage scanning", "Electrolytic ESR benchmarking", "Bus line logic analysis"],
    },
    {
      num: "03",
      title: "DISASSEMBLE",
      headline: "The Device Is Carefully Taken Apart Down To Bare Silicon.",
      description: "Every single screw, tactile spring, bracket, and plastic clip is categorized. We isolate the structural chassis, chemical plastics, optical elements, and motherboards onto anti-static silicone workbench trays.",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=80",
      specs: ["Non-marring spudgers only", "Magnetic sub-assembly sorting", "Zero broken clip guarantee"],
    },
    {
      num: "04",
      title: "RESTORE",
      headline: "Components Are Cleaned, Repaired, and Replaced Where Necessary.",
      description: "PCBs undergo heated ultrasonic neutralizer cleaning to eliminate battery acid corrosion and flux residue. Decayed electrolytic capacitors are desoldered and replaced with modern aerospace-grade solid tantalum caps.",
      image: "https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&w=1000&q=80",
      specs: ["Ultrasonic bath descaling", "Tantalum capacitor recapping", "Retrobrite UV yellowing reversal"],
    },
    {
      num: "05",
      title: "UPGRADE",
      headline: "Modern Electrical Improvements Are Added Where Appropriate.",
      description: "We install custom laminated IPS backlights with zero dust gap, replace failed spinning magnetic drives with high-speed solid-state flash memory, integrate clean audio amplifiers with zero noise floor, and fit modern LiPo USB-C power.",
      image: "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1000&q=80",
      specs: ["Laminated Full HD / IPS displays", "Silent solid-state flash storage", "USB-C Power Delivery integration"],
    },
    {
      num: "06",
      title: "TEST",
      headline: "Every Finished Device Undergoes Exhaustive Stress Testing.",
      description: "Before any machine is certified, it undergoes continuous 48-hour burn-in cycles. We measure audio THD distortion, battery charge curves, thermal heat dissipation, and button actuation consistency.",
      image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80",
      specs: ["48-Hour continuous burn-in", "Audio spectrum analyzer check", "Thermal camera dissipation review"],
    },
    {
      num: "07",
      title: "RELEASE",
      headline: "Only Completed Masterpieces Become Available For A Drop.",
      description: "Each machine is assigned its unique laser-engraved serial plate, packaged in an archival flight case with signed certificates of authenticity, and cataloged into our official Drop Registry.",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1000&q=80",
      specs: ["Laser engraved titanium plate", "Signed certificate of craft", "Flight case & accessories included"],
    },
  ];

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* HERO SECTION */}
        <section className="space-y-6 max-w-4xl border-b border-white/10 pb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              ENGINEERING PROTOCOL
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-[#F5F5F0] leading-[0.95]">
            NOTHING GETS A SECOND LIFE BY ACCIDENT.
          </h1>

          <p className="text-lg text-neutral-400 font-normal leading-relaxed">
            Every machine that leaves our Lagos studio has been saved from oblivion. We do not apply quick coats of paint or swap cheap plastic shells. We practice forensic restoration: stripping 20 to 40-year-old circuits down to their purest state, curing their flaws, and modernizing their capabilities for the next half-century.
          </p>

          <div className="pt-4 flex flex-wrap gap-8 font-mono text-xs text-neutral-400">
            <div>
              <span className="block text-2xl font-bold text-white">40+</span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">HOURS PER MACHINE</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-[#00FF88]">100%</span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">COMPONENT LEVEL AUDIT</span>
            </div>
            <div>
              <span className="block text-2xl font-bold text-white">0%</span>
              <span className="text-[10px] uppercase tracking-wider text-neutral-500">LANDFILL WASTE</span>
            </div>
          </div>
        </section>

        {/* 7-STEP PROTOCOL SECTION */}
        <section className="space-y-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              THE 7-STAGE RECONSTRUCTION
            </span>
            <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-[#F5F5F0]">
              STEP-BY-STEP FORENSIC LAB PROTOCOL
            </h2>
          </div>

          <div className="space-y-12">
            {steps.map((step, idx) => (
              <div
                key={step.num}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-8 bg-[#0D0D0D] border border-white/10 rounded-sm hover:border-white/25 transition-all"
              >
                {/* Step Num & Info */}
                <div className="lg:col-span-7 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-black font-mono text-[#00FF88]">
                      {step.num}
                    </span>
                    <span className="text-xl font-bold font-mono tracking-widest uppercase text-white">
                      — {step.title}
                    </span>
                  </div>

                  <h3 className="text-lg font-medium text-[#F5F5F0]">
                    {step.headline}
                  </h3>

                  <p className="text-sm text-neutral-400 leading-relaxed">
                    {step.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-2">
                    {step.specs.map((item, i) => (
                      <span
                        key={i}
                        className="px-2.5 py-1 bg-white/[0.04] border border-white/10 rounded-sm text-[11px] font-mono text-neutral-300"
                      >
                        ✓ {item}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Step Image */}
                <div className="lg:col-span-5 relative aspect-[16/10] bg-[#141414] rounded-sm overflow-hidden border border-white/10">
                  <Image
                    src={step.image}
                    alt={step.title}
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE COMPARISON SECTION */}
        <section className="space-y-8 border-t border-white/10 pt-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#F59E0B]">
              TRANSFORMATION PROOF
            </span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-[#F5F5F0]">
              SEE THE PHYSICAL TRANSFORMATION
            </h2>
            <p className="text-sm text-neutral-400 font-mono">
              Before and after comparison of our 1998 Game Boy Color Atomic Purple commission.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <BeforeAfterSlider
              beforeImage="https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80"
              afterImage="https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?auto=format&fit=crop&w=1200&q=80"
              beforeLabel="BEFORE: SALVAGE DEGRADATION"
              afterLabel="AFTER: REPURPOSED MASTERPIECE"
            />
          </div>
        </section>

        {/* BOTTOM CALL TO ACTION */}
        <section className="p-12 bg-gradient-to-r from-[#111111] via-[#0E0E0E] to-[#111111] border border-white/15 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="space-y-2 text-center sm:text-left">
            <h3 className="text-2xl font-black uppercase tracking-tight text-[#F5F5F0]">
              OWN A RESURRECTED PIECE OF HISTORY
            </h3>
            <p className="text-sm text-neutral-400 font-mono">
              View current available pieces in Drop 001 or design your own bespoke specification.
            </p>
          </div>

          <div className="flex items-center gap-4 flex-shrink-0">
            <Link
              href="/shop"
              className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00FF88] transition-colors rounded-sm"
            >
              SHOP DROP 001
            </Link>
            <Link
              href="/build"
              className="px-6 py-3.5 border border-white/20 text-white font-mono text-xs uppercase tracking-widest hover:bg-white/[0.05] transition-colors rounded-sm"
            >
              CUSTOM BUILD
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
