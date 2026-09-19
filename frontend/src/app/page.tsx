"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RevealStagger } from "@/components/ui/reveal";
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
  BookOpen
} from "lucide-react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";
import { ProgramDetailModal, ProgramItem } from "@/components/ui/ProgramDetailModal";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { ImpactCalculator } from "@/components/ui/ImpactCalculator";

// Authentic programs data with SDG Color Profiles
const PROGRAMS_DATA: ProgramItem[] = [
  {
    id: "deva-center",
    title: "Deva Center, Varanasi",
    subtitle: "First Special Rehabilitation Institute in Eastern Uttar Pradesh",
    category: "current",
    sdgColor: "#26BDE2", // SDG 6/10 Clean Care & Reduced Inequalities (Soft Blue/Cyan)
    sdgThemeClass: "hover:border-[#26BDE2]/60",
    sdgName: "SDG 10: Reduced Inequalities",
    targetGroup: "Special Children",
    image: CLOUDINARY_IMAGES.devaBuilding,
    badge: "Flagship Facility (Est. 1991)",
    year: "1991 - Present",
    location: "Kamachha Chungi, Varanasi",
    summary: "Clinical rehabilitation, speech therapy, sensory integration, and parental counseling for autism, cerebral palsy, and intellectual disabilities.",
    fullDetails: {
      overview: "Established by Dr. C. Tulsi Das in 1991, Deva Center was the very first comprehensive rehabilitation center for individuals with intellectual disabilities in eastern Uttar Pradesh. The institute combines modern clinical psychological protocols with dedicated physical and sensory therapy.",
      impactNumbers: "12,000+ Children & Families Rehabilitated",
      highlights: [
        "Multidisciplinary diagnostic and psychological evaluations",
        "Sensory integration rooms & motor skill physiotherapy",
        "Individualized Education Plans (IEPs) for neurodivergent learners",
        "Daily nutritious meal support and hygienic health tracking"
      ],
      futureGoals: "Modernizing assistive AI speech tools and vocational adult workshops."
    }
  },
  {
    id: "annapurna-center",
    title: "Annapurna Center for the Girl Child",
    subtitle: "Protecting, Educating, and Nurturing Rural Women and Young Girls",
    category: "current",
    sdgColor: "#FF3A21", // SDG 5 Gender Equality (Vibrant Coral Pink/Red)
    sdgThemeClass: "hover:border-[#FF3A21]/60",
    sdgName: "SDG 5: Gender Equality",
    targetGroup: "Women & Girls",
    image: CLOUDINARY_IMAGES.heroChildren,
    badge: "Rural Girl Child Protection",
    year: "1995 - Present",
    location: "Rural Varanasi (13 km out)",
    summary: "Dedicated grassroots refuge managed by educated local women providing nutrition, health camps, schooling, and handcraft vocational independence.",
    fullDetails: {
      overview: "Founded in 1995, Annapurna Center shields impoverished rural girls from child exploitation and neglect. The center is proudly run on the ground by empowered village women who supervise nutritional programs, safe learning spaces, and vocational handicrafts.",
      impactNumbers: "4,500+ Rural Girls & Mothers Empowered",
      highlights: [
        "Nutritional support preventing anemia and chronic child malnutrition",
        "Adolescent girl hygiene camps and health screenings",
        "Vocational sewing, textile embroidery, and small-craft training",
        "Community awareness campaigns eradicating female infanticide stigma"
      ]
    }
  },
  {
    id: "deva-gram",
    title: "Deva Gram (Bachhaon Campus)",
    subtitle: "21 Disabilities Holistic Campus, Respite Care, and Rural Outposts",
    category: "current",
    sdgColor: "#4C9F38", // SDG 3 Good Health & Well-being (Forest Green)
    sdgThemeClass: "hover:border-[#4C9F38]/60",
    sdgName: "SDG 3: Good Health & Well-Being",
    targetGroup: "Rural Communities",
    image: CLOUDINARY_IMAGES.communityProgram,
    badge: "Inclusive Rural Sanctuary",
    year: "2010 - Present",
    location: "Bachhaon Village, Varanasi",
    summary: "Sprawling rural campus offering hydrotherapy, garden therapy, sports training, and respite care for all 21 legally recognized disability categories.",
    fullDetails: {
      overview: "Deva Gram in Bachhaon village extends clinical excellence into the heart of agricultural villages. It removes the grueling travel burden for rural parents by bringing hydrotherapy, sensory garden therapy, and pre-vocational training to their doorstep.",
      impactNumbers: "850+ Village Families Supported Annually",
      highlights: [
        "Care for all 21 benchmark disabilities recognized under Indian law",
        "Special Olympics physical fitness and adaptive sports training",
        "Herbal garden therapy and therapeutic sensory walkways",
        "Respite daycare giving rural caregiver parents relief to work"
      ]
    }
  },
  {
    id: "child-education-program",
    title: "Child Education Program (CEP)",
    subtitle: "School Fee Sponsorships, Uniforms, and After-School Academic Tutoring",
    category: "current",
    sdgColor: "#C5192D", // SDG 4 Quality Education (Crimson Red)
    sdgThemeClass: "hover:border-[#C5192D]/60",
    sdgName: "SDG 4: Quality Education",
    targetGroup: "Special Children",
    image: CLOUDINARY_IMAGES.education,
    badge: "Mainstream Education",
    year: "Continuous Initiative",
    location: "Slums & Urban Varanasi",
    summary: "Ensuring vulnerable children in poverty never drop out by covering formal school tuition, learning supplies, and daily after-school remedial classes.",
    fullDetails: {
      overview: "The Child Education Program (CEP) identifies bright, eager children from economically fragile families and provides full educational sponsorship. By paying fees and providing book bags and uniforms, DISCC prevents families from pulling children into child labor.",
      impactNumbers: "3,200+ Scholarships Distributed",
      highlights: [
        "100% formal school tuition and examination fee coverage",
        "Free distribution of textbooks, notebooks, school bags, and shoe sets",
        "Daily evening tutoring centers helping students stay top of their class",
        "Mentorship guiding matriculated teenagers toward collegiate diplomas"
      ]
    }
  },
  {
    id: "gangotri-school",
    title: "Gangotri Riverside Preparatory School",
    subtitle: "Pioneering Classes Under a Tree along the Sacred River Ganga",
    category: "past",
    sdgColor: "#0A97D9", // Water & Equity Blue
    sdgThemeClass: "hover:border-[#0A97D9]/60",
    sdgName: "Pioneering Grassroots Milestone",
    targetGroup: "All Individuals",
    image: CLOUDINARY_IMAGES.varanasiGhats,
    badge: "Foundation Milestone (1999)",
    year: "1999 - Foundation Era",
    location: "Assi Ghat & Nagwan, Varanasi",
    summary: "Started in 1999 beneath a sacred tree for children of migratory boatmen and rickshaw pullers, successfully transitioning hundreds into formal schools.",
    fullDetails: {
      overview: "In 1999, Dr. Tulsi began teaching children of migratory boatmen, street vendors, and daily wage earners under a large tree by the holy River Ganga. This informal classroom gradually grew into Gangotri School, which successfully integrated hundreds of street children into mainstream government and private institutions.",
      impactNumbers: "1,100+ Riverfront Children Mainstreamed",
      highlights: [
        "First formal literacy contact for multi-generational boatmen families",
        "Daily hygiene, clean drinking water, and morning nutritional breakfasts",
        "Foundational Hindi, Mathematics, and English phonetics immersion"
      ]
    }
  },
  {
    id: "navjeevan-clinic",
    title: "Navjeevan Leprosy Relief & Dignity Clinic",
    subtitle: "Weekly Antiseptic Bandaging, Medicine, and Psychosocial Counseling",
    category: "current",
    sdgColor: "#DD1367", // Healthcare & Social Inclusion
    sdgThemeClass: "hover:border-[#DD1367]/60",
    sdgName: "SDG 10: Ending Social Exclusion",
    targetGroup: "All Individuals",
    image: CLOUDINARY_IMAGES.childrenTherapy,
    badge: "Grassroots Medical Aid",
    year: "2000 - Present",
    location: "Dashashwamedh Ghat & Temples",
    summary: "Restoring medical dignity to individuals ostracized by leprosy through sterile wound dressing, free medicines, and social acceptance.",
    fullDetails: {
      overview: "Operating continuously since May 2000 near Dashashwamedh Ghat and Sankat Mochan Temple, Navjeevan ('New Life') reaches individuals suffering from Hansen's disease (leprosy). Weekly medical relief teams clean ulcers, apply sterile bandages, and offer compassionate counseling to combat societal abandonment.",
      impactNumbers: "40 - 50 Patients Treated Every Week",
      highlights: [
        "Sterile antiseptic wound management and ulcer prevention",
        "Distribution of protective micro-cellular rubber footwear",
        "Dignity restoration and family reunification counseling"
      ]
    }
  }
];

export default function Home() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [activeBandCategory, setActiveBandCategory] = useState<"all" | "current" | "past">("all");

  const filteredPrograms = PROGRAMS_DATA.filter((p) => {
    if (activeBandCategory === "all") return true;
    return p.category === activeBandCategory;
  });

  const partnerLogos = [
    { name: "The National Trust", src: CLOUDINARY_IMAGES.partners.nationalTrust },
    { name: "University of Wisconsin Oshkosh", src: CLOUDINARY_IMAGES.partners.oshkoshUniversity },
    { name: "Deva Europe", src: CLOUDINARY_IMAGES.partners.devaEurope },
    { name: "ACCGP", src: CLOUDINARY_IMAGES.partners.accgp },
    { name: "Changemakers Inc", src: CLOUDINARY_IMAGES.partners.changemakers },
    { name: "Kotak Mahindra Bank", src: CLOUDINARY_IMAGES.partners.kotakBank },
    { name: "Annapurna Center", src: CLOUDINARY_IMAGES.partners.annapurnaCenter },
    { name: "NHPS", src: CLOUDINARY_IMAGES.partners.nhps },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground selection:bg-primary selection:text-white">
      {/* 1. Official Government Accreditation Ribbon */}
      <div className="bg-secondary text-white text-xs font-semibold py-2.5 px-4 overflow-hidden border-b border-white/10 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2.5">
            <span className="bg-primary text-white px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-wider">
              Accredited NGO
            </span>
            <span className="hidden sm:inline text-white/90">
              32 years of dedicated service in Varanasi. Recognized by Government of India and State Government of UP.
            </span>
            <span className="sm:hidden text-white/90">
              32+ Years of Verified Humanitarian Service in Varanasi.
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/80 font-medium">
            <span>FCRA Approved</span>
            <span>•</span>
            <span>National Trust Recognized</span>
            <span>•</span>
            <span>80G Tax Exempt</span>
          </div>
        </div>
      </div>

      {/* 2. Creative Hero Section with High-Impact Editorial Layout */}
      <section className="relative w-full overflow-hidden pt-12 pb-20 md:pt-16 md:pb-28 border-b border-border/60 bg-gradient-to-b from-white via-muted/15 to-background">
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6">
              <RevealStagger>
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                  <ShieldCheck className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>DEVA International Society for Child Care (DISCC)</span>
                </div>
              </RevealStagger>

              <RevealStagger delay={0.08}>
                <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-display font-black tracking-tight text-secondary leading-[1.05]">
                  Nurturing Pure Souls with Scientific Care and Love
                </h1>
              </RevealStagger>

              <RevealStagger delay={0.16}>
                <p className="text-lg md:text-xl text-muted-foreground font-normal leading-relaxed max-w-2xl">
                  Pioneering clinical psychology, autism rehabilitation, and rural girl child empowerment in the sacred city of Varanasi since 1991.
                </p>
              </RevealStagger>

              <RevealStagger delay={0.24}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <Link href="/donate">
                    <Button size="lg" className="h-14 px-8 rounded-full font-bold uppercase text-xs tracking-wider bg-primary hover:bg-primary/90 text-white shadow-xl hover:shadow-2xl transition-all hover:scale-[1.02]">
                      <Heart className="w-4 h-4 mr-2 fill-white" />
                      Support a Special Child
                    </Button>
                  </Link>
                  <Link href="/our-work">
                    <Button size="lg" variant="outline" className="h-14 px-8 rounded-full font-bold uppercase text-xs tracking-wider border-secondary/30 hover:border-primary text-secondary hover:text-primary transition-all">
                      Explore What We Do
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </RevealStagger>

              {/* Chief Minister Award Callout Badge */}
              <RevealStagger delay={0.32}>
                <div className="pt-5 border-t border-border/70 flex items-center gap-4 text-sm text-foreground/90">
                  <div className="w-12 h-12 rounded-2xl bg-accent/25 flex items-center justify-center text-secondary font-bold flex-shrink-0 shadow-xs">
                    <Award className="w-6 h-6 text-secondary" />
                  </div>
                  <div>
                    <span className="font-bold text-secondary text-sm md:text-base block">
                      Best Professional Award by Chief Minister of Uttar Pradesh
                    </span>
                    <span className="text-xs text-muted-foreground">
                      Conferred upon Dr. C. Tulsi Das for groundbreaking psychiatric leadership in neurodivergent care
                    </span>
                  </div>
                </div>
              </RevealStagger>
            </div>

            {/* Right Visual Composition: Prominent CM Award & Children Photo with Framer Motion Physics */}
            <div className="lg:col-span-5 relative space-y-4">
              {/* Main Prominent Award Picture Card */}
              <motion.div
                initial={{ opacity: 0, y: 25, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4, transition: { duration: 0.3 } }}
                className="relative z-20"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/11] w-full group bg-slate-900">
                  <Image
                    src={CLOUDINARY_IMAGES.roleModelAward}
                    alt="Dr. Tulsi Das Receiving Award from Chief Minister of Uttar Pradesh"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 40vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 via-secondary/20 to-transparent" />
                  <div className="absolute bottom-5 left-5 right-5 text-white">
                    <div className="flex items-center gap-2 mb-1.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-accent text-secondary text-[10px] font-black uppercase tracking-wider shadow-xs">
                        State Honor
                      </span>
                    </div>
                    <p className="font-display font-bold text-base md:text-lg leading-snug text-white">
                      State Award Ceremony Honor
                    </p>
                    <p className="text-xs text-white/80 line-clamp-1">
                      Conferred by Chief Minister of Uttar Pradesh for outstanding clinical service
                    </p>
                  </div>
                </div>
              </motion.div>

              {/* Overlapping Secondary Card: Children of Deva Center */}
              <motion.div
                initial={{ opacity: 0, y: 35, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.3 } }}
                className="relative -mt-10 ml-auto w-11/12 sm:w-4/5 z-30"
              >
                <div className="relative rounded-2xl overflow-hidden shadow-2xl border-4 border-white aspect-[16/9] group bg-card">
                  <Image
                    src={CLOUDINARY_IMAGES.awardCeremony}
                    alt="DISCC Award Ceremony Milestone"
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 40vw, 35vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-transparent to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <p className="font-bold text-xs text-white">Deva Center Varanasi</p>
                    <p className="text-[11px] text-white/85">32 years of transforming neurodivergent lives</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Verified Impact Metrics Bar with Live Animated Counts */}
      <section className="py-12 bg-secondary text-white w-full border-b border-white/10">
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-white/15">
            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-accent tracking-tight">
                <AnimatedCounter value={32} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/80">Years in Varanasi</p>
              <p className="text-xs text-white/60">Founded in 1991</p>
            </div>

            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
                <AnimatedCounter value={98000} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/80">Families Supported</p>
              <p className="text-xs text-white/60">Clinical psychology & guidance</p>
            </div>

            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-accent tracking-tight">
                <AnimatedCounter value={9} />
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/80">Dedicated Centers</p>
              <p className="text-xs text-white/60">Urban and rural campuses</p>
            </div>

            <div className="pt-4 md:pt-0 md:px-6 space-y-1">
              <div className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-white tracking-tight">
                <AnimatedCounter value={235} suffix="+" />
              </div>
              <p className="text-xs uppercase tracking-wider font-semibold text-white/80">Awards & Honors</p>
              <p className="text-xs text-white/60">PM & CM State Recognitions</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. DR. TULSI DAS GLANCE IN KINETIC BANDS (Alternating Left/Right Transitions) */}
      <section className="py-20 md:py-28 border-b border-border/60 w-full overflow-hidden bg-background">
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-16">
          {/* Section Header */}
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
              Leadership & Pioneer
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-secondary tracking-tight">
              Dr. C. Tulsi Das: Four Decades of Compassion & Science
            </h2>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
              First Professional Clinical Psychologist in Uttar Pradesh dedicated to mental health and intellectual disability rehabilitation.
            </p>
          </div>

          {/* Alternating Slow Transition Kinetic Bands */}
          <div className="space-y-10">
            {/* Band 1: Enters from Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-xs hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm bg-muted/40">
                  <Image
                    src={CLOUDINARY_IMAGES.drTulsiPortrait}
                    alt="Dr. C. Tulsi Das Portrait"
                    fill
                    className="object-contain p-2"
                  />
                </div>
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                    Pioneering Founder (Ph.D. Psychiatry - Clinical Psychologist)
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-secondary">
                    Bridging Clinical Psychology and Deep Human Dignity
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    Born and raised in Varanasi, Dr. Tulsi devoted his clinical academic career to understanding neurodivergence at a time when eastern Uttar Pradesh possessed almost no specialized institutions. In 1991, he founded DISCC and established the Deva Center to serve the last, least, and lost.
                  </p>
                  <blockquote className="border-l-4 border-primary pl-4 py-1 italic text-secondary text-base font-semibold">
                    "Main akela hi chala tha janib-e-manzil magar, Log saath aate gaye aur karvan banta gaya."
                  </blockquote>
                </div>
              </div>
            </motion.div>

            {/* Band 2: Enters from Right */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-3xl bg-secondary text-white shadow-xl"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-4 order-2 lg:order-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase">
                    National Governance & Honors
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-white">
                    Appointed by Government of India to Apex Disability Councils
                  </h3>
                  <p className="text-white/80 text-sm sm:text-base leading-relaxed">
                    Former Council Member of NIEPID (Divyangjan) and Board Member of ARUNIM under the National Trust, Ministry of Social Justice and Empowerment. Honored by both the Prime Minister of India and the Chief Minister of Uttar Pradesh for exemplary psychiatric leadership.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-xs">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Former Clinical Psychologist, BHU</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Examiner, Madras & Dayalbagh Univ.</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Clinical Psychologist, UAE Medical School</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
                      <span>Visiting Professor, MSH Paris, France</span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-md border-2 border-white/20 order-1 lg:order-2">
                  <Image
                    src={CLOUDINARY_IMAGES.roleModelAward}
                    alt="Chief Minister Award Presentation"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </motion.div>

            {/* Band 3: Enters from Left */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="p-8 sm:p-10 rounded-3xl bg-card border border-border/80 shadow-xs hover:shadow-md transition-all"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-4 relative aspect-[4/3] rounded-2xl overflow-hidden shadow-sm border border-border">
                  <Image
                    src={CLOUDINARY_IMAGES.foundersMeet}
                    alt="Dr. Tulsi with International Partners"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="lg:col-span-8 space-y-4">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase">
                    Global Humanitarian Collaborations
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-display font-black text-secondary">
                    Fostering European-Indian & American Alliances
                  </h3>
                  <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                    In 1998, Dr. Tulsi partnered with French art historian Jean-Max Tassel to launch Deva Europe, creating enduring medical and financial solidarity across France and Germany. He serves as Coordinator for the Study Abroad Program with the University of Wisconsin Oshkosh, USA, hosting scholars in Varanasi every year.
                  </p>
                  <div className="pt-2">
                    <Link href="/about#founder">
                      <Button variant="outline" className="rounded-full border-secondary/30 hover:border-primary text-secondary hover:text-primary font-bold text-xs uppercase tracking-wider">
                        Read Dr. Tulsi's Complete Biography
                        <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE PROGRAMS IN BANDS WITH SDG THEMED WINDOWS */}
      <section className="py-20 md:py-28 bg-muted/25 border-b border-border/60 w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-12">
          {/* Header & Category Switcher */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
                Comprehensive Programs
              </span>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-secondary tracking-tight">
                Our Programs and Dedicated Centers
              </h2>
              <p className="text-muted-foreground text-sm sm:text-base">
                Click any program band to reveal its dedicated SDG theme, impact metrics, and detailed operational scope.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center gap-2 bg-white p-1.5 rounded-full border border-border shadow-xs self-start md:self-auto">
              <button
                onClick={() => setActiveBandCategory("all")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeBandCategory === "all"
                    ? "bg-secondary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                All Initiatives
              </button>
              <button
                onClick={() => setActiveBandCategory("current")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeBandCategory === "current"
                    ? "bg-secondary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Current Centers
              </button>
              <button
                onClick={() => setActiveBandCategory("past")}
                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  activeBandCategory === "past"
                    ? "bg-secondary text-white"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Past Milestones
              </button>
            </div>
          </div>

          {/* Interactive Program Bands List */}
          <div className="space-y-4">
            {filteredPrograms.map((prog, index) => (
              <motion.div
                key={prog.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                onClick={() => setSelectedProgram(prog)}
                className={`w-full cursor-pointer rounded-3xl bg-white border-2 border-border/80 p-6 sm:p-8 shadow-xs hover:shadow-xl transition-all duration-300 group relative overflow-hidden ${prog.sdgThemeClass}`}
              >
                {/* Visual Color Indicator Strip */}
                <div
                  className="absolute left-0 top-0 bottom-0 w-2.5 transition-all duration-300 group-hover:w-4"
                  style={{ backgroundColor: prog.sdgColor }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center pl-3">
                  {/* Left Metadata & Title */}
                  <div className="lg:col-span-8 space-y-2.5">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2.5 py-0.5 rounded-full text-white text-[10px] font-bold uppercase tracking-wider"
                        style={{ backgroundColor: prog.sdgColor }}
                      >
                        {prog.sdgName}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-muted text-foreground text-[10px] font-bold uppercase tracking-wider">
                        {prog.targetGroup}
                      </span>
                      <span className="text-xs text-muted-foreground font-medium">
                        {prog.location}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-display font-black text-secondary group-hover:text-primary transition-colors">
                      {prog.title}
                    </h3>

                    <p className="text-sm text-muted-foreground line-clamp-2">
                      {prog.summary}
                    </p>
                  </div>

                  {/* Right Thumbnail & Action Callout */}
                  <div className="lg:col-span-4 flex items-center justify-between lg:justify-end gap-4">
                    <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-2xl overflow-hidden shadow-xs border border-border flex-shrink-0">
                      <Image
                        src={prog.image}
                        alt={prog.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>

                    <div className="w-10 h-10 rounded-full bg-muted group-hover:bg-primary group-hover:text-white text-secondary flex items-center justify-center transition-colors flex-shrink-0">
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. Interactive Live Impact & Donation Calculator */}
      <ImpactCalculator />

      {/* 7. Authentic Photo Moments from Original Archives */}
      <section className="py-20 md:py-28 border-b border-border/60 w-full bg-background">
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
                Original Archive Moments
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary tracking-tight">
                Authentic Glimpses of Joy and Inclusion
              </h2>
            </div>
            <Link href="/stories">
              <Button variant="outline" className="rounded-full border-border hover:border-primary text-secondary hover:text-primary font-bold text-xs uppercase tracking-wider">
                Explore All Stories & Festivals
                <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            <div className="md:col-span-8">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-border aspect-[16/10] group">
                <Image
                  src={CLOUDINARY_IMAGES.purpleFair}
                  alt="Purple Fair for Divyangjan"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">Community Event 2026</span>
                  <h4 className="font-display font-bold text-xl">Purple Fair for Divyangjan in Varanasi</h4>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-border aspect-[16/10] group">
                <Image
                  src={CLOUDINARY_IMAGES.ramayanPlay}
                  alt="Ramayan Play Performance"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">Cultural Milestone</span>
                  <h4 className="font-display font-bold text-lg">Ramayan Play by Special Children</h4>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-border aspect-[16/10] group">
                <Image
                  src={CLOUDINARY_IMAGES.republicDay}
                  alt="Republic Day Celebration"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">Patriotic Milestone</span>
                  <h4 className="font-display font-bold text-lg">Republic Day Celebration</h4>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-border aspect-[16/10] group">
                <Image
                  src={CLOUDINARY_IMAGES.yogaDay}
                  alt="Yoga & Physical Well-being"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">Therapy & Recreation</span>
                  <h4 className="font-display font-bold text-lg">Yoga & Motor Well-being</h4>
                </div>
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="relative rounded-3xl overflow-hidden shadow-md border border-border aspect-[16/10] group">
                <Image
                  src={CLOUDINARY_IMAGES.basantPanchami}
                  alt="Basant Panchami Festivities"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent" />
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-accent block">Festivity</span>
                  <h4 className="font-display font-bold text-lg">Basant Panchami Festivities</h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Verified Partners Infinite Marquee */}
      <section className="py-16 bg-muted/20 border-b border-border/60 w-full overflow-hidden">
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Trusted Alliances</span>
            <h2 className="text-2xl sm:text-3xl font-display font-black text-secondary">
              Our Partners & Academic Collaborators
            </h2>
          </div>

          <div className="relative w-full overflow-hidden py-2">
            <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-r from-background via-background/80 to-transparent z-10" />
            <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-20 md:w-32 bg-gradient-to-l from-background via-background/80 to-transparent z-10" />

            <div className="flex gap-6 animate-marquee">
              {[...partnerLogos, ...partnerLogos].map((partner, idx) => (
                <div
                  key={`${partner.name}-${idx}`}
                  className="w-52 h-28 flex-shrink-0 p-4 bg-card rounded-2xl border border-border/80 shadow-xs flex flex-col items-center justify-center text-center hover:border-primary/60 transition-all hover:shadow-md group"
                >
                  <div className="relative w-14 h-14 mb-2">
                    <Image
                      src={partner.src}
                      alt={partner.name}
                      fill
                      className="object-contain filter group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <span className="text-xs font-bold text-secondary group-hover:text-primary transition-colors line-clamp-1">
                    {partner.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 8. Clinical Consultation & Support Banner */}
      <section className="py-16 bg-secondary text-white w-full">
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Clinical Consultations & Guidance</span>
              <h2 className="text-3xl sm:text-4xl font-display font-black leading-tight text-white">
                Seek Guidance for a Child or Family Member?
              </h2>
              <p className="text-white/80 text-sm sm:text-base max-w-2xl">
                Connect with our clinical psychology team in Varanasi. We offer parental counseling, psychological assessments, and personalized therapy plans.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-1 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="w-5 h-5 text-accent" />
                  <span className="font-bold text-lg text-accent">+91 7007453168</span>
                </div>
                <div className="flex items-center gap-2 text-white/80">
                  <MapPin className="w-4 h-4 text-accent" />
                  <span>Kamachha Chungi, Varanasi, UP</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3">
              <Link href="/contact" className="w-full">
                <Button size="lg" className="w-full h-12 rounded-full font-bold uppercase text-xs tracking-wider bg-primary hover:bg-primary/90 text-white shadow-lg">
                  Request Consultation
                </Button>
              </Link>
              <Link href="/donate" className="w-full">
                <Button size="lg" className="w-full h-12 rounded-full font-black uppercase text-xs tracking-wider bg-white hover:bg-accent text-secondary hover:text-secondary shadow-lg transition-all">
                  Support a Child Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Program Detail Modal Popup with SDG Color Shift */}
      <ProgramDetailModal
        program={selectedProgram}
        onClose={() => setSelectedProgram(null)}
      />
    </div>
  );
}
