import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { ShieldCheck, Lock, Eye, Database, Heart, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Privacy Policy - DISCC India",
  description: "Official privacy statement and patient confidentiality protocols for DEVA International Society for Child Care, Varanasi, India.",
};

export default function PrivacyPage() {
  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-16">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Data Protection and Ethics
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-secondary tracking-tight max-w-5xl">
            Privacy Policy
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
            How DEVA International Society for Child Care (DISCC) protects patient medical privacy, donor personal details, and clinical rehabilitation information in Varanasi, India.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-secondary">Effective Date:</span>
            <span>January 1, 1991 (Updated Fiscal Year 2025-2026)</span>
            <span>•</span>
            <span className="font-semibold text-secondary">Standard:</span>
            <span>Clinical Confidentiality & Indian Information Technology Act</span>
          </div>
        </RevealStagger>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-border/70 pt-12">
          {/* Main Content Sections */}
          <div className="lg:col-span-8 space-y-12 text-sm sm:text-base leading-relaxed text-foreground/85">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                <span>Our Privacy Commitment</span>
              </h2>
              <p>
                DEVA International Society for Child Care (DISCC) is fundamentally committed to protecting the privacy, dignity, and confidential medical history of the children, families, volunteers, and benefactors who participate in our mission. We strictly hold ourselves to clinical psychology ethics and the statutory provisions of the Digital Personal Data Protection Act of India.
              </p>
              <p>
                We do not sell, rent, commercialize, or trade personal data to third-party commercial marketing agencies under any circumstances.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                <span>Patient and Clinical File Confidentiality</span>
              </h2>
              <p>
                Families seeking rehabilitation assessments, parental guidance, or specialized therapies at the Deva Center or Deva Gram Bachhaon entrust us with sensitive clinical information regarding their children.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                <li><strong className="text-secondary">Diagnostic Records:</strong> Clinical psychology files, IQ assessments, speech pathology reports, and individualized education plans (IEPs) are accessible solely by certified clinical practitioners and authorized therapists.</li>
                <li><strong className="text-secondary">Anonymized Academic Research:</strong> When case studies are published by Dr. C. Tulsi Das or referenced in scholarly research, all names, residential identifiers, and recognizable attributes are rigorously anonymized.</li>
                <li><strong className="text-secondary">Consent for Media:</strong> Event photographs from the Purple Fair, Ramayan plays, and vocational exhibitions are published exclusively with parental or guardian consent for advocacy and celebrating child inclusion.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                <span>Information We Collect From Donors & Inquiries</span>
              </h2>
              <p>
                When you submit an appointment request, contact our administration, or donate via bank transfer, we collect:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                <li><strong className="text-secondary">Contact Information:</strong> Full name, telephone number, email address, and postal address.</li>
                <li><strong className="text-secondary">Statutory Tax Details:</strong> Permanent Account Number (PAN) for Indian donors requiring formal 80G and 12A tax exemption receipts, as mandated by the Income Tax Department of India.</li>
                <li><strong className="text-secondary">Transaction Verification:</strong> Bank transfer reference number, remittance amount, and donor preferred program allocation (e.g. Annapurna Center, Deva Center, or Help Line).</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</span>
                <span>Data Security and Cloud Storage</span>
              </h2>
              <p>
                All digital submissions received through this platform and appointment records are secured utilizing 256-bit SSL encryption. Data storage is hosted within enterprise cloud environments compliant with modern security certifications. Access controls restrict file modifications exclusively to verified administrative officers in Varanasi.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">5</span>
                <span>Donor Rights & Information Updates</span>
              </h2>
              <p>
                Donors and families hold the right at any time to:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                <li>Request a copy of their stored contact records.</li>
                <li>Update or correct their mailing preferences, address, or phone number.</li>
                <li>Opt out of newsletter updates, annual impact reports, or event invites.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">6</span>
                <span>Grievance Officer and Communications</span>
              </h2>
              <p>
                For questions regarding patient confidentiality, donor records, or data protection practices, please contact our designated Grievance Coordinator:
              </p>
              <div className="p-6 rounded-2xl bg-card border border-border space-y-2">
                <p className="font-bold text-secondary">Director of Operations, DISCC India</p>
                <p className="text-xs text-muted-foreground">DEVA International Society for Child Care</p>
                <p className="text-xs text-muted-foreground">B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi, UP - 221010, India</p>
                <p className="text-xs text-muted-foreground">Email: <a href="mailto:disccindia@gmail.com" className="text-primary font-bold underline">disccindia@gmail.com</a> | Helpline: +91 7007453168</p>
              </div>
            </section>

          </div>

          {/* Sidebar Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-secondary text-white space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <Lock className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-lg">Strict Privacy Pledges</h3>
                  <p className="text-xs text-white/70">Uncompromised Ethics</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-white/80">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>No commercial sale or rental of donor data.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Confidentiality of special child medical records.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Statutory FCRA & 80G audit compliance with Govt of India.</span>
                </div>
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" />
                  <span>Immediate fulfillment of opt-out requests.</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link href="/terms" className="block">
                  <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all">
                    View Terms and Conditions
                  </button>
                </Link>
                <Link href="/fcra" className="block">
                  <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all">
                    View FCRA Certification
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
