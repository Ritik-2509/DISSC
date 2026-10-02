"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, MapPin, Calendar, Sparkles, Heart, Quote } from "lucide-react";
import { EventCollection, EventPhoto } from "@/lib/eventsData";

interface EventCarouselCardProps {
  event: EventCollection;
  onOpenLightbox: (photos: EventPhoto[], index: number) => void;
  index: number;
}

export function EventCarouselCard({
  event,
  onOpenLightbox,
  index
}: EventCarouselCardProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const photos = event.photos;

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % photos.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const activePhoto = photos[currentSlide] || {
    url: event.coverImage,
    title: event.title,
    caption: event.description,
    year: event.year
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 35 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="w-full py-10 sm:py-16 border-b border-[#E5E0D4] last:border-b-0"
    >
      {/* 1. Human-Centric Chapter Header (Expansive & Editorial, Zero Boxed Borders) */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div className="max-w-3xl">
          {/* Metadata Row */}
          <div className="flex flex-wrap items-center gap-3 mb-3.5">
            <span className="w-8 h-[1.5px] bg-[#9A5B32]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A5B32]">
              {event.badge} · {event.year}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-600">
              <MapPin className="w-3.5 h-3.5 text-[#0F8B8D]" />
              <span>{event.location}</span>
            </div>
          </div>

          {/* Chapter Headline */}
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            {event.title}
          </h2>

          {/* Human Narrative */}
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            {event.description}
          </p>
        </div>

        {/* Right Controls: Photo Counter & Fullscreen Trigger */}
        <div className="flex items-center gap-3 shrink-0 self-start lg:self-end">
          <div className="px-3.5 py-1.5 rounded-full bg-stone-200/80 text-slate-800 text-xs font-bold shadow-2xs">
            Photo {currentSlide + 1} of {photos.length}
          </div>
          <button
            onClick={() => onOpenLightbox(photos, currentSlide)}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs sm:text-sm font-bold transition-all shadow-sm cursor-pointer hover:scale-102"
          >
            <Maximize2 className="w-4 h-4" />
            <span>View Fullscreen Gallery</span>
          </button>
        </div>
      </div>

      {/* 2. Full-Size Cinematic Canvas (Immersion & High Dignity Focus) */}
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/9] rounded-3xl overflow-hidden bg-slate-950 shadow-md group">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePhoto.url}
            initial={{ opacity: 0, scale: 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="relative w-full h-full cursor-pointer"
            onClick={() => onOpenLightbox(photos, currentSlide)}
          >
            <Image
              src={activePhoto.url}
              alt={activePhoto.title}
              fill
              quality={95}
              priority={index === 0}
              className="object-cover object-center transition-transform duration-700 group-hover:scale-102"
              sizes="(max-width: 1280px) 100vw, 1200px"
            />

            {/* Deep Vignette Scrim for High-Contrast Human Story Reading */}
            <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-slate-950/95 via-slate-950/55 to-transparent pointer-events-none" />

            {/* Photo Caption Overlay on Canvas */}
            <div className="absolute bottom-5 sm:bottom-7 inset-x-6 sm:inset-x-8 z-10 text-left pointer-events-none">
              <div className="inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-amber-400 text-slate-950 mb-2 shadow-xs">
                {activePhoto.year || event.year}
              </div>
              <h3 className="text-white font-heading font-black text-lg sm:text-2xl leading-snug drop-shadow-md">
                {activePhoto.title}
              </h3>
              <p className="text-stone-200 text-xs sm:text-sm mt-1 max-w-3xl leading-relaxed drop-shadow-xs line-clamp-2">
                {activePhoto.caption}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Prev/Next Buttons */}
        {photos.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prevSlide();
              }}
              className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                nextSlide();
              }}
              className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-black/50 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
              aria-label="Next image"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* 3. Human-Centric Archival Filmstrip (Tactile Photography Roll) */}
      {photos.length > 1 && (
        <div className="mt-5 sm:mt-6">
          <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-none">
            {photos.map((p, pIdx) => {
              const isSelected = currentSlide === pIdx;
              return (
                <button
                  key={`${p.id}-${pIdx}`}
                  onClick={() => setCurrentSlide(pIdx)}
                  className={`group relative flex items-center gap-3 p-2 rounded-2xl transition-all cursor-pointer text-left shrink-0 border ${
                    isSelected
                      ? "bg-amber-50/80 border-amber-400 shadow-sm"
                      : "bg-white/80 border-stone-200/80 hover:bg-white hover:border-amber-300"
                  }`}
                >
                  <div className="relative w-16 h-12 sm:w-20 sm:h-14 rounded-xl overflow-hidden bg-slate-900 shrink-0">
                    <Image
                      src={p.url}
                      alt={p.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                      sizes="80px"
                    />
                  </div>
                  <div className="pr-3 max-w-[140px] sm:max-w-[180px]">
                    <span className="block text-[10px] font-black uppercase tracking-wider text-amber-800">
                      Photo {pIdx + 1}
                    </span>
                    <span className="block text-xs font-bold text-slate-800 truncate">
                      {p.title}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </motion.article>
  );
}
