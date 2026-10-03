"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Handshake, ArrowRight, ShieldCheck, ExternalLink, Sparkles } from "lucide-react";

export const PARTNERS_DATA = [
  {
    name: "The National Trust",
    category: "Government of India",
    desc: "Ministry of Social Justice and Empowerment statutory body for Autism, Cerebral Palsy, and Intellectual Disabilities.",
    logo: "/images/discc/partners/national-trust.jpg",
    badgeColor: "bg-emerald-50 text-emerald-800 border-emerald-200",
  },
  {
    name: "DEVA Europe",
    category: "International Solidarity",
    desc: "Franco-Swiss medical and humanitarian association supporting pediatric clinical care and therapeutic equipment.",
    logo: "/images/discc/partners/deva-europe.jpg",
    badgeColor: "bg-blue-50 text-blue-800 border-blue-200",
  },
  {
    name: "Kotak Mahindra Bank",
    category: "Corporate CSR Partner",
    desc: "Direct corporate funding for adaptive school learning kits, child nutrition, and mobile rural diagnostic outreach.",
    logo: "/images/discc/partners/kotak-bank.jpg",
    badgeColor: "bg-rose-50 text-rose-800 border-rose-200",
  },
  {
    name: "University of Wisconsin Oshkosh",
    category: "Academic & Research Exchange",
    desc: "Longstanding global research collaboration in clinical psychology, developmental diagnostics, and student exchange.",
    logo: "/images/discc/partners/oshkosh-university.jpg",
    badgeColor: "bg-amber-50 text-amber-800 border-amber-200",
  },
  {
    name: "Ashoka Changemakers",
    category: "Global Social Innovation",
    desc: "International network recognizing Dr. C. Tulsi Das as a pioneering social innovator in community rehabilitation.",
    logo: "/images/discc/partners/changemakers.jpg",
    badgeColor: "bg-purple-50 text-purple-800 border-purple-200",
  },
  {
    name: "ACCGP France",
    category: "Solidarity Foundation",
    desc: "Association Culturelle et Caritative Franco-Indienne supporting long-term rehabilitation and vocational sanctuaries.",
    logo: "/images/discc/partners/accgp.jpg",
    badgeColor: "bg-indigo-50 text-indigo-800 border-indigo-200",
  },
  {
    name: "NHPS & Health Partners",
    category: "Healthcare Collaboration",
    desc: "Rural mobile health camps, specialist doctor checkups, and diagnostic screenings across Eastern Uttar Pradesh.",
    logo: "/images/discc/partners/nhps.jpg",
    badgeColor: "bg-teal-50 text-teal-800 border-teal-200",
  },
  {
    name: "Annapurna Center Trust",
    category: "Women & Girls Welfare",
    desc: "Grassroots organization empowering rural adolescent girls through vocational handicraft and tailoring training.",
    logo: "/images/discc/partners/annapurna-center.jpg",
    badgeColor: "bg-orange-50 text-orange-800 border-orange-200",
  },
];

export function PartnerMarquee() {
  // Duplicate for smooth seamless loop
  const marqueeItems = [...PARTNERS_DATA, ...PARTNERS_DATA];

  return (
    <section className="w-full py-20 md:py-28 bg-[#F6F4EE] border-b border-[#E5E0D4] relative overflow-hidden select-none">
      <div className="container-custom relative z-10">
        {/* Section Header (Centered, Anti-Slop, Refined Transition) */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-14 mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center gap-3 mb-3.5">
            <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
            <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A5B32]">
              Institutional Collaborations
            </span>
            <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Trusted by National Ministries & Global Foundations.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-2.5 leading-relaxed max-w-2xl mx-auto">
            Collaborating with renowned government bodies, European medical societies, corporate CSR pioneers, and international universities since 1991.
          </p>
        </motion.div>
      </div>

      {/* Single Continuous Motion Row - Pure Logos & Company Name Niche (Zero Cards/Blocks) */}
      <div className="relative w-full overflow-hidden py-6 sm:py-8">
        {/* Left & Right Smooth Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-r from-[#F6F4EE] via-[#F6F4EE]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 sm:w-44 bg-gradient-to-l from-[#F6F4EE] via-[#F6F4EE]/80 to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex items-center">
          {marqueeItems.map((item, idx) => (
            <div
              key={`partner-${idx}`}
              className="flex flex-col items-center justify-center shrink-0 mx-8 sm:mx-12 md:mx-14 group cursor-default select-none text-center"
            >
              {/* Dominant Big Partner Logo (Transparent background via blend mode) */}
              <div className="relative w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 flex items-center justify-center p-2 group-hover:scale-108 transition-transform duration-300">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="(max-width: 640px) 120px, 160px"
                  className="object-contain mix-blend-multiply contrast-[1.08] brightness-[1.02] transition-all duration-300"
                />
              </div>

              {/* Partner Name Niche */}
              <p className="mt-3 text-xs sm:text-sm md:text-[15px] font-heading font-extrabold text-slate-800 tracking-tight leading-snug max-w-[180px] sm:max-w-[220px] group-hover:text-amber-800 transition-colors">
                {item.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Collaboration Callout Bar */}
      <div className="container-custom mt-14">
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E5E0D4] shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-400 text-slate-950 flex items-center justify-center shrink-0 shadow-sm font-black">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-heading font-black text-slate-900">
                Interested in CSR Partnership or Academic Research?
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                We provide certified 80G tax exemptions, quarterly audited impact reporting, and customized project governance.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3 w-full md:w-auto shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-102 cursor-pointer text-center"
            >
              <span>Initiate CSR Dialogue</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-stone-50 text-slate-800 font-bold text-xs sm:text-sm border border-stone-300 shadow-2xs transition-colors cursor-pointer text-center"
            >
              <span>Our Credentials</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
