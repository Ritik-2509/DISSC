import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Award, Users, Heart, Building2, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

export default function ImpactPage() {
  const verifiedStats = [
    {
      number: "32+",
      label: "Years of Dedicated Service",
      detail: "Founded in Varanasi in 1991 as an NGO dedicated to disability welfare and mental health.",
      icon: ShieldCheck,
    },
    {
      number: "98,000+",
      label: "Families Supported",
      detail: "Providing clinical therapy, psychiatric consultation, and emotional guidance across UP.",
      icon: Users,
    },
    {
      number: "235+",
      label: "Recognitions and Honors",
      detail: "Including honors from the Prime Minister of India and Chief Minister of Uttar Pradesh.",
      icon: Award,
    },
    {
      number: "9",
      label: "Operational Centers",
      detail: "Comprehensive urban and rural institutions providing continuous rehabilitation and education.",
      icon: Building2,
    },
  ];

  const milestones = [
    {
      year: "1991",
      title: "Establishment of DISCC & Deva Center",
      description: "Dr. C. Tulsi Das founded DISCC in Varanasi and opened the first institute for rehabilitation of mentally challenged individuals in Uttar Pradesh."
    },
    {
      year: "1998",
      title: "Deva Europe International Alliance",
      description: "Initiated long term humanitarian and academic collaboration with French art historian Jean-Max Tassel, expanding global support."
    },
    {
      year: "1999",
      title: "Gangotri Bridge Education Program",
      description: "Began informal classes beneath a tree along the holy Ganga, integrating hundreds of marginalized children into regular schools."
    },
    {
      year: "2010",
      title: "Deva Gram Bachhaon Expansion",
      description: "Inaugurated dedicated rural center in Bachhaon village to extend specialized therapies to agricultural communities."
    },
    {
      year: "2018",
      title: "Chief Minister Best Professional Award",
      description: "Dr. Tulsi received the prestigious Best Professional Psychologist Award from the Chief Minister of Uttar Pradesh."
    },
    {
      year: "Present",
      title: "Purple Fair & Modern Specialized Units",
      description: "Annual multi-disciplinary Divyangjan festivals, study abroad programs with University of Wisconsin Oshkosh, and life-skills training."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-28">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Verified Impact
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight leading-[1.05] max-w-5xl">
            Transforming Lives Across Generations
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal pt-2 max-w-4xl">
            Tangible outcomes from 32 years of clinical dedication, grassroots intervention, and institutional development in Varanasi.
          </p>
        </RevealStagger>

        {/* Big Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-border/70 pt-16">
          {verifiedStats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <RevealStagger key={stat.label} delay={i * 0.08} className="p-8 rounded-3xl bg-card border border-border shadow-xs space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-display font-black text-secondary tracking-tight">
                    {stat.number}
                  </h2>
                  <p className="text-sm font-bold uppercase tracking-wider text-primary">
                    {stat.label}
                  </p>
                </div>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {stat.detail}
                </p>
              </RevealStagger>
            );
          })}
        </div>

        {/* National Recognition Section */}
        <div className="border-t border-border/70 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <RevealStagger className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
                National Acclaim
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary tracking-tight">
                Honored at the Highest Levels of Governance
              </h2>
              <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                The humanitarian initiatives of DISCC have received official accolades from the Prime Minister of India and the Government of Uttar Pradesh for exemplary service to individuals with mental health and intellectual challenges.
              </p>
              
              <div className="space-y-3 pt-2">
                <div className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Best Professional Psychologist Award conferred by Chief Minister of Uttar Pradesh</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>Official Council Member of NIEPID (Divyangjan) under Government of India</span>
                </div>
                <div className="flex items-start gap-3 text-sm text-foreground/80">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>ARUNIM Board Member, National Trust, Ministry of Social Justice and Empowerment</span>
                </div>
              </div>
            </RevealStagger>

            <RevealStagger delay={0.15} className="lg:col-span-6 space-y-4">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[16/9]">
                <Image
                  src={CLOUDINARY_IMAGES.roleModelAward}
                  alt="DISCC Role Model Award Recognition"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-border aspect-[4/3]">
                  <Image
                    src={CLOUDINARY_IMAGES.awardCeremony}
                    alt="Award Ceremony Honor"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="relative rounded-2xl overflow-hidden shadow-md border-2 border-border aspect-[4/3]">
                  <Image
                    src={CLOUDINARY_IMAGES.pressCoverage}
                    alt="Media Coverage and Acclaim"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </RevealStagger>
          </div>
        </div>

        {/* Chronological Milestones */}
        <div className="border-t border-border/70 pt-16 space-y-12">
          <RevealStagger className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
              Key Chronology
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary tracking-tight">
              Three Decades of Continuous Evolution
            </h2>
          </RevealStagger>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {milestones.map((m, i) => (
              <RevealStagger key={m.year} delay={i * 0.08} className="p-6 rounded-3xl bg-muted/40 border border-border/80 space-y-3">
                <span className="text-xs font-black px-3 py-1 rounded-full bg-secondary text-white inline-block">
                  {m.year}
                </span>
                <h3 className="font-display font-bold text-lg text-secondary">{m.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
              </RevealStagger>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="bg-secondary rounded-3xl p-8 md:p-14 text-white flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-accent">Be Part of the Impact</span>
            <h3 className="text-3xl sm:text-4xl font-display font-black">
              Help Us Expand Our Care to More Families
            </h3>
            <p className="text-white/80 text-sm md:text-base">
              Every donation helps fund daily therapy sessions, special education materials, nutritious meals, and assistive equipment.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <Link href="/donate">
              <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2">
                <Heart className="w-4 h-4 fill-white" />
                Make a Contribution
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="h-14 px-8 rounded-full bg-white hover:bg-accent text-secondary hover:text-secondary font-black text-xs uppercase tracking-wider shadow-lg border-2 border-white transition-all">
                Visit Varanasi Center <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
