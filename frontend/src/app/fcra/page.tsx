"use client";

import Link from "next/link";
import {
  ShieldCheck,
  Building2,
  FileCheck,
  Award,
  Heart,
  Mail,
  Phone,
  ExternalLink,
  Copy,
  Check
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export default function FcraPage() {
  const [copied, setCopied] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopied(id);
    setTimeout(() => setCopied(null), 2500);
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#FFFAF2]">
      {/* 1. Header */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#FFEFE0]/60 to-[#FFFAF2] relative">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-4">
              Statutory Governance & Certifications
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.1]">
              FCRA Registration & Tax Exemption
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-text leading-relaxed max-w-[60ch]">
              Complete institutional transparency of our legal registrations, foreign remittance compliance, Section 80G tax exemptions, and annual audited filings.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Four Pillars of Statutory Compliance */}
      <section className="w-full py-16 md:py-24 bg-white border-y border-border/70 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-3xl bg-[#FFFAF2] border border-border/80 shadow-soft flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                  <FileCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                  Ministry of Home Affairs
                </span>
                <h3 className="text-xl font-bold font-heading text-foreground">
                  FCRA Registration
                </h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Registered under the Foreign Contribution Regulation Act (FCRA) since 1991, permitting DISCC to accept international grants from European, American, and global donors.
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 text-xs font-bold text-[#0F8B8D] flex items-center gap-1.5 mt-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Active & Validated</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFAF2] border border-border/80 shadow-soft flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#F5A524]/15 text-[#F5A524] flex items-center justify-center">
                  <Building2 className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                  Societies Registration
                </span>
                <h3 className="text-xl font-bold font-heading text-foreground">
                  Act XXI of 1860
                </h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Formally incorporated under Societies Registration Act XXI of 1860 with Reg No 1294/1990-1991 in Varanasi, Uttar Pradesh, Republic of India.
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 text-xs font-bold text-[#0F8B8D] flex items-center gap-1.5 mt-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Reg. No. 1294/1990-1991</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFAF2] border border-border/80 shadow-soft flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#EE6C4D]/15 text-[#EE6C4D] flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                  Income Tax Department
                </span>
                <h3 className="text-xl font-bold font-heading text-foreground">
                  Section 80G & 12A
                </h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Eligible for 50% tax deductions under Section 80G and permanent charitable exemption under Section 12A of the Income Tax Act, 1961.
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 text-xs font-bold text-[#0F8B8D] flex items-center gap-1.5 mt-4">
                <ShieldCheck className="w-4 h-4" />
                <span>50% Tax Deductible</span>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-[#FFFAF2] border border-border/80 shadow-soft flex flex-col justify-between">
              <div className="space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-[#8E7CC3]/15 text-[#8E7CC3] flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-primary block">
                  Ministry of Social Justice
                </span>
                <h3 className="text-xl font-bold font-heading text-foreground">
                  The National Trust
                </h3>
                <p className="text-xs text-muted-text leading-relaxed">
                  Statutory registration for the welfare of persons with Autism, Cerebral Palsy, Mental Retardation and Multiple Disabilities.
                </p>
              </div>
              <div className="pt-4 border-t border-border/60 text-xs font-bold text-[#0F8B8D] flex items-center gap-1.5 mt-4">
                <ShieldCheck className="w-4 h-4" />
                <span>National Trust Certified</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Foreign Donor Wire Remittance Notice */}
      <section className="w-full py-20 bg-[#FFEFE0] relative">
        <div className="container-custom max-w-4xl">
          <div className="p-8 sm:p-12 rounded-3xl bg-white border border-border/80 shadow-soft space-y-6">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary">
                International Remittance Guidelines
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold font-heading text-foreground mt-1">
                Foreign Contribution (FCRA) Bank Account
              </h2>
              <p className="text-sm text-muted-text mt-2 leading-relaxed">
                As mandated by the Government of India (MHA), all foreign grants and philanthropic remittances must be routed through the dedicated FCRA Main Account at the State Bank of India, New Delhi Main Branch.
              </p>
            </div>

            <div className="divide-y divide-border/60 text-sm">
              <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-xs text-muted-text font-medium">Beneficiary Name:</span>
                <span className="font-bold text-foreground">Deva International Society for Child Care</span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-xs text-muted-text font-medium">Designated Bank:</span>
                <span className="font-bold text-foreground">State Bank of India (SBI)</span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-xs text-muted-text font-medium">Designated Branch:</span>
                <span className="font-bold text-foreground">New Delhi Main Branch, 11 Sansad Marg, New Delhi 110001</span>
              </div>

              <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                <span className="text-xs text-muted-text font-medium">SWIFT Code:</span>
                <span className="font-mono font-bold text-primary">SBININBB104</span>
              </div>
            </div>

            <div className="pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-muted-text">
                For foreign wiring advice or remittance coordination, please email: <span className="font-bold text-foreground">disccindia@gmail.com</span>
              </p>
              <Link href="/contact">
                <Button variant="default" size="sm" className="rounded-full">
                  Contact Foreign Desk
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
