"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Award, ShieldCheck, CheckCircle2, Building2, Users, Calendar, Activity, Heart } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";

export function GovernmentRecognitionTicker() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.25 });

  const stats = [
    {
      value: 12000,
      suffix: "+",
      prefix: "",
      label: "Children Rehabilitated",
      desc: "Specialized pediatric clinical care since 1991",
      icon: Users,
    },
    {
      value: 35,
      suffix: "+ Yrs",
      prefix: "",
      label: "Grassroots Clinical Legacy",
      desc: "First clinical psychology setup in Eastern UP",
      icon: Calendar,
    },
    {
      value: 21,
      suffix: "",
      prefix: "All ",
      label: "RPwD Disability Categories",
      desc: "Autism, CP, Down Syndrome & Multiple Disabilities",
      icon: Activity,
    },
    {
      value: 100,
      suffix: "%",
      prefix: "",
      label: "Free Therapy for Needy",
      desc: "80G & 12A income tax exempted donations",
      icon: Heart,
    },
  ];

  const honors = [
    { title: "UP Chief Minister State Award", desc: "Best Professional Psychologist (2019)", icon: Award },
    { title: "Ministry of Home Affairs", desc: "FCRA Registered NGO", icon: ShieldCheck },
    { title: "Income Tax Department", desc: "100% Tax Exemption (80G & 12A)", icon: CheckCircle2 },
    { title: "National Trust of India", desc: "Registered for Autism, CP & MR Care", icon: Building2 },
  ];

  return (
    <section
      ref={containerRef}
      className="w-full py-12 md:py-16 bg-white border-b border-amber-200/80 shadow-xs relative overflow-hidden"
    >
      <div className="container-custom space-y-10">
        
        {/* Section Header Tag */}
        <div className="text-center">
          <span className="inline-block text-xs font-black text-amber-700 uppercase tracking-widest bg-amber-100/90 px-4 py-1.5 rounded-full border border-amber-300 shadow-2xs">
            Verified Real Impact & Scale
          </span>
        </div>

        {/* 1. Dynamic Animated Counters (All 4 in One Unified Cohesive Style & Color) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 md:gap-6">
          {stats.map((s, idx) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl bg-white border-2 border-amber-200/80 shadow-sm hover:shadow-xl hover:border-amber-400 hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group"
              >
                {/* Top Row: Dynamic Counter & Consistent Icon Badge */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-3xl sm:text-4xl lg:text-[42px] font-heading font-black text-amber-600 tracking-tight leading-none group-hover:text-amber-500 transition-colors">
                    <AnimatedCounter
                      value={s.value}
                      prefix={s.prefix}
                      suffix={s.suffix}
                      duration={3}
                    />
                  </span>
                  <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-700 shadow-2xs group-hover:bg-amber-100/80 transition-colors shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                {/* Bottom Row: Label & Description */}
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-amber-800 transition-colors">
                    {s.label}
                  </h4>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* 2. Official Government Certifications Row (Unified Style & Color) */}
        <div className="pt-6 border-t border-amber-200/60">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3.5 md:gap-4">
            {honors.map((h, i) => {
              const Icon = h.icon;
              return (
                <div
                  key={i}
                  className="p-4 rounded-xl bg-white border border-amber-200/80 shadow-2xs flex items-center gap-3.5 hover:border-amber-400 hover:shadow-xs transition-all"
                >
                  <div className="p-2.5 rounded-lg bg-amber-50 text-amber-700 border border-amber-200 shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h5 className="text-xs sm:text-sm font-bold text-slate-900 leading-tight">
                      {h.title}
                    </h5>
                    <p className="text-[11px] text-slate-500 mt-0.5 leading-tight font-medium">
                      {h.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
