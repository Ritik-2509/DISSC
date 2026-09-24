"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  ShieldCheck,
  CheckCircle2,
  Copy,
  Check,
  Building2,
  Award,
  ArrowRight,
  Phone,
  Mail,
  QrCode
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const DONATION_TIERS = [
  {
    amount: 500,
    label: "Nutritional Support",
    desc: "Provides 1 week of hygienic hot meals and vitamin supplements for a special child.",
  },
  {
    amount: 1500,
    label: "Sensory & Speech Therapy",
    desc: "Funds 1 month of clinical sensory integration and speech development sessions.",
  },
  {
    amount: 5000,
    label: "Full Term Scholarship",
    desc: "Covers special education, adaptive textbooks, school uniforms, and van commute.",
  },
  {
    amount: 15000,
    label: "Wheelchair & Caliper Kit",
    desc: "Custom-fitted pediatric mobility calipers or wheelchair for a cerebral palsy child.",
  },
];

export default function DonatePage() {
  const [selectedAmount, setSelectedAmount] = useState<number>(1500);
  const [customAmount, setCustomAmount] = useState<string>("");
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#FFFAF2]">
      {/* 1. Header */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#FFEFE0]/60 to-[#FFFAF2] relative">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#F5A524]/20 text-[#1E2A3A] border border-[#F5A524]/30 inline-block mb-4">
              50% Tax Exemption Under Section 80G
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.1]">
              Invest in Pure Minds & Dignified Futures
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-text leading-relaxed max-w-[60ch]">
              Every single rupee directly empowers clinical psychological rehabilitation, nutrition, and adaptive schooling for children with disabilities in Varanasi.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Donation Tiers & Bank Transfer Grid */}
      <section className="w-full py-16 md:py-24 bg-white border-y border-border/70 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Donation Tiers Selection */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-8 rounded-3xl bg-[#FFFAF2] border border-border/80 shadow-soft space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Select Your Sponsorship Tier
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-foreground mt-1">
                    Choose an Amount
                  </h3>
                </div>

                <div className="grid grid-cols-2 gap-3.5">
                  {DONATION_TIERS.map((tier) => (
                    <button
                      key={tier.amount}
                      onClick={() => {
                        setSelectedAmount(tier.amount);
                        setCustomAmount("");
                      }}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        selectedAmount === tier.amount && !customAmount
                          ? "bg-primary text-white border-primary shadow-soft"
                          : "bg-white text-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      <span className="block text-xl font-extrabold font-heading">
                        ₹{tier.amount.toLocaleString()}
                      </span>
                      <span className="block text-xs font-bold mt-1 opacity-90">
                        {tier.label}
                      </span>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-xs font-bold text-foreground mb-1.5">
                    Or Enter a Custom Amount (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-muted-text">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="e.g. 25000"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        setSelectedAmount(Number(e.target.value) || 0);
                      }}
                      className="w-full h-12 pl-8 pr-4 rounded-xl border border-border bg-white text-foreground text-base font-bold focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                  </div>
                </div>

                {/* Selected Impact Description */}
                <div className="p-4 rounded-2xl bg-[#E6F6EE] border border-[#0F8B8D]/30 text-xs text-[#0F8B8D] font-medium leading-relaxed">
                  <span className="font-bold block mb-1">Your Impact:</span>
                  {customAmount
                    ? `Your generous gift of ₹${Number(customAmount).toLocaleString()} will fund customized clinical rehabilitation equipment and emergency medicines.`
                    : DONATION_TIERS.find((t) => t.amount === selectedAmount)?.desc}
                </div>

                {/* Quick Payment Details */}
                <div className="pt-2">
                  <a
                    href={`upi://pay?pa=4112108180@kotak&pn=Deva%20International%20Society%20for%20Child%20Care&am=${
                      customAmount || selectedAmount
                    }&cu=INR`}
                    className="w-full"
                  >
                    <Button variant="donate" size="lg" className="w-full gap-2 shadow-glow-marigold text-base">
                      <Heart className="w-5 h-5 fill-current" />
                      Pay ₹{(customAmount ? Number(customAmount) : selectedAmount).toLocaleString()} via UPI
                    </Button>
                  </a>
                  <p className="text-center text-xs text-muted-text mt-2">
                    Instant UPI payment support for GPay, PhonePe, Paytm, and BHIM
                  </p>
                </div>
              </div>

              {/* 80G Receipt Instructions */}
              <div className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft space-y-2">
                <div className="flex items-center gap-2 text-primary font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>How to Get Your 80G Receipt</span>
                </div>
                <p className="text-xs text-muted-text leading-relaxed">
                  After initiating your transfer, simply email your transaction screenshot, full name, and PAN card number to <span className="font-bold text-foreground">disccindia@gmail.com</span> or WhatsApp at <span className="font-bold text-foreground">7007453168</span>. Your official tax exemption receipt will be issued within 48 hours.
                </p>
              </div>
            </div>

            {/* Right: Direct Bank Transfer Details */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-8 rounded-3xl bg-[#FFFAF2] border border-border/80 shadow-soft space-y-6">
                <div className="flex items-center gap-3 border-b border-border/60 pb-4">
                  <Building2 className="w-6 h-6 text-primary" />
                  <div>
                    <h3 className="text-xl font-bold font-heading text-foreground">
                      Direct Bank Transfer (NEFT / RTGS / IMPS)
                    </h3>
                    <p className="text-xs text-muted-text">Official Registered NGO Bank Account</p>
                  </div>
                </div>

                <div className="divide-y divide-border/60 text-sm">
                  {/* Account Name */}
                  <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-xs text-muted-text font-medium">Account Name:</span>
                    <span className="font-bold text-foreground text-sm sm:text-right">
                      Deva International Society for Child Care
                    </span>
                  </div>

                  {/* Account Number */}
                  <div className="py-3 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-muted-text font-medium block">Account Number:</span>
                      <span className="font-mono font-bold text-primary text-base sm:text-lg">
                        4112108180
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy("4112108180", "acc")}
                      className="px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-bold text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedField === "acc" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-primary" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  {/* IFSC */}
                  <div className="py-3 flex items-center justify-between gap-2">
                    <div>
                      <span className="text-xs text-muted-text font-medium block">IFSC Code:</span>
                      <span className="font-mono font-bold text-foreground text-base">
                        KKBK0005291
                      </span>
                    </div>
                    <button
                      onClick={() => handleCopy("KKBK0005291", "ifsc")}
                      className="px-3 py-1.5 rounded-lg border border-border bg-white text-xs font-bold text-foreground hover:bg-muted transition-colors flex items-center gap-1.5 cursor-pointer"
                    >
                      {copiedField === "ifsc" ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-primary" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>

                  {/* Bank Name */}
                  <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-xs text-muted-text font-medium">Bank Name:</span>
                    <span className="font-bold text-foreground">Kotak Mahindra Bank</span>
                  </div>

                  {/* Branch & Type */}
                  <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                    <span className="text-xs text-muted-text font-medium">Account Type & Branch:</span>
                    <span className="font-bold text-foreground">Current Account · Varanasi Branch</span>
                  </div>
                </div>

                {/* FCRA Foreign Donor Notice */}
                <div className="p-4 rounded-2xl bg-white border border-border/80 space-y-1.5 text-xs text-muted-text">
                  <div className="flex items-center gap-1.5 font-bold text-foreground">
                    <Award className="w-4 h-4 text-[#F5A524]" />
                    <span>International Philanthropic Donors (FCRA)</span>
                  </div>
                  <p className="leading-relaxed">
                    DISCC holds valid registration under the Foreign Contribution Regulation Act (FCRA). For international wire transfers from USA, Europe, or UK, please consult our <Link href="/fcra" className="text-primary font-bold underline">FCRA Declarations Page</Link> for State Bank of India New Delhi FCRA main account details.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
