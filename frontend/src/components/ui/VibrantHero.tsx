"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const HERO_SLIDES = [
  {
    id: "cm-award",
    image: "/images/discc/award-ceremony.png",
    alt: "UP Chief Minister Yogi Adityanath Felicitating Dr. C. Tulsi Das with State Award",
  },
  {
    id: "role-model-award",
    image: "/images/discc/role-model-award.png",
    alt: "Dr. C. Tulsi Das receiving national honor at Government ceremony",
  },
  {
    id: "therapy-activity",
    image: "/images/discc/children-activity.png",
    alt: "Pediatric Therapy & Inclusive Child Development at Deva Center",
  },
  {
    id: "hydro-rehab",
    image: "/images/discc/children-therapy.jpg",
    alt: "Hydrotherapy & Rehabilitation Campus at Deva Gram",
  },
  {
    id: "community-program",
    image: "/images/discc/community-program.png",
    alt: "Community Outreach & Family Guidance Across Eastern UP",
  },
  {
    id: "special-children",
    image: "/images/discc/hero-children.png",
    alt: "Special Children Empowerment and Inclusive Care",
  }
];

export function VibrantHero() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Auto-advance background images every 3 seconds in a continuous loop
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 3000); // 3 seconds loop
    return () => clearInterval(timer);
  }, []);

  const slide = HERO_SLIDES[activeSlide];

  return (
    <section className="relative w-full h-screen min-h-[720px] flex flex-col justify-end overflow-hidden bg-slate-950 text-white pb-12 sm:pb-16 md:pb-20">
      
      {/* 1. Full-Screen Edge-to-Edge HD Background Carousel */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={slide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={slide.id === HERO_SLIDES[0].id}
              quality={85}
              className="object-cover object-center"
              sizes="100vw"
            />
          </motion.div>
        </AnimatePresence>

        {/* Top Vignette (for navbar legibility) & Bottom Gradient (for lower headline legibility) */}
        <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-black/65 via-black/25 to-transparent z-1 pointer-events-none" />
        <div className="absolute bottom-0 left-0 right-0 h-3/5 bg-gradient-to-t from-black/90 via-black/55 to-transparent z-1 pointer-events-none" />
      </div>

      {/* 2. Lower-Positioned Content (Keeps Upper Faces in Photo Visible) */}
      <div className="container-custom relative z-10 text-center flex flex-col items-center max-w-4xl mx-auto px-4">
        
        {/* Master Headline (Positioned Lower, High Contrast) */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl sm:text-5xl md:text-6xl lg:text-[66px] font-heading font-black text-white leading-[1.12] tracking-tight drop-shadow-[0_4px_20px_rgba(0,0,0,0.95)] mb-6 md:mb-8 max-w-3xl"
        >
          Pioneering Care for Every{" "}
          <span className="relative inline-block text-amber-400 drop-shadow-[0_4px_20px_rgba(0,0,0,1)]">
            Special Child.
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
        </motion.h1>

        {/* Centered Action Buttons (Original Normal Sized Pills) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex flex-wrap items-center justify-center gap-4 mb-5 md:mb-6"
        >
          <Link href="/donate">
            <Button
              size="lg"
              className="bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-full px-8 h-12 md:h-13 text-sm md:text-base shadow-2xl shadow-black/70 hover:scale-105 transition-all flex items-center gap-2.5 cursor-pointer"
            >
              <Heart className="w-5 h-5 fill-slate-950" />
              <span>Sponsor a Child</span>
            </Button>
          </Link>

          <Link href="/our-work">
            <Button
              variant="outline"
              size="lg"
              className="rounded-full px-7 h-12 md:h-13 text-sm md:text-base font-bold bg-black/50 hover:bg-black/70 border-white/50 text-white backdrop-blur-md shadow-2xl transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Explore Programs</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </Link>
        </motion.div>

        {/* Trust Badge (Below Buttons, Without Dot) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          <div className="inline-flex items-center px-5 py-2 rounded-full bg-black/60 backdrop-blur-md border border-white/30 shadow-2xl">
            <span className="text-xs sm:text-sm font-bold text-amber-300 tracking-wide drop-shadow-md">
              Est. 1991 in Varanasi · UP Chief Minister Awarded NGO
            </span>
          </div>
        </motion.div>

      </div>

    </section>
  );
}
