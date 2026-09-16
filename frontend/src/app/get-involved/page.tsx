import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Users, Globe2, GraduationCap, HandHeart, ArrowRight, CheckCircle2 } from "lucide-react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

export default function GetInvolvedPage() {
  const pathways = [
    {
      title: "Volunteer in Varanasi",
      category: "Grassroots Engagement",
      icon: HandHeart,
      description: "Support our special educators, assist with adaptive art and sports sessions at Deva Center, or participate in rural outreach at Deva Gram Bachhaon.",
      actionText: "Join as Volunteer",
      href: "/contact"
    },
    {
      title: "International Study Abroad",
      category: "Academic Exchange",
      icon: Globe2,
      description: "Under the coordination of Dr. Tulsi and the University of Wisconsin Oshkosh USA, international university students immerse in Indian public health, disability rehabilitation, and culture.",
      actionText: "Study Abroad Details",
      href: "/contact"
    },
    {
      title: "CSR & Institutional Partnerships",
      category: "Corporate Social Responsibility",
      icon: Users,
      description: "Partner with DISCC to fulfill corporate CSR mandates with high-impact, audit-ready compliance under Section 80G, 12A, and FCRA regulations in India.",
      actionText: "Partner with DISCC",
      href: "/contact"
    },
    {
      title: "Clinical & Psychology Fellowships",
      category: "Professional Training",
      icon: GraduationCap,
      description: "Internships and research fellowships for psychology, social work, and psychiatric nursing students seeking hands-on exposure to intellectual disability therapy.",
      actionText: "Apply for Fellowship",
      href: "/contact"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-24">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Collaborate With DISCC
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight leading-[1.05] max-w-5xl">
            Be a Catalyst for Human Dignity
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal pt-2 max-w-4xl">
            Whether you are a student, clinician, corporate partner, or volunteer, your hands and heart can expand our care in Varanasi.
          </p>
        </RevealStagger>

        {/* 4 Bento Pathways */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 border-t border-border/70 pt-16">
          {pathways.map((item, i) => {
            const Icon = item.icon;
            return (
              <RevealStagger key={item.title} delay={i * 0.08} className="p-8 rounded-3xl bg-card border border-border shadow-xs space-y-6 flex flex-col justify-between group hover:shadow-md transition-shadow">
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary block">{item.category}</span>
                  <h3 className="text-2xl font-display font-black text-secondary">{item.title}</h3>
                  <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
                <Link href={item.href} className="pt-2">
                  <Button className="rounded-full bg-secondary hover:bg-secondary/90 text-white font-bold text-xs uppercase tracking-wider px-6 h-12 flex items-center gap-2">
                    {item.actionText}
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </RevealStagger>
            );
          })}
        </div>

        {/* Global Connection Spotlight */}
        <div className="border-t border-border/70 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <RevealStagger className="lg:col-span-6 space-y-6">
              <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
                Global Exchange
              </span>
              <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary tracking-tight">
                Over 25 Years of International Academic Goodwill
              </h2>
              <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                Since 1998, DISCC has hosted hundreds of international scholars, volunteers, and clinical observers from Europe and North America, building enduring cultural and humanitarian solidarity.
              </p>

              <div className="space-y-3 text-sm text-foreground/85">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Annual Study Abroad Program with University of Wisconsin Oshkosh</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Long standing humanitarian bridge through Deva Europe (France)</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
                  <span>Full logistical and mentoring support for field researchers in Varanasi</span>
                </div>
              </div>
            </RevealStagger>

            <RevealStagger delay={0.15} className="lg:col-span-6">
              <div className="relative rounded-3xl overflow-hidden shadow-xl border-4 border-white aspect-[4/3]">
                <Image
                  src={CLOUDINARY_IMAGES.foundersMeet}
                  alt="International Partners and Founders Meeting"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent"></div>
                <div className="absolute bottom-5 left-6 right-6 text-white">
                  <p className="font-display font-bold text-lg">Dr. Tulsi & International Delegates</p>
                  <p className="text-xs text-white/80">Cross-cultural collaboration in disability management</p>
                </div>
              </div>
            </RevealStagger>
          </div>
        </div>

      </div>
    </div>
  );
}
