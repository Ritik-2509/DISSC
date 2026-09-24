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
  Award
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox, LightboxImage } from "@/components/ui/Lightbox";

const UPCOMING_EVENTS = [
  {
    id: "purple-fair-2026",
    title: "Purple Fair for Divyangjan 2026",
    category: "Annual Flagship",
    date: "February 2026",
    location: "Deva Center, Kamachha, Varanasi",
    image: "/images/discc/children-activity.png",
    description: "An exuberant annual carnival bringing together over 500 neurodivergent and physically challenged children across Eastern UP for inclusive games, classical music, and artwork auctions.",
  },
  {
    id: "study-abroad-immersion",
    title: "University Study Abroad Clinical Exchange",
    category: "Global Solidarity",
    date: "Annual Winter Session",
    location: "Varanasi / DISCC Centers",
    image: "/images/discc/founders-meet.jpg",
    description: "Coordinated by Dr. Tulsi Das, offering international psychology and social work scholars deep immersion in community-based rehabilitation, eastern philosophy, and disability care.",
  },
  {
    id: "sensory-yoga-cohort",
    title: "Sensory Yoga & Physical Regulation Cohort",
    category: "Therapeutic Health",
    date: "Monthly Cohorts",
    location: "Deva Gram (Bachhaon Campus)",
    image: "/images/discc/community-program.png",
    description: "Adaptive gentle yoga and sensory regulation workshops designed for children with cerebral palsy and neuromuscular mobility differences.",
  },
  {
    id: "parent-counseling-circle",
    title: "Parental Psychological Counseling Circles",
    category: "Caregiver Support",
    date: "Every Alternate Saturday",
    location: "Deva Center Clinical Wing",
    image: "/images/discc/dr-tulsi-clinic.png",
    description: "Free guided clinical sessions led by Dr. Tulsi Das for mothers and caregivers to reduce caregiver fatigue, build behavioral toolkits, and foster community support.",
  }
];

const GALLERY_ITEMS: LightboxImage[] = [
  {
    url: "/images/discc/award-ceremony.png",
    caption: "Dr. Tulsi receiving the Best Professional Psychologist Award from Chief Minister Yogi Adityanath",
    category: "Recognition",
    year: "2024",
  },
  {
    url: "/images/discc/children-activity.png",
    caption: "Inclusive classroom art and motor skill development at Deva Center",
    category: "Education",
    year: "2025",
  },
  {
    url: "/images/discc/role-model-award.png",
    caption: "State Role Model Felicitation Ceremony celebrating excellence in ID rehabilitation",
    category: "Recognition",
    year: "2023",
  },
  {
    url: "/images/discc/children-therapy.jpg",
    caption: "Sensory integration and physical physiotherapy session at Deva Center",
    category: "Clinical Care",
    year: "2025",
  },
  {
    url: "/images/discc/community-program.png",
    caption: "Rural community empowerment gathering at Deva Gram campus, Bachhaon",
    category: "Action Areas",
    year: "2024",
  },
  {
    url: "/images/discc/hero-children.png",
    caption: "Annapurna Center young girls during vocational textile and embroidery workshop",
    category: "Action Areas",
    year: "2025",
  },
  {
    url: "/images/discc/dr-tulsi-clinic.png",
    caption: "One-on-one psychological counseling with special child and family",
    category: "Clinical Care",
    year: "2024",
  },
  {
    url: "/images/discc/founders-meet.jpg",
    caption: "Historic exchange meeting between Dr. Tulsi and international patrons",
    category: "Historical",
    year: "1998",
  },
  {
    url: "/images/discc/deva-building.jpg",
    caption: "Deva Center flagship rehabilitation campus in Kamachha, Varanasi",
    category: "Facilities",
    year: "1991",
  }
];

export default function EventsAndGalleryPage() {
  const [selectedTab, setSelectedTab] = useState<"events" | "gallery">("events");
  const [galleryFilter, setGalleryFilter] = useState<string>("all");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filteredGallery = GALLERY_ITEMS.filter((item) => {
    if (galleryFilter === "all") return true;
    if (galleryFilter === "2025-2026") return item.year === "2025" || item.year === "2026" || item.year === "2024";
    if (galleryFilter === "recognition") return item.category === "Recognition";
    if (galleryFilter === "clinical") return item.category === "Clinical Care" || item.category === "Education";
    if (galleryFilter === "action-areas") return item.category === "Action Areas" || item.category === "Facilities";
    return true;
  });

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#FFFAF2]">
      {/* 1. Header */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#FFEFE0]/60 to-[#FFFAF2] relative">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-4">
              Community & Celebrations
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.1]">
              Events, Workshops & Visual Gallery
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-text leading-relaxed max-w-[60ch]">
              Experience the vibrant spirit of our inclusive festivals, international cultural exchanges, and daily rehabilitation milestones in Varanasi.
            </p>

            {/* Navigation Tabs */}
            <div className="mt-8 flex items-center gap-3">
              <button
                onClick={() => setSelectedTab("events")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  selectedTab === "events"
                    ? "bg-primary text-white shadow-soft"
                    : "bg-white text-muted-text hover:bg-muted border border-border"
                }`}
              >
                Upcoming & Flagship Events
              </button>
              <button
                onClick={() => setSelectedTab("gallery")}
                className={`px-6 py-2.5 rounded-full text-sm font-bold transition-all cursor-pointer ${
                  selectedTab === "gallery"
                    ? "bg-primary text-white shadow-soft"
                    : "bg-white text-muted-text hover:bg-muted border border-border"
                }`}
              >
                Photo Gallery ({GALLERY_ITEMS.length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Events Content */}
      {selectedTab === "events" && (
        <section className="w-full py-16 md:py-24 bg-white border-y border-border/70 relative">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {UPCOMING_EVENTS.map((event, idx) => (
                <Reveal key={event.id} delay={idx * 0.1}>
                  <div className="rounded-3xl bg-[#FFFAF2]/60 border border-border/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between h-full">
                    <div>
                      <div className="relative aspect-[16/10] w-full bg-muted">
                        <Image
                          src={event.image}
                          alt={event.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-xs">
                          {event.category}
                        </div>
                      </div>

                      <div className="p-6 sm:p-8 space-y-3">
                        <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted-text">
                          <span className="flex items-center gap-1.5 text-primary font-bold">
                            <Calendar className="w-4 h-4" />
                            {event.date}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4 text-primary" />
                            {event.location}
                          </span>
                        </div>

                        <h3 className="text-2xl font-bold font-heading text-foreground">
                          {event.title}
                        </h3>

                        <p className="text-sm text-muted-text leading-relaxed">
                          {event.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 sm:p-8 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                      <Link href="/contact#callback">
                        <Button variant="default" size="sm" className="rounded-full">
                          Register / Inquire
                        </Button>
                      </Link>
                      <span className="text-xs font-semibold text-primary">
                        Open for Participation
                      </span>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 3. Gallery Content */}
      {selectedTab === "gallery" && (
        <section className="w-full py-16 md:py-24 bg-white border-y border-border/70 relative">
          <div className="container-custom">
            {/* Gallery Filters */}
            <div className="mb-10 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setGalleryFilter("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  galleryFilter === "all"
                    ? "bg-primary text-white"
                    : "bg-[#FFFAF2] text-muted-text hover:bg-muted border border-border"
                }`}
              >
                All Photos
              </button>
              <button
                onClick={() => setGalleryFilter("2025-2026")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  galleryFilter === "2025-2026"
                    ? "bg-primary text-white"
                    : "bg-[#FFFAF2] text-muted-text hover:bg-muted border border-border"
                }`}
              >
                2024-2026 Highlights
              </button>
              <button
                onClick={() => setGalleryFilter("recognition")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  galleryFilter === "recognition"
                    ? "bg-primary text-white"
                    : "bg-[#FFFAF2] text-muted-text hover:bg-muted border border-border"
                }`}
              >
                State Awards & Recognition
              </button>
              <button
                onClick={() => setGalleryFilter("clinical")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  galleryFilter === "clinical"
                    ? "bg-primary text-white"
                    : "bg-[#FFFAF2] text-muted-text hover:bg-muted border border-border"
                }`}
              >
                Clinical Therapy & Classrooms
              </button>
              <button
                onClick={() => setGalleryFilter("action-areas")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors cursor-pointer ${
                  galleryFilter === "action-areas"
                    ? "bg-primary text-white"
                    : "bg-[#FFFAF2] text-muted-text hover:bg-muted border border-border"
                }`}
              >
                Rural Sanctuaries (Deva Gram / Annapurna)
              </button>
            </div>

            {/* Gallery Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredGallery.map((item, idx) => (
                <Reveal key={item.url} delay={idx * 0.05}>
                  <div
                    onClick={() => handleOpenLightbox(idx)}
                    className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft cursor-pointer bg-muted"
                  >
                    <Image
                      src={item.url}
                      alt={item.caption || "DISCC Gallery Photo"}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-108"
                      sizes="(max-width: 768px) 50vw, 25vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                      <span className="text-[11px] font-semibold text-[#F5A524]">
                        {item.category} &bull; {item.year}
                      </span>
                      <p className="text-xs sm:text-sm font-medium line-clamp-2">
                        {item.caption}
                      </p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Lightbox */}
      <Lightbox
        images={filteredGallery}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
