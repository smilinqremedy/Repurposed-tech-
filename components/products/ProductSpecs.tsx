import React from "react";

interface SpecItem {
  label: string;
  value: string;
}

interface ProductSpecsProps {
  specifications: SpecItem[];
}

export function ProductSpecs({ specifications }: ProductSpecsProps) {
  if (!specifications || specifications.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 pb-2 border-b border-white/10">
        <span className="w-1.5 h-1.5 bg-[#00FF88] rounded-full" />
        <h3 className="text-xs uppercase font-mono tracking-[0.25em] text-[#F5F5F0] font-semibold">
          TECHNICAL SPECIFICATIONS
        </h3>
      </div>

      <div className="divide-y divide-white/5 border border-white/10 rounded-sm bg-[#0C0C0C] overflow-hidden">
        {specifications.map((spec, index) => (
          <div
            key={index}
            className="flex flex-col sm:flex-row sm:items-center justify-between p-3.5 sm:px-5 text-xs font-mono gap-1 hover:bg-white/[0.02] transition-colors"
          >
            <span className="text-neutral-400 uppercase tracking-wider text-[11px] sm:w-1/3">
              {spec.label}
            </span>
            <span className="text-[#F5F5F0] font-normal sm:w-2/3 sm:text-right">
              {spec.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
