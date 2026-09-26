"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight, Award, ShieldCheck, MapPin, CheckCircle2, Sparkles, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandUnderline } from "@/components/ui/HandDrawn";

const ROTATING_PHRASES = [
  "Est. 1991 in Varanasi - FCRA and National Trust Registered",
  "Recognised by the Government of Uttar Pradesh",
  "State Award Recipient from UP Chief Minister Yogi Adityanath",
  "Pioneering Clinical Care for All 21 Disability Classifications",
  "Over 12,000 Children and Families Rehabilitated"
];

const HERO_MOMENTS = [
  {
    id: "cm-award",
    image: "/images/discc/award-ceremony.png",
    tag: "State Honor 2019",
    title: "Hon'ble UP Chief Minister Yogi Adityanath felicitating Dr. C. Tulsi Das",
    caption: "State recognition for 30+ years of pioneering rehabilitation for intellectual disabilities in Eastern UP.",
    date: "Lucknow, Uttar Pradesh"
  },
  {
    id: "role-model",
    image: "/images/discc/role-model-award.png",
    tag: "Excellence in Care",
    title: "State Role Model Award Felicitation Ceremony",
    caption: "Recognized as a leading grassroots organization providing comprehensive multi-disciplinary therapy.",
    date: "State Felicitation"
  },
  {
    id: "classroom",
    image: "/images/discc/children-activity.png",
    tag: "Deva Center Campus",
    title: "Inclusive Sensory and Motor Development Classroom",
    caption: "Daily scientific individualized education plans (IEPs) designed for each child's potential.",
    date: "Kamachha, Varanasi"
  }
];

export function EditorialHero() {
  const [activeMoment, setActiveMoment] = useState(0);
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // Typewriter loop
  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayedText(ROTATING_PHRASES[0]);
      return;
    }

    const currentFullText = ROTATING_PHRASES[phraseIndex];
    const typingSpeed = isDeleting ? 30 : 55;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        const nextText = currentFullText.slice(0, displayedText.length + 1);
        setDisplayedText(nextText);
        if (nextText === currentFullText) {
          setTimeout(() => setIsDeleting(true), 2400);
        }
      } else {
        const prevText = currentFullText.slice(0, displayedText.length - 1);
        setDisplayedText(prevText);
        if (prevText === "") {
          setIsDeleting(false);
          setPhraseIndex((prev) => (prev + 1) % ROTATING_PHRASES.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, phraseIndex, prefersReducedMotion]);

  const current = HERO_MOMENTS[activeMoment];

  return (
    <section className="w-full pt-28 pb-16 md:pt-36 md:pb-24 bg-[#FAF7F0] border-b border-[#E8DFD3] overflow-hidden relative">
      {/* Subtle paper grain / soft background tint */}
      <div className="absolute inset-0 bg-radial from-amber-50/50 via-transparent to-transparent pointer-events-none opacity-60" />

      <div className="container-custom relative z-10">
        {/* Asymmetric 60/40 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Fixed Headline + Typewriter + CTAs (5 Cols on desktop) */}
          <div className="lg:col-span-5 flex flex-col justify-center text-left">
            
            {/* Trust Stamp */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E0] border border-[#F5A524]/40 text-[#8B4500] w-fit mb-5 shadow-xs"
            >
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              <span className="text-xs font-bold uppercase tracking-wider">
                Nonprofit Founded in 1991 · Varanasi
              </span>
            </motion.div>

            {/* Main Fixed Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-3xl sm:text-4xl lg:text-[44px] font-heading font-extrabold text-[#1A2530] leading-[1.18] tracking-tight mb-4"
            >
              35 Years of Dignity and Scientific Care for Children with Special Needs.
            </motion.h1>

            {/* Hand-drawn Underline */}
            <div className="mb-4">
              <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
            </div>

            {/* Dynamic Typewriter Line */}
            <div className="min-h-[52px] sm:min-h-[44px] flex items-center mb-6">
              <p className="text-base sm:text-lg text-[#3E5062] font-medium leading-snug">
                <span className="text-[#0F8B8D] font-bold mr-1.5">Focus:</span>
                <span>{displayedText}</span>
                {!prefersReducedMotion && (
                  <span className="inline-block w-0.5 h-4 ml-1 bg-[#0F8B8D] animate-pulse align-middle" />
                )}
              </p>
            </div>

            {/* Lead Narrative Sentence */}
            <p className="text-sm sm:text-base text-[#5B6B7C] leading-relaxed mb-8">
              Founded by clinical psychologist Dr. C. Tulsi Das, DEVA International Society for Child Care (DISCC) provides diagnostic psychological assessments, sensory therapy, inclusive schooling, and family rehabilitation across Eastern Uttar Pradesh.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 mb-10">
              <Link href="/donate">
                <Button
                  size="lg"
                  className="bg-[#F5A524] hover:bg-[#E09314] text-[#1A2530] font-extrabold rounded-full px-7 h-12 text-base shadow-md hover:shadow-lg transition-all transform hover:-translate-y-0.5 flex items-center gap-2 cursor-pointer"
                >
                  <Heart className="w-5 h-5 fill-current text-[#1A2530]" />
                  <span>Support a Child</span>
                </Button>
              </Link>
              
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="rounded-full px-6 h-12 text-base font-bold border-[#C8BFB3] text-[#1A2530] hover:bg-white/80 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Our 35-Year Story</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </div>

            {/* Trust Badges Row */}
            <div className="pt-6 border-t border-[#E8DFD3] grid grid-cols-3 gap-3 text-left">
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-heading text-[#0F8B8D]">
                  12,000+
                </span>
                <span className="text-[11.5px] text-[#5B6B7C] font-semibold leading-tight block">
                  Children Supported
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-heading text-[#D97706]">
                  21
                </span>
                <span className="text-[11.5px] text-[#5B6B7C] font-semibold leading-tight block">
                  Disability Categories
                </span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-bold font-heading text-[#1A2530]">
                  100%
                </span>
                <span className="text-[11.5px] text-[#5B6B7C] font-semibold leading-tight block">
                  80G Tax Exempt
                </span>
              </div>
            </div>

          </div>

          {/* Right Column: Large Uncropped Photo Composition (7 Cols on desktop) */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Tilted Paper Backing Mat + Main Photograph */}
            <div className="relative w-full max-w-[660px]">
              
              {/* Background Accent Paper Mat (Offset Angle) */}
              <div className="absolute inset-0 bg-[#FFFDF8] rounded-2xl border border-[#E2D8CA] shadow-sm transform -rotate-1 translate-x-1 translate-y-1.5 pointer-events-none" />

              {/* Main Photo Card Container */}
              <div className="relative bg-white p-3 sm:p-4 rounded-2xl border border-[#E8DFD3] shadow-md z-10">
                
                {/* Award Photo - Uncropped Natural Aspect */}
                <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-xl overflow-hidden bg-[#F2ECE1]">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0, scale: 0.98 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.01 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="relative w-full h-full"
                    >
                      <Image
                        src={current.image}
                        alt={current.title}
                        fill
                        priority
                        className="object-contain sm:object-cover"
                        sizes="(max-width: 1024px) 100vw, 55vw"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Top-Right Badge (Non-obscuring) */}
                  <div className="absolute top-3 right-3 z-20">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-[#1A2530] text-xs font-bold shadow-sm border border-[#E8DFD3]">
                      <Award className="w-3.5 h-3.5 text-[#D97706]" />
                      {current.tag}
                    </span>
                  </div>
                </div>

                {/* Photo Narrative Footnote */}
                <div className="mt-3.5 px-1 pb-1">
                  <h2 className="text-sm sm:text-base font-bold text-[#1A2530] leading-snug">
                    {current.title}
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5B6B7C] mt-1 leading-relaxed">
                    {current.caption}
                  </p>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#F0EAE1] text-[11px] text-[#7A8B9E] font-medium">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-[#0F8B8D]" />
                      {current.date}
                    </span>
                    <span>Documentary Archive · DISCC</span>
                  </div>
                </div>

              </div>

            </div>

            {/* Interactive Thumbnail Switcher */}
            <div className="w-full max-w-[660px] flex items-center justify-start gap-2.5 mt-4 overflow-x-auto pb-1">
              {HERO_MOMENTS.map((m, idx) => (
                <button
                  key={m.id}
                  onClick={() => setActiveMoment(idx)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all text-left flex items-center gap-2 cursor-pointer border ${
                    activeMoment === idx
                      ? "bg-white text-[#0F8B8D] border-[#0F8B8D] shadow-xs"
                      : "bg-[#F3EDE2] text-[#5B6B7C] border-transparent hover:bg-white/80"
                  }`}
                >
                  <span className={`w-1.5 h-1.5 rounded-full ${activeMoment === idx ? "bg-[#0F8B8D]" : "bg-[#9EACB9]"}`} />
                  <span className="truncate max-w-[150px] sm:max-w-none">{m.tag}</span>
                </button>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
