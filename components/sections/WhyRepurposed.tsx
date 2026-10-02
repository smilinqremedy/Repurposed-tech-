import React from "react";
import Link from "next/link";

export function WhyRepurposed() {
  const principles = [
    {
      step: "01",
      title: "RESCUE",
      headline: "Preventing Obsolete Art From Becoming Landfill",
      description: "Over 50 million metric tons of e-waste are discarded each year. We intercept forgotten, iconic devices before they are shredded or incinerated. We believe historic electronics are industrial design monuments that deserve preservation, not disposal.",
      accent: "text-[#00FF88]",
      borderAccent: "border-[#00FF88]/20",
    },
    {
      step: "02",
      title: "RESTORE",
      headline: "Forensic Disassembly, Ultrasonic Decontamination, & Repair",
      description: "Every machine undergoes a full bench teardown. We neutralize battery acid, desolder aged electrolytic capacitors with modern solid tantalum equivalents, polish and restore aged plastics, and lubricate mechanical switches with horological Swiss lubricants.",
      accent: "text-[#F59E0B]",
      borderAccent: "border-[#F59E0B]/20",
    },
    {
      step: "03",
      title: "REIMAGINE",
      headline: "Modern Electrical Improvements Meet Original Soul",
      description: "We don't just restore the past — we elevate it for contemporary living. Laminated IPS backlit screens replace unreadable reflective LCDs. Silent solid-state flash memory replaces spinning hard drives. Discreet USB-C fast charging eliminates disposable alkaline batteries.",
      accent: "text-purple-400",
      borderAccent: "border-purple-400/20",
    },
  ];

  return (
    <section className="py-24 bg-[#0A0A0A] border-t border-white/10 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="space-y-4 max-w-3xl pb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              STUDIO MANIFESTO
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black uppercase tracking-tight text-[#F5F5F0]">
            WHY REPURPOSED TECH
          </h2>
          <p className="text-base text-neutral-400 leading-relaxed font-normal">
            Technology is designed today for rapid obsolescence. We stand for the opposite: permanent craftsmanship, authentic repairability, and honoring the engineering pioneers who built the foundation of the digital world.
          </p>
        </div>

        {/* 3 Principles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {principles.map((p) => (
            <div
              key={p.step}
              className={`p-8 rounded-sm bg-[#080808] border border-white/10 hover:${p.borderAccent} transition-all duration-300 flex flex-col justify-between space-y-8 group`}
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className={`text-2xl font-black font-mono tracking-tighter ${p.accent}`}>
                    {p.title}
                  </span>
                  <span className="text-xs font-mono text-neutral-600 font-bold">
                    {p.step}
                  </span>
                </div>
                <h3 className="text-lg font-medium text-[#F5F5F0] leading-snug">
                  {p.headline}
                </h3>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  {p.description}
                </p>
              </div>

              <div className="pt-4 border-t border-white/5">
                <span className="text-[10px] font-mono tracking-widest uppercase text-neutral-500 group-hover:text-neutral-300 transition-colors">
                  ENGINEERED IN NIGERIA • SHIPPED GLOBALLY
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Studio Quote Banner */}
        <div className="mt-16 p-8 border border-white/10 bg-gradient-to-r from-[#111111] via-[#0D0D0D] to-[#111111] rounded-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-sm italic text-neutral-300">
              "We don't sell consumer electronics. We curate resurrected time machines."
            </p>
            <p className="text-xs font-mono text-neutral-500 mt-1 uppercase tracking-wider">
              — LEAD PRESERVATION ENGINEER, REPURPOSED TECH
            </p>
          </div>
          <Link
            href="/about"
            className="px-6 py-3 border border-white/20 text-[#F5F5F0] font-mono text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all flex-shrink-0"
          >
            READ OUR FULL STORY
          </Link>
        </div>
      </div>
    </section>
  );
}
