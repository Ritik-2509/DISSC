"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  MapPin,
  Sparkles,
  ArrowRight,
  Heart,
  Users,
  Camera,
  Layers,
  Award,
  Maximize2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandUnderline } from "@/components/ui/HandDrawn";

interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  caption: string;
  category: string;
  year: string;
  aspect: string; // "aspect-[4/3]" | "aspect-[3/4]" | "aspect-[16/10]"
}

const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "cm-award-ceremony",
    url: "/images/discc/award-ceremony.png",
    title: "UP Chief Minister State Award Felicitation",
    caption: "Dr. C. Tulsi Das receiving the Best Professional Psychologist State Award from Hon'ble UP Chief Minister Yogi Adityanath.",
    category: "State Honors",
    year: "2019",
    aspect: "aspect-[16/11]"
  },
  {
    id: "role-model-award",
    url: "/images/discc/role-model-award.png",
    title: "State Role Model Award",
    caption: "Felicitation ceremony recognizing DISCC's decades of pioneering neurodivergent rehabilitation.",
    category: "State Honors",
    year: "2023",
    aspect: "aspect-[4/3]"
  },
  {
    id: "dr-tulsi-clinic",
    url: "/images/discc/dr-tulsi-clinic.png",
    title: "Early Diagnostic Consultation",
    caption: "Dr. Tulsi conducting psychological assessments and developmental mapping at Deva Center, Kamachha.",
    category: "Clinical Care",
    year: "Archive",
    aspect: "aspect-[4/3]"
  },
  {
    id: "children-activity",
    url: "/images/discc/children-activity.png",
    title: "Inclusive Sensory Classroom",
    caption: "Special learners engaging in tactile motor-skill and social interaction exercises.",
    category: "Education",
    year: "2025",
    aspect: "aspect-[16/10]"
  },
  {
    id: "children-therapy",
    url: "/images/discc/children-therapy.jpg",
    title: "Pediatric Physical Rehabilitation",
    caption: "Individualized sensory integration and gait coordination session for motor enhancement.",
    category: "Clinical Care",
    year: "2025",
    aspect: "aspect-[4/3]"
  },
  {
    id: "community-program",
    url: "/images/discc/community-program.png",
    title: "Rural Outreach at Deva Gram",
    caption: "Community gathering and free health screening camp at our Bachhaon rural sanctuary campus.",
    category: "Rural Outreach",
    year: "2024",
    aspect: "aspect-[16/10]"
  },
  {
    id: "hero-children",
    url: "/images/discc/hero-children.png",
    title: "Annapurna Center Girl Child Refuge",
    caption: "Vocational handicraft, literacy, and nutrition programs for rural young girls.",
    category: "Rural Outreach",
    year: "2025",
    aspect: "aspect-[16/11]"
  },
  {
    id: "founders-meet",
    url: "/images/discc/founders-meet.jpg",
    title: "Indo-European Solidarity Partnership",
    caption: "Dr. Tulsi Das and Jean-Max Tassel discussing international clinical exchanges.",
    category: "Global Solidarity",
    year: "Archive",
    aspect: "aspect-[4/3]"
  },
  {
    id: "dr-tulsi-portrait",
    url: "/images/discc/dr-tulsi-portrait.jpg",
    title: "Dr. C. Tulsi Das in the Field",
    caption: "Three and a half decades of unwavering grassroots commitment to special children.",
    category: "Clinical Care",
    year: "Archive",
    aspect: "aspect-[3/4]"
  }
];

const CATEGORIES = ["All", "State Honors", "Clinical Care", "Rural Outreach", "Education", "Global Solidarity"];

const COMMUNITY_EVENTS = [
  {
    title: "Annual Purple Fair for Divyangjan 2026",
    date: "February 2026",
    location: "Deva Center, Kamachha, Varanasi",
    desc: "A joyful annual gathering uniting over 500 neurodivergent children for adaptive games, art showcases, and music."
  },
  {
    title: "Monthly Parental Psychological Circles",
    date: "Every Alternate Saturday",
    location: "Deva Center Clinical Wing",
    desc: "Free group counseling led by Dr. Tulsi Das helping families navigate sensory regulation and caregiver wellness."
  },
  {
    title: "Sensory Hydrotherapy Weekend Camp",
    date: "First Weekend of Every Month",
    location: "Deva Gram (Bachhaon Campus)",
    desc: "Specialized low-impact water therapy and outdoor nature stimulation for neuromuscular mobility."
  }
];

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeLightboxPhoto, setActiveLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const filteredPhotos = selectedCategory === "All"
    ? GALLERY_PHOTOS
    : GALLERY_PHOTOS.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full flex flex-col items-center bg-[#FAF7F0] text-[#1A2530]">
      
      {/* 1. Page Header */}
      <section className="w-full pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#E8DFD3] bg-[#FAF7F0]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-2">
              Documentary Archive & Events
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] leading-tight">
              A Photographic Record of Human Dignity.
            </h1>
            <div className="mt-2 mb-4">
              <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
            </div>
            <p className="text-base sm:text-lg text-[#5B6B7C] leading-relaxed">
              Real photographs documenting 35 years of clinical diagnostics, state award ceremonies, rural community camps, and the joyful growth of our children.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Understated Category Filter Tabs */}
      <section className="w-full py-6 bg-[#FFFDF9] border-b border-[#E8DFD3] sticky top-16 z-20 backdrop-blur-md">
        <div className="container-custom flex items-center gap-2 overflow-x-auto pb-1">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border ${
                selectedCategory === cat
                  ? "bg-[#1A2530] text-white border-[#1A2530] shadow-xs"
                  : "bg-white text-[#5B6B7C] border-[#E8DFD3] hover:text-[#1A2530] hover:bg-[#FAF7F0]"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. True Masonry Gallery Grid (Natural Aspect Ratios) */}
      <section className="w-full py-16 md:py-24 bg-[#FAF7F0] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                onClick={() => setActiveLightboxPhoto(photo)}
                className="break-inside-avoid bg-white p-3 rounded-2xl border border-[#E8DFD3] shadow-xs hover:shadow-md transition-all cursor-pointer group"
              >
                <div className={`relative w-full ${photo.aspect} rounded-xl overflow-hidden bg-[#F2ECE1]`}>
                  <Image
                    src={photo.url}
                    alt={photo.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-103"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="p-2.5 rounded-full bg-white/90 text-[#1A2530] shadow-md">
                      <Maximize2 className="w-4 h-4" />
                    </span>
                  </div>
                  <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-white/95 backdrop-blur-xs text-[11px] font-bold text-[#0F8B8D] shadow-xs">
                    {photo.year}
                  </div>
                </div>

                <div className="pt-3 px-1">
                  <h3 className="text-sm font-bold text-[#1A2530] leading-snug group-hover:text-[#0F8B8D] transition-colors">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#5B6B7C] mt-1 leading-relaxed">
                    {photo.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Events & Clinical Gatherings (Clean List - No Cards) */}
      <section className="w-full py-20 bg-[#FFFDF9] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="max-w-2xl mb-12 text-left">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
              Community Calendar
            </span>
            <h2 className="text-3xl font-heading font-bold text-[#1A2530]">
              Regular Clinical Gatherings & Annual Festivals.
            </h2>
          </div>

          <div className="space-y-6">
            {COMMUNITY_EVENTS.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#E8DFD3] flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-3 py-1 rounded-full bg-[#FFF3E0] text-[#8B4500] text-xs font-bold">
                      {evt.date}
                    </span>
                    <span className="flex items-center gap-1 text-xs text-[#5B6B7C] font-semibold">
                      <MapPin className="w-3.5 h-3.5 text-[#0F8B8D]" />
                      {evt.location}
                    </span>
                  </div>
                  <h3 className="text-xl font-heading font-bold text-[#1A2530]">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6B7C] max-w-3xl leading-relaxed">
                    {evt.desc}
                  </p>
                </div>
                <div className="shrink-0">
                  <Link href="/contact">
                    <Button variant="outline" size="sm" className="rounded-full border-[#C8BFB3] text-[#1A2530] font-bold cursor-pointer">
                      Register / Inquire
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* Full-Bleed Lightbox Modal */}
      <AnimatePresence>
        {activeLightboxPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1A2530]/90 backdrop-blur-sm p-4 sm:p-8 flex items-center justify-center"
            onClick={() => setActiveLightboxPhoto(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setActiveLightboxPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-black/10 hover:bg-black/20 text-[#1A2530] cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#F2ECE1]">
                <Image
                  src={activeLightboxPhoto.url}
                  alt={activeLightboxPhoto.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="mt-4 px-1">
                <div className="flex items-center gap-2 mb-1 text-xs font-bold text-[#0F8B8D]">
                  <span>{activeLightboxPhoto.category}</span>
                  <span>&bull;</span>
                  <span>{activeLightboxPhoto.year}</span>
                </div>
                <h3 className="text-lg sm:text-xl font-heading font-bold text-[#1A2530]">
                  {activeLightboxPhoto.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#5B6B7C] mt-1 leading-relaxed">
                  {activeLightboxPhoto.caption}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
