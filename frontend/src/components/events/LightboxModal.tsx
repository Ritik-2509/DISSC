"use client";

import { useEffect, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Maximize2, Calendar, MapPin, Tag } from "lucide-react";
import { EventPhoto } from "@/lib/eventsData";

interface LightboxModalProps {
  isOpen: boolean;
  photos: EventPhoto[];
  currentIndex: number;
  onClose: () => void;
  onSelectIndex: (index: number) => void;
}

export function LightboxModal({
  isOpen,
  photos,
  currentIndex,
  onClose,
  onSelectIndex,
}: LightboxModalProps) {
  const currentPhoto = photos[currentIndex];

  const handlePrev = useCallback(() => {
    onSelectIndex((currentIndex - 1 + photos.length) % photos.length);
  }, [currentIndex, photos.length, onSelectIndex]);

  const handleNext = useCallback(() => {
    onSelectIndex((currentIndex + 1) % photos.length);
  }, [currentIndex, photos.length, onSelectIndex]);

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") handlePrev();
      if (e.key === "ArrowRight") handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, handlePrev, handleNext, onClose]);

  if (!isOpen || !currentPhoto) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-md p-3 sm:p-6 select-none"
      >
        {/* Top Bar with Counter, Title and Close Button */}
        <div className="absolute top-4 inset-x-4 sm:inset-x-8 z-50 flex items-center justify-between text-white">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md border border-white/20">
              {currentIndex + 1} / {photos.length}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-stone-300 hidden md:inline truncate max-w-md">
              {currentPhoto.eventTitle}
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 border border-white/20 flex items-center justify-center text-white transition-all cursor-pointer shadow-lg hover:scale-105"
            aria-label="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Previous Button */}
        {photos.length > 1 && (
          <button
            onClick={handlePrev}
            className="absolute left-3 sm:left-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-110"
            aria-label="Previous Photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}

        {/* Main Photo Area */}
        <div className="relative w-full max-w-5xl h-[70vh] sm:h-[75vh] flex items-center justify-center">
          <motion.div
            key={currentPhoto.id}
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.96 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full h-full"
          >
            <Image
              src={currentPhoto.url}
              alt={currentPhoto.title}
              fill
              quality={95}
              priority
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </motion.div>
        </div>

        {/* Next Button */}
        {photos.length > 1 && (
          <button
            onClick={handleNext}
            className="absolute right-3 sm:right-6 z-40 w-11 h-11 sm:w-13 sm:h-13 rounded-full bg-white/10 hover:bg-amber-400 hover:text-slate-950 text-white border border-white/20 flex items-center justify-center transition-all cursor-pointer shadow-2xl hover:scale-110"
            aria-label="Next Photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Bottom Caption Strip */}
        <div className="absolute bottom-4 inset-x-4 sm:inset-x-8 z-40 text-center max-w-3xl mx-auto">
          <div className="bg-black/70 backdrop-blur-md border border-white/15 px-5 py-3 rounded-2xl text-left inline-block w-full">
            <div className="flex items-center justify-between gap-4 mb-1">
              <h4 className="text-sm sm:text-base font-bold text-white tracking-wide truncate">
                {currentPhoto.title}
              </h4>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-400 shrink-0">
                {currentPhoto.year}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed line-clamp-2">
              {currentPhoto.caption}
            </p>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
