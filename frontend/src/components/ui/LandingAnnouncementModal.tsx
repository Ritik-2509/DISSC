"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { X, Phone, Heart, ArrowRight, Sparkles, CheckCircle, Bell } from "lucide-react";

export function LandingAnnouncementModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  // Auto show on first landing after brief delay for dramatic attention
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 1200);
    return () => clearTimeout(timer);
  }, []);

  const programs = [
    {
      code: "CEP",
      title: "Child Education Program (CEP)",
      desc: "Inclusive special schooling, adaptive IEP learning boards, and assistive devices for neurodivergent children in Varanasi.",
      image: "/images/discc/children-activity.png",
      tag: "Special Education",
      link: "/programs/ambedkar-school",
      tagColor: "bg-emerald-100 text-emerald-800 border-emerald-300",
      slideDirection: "left", // Slides from Left to Right
    },
    {
      code: "HELPLINE",
      title: "Emergency Clinical Helpline",
      desc: "24/7 direct tele-guidance with licensed clinical psychologists for autism diagnosis, cerebral palsy therapy & parent counseling.",
      image: "/images/discc/dr-tulsi-clinic.png",
      tag: "Immediate Support",
      link: "tel:7007453168",
      tagColor: "bg-rose-100 text-rose-800 border-rose-300",
      slideDirection: "right", // Slides from Right to Left
      isPhone: true,
    },
    {
      code: "ANNAPURNA",
      title: "Annapurna Centre",
      desc: "Residential haven providing adolescent girls and women nutrition, safe shelter, and vocational handicraft self-reliance.",
      image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790591723/discc/events/gangotri-annapurna/gangotri-annapurna_annapurna-cover.jpg",
      tag: "Women & Vocational",
      link: "/programs/nakuti-raghunath-school",
      tagColor: "bg-amber-100 text-amber-800 border-amber-300",
      slideDirection: "left", // Slides from Left to Right
    },
    {
      code: "GANGOTRI",
      title: "Gangotri Rural Sanctuary",
      desc: "5-acre Bachhaon rural sanctuary equipped with pediatric hydrotherapy pool, sensory gardens, and residential respite cottages.",
      image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790592576/discc/events/historical-genesis/historical-genesis_172.jpg",
      tag: "Rural Sanctuary",
      link: "/programs/gangotri-centre",
      tagColor: "bg-teal-100 text-teal-800 border-teal-300",
      slideDirection: "right", // Slides from Right to Left
    },
  ];

  return (
    <>
      {/* Movable & Floating Trigger Badge on Right-Center with Cancel "X" Option */}
      <AnimatePresence>
        {!isOpen && !isDismissed && (
          <motion.div
            drag
            dragMomentum={false}
            whileDrag={{ scale: 1.08, cursor: "grabbing" }}
            initial={{ opacity: 0, x: 60 }}
            animate={{ 
              opacity: 1, 
              x: 0, 
              y: ["-50%", "-54%", "-50%"] 
            }}
            exit={{ opacity: 0, scale: 0.8, x: 60 }}
            transition={{
              y: { duration: 3.8, repeat: Infinity, ease: "easeInOut" },
              opacity: { duration: 0.35 },
              x: { duration: 0.35 }
            }}
            className="fixed right-3 bottom-20 sm:bottom-auto sm:right-6 sm:top-1/2 sm:-translate-y-1/2 z-40 flex items-center bg-slate-950/95 text-white border-2 border-amber-400 rounded-full shadow-[0_12px_36px_rgba(0,0,0,0.45)] backdrop-blur-md cursor-grab active:cursor-grabbing select-none group"
          >
            {/* Click to open modal */}
            <div
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 sm:gap-2.5 py-2 sm:py-2.5 pl-3 sm:pl-3.5 pr-2 hover:bg-white/10 rounded-l-full transition-colors cursor-pointer"
              title="Click to view Active Programs (or Drag to move anywhere)"
            >
              <span className="relative flex h-2.5 w-2.5 sm:h-3 sm:w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 sm:h-3 sm:w-3 bg-amber-500" />
              </span>
              <Bell className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400 group-hover:rotate-12 transition-transform" />
              <div className="flex flex-col text-left">
                <span className="text-[10px] sm:text-[11px] font-black tracking-wide text-white leading-tight">
                  Active Programs
                </span>
                <span className="text-[8px] sm:text-[9px] font-medium text-amber-300/90 leading-none">
                  & Helpline
                </span>
              </div>
            </div>

            {/* Cancel / Dismiss "X" Button to remove from screen */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsDismissed(true);
              }}
              className="p-1.5 sm:p-2.5 ml-0.5 mr-1.5 rounded-full text-stone-400 hover:text-white hover:bg-rose-600 transition-all cursor-pointer"
              title="Dismiss notification"
              aria-label="Dismiss notification"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Attention Floating Pop-up Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop with Blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-950/75 backdrop-blur-md cursor-pointer"
            />

            {/* Floating Pop Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 25 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 25 }}
              transition={{ type: "spring", damping: 26, stiffness: 240 }}
              className="relative w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[620px] max-h-[88vh] flex flex-col bg-[#FAF8F5] rounded-2xl sm:rounded-3xl shadow-2xl border-2 border-amber-400 overflow-hidden z-50 my-auto text-left"
            >
              {/* Top Banner / Announcement Header */}
              <div className="relative bg-slate-950 text-white p-4 sm:p-7 border-b border-amber-400/40 shrink-0">
                {/* Background Archival Photo Accent with Scrim */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <Image
                    src="https://res.cloudinary.com/djbiwbdo/image/upload/v1790592003/discc/events/state-honors/state-honors_award-ceremony.png"
                    alt="DISCC Honors"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
                </div>

                {/* Close Cross Button ("X") */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/15 hover:bg-amber-400 hover:text-slate-950 text-white flex items-center justify-center transition-all cursor-pointer shadow-md group"
                  aria-label="Close Announcement"
                >
                  <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                </button>

                <div className="relative z-10 pr-10">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                    <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-300">
                      Active Field Initiatives & Helpline
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-white tracking-tight leading-tight">
                    Active Care Programs & Emergency Helpline
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-300 mt-1 leading-relaxed">
                    Connecting families across Eastern UP to certified clinical therapists, inclusive schooling, and direct respite sanctuaries.
                  </p>
                </div>
              </div>

              {/* 4 Active Programs Horizontal Bands with Slowed Sliding Image Hover & Smooth Exit */}
              <div className="p-3 sm:p-6 space-y-3 flex-1 overflow-y-auto custom-horizontal-scrollbar">
                {programs.map((item) => (
                  <div
                    key={item.code}
                    className="relative p-3 sm:p-4.5 rounded-2xl bg-white border border-stone-200/90 shadow-2xs hover:shadow-2xl hover:border-amber-400 hover:scale-[1.015] transition-all duration-300 flex items-center gap-3 sm:gap-4 group overflow-hidden"
                  >
                    {/* Sliding Image Banner on Hover (Slow, graceful 1.1s slide-in, simple soft fade out on cursor leave without sliding back) */}
                    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
                      <div
                        className={`absolute inset-0 transition-opacity duration-300 ${
                          item.slideDirection === "left"
                            ? "-translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:transition-all group-hover:duration-1000 group-hover:ease-out"
                            : "translate-x-full opacity-0 group-hover:opacity-100 group-hover:translate-x-0 group-hover:transition-all group-hover:duration-1000 group-hover:ease-out"
                        }`}
                      >
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          sizes="(max-width: 640px) 100vw, 600px"
                          className="object-cover object-center scale-105"
                        />
                        {/* High-Contrast Gradient Scrim guaranteeing 100% text legibility */}
                        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/96 via-slate-950/90 to-slate-900/82 backdrop-blur-[1px]" />
                      </div>
                    </div>

                    {/* Left Thumbnail with Hover Motion & Amber Border Highlight */}
                    <div className="relative w-16 h-16 sm:w-22 sm:h-22 rounded-xl overflow-hidden bg-stone-100 shrink-0 border border-stone-200 group-hover:border-amber-400/80 transition-all duration-500 group-hover:scale-105 group-hover:shadow-lg z-10">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="90px"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    {/* Content & Action with Dynamic Adaptive Contrast */}
                    <div className="flex-1 min-w-0 relative z-10">
                      <div className="flex items-center gap-2 mb-1">
                        <span
                          className={`text-[9px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md border transition-all duration-300 ${item.tagColor} group-hover:bg-amber-400 group-hover:text-slate-950 group-hover:border-amber-400 group-hover:shadow-xs`}
                        >
                          {item.tag}
                        </span>
                      </div>

                      {/* Title: Dark Slate in normal state -> Crisp Pure White on Hover */}
                      <h3 className="text-xs sm:text-base font-heading font-bold text-slate-900 group-hover:text-white transition-colors duration-300 leading-snug drop-shadow-xs">
                        {item.title}
                      </h3>

                      {/* Description: Slate-600 in normal state -> Soft Bright Stone-100 on Hover */}
                      <p className="text-[11px] sm:text-xs text-slate-600 group-hover:text-stone-100 transition-colors duration-300 line-clamp-2 mt-0.5 leading-relaxed font-normal">
                        {item.desc}
                      </p>

                      {/* Action Link: High contrast in both normal and hover */}
                      <div className="mt-2">
                        {item.isPhone ? (
                          <a
                            href="tel:7007453168"
                            className="inline-flex items-center gap-1.5 text-xs font-black text-rose-700 group-hover:text-rose-300 hover:underline transition-colors duration-300"
                          >
                            <Phone className="w-3.5 h-3.5" />
                            <span>Call 7007453168 Directly</span>
                          </a>
                        ) : (
                          <Link
                            href={item.link}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 text-xs font-black text-amber-700 group-hover:text-amber-300 group-hover:translate-x-1 transition-all duration-300"
                          >
                            <span>Learn Details</span>
                            <ArrowRight className="w-3 h-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Bottom Quick Action Strip */}
              <div className="p-3.5 sm:p-5 bg-white border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
                <div className="flex items-center gap-2 text-xs text-slate-600 font-semibold">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Licensed Clinical Doctors in Varanasi</span>
                </div>

                <div className="flex items-center gap-2.5 w-full sm:w-auto">
                  <a
                    href="tel:7007453168"
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs shadow-xs"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Helpline</span>
                  </a>
                  <Link
                    href="/donate"
                    onClick={() => setIsOpen(false)}
                    className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-1.5 px-5 py-2.5 rounded-full bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-xs shadow-md"
                  >
                    <Heart className="w-3.5 h-3.5 fill-slate-950" />
                    <span>Sponsor Care</span>
                  </Link>
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}

