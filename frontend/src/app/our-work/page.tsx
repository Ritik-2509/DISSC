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
  BookOpen
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProgramDetailModal, ProgramItem } from "@/components/ui/ProgramDetailModal";

const PROGRAMS: ProgramItem[] = [
  {
    id: "deva-center",
    title: "Deva Center, Varanasi",
    subtitle: "First Specialized ID Rehabilitation Institute in Eastern UP",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "hover:border-[#0F8B8D]/60",
    sdgName: "SDG 10: Reduced Inequalities",
    targetGroup: "Special Children",
    image: "/images/discc/deva-building.jpg",
    badge: "Flagship Institute (Est. 1991)",
    year: "1991 - Present",
    location: "Kamachha Chungi, Varanasi",
    summary: "Comprehensive psychological evaluations, sensory integration rooms, speech therapy, and individualized education plans (IEPs) for autism, cerebral palsy, and intellectual differences.",
    fullDetails: {
      overview: "Established by Dr. C. Tulsi Das in 1991, Deva Center was Eastern UP's very first comprehensive rehabilitation institute. It combines clinical psychology with dedicated sensory and motor therapy.",
      impactNumbers: "12,000+ Children & Families Rehabilitated",
      highlights: [
        "Multidisciplinary diagnostic and psychological evaluations",
        "Sensory integration rooms & motor skill physiotherapy",
        "Individualized Education Plans (IEPs) for special learners",
        "Daily nutritious meal support and hygienic health tracking"
      ],
      futureGoals: "Modernizing assistive AI speech tools and vocational adult workshops."
    }
  },
  {
    id: "deva-gram",
    title: "Deva Gram (Bachhaon Campus)",
    subtitle: "21-Disabilities Holistic Care, Hydrotherapy & Respite Sanctuary",
    category: "current",
    sdgColor: "#3F7E44",
    sdgThemeClass: "hover:border-[#3F7E44]/60",
    sdgName: "SDG 3: Good Health & Well-Being",
    targetGroup: "Rural Communities",
    image: "/images/discc/community-program.png",
    badge: "Rural Sanctuary",
    year: "2010 - Present",
    location: "Bachhaon Village, Varanasi",
    summary: "Expansive rural campus offering hydrotherapy, garden therapy, sports training, and respite care for all 21 legally recognized disability classifications.",
    fullDetails: {
      overview: "Deva Gram in Bachhaon village extends specialized clinical care into agricultural communities, removing the travel burden for rural parents.",
      impactNumbers: "850+ Village Families Supported Annually",
      highlights: [
        "Hydrotherapy and sensory nature stimulation gardens",
        "Specialized Paralympic bocce and motor agility grounds",
        "Overnight respite care giving relief to exhausted caregivers",
        "Free rural diagnostic health camps across adjacent villages"
      ]
    }
  },
  {
    id: "annapurna-center",
    title: "Annapurna Center for the Girl Child",
    subtitle: "Protecting, Educating, and Nurturing Rural Women and Young Girls",
    category: "current",
    sdgColor: "#EE6C4D",
    sdgThemeClass: "hover:border-[#EE6C4D]/60",
    sdgName: "SDG 5: Gender Equality",
    targetGroup: "Women & Girls",
    image: "/images/discc/hero-children.png",
    badge: "Rural Girl Protection",
    year: "1995 - Present",
    location: "Rural Varanasi Outskirts",
    summary: "Dedicated grassroots refuge managed by educated local women providing nutrition, health camps, schooling, and vocational handcraft independence.",
    fullDetails: {
      overview: "Founded in 1995, Annapurna Center shields impoverished rural girls from child exploitation and neglect with direct nutrition, safe schooling, and vocational handicraft training.",
      impactNumbers: "4,500+ Rural Girls & Mothers Empowered",
      highlights: [
        "Nutritional support tackling anemia and child malnutrition",
        "Adolescent hygiene camps and maternal wellness checks",
        "Vocational sewing, textile embroidery, and small-craft training",
        "Community awareness campaigns eliminating female child stigma"
      ]
    }
  },
  {
    id: "child-education-program",
    title: "Child Education Program (CEP)",
    subtitle: "Tuition, Adaptive Kits & Mainstream School Integration",
    category: "current",
    sdgColor: "#F5A524",
    sdgThemeClass: "hover:border-[#F5A524]/60",
    sdgName: "SDG 4: Quality Education",
    targetGroup: "Special Children",
    image: "/images/discc/children-activity.png",
    badge: "Inclusive Education",
    year: "2002 - Present",
    location: "Varanasi Urban & Rural",
    summary: "Sponsoring school tuition, uniforms, adaptive learning toolkits, and teacher sensitization for children from vulnerable socioeconomic backgrounds.",
    fullDetails: {
      overview: "Ensures financial poverty never halts a disabled child's education. Sponsoring schooling, braille/visual materials, and transportation.",
      impactNumbers: "1,200+ Scholarships Granted",
      highlights: [
        "Adaptive textbooks and assistive digital learning kits",
        "Sensitization training for teachers in mainstream schools",
        "Daily accessible van transport for mobility-impaired students",
        "Quarterly parent-teacher developmental milestone reviews"
      ]
    }
  },
  {
    id: "navjeevan-clinic",
    title: "Navjeevan Clinic & Care",
    subtitle: "Dignity, Wound Care & Clinical Aid for Leprosy Patients",
    category: "current",
    sdgColor: "#8E7CC3",
    sdgThemeClass: "hover:border-[#8E7CC3]/60",
    sdgName: "SDG 3: Good Health & Well-Being",
    targetGroup: "All Individuals",
    image: "/images/discc/children-therapy.jpg",
    badge: "Medical Relief",
    year: "2000 - Present",
    location: "Dashashwamedh & Sankat Mochan, Varanasi",
    summary: "Weekly antiseptic wound care, sterile dressing, medicines, and social integration support for leprosy-affected individuals and their families.",
    fullDetails: {
      overview: "Navjeevan ('Giving a New Life') was founded in 2000 to bring compassionate medical aid to one of society's most ostracized groups.",
      impactNumbers: "40-50 Patients Treated Weekly",
      highlights: [
        "Weekly sterile wound dressing and ulcer management",
        "Free distribution of essential antibiotics and vitamins",
        "Social stigma reduction and family counseling circles",
        "Assistive footwear and protective mobility gear"
      ]
    }
  },
  {
    id: "helpline",
    title: "Emergency Help Line & Mobile Outreach",
    subtitle: "24/7 Crisis Support, Diagnostic Camps & Assistive Devices",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "hover:border-[#0F8B8D]/60",
    sdgName: "SDG 16: Peace & Strong Institutions",
    targetGroup: "All Individuals",
    image: "/images/discc/dr-tulsi-clinic.png",
    badge: "24/7 Emergency Line",
    year: "2005 - Present",
    location: "Eastern UP Region",
    summary: "Immediate crisis tele-counseling for families, suicide prevention guidance, and emergency distribution of wheelchairs, calipers, and hearing aids.",
    fullDetails: {
      overview: "A vital community lifeline for families navigating neurological crises, sudden disability diagnoses, or emergency distress.",
      impactNumbers: "25,000+ Calls Resolved",
      highlights: [
        "Toll-free 24/7 telephonic psychological guidance",
        "Emergency distribution of wheelchairs, hearing aids & orthotics",
        "Mobile doctor visits for bedridden individuals",
        "Caregiver psychological burnout counseling circles"
      ]
    }
  },
  {
    id: "gangotri-school",
    title: "Gangotri Riverside School",
    subtitle: "Historical Open-Air Classroom on the Sacred Ganga Ghats",
    category: "past",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "hover:border-[#0F8B8D]/60",
    sdgName: "SDG 1: No Poverty",
    targetGroup: "Rural Communities",
    image: "/images/discc/founders-meet.jpg",
    badge: "Historic Milestone (1999)",
    year: "1999 - 2012",
    location: "Assi & Harishchandra Ghats, Varanasi",
    summary: "Foundational schooling under a banyan tree providing education, nutrition, and hygiene for boatmen and slum children on the riverbanks.",
    fullDetails: {
      overview: "Started in 1999 directly on the river steps of Varanasi, Gangotri gave hundreds of street children their very first experience of literacy.",
      impactNumbers: "3,200+ Ghat Children Transitioned to Formal Schools",
      highlights: [
        "Open-air foundational reading, writing, and arithmetic",
        "Daily hygienic meal distribution and clean drinking water",
        "Health checks tackling waterborne illnesses and parasites",
        "Transition pathways into accredited government schools"
      ]
    }
  },
  {
    id: "ambedkar-school",
    title: "Ambedkar Integrated School",
    subtitle: "Grassroots Village Literacy in Remote Rural Settlements",
    category: "past",
    sdgColor: "#F5A524",
    sdgThemeClass: "hover:border-[#F5A524]/60",
    sdgName: "SDG 4: Quality Education",
    targetGroup: "Rural Communities",
    image: "/images/discc/education.jpg",
    badge: "Rural Literacy",
    year: "2003 - 2015",
    location: "Nakati Raghunathpur (50 km from Varanasi)",
    summary: "Established in a remote hamlet with zero prior school access, providing literacy and nutrition to over 70 village boys and girls.",
    fullDetails: {
      overview: "Operating with four trained local educators from the same community, the school built foundational literacy in an underserved tribal belt.",
      impactNumbers: "70+ First-Generation Learners",
      highlights: [
        "Daily Hindi and Mathematics foundational curriculum",
        "Nutritious midday meals preventing child malnutrition",
        "Free distribution of textbooks, slates, and uniform kits",
        "Successful integration of graduates into regional middle schools"
      ]
    }
  }
];

export default function OurWorkPage() {
  const [selectedCategory, setSelectedCategory] = useState<"all" | "current" | "past">("all");
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);

  const filteredPrograms = PROGRAMS.filter((p) => {
    if (selectedCategory === "all") return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="w-full flex flex-col items-center bg-[#FFFAF2]">
      {/* 1. Page Header */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#FFEFE0]/60 to-[#FFFAF2] relative">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-4">
              Comprehensive Welfare & Rehabilitation
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.1]">
              Our Action Areas, Campuses & Programmes
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-text leading-relaxed max-w-[60ch]">
              From Eastern UP&apos;s first clinical ID institute in Varanasi to rural sanctuaries and girl child empowerment outposts.
            </p>

            {/* Filter Tabs */}
            <div className="mt-8 flex flex-wrap items-center gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === "all"
                    ? "bg-primary text-white shadow-soft"
                    : "bg-white text-muted-text hover:bg-muted border border-border"
                }`}
              >
                All Initiatives ({PROGRAMS.length})
              </button>
              <button
                onClick={() => setSelectedCategory("current")}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === "current"
                    ? "bg-primary text-white shadow-soft"
                    : "bg-white text-muted-text hover:bg-muted border border-border"
                }`}
              >
                Active Facilities & Programs (6)
              </button>
              <button
                onClick={() => setSelectedCategory("past")}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  selectedCategory === "past"
                    ? "bg-primary text-white shadow-soft"
                    : "bg-white text-muted-text hover:bg-muted border border-border"
                }`}
              >
                Historic Milestones (2)
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Program Grid */}
      <section className="w-full py-16 md:py-24 bg-white border-y border-border/70 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPrograms.map((program, idx) => (
              <Reveal key={program.id} delay={idx * 0.08} className="h-full">
                <div className="group h-full rounded-3xl bg-[#FFFAF2]/50 border border-border/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Image */}
                    <div className="relative w-full h-56 overflow-hidden bg-muted">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-3 left-3">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                          style={{ backgroundColor: program.sdgColor }}
                        >
                          {program.badge}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-1.5 text-xs text-muted-text mb-2">
                        <MapPin className="w-3.5 h-3.5 text-primary" />
                        <span>{program.location}</span>
                      </div>
                      <h3 className="text-xl font-bold font-heading text-foreground group-hover:text-primary transition-colors mb-2">
                        {program.title}
                      </h3>
                      <p className="text-xs font-semibold text-primary/90 mb-3">
                        {program.subtitle}
                      </p>
                      <p className="text-sm text-muted-text leading-relaxed line-clamp-3">
                        {program.summary}
                      </p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="p-6 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProgram(program)}
                      className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      Read Full Details
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                    <span className="text-xs text-muted-text font-medium">
                      {program.year}
                    </span>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Call to Action Banner */}
      <section className="w-full py-16 bg-[#FFEFE0] relative">
        <div className="container-custom text-center max-w-3xl mx-auto space-y-6">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground">
            Want to Visit or Enroll a Child in our Programs?
          </h2>
          <p className="text-base text-muted-text leading-relaxed">
            Our clinical doors at Kamachha Chungi, Varanasi are open Monday through Saturday. We offer comprehensive diagnostic evaluations and parent counseling.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link href="/contact#callback">
              <Button variant="default" size="lg" className="rounded-full">
                Schedule Assessment Visit
              </Button>
            </Link>
            <Link href="/donate">
              <Button variant="donate" size="lg" className="rounded-full shadow-glow-marigold">
                Sponsor Program Supplies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Modal Detail */}
      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </div>
  );
}
