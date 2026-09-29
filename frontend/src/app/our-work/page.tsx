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
    id: "gangotri-centre",
    title: "Gangotri Centre",
    subtitle: "Residential Sanctuary, Aquatic Hydrotherapy & Vocational Life-Skills",
    category: "current",
    sdgColor: "#D97706",
    sdgThemeClass: "border-[#D97706]/40",
    sdgName: "Residential Sanctuary",
    targetGroup: "Youth with Severe Intellectual & Multiple Disabilities",
    image: "/images/programs/annapurna-cover.jpg",
    badge: "Residential Sanctuary",
    year: "1995 - Present",
    location: "Varanasi Outskirts",
    summary: "Sprawling residential retreat offering aquatic hydrotherapy, organic tactile gardens, handicraft vocational training, and caregiver overnight respite care.",
    fullDetails: {
      overview: "Gangotri Centre provides holistic therapeutic shelter, specialized sensory equipment, and artisan vocational preparation for special-needs individuals.",
      impactNumbers: "4,500+ Beneficiaries Rehabilitated",
      highlights: [
        "Heated aquatic hydrotherapy pool and sensory botanical gardens",
        "Handicraft tailoring, embroidery, and vocational artisan mastery",
        "Overnight respite care lodges giving relief to exhausted caregivers",
        "Free rural diagnostic health camps across adjacent villages"
      ],
      futureGoals: "Expanding eco-friendly green therapy pavilions."
    }
  },
  {
    id: "ambedkar-school",
    title: "Ambedkar School",
    subtitle: "Individualized Education Plans & Mainstream Classroom Transition",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "border-[#0F8B8D]/40",
    sdgName: "Inclusive Classroom",
    targetGroup: "Special Learners & Underprivileged Children",
    image: "/images/education.jpg",
    badge: "Inclusive Education",
    year: "1998 - Present",
    location: "Deva Learning Center, Varanasi",
    summary: "Comprehensive school sponsorship, specialized learning toolkits, assistive digital tablets, and empathetic educator guidance bridging the gap into formal schooling.",
    fullDetails: {
      overview: "Ensuring no child is excluded from formal schooling due to cognitive differences or economic distress, achieving an 84% mainstreaming transition rate.",
      impactNumbers: "3,200+ Students Empowered",
      highlights: [
        "One-on-one special educator instruction tailored to cognitive speed",
        "Adaptive sensory learning materials, Braille toolkits, and tablets",
        "Integrated group play sessions fostering peer empathy",
        "Life-skills curriculum covering self-care and independent mobility"
      ],
      futureGoals: "Scaling digital assistive education labs."
    }
  },
  {
    id: "nakuti-raghunath-school",
    title: "Nakuti Raghunath School",
    subtitle: "Foundational Special Education & Nutrition for Rural Hamlets",
    category: "current",
    sdgColor: "#C85A32",
    sdgThemeClass: "border-[#C85A32]/40",
    sdgName: "Rural Special Education",
    targetGroup: "Rural Children with Developmental Delays",
    image: "/images/discc/children-activity.png",
    badge: "Rural Schooling",
    year: "2005 - Present",
    location: "Rural Varanasi District",
    summary: "Eliminating geographic barriers through free doorstep transport, daily hot balanced lunches, speech-language therapy, and peer creative arts.",
    fullDetails: {
      overview: "Delivering foundational special education directly to rural doorsteps with integrated speech correction and adolescent health checks.",
      impactNumbers: "2,800+ Rural Scholarships Provided",
      highlights: [
        "Safe doorstep transport vans bringing children from remote hamlets",
        "Targeted oral-motor stimulation and speech therapy integration",
        "Daily nutritious hot lunches combating childhood malnutrition",
        "Annual inclusive festivals, theater dramas, and creative art therapy"
      ],
      futureGoals: "Expanding fleet of accessible rural school vans."
    }
  },
  {
    id: "navjeevan-clinic",
    title: "Navjeevan Clinic",
    subtitle: "Pioneering Neurodevelopmental Diagnostics & Pediatric Sensory Rehab",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "border-[#0F8B8D]/40",
    sdgName: "Clinical Headquarters",
    targetGroup: "Children with Autism Spectrum, Cerebral Palsy & ADHD",
    image: "/images/discc/deva-building.jpg",
    badge: "Clinical Pioneer",
    year: "1991 - Present",
    location: "Kamachha Chungi, Varanasi",
    summary: "Comprehensive psychological evaluations, sensory integration gym, vestibular therapy, and evidence-based clinical roadmaps directed by clinical psychologists.",
    fullDetails: {
      overview: "Founded by Dr. C. Tulsi Das in 1991 as Eastern UP's first multidisciplinary diagnostic clinic for pediatric neurodevelopmental rehabilitation.",
      impactNumbers: "12,000+ Clinical Sessions Conducted",
      highlights: [
        "Standardized psychological intelligence & Vineland social quotient profiling",
        "Sensory integration gym with vestibular swings and tactile stimulation",
        "Speech-language oral motor therapy & communication tools",
        "Zero-fee clinical assessments for low-income rural families"
      ],
      futureGoals: "Deploying AI-assisted speech assessment toolkits."
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
    <div className="w-full flex flex-col items-center bg-[#F6F4EE] text-[#182321]">
      
      {/* 1. Page Header */}
      <section className="w-full pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#E5E0D4] bg-[#F6F4EE]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-2">
              Clinical & Rural Infrastructure
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#182321] leading-tight">
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
      <section className="w-full py-16 md:py-24 bg-white border-b border-[#E5E0D4]">
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
                <motion.div
                  initial={{ opacity: 0, x: isEven ? -70 : 70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                  className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}
                >
                  <div className="relative bg-white p-3.5 sm:p-4 rounded-3xl border border-[#E5E0D4] shadow-sm group">
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
                      <span className="flex items-center gap-1.5 font-bold text-[#182321]">
                        <MapPin className="w-3.5 h-3.5 text-[#0F8B8D]" />
                        {prog.location}
                      </span>
                      <span className="font-bold text-[#0F8B8D]">
                        {prog.year}
                      </span>
                    </div>
                  </div>
                </motion.div>

                {/* Text Narrative Column */}
                <motion.div
                  initial={{ opacity: 0, x: isEven ? 70 : -70 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                  className={`lg:col-span-6 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}
                >
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

                  <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#182321] mb-2 leading-tight">
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
                    <Link
                      href={`/programs/${prog.id}`}
                      className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#182321] hover:bg-amber-600 text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                    >
                      <span>Explore Dedicated Page</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => setSelectedProgram(prog)}
                      className="text-xs sm:text-sm font-bold text-slate-700 hover:text-amber-600 cursor-pointer"
                    >
                      Quick Blueprint &rarr;
                    </button>
                  </div>
                </motion.div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 3. Clinical Services Breakdown (Calm 2-Column List - No Cards) */}
      <section className="w-full py-20 bg-[#F6F4EE] border-b border-[#E5E0D4]">
        <div className="container-custom">
          
          <div className="max-w-2xl mb-12 text-left">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
              Therapeutic Disciplines
            </span>
            <h2 className="text-3xl font-heading font-bold text-[#182321]">
              Clinical Services Offered Across Campuses.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {CLINICAL_SERVICES.map((srv, idx) => (
              <div key={idx} className="pb-6 border-b border-[#E5E0D4]">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#0F8B8D]" />
                  <h3 className="text-base font-bold text-[#182321]">
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
            <h3 className="text-2xl font-heading font-bold text-[#182321]">
              Need Assessment or Therapy for a Special Child?
            </h3>
            <p className="text-sm text-[#5B6B7C] mt-1">
              Our clinical team provides comprehensive evaluations and individualized care plans.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button size="lg" className="bg-[#182321] hover:bg-[#0F8B8D] text-white font-bold rounded-full px-7 cursor-pointer">
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
