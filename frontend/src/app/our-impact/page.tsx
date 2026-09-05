import { RevealStagger } from "@/components/ui/reveal";

export default function ImpactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <RevealStagger className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sdg-3)]/10 text-[var(--sdg-3)] text-sm font-semibold tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-[var(--sdg-3)]"></span> Our Impact
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Numbers that tell a <span className="text-[var(--sdg-3)]">story of change.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          For over 30 years, DISCC has been working relentlessly to uplift the marginalized. Here is a glimpse of our journey so far.
        </p>
      </RevealStagger>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {[
          { stat: "50,000+", label: "Lives Touched", color: "var(--sdg-1)" },
          { stat: "2,000+", label: "Children Educated", color: "var(--sdg-4)" },
          { stat: "15+", label: "Communities Empowered", color: "var(--sdg-10)" }
        ].map((item, i) => (
          <RevealStagger key={i} delay={i * 0.1} className="p-8 rounded-[2rem] bg-card border shadow-sm space-y-4">
            <h2 className="text-5xl font-black" style={{ color: item.color }}>{item.stat}</h2>
            <p className="text-lg font-medium text-muted-foreground">{item.label}</p>
          </RevealStagger>
        ))}
      </div>
    </div>
  );
}
