"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Maximize2, MapPin, Calendar, Sparkles, Layers } from "lucide-react";
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
  const isEven = index % 2 === 0;

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
    <motion.div
      initial={{ opacity: 0, x: isEven ? -60 : 60 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-stone-200/90 shadow-sm hover:shadow-xl transition-all duration-500"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
        
        {/* Left Column: Event Context, Badge, Narrative & Controls */}
        <div className={`lg:col-span-5 flex flex-col justify-between ${isEven ? "lg:order-1" : "lg:order-2"}`}>
          <div>
            {/* Top Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-3.5">
              <span className="px-3.5 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 border border-amber-300">
                {event.badge}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold text-slate-600 bg-stone-100 border border-stone-200">
                {event.year}
              </span>
            </div>

            {/* Event Title */}
            <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-tight mb-3 tracking-tight">
              {event.title}
            </h2>

            {/* Location Pill */}
            <div className="flex items-center gap-1.5 text-xs font-bold text-teal-700 mb-4">
              <MapPin className="w-3.5 h-3.5" />
              <span>{event.location}</span>
            </div>

            {/* Narrative Description */}
            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-normal mb-6">
              {event.description}
            </p>
          </div>

          {/* Action Row & Image Counter */}
          <div className="pt-4 border-t border-stone-200 flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-wider text-slate-700">
                Photo {currentSlide + 1} of {photos.length} ({photos.length} Total)
              </span>
            </div>

            <button
              onClick={() => onOpenLightbox(photos, currentSlide)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-slate-900 hover:bg-amber-500 hover:text-slate-950 text-white text-xs font-bold transition-all shadow-xs cursor-pointer"
            >
              <Maximize2 className="w-3.5 h-3.5" />
              <span>View Fullscreen Gallery</span>
            </button>
          </div>
        </div>

        {/* Right Column: Interactive Image Carousel Frame */}
        <div className={`lg:col-span-7 ${isEven ? "lg:order-2" : "lg:order-1"}`}>
          <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden bg-slate-900 shadow-md group">
            
            {/* Active Image */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activePhoto.url}
                initial={{ opacity: 0, scale: 1.02 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative w-full h-full cursor-pointer"
                onClick={() => onOpenLightbox(photos, currentSlide)}
              >
                <Image
                  src={activePhoto.url}
                  alt={activePhoto.title}
                  fill
                  quality={95}
                  priority={index === 0}
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-103"
                  sizes="(max-width: 1024px) 100vw, 55vw"
                />

                {/* Subtle Gradient Scrim for Bottom Title */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/85 via-black/40 to-transparent pointer-events-none" />

                {/* Bottom Caption Overlay */}
                <div className="absolute bottom-3.5 inset-x-4 z-10 text-left pointer-events-none">
                  <p className="text-white font-bold text-sm sm:text-base leading-snug drop-shadow-md truncate">
                    {activePhoto.title}
                  </p>
                  <p className="text-stone-300 text-xs mt-0.5 line-clamp-1">
                    {activePhoto.caption}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Previous Button (<) */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevSlide();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
            )}

            {/* Next Button (>) */}
            {photos.length > 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextSlide();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-black/40 hover:bg-amber-400 hover:text-slate-950 text-white backdrop-blur-md border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-lg hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Mini Thumbnail Rail underneath for instant photo jumping */}
          {photos.length > 1 && (
            <div className="flex items-center gap-2 overflow-x-auto pt-3 pb-1 scrollbar-none">
              {photos.map((p, pIdx) => (
                <button
                  key={`${p.id}-${pIdx}`}
                  onClick={() => setCurrentSlide(pIdx)}
                  className={`relative w-14 h-10 sm:w-16 sm:h-11 rounded-lg overflow-hidden shrink-0 transition-all cursor-pointer border-2 ${
                    currentSlide === pIdx
                      ? "border-amber-500 scale-105 shadow-md"
                      : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                  aria-label={`Jump to photo ${pIdx + 1}`}
                >
                  <Image
                    src={p.url}
                    alt={p.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

      </div>
    </motion.div>
  );
}
