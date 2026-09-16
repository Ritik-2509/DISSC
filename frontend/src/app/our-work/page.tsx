import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BookOpen, Building2, Heart, HeartPulse, Sparkles, MapPin, ChevronRight, Phone } from "lucide-react";
import { db } from "@/lib/firebase-admin";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

async function getPrograms() {
  try {
    const snapshot = await db.collection("pages").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch {
    return [];
  }
}

export default async function OurWorkPage() {
  const backendPrograms = await getPrograms();

  const officialPrograms = [
    {
      id: "deva-center",
      title: "Deva Center, Varanasi",
      category: "Special Rehabilitation and Child Care",
      icon: Building2,
      image: CLOUDINARY_IMAGES.devaBuilding,
      badge: "Flagship Facility (Est. 1991)",
      content:
        "The first specialized institute established in Uttar Pradesh for the rehabilitation of individuals with intellectual disabilities, autism, cerebral palsy, and multiple developmental differences. Offering daily speech therapy, sensory integration, physical rehabilitation, cognitive training, and parental guidance under clinical psychologist supervision. Has treated and followed up over 12,000 children and families across UP, Bihar, and Nepal."
    },
    {
      id: "deva-gram",
      title: "Deva Gram (Bachhaon)",
      category: "Rural Inclusive Community & 21 Disabilities",
      icon: MapPin,
      image: CLOUDINARY_IMAGES.communityProgram,
      badge: "Rural Outreach",
      content:
        "Located in Bachhaon village (Varanasi), Deva Gram bridges clinical excellence and rural reality. It provides daycare, respite hostel care, pre-vocational and vocational workshops, economic empowerment, and holistic therapies including hydrotherapy, garden therapy, sensory training, and Special Olympics sports training for all 21 categories of disabilities recognized under Indian law."
    },
    {
      id: "annapurna-center",
      title: "Annapurna Center",
      category: "Empowering Rural Women & the Girl Child",
      icon: Heart,
      image: CLOUDINARY_IMAGES.heroChildren,
      badge: "Est. 1995",
      content:
        "Situated 13 km outside Varanasi city, Annapurna Center is DISCC's dedicated rural center established in 1995. Managed directly by educated village women, it shields young girls from exploitation, provides supplementary nutrition, health camps, hygiene education, and culturally tailored vocational handcraft training to foster economic self-reliance."
    },
    {
      id: "gangotri-school",
      title: "Gangotri Riverside Preparatory School",
      category: "Education for Migratory & Street Children",
      icon: BookOpen,
      image: CLOUDINARY_IMAGES.varanasiGhats,
      badge: "Assi Ghat & Nagwan (Est. 1999)",
      content:
        "Founded in 1999 under a tree near Assi Ghat and Nagwan, Gangotri provides value-based foundational education, hygiene habits, and confidence to children of migratory boatmen, rickshaw pullers, and daily laborers along the River Ganga. Top students are sponsored into mainstream formal schools with all tuition, uniforms, and books covered."
    },
    {
      id: "ambedkar-school",
      title: "Ambedkar Integrated School",
      category: "Rural Grassroots Village Education",
      icon: Sparkles,
      image: CLOUDINARY_IMAGES.education,
      badge: "Nakati Raghunathpur Village",
      content:
        "Established in response to community elders in Nakati Raghunathpur village (50 km from Varanasi), where children had zero formal schooling access. Operating with four trained local educators from the same community, the school provides foundational literacy, math, study materials, and nutritional support to over 70 village boys and girls."
    },
    {
      id: "navjeevan-clinic",
      title: "Navjeevan Clinic & Care",
      category: "Leprosy Relief & Dignity",
      icon: HeartPulse,
      image: CLOUDINARY_IMAGES.childrenTherapy,
      badge: "Dashashwamedh Ghat (Est. 2000)",
      content:
        "Navjeevan ('Giving a New Life') was founded in May 2000 near Dashashwamedh Ghat and Sankat Mochan Temple to serve one of society's most ostracized groups: individuals affected by leprosy. Every week, DISCC medical workers provide clinical wound bandaging, antiseptic dressing, essential medicines, and family counseling to 40-50 patients."
    },
    {
      id: "child-education-program",
      title: "Child Education Program (CEP)",
      category: "Scholarships & Mainstream Schooling",
      icon: BookOpen,
      image: CLOUDINARY_IMAGES.childrenActivity,
      badge: "Education Access",
      content:
        "The CEP identifies bright and economically vulnerable children from slums and marginalized settlements and ensures their uninterrupted education. DISCC covers school tuition fees, books, uniforms, shoes, and after-school remedial tutoring so no child is forced into child labor."
    },
    {
      id: "emergency-helpline",
      title: "Help Line & Crisis Intervention",
      category: "Immediate Medical & Assistive Aid",
      icon: HeartPulse,
      image: CLOUDINARY_IMAGES.pressCoverage,
      badge: "Emergency Service",
      content:
        "A grassroots emergency lifeline for families facing sudden medical crises or extreme poverty. DISCC provides emergency distribution of wheelchairs, hearing aids, orthotics, hospital referrals, and crisis psychological counseling to ensure vulnerable children are not abandoned or neglected."
    },
    {
      id: "changemakers-ventures",
      title: "Changemakers Inc & Dr. Tulsi's Ventures",
      category: "Trauma Meditation, Police Training & Systemic Reform",
      icon: Sparkles,
      image: CLOUDINARY_IMAGES.awardCeremony,
      badge: "UP Police & Corporate Impact",
      content:
        "Led by Dr. Tulsi Das, Changemakers Inc provides specialized mental health programs, including trauma relief through meditation for over 600 mothers of disabled children at Banaras Hindu University, stress management training for 500+ UP Police UP100 emergency personnel (Project SAAHAS), and nationwide advocacy through NIEPID and the National Trust."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-28">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Our Centers and Initiatives
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight leading-[1.05] max-w-5xl">
            Comprehensive Programs for Dignity and Growth
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal pt-2 max-w-4xl">
            From early sensory intervention to girl child nutrition and rural outreach, DISCC operates 9 dedicated initiatives across Varanasi.
          </p>
        </RevealStagger>

        {/* Programs List */}
        <div className="space-y-28 border-t border-border/70 pt-16">
          {officialPrograms.map((program, i) => {
            const Icon = program.icon;
            const isReversed = i % 2 !== 0;

            return (
              <div key={program.id} className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center">
                {/* Visual Column */}
                <RevealStagger className={`md:col-span-6 ${isReversed ? 'md:order-2' : ''}`}>
                  <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white group">
                    <Image
                      src={program.image}
                      alt={program.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-4 left-4 bg-secondary/90 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full backdrop-blur-sm">
                      {program.badge}
                    </div>
                  </div>
                </RevealStagger>

                {/* Content Column */}
                <RevealStagger delay={0.1} className={`md:col-span-6 space-y-6 ${isReversed ? 'md:order-1' : ''}`}>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                      <Icon className="w-4 h-4" />
                      <span>{program.category}</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-display font-black text-secondary tracking-tight">
                      {program.title}
                    </h2>
                  </div>

                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                    {program.content}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <Link href="/contact">
                      <Button className="h-12 px-6 rounded-full font-bold uppercase text-xs tracking-wider bg-secondary hover:bg-secondary/90 text-white">
                        Connect with Center <ChevronRight className="ml-1.5 w-4 h-4" />
                      </Button>
                    </Link>
                    <Link href="/donate">
                      <Button variant="outline" className="h-12 px-6 rounded-full font-bold uppercase text-xs tracking-wider border-border hover:border-primary text-secondary hover:text-primary">
                        Sponsor this Program
                      </Button>
                    </Link>
                  </div>
                </RevealStagger>
              </div>
            );
          })}
        </div>

        {/* Helpline Callout Banner */}
        <div className="bg-secondary rounded-3xl p-8 md:p-12 text-white border border-border">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-accent">Direct Contact</span>
              <h3 className="font-display font-black text-2xl md:text-3xl">
                Have Questions About Admissions or Volunteering?
              </h3>
              <p className="text-white/80 text-sm md:text-base">
                Call our Varanasi office directly or write to disccindia@gmail.com.
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <a href="tel:+917007453168">
                <Button size="lg" className="h-14 px-8 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider shadow-lg flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Call: +91 7007453168
                </Button>
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
