"use client";

import Image from "next/image";
import Link from "next/link";
import { Sparkles, Calendar, ArrowRight, Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const STORIES = [
  {
    id: "purple-fair-2026",
    title: "Purple Fair 2026: Celebrating Divyangjan Talents",
    category: "Community Inclusion",
    image: "/images/discc/children-activity.png",
    summary: "Bringing together hundreds of neurodivergent children, parents, and volunteers across Varanasi for an exuberant celebration of artistic talent, sports, and joy.",
    date: "February 2026"
  },
  {
    id: "ramayan-theatre",
    title: "From Street Corner to Stage: The Ramayan Play",
    category: "Cultural Expression",
    image: "/images/discc/hero-children.png",
    summary: "Children with autism and intellectual challenges at Deva Center mastered classical dialogue and movement to deliver an awe-inspiring theatrical performance.",
    date: "January 2026"
  },
  {
    id: "rural-breakthroughs",
    title: "Empowering Rural Families in Bachhaon Village",
    category: "Rural Outreach",
    image: "/images/discc/community-program.png",
    summary: "How regular counseling and physical therapy at Deva Gram removed superstitious stigma and gave rural families immense pride in their children's growth.",
    date: "December 2025"
  },
  {
    id: "sensory-yoga",
    title: "Sensory Calming & Physical Healing through Gentle Yoga",
    category: "Therapeutic Health",
    image: "/images/discc/children-therapy.jpg",
    summary: "Adapting ancient yogic breathing and gentle physical asanas for children with physical mobility limitations and cerebral palsy to improve motor control.",
    date: "October 2025"
  },
  {
    id: "republic-day-pride",
    title: "Republic Day in Varanasi: Pride, Belonging & Inclusion",
    category: "Civic Inclusion",
    image: "/images/discc/award-ceremony.png",
    summary: "Deva children unfurled the tricolor, celebrated national pride, and demonstrated that every child belongs at the heart of our democracy.",
    date: "January 2026"
  },
  {
    id: "international-exchange",
    title: "Indo-European Clinical Solidarity: 25 Years of Deva Europe",
    category: "Global Partnership",
    image: "/images/discc/founders-meet.jpg",
    summary: "How Dr. Tulsi and French art historian Jean-Max Tassel built a lasting bridge of clinical collaboration, volunteer programs, and donor support.",
    date: "November 2025"
  }
];

export default function StoriesPage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#FFFAF2]">
      {/* 1. Header */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#FFEFE0]/60 to-[#FFFAF2] relative">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-4">
              Voices & Breakthroughs
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.1]">
              Stories of Courage, Inclusion & Hope
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-text leading-relaxed max-w-[60ch]">
              Real narratives from our special students, devoted mothers, and clinical therapists across 32 years of service in Varanasi.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Stories Grid */}
      <section className="w-full py-16 md:py-24 bg-white border-y border-border/70 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {STORIES.map((story, idx) => (
              <Reveal key={story.id} delay={idx * 0.08} className="h-full">
                <div className="group h-full rounded-3xl bg-[#FFFAF2]/50 border border-border/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[16/10] w-full bg-muted overflow-hidden">
                      <Image
                        src={story.image}
                        alt={story.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold shadow-xs">
                        {story.category}
                      </div>
                    </div>

                    <div className="p-6 sm:p-7 space-y-2.5">
                      <span className="text-xs text-muted-text font-semibold flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-primary" />
                        {story.date}
                      </span>
                      <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors leading-snug">
                        {story.title}
                      </h3>
                      <p className="text-sm text-muted-text leading-relaxed line-clamp-3">
                        {story.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-6 sm:p-7 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                    <Link
                      href="/contact"
                      className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors"
                    >
                      Connect with Us
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
