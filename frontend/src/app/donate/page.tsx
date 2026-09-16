import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Heart, ShieldCheck, CheckCircle2, Copy, Mail, Phone, Building2 } from "lucide-react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-24">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Support Our Mission
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight leading-[1.05] max-w-5xl">
            Invest in Pure Minds and Dignified Futures
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal pt-2 max-w-4xl">
            Every contribution directly powers special rehabilitation therapy, girl child education, and assistive aids for children with intellectual disabilities.
          </p>
        </RevealStagger>

        {/* Donation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-border/70 pt-16">
          {/* Left Column: Official Bank Details */}
          <RevealStagger className="lg:col-span-7 space-y-8">
            <div className="bg-card rounded-3xl p-8 md:p-10 border border-border shadow-sm space-y-6">
              <div className="flex items-center gap-3 border-b border-border pb-4">
                <Building2 className="w-6 h-6 text-primary" />
                <div>
                  <h3 className="font-display font-black text-xl text-secondary">
                    Direct Bank Transfer (NEFT / RTGS / IMPS)
                  </h3>
                  <p className="text-xs text-muted-foreground">Official NGO Bank Account Details</p>
                </div>
              </div>

              <div className="divide-y divide-border/60 text-sm">
                <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-muted-foreground">Account Name:</span>
                  <span className="font-bold text-secondary text-base">Deva International Society for Child Care</span>
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-muted-foreground">Account Number:</span>
                  <span className="font-mono font-bold text-primary text-lg">4112108180</span>
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-muted-foreground">IFSC Code:</span>
                  <span className="font-mono font-bold text-secondary text-base">KKBK0005291</span>
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-muted-foreground">Bank Name:</span>
                  <span className="font-semibold text-secondary">Kotak Mahindra Bank</span>
                </div>

                <div className="py-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
                  <span className="text-muted-foreground">Account Type:</span>
                  <span className="font-semibold text-secondary">Current Account</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-muted/50 border border-border/80 space-y-2 text-xs text-muted-foreground">
                <p className="font-semibold text-secondary flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-primary" />
                  Tax Exemption & Formal Acknowledgment
                </p>
                <p>
                  All donations are eligible for tax benefits under Section 80G and 12A of the Income Tax Act. For overseas contributions, DISCC is registered under the Foreign Contribution Regulation Act (FCRA).
                </p>
                <p>
                  After initiating your transfer, please email your transaction reference and PAN details to <a href="mailto:disccindia@gmail.com" className="text-primary font-bold underline">disccindia@gmail.com</a> to receive your formal 80G receipt.
                </p>
              </div>
            </div>

            {/* Impact tiers */}
            <div className="space-y-4">
              <h4 className="font-display font-bold text-lg text-secondary">
                Where Your Contribution Goes
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-5 rounded-2xl bg-muted/30 border border-border/80 space-y-2">
                  <span className="font-display font-bold text-xl text-primary block">Therapy Sessions</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Speech, physical, and sensory therapy for children with autism and developmental delays.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-muted/30 border border-border/80 space-y-2">
                  <span className="font-display font-bold text-xl text-primary block">Special Education</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Adaptive learning tools, individualized education plans, and specialized teachers.
                  </p>
                </div>
                <div className="p-5 rounded-2xl bg-muted/30 border border-border/80 space-y-2">
                  <span className="font-display font-bold text-xl text-primary block">Girl Child Support</span>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Nutritional support and vocational independence through the Annapurna Center.
                  </p>
                </div>
              </div>
            </div>
          </RevealStagger>

          {/* Right Column: Visual and Direct Contact */}
          <RevealStagger delay={0.15} className="lg:col-span-5 space-y-6">
            <div className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-xl border-4 border-white">
              <Image
                src={CLOUDINARY_IMAGES.heroChildren}
                alt="Children of DISCC India"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/85 via-transparent to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white space-y-1">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Real Impact</span>
                <p className="font-display font-bold text-xl">Every child deserves dignity</p>
                <p className="text-xs text-white/80">Support our 32 year legacy in Varanasi</p>
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-secondary text-white space-y-4">
              <h4 className="font-display font-bold text-lg">Need Assistance With Donating?</h4>
              <p className="text-xs text-white/80 leading-relaxed">
                If you wish to make an international remittance or donate assistive equipment (wheelchairs, orthotics, hearing aids), please contact our team directly.
              </p>
              <div className="space-y-2 pt-1 text-xs text-white/90">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-accent" />
                  <span>Call: +91 7007453168</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-accent" />
                  <span>disccindia@gmail.com</span>
                </div>
              </div>
            </div>
          </RevealStagger>
        </div>

      </div>
    </div>
  );
}
