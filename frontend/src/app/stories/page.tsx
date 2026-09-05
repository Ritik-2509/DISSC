import { RevealStagger } from "@/components/ui/reveal";

export default function StoriesPage() {
  return (
    <div className="flex flex-col min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <RevealStagger className="space-y-6 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--sdg-4)]/10 text-[var(--sdg-4)] text-sm font-semibold tracking-wide uppercase">
          <span className="w-2 h-2 rounded-full bg-[var(--sdg-4)]"></span> Stories
        </div>
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-[1.1]">
          Voices from the <span className="text-[var(--sdg-4)]">ground.</span>
        </h1>
        <p className="text-xl text-muted-foreground leading-relaxed">
          Read the inspiring journeys of individuals and communities whose lives have been transformed through our collective efforts.
        </p>
      </RevealStagger>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <RevealStagger key={i} delay={i * 0.05} className="space-y-6 group cursor-pointer">
            <div className="w-full aspect-[4/3] rounded-[1.5rem] bg-muted overflow-hidden relative">
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-medium">Image Placeholder</div>
            </div>
            <div className="space-y-2">
              <span className="text-xs font-bold text-[var(--sdg-4)] uppercase tracking-wider">Education</span>
              <h3 className="text-2xl font-bold group-hover:text-[var(--sdg-4)] transition-colors">A Journey of Transformation</h3>
              <p className="text-muted-foreground line-clamp-2">
                Discover how access to basic education and resources helped entirely change the trajectory of this community.
              </p>
            </div>
          </RevealStagger>
        ))}
      </div>
    </div>
  );
}
