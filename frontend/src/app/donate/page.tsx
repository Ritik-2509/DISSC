import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

export default function DonatePage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <RevealStagger className="space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sdg-1)]/10 text-[var(--sdg-1)] text-sm font-semibold tracking-wide uppercase">
            <span className="w-2 h-2 rounded-full bg-[var(--sdg-1)]"></span> Support Us
          </div>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
            Your contribution makes a <span className="text-[var(--sdg-1)]">difference.</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Every donation directly supports our education programs, healthcare initiatives, and rehabilitation centers for DEVAs.
          </p>
          
          <div className="p-8 rounded-[2rem] bg-muted space-y-6">
            <h3 className="text-2xl font-bold">Bank Details (India)</h3>
            <div className="space-y-2">
              <p><span className="font-medium">Account Name:</span> DISCC</p>
              <p><span className="font-medium">Bank Name:</span> State Bank of India</p>
              <p><span className="font-medium">Account Number:</span> XXXXXX1234</p>
              <p><span className="font-medium">IFSC Code:</span> SBIN000XXXX</p>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              All donations are eligible for tax exemption under Section 80G of the Income Tax Act.
            </p>
          </div>
        </RevealStagger>
        
        <RevealStagger delay={0.2} className="w-full h-full min-h-[500px] rounded-[2rem] overflow-hidden relative shadow-2xl">
           {/* eslint-disable-next-line @next/next/no-img-element */}
           <img 
             src="https://loremflickr.com/1000/1200/varanasi,hands" 
             alt="Helping hands" 
             className="object-cover w-full h-full"
           />
           <div className="absolute inset-0 bg-[var(--sdg-1)]/20 mix-blend-multiply"></div>
        </RevealStagger>
      </div>
    </div>
  );
}
