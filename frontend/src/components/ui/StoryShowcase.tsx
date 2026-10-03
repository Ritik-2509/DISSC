"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

export interface KarumaStoryItem {
  id: string;
  statBadge: string;
  title: string;
  summary: string;
  image: string;
  category: string;
}

export const KARUMA_STORIES: KarumaStoryItem[] = [
  // 1. PAST EVENTS & HISTORIC MILESTONES (Placed at the starting)
  {
    id: "kamachha-genesis",
    statBadge: "1991 GENESIS FOUNDATION",
    title: "The 1991 Kamachha Genesis",
    summary:
      "Dr. C. Tulsi Das established DISCC at Kamachha with zero institutional backing, pioneering scientific sensory therapy for neurodivergent children in Eastern UP.",
    image: "/images/discc/founders-meet.jpg",
    category: "Historic Foundation"
  },
  {
    id: "bachhaon-campus",
    statBadge: "5-ACRE RURAL SANCTUARY",
    title: "Bachhaon Rural Sanctuary Genesis",
    summary:
      "Laying the foundation of the 5-acre rural sanctuary campus equipped with pediatric hydrotherapy pool, sensory stimulation gardens, and vocational sheds.",
    image: "/images/discc/children-therapy.jpg",
    category: "Campus Infrastructure"
  },
  {
    id: "indo-european-camps",
    statBadge: "INDO-EUROPEAN CLINICAL SOLIDARITY",
    title: "Global Medical Exchange Camps",
    summary:
      "Visiting pediatric clinical specialists and European orthopedic surgeons collaborated in Varanasi to deliver advanced international rehabilitation standards.",
    image: "/images/discc/children-activity.png",
    category: "Medical Camp"
  },
  {
    id: "covid-rural-relief",
    statBadge: "1,200+ SPECIAL FAMILIES SAVED",
    title: "COVID-19 Emergency Relief Mission",
    summary:
      "Door-to-door distribution of emergency dry rations, sanitation supplies, and home therapies during lockdowns for vulnerable special families.",
    image: "/images/discc/community-program.png",
    category: "Disaster Relief"
  },
  {
    id: "special-children-festivals",
    statBadge: "COMMUNITY INCLUSION FESTIVALS",
    title: "Special Children Cultural & Sports Meets",
    summary:
      "Historic annual sports meets, adaptive athletic competitions, and creative cultural festivals empowering hundreds of neurodivergent children across Eastern UP.",
    image: "/images/discc/hero-children.png",
    category: "Community Inclusion"
  },

  // 2. FELICITATED & AWARDED MILESTONES (Placed at the very end)
  {
    id: "state-cm-award",
    statBadge: "HONORED BY UP CM YOGI ADITYANATH",
    title: "State Leadership Felicitation",
    summary:
      "Felicitation by Hon'ble Chief Minister Yogi Adityanath recognizing DISCC as the premier institution for disability rehabilitation across Uttar Pradesh.",
    image: "/images/discc/award-ceremony.png",
    category: "State Honor"
  }
];

export function StoryShowcase() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate items for infinite seamless carousel loop
  const displayStories = [...KARUMA_STORIES, ...KARUMA_STORIES];

  // Continuous smooth auto-scrolling
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let animId: number;
    let lastTime: number | null = null;
    const speed = 0.65; // ~40px per second for comfortable viewing

    const step = (time: number) => {
      if (lastTime !== null && !isPaused && !activeId) {
        const delta = Math.min(time - lastTime, 50); // Cap frame delta for smooth tab switching
        el.scrollLeft += speed * (delta / 16.67);

        // Seamless infinite loop wrap
        const halfWidth = el.scrollWidth / 2;
        if (el.scrollLeft >= halfWidth) {
          el.scrollLeft -= halfWidth;
        }
      }
      lastTime = time;
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);

    return () => {
      cancelAnimationFrame(animId);
    };
  }, [isPaused, activeId]);

  return (
    <section className="w-full py-20 md:py-28 bg-[#F6F4EE] border-b border-[#E5E0D4] relative overflow-hidden select-none">
      <div className="container-custom">
        {/* Header with Centered Anti-Slop Transition */}
        <div className="mb-12 md:mb-14">
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
                Historic Milestones & Past Events
              </span>
              <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Decades of Real Impact: Historic Milestones.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-2.5 leading-relaxed max-w-2xl mx-auto">
              Documenting 35 years of clinical breakthroughs, community relief events, and state leadership honors across Varanasi.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Sliding Cards Track (Smooth Infinite Auto-Scroll with hover pause) */}
        <div
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => {
            setIsPaused(false);
            setActiveId(null);
          }}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
          className="flex gap-4 sm:gap-6 overflow-x-auto pb-4 pt-2 scrollbar-none touch-pan-x [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
          {displayStories.map((story, idx) => {
            const cardKey = `${story.id}-${idx}`;
            const isActive = activeId === cardKey;

            return (
              <div
                key={cardKey}
                onMouseEnter={() => {
                  setIsPaused(true);
                  setActiveId(cardKey);
                }}
                onMouseLeave={() => {
                  setActiveId(null);
                }}
                onClick={() => setActiveId(isActive ? null : cardKey)}
                className={`relative w-[270px] xs:w-[300px] sm:w-[330px] md:w-[350px] h-[460px] xs:h-[490px] sm:h-[520px] shrink-0 rounded-2xl sm:rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border ${
                  isActive
                    ? "border-amber-400 shadow-2xl scale-[1.02] -translate-y-1"
                    : "border-[#EADCCB] shadow-sm hover:border-amber-300 bg-[#F7EFE4]"
                }`}
              >
                {/* 1. RESTING STATE (Clean Warm Cream Card with visual photo thumbnail and editorial text) */}
                <div
                  className={`absolute inset-0 p-5 sm:p-6 flex flex-col justify-between bg-[#F7EFE4] transition-opacity duration-300 ${
                    isActive ? "opacity-0 pointer-events-none" : "opacity-100"
                  }`}
                >
                  {/* Top Thumbnail Image Container with Floating Arrow */}
                  <div className="relative w-full h-[200px] sm:h-[220px] rounded-2xl overflow-hidden bg-[#EADCCB] border border-stone-200/60 shadow-2xs shrink-0">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 300px, 350px"
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                    
                    {/* Top Right Floating Arrow Button */}
                    <div className="absolute top-3 right-3 z-10 w-9 h-9 rounded-full bg-white/90 text-slate-800 backdrop-blur-xs flex items-center justify-center shadow-sm">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>

                    {/* Category Tag on Thumbnail */}
                    <div className="absolute bottom-3 left-3 z-10">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs">
                        {story.category}
                      </span>
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div className="pt-3">
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-200/90 text-amber-950 mb-2 border border-amber-300/60">
                      {story.statBadge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 leading-snug mb-2">
                      {story.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-2">
                      {story.summary}
                    </p>
                  </div>
                </div>

                {/* 2. ACTIVE / HOVERED STATE: Smooth Top-to-Bottom Curtain Unroll (Never drags text from top) */}
                <div
                  style={{
                    clipPath: isActive ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
                    transition: "clip-path 0.5s cubic-bezier(0.16, 1, 0.3, 1)"
                  }}
                  className={`absolute inset-0 z-10 bg-slate-950 pointer-events-none ${
                    isActive ? "pointer-events-auto shadow-2xl" : ""
                  }`}
                >
                  {/* Full-Bleed Background Photo */}
                  <div className="absolute inset-0">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      sizes="(max-width: 768px) 300px, 350px"
                      priority={isActive}
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Gradient Scrim Vignette for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/75 to-slate-950/25" />

                  {/* Top Right White Action Button (Karuma Signature) */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="w-10 h-10 rounded-full bg-white text-slate-950 shadow-xl flex items-center justify-center transition-transform hover:scale-110">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Top Left Category Tag */}
                  <div className="absolute top-6 left-6 z-20">
                    <span className="px-3 py-1 rounded-md text-[10px] font-black uppercase tracking-wider bg-black/60 text-white backdrop-blur-xs border border-white/20">
                      {story.category}
                    </span>
                  </div>

                  {/* Bottom Content on Hover - Fades in cleanly at bottom */}
                  <div
                    className={`absolute inset-x-0 bottom-0 p-6 sm:p-7 z-20 transition-all duration-400 delay-100 ${
                      isActive ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
                    }`}
                  >
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md mb-3">
                      {story.statBadge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-heading font-black text-white leading-tight mb-2.5">
                      {story.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-200 leading-relaxed line-clamp-3">
                      {story.summary}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
