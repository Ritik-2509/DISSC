"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Building2,
  Users,
  Heart,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  ArrowRight,
  PhoneCall,
  Activity,
  HeartPulse,
  BookOpen,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandUnderline } from "@/components/ui/HandDrawn";
import { ProgramDetailModal, ProgramItem } from "@/components/ui/ProgramDetailModal";

const ALL_PROGRAMMES: ProgramItem[] = [
  {
    id: "deva-center",
    title: "Deva Center, Kamachha",
    subtitle: "Eastern UP's Flagship Clinical Institute for Intellectual Disabilities (Est. 1991)",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "border-[#0F8B8D]/40",
    sdgName: "Flagship Clinical Institute",
    targetGroup: "Children with Intellectual Disabilities & Autism Spectrum",
    image: "/images/discc/dr-tulsi-clinic.png",
    badge: "Clinical Headquarters",
    year: "1991 - Present",
    location: "Kamachha Chungi, Varanasi",
    summary: "Comprehensive psychological evaluations, sensory integration rooms, speech therapy, and individualized education plans (IEPs) designed by clinical psychologists.",
    fullDetails: {
      overview: "Established by Dr. C. Tulsi Das in 1991, Deva Center was Eastern UP's very first comprehensive rehabilitation institute. It combines clinical psychology diagnostics with specialized sensory and motor physiotherapy.",
      impactNumbers: "12,000+ Children & Families Rehabilitated",
      highlights: [
        "Multidisciplinary diagnostic and psychological evaluations",
        "Sensory integration rooms & motor skill physiotherapy",
        "Individualized Education Plans (IEPs) tailored to each child",
        "Daily nutritious meal support and hygienic health tracking"
      ],
      futureGoals: "Modernizing assistive AI speech tools and vocational adult workshops."
    }
  },
  {
    id: "deva-gram",
    title: "Deva Gram Rural Campus, Bachhaon",
    subtitle: "Expansive 21-Disability Sanctuary, Hydrotherapy & Caregiver Respite",
    category: "current",
    sdgColor: "#D97706",
    sdgThemeClass: "border-[#D97706]/40",
    sdgName: "Rural Rehabilitation Sanctuary",
    targetGroup: "Rural Agricultural Communities & Multi-Disability Youth",
    image: "/images/discc/community-program.png",
    badge: "Rural Sanctuary",
    year: "2010 - Present",
    location: "Bachhaon Village, Varanasi",
    summary: "Sprawling rural campus offering hydrotherapy, garden therapy, Paralympic sports training, and overnight respite care for all 21 legally recognized disability categories.",
    fullDetails: {
      overview: "Deva Gram in Bachhaon village extends specialized clinical care into agrarian communities, removing the travel burden for rural parents.",
      impactNumbers: "850+ Village Families Supported Annually",
      highlights: [
        "Hydrotherapy pool and sensory nature stimulation gardens",
        "Specialized Paralympic bocce and motor agility grounds",
        "Overnight respite care giving relief to exhausted caregivers",
        "Free rural diagnostic health camps across adjacent villages"
      ],
      futureGoals: "Expanding solar-powered green therapy pavilion."
    }
  },
  {
    id: "annapurna-center",
    title: "Annapurna Center for the Girl Child",
    subtitle: "Protecting, Educating, and Empowering Vulnerable Rural Young Girls",
    category: "current",
    sdgColor: "#C85A32",
    sdgThemeClass: "border-[#C85A32]/40",
    sdgName: "Girl Child Protection",
    targetGroup: "Marginalized Rural Girls & Single Mothers",
    image: "/images/discc/hero-children.png",
    badge: "Women & Girls Refuge",
    year: "1995 - Present",
    location: "Rural Varanasi Outskirts",
    summary: "Dedicated grassroots refuge managed by local women providing daily nutrition, health camps, schooling, and vocational handcraft independence.",
    fullDetails: {
      overview: "Founded in 1995, Annapurna Center shields impoverished rural girls from child exploitation and neglect with direct nutrition, safe schooling, and vocational handicraft training.",
      impactNumbers: "4,500+ Rural Girls & Mothers Empowered",
      highlights: [
        "Nutritional support tackling anemia and child malnutrition",
        "Adolescent hygiene camps and maternal wellness checks",
        "Vocational sewing, textile embroidery, and small-craft training",
        "Community awareness campaigns eliminating female child stigma"
      ],
      futureGoals: "Scaling artisan cooperative marketplace."
    }
  },
  {
    id: "child-education",
    title: "Child Education & Adaptive Learning",
    subtitle: "Bridging the Inclusive Classroom Gap for Marginalized Learners",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "border-[#0F8B8D]/40",
    sdgName: "Inclusive Classroom",
    targetGroup: "Special Learners & Siblings",
    image: "/images/discc/children-activity.png",
    badge: "Inclusive Education",
    year: "1998 - Present",
    location: "Deva Learning Center, Varanasi",
    summary: "School sponsorship, specialized learning kits, assistive technology, and vocational training bridging the gap between special needs and mainstream society.",
    fullDetails: {
      overview: "Sponsoring comprehensive school tuition, books, assistive learning kits, and uniforms for underprivileged children diagnosed with intellectual differences.",
      impactNumbers: "3,200+ School Sponsorships Provided",
      highlights: [
        "One-on-one special educator instruction",
        "Adaptive sensory learning materials & Braille aids",
        "Integrated group play sessions fostering peer empathy",
        "Life-skills curriculum covering self-care and mobility"
      ],
      futureGoals: "Introducing personalized digital tablet learning."
    }
  }
];

const CLINICAL_SERVICES = [
  { title: "Psychological Assessment & Diagnostics", desc: "Standardized clinical intelligence tests, Vineland Social Maturity Scale, and neurodevelopmental profiling by licensed psychologists." },
  { title: "Sensory Integration Therapy", desc: "Specialized sensory gym with swing vestibular stimulation, tactile textures, and weighted calming tools." },
  { title: "Speech & Language Therapy", desc: "Oral motor exercises, articulation training, and non-verbal communication visual boards (PECS)." },
  { title: "Physiotherapy & Hydrotherapy", desc: "Equipped aquatic pool and neuromuscular gait training promoting independent posture and mobility." },
  { title: "Individualized Education Plans (IEPs)", desc: "Tailored monthly developmental milestones evaluated collaboratively with parents and educators." },
  { title: "Caregiver Counseling & Respite", desc: "Mental health guidance and overnight respite lodging to prevent caregiver fatigue and isolation." },
];

export default function OurWorkPage() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  return (
    <div className="w-full flex flex-col items-center bg-[#FAF7F0] text-[#1A2530]">
      
      {/* 1. Page Header */}
      <section className="w-full pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#E8DFD3] bg-[#FAF7F0]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-2">
              Clinical & Rural Infrastructure
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] leading-tight">
              35 Years of Scientific Rehabilitation & Community Care.
            </h1>
            <div className="mt-2 mb-4">
              <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
            </div>
            <p className="text-base sm:text-lg text-[#5B6B7C] leading-relaxed">
              Explore our clinical headquarters in Kamachha, our rural hydrotherapy sanctuary in Bachhaon, and community safe havens across Eastern Uttar Pradesh.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Alternating Photo-Story Rows */}
      <section className="w-full py-16 md:py-24 bg-[#FFFDF9] border-b border-[#E8DFD3]">
        <div className="container-custom space-y-20 lg:space-y-28">
          {ALL_PROGRAMMES.map((prog, idx) => {
            const isEven = idx % 2 === 0;

            return (
              <div
                key={prog.id}
                id={prog.id}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center scroll-mt-28"
              >
                {/* Photo Column */}
                <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <div className="relative bg-white p-3.5 sm:p-4 rounded-3xl border border-[#E8DFD3] shadow-sm group">
                    <div
                      className="absolute inset-0 rounded-3xl pointer-events-none opacity-30 transform translate-x-2.5 translate-y-2.5 -z-10"
                      style={{ backgroundColor: prog.sdgColor }}
                    />
                    <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#F2ECE1]">
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-102"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                    </div>
                    <div className="mt-3.5 flex items-center justify-between text-xs text-[#5B6B7C] px-1">
                      <span className="flex items-center gap-1.5 font-bold text-[#1A2530]">
                        <MapPin className="w-3.5 h-3.5 text-[#0F8B8D]" />
                        {prog.location}
                      </span>
                      <span className="font-bold text-[#0F8B8D]">
                        {prog.year}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Text Narrative Column */}
                <div className={`lg:col-span-6 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                  <div className="inline-flex items-center gap-2 mb-3">
                    <span
                      className="px-3.5 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                      style={{ backgroundColor: prog.sdgColor }}
                    >
                      {prog.badge}
                    </span>
                    <span className="text-xs text-[#7A8B9E] font-semibold">
                      {prog.sdgName}
                    </span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A2530] mb-2 leading-tight">
                    {prog.title}
                  </h2>

                  <p className="text-sm font-semibold text-[#0F8B8D] mb-4">
                    {prog.subtitle}
                  </p>

                  <p className="text-sm sm:text-base text-[#4A5D70] leading-relaxed mb-6">
                    {prog.fullDetails?.overview || prog.summary}
                  </p>

                  <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-[#3E5062]">
                    {prog.fullDetails?.highlights?.map((hl, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#0F8B8D] shrink-0 mt-0.5" />
                        <span>{hl}</span>
                      </div>
                    ))}
                  </div>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      onClick={() => setSelectedProgram(prog)}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#1A2530] hover:bg-[#0F8B8D] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Complete Clinical Blueprint</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                    <Link
                      href="/contact"
                      className="text-xs sm:text-sm font-bold text-[#0F8B8D] hover:underline"
                    >
                      Consult Specialists &rarr;
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Clinical Services Breakdown (Calm 2-Column List - No Cards) */}
      <section className="w-full py-20 bg-[#FAF7F0] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="max-w-2xl mb-12 text-left">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
              Therapeutic Disciplines
            </span>
            <h2 className="text-3xl font-heading font-bold text-[#1A2530]">
              Clinical Services Offered Across Campuses.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {CLINICAL_SERVICES.map((srv, idx) => (
              <div key={idx} className="pb-6 border-b border-[#E8DFD3]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0F8B8D]" />
                  <h3 className="text-base font-bold text-[#1A2530]">
                    {srv.title}
                  </h3>
                </div>
                <p className="text-xs sm:text-sm text-[#5B6B7C] leading-relaxed pl-4">
                  {srv.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="w-full py-16 bg-[#FFF3E0]">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#1A2530]">
              Need Assessment or Therapy for a Special Child?
            </h3>
            <p className="text-sm text-[#5B6B7C] mt-1">
              Our clinical team provides comprehensive evaluations and individualized care plans.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button size="lg" className="bg-[#1A2530] hover:bg-[#0F8B8D] text-white font-bold rounded-full px-7 cursor-pointer">
                Book Clinical Appointment
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal */}
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}

    </div>
  );
}
