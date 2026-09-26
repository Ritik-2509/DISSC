"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  ArrowRight,
  Award,
  ShieldCheck,
  MapPin,
  Sparkles,
  Users,
  CheckCircle2,
  Calendar,
  ChevronRight,
  Play
} from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_SLIDES = [
  {
    id: "cm-award",
    image: "/images/discc/award-ceremony.png",
    badge: "State Honor 2019",
    badgeColor: "bg-amber-500 text-white",
    title: "UP Chief Minister Yogi Adityanath Felicitating Dr. C. Tulsi Das",
    subtitle: "Conferred the Best Professional Psychologist State Award for pioneering 35 years of clinical neuro-rehabilitation in Eastern Uttar Pradesh.",
    stats: "12,000+ Children Rehabilitated",
    tag: "State Award Winner"
  },
  {
    id: "role-model",
    image: "/images/discc/role-model-award.png",
    badge: "State Role Model",
    badgeColor: "bg-teal-600 text-white",
    title: "Recognized as Eastern UP's Pioneer Institute for Special Needs",
    subtitle: "Comprehensive clinical assessments, sensory integration rooms, and individualized education plans (IEPs).",
    stats: "All 21 RPwD Disabilities",
    tag: "Govt. Recognized"
  },
  {
    id: "therapy",
    image: "/images/discc/children-activity.png",
    badge: "Deva Center Campus",
    badgeColor: "bg-rose-500 text-white",
    title: "Empowering Every Special Child to Learn, Smile and Belong",
    subtitle: "Daily pediatric speech therapy, hydrotherapy in Bachhaon village, and inclusive school transition programs.",
    stats: "3,200+ School Scholarships",
    tag: "Clinical Excellence"
  }
];

export function VibrantHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance hero slides every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6500);
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section className="relative w-full pt-28 pb-16 md:pt-36 md:pb-24 bg-gradient-to-b from-[#FFFDF9] via-[#FFF9EE] to-[#FFF5E5] overflow-hidden">
      {/* Animated Colorful Ambient Glows */}
      <motion.div
        animate={{
          scale: [1, 1.15, 1],
          opacity: [0.35, 0.5, 0.35],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-10 left-1/4 w-96 h-96 bg-amber-300/40 rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.3, 0.45, 0.3],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-teal-200/40 rounded-full blur-3xl pointer-events-none"
      />
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-rose-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        
        {/* Top Floating Trust Pill */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-6"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-amber-300 shadow-sm">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-amber-500"></span>
            </span>
            <span className="text-xs font-bold text-slate-800 tracking-wide">
              Est. 1991 in Varanasi · UP Chief Minister Awarded NGO
            </span>
          </div>
        </motion.div>

        {/* Master Asymmetric Dynamic Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Emotion, Narrative & Action (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-center text-left"
          >
            <h1 className="text-4xl sm:text-5xl lg:text-[46px] font-heading font-black text-slate-900 leading-[1.12] tracking-tight">
              Giving Every Special Child a Life of{" "}
              <span className="relative inline-block text-teal-700">
                Dignity & Hope.
                <svg
                  className="absolute -bottom-2 left-0 w-full h-3 text-amber-400"
                  viewBox="0 0 240 12"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 9C60 3 180 3 237 9"
                    stroke="currentColor"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </h1>

            <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed mt-6 mb-8">
              Founded by clinical psychologist <strong>Dr. C. Tulsi Das</strong>, DISCC has spent 35 years transforming the lives of children with Autism, Cerebral Palsy, Down Syndrome, and intellectual disabilities across Eastern Uttar Pradesh.
            </p>

            {/* Vibrant Call to Actions */}
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-black rounded-full px-8 h-13 text-base shadow-lg shadow-amber-500/30 hover:shadow-xl hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-current text-slate-950" />
                  <span>Sponsor a Child</span>
                </Button>
              </Link>

              <Link href="/our-work">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-7 h-13 text-base font-bold bg-white/90 border-slate-300 text-slate-800 hover:bg-white hover:border-teal-600 hover:text-teal-700 shadow-sm transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Explore Campuses</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Live Trust Metrics Strip */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-amber-200/80">
              <div>
                <span className="text-2xl sm:text-3xl font-black font-heading text-teal-700 block">
                  12k+
                </span>
                <span className="text-xs font-bold text-slate-600 leading-tight block mt-0.5">
                  Children Rehabilitated
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-heading text-amber-600 block">
                  35 Yrs
                </span>
                <span className="text-xs font-bold text-slate-600 leading-tight block mt-0.5">
                  Grassroots Legacy
                </span>
              </div>
              <div>
                <span className="text-2xl sm:text-3xl font-black font-heading text-rose-600 block">
                  100%
                </span>
                <span className="text-xs font-bold text-slate-600 leading-tight block mt-0.5">
                  80G Tax Exempt
                </span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: Grand Vibrant Interactive Photographic Showcase (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col items-center"
          >
            <div className="relative w-full max-w-[680px]">
              
              {/* Colorful Multi-Layer Floating Aura */}
              <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-amber-400 via-rose-400 to-teal-400 opacity-30 blur-lg transform rotate-1" />
              
              {/* Main Showcase Container */}
              <div className="relative bg-white p-3 sm:p-4 rounded-3xl shadow-xl border-2 border-white/80 overflow-hidden">
                
                {/* Large Uncropped Image Presentation */}
                <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-2xl overflow-hidden bg-slate-100">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={slide.id}
                      initial={{ opacity: 0, scale: 1.04 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        priority
                        className="object-contain sm:object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top Live Badge */}
                  <div className="absolute top-3 left-3 z-20">
                    <span className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-black shadow-md ${slide.badgeColor}`}>
                      <Award className="w-4 h-4" />
                      {slide.badge}
                    </span>
                  </div>

                  {/* Floating Metric Pill */}
                  <div className="absolute bottom-3 right-3 z-20">
                    <div className="px-3.5 py-1.5 rounded-full bg-slate-900/85 backdrop-blur-md text-white text-xs font-bold shadow-lg flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                      <span>{slide.stats}</span>
                    </div>
                  </div>
                </div>

                {/* Narrative Caption Footnote */}
                <div className="p-4 bg-gradient-to-r from-amber-50/70 to-teal-50/70 rounded-2xl mt-3 border border-amber-100">
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {slide.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    {slide.subtitle}
                  </p>
                </div>

              </div>

              {/* Interactive Slide Control Dots & Thumbnails */}
              <div className="flex items-center justify-between mt-4 px-1">
                <div className="flex items-center gap-2">
                  {HERO_SLIDES.map((s, idx) => (
                    <button
                      key={s.id}
                      onClick={() => setActiveSlide(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                        activeSlide === idx
                          ? "bg-slate-900 text-white shadow-sm scale-105"
                          : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full ${activeSlide === idx ? "bg-amber-400" : "bg-slate-400"}`} />
                      <span>{s.tag}</span>
                    </button>
                  ))}
                </div>

                <div className="text-xs font-bold text-slate-500">
                  0{activeSlide + 1} / 0{HERO_SLIDES.length}
                </div>
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}
