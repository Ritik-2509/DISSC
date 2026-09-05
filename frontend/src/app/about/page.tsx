import { RevealStagger } from "@/components/ui/reveal";
import { BookOpen, Globe2, Scale } from "lucide-react";

async function getTeams() {
  try {
    const res = await fetch("http://localhost:3001/api/teams", { next: { revalidate: 60 } });
    if (!res.ok) return [];
    return res.json();
  } catch (e) {
    console.error(e);
    return [];
  }
}

export default async function AboutPage() {
  const leaders = await getTeams();

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full space-y-40">
        
        {/* Header */}
        <RevealStagger className="max-w-4xl space-y-8">
          <span className="text-xs font-black tracking-[0.2em] uppercase text-primary border-b-2 border-primary pb-2 inline-block">About DISCC</span>
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-display font-black tracking-tighter leading-[0.85] uppercase">
            Our <br/>Story.
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed font-medium pt-8">
            A child of compassion and deeply rooted community service upbringing.
          </p>
        </RevealStagger>

        {/* Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-24 items-start border-t border-border/50 pt-24">
          <RevealStagger className="space-y-8 text-muted-foreground text-lg leading-relaxed">
            <p>
              Dr. Tulsi was born and brought up in the Holy city of Varanasi. His mother was a highly spiritual lady and growing up Dr. Tulsi inherited her deep devotion and drive for serving the least, last and lost.
            </p>
            <p>
              As Dr. Tulsi was finishing his Doctoral degree in clinical psychology he had a close personal encounter with difficulties of living with children and adults with intellectual difficulty. The emotional and financial burden of this prompted him to take charge at a larger scale and eventually DEVA International Institute of Child Care (DISCC) came into being in 1991.
            </p>
            <p>
              Under the aegis of DISCC, DEVA centre, the first ever institute for rehabilitation of mentally challenged in Uttar Pradesh was opened in the Varanasi city.
            </p>
            <blockquote className="border-l-4 border-primary pl-8 py-6 my-12 italic text-foreground font-display font-medium text-3xl leading-snug">
              "maiñ akelā hī chalā thā jānib-e-manzil magar<br/>
              log saath aate ga.e aur kārvāñ bantā gayā"
            </blockquote>
            <p>
              The initiative though began humbly, attracted patents from across borders. In 1998, Dr. Tulsi met Mr. Jean-Max Tassel, a French art historian. The association has been growing strong for more than 25 years in supporting DISCC.
            </p>
          </RevealStagger>
          
          <RevealStagger delay={0.2} className="w-full aspect-[4/5] rounded-[3rem] overflow-hidden relative shadow-2xl border-4 border-white transform rotate-2 hover:rotate-0 transition-transform duration-700">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src="/images/varanasi_ghats.jpg" 
               alt="Dr. Tulsi / Early Days of DISCC" 
               className="object-cover w-full h-full grayscale hover:grayscale-0 transition-all duration-700"
             />
          </RevealStagger>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-border/50 pt-24">
          <RevealStagger className="space-y-6">
            <div className="flex items-center gap-4 text-[var(--sdg-4)] border-b-2 border-current pb-4">
              <BookOpen className="w-8 h-8" />
              <h3 className="text-3xl font-display font-black tracking-tight uppercase text-foreground">Vision</h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed pt-2">
              Every child thrives. Every community is empowered. Everyone matters.
            </p>
          </RevealStagger>
          
          <RevealStagger delay={0.1} className="space-y-6">
            <div className="flex items-center gap-4 text-[var(--sdg-11)] border-b-2 border-current pb-4">
              <Globe2 className="w-8 h-8" />
              <h3 className="text-3xl font-display font-black tracking-tight uppercase text-foreground">Mission</h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed pt-2">
              We work across communities, institutions and systems to remove barriers, strengthen capabilities and create the conditions in which children and communities can thrive.
            </p>
          </RevealStagger>
          
          <RevealStagger delay={0.2} className="space-y-6">
            <div className="flex items-center gap-4 text-[var(--sdg-16)] border-b-2 border-current pb-4">
              <Scale className="w-8 h-8" />
              <h3 className="text-3xl font-display font-black tracking-tight uppercase text-foreground">Philosophy</h3>
            </div>
            <p className="text-muted-foreground text-lg leading-relaxed pt-2">
              Local wisdom. Global evidence. Systems change. We believe lasting change happens when global knowledge meets local wisdom. We begin by listening to communities and understanding the realities that shape their lives.
            </p>
          </RevealStagger>
        </div>

        {/* Leadership (Fetched from backend) */}
        <div id="leadership" className="border-t border-border/50 pt-40 space-y-20">
          <RevealStagger>
            <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-none">Leadership.</h2>
          </RevealStagger>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-16">
            {leaders.length > 0 ? (
               leaders.map((leader: any, i: number) => (
                <RevealStagger key={leader.id} delay={i * 0.1} className="space-y-6 group">
                  <div className="w-full aspect-[3/4] rounded-[3rem] overflow-hidden relative shadow-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={leader.image || `https://picsum.photos/seed/${leader.name.replace(' ', '')}/800/1000`}
                      alt={leader.name}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-3xl font-display font-bold uppercase">{leader.name}</h4>
                    <p className="text-sm font-black tracking-widest uppercase text-primary">{leader.role}</p>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{leader.bio || leader.desc}</p>
                </RevealStagger>
              ))
            ) : (
              [
                { name: "Dr. Tulsi", role: "Founder", desc: "Visionary clinical psychologist who started DISCC." },
                { name: "Shyamji", role: "Director", desc: "Leading the operations and program expansions." },
                { name: "Jean Max", role: "Chief Patron", desc: "French art historian supporting DISCC for over 25 years." }
              ].map((leader, i) => (
                <RevealStagger key={leader.name} delay={i * 0.1} className="space-y-6 group">
                  <div className="w-full aspect-[3/4] rounded-[3rem] overflow-hidden relative shadow-xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={`https://picsum.photos/seed/${leader.name.replace(' ', '')}/800/1000`}
                      alt={leader.name}
                      className="object-cover w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
                    />
                  </div>
                  <div className="space-y-1">
                    <h4 className="text-3xl font-display font-bold uppercase">{leader.name}</h4>
                    <p className="text-sm font-black tracking-widest uppercase text-primary">{leader.role}</p>
                  </div>
                  <p className="text-muted-foreground text-lg leading-relaxed">{leader.desc}</p>
                </RevealStagger>
              ))
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
