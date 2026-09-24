"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface VideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  videoUrl?: string;
  title?: string;
}

export function VideoModal({
  isOpen,
  onClose,
  videoUrl = "https://www.youtube.com/embed/dQw4w9WgXcQ", // fallback
  title = "DISCC Story & Impact",
}: VideoModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
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
  }, [isOpen, onClose]);

  // Convert standard youtube link to embed URL if needed
  let embedSrc = videoUrl;
  if (videoUrl.includes("youtube.com/watch?v=")) {
    const videoId = videoUrl.split("watch?v=")[1]?.split("&")[0];
    embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (videoUrl.includes("youtu.be/")) {
    const videoId = videoUrl.split("youtu.be/")[1]?.split("?")[0];
    embedSrc = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  } else if (!embedSrc.includes("autoplay=1") && embedSrc.includes("youtube.com/embed/")) {
    embedSrc += "?autoplay=1";
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-5xl aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border border-white/20 z-10"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-black/60 text-white/90 hover:text-white hover:bg-black/90 transition-colors backdrop-blur-xs"
              aria-label="Close video dialog"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Video Iframe or HTML5 Video */}
            {embedSrc.endsWith(".mp4") || embedSrc.includes("/public/video/") ? (
              <video
                src={embedSrc}
                controls
                autoPlay
                className="w-full h-full object-cover"
              />
            ) : (
              <iframe
                src={embedSrc}
                title={title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              />
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
