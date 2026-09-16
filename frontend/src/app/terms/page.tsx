import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { ShieldCheck, FileText, Scale, Heart, Mail, Phone, MapPin } from "lucide-react";

export const metadata = {
  title: "Terms and Conditions - DISCC India",
  description: "Official legal terms, donation policies, clinical guidelines, and operational frameworks for DEVA International Society for Child Care, Varanasi, India.",
};

export default function TermsPage() {
  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-16">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Legal Framework and Governance
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-secondary tracking-tight max-w-5xl">
            Terms and Conditions
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-4xl">
            Governing rules for institutional transparency, donor contributions, clinical consultations, and community welfare programs operated by DEVA International Society for Child Care (DISCC).
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs text-muted-foreground">
            <span className="font-semibold text-secondary">Effective Date:</span>
            <span>January 1, 1991 (Updated Fiscal Year 2025-2026)</span>
            <span>•</span>
            <span className="font-semibold text-secondary">Registration No:</span>
            <span>1294/1990-1991 (Societies Registration Act XXI of 1860)</span>
          </div>
        </RevealStagger>

        {/* Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start border-t border-border/70 pt-12">
          {/* Main Legal Sections */}
          <div className="lg:col-span-8 space-y-12 text-sm sm:text-base leading-relaxed text-foreground/85">
            
            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">1</span>
                <span>Institutional Identity & Acceptance</span>
              </h2>
              <p>
                By accessing this website, utilizing our clinical consultation channels, participating in our voluntary programs, or contributing financial support, you agree to comply with and be bound by these Terms and Conditions. DEVA International Society for Child Care (DISCC) is a humanitarian Non Governmental Organization legally registered under the Societies Registration Act XXI of 1860 with its registered headquarters situated at B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi, Uttar Pradesh 221010, India.
              </p>
              <p>
                If you do not accept these terms in their entirety, you should refrain from utilizing our online donation portals or scheduling services through this platform.
              </p>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">2</span>
                <span>Clinical, Psychological, and Assessment Guidelines</span>
              </h2>
              <p>
                The assessment information, therapeutic resources, and consultation schedules provided through DISCC and the Deva Center in Varanasi are intended for clinical psychology rehabilitation, specialized education, and family guidance.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                <li>Preliminary online consultation requests do not establish an emergency psychiatric hotline. For urgent acute crises, families should contact local hospital emergency facilities.</li>
                <li>Individual rehabilitation programs, speech therapy modules, and cognitive training plans are tailored specifically to the diagnosed developmental needs of each child under professional supervision.</li>
                <li>Confidential patient records generated during assessments at Deva Center or Deva Gram Bachhaon are protected in accordance with professional medical and clinical ethics.</li>
              </ul>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">3</span>
                <span>Donations, Tax Benefits, and Statutory Receipts</span>
              </h2>
              <p>
                All charitable contributions submitted to DISCC are committed directly to rehabilitation care, nutritious meals for the Annapurna Center, rural outreach at Deva Gram, and assistive equipment distribution in Varanasi.
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground pl-2">
                <li><strong className="text-secondary">Tax Exemption:</strong> Domestic donations within the Republic of India qualify for tax deductions under Section 80G and Section 12A of the Income Tax Act, 1961.</li>
                <li><strong className="text-secondary">Receipt Issuance:</strong> To receive a formal 80G tax receipt, donors must transmit their transfer reference number, full name, address, and Permanent Account Number (PAN) to <a href="mailto:disccindia@gmail.com" className="text-primary underline font-semibold">disccindia@gmail.com</a>.</li>
                <li><strong className="text-secondary">Foreign Remittances (FCRA):</strong> Overseas funds are received exclusively in accordance with the Foreign Contribution Regulation Act (FCRA) through statutory authorized banking channels.</li>
                <li><strong className="text-secondary">Refund Policy:</strong> Because funds are disbursed immediately into ongoing therapy, medicine, and food provisions, voluntary charitable donations are non-refundable once processed.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">4</span>
                <span>Intellectual Property and Clinical Research</span>
              </h2>
              <p>
                All research whitepapers by Dr. C. Tulsi Das, adaptive training toolkits, organizational photography from the Purple Fair and Ramayan Plays, event media, and institutional emblems are the exclusive intellectual property of DISCC India or its authenticated collaborative partners.
              </p>
              <p>
                Scholars, universities, and health professionals are permitted to quote excerpts for non-commercial academic research provided clear attribution is given to DISCC India and Dr. C. Tulsi Das.
              </p>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">5</span>
                <span>Child Protection and Volunteer Code of Conduct</span>
              </h2>
              <p>
                DISCC maintains a strict zero-tolerance policy against child abuse, exploitation, discrimination, and neglect. All volunteers, study abroad participants from partnering institutions such as the University of Wisconsin Oshkosh, and field observers must abide by our child protection protocols and Indian statutory laws while present at any DISCC campus.
              </p>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-display font-black text-secondary flex items-center gap-2.5">
                <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">6</span>
                <span>Governing Law and Dispute Resolution</span>
              </h2>
              <p>
                These Terms and Conditions shall be governed by and construed in accordance with the laws of the Republic of India. Any legal actions, proceedings, or disputes arising out of or related to DISCC operations shall be subject to the exclusive jurisdiction of the competent courts in Varanasi, Uttar Pradesh, India.
              </p>
            </section>

          </div>

          {/* Sidebar Summary Card */}
          <div className="lg:col-span-4 space-y-6">
            <div className="p-8 rounded-3xl bg-secondary text-white space-y-6 shadow-xl">
              <div className="flex items-center gap-3 border-b border-white/10 pb-4">
                <ShieldCheck className="w-8 h-8 text-accent flex-shrink-0" />
                <div>
                  <h3 className="font-display font-bold text-lg">Official NGO Charter</h3>
                  <p className="text-xs text-white/70">Registered in Varanasi (1991)</p>
                </div>
              </div>

              <div className="space-y-4 text-xs text-white/80">
                <div>
                  <span className="font-bold text-white block">Statutory Registration:</span>
                  <span>Societies Registration Act XXI of 1860, No. 1294/1990-1991</span>
                </div>
                <div>
                  <span className="font-bold text-white block">Tax Clearances:</span>
                  <span>Section 80G & Section 12A Certified, Income Tax Dept</span>
                </div>
                <div>
                  <span className="font-bold text-white block">International Authorization:</span>
                  <span>FCRA Validated for Foreign Contributions</span>
                </div>
                <div>
                  <span className="font-bold text-white block">Disability Mandate:</span>
                  <span>National Trust Recognized, Ministry of Social Justice</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 space-y-3">
                <Link href="/fcra" className="block">
                  <button className="w-full py-3 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all">
                    View FCRA Registration
                  </button>
                </Link>
                <Link href="/privacy" className="block">
                  <button className="w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 text-white font-bold text-xs uppercase tracking-wider transition-all">
                    Read Privacy Policy
                  </button>
                </Link>
              </div>
            </div>

            {/* Contact Box */}
            <div className="p-6 rounded-3xl bg-muted/40 border border-border space-y-3 text-xs">
              <h4 className="font-display font-bold text-sm text-secondary">Questions on Legal Terms?</h4>
              <p className="text-muted-foreground leading-relaxed">
                Contact our Board of Trustees and administrative coordinators at our Varanasi headquarters:
              </p>
              <div className="space-y-2 pt-1">
                <div className="flex items-center gap-2 text-foreground/80">
                  <Phone className="w-4 h-4 text-primary" />
                  <span>+91 7007453168</span>
                </div>
                <div className="flex items-center gap-2 text-foreground/80">
                  <Mail className="w-4 h-4 text-primary" />
                  <span>disccindia@gmail.com</span>
                </div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
