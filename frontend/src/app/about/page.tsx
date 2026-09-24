"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Heart,
  Users,
  Building2,
  GraduationCap,
  Sparkles,
  ArrowRight,
  MapPin,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const TIMELINE = [
  {
    year: "1991",
    title: "Foundation of DISCC & Deva Center",
    desc: "Dr. C. Tulsi Das established DEVA International Society for Child Care in Kamachha, Varanasi, opening the region's first specialized clinical diagnostic and rehabilitation institute for intellectual disability management.",
    badge: "Origin"
  },
  {
    year: "1995",
    title: "Annapurna Center for the Girl Child",
    desc: "Expanded into rural Varanasi to shield impoverished young girls from malnutrition and illiteracy, creating a secure learning and vocational training refuge managed by local village women.",
    badge: "Expansion"
  },
  {
    year: "1998",
    title: "International Partnership & Deva Europe",
    desc: "Met French art historian Jean-Max Tassel, fostering an enduring Indo-European charitable partnership that connected international pediatric volunteers with grassroots Varanasi projects.",
    badge: "Global Solidarity"
  },
  {
    year: "1999",
    title: "Gangotri Riverside Open-Air School",
    desc: "Pioneered foundational education under a tree on the holy Ganga ghats for boatmen and street children, transitioning over 3,200 street youth into formal government schooling.",
    badge: "Milestone"
  },
  {
    year: "2010",
    title: "Deva Gram Rural Campus (Bachhaon)",
    desc: "Built an expansive rural rehabilitation sanctuary offering hydrotherapy, sensory garden therapy, and overnight respite care for all 21 legally recognized disability categories.",
    badge: "Sanctuary"
  },
  {
    year: "2024",
    title: "Best Professional Psychologist State Award",
    desc: "Dr. Tulsi was conferred the prestigious Best Professional Psychologist Award by Uttar Pradesh Chief Minister Yogi Adityanath for 32+ years of extraordinary humanitarian service.",
    badge: "State Honour"
  }
];

const LEADERSHIP_TEAM = [
  {
    name: "Dr. C. Tulsi Das",
    role: "Founder President & Clinical Director",
    credentials: "Ph.D. (Psychiatry - Clinical Psychology)",
    bio: "Recipient of Best Professional Psychologist Award from the Chief Minister of UP (Yogi Adityanath). 40+ years dedicated to clinical ID diagnostics and pediatric welfare.",
    image: "/images/discc/dr-tulsi-portrait.jpg"
  },
  {
    name: "Jean-Max Tassel",
    role: "Chief International Patron",
    credentials: "Art Historian & Philanthropist (France)",
    bio: "Co-architect of Deva Europe for 25+ years, establishing international philanthropic networks supporting medical and educational sponsorships in Varanasi.",
    image: "/images/discc/founders-meet.jpg"
  },
  {
    name: "Er. Raaj Deva",
    role: "Director of Operations & Infrastructure",
    credentials: "B.Tech, Systems & Operations",
    bio: "Leading rural facility expansion, sensory integration lab modernization, and administrative compliance across all DISCC campuses.",
    image: "/images/discc/deva-building.jpg"
  }
];

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#FFFAF2]">
      {/* 1. Hero Section */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-[#FFEFE0]/60 to-[#FFFAF2] relative overflow-hidden">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-4">
              Since 1991 · Varanasi, India
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.1]">
              A 32-Year Journey of Clinical Science & Unconditional Love
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-text leading-relaxed max-w-[60ch]">
              Founded by Dr. C. Tulsi Das to transform the lives of children with intellectual disabilities across Eastern Uttar Pradesh through evidence-based psychological rehabilitation.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Founder Profile & Award Spotlight */}
      <section className="w-full py-16 md:py-24 bg-white border-y border-border/70 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left: Founder Award Photo */}
            <Reveal className="lg:col-span-5">
              <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-soft-lg border-4 border-white bg-muted">
                <Image
                  src="/images/discc/award-ceremony.png"
                  alt="Dr. Tulsi receiving award from UP CM Yogi Adityanath"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <span className="px-3 py-1 rounded-full bg-[#F5A524] text-[#1E2A3A] font-bold text-xs">
                    State Felicitation
                  </span>
                  <p className="font-heading font-bold text-lg mt-2 leading-tight">
                    Dr. Tulsi Conferred Best Psychologist Award
                  </p>
                  <p className="text-xs text-white/80 mt-1">
                    By Chief Minister of Uttar Pradesh, Yogi Adityanath
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right: Founder Narrative */}
            <Reveal delay={0.15} className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                Meet the Founder
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">
                Dr. C. Tulsi Das, Ph.D.
              </h2>
              <p className="text-muted-text text-base sm:text-lg leading-relaxed">
                Born and raised in the ancient city of Varanasi, Dr. Chellapilla Tulsi Das dedicated his clinical career to neurodevelopmental psychiatry and intellectual disability management. In the early 1990s, when neurodivergent children were hidden away due to severe societal stigma, Dr. Tulsi opened Eastern UP&apos;s first multidisciplinary clinic.
              </p>
              <p className="text-muted-text text-base sm:text-lg leading-relaxed">
                Over four decades, he has conducted thousands of psychological assessments, designed individualized education plans (IEPs), and built inclusive community networks that have touched more than 12,000 lives.
              </p>

              <blockquote className="border-l-4 border-primary pl-6 py-4 my-4 bg-[#FFFAF2] rounded-r-2xl italic text-foreground font-heading text-lg">
                &ldquo;Every child, irrespective of neurological impairment, carries a sacred spark of human dignity and potential. Our duty is simply to provide the right clinical bridge.&rdquo;
              </blockquote>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link href="/contact">
                  <Button variant="default" size="lg" className="rounded-full">
                    Consult with our Team
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button variant="donate" size="lg" className="rounded-full shadow-glow-marigold">
                    Support our Work
                  </Button>
                </Link>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Interactive Vertical Timeline */}
      <section className="w-full py-20 md:py-28 bg-[#FFFAF2] relative">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Chronicle of Impact"
            title="Milestones in Humanitarian Service"
            description="How a humble clinic in Kamachha expanded into a multifaceted statewide welfare movement."
          />

          <div className="max-w-4xl mx-auto relative mt-12">
            {/* Center line */}
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 -translate-x-1/2" />

            <div className="space-y-12">
              {TIMELINE.map((item, idx) => {
                const isEven = idx % 2 === 0;
                return (
                  <Reveal key={item.year} delay={idx * 0.08}>
                    <div
                      className={`relative flex flex-col md:flex-row items-start ${
                        isEven ? "md:flex-row-reverse" : ""
                      } gap-6 md:gap-12 pl-10 md:pl-0`}
                    >
                      {/* Timeline Node Point */}
                      <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border-4 border-primary flex items-center justify-center shadow-md z-10">
                        <span className="w-2 h-2 rounded-full bg-primary" />
                      </div>

                      {/* Content Card */}
                      <div className={`w-full md:w-1/2 ${isEven ? "md:text-left" : "md:text-left"}`}>
                        <div className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all duration-300">
                          <div className="flex items-center gap-2.5 mb-2">
                            <span className="text-xl font-extrabold font-heading text-primary">
                              {item.year}
                            </span>
                            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#F5A524]/15 text-[#1E2A3A]">
                              {item.badge}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold font-heading text-foreground mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-muted-text leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* 4. Certifications & Legal Standing */}
      <section className="w-full py-16 bg-white border-y border-border/70 relative">
        <div className="container-custom">
          <SectionHeading
            title="Certifications & Transparency"
            description="DISCC adheres to highest statutory compliance standards under Government of India guidelines."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#FFFAF2] border border-border/70 text-center">
              <ShieldCheck className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-base text-foreground">FCRA Registered</h3>
              <p className="text-xs text-muted-text mt-1">
                Authorized by Ministry of Home Affairs to receive foreign philanthropic contributions.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFAF2] border border-border/70 text-center">
              <Award className="w-10 h-10 text-[#F5A524] mx-auto mb-3" />
              <h3 className="font-bold text-base text-foreground">National Trust Certified</h3>
              <p className="text-xs text-muted-text mt-1">
                Recognized for Autism, Cerebral Palsy, Mental Retardation & Multiple Disabilities.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFAF2] border border-border/70 text-center">
              <CheckCircle2 className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-base text-foreground">Section 80G & 12A</h3>
              <p className="text-xs text-muted-text mt-1">
                All Indian donations eligible for 50% income tax exemption under Section 80G.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFAF2] border border-border/70 text-center">
              <Building2 className="w-10 h-10 text-primary mx-auto mb-3" />
              <h3 className="font-bold text-base text-foreground">UP Social Welfare</h3>
              <p className="text-xs text-muted-text mt-1">
                Officially accredited non governmental organization by Department of Social Welfare UP.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Multidisciplinary Leadership Team */}
      <section className="w-full py-20 md:py-28 bg-[#FFFAF2] relative">
        <div className="container-custom">
          <SectionHeading
            title="Leadership & Governance"
            description="Guided by veteran clinical psychologists, operations experts, and global philanthropic patrons."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {LEADERSHIP_TEAM.map((member, idx) => (
              <Reveal key={member.name} delay={idx * 0.1}>
                <div className="rounded-3xl bg-white border border-border/80 shadow-soft overflow-hidden h-full flex flex-col justify-between">
                  <div>
                    <div className="relative aspect-[4/3] w-full bg-muted">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold font-heading text-foreground">
                        {member.name}
                      </h3>
                      <p className="text-xs font-bold text-primary mt-0.5">
                        {member.role}
                      </p>
                      <p className="text-[11px] text-muted-text font-medium mt-0.5">
                        {member.credentials}
                      </p>
                      <p className="text-sm text-muted-text mt-3 leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
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
