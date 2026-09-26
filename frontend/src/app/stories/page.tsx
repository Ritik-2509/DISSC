"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Heart, Quote, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandUnderline } from "@/components/ui/HandDrawn";

const FEATURED_STORY = {
  id: "tanisha-journey",
  title: "From Immobility to Independent Steps: Tanisha's Two-Year Breakthrough",
  category: "Clinical Case Study",
  date: "Deva Center, Kamachha · 2025",
  lead: "Diagnosed with severe cerebral palsy and spastic diplegia at age 7, Tanisha faced intense muscular contraction that prevented her from standing. Through intensive hydrotherapy at Bachhaon and adaptive gait physiotherapy at Kamachha, she now walks to primary school without braces.",
  quote: "Her first independent steps on the therapy lawn brought tears to all our therapists. When you pair targeted scientific therapy with consistent parental love, the human body overcomes staggering barriers.",
  author: "Dr. C. Tulsi Das, Clinical Director",
  image: "/images/discc/children-therapy.jpg"
};

const EDITORIAL_STORIES = [
  {
    id: "purple-fair-2026",
    title: "Annual Purple Fair 2026: Uniting 500+ Special Children in Varanasi",
    category: "Community Inclusion",
    date: "February 2026",
    image: "/images/discc/children-activity.png",
    summary: "An exuberant annual carnival bringing together over 500 neurodivergent and physically challenged children across Eastern UP for inclusive games, classical music, and artwork auctions.",
  },
  {
    id: "rural-breakthroughs",
    title: "Overcoming Village Stigma: The Bachhaon Caregiver Circles",
    category: "Rural Outreach",
    date: "December 2025",
    image: "/images/discc/community-program.png",
    summary: "How regular counseling and physical therapy at Deva Gram removed superstitious stigma and gave rural families immense pride in their children's cognitive growth.",
  },
  {
    id: "annapurna-empowerment",
    title: "Priya's Artisan Journey: Down Syndrome to State Exhibition Recognition",
    category: "Girl Child Protection",
    date: "November 2025",
    image: "/images/discc/hero-children.png",
    summary: "Annapurna Center gave Priya self-reliance through vocational embroidery. Today her handmade textile bags are showcased at state handicraft fairs.",
  },
  {
    id: "international-solidarity",
    title: "Indo-European Clinical Solidarity: 25 Years of Deva Europe",
    category: "Global Partnership",
    date: "October 2025",
    image: "/images/discc/founders-meet.jpg",
    summary: "How Dr. Tulsi and French art historian Jean-Max Tassel built a lasting bridge of clinical collaboration, volunteer programs, and donor support for Varanasi.",
  },
  {
    id: "state-award-retrospective",
    title: "Three Decades of Clinical Rigor: The UP Chief Minister State Award",
    category: "State Honor",
    date: "September 2025",
    image: "/images/discc/award-ceremony.png",
    summary: "Reflecting on Dr. Tulsi Das's recognition by Hon'ble UP Chief Minister Yogi Adityanath for pioneering intellectual disability care in Eastern Uttar Pradesh.",
  }
];

export default function StoriesPage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#FAF7F0] text-[#1A2530]">
      
      {/* 1. Page Header */}
      <section className="w-full pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#E8DFD3] bg-[#FAF7F0]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-2">
              Clinical Case Studies & Field Dispatches
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] leading-tight">
              Stories of Dignity, Growth, and Living Proof.
            </h1>
            <div className="mt-2 mb-4">
              <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
            </div>
            <p className="text-base sm:text-lg text-[#5B6B7C] leading-relaxed">
              Real narratives from our special children, clinical therapists, and devoted mothers documenting 35 years of transformation in Varanasi.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Magazine Lead Featured Story (Large Spread) */}
      <section className="w-full py-16 md:py-24 bg-[#FFFDF9] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Big Feature Photo */}
            <div className="lg:col-span-6">
              <div className="relative bg-white p-3.5 sm:p-4 rounded-3xl border border-[#E8DFD3] shadow-sm">
                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#F2ECE1]">
                  <Image
                    src={FEATURED_STORY.image}
                    alt={FEATURED_STORY.title}
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-[#0F8B8D] text-white text-xs font-bold shadow-xs">
                    {FEATURED_STORY.category}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Editorial Story Details & Pull Quote */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest mb-2">
                {FEATURED_STORY.date}
              </span>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#1A2530] leading-tight mb-4">
                {FEATURED_STORY.title}
              </h2>

              <p className="text-sm sm:text-base text-[#4A5D70] leading-relaxed mb-6">
                {FEATURED_STORY.lead}
              </p>

              <div className="p-4 rounded-2xl bg-[#FAF7F0] border border-[#E8DFD3] mb-6">
                <Quote className="w-6 h-6 text-[#F5A524] mb-2" />
                <p className="text-xs sm:text-sm font-serif italic text-[#1A2530] leading-relaxed">
                  &ldquo;{FEATURED_STORY.quote}&rdquo;
                </p>
                <p className="text-xs font-bold text-[#0F8B8D] mt-2">
                  {FEATURED_STORY.author}
                </p>
              </div>

              <div>
                <Link href="/donate">
                  <Button size="lg" className="bg-[#F5A524] hover:bg-[#E09314] text-[#1A2530] font-extrabold rounded-full px-7 shadow-xs cursor-pointer">
                    Sponsor Therapy for a Child Like Tanisha
                  </Button>
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Clean Text-Forward Editorial List (Magazine Layout - No 3-Card Grid) */}
      <section className="w-full py-20 bg-[#FAF7F0] border-b border-[#E8DFD3]">
        <div className="container-custom max-w-4xl">
          
          <div className="mb-12 text-left">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-1">
              Field Dispatches
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A2530]">
              More Recent Stories & Case Records.
            </h2>
          </div>

          <div className="divide-y divide-[#E8DFD3]">
            {EDITORIAL_STORIES.map((story) => (
              <article
                key={story.id}
                className="py-8 grid grid-cols-1 sm:grid-cols-12 gap-6 items-center group"
              >
                {/* Thumbnail (4 cols) */}
                <div className="sm:col-span-4">
                  <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#F2ECE1] border border-[#E8DFD3]">
                    <Image
                      src={story.image}
                      alt={story.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-103"
                      sizes="(max-width: 640px) 100vw, 30vw"
                    />
                  </div>
                </div>

                {/* Content (8 cols) */}
                <div className="sm:col-span-8 space-y-2">
                  <div className="flex items-center gap-2.5 text-xs">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFF3E0] text-[#8B4500] font-bold">
                      {story.category}
                    </span>
                    <span className="text-[#7A8B9E] font-medium">
                      {story.date}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-heading font-bold text-[#1A2530] group-hover:text-[#0F8B8D] transition-colors leading-snug">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#5B6B7C] leading-relaxed">
                    {story.summary}
                  </p>
                </div>
              </article>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="w-full py-16 bg-[#FFF3E0]">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#1A2530]">
              Every Story Begins with a Single Supporter.
            </h3>
            <p className="text-sm text-[#5B6B7C] mt-1">
              Join our family of regular monthly givers and receive quarterly clinical progress updates.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/donate">
              <Button size="lg" className="bg-[#1A2530] hover:bg-[#0F8B8D] text-white font-bold rounded-full px-7 cursor-pointer">
                Donate Monthly
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
