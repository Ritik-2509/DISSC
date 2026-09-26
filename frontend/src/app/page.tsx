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
  CheckCircle2,
  Phone,
  BookOpen,
  Activity,
  Smile,
  Quote,
  Send,
  Lock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { EditorialHero } from "@/components/ui/EditorialHero";
import { HandUnderline, HandCircle, HandDrawnBadge } from "@/components/ui/HandDrawn";
import { ProgramDetailModal, ProgramItem } from "@/components/ui/ProgramDetailModal";

const KEY_PROGRAMMES: ProgramItem[] = [
  {
    id: "deva-center",
    title: "Deva Center (Kamachha)",
    subtitle: "Eastern UP's First Clinical Rehabilitation Institute for Intellectual Disabilities",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "border-[#0F8B8D]/30",
    sdgName: "Clinical Excellence · Est. 1991",
    targetGroup: "Children with Intellectual Disabilities & Autism",
    image: "/images/discc/dr-tulsi-clinic.png",
    badge: "Flagship Clinical Campus",
    year: "1991 - Present",
    location: "Kamachha Chungi, Varanasi",
    summary: "Comprehensive psychological diagnostics, sensory integration therapy, speech therapy, and individualized education plans (IEPs) designed by clinical psychologists.",
    fullDetails: {
      overview: "Established by Dr. C. Tulsi Das in 1991, Deva Center was born out of a critical vacuum in Eastern Uttar Pradesh. When no scientific care was available for intellectual disabilities, Deva Center pioneered diagnostic psychological assessments, pediatric neuro-rehabilitation, and family counseling.",
      impactNumbers: "12,000+ Children & Families Supported",
      highlights: [
        "Specialized sensory integration room for sensory regulation",
        "Clinical speech therapy and language acquisition clinics",
        "Customized Individualized Education Plans (IEPs) for special learners",
        "Daily nutritious meal support and regular pediatric health tracking"
      ],
      futureGoals: "Expanding AI-assisted speech tools and adult vocational workshops."
    }
  },
  {
    id: "deva-gram",
    title: "Deva Gram (Bachhaon Campus)",
    subtitle: "Sprawling Rural Sanctuary & Hydrotherapy Center for All 21 Disability Classifications",
    category: "current",
    sdgColor: "#D97706",
    sdgThemeClass: "border-[#D97706]/30",
    sdgName: "Rural Rehabilitation",
    targetGroup: "Rural Families & Multi-Disability Children",
    image: "/images/discc/community-program.png",
    badge: "Rural Care Campus",
    year: "2010 - Present",
    location: "Bachhaon Village, Varanasi",
    summary: "A barrier-free rural campus providing hydrotherapy, sensory garden stimulation, sports coaching, and respite care for rural families.",
    fullDetails: {
      overview: "Deva Gram removes the geographical and financial barrier of specialized healthcare for agrarian communities. Situated in Bachhaon village, it provides expansive open-air physical therapy, natural sensory stimulation, and respite care.",
      impactNumbers: "850+ Village Families Supported Annually",
      highlights: [
        "Equipped hydrotherapy pool for low-impact neuromuscular rehabilitation",
        "Sensory nature stimulation garden and agricultural motor therapy",
        "Overnight caregiver respite giving crucial relief to single mothers and families",
        "Regular free diagnostic health camps across 14 adjoining rural blocks"
      ],
      futureGoals: "Adding a dedicated green sensory courtyard and solar-powered therapy wing."
    }
  },
  {
    id: "annapurna-center",
    title: "Annapurna Center for Girls",
    subtitle: "Protecting, Educating, and Empowering Vulnerable Rural Young Girls",
    category: "current",
    sdgColor: "#C85A32",
    sdgThemeClass: "border-[#C85A32]/30",
    sdgName: "Girl Child Protection",
    targetGroup: "Marginalized Rural Girls & Mothers",
    image: "/images/discc/hero-children.png",
    badge: "Women & Girls Empowerment",
    year: "1995 - Present",
    location: "Rural Varanasi Outskirts",
    summary: "A community sanctuary providing daily nutrition, schooling support, menstrual health education, and vocational handicraft skills for young girls.",
    fullDetails: {
      overview: "Founded in 1995 to shield underprivileged rural girls from malnutrition and school dropout, Annapurna Center operates as a self-sustaining community shelter fostering financial dignity and self-reliance.",
      impactNumbers: "4,500+ Rural Girls & Mothers Empowered",
      highlights: [
        "Nutritional meal intervention tackling anemia and child malnutrition",
        "Adolescent health literacy and clean water sanitation education",
        "Vocational textile embroidery, tailoring, and handicraft training",
        "Community workshops dismantling deep-seated gender stigma"
      ],
      futureGoals: "Launching a digital literacy lab and artisan cooperative marketplace."
    }
  },
  {
    id: "child-education",
    title: "Child Education & Adaptive IEPs",
    subtitle: "Ensuring Inclusive Classroom Learning and Assistive Toolkits",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgThemeClass: "border-[#0F8B8D]/30",
    sdgName: "Inclusive Education",
    targetGroup: "Special Learners & Sibling Pairs",
    image: "/images/discc/children-activity.png",
    badge: "Inclusive Classroom",
    year: "1998 - Present",
    location: "Deva Learning Center, Varanasi",
    summary: "School sponsorship, specialized learning kits, assistive technology, and vocational training bridging the gap between special needs and mainstream society.",
    fullDetails: {
      overview: "Every child deserves an education tailored to their unique cognitive and physical pace. Our educational sponsorship program supplies uniforms, specialized sensory toys, Braille/tactile aids, and adaptive teaching assistants.",
      impactNumbers: "3,200+ School Sponsorships Provided",
      highlights: [
        "One-on-one special educator instruction based on clinical assessment",
        "Assistive technology and communication visual cards",
        "Integrated play sessions fostering peer empathy and social confidence",
        "Life-skills curriculum covering self-care, mobility, and money management"
      ],
      futureGoals: "Scaling digital tablet-based sensory lessons across all classrooms."
    }
  }
];

const IMPACT_METRICS = [
  { value: "12,000+", label: "Children & Families Rehabilitated", detail: "Across Eastern Uttar Pradesh since 1991" },
  { value: "35 Years", label: "Grassroots Clinical Service", detail: "Founded by Dr. C. Tulsi Das" },
  { value: "21 Categories", label: "Disabilities Supported", detail: "Comprehensive clinical diagnostic coverage" },
  { value: "100%", label: "Tax Exemption (80G & 12A)", detail: "Approved by Ministry of Home Affairs (FCRA)" },
];

const TESTIMONIALS = [
  {
    id: "tanisha",
    name: "Tanisha (Age 9)",
    parent: "Sunita Devi (Mother), Varanasi",
    milestone: "Learned to walk independently with hydrotherapy",
    quote: "When we brought Tanisha to Deva Center, she could not take even two steps without crying from muscle stiffness. After two years of gentle physiotherapy and hydrotherapy at Bachhaon, she walked into her first day of primary school with pure joy.",
    image: "/images/discc/children-therapy.jpg"
  },
  {
    id: "rahul",
    name: "Rahul (Age 11)",
    parent: "Ramesh Sharma (Father), Chandauli",
    milestone: "Communicates fluently with visual IEP boards",
    quote: "The personalized clinical psychological plan at Deva Center changed our entire household. Rahul had severe sensory meltdowns because he could not express his thoughts. The therapists gave him a voice, and today he loves math and group painting.",
    image: "/images/discc/children-activity.png"
  },
  {
    id: "priya",
    name: "Priya (Age 16)",
    parent: "Geeta Verma (Mother), Bachhaon",
    milestone: "Earns independent income via handicraft artisan training",
    quote: "Annapurna Center gave my daughter self-respect. Priya has Down Syndrome and was once excluded from village events. Now she creates intricate embroidery bags that were showcased at state exhibitions, earning her own monthly stipend.",
    image: "/images/discc/hero-children.png"
  }
];

export default function HomePage() {
  const [selectedProgram, setSelectedProgram] = useState<ProgramItem | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);

  // Quick callback form state
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackTopic, setCallbackTopic] = useState("child-admission");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackLoading, setCallbackLoading] = useState(false);

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
          subject: `Quick Consultation Request: ${callbackTopic}`,
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
    <div className="w-full flex flex-col items-center bg-[#FAF7F0] text-[#1A2530]">
      
      {/* 1. Asymmetric Split Editorial Hero */}
      <EditorialHero />

      {/* 2. Editorial Foundation Narrative (Replaces 3-card Why/Who/How) */}
      <section className="w-full py-20 md:py-28 bg-[#FFFDF9] border-b border-[#E8DFD3] relative">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Documentary Image & Pull Quote */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative bg-white p-3.5 rounded-2xl border border-[#E8DFD3] shadow-sm">
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden bg-[#F2ECE1]">
                  <Image
                    src="/images/discc/dr-tulsi-portrait.jpg"
                    alt="Dr. C. Tulsi Das with children"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="p-3 bg-[#FAF7F0] rounded-xl mt-3 border border-[#EAE4D9]">
                  <p className="text-xs font-serif italic text-[#3E5062] leading-relaxed">
                    &ldquo;Disability is not a lack of capability. It is a societal lack of appropriate, compassionate scientific support.&rdquo;
                  </p>
                  <p className="text-[11px] font-bold text-[#1A2530] mt-1">
                    Dr. C. Tulsi Das <span className="font-normal text-[#7A8B9E]">- Founder & Clinical Psychologist</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Flowing Editorial Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              
              <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#0F8B8D] uppercase tracking-widest">
                <span>The 1991 Genesis & Mandate</span>
              </div>

              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-[#1A2530] leading-tight mb-6">
                Bridging the Deep Vacuum in Eastern Uttar Pradesh with Science and Human Dignity.
              </h2>

              <div className="space-y-4 text-sm sm:text-base text-[#4A5D70] leading-relaxed">
                <p>
                  In 1991, families raising children with intellectual disabilities in Varanasi and surrounding rural districts faced an isolating reality: deep social stigma, no specialized diagnostic clinics, and zero inclusive schooling options.
                </p>
                <p>
                  Armed with clinical training and profound compassion, Dr. C. Tulsi Das established <strong>DEVA International Society for Child Care (DISCC)</strong>. Rather than offering temporary charity, DISCC established a rigorous clinical standard: pediatric psychological evaluations, sensory integration rooms, speech therapy, and customized Individualized Education Plans (IEPs).
                </p>
                <p>
                  Today, spanning our flagship <strong>Deva Center in Kamachha</strong> and our expansive <strong>Deva Gram rural sanctuary in Bachhaon</strong>, we provide multi-disciplinary rehabilitation across all 21 legally recognized disability classifications, ensuring every child steps toward independent living.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-[#E8DFD3] flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#0F8B8D] hover:text-[#0D7A7C] group cursor-pointer"
                >
                  <span>Read Dr. Tulsi&apos;s Full 35-Year Journey</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-[#1A2530] hover:text-[#0F8B8D] cursor-pointer"
                >
                  <span>Visit Our Centers in Varanasi</span>
                  <ChevronRight className="w-4 h-4 text-[#9EACB9]" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. Alternating Photo-Story Rows for Programmes (Replaces 3-card Grid) */}
      <section id="programmes" className="w-full py-20 md:py-28 bg-[#FAF7F0] border-b border-[#E8DFD3] relative">
        <div className="container-custom">
          
          <div className="max-w-3xl mb-16">
            <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#D97706] uppercase tracking-widest">
              <span>Bespoke Clinical & Rural Initiatives</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A2530] tracking-tight">
              Our Active Rehabilitation Campuses & Programs.
            </h2>
            <p className="text-sm sm:text-base text-[#5B6B7C] mt-2 leading-relaxed">
              Every facility operates with distinct clinical objectives, from downtown psychological diagnostics to rural agricultural hydrotherapy.
            </p>
          </div>

          <div className="space-y-16 lg:space-y-24">
            {KEY_PROGRAMMES.map((prog, idx) => {
              const isEven = idx % 2 === 0;

              return (
                <div
                  key={prog.id}
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Photo Column */}
                  <div className={`lg:col-span-6 ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                    <div className="relative bg-white p-3.5 sm:p-4 rounded-2xl border border-[#E8DFD3] shadow-sm group">
                      
                      {/* Background offset paper corner for organic craft feel */}
                      <div
                        className="absolute inset-0 rounded-2xl pointer-events-none opacity-40 transform translate-x-2 translate-y-2 -z-10"
                        style={{ backgroundColor: prog.sdgColor }}
                      />

                      <div className="relative w-full aspect-[16/11] rounded-xl overflow-hidden bg-[#F2ECE1]">
                        <Image
                          src={prog.image}
                          alt={prog.title}
                          fill
                          className="object-cover transition-transform duration-700 group-hover:scale-102"
                          sizes="(max-width: 1024px) 100vw, 50vw"
                        />
                      </div>

                      <div className="mt-3 flex items-center justify-between text-xs text-[#5B6B7C] px-1">
                        <span className="flex items-center gap-1.5 font-semibold text-[#1A2530]">
                          <MapPin className="w-3.5 h-3.5 text-[#0F8B8D]" />
                          {prog.location}
                        </span>
                        <span className="font-bold text-[#0F8B8D]">
                          {prog.year}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Narrative Text Column */}
                  <div className={`lg:col-span-6 flex flex-col justify-center ${isEven ? "lg:order-2" : "lg:order-1"}`}>
                    
                    <div className="inline-flex items-center gap-2 mb-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                        style={{ backgroundColor: prog.sdgColor }}
                      >
                        {prog.badge}
                      </span>
                      <span className="text-xs text-[#7A8B9E] font-semibold">
                        {prog.sdgName}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-heading font-bold text-[#1A2530] mb-2 leading-tight">
                      {prog.title}
                    </h3>
                    
                    <p className="text-sm font-semibold text-[#0F8B8D] mb-3">
                      {prog.subtitle}
                    </p>

                    <p className="text-sm sm:text-base text-[#4A5D70] leading-relaxed mb-6">
                      {prog.summary}
                    </p>

                    <div className="space-y-2.5 mb-6 text-xs sm:text-sm text-[#3E5062]">
                      {prog.fullDetails?.highlights?.slice(0, 2).map((hl, i) => (
                        <div key={i} className="flex items-start gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#0F8B8D] shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => setSelectedProgram(prog)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#1A2530] hover:bg-[#0F8B8D] text-white text-xs sm:text-sm font-bold shadow-xs transition-colors cursor-pointer"
                      >
                        <span>View Clinical Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                      <Link
                        href="/donate"
                        className="text-xs sm:text-sm font-bold text-[#D97706] hover:underline"
                      >
                        Sponsor This Center &rarr;
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* 4. Full-Bleed Impact Numbers Paper Band (Replaces Stat Cards) */}
      <section className="w-full py-16 bg-[#F2EDE2] border-b border-[#E8DFD3] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 text-center">
            {IMPACT_METRICS.map((metric, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] tracking-tight">
                  {metric.value}
                </span>
                <HandUnderline className="text-[#D97706] w-28 h-2.5 my-1" />
                <h4 className="text-xs sm:text-sm font-bold text-[#1A2530] mt-1">
                  {metric.label}
                </h4>
                <p className="text-[11px] text-[#5B6B7C] mt-0.5 max-w-[200px]">
                  {metric.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Editorial Testimonial Filmstrip (Replaces Generic Quote Card Grid) */}
      <section className="w-full py-20 md:py-28 bg-[#FFFDF9] border-b border-[#E8DFD3] relative">
        <div className="container-custom">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="inline-flex items-center gap-2 mb-2 text-xs font-bold text-[#0F8B8D] uppercase tracking-widest">
                <span>Living Proof & Milestones</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A2530]">
                Stories of Dignity, Growth, and Triumph.
              </h2>
            </div>
            
            {/* Story Switcher Tabs */}
            <div className="flex items-center gap-2 mt-4 md:mt-0">
              {TESTIMONIALS.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTestimonial(idx)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all cursor-pointer border ${
                    activeTestimonial === idx
                      ? "bg-[#1A2530] text-white border-[#1A2530] shadow-xs"
                      : "bg-[#F3EDE2] text-[#5B6B7C] border-[#E8DFD3] hover:bg-white"
                  }`}
                >
                  {t.name}
                </button>
              ))}
            </div>
          </div>

          {/* Active Story Feature Spread */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-[#E8DFD3] shadow-sm">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              
              <div className="lg:col-span-5">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-[#F2ECE1] border border-[#E8DFD3]">
                  <Image
                    src={TESTIMONIALS[activeTestimonial].image}
                    alt={TESTIMONIALS[activeTestimonial].name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full bg-white/95 backdrop-blur-xs text-xs font-bold text-[#0F8B8D] shadow-xs">
                    {TESTIMONIALS[activeTestimonial].milestone}
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7 flex flex-col justify-center">
                <Quote className="w-10 h-10 text-[#F5A524] mb-3 opacity-75" />
                <p className="text-base sm:text-lg lg:text-xl font-serif text-[#1A2530] leading-relaxed italic mb-6">
                  &ldquo;{TESTIMONIALS[activeTestimonial].quote}&rdquo;
                </p>
                <div>
                  <h4 className="text-base font-bold text-[#1A2530]">
                    {TESTIMONIALS[activeTestimonial].name}
                  </h4>
                  <p className="text-xs text-[#5B6B7C]">
                    Attributed by: {TESTIMONIALS[activeTestimonial].parent}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 6. Institutional & Government Recognition Marquee */}
      <section className="w-full py-12 bg-[#FAF7F0] border-b border-[#E8DFD3]">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-left shrink-0">
            <span className="text-xs uppercase tracking-wider font-bold text-[#7A8B9E] block">
              Accreditations & Honors
            </span>
            <span className="text-sm font-bold text-[#1A2530]">
              Official Government Recognitions
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs font-bold text-[#3E5062]">
            <span className="px-4 py-2 rounded-xl bg-white border border-[#E8DFD3] shadow-xs flex items-center gap-2">
              <Award className="w-4 h-4 text-[#D97706]" />
              UP Chief Minister State Award
            </span>
            <span className="px-4 py-2 rounded-xl bg-white border border-[#E8DFD3] shadow-xs flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#0F8B8D]" />
              MHA FCRA Registered
            </span>
            <span className="px-4 py-2 rounded-xl bg-white border border-[#E8DFD3] shadow-xs flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[#0F8B8D]" />
              Section 80G Tax Exemption
            </span>
            <span className="px-4 py-2 rounded-xl bg-white border border-[#E8DFD3] shadow-xs flex items-center gap-2">
              <Building2 className="w-4 h-4 text-[#D97706]" />
              National Trust (Govt. of India)
            </span>
          </div>
        </div>
      </section>

      {/* 7. Warm Personal Donation & Consultation Appeal (Replaces Generic Banner) */}
      <section className="w-full py-20 bg-[#FFF3E0]/70 border-b border-[#E8DFD3] relative">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Direct Impact Breakdown */}
            <div className="lg:col-span-6 flex flex-col">
              <div className="inline-flex items-center gap-2 mb-3 text-xs font-bold text-[#D97706] uppercase tracking-widest">
                <span>Direct Child Sponsorship</span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A2530] mb-4 leading-tight">
                Your Support Gives a Child a Lifetime of Independence.
              </h2>
              <p className="text-sm sm:text-base text-[#5B6B7C] leading-relaxed mb-6">
                100% of your contribution is directed toward direct therapy, assistive mobility aids, and daily nutrition at our Kamachha and Bachhaon centers.
              </p>

              <div className="space-y-3 mb-8">
                <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFD3] flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-[#1A2530]">1 Month of Hydrotherapy & Speech Sessions</span>
                  <span className="font-bold text-[#0F8B8D]">₹1,500 / month</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFD3] flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-[#1A2530]">Complete Adaptive Classroom Learning Kit</span>
                  <span className="font-bold text-[#0F8B8D]">₹3,500 one-time</span>
                </div>
                <div className="p-3.5 rounded-2xl bg-white border border-[#E8DFD3] flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-semibold text-[#1A2530]">Full Year School & Therapy Sponsorship</span>
                  <span className="font-bold text-[#0F8B8D]">₹18,000 / year</span>
                </div>
              </div>

              <div>
                <Link href="/donate">
                  <Button size="lg" className="bg-[#F5A524] hover:bg-[#E09314] text-[#1A2530] font-extrabold rounded-full px-8 h-12 shadow-md gap-2 cursor-pointer">
                    <Heart className="w-5 h-5 fill-current text-[#1A2530]" />
                    <span>Make a Tax-Deductible Contribution</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right: Direct Consultation / Callback Form (Unboxed / Clean) */}
            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border border-[#E8DFD3] shadow-sm">
                <h3 className="text-xl font-heading font-bold text-[#1A2530] mb-2">
                  Request a Clinical Consultation or Visit
                </h3>
                <p className="text-xs sm:text-sm text-[#5B6B7C] mb-6">
                  Seeking assessment for your child or wish to visit our Deva Center in Varanasi? Leave your contact details below.
                </p>

                {callbackSubmitted ? (
                  <div className="p-5 rounded-2xl bg-[#E6F6EE] border border-[#0F8B8D]/30 text-center">
                    <CheckCircle2 className="w-8 h-8 text-[#0F8B8D] mx-auto mb-2" />
                    <h4 className="text-sm font-bold text-[#1A2530]">Request Received</h4>
                    <p className="text-xs text-[#5B6B7C] mt-1">
                      Our clinical counselor will call you within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-[#1A2530] mb-1">
                        Parent or Guardian Name
                      </label>
                      <input
                        type="text"
                        required
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        placeholder="e.g. Smt. Anjali Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD3] text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A2530] mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD3] text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A2530] mb-1">
                        Consultation Subject
                      </label>
                      <select
                        value={callbackTopic}
                        onChange={(e) => setCallbackTopic(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-[#E8DFD3] text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                      >
                        <option value="child-admission">Child Assessment & Admission (Kamachha Center)</option>
                        <option value="speech-therapy">Speech & Sensory Therapy Consultation</option>
                        <option value="rural-outreach">Rural Deva Gram Care (Bachhaon)</option>
                        <option value="donor-visit">Donor or Volunteer Center Visit</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={callbackLoading}
                      className="w-full bg-[#1A2530] hover:bg-[#0F8B8D] text-white font-bold rounded-xl h-11 text-sm shadow-xs cursor-pointer"
                    >
                      {callbackLoading ? "Submitting..." : "Schedule Callback"}
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Program Detail Lightbox Modal */}
      {selectedProgram && (
        <ProgramDetailModal
          program={selectedProgram}
          onClose={() => setSelectedProgram(null)}
        />
      )}

    </div>
  );
}
