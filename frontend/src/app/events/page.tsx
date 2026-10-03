"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Layers,
  Grid,
  Maximize2,
  Calendar,
  MapPin,
  Camera,
  Filter,
  ArrowRight,
  Heart
} from "lucide-react";
import { HandUnderline } from "@/components/ui/HandDrawn";
import {
  EVENTS_CATALOG,
  ALL_EVENT_PHOTOS,
  EVENT_CATEGORIES,
  EventCollection,
  EventPhoto
} from "@/lib/eventsData";
import { EventCarouselCard } from "@/components/events/EventCarouselCard";
import { LightboxModal } from "@/components/events/LightboxModal";

const COMMUNITY_CALENDAR = [
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
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [viewMode, setViewMode] = useState<"carousels" | "wall">("carousels");
  const [lightboxState, setLightboxState] = useState<{
    isOpen: boolean;
    photos: EventPhoto[];
    index: number;
  }>({
    isOpen: false,
    photos: [],
    index: 0
  });

  // Filtered event collections
  const filteredEvents = useMemo(() => {
    if (selectedCategory === "All") return EVENTS_CATALOG;
    return EVENTS_CATALOG.filter((ev) => ev.category === selectedCategory);
  }, [selectedCategory]);

  // Filtered flat photos for wall view
  const filteredWallPhotos = useMemo(() => {
    if (selectedCategory === "All") return ALL_EVENT_PHOTOS;
    return ALL_EVENT_PHOTOS.filter((p) => p.category === selectedCategory);
  }, [selectedCategory]);

  const totalPhotosCount = ALL_EVENT_PHOTOS.length;

  const openLightbox = (photos: EventPhoto[], index: number) => {
    setLightboxState({
      isOpen: true,
      photos,
      index
    });
  };

  const closeLightbox = () => {
    setLightboxState((prev) => ({ ...prev, isOpen: false }));
  };

  const setLightboxIndex = (index: number) => {
    setLightboxState((prev) => ({ ...prev, index }));
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#F6F4EE] text-[#182321] min-h-screen">
      
      {/* 1. Page Header & Editorial Intro */}
      <section className="w-full pt-28 pb-12 md:pt-36 md:pb-16 border-b border-[#E5E0D4] bg-[#F6F4EE]">
        <div className="container-custom">
          <div className="max-w-4xl">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-2">
              Documentary Archive & Events
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#182321] leading-tight">
              A Photographic Record of Human Dignity.
            </h1>
            <div className="mt-2 mb-4">
              <HandUnderline className="text-[#F5A524] w-52 h-3.5" />
            </div>
            <p className="text-base sm:text-lg text-[#5B6B7C] leading-relaxed max-w-3xl">
              Over {totalPhotosCount} authentic photographs documenting 35 years of clinical diagnostics, rural sanctuary life, vocational skill building, state award honors, and community celebrations.
            </p>

            {/* Quick Metrics Bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8 pt-6 border-t border-[#E5E0D4]/80">
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#182321] font-heading">
                  {EVENTS_CATALOG.length}
                </span>
                <span className="text-xs font-semibold text-[#5B6B7C]">
                  Event Collections
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#0F8B8D] font-heading">
                  {totalPhotosCount}+
                </span>
                <span className="text-xs font-semibold text-[#5B6B7C]">
                  Archival Photos
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#D97706] font-heading">
                  100%
                </span>
                <span className="text-xs font-semibold text-[#5B6B7C]">
                  Cloudinary Synced
                </span>
              </div>
              <div>
                <span className="block text-2xl sm:text-3xl font-black text-[#182321] font-heading">
                  35+ Yrs
                </span>
                <span className="text-xs font-semibold text-[#5B6B7C]">
                  Grassroots Impact
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Interactive Navigation Bar (Category Filter & View Mode Switcher) */}
      <section className="w-full py-4 bg-white/95 backdrop-blur-md border-b border-[#E5E0D4] sticky top-16 z-30 shadow-xs">
        <div className="container-custom flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Category Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-none touch-pan-x w-full md:w-auto">
            {EVENT_CATEGORIES.map((cat) => {
              const count = cat === "All"
                ? totalPhotosCount
                : ALL_EVENT_PHOTOS.filter((p) => p.category === cat).length;

              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer border flex items-center gap-1.5 ${
                    selectedCategory === cat
                      ? "bg-[#182321] text-white border-[#182321] shadow-xs"
                      : "bg-[#F6F4EE] text-[#5B6B7C] border-[#E5E0D4] hover:text-[#182321] hover:bg-white"
                  }`}
                >
                  <span>{cat}</span>
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-black ${
                    selectedCategory === cat ? "bg-white/25 text-white" : "bg-stone-200/80 text-stone-700"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* View Mode Switcher */}
          <div className="flex items-center gap-1 bg-[#F6F4EE] p-1 rounded-xl border border-[#E5E0D4] shrink-0 self-start md:self-auto">
            <button
              onClick={() => setViewMode("carousels")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "carousels"
                  ? "bg-white text-[#182321] shadow-xs"
                  : "text-[#5B6B7C] hover:text-[#182321]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>Event Carousels</span>
            </button>
            <button
              onClick={() => setViewMode("wall")}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                viewMode === "wall"
                  ? "bg-white text-[#182321] shadow-xs"
                  : "text-[#5B6B7C] hover:text-[#182321]"
              }`}
            >
              <Grid className="w-3.5 h-3.5" />
              <span>Photo Wall ({filteredWallPhotos.length})</span>
            </button>
          </div>

        </div>
      </section>

      {/* 3. Event Quick Jump Anchor Rail (Visible in Carousel Mode) */}
      {viewMode === "carousels" && (
        <section className="w-full py-3 bg-[#F6F4EE] border-b border-[#E5E0D4]">
          <div className="container-custom flex items-center gap-2 overflow-x-auto scrollbar-none text-xs">
            <span className="font-bold text-[#5B6B7C] uppercase tracking-wider text-[11px] shrink-0">
              Quick Jump:
            </span>
            {filteredEvents.map((ev) => (
              <a
                key={ev.id}
                href={`#event-${ev.id}`}
                className="px-3 py-1 rounded-lg bg-white border border-[#E5E0D4] hover:border-[#182321] text-[#182321] font-semibold whitespace-nowrap hover:bg-stone-50 transition-colors shrink-0"
              >
                {ev.badge} ({ev.photos.length})
              </a>
            ))}
          </div>
        </section>
      )}

      {/* 4. Main Content: Event Chapters or Masonry Wall */}
      <section className="w-full py-6 md:py-10 bg-[#F6F4EE] border-b border-[#E5E0D4]">
        <div className="container-custom">

          {/* VIEW MODE 1: Interactive Event Chapters (Default) */}
          {viewMode === "carousels" && (
            <div className="flex flex-col divide-y divide-[#E5E0D4]">
              {filteredEvents.map((event, idx) => (
                <div key={event.id} id={`event-${event.id}`} className="scroll-mt-32">
                  <EventCarouselCard
                    event={event}
                    index={idx}
                    onOpenLightbox={(photos, index) => openLightbox(photos, index)}
                  />
                </div>
              ))}

              {filteredEvents.length === 0 && (
                <div className="py-20 text-center bg-white rounded-3xl border border-[#E5E0D4] p-8">
                  <Camera className="w-10 h-10 text-stone-400 mx-auto mb-3" />
                  <h3 className="text-lg font-bold text-slate-900 mb-1">
                    No event collections found in this category
                  </h3>
                  <p className="text-sm text-stone-500 mb-4">
                    Try selecting another category or view all collections.
                  </p>
                  <button
                    onClick={() => setSelectedCategory("All")}
                    className="px-4 py-2 rounded-full bg-slate-900 text-white text-xs font-bold"
                  >
                    View All Categories
                  </button>
                </div>
              )}
            </div>
          )}

          {/* VIEW MODE 2: Complete Photo Wall (Masonry Grid) */}
          {viewMode === "wall" && (
            <div>
              <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#E5E0D4]">
                <div>
                  <h2 className="text-xl sm:text-2xl font-heading font-black text-slate-900">
                    Complete Archival Photo Wall
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1">
                    Displaying {filteredWallPhotos.length} high-resolution photographs from our documentary archives.
                  </p>
                </div>
              </div>

              <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4 space-y-4">
                {filteredWallPhotos.map((photo, pIdx) => (
                  <div
                    key={`${photo.id}-${pIdx}`}
                    onClick={() => openLightbox(filteredWallPhotos, pIdx)}
                    className="break-inside-avoid bg-white p-2.5 rounded-2xl border border-[#E5E0D4] shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer group"
                  >
                    <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F2ECE1]">
                      <Image
                        src={photo.url}
                        alt={photo.title}
                        fill
                        loading="lazy"
                        className="object-cover transition-transform duration-500 group-hover:scale-104"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                        <span className="p-2 rounded-full bg-white/95 text-slate-900 shadow-md">
                          <Maximize2 className="w-4 h-4" />
                        </span>
                      </div>
                    </div>

                    <div className="pt-2 px-1">
                      <div className="flex items-center justify-between text-[10px] font-bold text-teal-800 uppercase tracking-wider mb-1">
                        <span>{photo.category}</span>
                        <span className="text-stone-500">{photo.year}</span>
                      </div>
                      <h3 className="text-xs font-bold text-slate-900 truncate group-hover:text-amber-600 transition-colors">
                        {photo.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>

      {/* 5. Community Events & Clinical Gatherings */}
      <section className="w-full py-16 md:py-20 bg-white border-b border-[#E5E0D4]">
        <div className="container-custom">
          
          <div className="max-w-2xl mb-12 text-left">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
              Community Calendar
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-[#182321]">
              Regular Clinical Gatherings & Annual Festivals
            </h2>
            <p className="text-sm text-[#5B6B7C] mt-2">
              Ongoing monthly caregiver workshops, neurodiversity festivals, and developmental camps hosted across Varanasi.
            </p>
          </div>

          <div className="space-y-4">
            {COMMUNITY_CALENDAR.map((evt, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-[#F6F4EE] border border-[#E5E0D4] flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-[#182321] transition-colors"
              >
                <div className="max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs font-bold text-[#0F8B8D] mb-1.5">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5" />
                      {evt.date}
                    </span>
                    <span className="text-[#E5E0D4]">•</span>
                    <span className="flex items-center gap-1 text-[#5B6B7C]">
                      <MapPin className="w-3.5 h-3.5" />
                      {evt.location}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-[#182321]">
                    {evt.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#5B6B7C] mt-1 leading-relaxed">
                    {evt.desc}
                  </p>
                </div>

                <div className="shrink-0">
                  <a
                    href="/contact"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#182321] text-xs font-bold text-[#182321] hover:bg-[#182321] hover:text-white transition-all cursor-pointer"
                  >
                    <span>RSVP / Inquire</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 6. Lightbox Fullscreen Modal */}
      <LightboxModal
        isOpen={lightboxState.isOpen}
        photos={lightboxState.photos}
        currentIndex={lightboxState.index}
        onClose={closeLightbox}
        onSelectIndex={setLightboxIndex}
      />

    </div>
  );
}
