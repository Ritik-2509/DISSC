"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import {
  Award,
  ShieldCheck,
  CheckCircle2,
  Calendar,
  Heart,
  Users,
  Building2,
  GraduationCap,
  ArrowRight,
  MapPin,
  Sparkles,
  Plane,
  Navigation,
  Compass,
  Wind,
  Globe,
  Radio,
  Clock,
  Play,
  Pause,
  RotateCcw,
  ArrowUpRight,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandUnderline, HandCircle } from "@/components/ui/HandDrawn";

const FLIGHT_WAYPOINTS = [
  {
    year: "1991",
    flightCode: "KMC-01",
    waypointNum: "01",
    waypoint: "Kamachha Genesis Departure",
    hindi: "कामच्छा उड़ान केंद्र",
    sector: "Origin · Runway 1991",
    coordinates: "25.3176° N · 82.9739° E",
    altitude: "Climbing to 10,000 FT",
    nextVector: "Direct: Annapurna Rural Corridor (+4 Yrs)",
    title: "Foundation of Deva Center at Kamachha",
    narrative: "Dr. C. Tulsi Das launched the DEVA humanitarian flight mission in Kamachha, opening Eastern Uttar Pradesh's first specialized clinical diagnostic and rehabilitation sanctuary for children with intellectual disabilities.",
    tag: "Genesis Takeoff",
    image: "/images/discc/founders-meet.jpg",
    caption: "Early archival clinical fieldwork & parent guidance in Varanasi, 1991"
  },
  {
    year: "1995",
    flightCode: "ANP-02",
    waypointNum: "02",
    waypoint: "Annapurna Rural Corridor",
    hindi: "अन्नपूर्णा ग्रामीण सेक्टर",
    sector: "+4 Years · Rural Outreach Sector",
    coordinates: "25.2842° N · 82.8911° E",
    altitude: "Cruising 18,000 FT",
    nextVector: "Direct: Transcontinental Paris Bridge (+3 Yrs)",
    title: "Annapurna Center for Rural Girls",
    narrative: "Expanded flight corridors into deep rural Varanasi to shield impoverished young girls from malnutrition and educational exclusion, opening a secure residential sanctuary managed by empowered local women.",
    tag: "Rural Air-Bridge",
    image: "/images/discc/community-program.png",
    caption: "Annapurna Center residential sanctuary and vocational workshop"
  },
  {
    year: "1998",
    flightCode: "PAR-03",
    waypointNum: "03",
    waypoint: "Transcontinental Paris Alliance",
    hindi: "पेरिस मैत्री सेतु",
    sector: "+7 Years · Global Solidarity Corridor",
    coordinates: "48.8566° N · 2.3522° E",
    altitude: "Transcontinental FL340",
    nextVector: "Direct: Deva Gram Sanctuary Base (+12 Yrs)",
    title: "Indo-European Alliance with Jean-Max Tassel",
    narrative: "Forged an enduring international solidarity air-bridge with French art historian Jean-Max Tassel, connecting European pediatric specialists, therapy methodologies, and humanitarian donor networks directly to Varanasi.",
    tag: "Transatlantic Bridge",
    image: "/images/discc/dr-tulsi-clinic.png",
    caption: "European medical cooperation and international solidarity in Varanasi"
  },
  {
    year: "2010",
    flightCode: "DVG-04",
    waypointNum: "04",
    waypoint: "Deva Gram 5-Acre Sanctuary Base",
    hindi: "देवा ग्राम टर्मिनल",
    sector: "+19 Years · Campus Hub Milestone",
    coordinates: "25.2415° N · 82.9103° E",
    altitude: "Cruising FL360",
    nextVector: "Direct: Lucknow State Honors Airspace (+9 Yrs)",
    title: "Deva Gram 21-Disability Rural Sanctuary",
    narrative: "Inaugurated an expansive rural rehabilitation campus in Bachhaon village equipped with open-air hydrotherapy, multi-sensory stimulation nature trails, and comprehensive caregiver respite lodging.",
    tag: "Sanctuary Base",
    image: "/images/discc/children-therapy.jpg",
    caption: "Deva Gram open-air hydrotherapy and community grounds"
  },
  {
    year: "2019",
    flightCode: "LKO-05",
    waypointNum: "05",
    waypoint: "Lucknow State Honors Airspace",
    hindi: "लखनऊ राज्य सम्मान",
    sector: "+28 Years · State Recognition",
    coordinates: "26.8467° N · 80.9462° E",
    altitude: "Honors Vector FL380",
    nextVector: "Direct: Living Legacy Central Hub (+6 Yrs)",
    title: "State Award from UP CM Yogi Adityanath",
    narrative: "Hon'ble Chief Minister of Uttar Pradesh Yogi Adityanath conferred the Best Professional Psychologist State Award to Dr. Tulsi Das in Lucknow, honoring three decades of extraordinary humanitarian service.",
    tag: "State Honor",
    image: "/images/discc/award-ceremony.png",
    caption: "State Felicitation Ceremony in Lucknow"
  },
  {
    year: "Today",
    flightCode: "VNS-06",
    waypointNum: "06",
    waypoint: "Living Legacy Central Flight Hub",
    hindi: "वर्तमान केंद्रीय उड़ान हब",
    sector: "35 Years of Missions Completed",
    coordinates: "25.3176° N · 82.9739° E",
    altitude: "Level Flight · Everlasting Horizons",
    nextVector: "Destination: Everlasting Transformation",
    title: "35 Years of Dignity & 12,000+ Families",
    narrative: "Operating clinical and rural campuses across Varanasi with full FCRA registration, 80G tax exemption, and specialized therapy equipment, carrying the flight of human dignity forward every single day.",
    tag: "Living Legacy",
    image: "/images/discc/hero-children.png",
    caption: "Inclusive Purple Fair community celebration across Varanasi"
  }
];

{/* Aerodynamic Aircraft Flight Component with Dynamic Contrails & Nav Lights */}
function AeroPlaneFlight({
  angle = 0,
  className = "",
  showContrail = true,
}: {
  angle?: number;
  className?: string;
  showContrail?: boolean;
}) {
  return (
    <div
      className={`relative inline-block select-none transition-transform duration-300 ease-out ${className}`}
      style={{ transform: `rotate(${angle}deg)` }}
    >
      {/* Jet Engine Contrails */}
      {showContrail && (
        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center justify-between w-9 pointer-events-none">
          <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400/80 via-white/40 to-transparent blur-[1.5px] rounded-full animate-pulse" />
          <div className="w-1.5 h-10 bg-gradient-to-b from-cyan-400/80 via-white/40 to-transparent blur-[1.5px] rounded-full animate-pulse" />
        </div>
      )}

      {/* Aerodynamic Jet Aircraft SVG */}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-14 sm:w-16 h-14 sm:h-16 drop-shadow-xl"
      >
        <defs>
          <filter id="aircraft-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor="#182321" floodOpacity="0.22" />
          </filter>
        </defs>

        <g filter="url(#aircraft-shadow)">
          {/* Main Swept Wings */}
          <path
            d="M 60 48 L 12 74 L 16 80 L 60 62 L 104 80 L 108 74 Z"
            fill="#FAF7F0"
            stroke="#0F8B8D"
            strokeWidth="1.2"
          />

          {/* Jet Turbines under Wings */}
          <rect x="34" y="60" width="6" height="14" rx="3" fill="#0F8B8D" />
          <rect x="80" y="60" width="6" height="14" rx="3" fill="#0F8B8D" />

          {/* Aerodynamic Fuselage (Body) */}
          <path
            d="M 60 12 C 55 24, 53 45, 53 82 L 56 102 L 64 102 L 67 82 C 67 45, 65 24, 60 12 Z"
            fill="#FFFFFF"
            stroke="#0F8B8D"
            strokeWidth="1.5"
          />

          {/* Cockpit Windshield */}
          <path d="M 57 26 C 58 24, 62 24, 63 26 L 65 32 C 62 33, 58 33, 55 32 Z" fill="#D97706" />

          {/* Cyan/Teal Speed Stripe along Fuselage */}
          <line x1="60" y1="36" x2="60" y2="86" stroke="#0F8B8D" strokeWidth="2" strokeLinecap="round" />

          {/* Tail Stabilizers */}
          <path d="M 60 90 L 38 106 L 40 110 L 60 102 L 80 110 L 82 106 Z" fill="#FAF7F0" stroke="#0F8B8D" strokeWidth="1" />
          {/* Vertical Tail Fin */}
          <path d="M 60 84 L 58 104 L 62 104 Z" fill="#D97706" />

          {/* Starboard Wing Navigation Light (Green) */}
          <circle cx="106" cy="76" r="2.5" fill="#10B981" />
          {/* Port Wing Navigation Light (Red) */}
          <circle cx="14" cy="76" r="2.5" fill="#EF4444" />
          {/* Tail Beacon (White) */}
          <circle cx="60" cy="106" r="2" fill="#FFFFFF" />
        </g>
      </svg>
    </div>
  );
}

const STAMP_CERTIFICATIONS = [
  { code: "FCRA Registered", authority: "Ministry of Home Affairs, Govt. of India", detail: "Authorized for International Aid" },
  { code: "Section 80G", authority: "Income Tax Department", detail: "50% Tax Exemption for Donors" },
  { code: "Section 12A", authority: "Income Tax Act 1961", detail: "Non-Profit Entity Exemption" },
  { code: "National Trust", authority: "Ministry of Social Justice & Empowerment", detail: "Reg. for Autism, CP, MR & Multiple Disabilities" },
  { code: "PwD Registration", authority: "State PwD Commissionerate, Uttar Pradesh", detail: "Official Disability Institute License" },
];

const FAMILY_TEAM = [
  {
    name: "Dr. C. Tulsi Das",
    role: "Founder President & Clinical Psychologist",
    credentials: "Ph.D. (Psychiatry - Clinical Psychology)",
    note: "40+ years in neurodivergence rehabilitation. UP Chief Minister State Award recipient.",
    image: "/images/discc/dr-tulsi-portrait.jpg",
    span: "col-span-1 w-full lg:col-span-5"
  },
  {
    name: "Jean-Max Tassel",
    role: "Chief International Patron",
    credentials: "Art Historian & Philanthropist (France)",
    note: "Co-founder of Deva Europe, establishing 25+ years of European medical cooperation.",
    image: "https://res.cloudinary.com/djbiwbdo/image/upload/v1790592534/discc/events/international-solidarity/international-solidarity_Picture_419.jpg",
    span: "col-span-1 w-full lg:col-span-4"
  },
  {
    name: "Er. Raaj Deva",
    role: "Director of Infrastructure & Strategy",
    credentials: "B.Tech (Systems & Operations)",
    note: "Overseeing rural campus expansion, digital accessibility, and clinical compliance.",
    image: "/images/discc/deva-building.jpg",
    span: "col-span-1 w-full lg:col-span-3"
  }
];

export default function AboutPage() {
  const [activeWaypoint, setActiveWaypoint] = useState<number>(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);
  const [engineBoostActive, setEngineBoostActive] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [isScrolling, setIsScrolling] = useState<boolean>(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const journeySectionRef = useRef<HTMLDivElement>(null);

  // Hook into timeline section scroll: tracks from takeoff to final arrival hub
  const { scrollYProgress } = useScroll({
    target: journeySectionRef,
    offset: ["start 20%", "end 80%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const clamped = Math.min(1, Math.max(0, latest));
    setScrollProgress(clamped);
    setIsScrolling(true);
    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    scrollTimeoutRef.current = setTimeout(() => {
      setIsScrolling(false);
    }, 380);

    // Sync active waypoint with scroll progress across 6 milestones (0 to 5)
    const idx = Math.min(5, Math.max(0, Math.floor(clamped * 6)));
    setActiveWaypoint(idx);
  });

  // Automatically tour through the 35-year humanitarian flight route waypoint-by-waypoint
  useEffect(() => {
    if (!isAutoPlaying) return;

    const timer = setInterval(() => {
      setActiveWaypoint((prev) => {
        if (prev < FLIGHT_WAYPOINTS.length - 1) {
          const next = prev + 1;
          document.getElementById(`waypoint-${next}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
          return next;
        } else {
          setIsAutoPlaying(false);
          return prev;
        }
      });
    }, 4500);

    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  const handleWaypointJump = (idx: number) => {
    setActiveWaypoint(idx);
    setIsAutoPlaying(false);
    const elem = document.getElementById(`waypoint-${idx}`);
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const handleRestartTour = () => {
    setActiveWaypoint(0);
    setIsAutoPlaying(false);
    setEngineBoostActive(true);
    setTimeout(() => setEngineBoostActive(false), 2400);
    const elem = document.getElementById("waypoint-0");
    if (elem) {
      elem.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#F6F4EE] text-[#182321]">
      
      {/* 1. Founder & Archival Hero */}
      <section className="w-full pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#E5E0D4] relative overflow-hidden bg-[#F6F4EE]">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Headline & Founder Philosophy */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col text-left"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E0] border border-[#F5A524]/40 text-[#8B4500] w-fit mb-5 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Est. 1991 in Varanasi · 35 Years of Care
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#182321] leading-[1.15] mb-4">
                A Lifetime Dedicated to the Dignity of Special Children.
              </h1>

              <div className="mb-4">
                <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
              </div>

              <p className="text-base sm:text-lg text-[#3E5062] font-medium leading-relaxed mb-6">
                Founded by clinical psychologist Dr. C. Tulsi Das, DISCC emerged from an urgent need in Eastern Uttar Pradesh: replacing societal neglect with rigorous clinical science and unconditional love.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-[#E5E0D4] shadow-xs mb-6">
                <p className="text-sm font-serif italic text-[#182321] leading-relaxed">
                  &ldquo;When a child with special needs is given early clinical assessment, sensory regulation, and patient guidance, they discover their inherent human dignity. We do not look at disabilities as limits; we build the bridges to life.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[#5B6B7C]">
                  <span className="font-bold text-[#182321]">Dr. C. Tulsi Das</span>
                  <span className="font-semibold text-[#0F8B8D]">Ph.D. Clinical Psychology</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                <Link href="/contact" className="w-full sm:w-auto">
                  <Button size="lg" className="w-full sm:w-auto bg-[#0F8B8D] hover:bg-[#0D7A7C] text-white font-bold rounded-full px-7 shadow-xs cursor-pointer">
                    Connect with Dr. Tulsi
                  </Button>
                </Link>
                <Link href="/donate" className="w-full sm:w-auto">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto border-[#C8BFB3] text-[#182321] font-bold rounded-full px-6 cursor-pointer">
                    Support Our Work
                  </Button>
                </Link>
              </div>
            </motion.div>

            {/* Right: Uncropped Award Felicitation Photo */}
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-6"
            >
              <div className="relative bg-[#FAF7F0] p-3.5 sm:p-4 rounded-[25px] border border-[#E5E0D4] shadow-md">
                <div className="relative w-full aspect-[16/11] rounded-[20px] overflow-hidden bg-[#EAE5D9]">
                  <Image
                    src="https://res.cloudinary.com/djbiwbdo/image/upload/v1790592004/discc/events/state-honors/state-honors_role-model-award.png"
                    alt="Dr. Tulsi receiving State Award from UP CM Yogi Adityanath"
                    fill
                    priority
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>

                <div className="p-3.5">
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-[#FFF3E0] text-xs font-bold text-[#8B4500] border border-[#F5A524]/20">
                      State Award 2019
                    </span>
                    <span className="text-xs font-semibold text-[#5B6B7C]">Lucknow, UP</span>
                  </div>
                  <h2 className="text-base sm:text-lg font-bold text-[#182321]">
                    Best Professional Psychologist State Award
                  </h2>
                  <p className="text-xs sm:text-sm text-[#5B6B7C] mt-1 leading-relaxed">
                    Conferred by Hon&apos;ble UP Chief Minister Yogi Adityanath celebrating Dr. Tulsi&apos;s pioneering rehabilitation work for intellectual disabilities across Eastern UP.
                  </p>
                </div>
              </div>
            </motion.div>

          </div>

        </div>
      </section>

      {/* 2. Aerodynamic Flight Navigation Corridor (1991 -> Present) */}
      <section
        ref={journeySectionRef}
        className="w-full py-20 md:py-28 bg-[#FAF8F5] border-b border-[#E5E0D4] relative overflow-hidden select-none"
      >
        {/* Subtle Atmospheric Altitude Contours in Background */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-400/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -top-10 right-10 w-72 h-72 bg-amber-400/5 rounded-full blur-2xl pointer-events-none" />

        <div className="container-custom relative z-10">
          
          {/* Flight Corridor Dispatch Header */}
          <div className="max-w-4xl mb-12 text-center mx-auto">
            {/* Top Air Corridor Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#E0F2FE]/70 border border-[#0F8B8D]/30 text-[#0F8B8D] mb-4 shadow-xs"
            >
              <Plane className="w-4 h-4 text-[#0F8B8D]" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                Humanitarian Air Corridor · 35 Years of Flight Navigation (1991 - Present)
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-[#182321] tracking-tight leading-tight"
            >
              The 35-Year Flight Route of Human Dignity.
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.12 }}
              className="text-base sm:text-lg text-[#5B6B7C] mt-3 leading-relaxed max-w-2xl mx-auto"
            >
              From our initial takeoff in Kamachha in 1991 across deep rural Uttar Pradesh to international solidarity air-bridges in Paris, follow DISCC&apos;s flight navigation through three and a half decades.
            </motion.p>

            {/* Flight Dispatch Bar: Telemetry, Origin Runway & Interactive Navigation Controls */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.18 }}
              className="mt-8 p-4 sm:p-5 rounded-2xl border border-[#E5E0D4] bg-[#F6F2E9]/80 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 text-left w-full"
            >
              {/* Origin Takeoff Beacon */}
              <div className="flex items-center gap-3 sm:gap-3.5 w-full lg:w-auto">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-[#182321] text-[#0F8B8D] flex items-center justify-center font-black shadow-xs shrink-0">
                  <Plane className="w-5 h-5 sm:w-6 sm:h-6 text-[#0F8B8D] rotate-45" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-widest text-[#0F8B8D]">
                      DISCC AVIATION · CENTRAL RADAR 1991
                    </span>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" title="Airspace Clear" />
                    <span className="text-[10px] font-bold text-emerald-700 uppercase">Transponder Active</span>
                  </div>
                  <h4 className="text-sm sm:text-base font-heading font-extrabold text-[#182321]">
                    Varanasi Hub / Genesis Takeoff (Runway 1991)
                  </h4>
                </div>
              </div>

              {/* Active Flight Telemetry */}
              <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-[#182321] w-full lg:w-auto">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-50 border border-cyan-200 text-cyan-950 font-mono text-[11px] max-w-full">
                  <Radio className="w-3 h-3 text-[#0F8B8D] shrink-0 animate-pulse" />
                  <span className="truncate">
                    FLIGHT DISCC-35: {isScrolling ? "CRUISING EN ROUTE" : "LEVEL AT"} WAYPOINT {FLIGHT_WAYPOINTS[activeWaypoint].waypointNum} ({FLIGHT_WAYPOINTS[activeWaypoint].flightCode})
                  </span>
                </div>
                <span className="text-[11px] font-bold text-[#0F8B8D] hidden lg:inline-flex items-center gap-1">
                  <span>Scroll down to navigate corridor</span>
                  <span className="animate-bounce">↓</span>
                </span>
              </div>

              {/* Interactive Autopilot Controls */}
              <div className="flex flex-wrap items-center gap-2 sm:gap-2.5 w-full sm:w-auto">
                <button
                  onClick={() => setIsAutoPlaying((prev) => !prev)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#182321] text-white hover:bg-[#0F8B8D] transition-colors cursor-pointer shadow-xs"
                >
                  {isAutoPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAutoPlaying ? "Pause Flight" : "Autopilot Tour"}</span>
                </button>

                <button
                  onClick={handleRestartTour}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-bold border border-[#C8BFB3] bg-white text-[#182321] hover:bg-cyan-50 transition-colors cursor-pointer shadow-2xs"
                >
                  <RotateCcw className="w-3.5 h-3.5 text-[#0F8B8D]" />
                  <span>Takeoff 1991</span>
                </button>
              </div>
            </motion.div>

            {/* Jet Engine Boost Notification Banner */}
            <AnimatePresence>
              {engineBoostActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: -10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -10 }}
                  className="mt-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#0F8B8D] text-white font-bold text-xs shadow-md"
                >
                  <Plane className="w-4 h-4 text-cyan-200 rotate-45" />
                  <span>Turbines Engaged: Flight DISCC-35 climbing out of Kamachha Genesis Runway!</span>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Flight Radar Quick-Jump Waypoint Tape (Unboxed Aerodynamic Navigation) */}
            <div className="mt-8 pt-4 pb-2 relative overflow-x-auto no-scrollbar touch-pan-x">
              <div className="min-w-[640px] max-w-3xl mx-auto px-4 relative">
                {/* Continuous Dashed Contrail Vector Line */}
                <div className="absolute top-5 left-6 right-6 h-[2px] bg-gradient-to-r from-[#0F8B8D]/40 via-[#D97706]/40 to-[#0F8B8D]/40 border-b border-dashed border-[#0F8B8D]/60 pointer-events-none" />

                {/* Waypoints along the Flight Vector */}
                <div className="relative z-10 flex items-center justify-between">
                  {FLIGHT_WAYPOINTS.map((evt, idx) => {
                    const isActive = activeWaypoint === idx;
                    const isPassed = activeWaypoint > idx;

                    return (
                      <button
                        key={evt.year}
                        onClick={() => handleWaypointJump(idx)}
                        className="group flex flex-col items-center cursor-pointer transition-all duration-300 focus:outline-hidden"
                      >
                        {/* Waypoint Dial Badge */}
                        <div
                          className={`relative w-9 h-9 rounded-full flex items-center justify-center font-black text-xs transition-all duration-300 ${
                            isActive
                              ? "bg-[#0F8B8D] text-white ring-4 ring-cyan-300/70 scale-110 shadow-md"
                              : isPassed
                              ? "bg-emerald-700 text-white shadow-xs"
                              : "bg-[#EFE9DD] text-[#78716C] border border-[#D5CDBD] hover:bg-cyan-50"
                          }`}
                        >
                          {isActive ? (
                            <Plane className="w-4 h-4 rotate-45" />
                          ) : (
                            <span className="font-mono text-[11px]">{evt.waypointNum}</span>
                          )}
                        </div>

                        {/* Waypoint Code & Year */}
                        <div className="mt-2 text-center">
                          <span
                            className={`text-xs font-black block transition-colors ${
                              isActive
                                ? "text-[#0F8B8D] scale-105"
                                : isPassed
                                ? "text-emerald-800"
                                : "text-[#5B6B7C]"
                            }`}
                          >
                            {evt.flightCode}
                          </span>
                          <span className="text-[10px] font-semibold text-[#8B4500] hidden sm:block max-w-[90px] truncate">
                            {evt.year}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Unboxed Humanitarian Flight Waypoints Corridor */}
          <div className="relative max-w-5xl mx-auto pt-4">
            
            {FLIGHT_WAYPOINTS.map((evt, idx) => {
              const isEven = idx % 2 === 0;
              const isLast = idx === FLIGHT_WAYPOINTS.length - 1;
              const isActive = activeWaypoint === idx;

              return (
                <div
                  key={evt.year}
                  id={`waypoint-${idx}`}
                  className="relative scroll-mt-28 mb-12 sm:mb-16"
                >
                  {/* Waypoint Cardless Narrative Layout */}
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`relative py-6 sm:py-8 transition-all duration-500 ${
                      isActive ? "opacity-100" : "opacity-90 hover:opacity-100"
                    }`}
                  >
                    {/* Waypoint Telemetry Header */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 pb-4 mb-6 border-b border-[#E5E0D4] w-full">
                      {/* Waypoint Code & Name */}
                      <div className="flex items-center gap-3 sm:gap-4">
                        {/* Waypoint Beacon Symbol */}
                        <div
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-black text-sm shadow-xs transition-colors duration-500 shrink-0 ${
                            isActive
                              ? "bg-[#0F8B8D] text-white ring-4 ring-cyan-300/60"
                              : "bg-[#182321] text-cyan-400"
                          }`}
                        >
                          {isActive ? (
                            <Plane className="w-4 h-4 text-white rotate-45 animate-pulse" />
                          ) : (
                            <Navigation className="w-4 h-4 text-cyan-300" />
                          )}
                        </div>

                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#0F8B8D]">
                              WAYPOINT {evt.waypointNum} · {evt.flightCode}
                            </span>
                            <span
                              className={`w-2 h-2 rounded-full ${
                                isActive ? "bg-emerald-500 animate-ping" : "bg-cyan-500"
                              }`}
                            />
                            <span
                              className={`text-[10px] font-bold uppercase ${
                                isActive ? "text-emerald-700 font-black" : "text-[#78716C]"
                              }`}
                            >
                              {isActive ? "Aircraft En Route" : "Air Corridor Open"}
                            </span>
                          </div>
                          <h3 className="text-lg sm:text-xl font-heading font-black text-[#182321]">
                            {evt.waypoint} · <span className="font-serif text-[#78716C] font-normal text-base">{evt.hindi}</span>
                          </h3>
                        </div>
                      </div>

                      {/* Flight Metrics Plaque: Altitude & Sector Year */}
                      <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E0F2FE]/70 text-[#0F8B8D] text-xs font-bold border border-[#0F8B8D]/30">
                          <Wind className="w-3.5 h-3.5 text-[#0F8B8D]" />
                          <span>{evt.altitude}</span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider shadow-2xs transition-colors ${
                            isActive ? "bg-[#0F8B8D] text-white" : "bg-slate-900 text-white"
                          }`}
                        >
                          {evt.year}
                        </span>
                      </div>
                    </div>

                    {/* Waypoint Main Grid (Alternating 2-Column Unboxed Content) */}
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-center w-full">
                      
                      {/* Narrative Column */}
                      <div className={`w-full col-span-1 lg:col-span-7 space-y-3.5 ${isEven ? "order-1" : "lg:order-2"}`}>
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider bg-cyan-100/90 text-cyan-950 border border-cyan-300/50">
                          <Globe className="w-3 h-3 text-[#0F8B8D]" />
                          <span>{evt.tag}</span>
                        </div>
                        <h4 className="text-xl sm:text-2xl font-heading font-extrabold text-[#182321] leading-snug">
                          {evt.title}
                        </h4>
                        <p className="text-sm sm:text-base text-[#4A5D70] leading-relaxed">
                          {evt.narrative}
                        </p>
                        
                        {/* Next Air Vector Telemetry */}
                        <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#0F8B8D]">
                          <Plane className="w-3.5 h-3.5 text-[#0F8B8D] rotate-45" />
                          <span>Next Vector: {evt.nextVector}</span>
                        </div>

                        {/* Coordinates Footnote */}
                        <div className="text-[11px] font-mono text-[#78716C] pt-1">
                          COORDINATES: {evt.coordinates}
                        </div>
                      </div>

                      {/* Visual Column: Museum Archival Photo */}
                      <div className={`w-full col-span-1 lg:col-span-5 ${isEven ? "order-2" : "lg:order-1"}`}>
                        <div className="relative group">
                          {/* Archival Photograph Mount */}
                          <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden border-4 border-[#EDE6D8] shadow-md hover:shadow-xl transition-shadow duration-500 bg-[#E8E1D3]">
                            <Image
                              src={evt.image}
                              alt={evt.title}
                              fill
                              className="object-cover group-hover:scale-104 transition-transform duration-600"
                              sizes="(max-width: 1024px) 100vw, 40vw"
                            />
                            {/* Live Air Traffic Active Badge */}
                            {isActive && (
                              <div className="absolute top-3 left-3 bg-[#182321]/90 backdrop-blur-xs text-cyan-300 px-2.5 py-1 rounded-md text-[10.5px] font-black tracking-wide border border-cyan-400/30 shadow-sm flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                                <span>WAYPOINT ACTIVE</span>
                              </div>
                            )}
                          </div>
                          <p className="text-[11.5px] text-[#7A8B9E] font-medium mt-2 px-1 text-center italic">
                            {evt.caption}
                          </p>
                        </div>
                      </div>

                    </div>

                  </motion.div>

                  {/* Curvy Aerial Flight Vector Connecting to Next Waypoint with Jet Plane */}
                  {!isLast && (
                    <div className="w-full py-6 sm:py-8 overflow-hidden relative">
                      {/* Desktop S-Curved Flight Contrail Vector */}
                      <div className="hidden lg:block relative">
                        <svg
                          viewBox="0 0 1000 130"
                          fill="none"
                          className="w-full h-24 sm:h-28 my-[-4px] pointer-events-none"
                        >
                          <defs>
                            <linearGradient id={`contrail-grad-${idx}`} x1="0%" y1="0%" x2="100%" y2="100%">
                              <stop offset="0%" stopColor="#0F8B8D" stopOpacity="0.8" />
                              <stop offset="50%" stopColor="#06B6D4" stopOpacity="0.5" />
                              <stop offset="100%" stopColor="#0F8B8D" stopOpacity="0.8" />
                            </linearGradient>
                          </defs>

                          {/* S-Curved Aerial Vector Line */}
                          {isEven ? (
                            <>
                              {/* Wide Atmospheric Corridor */}
                              <path
                                d="M 280 0 C 280 65, 720 65, 720 130"
                                stroke="#E0F2FE"
                                strokeWidth="24"
                                strokeLinecap="round"
                              />
                              {/* Jet Engine Twin Contrails */}
                              <path
                                d="M 276 0 C 276 65, 716 65, 716 130"
                                stroke={`url(#contrail-grad-${idx})`}
                                strokeWidth="2"
                                strokeDasharray="6 6"
                              />
                              <path
                                d="M 284 0 C 284 65, 724 65, 724 130"
                                stroke={`url(#contrail-grad-${idx})`}
                                strokeWidth="2"
                                strokeDasharray="6 6"
                              />
                            </>
                          ) : (
                            <>
                              {/* Wide Atmospheric Corridor */}
                              <path
                                d="M 720 0 C 720 65, 280 65, 280 130"
                                stroke="#E0F2FE"
                                strokeWidth="24"
                                strokeLinecap="round"
                              />
                              {/* Jet Engine Twin Contrails */}
                              <path
                                d="M 724 0 C 724 65, 284 65, 284 130"
                                stroke={`url(#contrail-grad-${idx})`}
                                strokeWidth="2"
                                strokeDasharray="6 6"
                              />
                              <path
                                d="M 716 0 C 716 65, 276 65, 276 130"
                                stroke={`url(#contrail-grad-${idx})`}
                                strokeWidth="2"
                                strokeDasharray="6 6"
                              />
                            </>
                          )}
                        </svg>

                        {/* Aerodynamic Aircraft Banking along the Vector Corridor */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-xl z-20">
                          <AeroPlaneFlight
                            angle={isEven ? 48 : -48}
                            showContrail={true}
                          />
                        </div>
                      </div>

                      {/* Mobile Curvy Flight Vector with Aircraft */}
                      <div className="block lg:hidden relative">
                        <svg
                          viewBox="0 0 300 80"
                          fill="none"
                          className="w-full h-16 pointer-events-none"
                        >
                          <path
                            d="M 150 0 C 180 25, 120 55, 150 80"
                            stroke="#E0F2FE"
                            strokeWidth="16"
                            strokeLinecap="round"
                          />
                          <path
                            d="M 148 0 C 178 25, 118 55, 148 80"
                            stroke="#0F8B8D"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                          />
                          <path
                            d="M 152 0 C 182 25, 122 55, 152 80"
                            stroke="#0F8B8D"
                            strokeWidth="1.5"
                            strokeDasharray="4 4"
                          />
                        </svg>

                        {/* Aerodynamic Aircraft for Mobile */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none drop-shadow-md z-20">
                          <AeroPlaneFlight
                            angle={0}
                            showContrail={false}
                            className="scale-75"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}

          </div>

          {/* Final Approach & Central Hub Arrival Plaque */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mt-14 text-center max-w-xl mx-auto py-8 px-6 border-t-2 border-b-2 border-[#E5E0D4] bg-[#F6F2E9]/70"
          >
            <div className="w-12 h-12 rounded-2xl bg-[#182321] text-[#0F8B8D] flex items-center justify-center mx-auto mb-3 shadow-xs font-black">
              <Plane className="w-6 h-6 text-[#0F8B8D] rotate-45" />
            </div>
            <span className="text-[10px] font-black uppercase tracking-widest text-[#0F8B8D] block mb-1">
              FINAL APPROACH & HUB ARRIVAL · 1991 TO 2026
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900">
              35 Years in the Skies of Hope · Mission Everlasting.
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              From Dr. Tulsi&apos;s first clinical diagnosis in 1991 to over 12,000 special children, international medical air-bridges, and dedicated rural sanctuaries across Eastern UP, our humanitarian flight continues onward every single day.
            </p>
            <div className="mt-5 flex items-center justify-center gap-3">
              <button
                onClick={handleRestartTour}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-xs font-bold bg-[#182321] text-white hover:bg-[#0F8B8D] transition-colors cursor-pointer shadow-xs"
              >
                <RotateCcw className="w-3.5 h-3.5 text-cyan-300" />
                <span>Fly Route Again from 1991</span>
              </button>
            </div>
          </motion.div>

        </div>
      </section>

      {/* 3. Official Regulatory Certifications (Stamp Aesthetic - No Icon Cards) */}
      <section className="w-full py-16 bg-[#F6F4EE] border-b border-[#E5E0D4]">
        <div className="container-custom">
          
          <div className="mb-10 text-left">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-1">
              Statutory Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#182321]">
              Official Accreditations & Tax Status.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAMP_CERTIFICATIONS.map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="w-full col-span-1 p-5 rounded-[20px] bg-white border border-[#E5E0D4] shadow-xs hover:shadow-md hover:border-[#0F8B8D]/30 hover:-translate-y-0.5 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0F8B8D]/10 text-[#0F8B8D] text-xs font-bold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{cert.code}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#182321] leading-snug">
                    {cert.authority}
                  </h4>
                  <p className="text-xs text-[#5B6B7C] mt-1.5 leading-relaxed">
                    {cert.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EAE1] text-[11px] font-semibold text-[#7A8B9E]">
                  Verified & Active Compliance
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. The Family Wall (Organic Portrait Collage - Care-hands Elegance) */}
      <section className="w-full py-20 md:py-28 bg-white border-b border-[#E5E0D4]">
        <div className="container-custom">
          
          <div className="max-w-2xl mb-14 text-left">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
              Leadership & Patrons
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#182321]">
              The Guiding Pillars Behind DISCC.
            </h2>
            <p className="text-sm text-[#5B6B7C] mt-1.5">
              Clinicians, international patrons, and operations specialists devoted to the children of Varanasi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {FAMILY_TEAM.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className={`${member.span} group bg-[#FAF7F0] p-6 rounded-[25px] border border-[#E5E0D4] shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between`}
              >
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-[18px] overflow-hidden bg-[#EAE5D9] mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top transition-transform duration-600 group-hover:scale-103"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#0F8B8D]">
                    {member.credentials}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-[#182321] mt-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D97706] mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5B6B7C] leading-relaxed">
                    {member.note}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Direct Visit & Contact Action */}
      <section className="w-full py-16 bg-[#F6F4EE]">
        <div className="container-custom flex flex-col md:flex-row items-start md:items-center justify-between gap-6 p-6 sm:p-8 rounded-3xl bg-[#FFF3E0] border border-[#F5A524]/40 text-left">
          <div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-[#182321]">
              Visit Our Campuses in Kamachha and Bachhaon.
            </h3>
            <p className="text-xs sm:text-sm text-[#5B6B7C] mt-1">
              We welcome parents, clinicians, donors, and researchers for guided walkthroughs and consultations.
            </p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto shrink-0">
            <Link href="/contact" className="w-full sm:w-auto">
              <Button size="lg" className="w-full sm:w-auto bg-[#182321] hover:bg-[#0F8B8D] text-white font-bold rounded-full px-6 cursor-pointer">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
