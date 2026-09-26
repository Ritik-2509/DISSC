"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, Heart, ArrowRight, Sparkles, ChevronLeft, ChevronRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const STORIES = [
  {
    id: "tanisha",
    name: "Tanisha (Age 9)",
    parent: "Sunita Devi (Mother), Varanasi",
    condition: "Cerebral Palsy & Spastic Diplegia",
    milestone: "Walks independently to school after 2 years of hydrotherapy",
    quote: "When we brought Tanisha to Deva Center, she could not take even two steps without crying from intense muscle spasms. The hydrotherapy pool in Bachhaon and gentle gait physiotherapy gave her legs strength. Today she walks into her primary school with pure joy and confidence.",
    image: "/images/discc/children-therapy.jpg",
    accent: "border-teal-400 bg-teal-50 text-teal-800",
    badge: "Hydrotherapy Milestone"
  },
  {
    id: "rahul",
    name: "Rahul (Age 11)",
    parent: "Ramesh Sharma (Father), Chandauli",
    condition: "Autism Spectrum & Non-Verbal",
    milestone: "Communicates fluently with adaptive picture IEP boards",
    quote: "The personalized clinical psychological plan at Deva Center changed our entire household. Rahul had severe sensory meltdowns because he could not express his thoughts. The therapists gave him a voice, and today he loves math and group painting.",
    image: "/images/discc/children-activity.png",
    accent: "border-amber-400 bg-amber-50 text-amber-800",
    badge: "Speech & AAC Breakthrough"
  },
  {
    id: "priya",
    name: "Priya (Age 16)",
    parent: "Geeta Verma (Mother), Bachhaon",
    condition: "Down Syndrome",
    milestone: "Earns independent monthly income via artisan embroidery",
    quote: "Annapurna Center gave my daughter self-respect. Priya was once excluded from village gatherings. Now she creates intricate embroidered textile bags that were showcased at state exhibitions, earning her own monthly stipend.",
    image: "/images/discc/hero-children.png",
    accent: "border-rose-400 bg-rose-50 text-rose-800",
    badge: "Artisan Empowerment"
  }
];

export function StoryShowcase() {
  const [activeStory, setActiveStory] = useState(0);

  const prevStory = () => {
    setActiveStory((prev) => (prev === 0 ? STORIES.length - 1 : prev - 1));
  };

  const nextStory = () => {
    setActiveStory((prev) => (prev + 1) % STORIES.length);
  };

  const story = STORIES[activeStory];

  return (
    <section className="w-full py-20 md:py-28 bg-gradient-to-b from-[#FFFDF9] via-[#FFF8EE] to-[#FFF4E4] border-b border-amber-200/70 relative overflow-hidden">
      
      <div className="container-custom relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Living Proof & Milestones</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Stories of Joy, Growth & Dignity.
            </h2>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3 mt-4 md:mt-0">
            <button
              onClick={prevStory}
              className="p-3 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white shadow-sm transition-all cursor-pointer"
              aria-label="Previous Story"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextStory}
              className="p-3 rounded-full bg-white border border-slate-300 text-slate-700 hover:bg-slate-900 hover:text-white shadow-sm transition-all cursor-pointer"
              aria-label="Next Story"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Feature Story Card Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={story.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-10 rounded-3xl bg-white border-2 border-amber-200 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left: Large Portrait Photo */}
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-black shadow-md border ${story.accent}`}>
                      {story.badge}
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-amber-50/70 rounded-xl mt-3 border border-amber-200/80">
                  <p className="text-xs font-bold text-slate-800">
                    Condition: <span className="font-medium text-slate-600">{story.condition}</span>
                  </p>
                  <p className="text-xs font-bold text-teal-700 mt-0.5">
                    Milestone: <span className="font-medium text-slate-700">{story.milestone}</span>
                  </p>
                </div>
              </div>

              {/* Right: Narrative Quote */}
              <div className="lg:col-span-7 flex flex-col justify-center text-left">
                <Quote className="w-12 h-12 text-amber-400 mb-3" />
                
                <p className="text-base sm:text-lg lg:text-xl font-serif text-slate-800 leading-relaxed italic mb-6">
                  &ldquo;{story.quote}&rdquo;
                </p>

                <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900">
                      {story.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                      Attributed by: {story.parent}
                    </p>
                  </div>

                  <Link href="/stories">
                    <Button
                      size="sm"
                      variant="outline"
                      className="rounded-full font-bold text-xs border-slate-300 text-slate-800 hover:bg-slate-900 hover:text-white"
                    >
                      Read Full Story
                    </Button>
                  </Link>
                </div>

              </div>

            </div>
          </motion.div>
        </AnimatePresence>

      </div>

    </section>
  );
}
