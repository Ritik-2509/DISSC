"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Heart, Quote, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandUnderline } from "@/components/ui/HandDrawn";

import { motion } from "framer-motion";

const FEATURED_STORY = {
  id: "tanisha-journey",
  title: "From Immobility to Independent Steps: Tanisha's Two-Year Breakthrough",
  category: "Clinical Case Study",
  date: "Deva Center, Kamachha · 2025",
  lead: "Diagnosed with severe cerebral palsy and spastic diplegia at age 7, Tanisha faced intense muscular contraction that prevented her from standing. Through intensive hydrotherapy at Bachhaon and adaptive gait physiotherapy at Kamachha, she now walks to primary school without braces.",
  quote: "Her first independent steps on the therapy lawn brought tears to all our therapists. When you pair targeted scientific therapy with consistent parental love, the human body overcomes staggering barriers.",
  author: "Dr. C. Tulsi Das, Clinical Director",
  image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790591922/discc/events/clinic-rehab/clinic-rehab_Picture_783.jpg"
};

const EDITORIAL_STORIES = [
  {
    id: "purple-fair-2026",
    title: "Annual Purple Fair 2026: Uniting 500+ Special Children in Varanasi",
    category: "Community Inclusion",
    date: "February 2026",
    image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790591935/discc/events/cultural-festivals/cultural-festivals_purple-fair-2026.jpg",
    summary: "An exuberant annual carnival bringing together over 500 neurodivergent and physically challenged children across Eastern UP for inclusive games, classical music, and artwork auctions.",
  },
  {
    id: "rural-breakthroughs",
    title: "Overcoming Village Stigma: The Bachhaon Caregiver Circles",
    category: "Rural Outreach",
    date: "December 2025",
    image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790592576/discc/events/historical-genesis/historical-genesis_172.jpg",
    summary: "How regular counseling and physical therapy at Deva Gram removed superstitious stigma and gave rural families immense pride in their children's cognitive growth.",
  },
  {
    id: "annapurna-empowerment",
    title: "Priya's Artisan Journey: Down Syndrome to State Exhibition Recognition",
    category: "Girl Child Protection",
    date: "November 2025",
    image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790591916/discc/events/vocational-beautician/vocational-beautician_Picture_266.jpg",
    summary: "Annapurna Center gave Priya self-reliance through vocational embroidery. Today her handmade textile bags are showcased at state handicraft fairs.",
  },
  {
    id: "international-solidarity",
    title: "Indo-European Clinical Solidarity: 25 Years of Deva Europe",
    category: "Global Partnership",
    date: "October 2025",
    image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790592534/discc/events/international-solidarity/international-solidarity_Picture_419.jpg",
    summary: "How Dr. Tulsi and French art historian Jean-Max Tassel built a lasting bridge of clinical collaboration, volunteer programs, and donor support for Varanasi.",
  },
  {
    id: "state-award-retrospective",
    title: "Three Decades of Clinical Rigor: The UP Chief Minister State Award",
    category: "State Honor",
    date: "September 2025",
    image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790592004/discc/events/state-honors/state-honors_role-model-award.png",
    summary: "Reflecting on Dr. Tulsi Das's recognition by Hon'ble UP Chief Minister Yogi Adityanath for pioneering intellectual disability care in Eastern Uttar Pradesh.",
  }
];

import { StoryShowcase } from "@/components/ui/StoryShowcase";

export default function StoriesPage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#F6F4EE] text-[#182321]">
      
      {/* 1. Page Header */}
      <section className="w-full pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#E5E0D4] bg-[#F6F4EE]">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-3xl"
          >
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-2">
              Clinical Case Studies & Field Dispatches
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#182321] leading-tight">
              Stories of Dignity, Growth, and Living Proof.
            </h1>
            <div className="mt-2 mb-4">
              <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
            </div>
            <p className="text-base sm:text-lg text-[#5B6B7C] leading-relaxed">
              Real narratives from our special children, clinical therapists, and devoted mothers documenting 35 years of transformation in Varanasi.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Magazine Lead Featured Story (Large Spread - Care-hands Editorial Frame) */}
      <section className="w-full py-16 md:py-24 bg-white border-b border-[#E5E0D4]">
        <div className="container-custom">
          
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center"
          >
            
            {/* Left: Big Feature Photo - Clean organic frame with NO floating pills */}
            <div className="lg:col-span-6">
              <div className="group relative bg-[#F6F4EE] p-3 sm:p-4 rounded-[25px] border border-[#E5E0D4] shadow-sm hover:shadow-md transition-all duration-400">
                <div className="relative w-full aspect-[16/11] rounded-[20px] overflow-hidden bg-[#EAE5D9]">
                  <Image
                    src={FEATURED_STORY.image}
                    alt={FEATURED_STORY.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-102"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="mt-2.5 px-1 flex items-center justify-between text-[11px] font-semibold text-[#5B6B7C]">
                  <span>Varanasi Pediatric Rehabilitation Center</span>
                  <span className="text-[#0F8B8D]">Clinical Case 2025</span>
                </div>
              </div>
            </div>

            {/* Right: Editorial Story Details & Pull Quote */}
            <div className="lg:col-span-6 flex flex-col justify-center">
              
              {/* Category & Date Badges - placed in the editorial text column */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#E0D8CB]/60 text-[#182321] border border-[#E0D8CB]">
                  {FEATURED_STORY.category}
                </span>
                <span className="text-xs font-bold text-[#D97706] uppercase tracking-wider">
                  {FEATURED_STORY.date}
                </span>
              </div>
              
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-[#182321] leading-tight mb-4">
                {FEATURED_STORY.title}
              </h2>

              <p className="text-sm sm:text-base text-[#4A5D70] leading-relaxed mb-6">
                {FEATURED_STORY.lead}
              </p>

              <div className="p-5 rounded-[20px] bg-[#FAF7F0] border border-[#E5E0D4] mb-6 shadow-2xs">
                <Quote className="w-5 h-5 text-[#F5A524] mb-2" />
                <p className="text-xs sm:text-sm font-serif italic text-[#182321] leading-relaxed">
                  &ldquo;{FEATURED_STORY.quote}&rdquo;
                </p>
                <p className="text-xs font-bold text-[#0F8B8D] mt-2.5">
                  {FEATURED_STORY.author}
                </p>
              </div>

              <div>
                <Link href="/donate">
                  <Button size="lg" className="bg-[#F5A524] hover:bg-[#E09314] text-[#182321] font-extrabold rounded-full px-7 shadow-xs hover:scale-102 transition-transform cursor-pointer">
                    Sponsor Therapy for a Child Like Tanisha
                  </Button>
                </Link>
              </div>

            </div>

          </motion.div>

        </div>
      </section>

      {/* 3. Karuma Horizontal Sliding Cards Pattern (Requested by User) */}
      <StoryShowcase />

      {/* 4. Action Banner - Matched to Footer bg-[#182321] for Seamless Transition */}
      <section className="w-full py-16 bg-[#182321] text-[#F6F4EE] border-t border-[#2A3835]">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-heading font-bold text-white">
              Every Story Begins with a Single Supporter.
            </h3>
            <p className="text-sm text-[#C8D1CE] mt-1">
              Join our family of regular monthly givers and receive quarterly clinical progress updates.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/donate">
              <Button size="lg" className="bg-[#F5A524] hover:bg-[#E09418] text-[#182321] font-bold rounded-full px-7 cursor-pointer">
                Donate Monthly
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
