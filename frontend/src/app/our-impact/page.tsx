import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Award, Users, Heart, Building2, ShieldCheck, CheckCircle2, ArrowRight } from "lucide-react";
import { HandUnderline } from "@/components/ui/HandDrawn";

const IMPACT_NUMBERS = [
  { value: "12,000+", label: "Children & Families Rehabilitated", detail: "Across Eastern Uttar Pradesh since 1991" },
  { value: "35 Years", label: "Continuous Clinical Service", detail: "Founded by Dr. C. Tulsi Das in Varanasi" },
  { value: "21", label: "Disability Categories Supported", detail: "Full diagnostic and clinical therapeutic coverage" },
  { value: "100%", label: "Tax Exemption (80G & 12A)", detail: "Authorized under Ministry of Home Affairs (FCRA)" },
];

const CLINICAL_OUTCOMES = [
  {
    title: "Pediatric Motor & Sensory Independence",
    stat: "84% of children",
    desc: "Demonstrate measurable improvements in gait stability, posture regulation, and sensory integration within 12 months of structured therapy."
  },
  {
    title: "Alternative & Augmentative Communication (AAC)",
    stat: "78% non-verbal learners",
    desc: "Develop active communication routines utilizing customized visual IEP schedules and speech-language oral motor toolkits."
  },
  {
    title: "Mainstream School Integration",
    stat: "3,200+ students",
    desc: "Successfully transitioned from bridge special education classes into formal regular government and private schools."
  },
  {
    title: "Vocational & Artisan Self-Sufficiency",
    stat: "450+ young adults",
    desc: "Earn regular monthly income through textile embroidery, handicraft packaging, and small-batch artisan cooperatives."
  }
];

export default function ImpactPage() {
  return (
    <div className="w-full flex flex-col items-center bg-[#FAF7F0] text-[#1A2530]">
      
      {/* 1. Header */}
      <section className="w-full pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#E8DFD3] bg-[#FAF7F0]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-2">
              Verified Longitudinal Impact · 1991 to Present
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] leading-tight">
              Transforming Special Lives Across Generations.
            </h1>
            <div className="mt-2 mb-4">
              <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
            </div>
            <p className="text-base sm:text-lg text-[#5B6B7C] leading-relaxed">
              Tangible clinical outcomes and social empowerment resulting from 35 years of scientific dedication and grassroots community building in Varanasi.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Big Metrics Strip */}
      <section className="w-full py-16 bg-[#F2EDE2] border-b border-[#E8DFD3]">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            {IMPACT_NUMBERS.map((m, i) => (
              <div key={i} className="flex flex-col items-center">
                <span className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] tracking-tight">
                  {m.value}
                </span>
                <HandUnderline className="text-[#D97706] w-28 h-2.5 my-1" />
                <h3 className="text-xs sm:text-sm font-bold text-[#1A2530] mt-1">
                  {m.label}
                </h3>
                <p className="text-[11.5px] text-[#5B6B7C] mt-0.5 max-w-[220px]">
                  {m.detail}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Clinical Outcomes Breakdown */}
      <section className="w-full py-20 md:py-28 bg-[#FFFDF9] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="max-w-2xl mb-14 text-left">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-1">
              Measurable Milestones
            </span>
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-[#1A2530]">
              Clinical Outcomes & Rehabilitation Data.
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {CLINICAL_OUTCOMES.map((item, idx) => (
              <div
                key={idx}
                className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFD3] shadow-xs flex flex-col justify-between"
              >
                <div>
                  <span className="text-2xl sm:text-3xl font-heading font-bold text-[#0F8B8D] block mb-2">
                    {item.stat}
                  </span>
                  <h3 className="text-lg font-bold text-[#1A2530] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#5B6B7C] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* 4. Action Banner */}
      <section className="w-full py-16 bg-[#FAF7F0]">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6 p-8 rounded-3xl bg-[#FFF3E0] border border-[#F5A524]/40">
          <div>
            <h3 className="text-2xl font-heading font-bold text-[#1A2530]">
              Help Us Expand Clinical Capacity for Another 10,000 Children.
            </h3>
            <p className="text-sm text-[#5B6B7C] mt-1">
              Your gift enables daily sensory therapy, speech diagnostics, and assistive mobility equipment.
            </p>
          </div>
          <div className="shrink-0">
            <Link href="/donate">
              <Button size="lg" className="bg-[#1A2530] hover:bg-[#0F8B8D] text-white font-bold rounded-full px-7 cursor-pointer">
                Support a Child Today
              </Button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
