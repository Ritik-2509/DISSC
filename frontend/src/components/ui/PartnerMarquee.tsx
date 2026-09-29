"use client";

import Image from "next/image";
import Link from "next/link";
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
    <section className="w-full py-20 md:py-28 bg-[#FFFFFF] border-b border-stone-200 relative overflow-hidden">
      {/* Background Soft Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[300px] bg-amber-400/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="max-w-3xl mb-14 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 border border-amber-300/80 text-xs font-bold uppercase tracking-wider mb-4">
            <Handshake className="w-3.5 h-3.5 text-amber-700" />
            <span>Institutional Collaborations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            Trusted by National Ministries, Global Foundations & CSR Leaders.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            Collaborating with renowned government bodies, European medical societies, corporate CSR pioneers, and international universities since 1991.
          </p>
        </div>
      </div>

      {/* 1. First Motion Row - Moving Left */}
      <div className="relative w-full overflow-hidden py-3">
        {/* Left & Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-left flex items-center gap-6">
          {marqueeItems.map((item, idx) => (
            <div
              key={`row1-${idx}`}
              className="w-[320px] sm:w-[360px] p-5 rounded-2xl bg-[#FAFAFA] border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-amber-400 hover:bg-white transition-all duration-300 flex items-center gap-4 shrink-0 group cursor-default"
            >
              {/* Partner Logo */}
              <div className="relative w-16 h-16 rounded-xl bg-white p-2 border border-stone-200 shrink-0 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>

              {/* Partner Info */}
              <div className="flex-1 min-w-0 text-left">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border mb-1.5 ${item.badgeColor}`}
                >
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-heading font-bold text-slate-900 leading-snug truncate group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Second Motion Row - Moving Right */}
      <div className="relative w-full overflow-hidden py-3 mt-3">
        {/* Left & Right Fade Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee-right flex items-center gap-6">
          {marqueeItems.reverse().map((item, idx) => (
            <div
              key={`row2-${idx}`}
              className="w-[320px] sm:w-[360px] p-5 rounded-2xl bg-[#FAFAFA] border border-stone-200/90 shadow-xs hover:shadow-lg hover:border-amber-400 hover:bg-white transition-all duration-300 flex items-center gap-4 shrink-0 group cursor-default"
            >
              {/* Partner Logo */}
              <div className="relative w-16 h-16 rounded-xl bg-white p-2 border border-stone-200 shrink-0 overflow-hidden shadow-2xs group-hover:scale-105 transition-transform">
                <Image
                  src={item.logo}
                  alt={item.name}
                  fill
                  sizes="64px"
                  className="object-contain"
                />
              </div>

              {/* Partner Info */}
              <div className="flex-1 min-w-0 text-left">
                <span
                  className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider border mb-1.5 ${item.badgeColor}`}
                >
                  {item.category}
                </span>
                <h4 className="text-sm sm:text-base font-heading font-bold text-slate-900 leading-snug truncate group-hover:text-amber-600 transition-colors">
                  {item.name}
                </h4>
                <p className="text-xs text-slate-500 leading-relaxed line-clamp-2 mt-1">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Corporate Collaboration Callout Bar */}
      <div className="container-custom mt-14">
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-[#F5EFE6] via-white to-[#F5EFE6] border border-stone-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6 text-left">
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

          <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-md transition-transform hover:scale-102 cursor-pointer"
            >
              <span>Initiate CSR Dialogue</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white hover:bg-stone-50 text-slate-800 font-bold text-xs sm:text-sm border border-stone-300 shadow-2xs transition-colors cursor-pointer"
            >
              <span>Our Credentials</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
