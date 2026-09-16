import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { ShieldCheck, Building2, FileCheck, Award, Heart, Mail, Phone, ExternalLink, Download } from "lucide-react";

export const metadata = {
  title: "FCRA Registration and Statutory Compliance - DISCC India",
  description: "Official statutory certifications, FCRA international contribution eligibility, Section 80G tax exemptions, and annual audited compliance for DEVA International Society for Child Care, Varanasi.",
};

export default function FcraPage() {
  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-16">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Government of India Statutory Certifications
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-secondary tracking-tight max-w-5xl">
            FCRA Registration and Tax Exemption
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
            Complete institutional overview of our legal registrations, foreign remittance eligibility, Section 80G tax exemptions, and 32 years of audited annual filings in Varanasi.
          </p>
        </RevealStagger>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 border-t border-border/70 pt-12">
          
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <FileCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">Ministry of Home Affairs</span>
              <h3 className="text-xl font-display font-black text-secondary">FCRA Registration</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Registered under the Foreign Contribution Regulation Act (FCRA) since 1991, permitting DISCC to accept international grants and donations from European, American, and global benefactors.
              </p>
            </div>
            <div className="pt-3 border-t border-border/60 text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Active and Validated</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
                <Building2 className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">Societies Registration</span>
              <h3 className="text-xl font-display font-black text-secondary">Act XXI of 1860</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Formally incorporated under the Societies Registration Act XXI of 1860 with Registration Number 1294/1990-1991 in Varanasi, Uttar Pradesh, Republic of India.
              </p>
            </div>
            <div className="pt-3 border-t border-border/60 text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Reg. No. 1294/1990-1991</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-accent/20 text-secondary flex items-center justify-center">
                <Award className="w-6 h-6 text-secondary" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">Income Tax Dept of India</span>
              <h3 className="text-xl font-display font-black text-secondary">Section 80G & 12A</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Eligible for maximum tax deductions under Section 80G and permanent charitable exemption under Section 12A of the Income Tax Act, 1961 for Indian individuals and corporate donors.
              </p>
            </div>
            <div className="pt-3 border-t border-border/60 text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>Tax Deductible Receipts</span>
            </div>
          </div>

          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">Ministry of Social Justice</span>
              <h3 className="text-xl font-display font-black text-secondary">The National Trust</h3>
              <p className="text-xs text-muted-foreground leading-relaxed">
                Statutory recognition for the welfare of persons with Autism, Cerebral Palsy, Mental Retardation and Multiple Disabilities under Government of India leadership.
              </p>
            </div>
            <div className="pt-3 border-t border-border/60 text-[11px] font-semibold text-emerald-600 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4" />
              <span>National Trust Partner</span>
            </div>
          </div>

        </div>

        {/* Banking Remittance Channels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Domestic Bank Account */}
          <div className="lg:col-span-6 bg-card rounded-3xl p-8 border border-border space-y-5 shadow-xs">
            <div className="border-b border-border pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-primary block">Domestic Remittances (Within India)</span>
              <h3 className="font-display font-bold text-2xl text-secondary mt-1">Kotak Mahindra Bank</h3>
              <p className="text-xs text-muted-foreground">For NEFT, RTGS, IMPS, and Cheque Deposits</p>
            </div>

            <div className="divide-y divide-border/60 text-sm space-y-1">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-muted-foreground">Account Name:</span>
                <span className="font-bold text-secondary text-right">Deva International Society for Child Care</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-muted-foreground">Account Number:</span>
                <span className="font-mono font-bold text-primary text-base">4112108180</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-muted-foreground">IFSC Code:</span>
                <span className="font-mono font-bold text-secondary">KKBK0005291</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-muted-foreground">Account Type:</span>
                <span className="font-semibold text-secondary">Current Account</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-muted-foreground">Branch:</span>
                <span className="text-secondary text-right font-medium">Bhelupur / Varanasi Branch, UP</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-muted/50 border border-border text-xs text-muted-foreground leading-relaxed">
              Upon completing your domestic transfer, email your transaction UTR reference and PAN card copy to <a href="mailto:disccindia@gmail.com" className="text-primary font-bold underline">disccindia@gmail.com</a> to receive an official 80G tax exemption certificate.
            </div>
          </div>

          {/* International Remittances */}
          <div className="lg:col-span-6 bg-secondary text-white rounded-3xl p-8 space-y-5 shadow-xl">
            <div className="border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-accent block">International Remittances (FCRA Designated)</span>
              <h3 className="font-display font-bold text-2xl text-white mt-1">Foreign Contributions</h3>
              <p className="text-xs text-white/70">In Compliance with Ministry of Home Affairs, Govt of India</p>
            </div>

            <div className="divide-y divide-white/10 text-sm space-y-1 text-white/90">
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-white/70">Designated Bank:</span>
                <span className="font-bold text-white text-right">State Bank of India (SBI)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-white/70">Designated Branch:</span>
                <span className="font-semibold text-white text-right">New Delhi Main Branch (NDMB)</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-white/70">Beneficiary:</span>
                <span className="font-bold text-accent text-right">DEVA International Society for Child Care</span>
              </div>
              <div className="py-2.5 flex justify-between items-center">
                <span className="text-white/70">Purpose Code:</span>
                <span className="font-semibold text-white">Charitable Child Rehabilitation & Education</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-white/10 border border-white/10 text-xs text-white/80 leading-relaxed">
              Foreign donors and international institutional partners (including Deva Europe France and University of Wisconsin Oshkosh) should email <a href="mailto:disccindia@gmail.com" className="text-accent font-bold underline">disccindia@gmail.com</a> to obtain specific SWIFT wire instructions for our designated FCRA account prior to initiating international wire transfers.
            </div>
          </div>

        </div>

        {/* Audit Transparency Callout */}
        <div className="bg-card rounded-3xl p-8 md:p-12 border border-border shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-primary">Public Accountability</span>
              <h3 className="font-display font-black text-2xl text-secondary">
                Request Statutory Audited Filings & Annual Reviews
              </h3>
              <p className="text-sm text-muted-foreground max-w-2xl leading-relaxed">
                In compliance with Government of India regulations, DISCC files transparent annual audited statements, donor lists, and balance sheets certified by independent chartered accountants.
              </p>
            </div>
            <Link href="/contact">
              <button className="px-8 py-3.5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md flex items-center gap-2 flex-shrink-0">
                <Download className="w-4 h-4" />
                Request Audited Statements
              </button>
            </Link>
          </div>
        </div>

      </div>
    </div>
  );
}
