"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export interface LightboxImage {
  url: string;
  caption?: string;
  category?: string;
  year?: string | number;
}

interface LightboxProps {
  images: LightboxImage[];
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export function Lightbox({
  images,
  currentIndex,
  isOpen,
  onClose,
  onNavigate,
}: LightboxProps) {
  const currentImage = images[currentIndex];

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onNavigate((currentIndex - 1 + images.length) % images.length);
      if (e.key === "ArrowRight") onNavigate((currentIndex + 1) % images.length);
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, currentIndex, images.length, onClose, onNavigate]);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 select-none">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/85 backdrop-blur-md"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.92 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-5xl w-full max-h-[88vh] flex flex-col items-center z-10"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute -top-12 right-0 sm:top-4 sm:right-4 z-20 p-2.5 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Navigation Arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => onNavigate((currentIndex - 1 + images.length) % images.length)}
                className="absolute left-2 sm:-left-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Previous image"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={() => onNavigate((currentIndex + 1) % images.length)}
                className="absolute right-2 sm:-right-12 top-1/2 -translate-y-1/2 z-20 p-3 rounded-full bg-black/60 hover:bg-black/80 text-white backdrop-blur-xs transition-colors cursor-pointer"
                aria-label="Next image"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </>
          )}

          {/* Main Image Container */}
          <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] max-h-[70vh] rounded-2xl overflow-hidden bg-black/40 shadow-2xl border border-white/15">
            <Image
              src={currentImage.url}
              alt={currentImage.caption || "DISCC Gallery Photo"}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>

          {/* Caption & Counter */}
          <div className="mt-4 text-center text-white">
            {currentImage.caption && (
              <p className="text-base font-medium text-white/90 max-w-xl mx-auto">
                {currentImage.caption}
              </p>
            )}
            <div className="flex items-center justify-center gap-3 mt-1.5 text-xs text-white/60">
              {currentImage.category && <span>{currentImage.category}</span>}
              {currentImage.year && <span>&bull; Year {currentImage.year}</span>}
              <span>&bull; {currentIndex + 1} of {images.length}</span>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
