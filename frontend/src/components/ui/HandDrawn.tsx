"use client";

import { motion } from "framer-motion";

export function HandUnderline({ className = "text-[#F5A524] w-36 h-3" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 200 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`inline-block ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d="M3 11.5C45 4.5 145 2.5 197 12.5C135 7.5 60 9 15 14"
        stroke="currentColor"
        strokeWidth="3.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export function HandCircle({ className = "text-[#0F8B8D]" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 120 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      aria-hidden="true"
    >
      <motion.path
        d="M10 24C10 11 34 5 62 5C95 5 114 12 114 24C114 36 90 43 58 43C28 43 6 36 6 24C6 16 20 8 44 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      />
    </svg>
  );
}

export function HandDrawnBadge({ label, sublabel }: { label: string; sublabel?: string }) {
  return (
    <div className="relative inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E0] border border-[#F5A524]/40 text-[#8B4500]">
      <span className="w-2 h-2 rounded-full bg-[#F5A524] animate-pulse" />
      <span className="text-xs font-bold uppercase tracking-wider">{label}</span>
      {sublabel && <span className="text-xs font-medium opacity-80">({sublabel})</span>}
    </div>
  );
}
