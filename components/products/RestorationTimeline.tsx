import React from "react";
import Image from "next/image";

interface Stage {
  stage: "FOUND" | "DISASSEMBLED" | "RESTORED" | "UPGRADED" | "TESTED" | "REBORN";
  title: string;
  description: string;
  image: string;
}

interface RestorationTimelineProps {
  stages: Stage[];
  storyQuote?: string;
}

export function RestorationTimeline({ stages, storyQuote }: RestorationTimelineProps) {
  if (!stages || stages.length === 0) return null;

  const stageColors: Record<string, string> = {
    FOUND: "text-[#F59E0B] border-[#F59E0B]/30 bg-[#F59E0B]/10",
    DISASSEMBLED: "text-neutral-300 border-neutral-600 bg-neutral-800",
    RESTORED: "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
    UPGRADED: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    TESTED: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    REBORN: "text-[#00FF88] border-[#00FF88]/30 bg-[#00FF88]/10",
  };

  return (
    <section className="py-12 border-t border-white/10 space-y-10">
      {/* SECTION HEADER */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#00FF88]" />
          <span className="text-xs font-mono uppercase tracking-[0.25em] text-[#00FF88]">
            THE RESTORATION ARCHIVE
          </span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-medium tracking-tight text-[#F5F5F0]">
          FROM NEGLECTED ARTIFACT TO COMMISSIONED MASTERPIECE
        </h2>
        {storyQuote && (
          <p className="text-sm italic text-neutral-400 border-l-2 border-[#00FF88] pl-4 py-1 leading-relaxed max-w-3xl">
            "{storyQuote}"
          </p>
        )}
      </div>

      {/* TIMELINE GRID / STEPS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stages.map((stage, idx) => (
          <div
            key={idx}
            className="group bg-[#0D0D0D] border border-white/10 rounded-sm overflow-hidden flex flex-col justify-between hover:border-white/25 transition-all duration-300"
          >
            {/* STAGE IMAGE */}
            <div className="relative aspect-[16/10] w-full bg-[#141414] overflow-hidden">
              <Image
                src={stage.image}
                alt={stage.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3">
                <span
                  className={`px-2 py-0.5 text-[10px] font-mono tracking-widest uppercase border rounded-sm ${
                    stageColors[stage.stage] || "text-white border-white/20"
                  }`}
                >
                  {stage.stage}
                </span>
              </div>
            </div>

            {/* STAGE DETAILS */}
            <div className="p-5 flex-1 flex flex-col justify-between space-y-2.5">
              <h4 className="text-sm font-medium text-[#F5F5F0] tracking-tight">
                {stage.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {stage.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
