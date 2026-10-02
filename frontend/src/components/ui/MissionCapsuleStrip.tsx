"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function MissionCapsuleStrip() {
  const PILLARS = [
    {
      label: "Pediatric Diagnostics",
      image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790592007/discc/events/historical-genesis/historical-genesis_07.jpg",
      duration: 3.4,
      delay: 0,
    },
    {
      label: "Adaptive Hydrotherapy",
      image: "/images/discc/children-therapy.jpg",
      duration: 3.8,
      delay: 0.3,
    },
    {
      label: "Special Education",
      image: "/images/discc/children-activity.png",
      duration: 3.2,
      delay: 0.6,
    },
    {
      label: "Sensory Integration",
      image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790592576/discc/events/historical-genesis/historical-genesis_172.jpg",
      duration: 3.9,
      delay: 0.2,
    },
    {
      label: "Vocational Independence",
      image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790591723/discc/events/gangotri-annapurna/gangotri-annapurna_annapurna-cover.jpg",
      duration: 3.5,
      delay: 0.5,
    },
    {
      label: "Rural Respite Care",
      image: "/images/discc/community-program.png",
      duration: 4.0,
      delay: 0.1,
    },
    {
      label: "Community Purple Fair",
      image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790591935/discc/events/cultural-festivals/cultural-festivals_purple-fair-2026.jpg",
      duration: 3.6,
      delay: 0.4,
    },
  ];

  return (
    <section className="w-full py-16 md:py-24 bg-[#FAF8F5] border-b border-[#EADCCB] overflow-hidden select-none relative">
      {/* Subtle Warm Background Ambient Accents */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header (Centered, Anti-Slop, Refined Transition) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-10 sm:mb-16 max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-3.5">
            <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A5B32]">
              Therapeutic Spectrum
            </span>
            <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Comprehensive Care Spectrum.
          </h2>
          <p className="text-xs sm:text-sm text-stone-500 mt-2 font-medium">
            Holistic clinical therapy, specialized schooling, and rural care ecosystem in Varanasi
          </p>
        </motion.div>

        {/* Spread-out Section Filling Layout: Row 1 (4 Circles) & Row 2 (3 Circles) */}
        <div className="w-full max-w-7xl mx-auto">
          {/* Top Row: 4 Full-Image Circles spread out across full container width */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 justify-items-center mb-8 sm:mb-14">
            {PILLARS.slice(0, 4).map((pillar) => (
              <motion.div
                key={pillar.label}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: pillar.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pillar.delay,
                }}
                whileHover={{ scale: 1.05, y: -16, transition: { duration: 0.25 } }}
                className="flex flex-col items-center justify-start text-center cursor-pointer select-none group"
              >
                {/* Full-Bleed Large Circular Image (100% of Circle) */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-2xl group-hover:border-amber-400 ring-1 ring-stone-200/90 transition-all duration-300 shrink-0 bg-stone-100">
                  <Image
                    src={pillar.image}
                    alt={pillar.label}
                    fill
                    sizes="(max-width: 640px) 160px, 220px"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Text Out of the Circle (Cleanly Below) */}
                <div className="mt-3 sm:mt-4 flex flex-col items-center text-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-1.5 group-hover:scale-150 transition-transform" />
                  <h3 className="font-heading font-extrabold text-slate-900 text-xs sm:text-sm md:text-[15px] leading-snug text-center max-w-[170px] sm:max-w-[200px] group-hover:text-amber-700 transition-colors">
                    {pillar.label}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom Row: 3 Full-Image Circles spread out in alternating spaces */}
          <div className="flex flex-wrap justify-center gap-6 sm:gap-12 md:gap-16 lg:gap-24 justify-items-center">
            {PILLARS.slice(4, 7).map((pillar) => (
              <motion.div
                key={pillar.label}
                animate={{ y: [0, -12, 0] }}
                transition={{
                  duration: pillar.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: pillar.delay,
                }}
                whileHover={{ scale: 1.05, y: -16, transition: { duration: 0.25 } }}
                className="flex flex-col items-center justify-start text-center cursor-pointer select-none group"
              >
                {/* Full-Bleed Large Circular Image (100% of Circle) */}
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 md:w-48 md:h-48 lg:w-52 lg:h-52 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:shadow-2xl group-hover:border-amber-400 ring-1 ring-stone-200/90 transition-all duration-300 shrink-0 bg-stone-100">
                  <Image
                    src={pillar.image}
                    alt={pillar.label}
                    fill
                    sizes="(max-width: 640px) 160px, 220px"
                    className="object-cover object-center group-hover:scale-110 transition-transform duration-700"
                  />
                </div>

                {/* Text Out of the Circle (Cleanly Below) */}
                <div className="mt-3 sm:mt-4 flex flex-col items-center text-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mb-1.5 group-hover:scale-150 transition-transform" />
                  <h3 className="font-heading font-extrabold text-slate-900 text-xs sm:text-sm md:text-[15px] leading-snug text-center max-w-[170px] sm:max-w-[200px] group-hover:text-amber-700 transition-colors">
                    {pillar.label}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

