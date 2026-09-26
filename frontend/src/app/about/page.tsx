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
  ArrowRight,
  MapPin,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandUnderline, HandCircle } from "@/components/ui/HandDrawn";

const TIMELINE_EVENTS = [
  {
    year: "1991",
    title: "Foundation of Deva Center at Kamachha",
    narrative: "Dr. C. Tulsi Das founded DEVA International Society for Child Care (DISCC) in Kamachha, Varanasi, opening Eastern Uttar Pradesh's first specialized clinical diagnostic and rehabilitation center for intellectual disabilities.",
    tag: "Genesis",
    image: "/images/discc/dr-tulsi-clinic.png",
    caption: "Early clinical diagnostic sessions in Kamachha, 1991"
  },
  {
    year: "1995",
    title: "Annapurna Center for Rural Girls",
    narrative: "Expanded into rural Varanasi to shield impoverished young girls from malnutrition and lack of schooling, creating a secure community center managed by empowered local women.",
    tag: "Rural Outreach",
    image: "/images/discc/hero-children.png",
    caption: "Annapurna Center vocational workshop"
  },
  {
    year: "1998",
    title: "Indo-European Alliance with Jean-Max Tassel",
    narrative: "Established an enduring international solidarity partnership with French art historian Jean-Max Tassel, connecting European pediatric specialists and donor networks to Varanasi.",
    tag: "Global Solidarity",
    image: "/images/discc/founders-meet.jpg",
    caption: "Dr. Tulsi Das with Jean-Max Tassel and international patrons"
  },
  {
    year: "2010",
    title: "Deva Gram 21-Disability Rural Sanctuary",
    narrative: "Inaugurated an expansive rural rehabilitation campus in Bachhaon village equipped with hydrotherapy, sensory stimulation nature paths, and caregiver respite lodging.",
    tag: "Campus Expansion",
    image: "/images/discc/community-program.png",
    caption: "Deva Gram open-air hydrotherapy and community grounds"
  },
  {
    year: "2019",
    title: "State Award from UP CM Yogi Adityanath",
    narrative: "Hon'ble Chief Minister of Uttar Pradesh Yogi Adityanath conferred the Best Professional Psychologist State Award to Dr. Tulsi Das for three decades of extraordinary humanitarian service.",
    tag: "State Honor",
    image: "/images/discc/award-ceremony.png",
    caption: "State Felicitation Ceremony in Lucknow"
  },
  {
    year: "Today",
    title: "35 Years of Dignity & 12,000+ Families",
    narrative: "Operating across both clinical and rural campuses with full FCRA registration, 80G tax exemption, and specialized pediatric therapeutic equipment.",
    tag: "Living Legacy",
    image: "/images/discc/children-activity.png",
    caption: "Modern interactive classroom at Deva Center"
  }
];

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
    span: "lg:col-span-5"
  },
  {
    name: "Jean-Max Tassel",
    role: "Chief International Patron",
    credentials: "Art Historian & Philanthropist (France)",
    note: "Co-founder of Deva Europe, establishing 25+ years of European medical cooperation.",
    image: "/images/discc/founders-meet.jpg",
    span: "lg:col-span-4"
  },
  {
    name: "Er. Raaj Deva",
    role: "Director of Infrastructure & Strategy",
    credentials: "B.Tech (Systems & Operations)",
    note: "Overseeing rural campus expansion, digital accessibility, and clinical compliance.",
    image: "/images/discc/deva-building.jpg",
    span: "lg:col-span-3"
  }
];

export default function AboutPage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#FAF7F0] text-[#1A2530]">
      
      {/* 1. Founder & Archival Hero */}
      <section className="w-full pt-28 pb-16 md:pt-36 md:pb-24 border-b border-[#E8DFD3] relative overflow-hidden bg-[#FAF7F0]">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Headline & Founder Philosophy */}
            <div className="lg:col-span-6 flex flex-col text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FFF3E0] border border-[#F5A524]/40 text-[#8B4500] w-fit mb-5 shadow-xs">
                <ShieldCheck className="w-4 h-4 text-[#D97706]" />
                <span className="text-xs font-bold uppercase tracking-wider">
                  Est. 1991 in Varanasi · 35 Years of Care
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] leading-[1.15] mb-4">
                A Lifetime Dedicated to the Dignity of Special Children.
              </h1>

              <div className="mb-4">
                <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
              </div>

              <p className="text-base sm:text-lg text-[#3E5062] font-medium leading-relaxed mb-6">
                Founded by clinical psychologist Dr. C. Tulsi Das, DISCC emerged from an urgent need in Eastern Uttar Pradesh: replacing societal neglect with rigorous clinical science and unconditional love.
              </p>

              <div className="p-5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs mb-6">
                <p className="text-sm font-serif italic text-[#1A2530] leading-relaxed">
                  &ldquo;When a child with special needs is given early clinical assessment, sensory regulation, and patient guidance, they discover their inherent human dignity. We do not look at disabilities as limits; we build the bridges to life.&rdquo;
                </p>
                <div className="mt-3 flex items-center justify-between text-xs text-[#5B6B7C]">
                  <span className="font-bold text-[#1A2530]">Dr. C. Tulsi Das</span>
                  <span className="font-semibold text-[#0F8B8D]">Ph.D. Clinical Psychology</span>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <Link href="/contact">
                  <Button size="lg" className="bg-[#0F8B8D] hover:bg-[#0D7A7C] text-white font-bold rounded-full px-7 shadow-xs cursor-pointer">
                    Connect with Dr. Tulsi
                  </Button>
                </Link>
                <Link href="/donate">
                  <Button variant="outline" size="lg" className="border-[#C8BFB3] text-[#1A2530] font-bold rounded-full px-6 cursor-pointer">
                    Support Our Work
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Uncropped Award Felicitation Photo */}
            <div className="lg:col-span-6">
              <div className="relative bg-white p-3.5 sm:p-4 rounded-3xl border border-[#E8DFD3] shadow-md">
                <div className="relative w-full aspect-[16/11] rounded-2xl overflow-hidden bg-[#F2ECE1]">
                  <Image
                    src="/images/discc/award-ceremony.png"
                    alt="Dr. Tulsi receiving State Award from UP CM Yogi Adityanath"
                    fill
                    priority
                    className="object-contain sm:object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-[#1A2530] shadow-xs border border-[#E8DFD3]">
                    State Award 2019
                  </div>
                </div>

                <div className="p-3">
                  <h2 className="text-sm sm:text-base font-bold text-[#1A2530]">
                    Best Professional Psychologist State Award
                  </h2>
                  <p className="text-xs text-[#5B6B7C] mt-1">
                    Conferred by Hon&apos;ble UP Chief Minister Yogi Adityanath celebrating Dr. Tulsi&apos;s pioneering rehabilitation work for intellectual disabilities across Eastern UP.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 2. Hand-Drawn Animated Scroll Timeline (1991 -> Today) */}
      <section className="w-full py-20 md:py-28 bg-[#FFFDF9] border-b border-[#E8DFD3] relative">
        <div className="container-custom">
          
          <div className="max-w-2xl mb-16 text-left">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-2">
              Historical Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A2530]">
              The 35-Year Timeline of Grassroots Impact.
            </h2>
            <p className="text-sm sm:text-base text-[#5B6B7C] mt-2">
              From an open-air riverfront clinic in 1991 to Eastern UP&apos;s leading pediatric neuro-rehabilitation sanctuaries.
            </p>
          </div>

          {/* Vertical Editorial Timeline Stream */}
          <div className="relative border-l-2 border-[#D97706]/40 ml-4 sm:ml-8 space-y-16 pl-6 sm:pl-10">
            {TIMELINE_EVENTS.map((evt, idx) => (
              <div key={evt.year} className="relative group">
                
                {/* Hand-drawn bullet marker */}
                <div className="absolute -left-[35px] sm:-left-[51px] top-1.5 w-6 h-6 rounded-full bg-[#FAF7F0] border-2 border-[#D97706] flex items-center justify-center text-[10px] font-bold text-[#D97706] shadow-xs">
                  <span className="w-2 h-2 rounded-full bg-[#D97706]" />
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Text & Narrative */}
                  <div className="lg:col-span-7 space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl sm:text-3xl font-heading font-extrabold text-[#D97706]">
                        {evt.year}
                      </span>
                      <span className="px-2.5 py-0.5 rounded-full bg-[#FFF3E0] text-[#8B4500] text-xs font-bold">
                        {evt.tag}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-[#1A2530] font-heading">
                      {evt.title}
                    </h3>

                    <p className="text-sm sm:text-base text-[#4A5D70] leading-relaxed pt-1">
                      {evt.narrative}
                    </p>
                  </div>

                  {/* Archival Photograph */}
                  <div className="lg:col-span-5">
                    <div className="bg-white p-2.5 rounded-2xl border border-[#E8DFD3] shadow-xs">
                      <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#F2ECE1]">
                        <Image
                          src={evt.image}
                          alt={evt.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 1024px) 100vw, 35vw"
                        />
                      </div>
                      <p className="text-[11.5px] text-[#7A8B9E] font-medium mt-2 px-1">
                        {evt.caption}
                      </p>
                    </div>
                  </div>

                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 3. Official Regulatory Certifications (Stamp Aesthetic - No Icon Cards) */}
      <section className="w-full py-16 bg-[#FAF7F0] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="mb-10 text-left">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-1">
              Statutory Governance
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A2530]">
              Official Accreditations & Tax Status.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {STAMP_CERTIFICATIONS.map((cert, i) => (
              <div
                key={i}
                className="p-5 rounded-2xl bg-white border border-[#E8DFD3] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#0F8B8D]/10 text-[#0F8B8D] text-xs font-bold mb-2">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{cert.code}</span>
                  </div>
                  <h4 className="text-sm font-bold text-[#1A2530] leading-snug">
                    {cert.authority}
                  </h4>
                  <p className="text-xs text-[#5B6B7C] mt-1.5 leading-relaxed">
                    {cert.detail}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#F0EAE1] text-[11px] font-semibold text-[#7A8B9E]">
                  Verified & Active Compliance
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. The Family Wall (Organic Portrait Collage) */}
      <section className="w-full py-20 md:py-28 bg-[#FFFDF9] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="max-w-2xl mb-14 text-left">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
              Leadership & Patrons
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A2530]">
              The Guiding Pillars Behind DISCC.
            </h2>
            <p className="text-sm text-[#5B6B7C] mt-1.5">
              Clinicians, international patrons, and operations specialists devoted to the children of Varanasi.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            {FAMILY_TEAM.map((member, i) => (
              <div
                key={i}
                className={`${member.span} bg-white p-5 rounded-3xl border border-[#E8DFD3] shadow-xs flex flex-col justify-between`}
              >
                <div>
                  <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F2ECE1] mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover object-top"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                  </div>
                  <span className="text-xs font-bold text-[#0F8B8D]">
                    {member.credentials}
                  </span>
                  <h3 className="text-xl font-heading font-bold text-[#1A2530] mt-0.5">
                    {member.name}
                  </h3>
                  <p className="text-xs font-semibold text-[#D97706] mb-2">
                    {member.role}
                  </p>
                  <p className="text-xs sm:text-sm text-[#5B6B7C] leading-relaxed">
                    {member.note}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 5. Direct Visit & Contact Action */}
      <section className="w-full py-16 bg-[#FAF7F0]">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-[#FFF3E0] border border-[#F5A524]/40 text-left">
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#1A2530]">
              Visit Our Campuses in Kamachha and Bachhaon.
            </h3>
            <p className="text-sm text-[#5B6B7C] mt-1">
              We welcome parents, clinicians, donors, and researchers for guided walkthroughs and consultations.
            </p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <Link href="/contact">
              <Button size="lg" className="bg-[#1A2530] hover:bg-[#0F8B8D] text-white font-bold rounded-full px-6 cursor-pointer">
                Schedule a Visit
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
