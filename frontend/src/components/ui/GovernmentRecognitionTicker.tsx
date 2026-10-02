"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Building2, Users, Calendar, Activity, Heart, ArrowUpRight, Sparkles } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function GovernmentRecognitionTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

  const stats = [
    {
      index: "01",
      value: 12000,
      suffix: "+",
      prefix: "",
      title: "Children Rehabilitated",
      desc: "Specialized pediatric clinical care across Varanasi & rural UP since 1991.",
      icon: Users,
      fromDirection: "top", // animates from top
      xPct: 15,
      yPct: 75,
    },
    {
      index: "02",
      value: 35,
      suffix: "+ Yrs",
      prefix: "",
      title: "Grassroots Clinical Legacy",
      desc: "First non-profit clinical psychology & diagnostic setup in Eastern UP.",
      icon: Calendar,
      fromDirection: "bottom", // animates from bottom
      xPct: 42,
      yPct: 52,
    },
    {
      index: "03",
      value: 21,
      suffix: "",
      prefix: "All ",
      title: "RPwD Categories Supported",
      desc: "Autism, Cerebral Palsy, Down Syndrome, and multi-sensory conditions.",
      icon: Activity,
      fromDirection: "top", // animates from top
      xPct: 70,
      yPct: 35,
    },
    {
      index: "04",
      value: 100,
      suffix: "%",
      prefix: "",
      title: "Free Therapy For Needy",
      desc: "Zero-fee clinical support backed by 80G tax-exempted sponsorships.",
      icon: Heart,
      fromDirection: "bottom", // animates from bottom
      xPct: 92,
      yPct: 15,
    },
  ];

  const honors = [
    { title: "UP Chief Minister State Award", desc: "Best Professional Psychologist (2019)", icon: Award },
    { title: "Ministry of Home Affairs", desc: "FCRA Registered NGO for International Aid", icon: ShieldCheck },
    { title: "Income Tax Department", desc: "100% Tax Exemption (80G & 12A Verified)", icon: CheckCircle2 },
    { title: "National Trust of India", desc: "Statutory Autism, CP & MR Institute", icon: Building2 },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full py-16 md:py-24 bg-[#FAF8F5] border-b border-[#EADCCB] relative overflow-hidden select-none"
    >
      {/* Background Subtle Organic Gradient */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom space-y-14 relative z-10">
        
        {/* Section Header (Centered, Anti-Slop, Refined Scroll Entrance) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-3.5">
            <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A5B32]">
              Clinical Scale & Proven Impact
            </span>
            <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Our Care Journey & Milestones.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2.5 leading-relaxed max-w-2xl mx-auto">
            Measuring three and a half decades of scientific rehabilitation, legal accountability, and life-changing human breakthroughs.
          </p>
        </motion.div>

        {/* 1. DESKTOP: Sinuous Curved Graph Journey (Replaces rectangular AI blocks) */}
        <div className="hidden lg:block relative w-full h-[420px] my-6">
          
          {/* Curved SVG Trajectory Line with Arrowhead */}
          <svg
            className="absolute inset-0 w-full h-full overflow-visible pointer-events-none"
            viewBox="0 0 1100 360"
            fill="none"
          >
            <defs>
              <linearGradient id="curveGradient" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#B85D19" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#D97706" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#9A5B32" stopOpacity="1" />
              </linearGradient>
              <marker
                id="arrowhead"
                markerWidth="12"
                markerHeight="12"
                refX="8"
                refY="6"
                orient="auto"
              >
                <path d="M2,2 L10,6 L2,10 L4,6 Z" fill="#9A5B32" />
              </marker>
            </defs>

            {/* Sinuous Curved Path */}
            <motion.path
              d="M 60,300 C 180,310 240,240 380,210 C 520,180 620,150 750,110 C 880,70 960,50 1060,40"
              stroke="url(#curveGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              fill="none"
              markerEnd="url(#arrowhead)"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={isInView ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
              transition={{ duration: 2.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Dashed Shadow Path for Depth */}
            <motion.path
              d="M 60,300 C 180,310 240,240 380,210 C 520,180 620,150 750,110 C 880,70 960,50 1060,40"
              stroke="#D97706"
              strokeWidth="1"
              strokeDasharray="6 6"
              strokeOpacity="0.3"
              fill="none"
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1.5, delay: 0.8 }}
            />
          </svg>

          {/* 4 Graph Milestone Nodes with Top/Bottom Countdown Animation */}
          <div className="relative w-full h-full">
            {stats.map((item, idx) => {
              const Icon = item.icon;
              const isFromTop = item.fromDirection === "top";

              // Coordinates mapped along the sinuous curve
              const positions = [
                { left: "8%", top: "42%" },   // Milestone 1 (12,000+)
                { left: "34%", top: "25%" },  // Milestone 2 (35+ Yrs)
                { left: "62%", top: "12%" },  // Milestone 3 (All 21)
                { left: "84%", top: "0%" },   // Milestone 4 (100%)
              ];

              const pos = positions[idx];

              return (
                <div
                  key={idx}
                  style={{ left: pos.left, top: pos.top }}
                  className="absolute w-[240px] transform -translate-x-1/2"
                >
                  {/* Glowing Node Dot on the Line */}
                  <div className="flex items-center justify-center mb-3">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={isInView ? { scale: 1 } : { scale: 0 }}
                      transition={{ delay: 0.3 + idx * 0.2, type: "spring", stiffness: 200 }}
                      className="relative w-8 h-8 rounded-full bg-white border-4 border-amber-600 shadow-md flex items-center justify-center"
                    >
                      <span className="w-2 h-2 rounded-full bg-amber-600 animate-ping" />
                    </motion.div>
                  </div>

                  {/* Continuous Floating Bounce Micro-Motion on its place */}
                  <motion.div
                    animate={{
                      y: [0, -8, 0],
                    }}
                    transition={{
                      duration: 3.2 + (idx * 0.6),
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  >
                    {/* Stat Card Animating in from Top or Bottom on entrance */}
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: isFromTop ? -70 : 70, // Alternates from top and bottom
                      }}
                      animate={
                        isInView
                          ? { opacity: 1, y: 0 } // Settles into exact respective place
                          : { opacity: 0, y: isFromTop ? -70 : 70 }
                      }
                      transition={{
                        duration: 1.2,
                        delay: 0.4 + idx * 0.25,
                        ease: [0.16, 1, 0.3, 1],
                      }}
                      className="p-5 rounded-2xl bg-white/90 backdrop-blur-md border border-stone-200/90 shadow-lg hover:shadow-2xl hover:border-amber-400 transition-all duration-300 group"
                    >
                      {/* Top Row: Milestone Index & Icon */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-black uppercase tracking-wider text-amber-700 bg-amber-100/80 px-2 py-0.5 rounded-md border border-amber-200">
                          Milestone {item.index}
                        </span>
                        <Icon className="w-4 h-4 text-amber-600 group-hover:scale-110 transition-transform" />
                      </div>

                      {/* Big Countdown Number (Slowed down speed: duration 4.5s for majestic roll) */}
                      <div className="text-3xl font-heading font-black text-amber-700 tracking-tight leading-none my-2 group-hover:text-amber-600 transition-colors">
                        <AnimatedCounter
                          value={item.value}
                          prefix={item.prefix}
                          suffix={item.suffix}
                          duration={4.5}
                        />
                      </div>

                      {/* Label & Description */}
                      <h3 className="text-sm font-bold text-slate-900 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-1 leading-relaxed line-clamp-2">
                        {item.desc}
                      </p>
                    </motion.div>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 2. MOBILE & TABLET: Vertical Flowing Journey Timeline */}
        <div className="block lg:hidden relative pl-6 border-l-2 border-amber-400 space-y-6 my-6 ml-3">
          {stats.map((item, idx) => {
            const Icon = item.icon;
            const isFromTop = item.fromDirection === "top";

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30, y: isFromTop ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: idx * 0.15 }}
                className="relative p-5 rounded-2xl bg-white border border-stone-200 shadow-sm"
              >
                {/* Node on Line */}
                <div className="absolute -left-[31px] top-6 w-5 h-5 rounded-full bg-white border-3 border-amber-600 shadow-xs" />

                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-black uppercase tracking-wider text-amber-700 bg-amber-100 px-2 py-0.5 rounded-md">
                    Milestone {item.index}
                  </span>
                  <Icon className="w-4 h-4 text-amber-600" />
                </div>

                <div className="text-2xl sm:text-3xl font-heading font-black text-amber-700 leading-none my-1.5">
                  <AnimatedCounter
                    value={item.value}
                    prefix={item.prefix}
                    suffix={item.suffix}
                    duration={4.2}
                  />
                </div>

                <h3 className="text-sm font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* 3. Official Government Certifications Strip (Zig-Zag Staggered Floating Badges) */}
        <div className="pt-10 border-t border-[#E5E0D4] pb-6">
          <div className="text-center mb-8">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-widest bg-stone-100 px-3.5 py-1 rounded-full border border-stone-200 shadow-2xs">
              Institutional Accreditation & Statutory Recognition
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-center">
            {honors.map((h, i) => {
              const Icon = h.icon;
              const isOffset = i % 2 === 1;

              return (
                <motion.div
                  key={i}
                  animate={{
                    y: isOffset ? [10, 2, 10] : [-2, -10, -2],
                  }}
                  transition={{
                    duration: 3.6 + (i * 0.5),
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className={`p-4 rounded-2xl bg-white/95 border border-stone-200/90 shadow-sm flex items-center gap-3.5 hover:border-amber-400 hover:shadow-lg transition-all duration-300 ${
                    isOffset ? "lg:mt-6" : "lg:mb-6"
                  }`}
                >
                  <div className="p-2.5 rounded-xl bg-amber-50 text-amber-700 border border-amber-200 shrink-0 shadow-2xs">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {h.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight font-medium">
                      {h.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
