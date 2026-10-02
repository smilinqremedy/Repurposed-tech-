"use client";

import React, { useState } from "react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;
    setSubmitted(true);
  };

  return (
    <section className="py-24 bg-[#050505] border-t border-white/10 relative">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <div className="inline-flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
          <span className="text-[11px] font-mono uppercase tracking-[0.25em] text-[#00FF88]">
            COLLECTOR DISPATCH
          </span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black uppercase tracking-tight text-[#F5F5F0]">
          GET THE NEXT DROP BEFORE EVERYONE ELSE.
        </h2>

        <p className="text-sm text-neutral-400 font-mono tracking-wide max-w-xl mx-auto">
          Numbered pieces sell out in minutes. Private cipher keys and early access links are sent 60 minutes prior to public release.
        </p>

        {submitted ? (
          <div className="p-4 bg-[#00FF88]/10 border border-[#00FF88]/30 rounded-sm max-w-md mx-auto">
            <p className="text-xs font-mono text-[#00FF88] uppercase tracking-wider">
              YOU ARE ON THE DROP LIST. ACCESS GRANTED FOR DROP 002.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto pt-2">
            <input
              type="email"
              placeholder="COLLECTOR EMAIL ADDRESS..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 bg-white/[0.04] border border-white/15 px-4 py-3.5 text-xs font-mono text-[#F5F5F0] placeholder-neutral-500 rounded-sm focus:outline-none focus:border-[#00FF88] transition-colors"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-white text-black font-mono text-xs font-bold uppercase tracking-widest hover:bg-[#00FF88] transition-colors rounded-sm flex-shrink-0"
            >
              JOIN THE LIST
            </button>
          </form>
        )}

        <p className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest pt-2">
          NO SPAM. NO REPEATS. ONLY COMMISSIONS & DROP ANNOUNCEMENTS.
        </p>
      </div>
    </section>
  );
}
