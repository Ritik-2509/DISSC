import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { FileText, ShieldCheck, Download, BookOpen, Scale, Building2 } from "lucide-react";

export default function KnowledgePage() {
  const documents = [
    {
      title: "Intellectual Disability Management & Rehabilitation in Eastern UP",
      category: "Clinical Psychology Paper",
      author: "Dr. C. Tulsi Das, Ph.D.",
      format: "PDF Whitepaper",
      description: "A foundational clinical study on community based interventions, parental psychological counseling, and multi-disciplinary therapies for children in Varanasi.",
      size: "2.4 MB"
    },
    {
      title: "DISCC Annual Transparency and Programmatic Report",
      category: "Governance & Audited Filings",
      author: "Board of Trustees, DISCC India",
      format: "Annual Review",
      description: "Complete overview of children enrolled across Deva Center, Annapurna Center, and rural centers with detailed operational milestones.",
      size: "4.1 MB"
    },
    {
      title: "Special Education Curriculum Guidelines for Rural Centers",
      category: "Pedagogical Toolkit",
      author: "Deva Institute Faculty",
      format: "Curriculum Guide",
      description: "Adaptive training methodologies developed by DISCC practitioners for teaching non-verbal students, sensory modulation, and functional life skills.",
      size: "1.8 MB"
    },
    {
      title: "FCRA Compliance & 80G Statutory Exemption Certificates",
      category: "Statutory Documentation",
      author: "Ministry of Home Affairs & Income Tax Dept, India",
      format: "Official Filing",
      description: "Official certifications validating foreign contribution eligibility (FCRA) and donor tax-deductibility under Section 80G and 12A.",
      size: "1.2 MB"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-16">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Knowledge and Transparency
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight leading-[1.05] max-w-5xl">
            Clinical Research, Audits, and Resources
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal pt-2 max-w-4xl">
            Open access publications, clinical research papers by Dr. Tulsi, and audited compliance reports for institutional scrutiny.
          </p>
        </RevealStagger>

        {/* Resources List - Fluid 2-column Grid for Wide Screens */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 border-t border-border/70 pt-12 w-full">
          {documents.map((doc, i) => (
            <RevealStagger
              key={doc.title}
              delay={i * 0.08}
              className="p-8 rounded-3xl bg-card border border-border shadow-xs flex flex-col justify-between group hover:border-primary/50 transition-all hover:shadow-md gap-6"
            >
              <div className="space-y-3">
                <div className="flex flex-wrap items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <FileText className="w-4 h-4 flex-shrink-0" />
                  <span>{doc.category}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-muted-foreground">{doc.author}</span>
                </div>
                <h3 className="text-xl md:text-2xl font-display font-bold text-secondary leading-snug">
                  {doc.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {doc.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border/60">
                <span className="text-xs font-semibold text-muted-foreground">{doc.size} • {doc.format}</span>
                <Link href="/contact">
                  <Button variant="outline" className="rounded-full border-border hover:border-primary text-secondary hover:text-primary font-bold text-xs uppercase tracking-wider px-6 h-11 flex items-center gap-2">
                    <Download className="w-4 h-4" />
                    Request Copy
                  </Button>
                </Link>
              </div>
            </RevealStagger>
          ))}
        </div>

        {/* Accountability Box */}
        <div className="bg-muted/40 rounded-3xl p-8 md:p-12 border border-border/80 space-y-4 w-full">
          <div className="flex items-center gap-3 text-secondary font-display font-bold text-xl">
            <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
            <span>Complete Statutory and Ethical Integrity</span>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed max-w-4xl">
            Deva International Society for Child Care is registered under the Societies Registration Act XXI of 1860 with Registration No. 1294/1990-1991. We maintain transparent audited accounts every fiscal year, submit annual returns to the Government of India, and abide by the highest standards of financial ethics.
          </p>
        </div>

      </div>
    </div>
  );
}
