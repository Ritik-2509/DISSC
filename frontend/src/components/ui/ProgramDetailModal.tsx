"use client";

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { X, ArrowRight, Heart, MapPin, Calendar, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface ProgramItem {
  id: string;
  title: string;
  subtitle: string;
  category: "current" | "past";
  sdgColor: string;
  sdgThemeClass: string;
  sdgName: string;
  targetGroup: "Women & Girls" | "Special Children" | "Rural Communities" | "All Individuals";
  image: string;
  badge: string;
  year: string;
  location: string;
  summary: string;
  fullDetails: {
    overview: string;
    impactNumbers: string;
    highlights: string[];
    futureGoals?: string;
  };
}

interface ProgramDetailModalProps {
  program: ProgramItem | null;
  onClose: () => void;
}

export function ProgramDetailModal({ program, onClose }: ProgramDetailModalProps) {
  if (!program) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 my-8 border border-border"
        >
          {/* Header Strip with Dynamic SDG Tone */}
          <div
            className="p-6 sm:p-8 text-white relative overflow-hidden"
            style={{ backgroundColor: program.sdgColor }}
          >
            {/* Ambient Background Accent */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-white/10 blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between gap-4 relative z-10">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-black/25 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white">
                    {program.sdgName}
                  </span>
                  <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-[11px] font-bold uppercase tracking-wider text-white">
                    {program.targetGroup}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white leading-tight">
                  {program.title}
                </h3>
                <p className="text-white/90 text-sm font-medium">
                  {program.subtitle}
                </p>
              </div>

              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-black/20 hover:bg-black/40 text-white flex items-center justify-center transition-colors flex-shrink-0"
                aria-label="Close details"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body Content */}
          <div className="p-6 sm:p-8 space-y-6 max-h-[70vh] overflow-y-auto">
            {/* Image Preview */}
            <div className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden shadow-md border border-border">
              <Image
                src={program.image}
                alt={program.title}
                fill
                className="object-cover"
              />
              <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1 rounded-full bg-secondary/85 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  {program.year}
                </span>
                <span className="px-3 py-1 rounded-full bg-secondary/85 backdrop-blur-md text-white text-xs font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5" />
                  {program.location}
                </span>
              </div>
            </div>

            {/* Overview */}
            <div className="space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                Program Mission & Scope
              </h4>
              <p className="text-foreground/90 text-base leading-relaxed">
                {program.fullDetails.overview}
              </p>
            </div>

            {/* Key Verified Highlights */}
            <div className="space-y-3 pt-2 border-t border-border">
              <h4 className="text-xs font-bold uppercase tracking-wider text-primary">
                Key Accomplishments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {program.fullDetails.highlights.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-foreground/80">
                    <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Impact Metric Banner */}
            <div className="p-4 rounded-2xl bg-muted/60 border border-border flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                  Documented Impact
                </span>
                <span className="text-lg font-display font-black text-secondary">
                  {program.fullDetails.impactNumbers}
                </span>
              </div>
              <Link href="/donate">
                <Button size="sm" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-5">
                  <Heart className="w-3.5 h-3.5 mr-1.5 fill-current" />
                  Support
                </Button>
              </Link>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-4 sm:p-6 bg-muted/30 border-t border-border flex items-center justify-between">
            <span className="text-xs text-muted-foreground">
              Varanasi, Uttar Pradesh, India
            </span>
            <div className="flex gap-3">
              <Button variant="outline" size="sm" onClick={onClose} className="rounded-full text-xs font-semibold">
                Close
              </Button>
              <Link href="/contact">
                <Button size="sm" className="rounded-full bg-secondary text-white hover:bg-secondary/90 text-xs font-bold uppercase tracking-wider">
                  Contact Center
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
