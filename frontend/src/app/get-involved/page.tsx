import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function GetInvolvedPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <RevealStagger className="space-y-6 max-w-3xl text-center mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sdg-17)]/10 text-[var(--sdg-17)] text-sm font-semibold tracking-wide uppercase mx-auto">
          <span className="w-2 h-2 rounded-full bg-[var(--sdg-17)]"></span> Get Involved
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Join the <span className="text-[var(--sdg-17)]">Movement.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          It takes a localized community with globalized expertise to humanise DEVAs. Partner with us, volunteer, or support our programs.
        </p>
      </RevealStagger>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
        <RevealStagger delay={0.1} className="p-12 rounded-[2rem] bg-card border shadow-sm space-y-6 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[var(--sdg-4)]/10 flex items-center justify-center text-[var(--sdg-4)]">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
          </div>
          <h2 className="text-3xl font-bold">Volunteer</h2>
          <p className="text-muted-foreground">
            Spend your time at the Gangotri School or help us organize community outreach programs.
          </p>
          <Button variant="outline" className="mt-auto rounded-full px-8">Apply Now</Button>
        </RevealStagger>

        <RevealStagger delay={0.2} className="p-12 rounded-[2rem] bg-card border shadow-sm space-y-6 text-center flex flex-col items-center">
          <div className="w-20 h-20 rounded-full bg-[var(--sdg-17)]/10 flex items-center justify-center text-[var(--sdg-17)]">
             <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 4c0-1.1.9-2 2-2"/><path d="M20 2c1.1 0 2 .9 2 2"/><path d="M22 8c0 1.1-.9 2-2 2"/><path d="M16 10c-1.1 0-2-.9-2-2"/><path d="m3 21 8.6-10.4c.5-.7 1.6-.8 2.2-.2l2.8 2.8c.6.6.5 1.7-.2 2.2L6 24"/><path d="M13.6 14.4 9.4 10.2"/></svg>
          </div>
          <h2 className="text-3xl font-bold">Partner with Us</h2>
          <p className="text-muted-foreground">
            Corporate partnerships, academic research, and institutional funding help us scale our impact.
          </p>
          <Link href="/contact" className="mt-auto w-full">
            <Button variant="outline" className="w-full rounded-full">Contact Team</Button>
          </Link>
        </RevealStagger>
      </div>
    </div>
  );
}
