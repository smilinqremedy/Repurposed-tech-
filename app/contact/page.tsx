"use client";

import React, { useState } from "react";
import Link from "next/link";
import { SITE_CONFIG } from "@/lib/constants";

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState<"commission" | "general" | "trade-in" | "press">("commission");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    deviceModel: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fullName && formData.email) {
      setSubmitted(true);
    }
  };

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* HEADER */}
        <section className="space-y-6 max-w-4xl border-b border-white/10 pb-16">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              STUDIO CONCIERGE
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F5F5F0] leading-[0.95]">
            DIRECT CONTACT WITH THE WORKBENCH.
          </h1>

          <p className="text-base sm:text-lg text-neutral-400 font-normal leading-relaxed max-w-2xl">
            Whether you want to commission a 1-of-1 custom Game Boy, offer forgotten vintage hardware for studio salvage, or visit our Lagos workbench by appointment, reach out directly to our restoration engineers.
          </p>
        </section>

        {/* MAIN SPLIT: CONTACT INFO + INQUIRY FORM */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* LEFT: STUDIO CHANNELS */}
          <div className="lg:col-span-5 space-y-10">
            {/* Workbench Locations */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                01 — PHYSICAL WORKBENCH
              </span>
              <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-3">
                <div className="space-y-1">
                  <h3 className="text-sm font-bold uppercase text-white font-mono">
                    LAGOS STUDIO WORKBENCH
                  </h3>
                  <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                    14 Victoria Arobieke Street, Lekki Phase 1<br />
                    Lagos State, Nigeria
                  </p>
                </div>
                <div className="pt-3 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-neutral-500">
                  <span>BENCH HOURS: 09:00 — 18:00 WAT</span>
                  <span className="text-[#00FF88]">BY APPOINTMENT</span>
                </div>
              </div>
            </div>

            {/* Direct Digital Channels */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                02 — DIRECT TELEMETRY
              </span>
              <div className="space-y-3 font-mono text-xs">
                <a
                  href="mailto:concierge@repurposedtech.studio"
                  className="p-4 bg-[#0C0C0C] border border-white/10 rounded-sm flex items-center justify-between hover:border-white/30 transition-all block group"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-neutral-500 uppercase">STUDIO INBOX</span>
                    <span className="text-white group-hover:text-[#00FF88] transition-colors block">
                      concierge@repurposedtech.studio
                    </span>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white">↗</span>
                </a>

                <a
                  href="tel:+2348035550192"
                  className="p-4 bg-[#0C0C0C] border border-white/10 rounded-sm flex items-center justify-between hover:border-white/30 transition-all block group"
                >
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-neutral-500 uppercase">TELEPHONE & WHATSAPP</span>
                    <span className="text-white group-hover:text-[#00FF88] transition-colors block">
                      +234 803 555 0192
                    </span>
                  </div>
                  <span className="text-neutral-500 group-hover:text-white">↗</span>
                </a>

                <div className="p-4 bg-[#0C0C0C] border border-white/10 rounded-sm flex items-center justify-between">
                  <div className="space-y-0.5">
                    <span className="text-[10px] text-neutral-500 uppercase">RESPONSE PLEDGE</span>
                    <span className="text-[#00FF88] block">
                      Within 4 Hours (Business Days)
                    </span>
                  </div>
                  <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-pulse" />
                </div>
              </div>
            </div>

            {/* Social Channels */}
            <div className="space-y-4">
              <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                03 — ARCHIVE BROADCASTS
              </span>
              <div className="flex items-center gap-3 font-mono text-xs">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-sm hover:border-[#00FF88] text-neutral-300 hover:text-white transition-all"
                >
                  INSTAGRAM ↗
                </a>
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-sm hover:border-[#00FF88] text-neutral-300 hover:text-white transition-all"
                >
                  TIKTOK ↗
                </a>
                <a
                  href="https://x.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-white/[0.04] border border-white/10 rounded-sm hover:border-[#00FF88] text-neutral-300 hover:text-white transition-all"
                >
                  X (TWITTER) ↗
                </a>
              </div>
            </div>
          </div>

          {/* RIGHT: INQUIRY SUBMISSION FORM */}
          <div className="lg:col-span-7 bg-[#0C0C0C] border border-white/10 p-8 sm:p-10 rounded-sm space-y-8">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono uppercase tracking-[0.2em] text-[#00FF88]">
                  DISPATCH TRANSMISSION
                </span>
                <span className="text-[10px] font-mono text-neutral-500">ENCRYPTED</span>
              </div>
              <h2 className="text-2xl font-black uppercase text-white tracking-tight">
                SUBMIT A COMMISSION OR INQUIRY
              </h2>
            </div>

            {/* Type selector tabs */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-mono text-xs">
              {[
                { id: "commission", label: "BESPOKE BUILD" },
                { id: "trade-in", label: "TRADE-IN TECH" },
                { id: "general", label: "STUDIO INFO" },
                { id: "press", label: "PRESS / EXHIBIT" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setInquiryType(tab.id as any)}
                  className={`p-3 text-[11px] uppercase tracking-wider rounded-sm border transition-all text-center ${
                    inquiryType === tab.id
                      ? "bg-white text-black border-white font-bold"
                      : "bg-white/[0.02] border-white/10 text-neutral-400 hover:text-white"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {submitted ? (
              <div className="p-8 border border-[#00FF88]/40 bg-[#00FF88]/5 rounded-sm space-y-4 text-center font-mono">
                <span className="w-3 h-3 rounded-full bg-[#00FF88] inline-block animate-ping" />
                <h3 className="text-lg font-bold uppercase text-white">
                  TRANSMISSION RECEIVED AT LAGOS BENCH
                </h3>
                <p className="text-xs text-neutral-300 max-w-md mx-auto leading-relaxed">
                  Thank you, {formData.fullName}. A senior restoration engineer will review your specifications and reply via {formData.email} within 4 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-widest rounded-sm hover:bg-[#00FF88] transition-colors"
                >
                  SEND ANOTHER MESSAGE
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 font-mono text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="Adeyemi Adeleke"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="adeyemi@studio.ng"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      placeholder="+234 803 555 0192"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-neutral-400 uppercase tracking-wider block">Device / Target Hardware</label>
                    <input
                      type="text"
                      placeholder="e.g. Game Boy Advance or iPod 5.5th"
                      value={formData.deviceModel}
                      onChange={(e) => setFormData({ ...formData, deviceModel: e.target.value })}
                      className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-neutral-400 uppercase tracking-wider block">Message / Specifications *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Describe your desired shell modifications, screen upgrade requirements, or the condition of the hardware you wish to submit..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-white/[0.03] border border-white/10 p-3 text-white rounded-sm focus:border-[#00FF88] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#00FF88] transition-all rounded-sm shadow-xl"
                >
                  TRANSMIT TO BENCH →
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FREQUENTLY ASKED QUESTIONS */}
        <section className="space-y-8 border-t border-white/10 pt-16">
          <div className="space-y-2">
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              STUDIO PROTOCOL FAQ
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white tracking-tight">
              FREQUENT INQUIRIES
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-mono text-xs">
            <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-3">
              <h3 className="text-sm font-bold text-white uppercase">
                Can I send in my childhood device?
              </h3>
              <p className="text-neutral-400 leading-relaxed font-normal">
                Yes. Our bespoke mail-in restoration program accepts personal consoles and vintage electronics. We document every step from ultrasonic bath to final testing.
              </p>
            </div>

            <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-3">
              <h3 className="text-sm font-bold text-white uppercase">
                How long does a restoration take?
              </h3>
              <p className="text-neutral-400 leading-relaxed font-normal">
                Typical bench time is 14 to 21 business days, which includes descaling, precision recapping, display calibration, and 48-hour continuous stress testing.
              </p>
            </div>

            <div className="p-6 bg-[#0C0C0C] border border-white/10 rounded-sm space-y-3">
              <h3 className="text-sm font-bold text-white uppercase">
                What warranty do you provide?
              </h3>
              <p className="text-neutral-400 leading-relaxed font-normal">
                Every Repurposed Tech piece comes with our 1-Year Comprehensive Studio Warranty and signed serial certification plate.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
