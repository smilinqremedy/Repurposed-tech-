import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "available" | "low-stock" | "sold-out" | "coming-soon" | "limited" | "edition" | "neutral" | "accent";
  className?: string;
  size?: "sm" | "md";
}

export function Badge({
  children,
  variant = "neutral",
  className = "",
  size = "sm",
}: BadgeProps) {
  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs";

  const variantClasses = {
    available: "bg-[#00FF88]/10 text-[#00FF88] border-[#00FF88]/30",
    limited: "bg-[#00FF88]/15 text-[#00FF88] border-[#00FF88]/40",
    "low-stock": "bg-[#F59E0B]/10 text-[#F59E0B] border-[#F59E0B]/30",
    "coming-soon": "bg-cyan-500/10 text-cyan-400 border-cyan-500/30",
    "sold-out": "bg-neutral-800 text-neutral-400 border-neutral-700",
    edition: "bg-white/[0.04] text-[#F5F5F0] border-white/10 font-mono tracking-widest",
    neutral: "bg-white/[0.03] text-neutral-300 border-white/10",
    accent: "bg-white text-black border-white font-medium",
  }[variant];

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 uppercase font-mono tracking-wider border rounded-sm",
        sizeClasses,
        variantClasses,
        className
      )}
    >
      {(variant === "available" || variant === "limited") && <span className="w-1.5 h-1.5 rounded-full bg-[#00FF88] animate-pulse" />}
      {variant === "low-stock" && <span className="w-1.5 h-1.5 rounded-full bg-[#F59E0B]" />}
      {variant === "coming-soon" && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
      {children}
    </span>
  );
}
