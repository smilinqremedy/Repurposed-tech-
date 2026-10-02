"use client";

import React, { use, useState } from "react";
import Link from "next/link";
import { formatNaira } from "@/lib/currency";

interface SuccessPageProps {
  searchParams: Promise<{ orderNumber?: string }>;
}

export default function OrderSuccessPage({ searchParams }: SuccessPageProps) {
  const resolvedParams = use(searchParams);
  const orderNumber = resolvedParams.orderNumber || "RT-001";
  const [trackingModalOpen, setTrackingModalOpen] = useState(false);

  return (
    <div className="pt-28 pb-24 bg-[#080808] min-h-screen">
      {/* Tracking Modal */}
      {trackingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="w-full max-w-lg bg-[#111111] border border-white/15 p-6 rounded-sm space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-white/10">
              <span className="text-xs font-mono uppercase tracking-widest text-[#00FF88]">
                DISPATCH TELEMETRY • {orderNumber}
              </span>
              <button
                onClick={() => setTrackingModalOpen(false)}
                className="text-neutral-400 hover:text-white text-xs font-mono"
              >
                ESC ✕
              </button>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/[0.03] border border-white/10 rounded-sm">
                <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
                  CURRENT LOCATION
                </span>
                <p className="text-sm font-bold text-white font-mono mt-0.5">
                  REPURPOSED TECH CLEANROOM BENCH, LEKKI, LAGOS
                </p>
                <p className="text-xs text-[#00FF88] font-mono mt-1">
                  STATUS: Final thermal scan & certificate sealing complete.
                </p>
              </div>

              {/* Steps timeline */}
              <div className="space-y-3 font-mono text-xs pl-2 border-l border-white/20">
                <div className="relative pl-4 text-white">
                  <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
                  <span className="font-bold">PAYMENT CONFIRMED VIA PAYSTACK</span>
                  <p className="text-[10px] text-neutral-500">OCTOBER 02, 2026 • 15:30</p>
                </div>
                <div className="relative pl-4 text-white">
                  <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-[#00FF88]" />
                  <span className="font-bold">QUALITY ASSURANCE CALIBRATION</span>
                  <p className="text-[10px] text-neutral-500">IN PROGRESS • PASS</p>
                </div>
                <div className="relative pl-4 text-neutral-500">
                  <span className="absolute -left-[17px] top-1 w-2.5 h-2.5 rounded-full bg-neutral-700" />
                  <span>WHITE GLOVE COURIER HANDOFF</span>
                  <p className="text-[10px]">SCHEDULED TOMORROW 09:00 AM</p>
                </div>
              </div>
            </div>

            <button
              onClick={() => setTrackingModalOpen(false)}
              className="w-full py-3 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00FF88]"
            >
              CLOSE TELEMETRY
            </button>
          </div>
        </div>
      )}

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Confirmed Banner */}
        <div className="text-center space-y-4 border-b border-white/10 pb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00FF88]/10 border border-[#00FF88]/30">
            <span className="w-2 h-2 rounded-full bg-[#00FF88] animate-ping" />
            <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
              ORDER CONFIRMED
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-[#F5F5F0]">
            YOUR MACHINE HAS A NEW HOME.
          </h1>

          <p className="text-base text-neutral-400 font-mono tracking-wide max-w-lg mx-auto">
            Payment successfully processed. Your restored piece is being prepared for safe dispatch in custom flight padding.
          </p>
        </div>

        {/* Order Details Card */}
        <div className="bg-[#0C0C0C] border border-white/15 p-8 rounded-sm space-y-6 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-500 block">
                ORDER REFERENCE NUMBER
              </span>
              <span className="text-2xl font-mono font-bold text-white tracking-widest">
                {orderNumber}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-[#00FF88]/10 border border-[#00FF88]/40 text-[#00FF88] text-xs font-mono uppercase tracking-wider rounded-sm">
                PAYMENT CONFIRMED
              </span>
              <span className="px-3 py-1 bg-white/[0.04] border border-white/10 text-neutral-300 text-xs font-mono uppercase tracking-wider rounded-sm">
                EDITION RESERVED
              </span>
            </div>
          </div>

          {/* Delivery Timeline Graphic */}
          <div className="space-y-4 py-4">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 block">
              COMMISSION DISPATCH TIMELINE
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs font-mono">
              <div className="p-3 bg-white/[0.04] border-l-2 border-[#00FF88] rounded-sm space-y-1">
                <span className="text-[#00FF88] font-bold block">01 • CONFIRMED</span>
                <p className="text-neutral-400 text-[11px]">Payment authorized</p>
              </div>
              <div className="p-3 bg-white/[0.04] border-l-2 border-[#00FF88] rounded-sm space-y-1">
                <span className="text-[#00FF88] font-bold block">02 • BENCH QC</span>
                <p className="text-neutral-400 text-[11px]">Final voltage testing</p>
              </div>
              <div className="p-3 bg-white/[0.01] border-l-2 border-white/20 rounded-sm space-y-1">
                <span className="text-neutral-400 block">03 • DISPATCH</span>
                <p className="text-neutral-500 text-[11px]">White glove pickup</p>
              </div>
              <div className="p-3 bg-white/[0.01] border-l-2 border-white/20 rounded-sm space-y-1">
                <span className="text-neutral-400 block">04 • DELIVERED</span>
                <p className="text-neutral-500 text-[11px]">Direct handover</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
            <button
              onClick={() => setTrackingModalOpen(true)}
              className="w-full sm:w-auto px-8 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#00FF88] transition-colors rounded-sm shadow-xl"
            >
              TRACK ORDER →
            </button>

            <Link
              href="/"
              className="text-xs font-mono uppercase tracking-widest text-neutral-400 hover:text-white"
            >
              RETURN TO ARCHIVE HOME
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
