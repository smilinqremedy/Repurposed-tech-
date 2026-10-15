"use client";

import React, { useState } from "react";
import { useAudio } from "@/lib/audioContext";

export function RetroAudioPlayer() {
  const {
    soundEnabled,
    toggleSound,
    ambientActive,
    toggleAmbient,
    activeSample,
    playHardwareSample,
    playClick,
  } = useAudio();

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="fixed bottom-6 left-6 z-40 font-mono text-xs select-none">
      {/* EXPANDED SOUNDBOARD PANEL */}
      {isExpanded && (
        <div className="mb-2 p-4 bg-[#0F0F0F] border border-white/15 rounded-sm shadow-2xl w-80 space-y-4 animate-in fade-in slide-in-from-bottom-2 backdrop-blur-md">
          {/* Header */}
          <div className="flex items-center justify-between pb-2 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full ${ambientActive ? "bg-[#00FF88] animate-pulse" : "bg-neutral-600"}`} />
              <span className="text-[10px] uppercase tracking-widest text-neutral-300 font-bold">
                BENCH ACOUSTIC CONSOLE
              </span>
            </div>
            <button
              onClick={() => {
                playClick("light");
                setIsExpanded(false);
              }}
              className="text-[10px] text-neutral-500 hover:text-white"
            >
              ESC ✕
            </button>
          </div>

          {/* Ambient Tape Section */}
          <div className="p-3 bg-black/60 border border-white/5 rounded-sm space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-neutral-400 uppercase tracking-wider">
                ATELIER TAPE DECK
              </span>
              <span className="text-[9px] text-[#00FF88] uppercase">
                {ambientActive ? "WARM LO-FI ACTIVE" : "STANDBY"}
              </span>
            </div>
            <p className="text-[10px] text-neutral-500 leading-relaxed">
              Warm 55Hz analog bias drone & tape saturation recorded at the Lagos studio cleanroom.
            </p>
            <button
              onClick={() => {
                playClick("toggle");
                toggleAmbient();
              }}
              className={`w-full py-2 px-3 text-[10px] uppercase font-bold tracking-widest rounded-sm border transition-all flex items-center justify-center gap-2 ${
                ambientActive
                  ? "bg-[#00FF88] text-black border-[#00FF88]"
                  : "bg-white/[0.05] text-white border-white/10 hover:border-white/30"
              }`}
            >
              <span>{ambientActive ? "⏸ PAUSE ATELIER TAPE" : "▶ PLAY ATELIER TAPE LOOP"}</span>
            </button>
          </div>

          {/* Hardware Acoustic Benchmark Suite */}
          <div className="space-y-2">
            <span className="text-[10px] text-neutral-400 uppercase tracking-wider block">
              HARDWARE ACOUSTIC BENCHMARKS
            </span>
            <div className="grid grid-cols-2 gap-1.5">
              <button
                onClick={() => playHardwareSample("chiptune")}
                className={`p-2 text-left bg-white/[0.02] hover:bg-white/[0.06] border rounded-sm transition-colors ${
                  activeSample === "chiptune" ? "border-[#00FF88] text-[#00FF88]" : "border-white/5 text-neutral-300"
                }`}
              >
                <span className="text-[10px] font-bold block">GBC CHIPTUNE</span>
                <span className="text-[9px] text-neutral-500 block">Pulse Arpeggio</span>
              </button>

              <button
                onClick={() => playHardwareSample("wolfson")}
                className={`p-2 text-left bg-white/[0.02] hover:bg-white/[0.06] border rounded-sm transition-colors ${
                  activeSample === "wolfson" ? "border-[#00FF88] text-[#00FF88]" : "border-white/5 text-neutral-300"
                }`}
              >
                <span className="text-[10px] font-bold block">WOLFSON DAC</span>
                <span className="text-[9px] text-neutral-500 block">Analog Warmth</span>
              </button>

              <button
                onClick={() => playHardwareSample("thock")}
                className={`p-2 text-left bg-white/[0.02] hover:bg-white/[0.06] border rounded-sm transition-colors ${
                  activeSample === "thock" ? "border-[#00FF88] text-[#00FF88]" : "border-white/5 text-neutral-300"
                }`}
              >
                <span className="text-[10px] font-bold block">KEYBOARD THOCK</span>
                <span className="text-[9px] text-neutral-500 block">180Hz Brass Plate</span>
              </button>

              <button
                onClick={() => playHardwareSample("shutter")}
                className={`p-2 text-left bg-white/[0.02] hover:bg-white/[0.06] border rounded-sm transition-colors ${
                  activeSample === "shutter" ? "border-[#00FF88] text-[#00FF88]" : "border-white/5 text-neutral-300"
                }`}
              >
                <span className="text-[10px] font-bold block">RANGEFINDER</span>
                <span className="text-[9px] text-neutral-500 block">1974 Leaf Shutter</span>
              </button>

              <button
                onClick={() => playHardwareSample("cyberdeck")}
                className={`p-2 text-left bg-white/[0.02] hover:bg-white/[0.06] border rounded-sm transition-colors ${
                  activeSample === "cyberdeck" ? "border-[#00FF88] text-[#00FF88]" : "border-white/5 text-neutral-300"
                }`}
              >
                <span className="text-[10px] font-bold block">CYBERDECK</span>
                <span className="text-[9px] text-neutral-500 block">Avionics Telemetry</span>
              </button>

              <button
                onClick={() => playHardwareSample("braun")}
                className={`p-2 text-left bg-white/[0.02] hover:bg-white/[0.06] border rounded-sm transition-colors ${
                  activeSample === "braun" ? "border-[#00FF88] text-[#00FF88]" : "border-white/5 text-neutral-300"
                }`}
              >
                <span className="text-[10px] font-bold block">BRAUN ATELIER</span>
                <span className="text-[9px] text-neutral-500 block">Pure 440Hz Sine</span>
              </button>
            </div>
          </div>

          {/* Master SFX Toggle */}
          <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[10px]">
            <span className="text-neutral-500 uppercase">TACTILE SOUND EFFECTS</span>
            <button
              onClick={() => toggleSound()}
              className={`px-2 py-1 rounded-sm border uppercase font-bold tracking-wider ${
                soundEnabled
                  ? "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30"
                  : "bg-white/[0.04] text-neutral-500 border-white/10"
              }`}
            >
              {soundEnabled ? "SFX: ACTIVE" : "SFX: MUTED"}
            </button>
          </div>
        </div>
      )}

      {/* MINIMIZED FLOATING PILL BAR */}
      <div className="flex items-center gap-2 p-1.5 bg-[#0C0C0C]/90 backdrop-blur-md border border-white/15 rounded-full shadow-2xl hover:border-white/30 transition-all">
        {/* Equalizer Wave Bars */}
        <div
          onClick={() => {
            playClick("light");
            setIsExpanded(!isExpanded);
          }}
          className="flex items-center gap-1 pl-3 pr-2 py-1 cursor-pointer group"
          title="Open Acoustic Console"
        >
          <div className="flex items-end gap-0.5 h-3.5 w-4">
            <span
              className={`w-0.5 bg-[#00FF88] rounded-full transition-all duration-150 ${
                ambientActive || activeSample ? "h-3 animate-pulse" : "h-1"
              }`}
            />
            <span
              className={`w-0.5 bg-[#00FF88] rounded-full transition-all duration-150 ${
                ambientActive || activeSample ? "h-3.5 animate-bounce" : "h-2"
              }`}
            />
            <span
              className={`w-0.5 bg-[#00FF88] rounded-full transition-all duration-150 ${
                ambientActive || activeSample ? "h-2 animate-pulse" : "h-1.5"
              }`}
            />
          </div>

          <span className="text-[10px] tracking-wider font-bold uppercase text-neutral-300 group-hover:text-white">
            {activeSample ? (
              <span className="text-[#00FF88] uppercase">AUDITIONING...</span>
            ) : ambientActive ? (
              <span className="text-[#00FF88]">TAPE PLAYING</span>
            ) : (
              "ATELIER AUDIO"
            )}
          </span>
        </div>

        {/* Ambient Play/Pause Quick Button */}
        <button
          onClick={() => {
            playClick("toggle");
            toggleAmbient();
          }}
          aria-label="Toggle ambient workbench audio"
          className={`p-1.5 rounded-full text-[10px] transition-colors ${
            ambientActive
              ? "bg-[#00FF88] text-black"
              : "bg-white/[0.08] text-neutral-300 hover:text-white"
          }`}
          title={ambientActive ? "Pause Atelier Tape" : "Play Atelier Tape"}
        >
          {ambientActive ? (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>

        {/* SFX Mute/Unmute Quick Toggle */}
        <button
          onClick={() => toggleSound()}
          aria-label="Toggle tactile sound effects"
          className={`p-1.5 rounded-full text-[10px] transition-colors ${
            soundEnabled
              ? "text-neutral-300 hover:text-white"
              : "text-red-400 bg-red-500/10"
          }`}
          title={soundEnabled ? "Mute Tactile SFX" : "Enable Tactile SFX"}
        >
          {soundEnabled ? (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
          ) : (
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
