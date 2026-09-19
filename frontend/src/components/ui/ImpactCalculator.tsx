"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Heart, Sparkles, ArrowRight, ShieldCheck, Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ImpactTier {
  amount: number;
  label: string;
  period: string;
  tag: string;
  impactDescription: string;
  metrics: string[];
}

const IMPACT_TIERS: ImpactTier[] = [
  {
    amount: 1500,
    label: "Nutritional & Sensory Kit",
    period: "per month",
    tag: "Essential Nutrition",
    impactDescription: "Provides high-protein clinical meal support, therapeutic sensory toys, and daily multi-vitamins for 1 neurodivergent child at Deva Center.",
    metrics: [
      "30 nutritious clinical meals",
      "Sensory motor activity kit",
      "Weekly health & weight tracking",
    ],
  },
  {
    amount: 3500,
    label: "Speech & Physical Therapy",
    period: "per month",
    tag: "Clinical Care",
    impactDescription: "Covers 12 one-on-one speech therapy sessions, neuro-physiotherapy, and personalized psychological evaluations by trained specialists.",
    metrics: [
      "12 clinical therapy hours",
      "Standardized psychological IEP",
      "Parental counseling & home exercise routine",
    ],
  },
  {
    amount: 7500,
    label: "Full Child Sponsorship",
    period: "per month",
    tag: "Transformational",
    impactDescription: "Completely funds one special child's clinical care, specialized schooling, daily transport to Kamachha Chungi, and medical emergency care.",
    metrics: [
      "Full academic tuition & assistive books",
      "Complete clinical rehabilitation package",
      "Direct progress updates sent to sponsor",
    ],
  },
  {
    amount: 15000,
    label: "Rural Outpost Clinic Day",
    period: "one-time",
    tag: "Community Scale",
    impactDescription: "Powers a full-day diagnostic screening, antiseptic wound dressing, and medicine distribution camp reaching 50+ families in rural Varanasi outposts.",
    metrics: [
      "Screening for 50+ rural village children",
      "Sterile wound management & free medicines",
      "Assistive aid referrals & family counseling",
    ],
  },
];

export function ImpactCalculator() {
  const [selectedTier, setSelectedTier] = useState<ImpactTier>(IMPACT_TIERS[1]);
  const [customAmount, setCustomAmount] = useState<number>(3500);

  const handleSelect = (tier: ImpactTier) => {
    setSelectedTier(tier);
    setCustomAmount(tier.amount);
  };

  return (
    <section className="py-20 md:py-28 bg-gradient-to-b from-background via-muted/30 to-background border-b border-border/70 w-full relative overflow-hidden">
      {/* Background Subtle Accents */}
      <div className="absolute -top-40 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 left-10 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Direct Impact Transparency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-secondary tracking-tight">
            See the Real Change Your Contribution Creates
          </h2>
          <p className="text-muted-foreground text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Every rupee is accounted for. Choose an amount below to understand precisely how your sponsorship transforms neurodivergent and vulnerable lives in Varanasi.
          </p>
        </div>

        {/* Interactive Calculator Shell */}
        <div className="max-w-5xl mx-auto bg-card rounded-3xl border-2 border-border/90 shadow-xl overflow-hidden">
          {/* Top Selection Buttons */}
          <div className="grid grid-cols-2 md:grid-cols-4 p-3 sm:p-4 bg-muted/40 gap-2 border-b border-border/80">
            {IMPACT_TIERS.map((tier) => {
              const isSelected = selectedTier.amount === tier.amount;
              return (
                <button
                  key={tier.amount}
                  onClick={() => handleSelect(tier)}
                  className={`p-4 rounded-2xl text-left transition-all duration-300 relative ${
                    isSelected
                      ? "bg-secondary text-white shadow-md scale-[1.02]"
                      : "bg-white/80 hover:bg-white text-secondary hover:shadow-xs"
                  }`}
                >
                  <span
                    className={`text-[10px] font-bold uppercase tracking-wider block mb-1 ${
                      isSelected ? "text-accent" : "text-muted-foreground"
                    }`}
                  >
                    {tier.tag}
                  </span>
                  <div className="font-display font-black text-lg sm:text-xl leading-tight">
                    ₹{tier.amount.toLocaleString("en-IN")}
                  </div>
                  <span className={`text-[11px] block mt-0.5 ${isSelected ? "text-white/75" : "text-muted-foreground"}`}>
                    {tier.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Dynamic Impact Display Area */}
          <div className="p-6 sm:p-10 lg:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={selectedTier.amount}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
              >
                {/* Left Description */}
                <div className="lg:col-span-7 space-y-5">
                  <div className="space-y-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-primary">
                      Selected Impact Level
                    </span>
                    <h3 className="text-2xl sm:text-3xl font-display font-black text-secondary">
                      ₹{selectedTier.amount.toLocaleString("en-IN")}{" "}
                      <span className="text-sm font-normal text-muted-foreground font-sans">
                        / {selectedTier.period}
                      </span>
                    </h3>
                    <p className="text-foreground/90 text-base sm:text-lg leading-relaxed pt-1">
                      {selectedTier.impactDescription}
                    </p>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground block">
                      Direct Measurable Deliverables:
                    </span>
                    <ul className="space-y-2">
                      {selectedTier.metrics.map((m, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-foreground/80">
                          <div className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Check className="w-3.5 h-3.5" />
                          </div>
                          <span>{m}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center gap-4 text-xs text-muted-foreground pt-3 border-t border-border/60">
                    <div className="flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4 text-emerald-600" />
                      <span>80G Tax Deductible (50% Exemption)</span>
                    </div>
                    <span>•</span>
                    <span>Instant Digital Receipt</span>
                  </div>
                </div>

                {/* Right Action Callout */}
                <div className="lg:col-span-5 bg-muted/40 p-6 sm:p-8 rounded-3xl border border-border/80 text-center space-y-5">
                  <div className="space-y-1">
                    <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                      Ready to Transform a Life?
                    </span>
                    <div className="text-3xl sm:text-4xl font-display font-black text-primary">
                      ₹{selectedTier.amount.toLocaleString("en-IN")}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Eligible for 80G tax exemption under Indian Income Tax Act
                    </p>
                  </div>

                  <div className="space-y-3 pt-2">
                    <Link href={`/donate?amount=${selectedTier.amount}`} className="block w-full">
                      <Button
                        size="lg"
                        className="w-full h-14 rounded-full font-bold uppercase text-xs tracking-wider bg-primary hover:bg-primary/90 text-white shadow-lg hover:shadow-xl transition-all"
                      >
                        <Heart className="w-4 h-4 mr-2 fill-white" />
                        Sponsor This Program
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                    <Link href="/contact" className="block text-xs font-bold text-secondary hover:text-primary transition-colors">
                      Need custom CSR or corporate partnership inquiry?
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
