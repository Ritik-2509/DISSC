"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";

export interface KarumaStoryItem {
  id: string;
  statBadge: string;
  title: string;
  summary: string;
  image: string;
  category: string;
}

export const KARUMA_STORIES: KarumaStoryItem[] = [
  {
    id: "tanisha",
    statBadge: "2 YEARS HYDROTHERAPY",
    title: "Hope After Immobility",
    summary:
      "Overcoming severe spastic diplegia through hydrotherapy in Bachhaon, Tanisha now walks independently to primary school with pure joy and confidence.",
    image: "/images/discc/children-therapy.jpg",
    category: "Clinical Milestone"
  },
  {
    id: "rahul",
    statBadge: "120 LEARNING SPACES CREATED",
    title: "Learning Without Limits",
    summary:
      "Adaptive picture IEP boards and clinical profiling unlocked fluent communication for non-verbal Rahul, who now thrives in classroom learning.",
    image: "/images/discc/children-activity.png",
    category: "Special Education"
  },
  {
    id: "rural-caregivers",
    statBadge: "350 CHILDREN PROTECTED",
    title: "Finding Safety Again",
    summary:
      "Regular counseling and physical therapy at Deva Gram removed superstitious stigma and gave rural families immense pride in their children's progress.",
    image: "/images/discc/community-program.png",
    category: "Rural Outreach"
  },
  {
    id: "priya",
    statBadge: "STATE EXHIBITION HONORED",
    title: "Artisan Self-Reliance",
    summary:
      "Gangotri Centre gave Priya vocational embroidery skills. Today her handmade textile bags are showcased at state handicraft exhibitions.",
    image: "/images/discc/hero-children.png",
    category: "Vocational Independence"
  },
  {
    id: "purple-fair",
    statBadge: "500+ CHILDREN UNITED",
    title: "A Celebration of Pure Joy",
    summary:
      "Varanasi's premier annual inclusive carnival bringing over 500 neurodivergent children together for games, adaptive sports, and artwork auctions.",
    image: "/images/discc/gallery/magic-show.jpg",
    category: "Community Inclusion"
  },
  {
    id: "state-award",
    statBadge: "35 YEARS CLINICAL RIGOR",
    title: "Honored by State Leadership",
    summary:
      "Dr. C. Tulsi Das honored by Hon'ble UP Chief Minister Yogi Adityanath with the Best Professional Award for pioneering rehabilitation across Eastern UP.",
    image: "/images/discc/award-ceremony.png",
    category: "State Honor"
  }
];

export function StoryShowcase() {
  // Karuma Pattern: Cards start in clean cream resting state. On cursor hover, the image slides down from top to bottom smoothly.
  const [activeId, setActiveId] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      if (maxScroll > 0) {
        setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
      }
    }
  };

  const handleTrackClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (scrollRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const clickRatio = Math.max(0, Math.min(1, clickX / rect.width));
      const { scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;
      scrollRef.current.scrollTo({
        left: clickRatio * maxScroll,
        behavior: "smooth"
      });
    }
  };

  return (
    <section className="w-full py-20 md:py-28 bg-[#F6F4EE] border-b border-[#E5E0D4] relative overflow-hidden select-none">
      <div className="container-custom">
        {/* Header with Karuma Editorial Phrasing */}
        <div className="mb-10 md:mb-12">
          <motion.div
            initial={{ opacity: 0, x: -70 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-3xl text-left"
          >
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Living Proof & Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Stories of Joy, Growth & Dignity.
            </h2>
            <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
              Real stories from children and communities who have turned disability and poverty into resilience and hope.
            </p>
          </motion.div>
        </div>

        {/* Horizontal Sliding Cards Track (Karuma Pattern with custom horizontal scrollbar) */}
        <div
          ref={scrollRef}
          onScroll={handleScroll}
          className="flex gap-5 sm:gap-6 overflow-x-auto pb-4 pt-2 scroll-smooth snap-x snap-mandatory custom-horizontal-scrollbar"
        >
          {KARUMA_STORIES.map((story) => {
            const isActive = activeId === story.id;

            return (
              <div
                key={story.id}
                onMouseEnter={() => setActiveId(story.id)}
                onMouseLeave={() => setActiveId(null)}
                onClick={() => setActiveId(activeId === story.id ? null : story.id)}
                className={`relative w-[300px] sm:w-[330px] md:w-[350px] h-[490px] sm:h-[520px] shrink-0 snap-start rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 ease-out border ${
                  isActive
                    ? "border-amber-400 shadow-2xl scale-[1.02] -translate-y-1"
                    : "border-[#EADCCB] shadow-sm hover:border-amber-300 bg-[#F7EFE4]"
                }`}
              >
                {/* 1. RESTING STATE (Clean Warm Cream Card - Always positioned underneath) */}
                <div className="absolute inset-0 p-7 sm:p-8 flex flex-col justify-between bg-[#F7EFE4]">
                  {/* Top Right Neutral Arrow Button */}
                  <div className="flex justify-end">
                    <div className="w-10 h-10 rounded-full bg-white/70 text-slate-700 border border-stone-200/80 flex items-center justify-center shadow-xs">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Text Content */}
                  <div>
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-200/80 text-amber-950 mb-3.5">
                      {story.statBadge}
                    </span>
                    <h3 className="text-2xl font-heading font-black text-slate-900 leading-tight mb-3">
                      {story.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-700 leading-relaxed line-clamp-3">
                      {story.summary}
                    </p>
                  </div>
                </div>

                {/* 2. ACTIVE / HOVERED STATE: Smooth Up-to-Down Slide (Curtain slide-down covering card) */}
                <div
                  className={`absolute inset-0 z-10 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    isActive
                      ? "translate-y-0 pointer-events-auto shadow-2xl"
                      : "-translate-y-full pointer-events-none"
                  }`}
                >
                  {/* Full-Bleed Background Photo */}
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    sizes="(max-width: 768px) 300px, 350px"
                    quality={95}
                    className="object-cover object-center"
                  />

                  {/* Gradient Scrim Vignette for Legibility */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-black/10" />

                  {/* Top Right White Action Button (Karuma Signature) */}
                  <div className="absolute top-6 right-6 z-20">
                    <div className="w-10 h-10 rounded-full bg-white text-slate-950 shadow-xl flex items-center justify-center transition-transform hover:scale-110">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Bottom Content on Hover */}
                  <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8 z-20">
                    <span className="inline-block px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 shadow-md mb-3">
                      {story.statBadge}
                    </span>
                    <h3 className="text-2xl font-heading font-black text-white leading-tight mb-2.5">
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

        {/* Bottom Centered Controls: Horizontal Scroller Track Only */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-center mt-8 md:mt-10"
        >
          {/* Interactive Horizontal Scroller Track */}
          <div
            onClick={handleTrackClick}
            className="w-56 sm:w-80 md:w-96 h-3 bg-stone-200/90 hover:bg-stone-300/80 rounded-full cursor-pointer relative overflow-hidden transition-colors border border-stone-300/50 shadow-inner"
            title="Click to scroll horizontally"
            role="scrollbar"
            aria-label="Horizontal story cards scrollbar"
          >
            <div
              className="absolute top-0.5 bottom-0.5 bg-slate-800 hover:bg-amber-500 rounded-full transition-all duration-150 shadow-xs"
              style={{
                width: "28%",
                left: `${scrollProgress * 72}%`
              }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
