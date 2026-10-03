import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight, ArrowLeft, Heart, CheckCircle2, ShieldCheck, MapPin } from "lucide-react";
import { ALL_PROGRAMS_DATA, getProgramBySlug } from "@/lib/programsData";
import { Metadata } from "next";

interface ProgramPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return ALL_PROGRAMS_DATA.map((p) => ({
    slug: p.slug
  }));
}

export async function generateMetadata({ params }: ProgramPageProps): Promise<Metadata> {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    return { title: "Program Not Found | DISCC Varanasi" };
  }

  return {
    title: `${program.title} | DISCC Varanasi`,
    description: program.shortDescription
  };
}

export default async function ProgramDetailPage({ params }: ProgramPageProps) {
  const { slug } = await params;
  const program = getProgramBySlug(slug);

  if (!program) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-white text-slate-900">
      {/* 1. Full-Bleed Hero Section (Matching Screenshot 2) */}
      <section className="relative w-full h-[75vh] sm:h-[82vh] min-h-[540px] flex flex-col justify-end overflow-hidden bg-slate-950">
        {/* Background Event Photo */}
        <Image
          src={program.coverImage}
          alt={program.title}
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center"
        />

        {/* Cinematic Vignette Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/45 to-black/20" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/40" />

        {/* Back Link at top left */}
        <div className="absolute top-24 sm:top-28 left-4 sm:left-8 z-20">
          <Link
            href="/#programs"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/40 hover:bg-black/60 backdrop-blur-md text-white text-xs sm:text-sm font-semibold transition-colors border border-white/20"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>All Programs</span>
          </Link>
        </div>

        {/* Hero Bottom Content Bar */}
        <div className="container-custom relative z-10 pb-10 sm:pb-16 pt-28 sm:pt-32">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 sm:gap-8">
            {/* Left: Program Title & Short Summary */}
            <div className="max-w-2xl text-left">
              <span className="inline-block text-[11px] sm:text-xs font-black tracking-widest text-amber-400 uppercase mb-2 sm:mb-3">
                {program.categoryEyebrow}
              </span>
              <h1 className="text-2xl xs:text-3xl sm:text-5xl lg:text-6xl font-heading font-black text-white tracking-tight leading-tight mb-3 sm:mb-4 drop-shadow-sm">
                {program.title}
              </h1>
              <p className="text-sm sm:text-lg text-stone-200 leading-relaxed font-normal">
                {program.shortDescription}
              </p>
            </div>

            {/* Right: Stat Metric & Donate Now Button */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 sm:gap-4 shrink-0 w-full sm:w-auto">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-extrabold uppercase tracking-wider text-stone-300">
                <ArrowUpRight className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{program.statMetric}</span>
              </div>
              <Link href="/donate" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto bg-[#8A482A] hover:bg-[#A05330] text-white px-7 sm:px-8 py-3 sm:py-3.5 rounded-lg text-sm sm:text-base font-bold shadow-xl transition-all hover:scale-102 cursor-pointer flex items-center justify-center gap-2">
                  <Heart className="w-4 h-4 text-amber-300 fill-amber-300" />
                  <span>Donate Now</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editorial Narrative Section (Matching Screenshot 3) */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-stone-200">
        <div className="container-custom">
          <div className="max-w-4xl text-left">
            {/* Eyebrow */}
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#B85D36] block mb-3">
              {program.categoryEyebrow}
            </span>

            {/* Editorial Headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight mb-4">
              {program.editorialHeadline}
            </h2>

            {/* Subhead */}
            <p className="text-lg sm:text-xl font-medium text-slate-700 leading-snug mb-8">
              {program.editorialSubhead}
            </p>

            {/* Body Copy */}
            <div className="space-y-6 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              {program.editorialParagraphs.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>

          {/* Featured Large High-Res Picture */}
          <div className="relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl mt-12 sm:mt-16 bg-stone-100 border border-stone-200">
            <Image
              src={program.featuredImage}
              alt={program.editorialHeadline}
              fill
              quality={100}
              sizes="(max-width: 1200px) 100vw, 1200px"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* 3. Numbered Pillars & Center Feature Section (Matching Screenshot 4) */}
      <section className="w-full py-16 sm:py-24 bg-[#FAFAFA] border-b border-stone-200">
        <div className="container-custom">
          {/* Top Highlight Quote with Colored Border */}
          <div className="max-w-4xl mb-16 text-left">
            <div className="border-l-4 border-[#B85D36] pl-6 mb-6">
              <p className="text-xl sm:text-2xl font-bold text-[#B85D36] leading-snug">
                {program.pullQuote}
              </p>
            </div>
            <p className="text-base sm:text-lg text-slate-600 pl-6 leading-relaxed max-w-3xl">
              {program.pullQuoteSub}
            </p>
          </div>

          {/* Pillars Layout with Center Image */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Pillars (Column 1 and 2) */}
            <div className="lg:col-span-4 space-y-10 text-left">
              {program.pillars.slice(0, 2).map((pillar) => (
                <div key={pillar.number} className="relative pl-2">
                  {/* Subtle Background Number Watermark */}
                  <span className="text-6xl sm:text-7xl font-black text-stone-200/80 absolute -top-5 -left-3 select-none -z-10 leading-none">
                    {pillar.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 leading-tight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Center Image */}
            <div className="lg:col-span-4">
              <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-xl bg-stone-200 border border-stone-300/80">
                <Image
                  src={program.centerImage}
                  alt={program.title}
                  fill
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 33vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* Right Pillar (Column 3) */}
            <div className="lg:col-span-4 space-y-10 text-left">
              {program.pillars.slice(2, 3).map((pillar) => (
                <div key={pillar.number} className="relative pl-2">
                  <span className="text-6xl sm:text-7xl font-black text-stone-200/80 absolute -top-5 -left-3 select-none -z-10 leading-none">
                    {pillar.number}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-heading font-black text-slate-900 leading-tight mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                    {pillar.description}
                  </p>
                </div>
              ))}

              {/* Trust Badge Card */}
              <div className="p-6 rounded-2xl bg-white border border-stone-200 shadow-sm">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-700 mb-2">
                  <ShieldCheck className="w-4 h-4 text-amber-600" />
                  <span>Verified 80G & 12A Certified</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  Every rupee contributed to this program goes directly into beneficiary rehabilitation, therapeutic gear, and nutritious meals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Event Photos & Documentary Archive */}
      <section className="w-full py-16 sm:py-24 bg-white border-b border-stone-200">
        <div className="container-custom">
          <div className="max-w-3xl mb-12 text-left">
            <span className="text-xs sm:text-sm font-black uppercase tracking-widest text-[#B85D36] block mb-2">
              FIELD ARCHIVE
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight leading-tight">
              Documentary Records & Event Photos
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
              Unfiltered, ground-level photographs chronicling the daily activities, therapeutic milestones, and celebrations of this initiative.
            </p>
          </div>

          {/* Photo Gallery Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {program.gallery.map((item, idx) => (
              <div
                key={idx}
                className="group flex flex-col rounded-2xl overflow-hidden bg-stone-50 border border-stone-200 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="relative w-full aspect-[4/3] overflow-hidden bg-stone-200">
                  <Image
                    src={item.src}
                    alt={item.caption}
                    fill
                    quality={90}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-left">
                  <p className="text-xs sm:text-sm text-slate-700 font-medium leading-snug">
                    {item.caption}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Support CTA Banner - Seamless Color Match with Footer */}
      <section className="w-full py-16 sm:py-20 bg-[#182321] text-[#F6F4EE] border-t border-[#2A3835]">
        <div className="container-custom text-center max-w-3xl">
          <h2 className="text-3xl sm:text-4xl font-heading font-black tracking-tight leading-tight mb-4 text-white">
            Support the {program.title}
          </h2>
          <p className="text-base sm:text-lg text-[#C8D1CE] leading-relaxed mb-8">
            Your recurring or one-time contribution funds specialized clinical therapies, assistive learning kits, and hot meals for children in Varanasi.
          </p>
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
            <Link href="/donate" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-[#F5A524] hover:bg-[#E09418] text-[#182321] font-bold px-7 sm:px-8 py-3.5 rounded-full shadow-lg transition-transform hover:scale-102 cursor-pointer flex items-center justify-center gap-2 text-sm sm:text-base">
                <Heart className="w-4 h-4 text-[#182321] fill-current" />
                <span>Make a Donation</span>
              </button>
            </Link>
            <Link href="/#programs" className="w-full sm:w-auto">
              <button className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white font-bold px-6 sm:px-7 py-3.5 rounded-full border border-white/20 shadow-xs transition-colors cursor-pointer text-sm sm:text-base flex items-center justify-center">
                <span>View Other Programs</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
