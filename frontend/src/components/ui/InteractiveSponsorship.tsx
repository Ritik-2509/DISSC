"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, CheckCircle2, Sparkles, ArrowRight, Award } from "lucide-react";
import { Button } from "@/components/ui/button";

const SPONSORSHIP_TIERS = [
  {
    amount: 1500,
    period: "per month",
    title: "Therapy & Nutrition Supporter",
    impact: "Provides 1 month of clinical speech therapy, sensory integration sessions, and daily nutritious hot meals for a special child.",
    color: "border-teal-400 bg-teal-50/50 hover:border-teal-500",
    badge: "Most Popular"
  },
  {
    amount: 3500,
    period: "one-time",
    title: "Adaptive Classroom Learning Kit",
    impact: "Supplies specialized sensory toys, Braille/tactile aids, picture communication cards, and school uniforms for an underprivileged student.",
    color: "border-amber-400 bg-amber-50/50 hover:border-amber-500",
    badge: "Direct Toolkit"
  },
  {
    amount: 18000,
    period: "per year",
    title: "Full Year Clinical Rehabilitation",
    impact: "Comprehensive 12-month support covering pediatric diagnostics, hydrotherapy in Bachhaon, special education, and family counseling.",
    color: "border-rose-400 bg-rose-50/50 hover:border-rose-500",
    badge: "Transformational"
  }
];

export function InteractiveSponsorship() {
  const [selectedTier, setSelectedTier] = useState(0);

  return (
    <section className="w-full py-20 md:py-28 bg-[#FFFDF9] border-b border-amber-200/70 relative">
      <div className="container-custom">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-rose-100 text-rose-800 border border-rose-300 text-xs font-bold uppercase tracking-wider mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>Direct Child Sponsorship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 tracking-tight leading-tight">
            One Small Gift. A Lifetime of Independence.
          </h2>
          <p className="text-base sm:text-lg text-slate-600 mt-3 leading-relaxed">
            100% of your tax-deductible contribution directly funds clinical therapy, adaptive learning kits, and nutrition in Varanasi.
          </p>
        </div>

        {/* Dynamic 3 Tiers Layout (Jai Vakeel Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {SPONSORSHIP_TIERS.map((tier, idx) => (
            <div
              key={idx}
              onClick={() => setSelectedTier(idx)}
              className={`p-6 sm:p-8 rounded-3xl border-2 transition-all cursor-pointer flex flex-col justify-between ${
                selectedTier === idx
                  ? "bg-white shadow-xl scale-103 border-amber-500 ring-4 ring-amber-300/40"
                  : "bg-white/80 shadow-sm border-slate-200 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-3 py-1 rounded-full text-xs font-black bg-slate-900 text-white">
                    {tier.badge}
                  </span>
                  <span className="text-xs font-bold text-teal-700">
                    80G Tax Exempt
                  </span>
                </div>

                <div className="mb-4">
                  <span className="text-3xl sm:text-4xl font-heading font-black text-slate-900">
                    ₹{tier.amount.toLocaleString("en-IN")}
                  </span>
                  <span className="text-xs font-bold text-slate-500 ml-1.5">
                    {tier.period}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {tier.title}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {tier.impact}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link href="/donate" className="w-full block">
                  <Button
                    size="sm"
                    className={`w-full font-extrabold rounded-full ${
                      selectedTier === idx
                        ? "bg-amber-500 hover:bg-amber-600 text-slate-950 shadow-md"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                    }`}
                  >
                    Sponsor This Tier
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-50 via-teal-50 to-rose-50 border border-amber-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <ShieldCheck className="w-8 h-8 text-teal-700 shrink-0" />
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                Official 80G Tax Exemption & FCRA Registered
              </h4>
              <p className="text-xs text-slate-600">
                Receipts issued immediately with PAN confirmation for 50% tax deductions.
              </p>
            </div>
          </div>
          <Link href="/donate">
            <Button
              size="lg"
              className="bg-slate-900 hover:bg-teal-700 text-white font-bold rounded-full px-7 text-xs sm:text-sm shrink-0"
            >
              Custom Amount Donation
            </Button>
          </Link>
        </div>

      </div>
    </section>
  );
}
