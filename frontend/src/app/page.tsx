"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Award,
  Users,
  Building2,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  ChevronRight,
  CheckCircle2,
  Phone,
  BookOpen,
  HeartHandshake,
  Activity,
  Smile,
  Quote,
  Send,
  Lock
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StatCounter } from "@/components/ui/StatCounter";
import { Marquee } from "@/components/ui/Marquee";
import { CinematicHero } from "@/components/ui/CinematicHero";
import { Lightbox, LightboxImage } from "@/components/ui/Lightbox";
import { ProgramDetailModal, ProgramItem } from "@/components/ui/ProgramDetailModal";

const ALL_PROGRAMS: ProgramItem[] = [
  {
    id: "deva-center",
    title: "Deva Center, Varanasi",
    subtitle: "First Special Rehabilitation Institute in Eastern Uttar Pradesh",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "hover:border-[#0F8B8D]/60",
    sdgName: "SDG 10: Reduced Inequalities",
    targetGroup: "Special Children",
    image: "/images/discc/deva-building.jpg",
    badge: "Flagship Institute (Est. 1991)",
    year: "1991 - Present",
    location: "Kamachha Chungi, Varanasi",
    summary: "Clinical psychological evaluations, sensory integration therapy, speech therapy, and individualized education plans (IEPs) for children with intellectual disabilities.",
    fullDetails: {
      overview: "Established by Dr. C. Tulsi Das in 1991, Deva Center is Eastern UP's pioneer institute for clinical neurodivergence management. Combining psychological diagnostics with physical and speech therapy.",
      impactNumbers: "12,000+ Children & Families Rehabilitated",
      highlights: [
        "Comprehensive diagnostic and psychological assessments",
        "Sensory integration rooms & motor skill physiotherapy",
        "Individualized Education Plans (IEPs) for special learners",
        "Daily nutritious meal support and regular health tracking"
      ],
      futureGoals: "Introducing assistive AI speech tools and vocational adult workshops."
    }
  },
  {
    id: "deva-gram",
    title: "Deva Gram (Bachhaon Campus)",
    subtitle: "Comprehensive 21-Disability Rural Care & Respite Sanctuary",
    category: "current",
    sdgColor: "#3F7E44",
    sdgThemeClass: "hover:border-[#3F7E44]/60",
    sdgName: "SDG 3: Good Health & Well-Being",
    targetGroup: "Rural Communities",
    image: "/images/discc/community-program.png",
    badge: "Rural Sanctuary",
    year: "2010 - Present",
    location: "Bachhaon Village, Varanasi",
    summary: "Sprawling rural campus offering hydrotherapy, garden therapy, sports training, and respite care for all 21 legally recognized disability categories.",
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
    title: "Annapurna Center for Girls",
    subtitle: "Protecting, Educating, and Nurturing Rural Women and Young Girls",
    category: "current",
    sdgColor: "#EE6C4D",
    sdgThemeClass: "hover:border-[#EE6C4D]/60",
    sdgName: "SDG 5: Gender Equality",
    targetGroup: "Women & Girls",
    image: "/images/discc/hero-children.png",
    badge: "Rural Girl Child Protection",
    year: "1995 - Present",
    location: "Rural Varanasi Outskirts",
    summary: "Grassroots safe haven managed by empowered local women providing nutrition, health camps, schooling, and vocational handcraft independence.",
    fullDetails: {
      overview: "Founded in 1995, Annapurna Center shields marginalized rural girls from exploitation and neglect with direct nutrition, safe schooling, and vocational handicraft training.",
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
    id: "child-education",
    title: "Child Education Sponsorship",
    subtitle: "Bridging the Inclusive Classroom Gap for Marginalized Learners",
    category: "current",
    sdgColor: "#F5A524",
    sdgThemeClass: "hover:border-[#F5A524]/60",
    sdgName: "SDG 4: Quality Education",
    targetGroup: "Special Children",
    image: "/images/discc/children-activity.png",
    badge: "Education Sponsorship",
    year: "2002 - Present",
    location: "Varanasi District",
    summary: "Providing tuition scholarships, uniforms, specialized assistive learning kits, and teacher sensitisation for mainstream classroom integration.",
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
    id: "helpline-clinic",
    title: "Emergency Help Line & Clinics",
    subtitle: "24/7 Crisis Response, Mobile Counseling & Medical Outposts",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "hover:border-[#0F8B8D]/60",
    sdgName: "SDG 16: Peace & Strong Institutions",
    targetGroup: "All Individuals",
    image: "/images/discc/dr-tulsi-clinic.png",
    badge: "Emergency Care",
    year: "2005 - Present",
    location: "Eastern UP Region",
    summary: "Immediate crisis tele-counseling for families, suicide prevention helplines, and traveling psychological outreach vans.",
    fullDetails: {
      overview: "A lifeline for families navigating sudden neurological crises, parental distress, or disability abandonment.",
      impactNumbers: "25,000+ Helpline Consultations",
      highlights: [
        "Toll-free 24/7 telephonic psychological guidance",
        "Mobile doctor visits for bedridden individuals",
        "Emergency psychiatric medication and clinical referrals",
        "Caregiver psychological burnout counseling circles"
      ]
    }
  },
  {
    id: "gangotri-school",
    title: "Gangotri Riverside School",
    subtitle: "Historical Open-Air Classroom on the Sacred Ganga Ghats",
    category: "past",
    sdgColor: "#8E7CC3",
    sdgThemeClass: "hover:border-[#8E7CC3]/60",
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
  }
];

const GALLERY_PREVIEWS: LightboxImage[] = [
  {
    url: "/images/discc/award-ceremony.png",
    caption: "Dr. Tulsi receiving the Best Professional Psychologist Award from Chief Minister Yogi Adityanath",
    category: "Recognition & Awards",
    year: "2024"
  },
  {
    url: "/images/discc/children-activity.png",
    caption: "Inclusive classroom art & motor skills session at Deva Center",
    category: "Education & Therapy",
    year: "2025"
  },
  {
    url: "/images/discc/role-model-award.png",
    caption: "State Role Model Felicitation Ceremony celebrating excellence in ID rehabilitation",
    category: "Recognition & Awards",
    year: "2023"
  },
  {
    url: "/images/discc/children-therapy.jpg",
    caption: "Sensory integration and physical physiotherapy at Deva Center",
    category: "Clinical Care",
    year: "2025"
  },
  {
    url: "/images/discc/community-program.png",
    caption: "Rural community empowerment gathering at Deva Gram campus, Bachhaon",
    category: "Community Outreach",
    year: "2024"
  },
  {
    url: "/images/discc/hero-children.png",
    caption: "Annapurna Center young girls during vocational textile and craft workshop",
    category: "Girl Child Protection",
    year: "2025"
  }
];

const STORIES = [
  {
    id: "tanisha",
    name: "Tanisha",
    age: "9 Years",
    condition: "Cerebral Palsy & Motor Delay",
    milestone: "Walks independently & attends mainstream school",
    quote: "When we came to Deva Center, Tanisha could not stand without intense pain. Through 2 years of hydrotherapy and gait training, she now walks to school with a bright smile.",
    parent: "Sunita Devi (Mother), Varanasi",
    image: "/images/discc/children-therapy.jpg"
  },
  {
    id: "rahul",
    name: "Rahul",
    age: "11 Years",
    condition: "Autism Spectrum Disorder",
    milestone: "Communicates fluently with adaptive visual IEP",
    quote: "The personalized psychological plan helped Rahul express his needs without frustration. His sensory meltdowns reduced dramatically within six months.",
    parent: "Ramesh Sharma (Father), Chandauli",
    image: "/images/discc/children-activity.png"
  },
  {
    id: "priya",
    name: "Priya",
    age: "16 Years",
    condition: "Down Syndrome",
    milestone: "Runs vocational handicraft stall independently",
    quote: "Annapurna Center gave Priya self-respect and skill. She now creates beautiful embroidered bags that are celebrated at national handicraft exhibitions.",
    parent: "Geeta Verma (Mother), Bachhaon",
    image: "/images/discc/hero-children.png"
  }
];

export default function HomePage() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);

  // Form State
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackTopic, setCallbackTopic] = useState("child-admission");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackLoading, setCallbackLoading] = useState(false);

  const handleOpenLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;
    setCallbackLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackName,
          phone: callbackPhone,
          subject: `Quick Callback Request: ${callbackTopic}`,
          content: `Inquiry type: ${callbackTopic}. Phone: ${callbackPhone}`,
          type: "callback",
        }),
      });
      setCallbackSubmitted(true);
    } catch {
      setCallbackSubmitted(true);
    } finally {
      setCallbackLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center">
      {/* 1. Master Cinematic Hero Slideshow */}
      <CinematicHero />

      {/* 2. The Why / Who / How Story Narrative */}
      <section className="w-full py-20 md:py-28 bg-[#FFFAF2] relative">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Our Foundation"
            title="Pioneering Hope for Every Neurodivergent Child"
            description="Since 1991, DEVA International Society for Child Care has combined clinical excellence with unconditional love to build a society where every child belongs."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Why */}
            <Reveal delay={0.1} className="h-full">
              <div className="h-full p-8 rounded-3xl bg-white border border-border/70 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-6">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-3">
                    Why We Exist
                  </h3>
                  <p className="text-muted-text text-sm sm:text-base leading-relaxed">
                    In 1991, families of children with intellectual disabilities in Eastern UP faced severe societal stigma and zero clinical facilities. Dr. Tulsi established DISCC to provide scientific psychological care and protect their fundamental right to dignity.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50 text-xs font-semibold text-primary">
                  1991 Pioneer in Eastern UP
                </div>
              </div>
            </Reveal>

            {/* Who */}
            <Reveal delay={0.2} className="h-full">
              <div className="h-full p-8 rounded-3xl bg-white border border-border/70 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#EE6C4D]/10 text-[#EE6C4D] flex items-center justify-center mb-6">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-3">
                    Who We Serve
                  </h3>
                  <p className="text-muted-text text-sm sm:text-base leading-relaxed">
                    Children diagnosed with Autism, Cerebral Palsy, Down Syndrome, and all 21 legally recognized disability categories, alongside underprivileged rural girl children and caregivers needing respite.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50 text-xs font-semibold text-[#EE6C4D]">
                  All 21 Disability Classifications
                </div>
              </div>
            </Reveal>

            {/* How */}
            <Reveal delay={0.3} className="h-full">
              <div className="h-full p-8 rounded-3xl bg-white border border-border/70 shadow-soft hover:shadow-soft-lg transition-all duration-300 flex flex-col justify-between">
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#F5A524]/10 text-[#F5A524] flex items-center justify-center mb-6">
                    <Activity className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold font-heading text-foreground mb-3">
                    How We Heal
                  </h3>
                  <p className="text-muted-text text-sm sm:text-base leading-relaxed">
                    Through multidisciplinary individualized education plans (IEPs), sensory integration rooms, speech therapy, rural hydrotherapy, and vocational craft independence for lifelong self-reliance.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50 text-xs font-semibold text-[#F5A524]">
                  Clinical Psychology + Compassion
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 3. Core Programmes & Focus Areas */}
      <section id="programmes" className="w-full py-20 md:py-28 bg-[#FFEFE0]/50 relative">
        <div className="container-custom">
          <SectionHeading
            title="Our Action Areas & Facilities"
            description="Explore our clinical campuses, rural sanctuaries, and educational initiatives across Varanasi and Uttar Pradesh."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {ALL_PROGRAMS.map((program, idx) => (
              <Reveal key={program.id} delay={idx * 0.08} className="h-full">
                <div className="group h-full rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all duration-300 overflow-hidden flex flex-col justify-between">
                  <div>
                    {/* Card Cover Image */}
                    <div className="relative w-full h-52 overflow-hidden bg-muted">
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 33vw"
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
                      <p className="text-sm text-muted-text leading-relaxed line-clamp-3">
                        {program.summary}
                      </p>
                    </div>
                  </div>

                  {/* Card Action Footer */}
                  <div className="p-6 pt-0 border-t border-border/40 mt-auto flex items-center justify-between">
                    <button
                      onClick={() => setSelectedProgram(program)}
                      className="text-sm font-bold text-primary hover:text-primary-hover flex items-center gap-1 transition-colors cursor-pointer"
                    >
                      View Details
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

          <div className="mt-12 text-center">
            <Link href="/our-work">
              <Button variant="outline" size="lg" className="rounded-full gap-2">
                Explore Full Programme Catalog
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Animated Impact Counters */}
      <section className="w-full py-16 bg-[#0F8B8D] text-white relative overflow-hidden">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-2xl mx-auto mb-12 text-white">
            <h2 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight">
              32+ Years of Measurable Transformation
            </h2>
            <p className="mt-3 text-white/85 text-base">
              Every number represents a child who learned to communicate, walk, create, and stand with dignity.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            <StatCounter
              value={12000}
              suffix="+"
              label="Children Rehabilitated"
              sublabel="Clinical therapy and education"
              className="bg-white/10 text-white border-white/20 hover:bg-white/15"
            />
            <StatCounter
              value={32}
              suffix="+"
              label="Years of Service"
              sublabel="Continuously since 1991"
              className="bg-white/10 text-white border-white/20 hover:bg-white/15"
            />
            <StatCounter
              value={4500}
              suffix="+"
              label="Rural Girls Empowered"
              sublabel="Nutrition, safety & craft skills"
              className="bg-white/10 text-white border-white/20 hover:bg-white/15"
            />
            <StatCounter
              value={21}
              suffix=""
              label="Disability Categories"
              sublabel="Full RPwD Act coverage"
              className="bg-white/10 text-white border-white/20 hover:bg-white/15"
            />
          </div>
        </div>
      </section>

      {/* 5. "Meet the Child" Transformation Stories */}
      <section className="w-full py-20 md:py-28 bg-[#FFFAF2] relative">
        <div className="container-custom">
          <SectionHeading
            eyebrow="Real Journeys"
            title="Stories of Resilience and Hope"
            description="Witness the personal breakthroughs of our children and their devoted families."
          />

          <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-border/80 shadow-soft-lg p-6 sm:p-10 md:p-12 relative overflow-hidden">
            <AnimatePresence mode="wait">
              {STORIES[activeStoryIndex] && (
                <motion.div
                  key={STORIES[activeStoryIndex].id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                  className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center"
                >
                  <div className="md:col-span-5 relative aspect-square rounded-2xl overflow-hidden shadow-md">
                    <Image
                      src={STORIES[activeStoryIndex].image}
                      alt={STORIES[activeStoryIndex].name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-primary text-white text-xs font-bold">
                      {STORIES[activeStoryIndex].age}
                    </div>
                  </div>

                  <div className="md:col-span-7 space-y-4">
                    <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>{STORIES[activeStoryIndex].condition}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
                      Meet {STORIES[activeStoryIndex].name}
                    </h3>

                    <div className="p-3.5 rounded-xl bg-[#E6F6EE] border border-[#0F8B8D]/20 text-sm font-semibold text-[#0F8B8D]">
                      Milestone: {STORIES[activeStoryIndex].milestone}
                    </div>

                    <p className="text-sm sm:text-base text-muted-text italic leading-relaxed">
                      &ldquo;{STORIES[activeStoryIndex].quote}&rdquo;
                    </p>

                    <div className="pt-2 text-xs font-bold text-foreground">
                      {STORIES[activeStoryIndex].parent}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Carousel Switchers */}
            <div className="mt-8 pt-6 border-t border-border/60 flex items-center justify-between">
              <div className="flex items-center gap-2">
                {STORIES.map((story, i) => (
                  <button
                    key={story.id}
                    onClick={() => setActiveStoryIndex(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                      i === activeStoryIndex
                        ? "w-8 bg-primary"
                        : "w-2.5 bg-border hover:bg-muted-text"
                    }`}
                    aria-label={`Show story of ${story.name}`}
                  />
                ))}
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() =>
                    setActiveStoryIndex(
                      (prev) => (prev - 1 + STORIES.length) % STORIES.length
                    )
                  }
                  className="p-2 rounded-full border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
                  aria-label="Previous story"
                >
                  <ChevronRight className="w-5 h-5 rotate-180" />
                </button>
                <button
                  onClick={() =>
                    setActiveStoryIndex((prev) => (prev + 1) % STORIES.length)
                  }
                  className="p-2 rounded-full border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
                  aria-label="Next story"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Events & Gallery Preview */}
      <section className="w-full py-20 md:py-28 bg-[#E8F4FB]/50 relative">
        <div className="container-custom">
          <SectionHeading
            title="Moments of Joy, Therapy & Recognition"
            description="A glimpse into daily breakthroughs, special education classrooms, and state award ceremonies."
          />

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
            {GALLERY_PREVIEWS.map((item, idx) => (
              <Reveal key={item.url} delay={idx * 0.06}>
                <div
                  onClick={() => handleOpenLightbox(idx)}
                  className="group relative aspect-[4/3] rounded-2xl sm:rounded-3xl overflow-hidden shadow-soft cursor-pointer bg-muted"
                >
                  <Image
                    src={item.url}
                    alt={item.caption || "DISCC Gallery"}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-108"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-4 flex flex-col justify-end text-white">
                    <span className="text-[11px] font-semibold text-[#F5A524]">
                      {item.category}
                    </span>
                    <p className="text-xs sm:text-sm font-medium line-clamp-2">
                      {item.caption}
                    </p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Link href="/events">
              <Button variant="outline" size="lg" className="rounded-full gap-2">
                Browse Complete 2025-2026 Gallery
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. Testimonials & Patron Quotes */}
      <section className="w-full py-20 bg-[#FFFAF2] relative">
        <div className="container-custom">
          <SectionHeading
            title="Voices of Trust"
            description="Endorsements from senior medical professionals, developmental pediatricians, and community partners."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Reveal delay={0.1}>
              <div className="p-8 rounded-3xl bg-white border border-border/70 shadow-soft h-full flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-sm sm:text-base text-muted-text leading-relaxed">
                    &ldquo;Dr. Tulsi and DISCC represent the benchmark for clinical psychological assessments and compassionate child care in Eastern Uttar Pradesh.&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="font-bold text-sm text-foreground">Dr. V. K. Tripathi</p>
                  <p className="text-xs text-muted-text">Senior Developmental Consultant, Varanasi</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <div className="p-8 rounded-3xl bg-white border border-border/70 shadow-soft h-full flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-sm sm:text-base text-muted-text leading-relaxed">
                    &ldquo;The dedication of the therapists at Deva Center has transformed hundreds of children from complete dependency to self-reliance and joy.&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="font-bold text-sm text-foreground">Prof. S. R. Mukherjee</p>
                  <p className="text-xs text-muted-text">Department of Psychology, BHU</p>
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <div className="p-8 rounded-3xl bg-white border border-border/70 shadow-soft h-full flex flex-col justify-between">
                <div>
                  <Quote className="w-8 h-8 text-primary/30 mb-4" />
                  <p className="text-sm sm:text-base text-muted-text leading-relaxed">
                    &ldquo;Every rupee donated to DISCC reaches the ground directly. Their transparency and 32-year track record are exemplary.&rdquo;
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/50">
                  <p className="font-bold text-sm text-foreground">Anand Agrawal</p>
                  <p className="text-xs text-muted-text">Patron & CSR Committee Chair, Varanasi</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 8. Partners & Certifications Marquee */}
      <section className="w-full py-12 bg-white border-y border-border/70 overflow-hidden select-none">
        <div className="container-custom mb-6 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-muted-text">
            Affiliated & Certified By Respected Authorities
          </p>
        </div>
        <Marquee speed={28}>
          <div className="flex items-center gap-12 sm:gap-16 px-6 text-foreground font-bold text-sm sm:text-base whitespace-nowrap">
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              FCRA Ministry of Home Affairs
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#F5A524]" />
              National Trust (Govt of India)
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              Social Welfare Dept (Govt of UP)
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              Section 80G & 12A Tax Exempt
            </span>
            <span className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[#F5A524]" />
              DDRC Varanasi Partner
            </span>
          </div>
        </Marquee>
      </section>

      {/* 9. Donation Banner with High Conversion */}
      <section className="w-full py-20 bg-gradient-to-r from-[#FFEFE0] via-[#FFFAF2] to-[#FFEFE0] border-b border-border/70 relative">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto rounded-3xl bg-white border border-border/80 shadow-soft-lg p-8 sm:p-12 text-center relative overflow-hidden">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#F5A524]/15 text-[#1E2A3A] font-bold text-xs uppercase tracking-wider mb-6">
              <Heart className="w-4 h-4 text-primary fill-current" />
              Make a Direct Impact
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-heading text-foreground tracking-tight leading-tight">
              Sponsor a Child&apos;s Therapy and Education
            </h2>

            <p className="mt-4 text-base sm:text-lg text-muted-text max-w-2xl mx-auto leading-relaxed">
              Your contribution directly funds speech therapy, nutritious meals, mobility calipers, and classroom toolkits. All Indian donations are eligible for 50% tax deduction under Section 80G.
            </p>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/donate">
                <Button variant="donate" size="lg" className="shadow-glow-marigold text-base gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  Donate Online Now
                </Button>
              </Link>
              <Link href="/fcra">
                <Button variant="outline" size="lg" className="text-base">
                  View FCRA & Bank Details
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 10. Request a Call Back & Inquiry Form */}
      <section id="callback" className="w-full py-20 md:py-28 bg-[#FFFAF2] relative">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto rounded-3xl bg-white border border-border/80 shadow-soft-lg p-8 sm:p-12">
            <div className="text-center mb-8">
              <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20">
                Direct Help
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-heading text-foreground mt-3">
                Request a Call Back from our Specialists
              </h2>
              <p className="text-sm sm:text-base text-muted-text mt-2">
                Need guidance for child assessment, therapy admission, or volunteer inquiry? Leave your number and our team will connect within 24 hours.
              </p>
            </div>

            {callbackSubmitted ? (
              <div className="p-8 rounded-2xl bg-[#E6F6EE] border border-[#0F8B8D]/30 text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-primary mx-auto" />
                <h3 className="text-xl font-bold text-foreground">Thank You!</h3>
                <p className="text-sm text-muted-text">
                  Your request has been received. Our clinical coordinator will call you at {callbackPhone} shortly.
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setCallbackSubmitted(false);
                    setCallbackName("");
                    setCallbackPhone("");
                  }}
                  className="mt-2"
                >
                  Submit Another Request
                </Button>
              </div>
            ) : (
              <form onSubmit={handleCallbackSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      Your Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={callbackName}
                      onChange={(e) => setCallbackName(e.target.value)}
                      placeholder="e.g. Anjali Sharma"
                      className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-foreground mb-1">
                      Phone / Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={callbackPhone}
                      onChange={(e) => setCallbackPhone(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-foreground mb-1">
                    Inquiry Topic
                  </label>
                  <select
                    value={callbackTopic}
                    onChange={(e) => setCallbackTopic(e.target.value)}
                    className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                  >
                    <option value="child-admission">Child Admission & Psychological Assessment</option>
                    <option value="therapy-services">Sensory / Speech / Physical Therapy</option>
                    <option value="rural-outreach">Deva Gram & Annapurna Rural Centers</option>
                    <option value="donation-csr">Donations & Corporate CSR Partnership</option>
                    <option value="other">General Inquiry</option>
                  </select>
                </div>

                <Button
                  type="submit"
                  disabled={callbackLoading}
                  variant="default"
                  size="lg"
                  className="w-full gap-2 mt-4 text-base"
                >
                  <Send className="w-4 h-4" />
                  {callbackLoading ? "Submitting..." : "Request Call Back"}
                </Button>

                <p className="text-center text-xs text-muted-text mt-3">
                  You can also call our Varanasi helpline directly at <span className="font-bold text-foreground">7007453168</span>
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Program Details Modal */}
      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />

      {/* Gallery Lightbox */}
      <Lightbox
        images={GALLERY_PREVIEWS}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={(idx) => setLightboxIndex(idx)}
      />
    </div>
  );
}
