"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles, CheckCircle2, ChevronDown } from "lucide-react";
import { ALL_PROGRAMS_DATA } from "@/lib/programsData";

export function InteractiveProgramShowcase() {
  return (
    <section id="programs" className="w-full py-20 md:py-28 bg-[#FAFAFA] border-b border-stone-200 scroll-mt-20 overflow-hidden">
      <div className="container-custom">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-12 md:mb-16 text-left"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold uppercase tracking-wider mb-4">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Our Core Programs</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Targeted Programs For Every Stage of Need.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Hover over any program card to reveal in-depth clinical blueprints, field records, and community impact. Click to open the dedicated program page.
          </p>
        </motion.div>

        {/* Programs Grid - Standard Sized Full Image Cards with Fluid Slide-Down Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7 lg:gap-8">
          {ALL_PROGRAMS_DATA.map((prog, index) => {
            // Checkerboard zig-zag for the sliding detail overlay:
            // Row 0: Cream, Dark
            // Row 1: Dark,  Cream
            const row = Math.floor(index / 2);
            const col = index % 2;
            const isCream = (row + col) % 2 === 0;
            const isLeft = col === 0;

            return (
              <motion.div
                key={prog.slug}
                initial={{ opacity: 0, x: isLeft ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.85,
                  ease: [0.16, 1, 0.3, 1],
                  delay: (index % 2) * 0.12
                }}
                className="w-full"
              >
                <Link
                  href={`/programs/${prog.slug}`}
                  className="group relative w-full h-[470px] sm:h-[490px] rounded-2xl sm:rounded-3xl overflow-hidden shadow-md transition-all duration-500 ease-out hover:-translate-y-1.5 hover:shadow-2xl cursor-pointer border border-stone-200/90 block bg-slate-900"
                >
                {/* 1. Full-Bleed Background Image (Preserved HD Quality) */}
                <Image
                  src={prog.coverImage}
                  alt={prog.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  quality={95}
                  priority={index < 2}
                  className="object-cover object-center transition-transform duration-1000 ease-out group-hover:scale-108"
                />

                {/* 2. Resting State Vignette & Bottom Info (Visible before hover) */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent flex flex-col justify-end p-6 sm:p-8 transition-opacity duration-300 group-hover:opacity-0 pointer-events-none z-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="inline-block text-[11px] font-black tracking-widest text-amber-400 uppercase">
                      {prog.categoryEyebrow}
                    </span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-heading font-black text-white tracking-tight leading-tight mb-2">
                    {prog.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-300 line-clamp-2 mb-3 leading-relaxed">
                    {prog.shortDescription}
                  </p>
                  <div className="flex items-center justify-between pt-3 border-t border-white/20 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-200">
                    <div className="flex items-center gap-1.5 text-amber-300">
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                      <span>{prog.statMetric}</span>
                    </div>
                    <span className="inline-flex items-center gap-1 text-[11px] text-white/80 font-semibold lowercase">
                      hover for full details <ChevronDown className="w-3.5 h-3.5 animate-bounce" />
                    </span>
                  </div>
                </div>

                {/* 3. Top Slide-Down Full Coverage Overlay (Slow, Fluid, Dense & Well-Balanced) */}
                <div
                  className={`absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-7 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] -translate-y-full group-hover:translate-y-0 ${
                    isCream
                      ? "bg-[#FAF6F0]/98 text-slate-900 backdrop-blur-md border-b-4 border-amber-500"
                      : "bg-[#0F1115]/98 text-white backdrop-blur-md border-b-4 border-amber-400"
                  }`}
                >
                  {/* Top Bar inside Overlay */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-3">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-[10px] sm:text-[11px] font-black tracking-wider uppercase border ${
                          isCream
                            ? "bg-amber-100 text-amber-900 border-amber-300"
                            : "bg-white/10 text-amber-300 border-white/20"
                        }`}
                      >
                        {prog.categoryEyebrow}
                      </span>
                      <div
                        className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-105 ${
                          isCream
                            ? "bg-slate-900 text-white"
                            : "bg-amber-400 text-slate-950"
                        }`}
                      >
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>

                    {/* High-Contrast Title & Description */}
                    <div>
                      <h3
                        className={`text-2xl sm:text-[26px] font-heading font-black tracking-tight leading-tight mb-1.5 ${
                          isCream ? "text-slate-950" : "text-white"
                        }`}
                      >
                        {prog.title}
                      </h3>
                      <p
                        className={`text-xs sm:text-[13px] leading-relaxed line-clamp-2 ${
                          isCream ? "text-slate-700" : "text-stone-300"
                        }`}
                      >
                        {prog.shortDescription}
                      </p>
                    </div>

                    {/* Feature Chips / Tags */}
                    {prog.tags && prog.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-0.5">
                        {prog.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className={`text-[11px] font-bold px-2.5 py-0.5 rounded-md border ${
                              isCream
                                ? "bg-amber-500/10 text-amber-950 border-amber-400/30"
                                : "bg-white/10 text-stone-200 border-white/15"
                            }`}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}

                    {/* Key Highlights / Pillars */}
                    <div className="space-y-1.5 pt-1">
                      {prog.pillars.slice(0, 3).map((pillar, pIdx) => (
                        <div key={pIdx} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                          <span
                            className={`font-semibold line-clamp-1 ${
                              isCream ? "text-slate-800" : "text-stone-200"
                            }`}
                          >
                            {pillar.title}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* 3-Column Micro-Stats Grid - Fills Empty Space with High-Value Context */}
                    {prog.statsSummary && prog.statsSummary.length > 0 && (
                      <div
                        className={`grid grid-cols-3 gap-2 p-2.5 rounded-xl border mt-2 ${
                          isCream
                            ? "bg-stone-100/90 border-stone-200"
                            : "bg-white/[0.05] border-white/10"
                        }`}
                      >
                        {prog.statsSummary.map((stat, sIdx) => (
                          <div key={sIdx} className="text-center">
                            <div
                              className={`text-sm sm:text-base font-black tracking-tight leading-tight ${
                                isCream ? "text-slate-900" : "text-amber-400"
                              }`}
                            >
                              {stat.val}
                            </div>
                            <div
                              className={`text-[9px] sm:text-[10px] font-bold uppercase tracking-wider line-clamp-1 mt-0.5 ${
                                isCream ? "text-slate-600" : "text-stone-400"
                              }`}
                            >
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Bottom Action Area: Compels User to Click */}
                  <div
                    className={`pt-3 border-t flex flex-col gap-2.5 mt-2 ${
                      isCream ? "border-slate-900/15" : "border-white/15"
                    }`}
                  >
                    <div
                      className={`flex items-center justify-between text-[11px] sm:text-xs font-black tracking-wider uppercase ${
                        isCream ? "text-slate-900" : "text-amber-400"
                      }`}
                    >
                      <span className="opacity-80">Impact Metric</span>
                      <span>{prog.statMetric}</span>
                    </div>

                    {/* High-Converting Click Prompt Button */}
                    <div
                      className={`w-full py-2.5 sm:py-3 px-5 rounded-xl font-black text-xs sm:text-sm tracking-wide uppercase flex items-center justify-between shadow-md transition-all group-hover:scale-[1.01] ${
                        isCream
                          ? "bg-slate-900 text-white group-hover:bg-amber-500 group-hover:text-slate-950"
                          : "bg-amber-400 text-slate-950 group-hover:bg-white group-hover:text-slate-950"
                      }`}
                    >
                      <span>Explore Dedicated Page</span>
                      <ArrowUpRight className="w-4 h-4 shrink-0" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          );
        })}
        </div>
      </div>
    </section>
  );
}
