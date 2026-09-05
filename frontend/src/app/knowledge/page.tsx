import { RevealStagger } from "@/components/ui/reveal";

export default function KnowledgePage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <RevealStagger className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sdg-9)]/10 text-[var(--sdg-9)] text-sm font-semibold tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-[var(--sdg-9)]"></span> Knowledge Hub
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Research, Insights & <span className="text-[var(--sdg-9)]">Resources.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Access our collection of reports, research papers, and toolkits developed over three decades of grassroots work in mental health and community development.
        </p>
      </RevealStagger>
      
      <div className="grid grid-cols-1 gap-4 mt-16 max-w-4xl">
        {[1, 2, 3, 4].map((i) => (
          <RevealStagger key={i} delay={i * 0.1} className="p-6 md:p-8 rounded-[1.5rem] bg-card border shadow-sm flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:border-[var(--sdg-9)] transition-colors cursor-pointer">
            <div className="space-y-2">
              <span className="text-sm font-bold text-muted-foreground uppercase tracking-wider">Annual Report 202{i}</span>
              <h3 className="text-xl font-bold">Impact & Financial Summary</h3>
              <p className="text-muted-foreground line-clamp-2 max-w-2xl">
                A comprehensive look at our programmatic outreach, financial transparency, and strategic goals for the year.
              </p>
            </div>
            <div className="px-6 py-3 rounded-full bg-muted font-medium text-sm whitespace-nowrap group-hover:bg-[var(--sdg-9)] group-hover:text-white transition-colors">
              Download PDF
            </div>
          </RevealStagger>
        ))}
      </div>
    </div>
  );
}
