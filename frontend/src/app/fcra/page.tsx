"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Building2,
  FileCheck,
  Award,
  Copy,
  Check,
  Lock,
  ArrowUpRight,
  ExternalLink,
  Landmark,
  FileText,
  BadgeCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FcraPage() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2500);
  };

  const COMPLIANCE_CREDENTIALS = [
    {
      id: "fcra",
      authority: "Ministry of Home Affairs, Govt. of India",
      title: "FCRA Foreign Remittance License",
      act: "Foreign Contribution Regulation Act (FCRA)",
      regNumber: "136550186",
      status: "Valid & Current Since 1991",
      icon: FileCheck,
      accentColor: "from-amber-500/20 to-orange-500/5",
      borderAccent: "hover:border-amber-500",
      sealBadge: "MHA APPROVED",
      description:
        "Legally permits DISCC to receive philanthropic grants and international foreign currency donations from European, American, and global benefactors through the designated SBI New Delhi Main Branch.",
      highlights: [
        "Annual statutory audited returns filed with MHA",
        "Mandatory central SBI remittance routing compliance",
        "Permits foreign institutional & personal humanitarian funding"
      ]
    },
    {
      id: "society",
      authority: "Registrar of Societies, Uttar Pradesh",
      title: "Societies Registration Act XXI of 1860",
      act: "Act XXI of 1860 (Registration No. 1294/1990-1991)",
      regNumber: "1294/1990-1991",
      status: "Incorporated 1990 · Varanasi",
      icon: Building2,
      accentColor: "from-emerald-500/20 to-teal-500/5",
      borderAccent: "hover:border-emerald-500",
      sealBadge: "STATUTORY BODY",
      description:
        "Formally incorporated as a non-profit humanitarian organization in Varanasi. Operates with an independent Governing Board, audited balance sheets, and democratic institutional bylaws.",
      highlights: [
        "Non-profit charter dedicated to neurodivergent children",
        "Registered office at Kamachha & Rural Campus at Bachhaon",
        "Complete annual general meeting & registrar renewal filings"
      ]
    },
    {
      id: "tax-80g",
      authority: "Income Tax Department, Govt. of India",
      title: "Section 80G & 12A Tax Exemptions",
      act: "Income Tax Act, 1961 (Permanent Exemption)",
      regNumber: "AAATD1294RE1991",
      status: "50% Tax Deductible for Donors",
      icon: Award,
      accentColor: "from-blue-500/20 to-cyan-500/5",
      borderAccent: "hover:border-blue-500",
      sealBadge: "80G CERTIFIED",
      description:
        "All donations made by Indian taxpayers, corporate foundations, and CSR entities are eligible for 50% tax deductions under Section 80G. DISCC operates under permanent charitable exemption under Section 12A.",
      highlights: [
        "Direct 50% tax benefit for Indian citizens & companies",
        "Immediate computerized 80G tax receipt issuance",
        "Audited by independent Chartered Accountants annually"
      ]
    },
    {
      id: "national-trust",
      authority: "Ministry of Social Justice & Empowerment",
      title: "The National Trust Statutory License",
      act: "National Trust Act 44 of 1999",
      regNumber: "UP/VAR/NT/1999-04",
      status: "National Trust Certified",
      icon: ShieldCheck,
      accentColor: "from-purple-500/20 to-indigo-500/5",
      borderAccent: "hover:border-purple-500",
      sealBadge: "GOVT REGISTERED",
      description:
        "Officially recognized for the welfare, clinical guardianship, and lifelong rehabilitation of persons with Autism, Cerebral Palsy, Mental Retardation, and Multiple Disabilities.",
      highlights: [
        "Authorized institutional legal guardianship programs",
        "Clinical respite care and sensory habilitation mandate",
        "Recognized by Dept of Empowerment of Persons with Disabilities"
      ]
    }
  ];

  return (
    <div className="w-full flex flex-col items-center bg-[#FBF9F5] text-slate-900 min-h-screen">
      
      {/* 1. Motion Graphics Hero Header */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-[#F3EFE6] via-[#FAF8F3] to-[#FBF9F5] relative overflow-hidden">
        {/* Animated SVG Guilloche Security Pattern in Background */}
        <div className="absolute inset-0 pointer-events-none opacity-35 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 1440 600" fill="none">
            <motion.path
              d="M-100,100 C300,300 600,0 1000,200 C1300,350 1500,100 1600,250"
              stroke="#9A5B32"
              strokeWidth="1.5"
              strokeDasharray="4 8"
              animate={{ pathOffset: [0, 1] }}
              transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            />
            <motion.path
              d="M-50,250 C400,50 700,400 1100,150 C1400,250 1600,100 1700,300"
              stroke="#D97706"
              strokeWidth="1.2"
              strokeDasharray="6 6"
              animate={{ pathOffset: [1, 0] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            />
          </svg>
        </div>

        <div className="container-custom relative z-10 text-center max-w-4xl mx-auto">
          {/* Live Regulatory Compliance Beacon */}
          <motion.div
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 text-[11px] font-bold tracking-widest uppercase mb-6 shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>100% REGULATORY AUDITED · GOVT OF INDIA</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-heading font-black text-slate-900 tracking-tight leading-[1.1] mb-5"
          >
            Statutory Governance & Legal Compliance.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-3xl mx-auto"
          >
            Complete institutional transparency of our official registrations, foreign remittance approval under the Ministry of Home Affairs, Section 80G tax exemptions, and audited public returns since 1991.
          </motion.p>
        </div>
      </section>

      {/* 2. Interactive Motion Graphics Regulatory Dossier (No Boring AI Blocks) */}
      <section className="w-full py-16 md:py-24 bg-white border-y border-[#E5DFD3] relative overflow-hidden">
        {/* Subtle Watermark Grid */}
        <div className="container-custom relative z-10">
          
          {/* Subheading */}
          <div className="max-w-3xl mx-auto text-center mb-14 sm:mb-16">
            <div className="inline-flex items-center justify-center gap-3 mb-3">
              <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#9A5B32]">
                Verified Legal Framework
              </span>
              <span className="w-8 h-[1.5px] bg-[#9A5B32]/40" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 tracking-tight">
              Four Pillars of Statutory Legitimacy.
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2 max-w-xl mx-auto">
              Click any registration number to instantly copy official legal credentials for donor due diligence.
            </p>
          </div>

          {/* Dynamic 2x2 Interactive Security Certificate Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {COMPLIANCE_CREDENTIALS.map((cred, idx) => {
              const IconComp = cred.icon;
              const isCopied = copiedId === cred.id;

              return (
                <motion.div
                  key={cred.id}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.75, delay: idx * 0.12 }}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className={`relative p-5 sm:p-9 rounded-2xl sm:rounded-3xl bg-gradient-to-br from-[#FFFDF9] via-white to-[#FDF8F0] border-2 border-stone-200/90 ${cred.borderAccent} shadow-md hover:shadow-2xl transition-all duration-400 group overflow-hidden flex flex-col justify-between`}
                >
                  {/* Background Holographic Seal Watermark */}
                  <div className="absolute -right-8 -bottom-8 w-44 h-44 rounded-full border border-stone-200/60 pointer-events-none opacity-40 group-hover:opacity-75 group-hover:scale-110 transition-all duration-700 flex items-center justify-center">
                    <IconComp className="w-24 h-24 text-stone-300/40 group-hover:text-amber-500/20 transition-colors" />
                  </div>

                  <div>
                    {/* Top Header: Authority & Seal Badge */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-slate-950 text-amber-300 shadow-xs">
                        <BadgeCheck className="w-3 h-3 text-amber-400" />
                        <span>{cred.sealBadge}</span>
                      </span>

                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                        <span>{cred.status}</span>
                      </div>
                    </div>

                    {/* Ministry Authority & Certificate Title */}
                    <div className="space-y-1 mb-4">
                      <span className="text-[11px] font-extrabold uppercase tracking-wider text-[#9A5B32] block">
                        {cred.authority}
                      </span>
                      <h3 className="text-2xl font-heading font-black text-slate-900 tracking-tight leading-tight group-hover:text-amber-800 transition-colors">
                        {cred.title}
                      </h3>
                      <p className="text-xs text-stone-500 font-medium">
                        {cred.act}
                      </p>
                    </div>

                    {/* Registration Number Copier Box */}
                    <div className="my-5 p-3.5 rounded-2xl bg-stone-100/90 border border-stone-200 flex items-center justify-between gap-3">
                      <div>
                        <span className="block text-[10px] font-bold uppercase tracking-wider text-stone-500">
                          Official Certificate Number
                        </span>
                        <span className="font-mono text-sm sm:text-base font-black text-slate-900">
                          {cred.regNumber}
                        </span>
                      </div>

                      <button
                        onClick={() => handleCopy(cred.regNumber, cred.id)}
                        className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shadow-xs ${
                          isCopied
                            ? "bg-emerald-600 text-white"
                            : "bg-white hover:bg-slate-950 hover:text-white text-slate-900 border border-stone-300"
                        }`}
                        title="Copy to clipboard"
                        aria-label="Copy Certificate Number"
                      >
                        {isCopied ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy</span>
                          </>
                        )}
                      </button>
                    </div>

                    {/* Narrative Description */}
                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed mb-5">
                      {cred.description}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="pt-4 border-t border-stone-200/80 space-y-2 mt-2">
                    {cred.highlights.map((item, hIdx) => (
                      <div key={hIdx} className="flex items-start gap-2 text-xs text-slate-700">
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 3. Official Central SBI FCRA Remittance Terminal */}
      <section className="w-full py-20 bg-[#F6F4EE] relative overflow-hidden">
        <div className="container-custom max-w-4xl relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.8 }}
            className="p-5 sm:p-12 rounded-2xl sm:rounded-3xl bg-white border-2 border-stone-200 shadow-xl space-y-6 sm:space-y-8 relative overflow-hidden"
          >
            {/* Top Vault Indicator */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-stone-200">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-900 flex items-center justify-center shrink-0 shadow-xs">
                  <Landmark className="w-6 h-6 text-amber-700" />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-[#9A5B32]">
                    Designated MHA Remittance Account
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-heading font-black text-slate-900 tracking-tight leading-tight">
                    State Bank of India FCRA Portal
                  </h2>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-300 text-emerald-800 text-xs font-bold w-fit">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Govt. Mandated FCRA Branch</span>
              </div>
            </div>

            <p className="text-sm text-slate-600 leading-relaxed">
              As mandated by the Ministry of Home Affairs, Government of India, all international philanthropic wire transfers, European solidarity donations, and global grants must be routed through the dedicated FCRA Main Account at the State Bank of India, New Delhi Main Branch.
            </p>

            {/* Structured Remittance Ledger */}
            <div className="rounded-2xl bg-stone-50 border border-stone-200 divide-y divide-stone-200 overflow-hidden text-sm">
              <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                  Beneficiary Account Title:
                </span>
                <span className="font-heading font-bold text-slate-900 text-base">
                  Deva International Society for Child Care
                </span>
              </div>

              <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                  Designated Central Bank:
                </span>
                <span className="font-bold text-slate-900">
                  State Bank of India (SBI)
                </span>
              </div>

              <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
                <span className="text-xs text-stone-500 font-semibold uppercase tracking-wider">
                  Designated Central Branch:
                </span>
                <span className="font-medium text-slate-800 text-left sm:text-right sm:max-w-md">
                  New Delhi Main Branch, 11 Sansad Marg, New Delhi - 110001
                </span>
              </div>

              <div className="p-4 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 bg-amber-50/60">
                <span className="text-xs text-amber-900 font-black uppercase tracking-wider">
                  SWIFT Wire Routing Code:
                </span>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-base font-black text-amber-950 tracking-wider">
                    SBININBB104
                  </span>
                  <button
                    onClick={() => handleCopy("SBININBB104", "swift")}
                    className="px-2.5 py-1 rounded-md bg-white border border-amber-300 text-amber-900 text-xs font-bold hover:bg-amber-100 transition-colors cursor-pointer"
                  >
                    {copiedId === "swift" ? "Copied!" : "Copy SWIFT"}
                  </button>
                </div>
              </div>
            </div>

            {/* Bottom Coordination Contact Strip */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-600">
              <p>
                For official foreign remittance wire advice or tax receipt inquiries:{" "}
                <span className="font-bold text-slate-900">disccindia@gmail.com</span>
              </p>
              <Link href="/contact">
                <Button className="rounded-full bg-slate-950 hover:bg-amber-600 text-white font-bold text-xs shadow-md">
                  <span>Contact Foreign Desk</span>
                  <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
