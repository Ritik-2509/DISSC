"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Heart, PhoneCall, ShieldCheck, Award, Sparkles, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VideoModal } from "@/components/ui/VideoModal";

export interface HeroSlide {
  id: string;
  image: string;
  eyebrow: string;
  prefix: string;
  typewriterWords: string[];
  subtitle: string;
  badge?: string;
}

const DEFAULT_SLIDES: HeroSlide[] = [
  {
    id: "slide-cm-award",
    image: "/images/discc/award-ceremony.png",
    eyebrow: "Since 1991 · Varanasi, Uttar Pradesh",
    prefix: "Pioneering Care for Children with ",
    typewriterWords: [
      "Special Needs & Autism",
      "Intellectual Disabilities",
      "Neurodevelopmental Challenges",
      "Clinical Psychological Needs",
    ],
    subtitle: "Honoured with the Best Professional Psychologist Award by the Chief Minister of Uttar Pradesh, Yogi Adityanath.",
    badge: "CM State Award Recipient",
  },
  {
    id: "slide-role-model",
    image: "/images/discc/role-model-award.png",
    eyebrow: "32+ Years of Impact · Eastern UP",
    prefix: "Dedicated to Transforming Lives Through ",
    typewriterWords: [
      "Individual Education Plans",
      "Holistic Speech Therapy",
      "Sensory Integration Clinics",
      "Life-Skills & Independence",
    ],
    subtitle: "First specialized clinical psychologist institute in Uttar Pradesh for mental health and special rehabilitation.",
    badge: "State Role Model",
  },
  {
    id: "slide-children",
    image: "/images/discc/children-activity.png",
    eyebrow: "Holistic Rehabilitation · Deva Center",
    prefix: "Restoring Dignity, Hope & Joy Through ",
    typewriterWords: [
      "Compassionate Education",
      "Barrier-Free Classrooms",
      "Family Guidance & Support",
      "12,000+ Rebuilt Futures",
    ],
    subtitle: "Providing daily clinical care, adaptive learning, and family counselling for thousands of children in Varanasi.",
    badge: "12,000+ Lives Touched",
  },
  {
    id: "slide-therapy",
    image: "/images/discc/community-program.png",
    eyebrow: "Certified Clinical Excellence",
    prefix: "Building an Inclusive World with ",
    typewriterWords: [
      "National Trust Certification",
      "Global Academic Alliances",
      "Grassroots Ghat Outreach",
      "Official FCRA Approval",
    ],
    subtitle: "Accredited by National Trust, NIEPID (Divyangjan), and State & Central social welfare authorities.",
    badge: "FCRA & National Trust Certified",
  },
];

interface CinematicHeroProps {
  slides?: HeroSlide[];
  videoUrl?: string;
  onOpenCallbackModal?: () => void;
}

export function CinematicHero({
  slides = DEFAULT_SLIDES,
  videoUrl = "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  onOpenCallbackModal,
}: CinematicHeroProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const shouldReduceMotion = useReducedMotion();
  const activeSlide = slides[currentIndex] || slides[0];

  // Typewriter effect state
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect logic
  useEffect(() => {
    const words = activeSlide.typewriterWords || [];
    if (words.length === 0) return;

    const fullWord = words[currentWordIndex % words.length];
    const typingSpeed = isDeleting ? 30 : 60;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        // Typing forward
        if (currentText.length < fullWord.length) {
          setCurrentText(fullWord.slice(0, currentText.length + 1));
        } else {
          // Pause at end of word before deleting
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        // Deleting
        if (currentText.length > 0) {
          setCurrentText(fullWord.slice(0, currentText.length - 1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentWordIndex, activeSlide]);

  // Reset typewriter when slide changes
  useEffect(() => {
    setCurrentWordIndex(0);
    setCurrentText("");
    setIsDeleting(false);
  }, [currentIndex]);

  const handleNext = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const handlePrev = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  // Auto-advance timer (7 seconds)
  useEffect(() => {
    if (isHovered || isVideoOpen) return;
    const timer = setInterval(() => {
      handleNext();
    }, 7000);
    return () => clearInterval(timer);
  }, [handleNext, isHovered, isVideoOpen]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleNext, handlePrev]);

  return (
    <section
      className="relative w-full min-h-[100dvh] flex flex-col justify-between overflow-hidden bg-[#050C18] text-white select-none"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="DISCC Founder and Mission Showcase"
    >
      {/* Background High-Definition Fullscreen Slideshow */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence initial={false}>
          <motion.div
            key={activeSlide.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.1, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full overflow-hidden"
          >
            <motion.div
              initial={shouldReduceMotion ? { scale: 1 } : { scale: 1 }}
              animate={shouldReduceMotion ? { scale: 1 } : { scale: 1.04 }}
              transition={{ duration: 8.5, ease: "linear" }}
              className="relative w-full h-full"
            >
              <Image
                src={activeSlide.image}
                alt={activeSlide.prefix}
                fill
                priority={currentIndex === 0}
                quality={100}
                unoptimized
                className="object-cover object-center brightness-[0.88] contrast-[1.08] saturate-[1.12]"
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Cinematic High-Contrast Dark Gradient Overlay for 100% Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050C18] via-[#050C18]/50 to-[#050C18]/80 z-1" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050C18]/90 via-[#050C18]/65 to-[#050C18]/30 z-1" />
        <div className="absolute inset-0 bg-radial from-transparent via-black/20 to-black/60 z-1 pointer-events-none" />
      </div>

      {/* Main Content Area: High-Impact Typewriting Headline directly over the image */}
      <div className="relative z-10 w-full container-custom pt-28 pb-10 sm:pt-32 sm:pb-12 flex-1 flex flex-col justify-center">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow and Award Badges */}
          <motion.div
            key={`badges-${activeSlide.id}`}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap items-center gap-3"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/40 backdrop-blur-md text-emerald-300 text-xs font-bold uppercase tracking-wider shadow-lg">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{activeSlide.eyebrow}</span>
            </div>

            {activeSlide.badge && (
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#F5A524]/20 border border-[#F5A524]/50 backdrop-blur-md text-[#F5A524] text-xs font-bold shadow-lg">
                <Award className="w-3.5 h-3.5 text-[#F5A524]" />
                <span>{activeSlide.badge}</span>
              </div>
            )}
          </motion.div>

          {/* Dynamic Typewriter Main Headline */}
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold font-heading text-white tracking-tight leading-[1.12] drop-shadow-[0_4px_16px_rgba(0,0,0,0.8)]">
              <span>{activeSlide.prefix}</span>
              <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#F5A524] via-[#FBBF24] to-[#38BDF8] border-b-2 sm:border-b-4 border-[#F5A524]/60 pb-1">
                {currentText}
              </span>
              <span className="inline-block w-1.5 h-8 sm:h-12 ml-1.5 bg-[#F5A524] animate-pulse align-middle" />
            </h1>
          </div>

          {/* Subtitle with High Contrast */}
          <motion.p
            key={`sub-${activeSlide.id}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="text-base sm:text-lg md:text-xl text-slate-200/95 max-w-3xl leading-relaxed font-normal drop-shadow-md"
          >
            {activeSlide.subtitle}
          </motion.p>

          {/* High-Visibility CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="pt-4 flex flex-wrap items-center gap-4"
          >
            {/* Donate CTA (Radiant Solid Marigold) */}
            <Link href="/donate">
              <Button
                size="lg"
                className="h-13 px-8 rounded-full bg-[#F5A524] hover:bg-[#E09314] text-[#0F172A] font-extrabold text-base shadow-[0_10px_30px_rgba(245,165,36,0.4)] hover:scale-105 transition-all flex items-center gap-2.5 border-2 border-[#F5A524]"
              >
                <Heart className="w-5 h-5 fill-current" />
                <span>Donate Now</span>
              </Button>
            </Link>

            {/* Request Call Back CTA */}
            {onOpenCallbackModal ? (
              <Button
                size="lg"
                onClick={onOpenCallbackModal}
                className="h-13 px-7 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/40 text-white font-bold text-base backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
              >
                <PhoneCall className="w-4 h-4 text-cyan-400" />
                <span>Request a Call Back</span>
              </Button>
            ) : (
              <Link href="/contact#callback">
                <Button
                  size="lg"
                  className="h-13 px-7 rounded-full bg-white/10 hover:bg-white/20 border-2 border-white/40 text-white font-bold text-base backdrop-blur-md hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
                >
                  <PhoneCall className="w-4 h-4 text-cyan-400" />
                  <span>Request a Call Back</span>
                </Button>
              </Link>
            )}

            {/* Circular Video Story Trigger */}
            <button
              onClick={() => setIsVideoOpen(true)}
              className="group flex items-center gap-3 pl-2 pr-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/30 text-white backdrop-blur-md shadow-lg transition-all duration-200 cursor-pointer hover:scale-105"
              aria-label="Watch documentary video"
            >
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-[#0F8B8D] text-white group-hover:scale-110 transition-transform shadow-md">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </span>
              <span className="text-xs sm:text-sm font-bold tracking-wide">
                Watch Our Story
              </span>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Slide Navigation Controls & Progress Bars */}
      <div className="relative z-10 w-full container-custom pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Progress Bar Indicators with Slide Counter */}
        <div className="flex items-center gap-3 flex-1 max-w-lg p-2.5 rounded-2xl bg-black/60 backdrop-blur-md border border-white/15">
          <span className="text-xs font-mono font-bold text-[#F5A524] pl-2">
            0{currentIndex + 1} / 0{slides.length}
          </span>
          <div className="flex items-center gap-2 flex-1">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(index)}
                className="relative flex-1 h-2 rounded-full overflow-hidden bg-white/20 hover:bg-white/40 transition-colors cursor-pointer"
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentIndex && (
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#0F8B8D] to-[#2DD4BF]"
                  />
                )}
                {index < currentIndex && (
                  <div className="absolute inset-0 bg-[#0F8B8D]" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Slide Previous / Next Arrows */}
        <div className="flex items-center gap-2">
          <button
            onClick={handlePrev}
            className="p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-lg border border-white/20 hover:scale-105 cursor-pointer"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={handleNext}
            className="p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-md transition-all shadow-lg border border-white/20 hover:scale-105 cursor-pointer"
            aria-label="Next slide"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Verified Trust Strip under Hero */}
      <div className="relative z-10 w-full border-t border-white/15 bg-[#050C18]/90 backdrop-blur-xl py-3.5">
        <div className="container-custom flex flex-wrap items-center justify-around gap-y-2 gap-x-6 text-xs sm:text-sm font-bold text-white/90">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#F5A524]" />
            <span>32+ Years of Specialized Care</span>
          </div>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>FCRA Registered NGO</span>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-cyan-400" />
            <span>National Trust Registered</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-[#F5A524]" />
            <span>State & Central Certified</span>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      <VideoModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        videoUrl={videoUrl}
        title="DISCC Story Documentary"
      />
    </section>
  );
}
