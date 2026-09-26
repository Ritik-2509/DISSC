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
import { HandUnderline } from "@/components/ui/HandDrawn";

const DONATION_TIERS = [
  {
    amount: 500,
    label: "Nutritional Support",
    desc: "Provides 1 week of nutritious hot meals and supplements for a special child.",
  },
  {
    amount: 1500,
    label: "Sensory & Speech Therapy",
    desc: "Funds 1 month of clinical sensory integration and speech development sessions.",
  },
  {
    amount: 5000,
    label: "Adaptive School Scholarship",
    desc: "Covers special education, adaptive textbooks, school uniforms, and learning kits.",
  },
  {
    amount: 18000,
    label: "Full Year Care & Respite",
    desc: "Comprehensive 12-month clinical rehabilitation, therapy, and family counseling.",
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
    <div className="w-full flex flex-col items-center bg-[#FAF7F0] text-[#1A2530]">
      
      {/* 1. Page Header */}
      <section className="w-full pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#E8DFD3] bg-[#FAF7F0]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-[#FFF3E0] text-[#8B4500] border border-[#F5A524]/40 mb-3 shadow-xs">
              <ShieldCheck className="w-4 h-4 text-[#D97706]" />
              50% Tax Exemption Under Section 80G
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] leading-tight">
              Invest in Pure Minds & Dignified Futures.
            </h1>
            <div className="mt-2 mb-4">
              <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
            </div>
            <p className="text-base sm:text-lg text-[#5B6B7C] leading-relaxed">
              Every single rupee directly empowers clinical psychological rehabilitation, nutrition, and adaptive schooling for children with disabilities in Varanasi.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Interactive Tiers & Bank Details */}
      <section className="w-full py-16 md:py-24 bg-[#FFFDF9] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Sponsorship Tier Selection */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFD3] shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#0F8B8D]">
                    Direct Sponsorship Impact
                  </span>
                  <h2 className="text-2xl font-heading font-bold text-[#1A2530] mt-1">
                    Select a Contribution Tier
                  </h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {DONATION_TIERS.map((tier) => (
                    <button
                      key={tier.amount}
                      onClick={() => {
                        setSelectedAmount(tier.amount);
                        setCustomAmount("");
                      }}
                      className={`p-4 rounded-2xl text-left border transition-all cursor-pointer ${
                        selectedAmount === tier.amount && !customAmount
                          ? "bg-[#FFF9F0] border-[#F5A524] shadow-xs"
                          : "bg-white border-[#E8DFD3] hover:border-[#C8BFB3]"
                      }`}
                    >
                      <span className="text-xl font-heading font-extrabold text-[#1A2530] block">
                        ₹{tier.amount.toLocaleString("en-IN")}
                      </span>
                      <span className="text-xs font-bold text-[#0F8B8D] block mt-0.5">
                        {tier.label}
                      </span>
                      <p className="text-[11.5px] text-[#5B6B7C] mt-1.5 leading-relaxed">
                        {tier.desc}
                      </p>
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div>
                  <label className="block text-xs font-bold text-[#1A2530] uppercase tracking-wider mb-2">
                    Or Enter Custom Amount (INR)
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-[#5B6B7C]">
                      ₹
                    </span>
                    <input
                      type="number"
                      placeholder="e.g. 2500"
                      value={customAmount}
                      onChange={(e) => {
                        setCustomAmount(e.target.value);
                        if (e.target.value) setSelectedAmount(0);
                      }}
                      className="w-full pl-9 pr-4 py-3 rounded-xl border border-[#E8DFD3] text-base font-bold text-[#1A2530] focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                    />
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-[#FFF3E0] border border-[#F5A524]/40 flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs text-[#8B4500]">
                    <ShieldCheck className="w-4 h-4 text-[#D97706] shrink-0" />
                    <span>80G Tax Receipt issued automatically upon transfer confirmation</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Bank Transfer & UPI Details */}
            <div className="lg:col-span-6 space-y-6">
              
              <div className="p-6 sm:p-8 rounded-3xl bg-white border border-[#E8DFD3] shadow-xs space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-[#D97706]">
                    Direct NEFT / RTGS / IMPS
                  </span>
                  <h2 className="text-2xl font-heading font-bold text-[#1A2530] mt-1">
                    Official DISCC Bank Account
                  </h2>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  
                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8DFD3] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#7A8B9E] font-medium block">Account Name</span>
                      <span className="font-bold text-[#1A2530]">DEVA International Society for Child Care</span>
                    </div>
                    <button
                      onClick={() => handleCopy("DEVA International Society for Child Care", "name")}
                      className="p-1.5 rounded-lg hover:bg-white text-[#5B6B7C] cursor-pointer"
                    >
                      {copiedField === "name" ? <Check className="w-4 h-4 text-[#0F8B8D]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8DFD3] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#7A8B9E] font-medium block">Account Number</span>
                      <span className="font-bold text-[#1A2530] font-mono text-base">30584729105</span>
                    </div>
                    <button
                      onClick={() => handleCopy("30584729105", "acc")}
                      className="p-1.5 rounded-lg hover:bg-white text-[#5B6B7C] cursor-pointer"
                    >
                      {copiedField === "acc" ? <Check className="w-4 h-4 text-[#0F8B8D]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8DFD3] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#7A8B9E] font-medium block">IFSC Code</span>
                      <span className="font-bold text-[#1A2530] font-mono text-base">SBIN0001618</span>
                    </div>
                    <button
                      onClick={() => handleCopy("SBIN0001618", "ifsc")}
                      className="p-1.5 rounded-lg hover:bg-white text-[#5B6B7C] cursor-pointer"
                    >
                      {copiedField === "ifsc" ? <Check className="w-4 h-4 text-[#0F8B8D]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8DFD3] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#7A8B9E] font-medium block">Bank & Branch</span>
                      <span className="font-bold text-[#1A2530]">State Bank of India (Kamachha, Varanasi)</span>
                    </div>
                  </div>

                  <div className="p-3.5 rounded-xl bg-[#FAF7F0] border border-[#E8DFD3] flex items-center justify-between">
                    <div>
                      <span className="text-[11px] text-[#7A8B9E] font-medium block">Direct UPI ID</span>
                      <span className="font-bold text-[#0F8B8D] font-mono">disccindia@sbi</span>
                    </div>
                    <button
                      onClick={() => handleCopy("disccindia@sbi", "upi")}
                      className="p-1.5 rounded-lg hover:bg-white text-[#5B6B7C] cursor-pointer"
                    >
                      {copiedField === "upi" ? <Check className="w-4 h-4 text-[#0F8B8D]" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>

                </div>

                <div className="pt-2 text-xs text-[#5B6B7C] leading-relaxed">
                  After completing your transfer, kindly email your transaction reference and PAN to <strong>disccindia@gmail.com</strong> or WhatsApp to <strong>7007453168</strong> to receive your 80G receipt.
                </div>

              </div>

            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
