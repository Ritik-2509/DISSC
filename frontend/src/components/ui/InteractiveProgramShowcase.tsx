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
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Activity,
  Smile,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

const CAMPUSES = [
  {
    id: "deva-center",
    name: "Deva Center, Kamachha",
    tagline: "Clinical Psychology & Sensory Rehab Headquarters",
    badge: "Flagship Institute · Est. 1991",
    themeColor: "from-teal-600 to-emerald-600",
    accentBg: "bg-teal-500",
    pillColor: "bg-teal-100 text-teal-800 border-teal-300",
    image: "/images/discc/dr-tulsi-clinic.png",
    location: "Kamachha Chungi, Varanasi",
    summary: "Eastern UP's pioneer institute for pediatric psychological diagnostics, sensory integration gym, speech therapy, and individualized education plans (IEPs).",
    stats: [
      { label: "Children Rehabilitated", val: "12,000+" },
      { label: "Daily Clinical Sessions", val: "150+" },
      { label: "Specialist Therapists", val: "25+" }
    ],
    highlights: [
      "Standardized psychological intelligence & Vineland social quotient profiling",
      "Specialized sensory integration gym with vestibular swing & tactile calming tools",
      "Speech-language oral motor therapy & picture communication systems",
      "Free daily nutritious hot meals and regular pediatric health checkups"
    ]
  },
  {
    id: "deva-gram",
    name: "Deva Gram Rural Campus, Bachhaon",
    tagline: "21-Disability Rural Sanctuary & Hydrotherapy Center",
    badge: "Sprawling Rural Campus · Est. 2010",
    themeColor: "from-amber-500 to-orange-600",
    accentBg: "bg-amber-500",
    pillColor: "bg-amber-100 text-amber-800 border-amber-300",
    image: "/images/discc/community-program.png",
    location: "Bachhaon Village, Varanasi",
    summary: "A barrier-free agricultural retreat providing aquatic hydrotherapy, nature sensory stimulation, Paralympic sports training, and caregiver overnight respite care.",
    stats: [
      { label: "Rural Families Supported", val: "850+ / yr" },
      { label: "Disability Categories", val: "All 21" },
      { label: "Free Village Health Camps", val: "14 Blocks" }
    ],
    highlights: [
      "Heated hydrotherapy pool for gentle low-impact neuromuscular rehabilitation",
      "Outdoor sensory agriculture paths stimulating tactile curiosity and motor balance",
      "Overnight respite care lodges giving relief to single mothers and exhausted caregivers",
      "Free weekly mobile diagnostic clinics across adjoining rural districts"
    ]
  },
  {
    id: "annapurna-center",
    name: "Annapurna Center for Rural Girls",
    tagline: "Empowering, Educating & Protecting Vulnerable Young Girls",
    badge: "Women & Girls Refuge · Est. 1995",
    themeColor: "from-rose-500 to-pink-600",
    accentBg: "bg-rose-500",
    pillColor: "bg-rose-100 text-rose-800 border-rose-300",
    image: "/images/discc/hero-children.png",
    location: "Rural Varanasi Outskirts",
    summary: "A community sanctuary managed by local women providing daily nutrition, adolescent health education, and vocational handicraft training for lifelong self-reliance.",
    stats: [
      { label: "Girls & Mothers Empowered", val: "4,500+" },
      { label: "Artisans Trained", val: "450+" },
      { label: "Malnutrition Reduction", val: "92%" }
    ],
    highlights: [
      "Daily hot meal interventions overcoming adolescent anemia and nutritional deficiency",
      "Menstrual health literacy, sanitation education, and safe community shelter",
      "Vocational textile embroidery, tailoring, and handicraft artisan training",
      "Community anti-stigma campaigns defending the fundamental rights of girls"
    ]
  },
  {
    id: "inclusive-school",
    name: "Child Education & Adaptive IEPs",
    tagline: "Bridging the Inclusive Classroom Gap for Every Special Child",
    badge: "Special Education · Est. 1998",
    themeColor: "from-sky-500 to-blue-600",
    accentBg: "bg-sky-500",
    pillColor: "bg-sky-100 text-sky-800 border-sky-300",
    image: "/images/discc/children-activity.png",
    location: "Deva Learning Center, Varanasi",
    summary: "School sponsorships, assistive communication toolkits, adaptive textbooks, and sensory classrooms preparing children to enter mainstream schooling.",
    stats: [
      { label: "School Scholarships", val: "3,200+" },
      { label: "Mainstream Transitions", val: "84%" },
      { label: "Adaptive Learning Kits", val: "100% Free" }
    ],
    highlights: [
      "One-on-one special educator instruction tailored to individual cognitive pace",
      "Assistive technology, digital tablets, and tactile Braille communication tools",
      "Peer empathy play sessions connecting neurodivergent and neurotypical children",
      "Life-skills curriculum teaching independent travel, personal care, and finance"
    ]
  }
];

export function InteractiveProgramShowcase() {
  const [activeTab, setActiveTab] = useState(0);
  const campus = CAMPUSES[activeTab];

  return (
    <section className="w-full py-20 md:py-28 bg-[#FFFDF9] relative overflow-hidden border-b border-amber-200/60">
      
      {/* Background Decorative Graphic */}
      <div className="container-custom relative z-10">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-12 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Campuses & Initiatives</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Comprehensive Clinical Care Across Varanasi.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Click across our active campuses to explore clinical facilities, hydrotherapy grounds, and inclusive learning classrooms.
          </p>
        </div>

        {/* Interactive Fluid Tabs (Jai Vakeel / IAC Style) */}
        <div className="flex items-center gap-2.5 overflow-x-auto pb-3 mb-10 no-scrollbar">
          {CAMPUSES.map((c, idx) => (
            <button
              key={c.id}
              onClick={() => setActiveTab(idx)}
              className={`px-5 py-3 rounded-2xl font-bold text-xs sm:text-sm transition-all whitespace-nowrap cursor-pointer flex items-center gap-2.5 border ${
                activeTab === idx
                  ? "bg-slate-900 text-white shadow-lg border-slate-900 scale-102"
                  : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <span className={`w-2.5 h-2.5 rounded-full ${c.accentBg}`} />
              <span>{c.name.split(",")[0]}</span>
            </button>
          ))}
        </div>

        {/* Grand Dynamic Campus Canvas Spread */}
        <AnimatePresence mode="wait">
          <motion.div
            key={campus.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-white via-[#FFF9F2] to-[#FFF5E8] border-2 border-amber-200/80 shadow-xl"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
              
              {/* Left Column: Photo Presentation */}
              <div className="lg:col-span-6">
                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-slate-100 shadow-md">
                  <Image
                    src={campus.image}
                    alt={campus.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 left-3">
                    <span className={`px-3.5 py-1 rounded-full text-xs font-black shadow-md border ${campus.pillColor} bg-white/95`}>
                      {campus.badge}
                    </span>
                  </div>
                  <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white text-xs font-bold flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-amber-400" />
                    <span>{campus.location}</span>
                  </div>
                </div>

                {/* Micro Metric Counters */}
                <div className="grid grid-cols-3 gap-3 mt-4">
                  {campus.stats.map((st, i) => (
                    <div key={i} className="p-3 rounded-xl bg-white border border-amber-200/80 text-center shadow-xs">
                      <span className="text-lg sm:text-xl font-black font-heading text-slate-900 block">
                        {st.val}
                      </span>
                      <span className="text-[11px] font-bold text-slate-500 block leading-tight mt-0.5">
                        {st.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right Column: Narrative & Specialties */}
              <div className="lg:col-span-6 flex flex-col justify-center text-left">
                <span className="text-xs font-extrabold uppercase tracking-wider text-teal-700 mb-1">
                  {campus.tagline}
                </span>

                <h3 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 leading-tight mb-4">
                  {campus.name}
                </h3>

                <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-6">
                  {campus.summary}
                </p>

                {/* Highlights List */}
                <div className="space-y-3 mb-8">
                  {campus.highlights.map((hl, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                      <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                      <span>{hl}</span>
                    </div>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-4">
                  <Link href="/our-work">
                    <Button
                      size="lg"
                      className="bg-slate-900 hover:bg-teal-700 text-white font-bold rounded-full px-7 shadow-md cursor-pointer flex items-center gap-2"
                    >
                      <span>Complete Facility Tour</span>
                      <ArrowRight className="w-4 h-4" />
                    </Button>
                  </Link>
                  <Link href="/donate">
                    <span className="text-xs sm:text-sm font-bold text-amber-600 hover:text-amber-700 underline cursor-pointer">
                      Sponsor This Center &rarr;
                    </span>
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
