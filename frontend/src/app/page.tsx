import { Button } from "@/components/ui/button";
import { RevealStagger } from "@/components/ui/reveal";
import Link from "next/link";
import { Fish, Soup, Activity, Equal, Users } from "lucide-react";
import { db } from "@/lib/firebase-admin";

async function getStories() {
  try {
    const snapshot = await db.collection("blogs").orderBy("publishedAt", "desc").limit(3).get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Failed to fetch stories:", e);
    return [];
  }
}

export default async function Home() {
  const stories = await getStories();
  const recentStories = stories;

  return (
    <div className="flex flex-col min-h-screen">
      {/* Dynamic Hero Section */}
      <section className="relative w-full min-h-[90dvh] flex flex-col justify-center px-4 md:px-8 max-w-7xl mx-auto py-24 overflow-hidden">
        <div className="absolute right-0 top-0 w-1/2 h-full bg-[var(--sdg-14)]/10 -z-10 rounded-l-[100px] hidden md:block"></div>
        <RevealStagger className="max-w-4xl space-y-8 z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--sdg-14)]/20 text-[var(--sdg-14)] text-xs font-bold tracking-[0.2em] uppercase">
            <Fish className="w-4 h-4" /> SDG 14 — Life Below Water
          </div>
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-display font-black tracking-tighter leading-[0.85] text-foreground uppercase">
            Pure Hearts.<br/>
            <span className="text-[var(--sdg-14)]">Purer Minds.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-2xl font-medium pt-6">
            Devtulya (alike Gods), these DEVAs deserve as much of a shot at life as each one of us. Join our mission to empower children.
          </p>
          <div className="flex flex-wrap gap-4 pt-8">
            <Link href="/our-work">
              <Button size="lg" className="h-16 px-10 text-lg font-bold uppercase tracking-wider bg-[var(--sdg-14)] hover:bg-[var(--sdg-14)]/90 text-white rounded-full transition-transform hover:scale-105">
                Discover Our Work
              </Button>
            </Link>
          </div>
        </RevealStagger>
        
        <RevealStagger delay={0.2} className="absolute right-8 top-1/2 -translate-y-1/2 w-4/12 aspect-[3/4] hidden lg:block">
           <div className="w-full h-full rounded-[2rem] overflow-hidden relative shadow-2xl border-4 border-white transform rotate-3 hover:rotate-0 transition-transform duration-500">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src="/images/education.jpg" 
               alt="Varanasi Child" 
               className="object-cover w-full h-full hover:scale-110 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-[var(--sdg-14)]/10 mix-blend-multiply"></div>
           </div>
        </RevealStagger>
      </section>

      {/* A Family & A Community - Grid with SDG 2 (Mustard) and SDG 3 (Green) */}
      <section className="py-32 px-4 md:px-8 bg-[#0A0A0A] text-[#F8F9FA]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Family Card */}
          <RevealStagger className="bg-[var(--sdg-2)] rounded-[3rem] p-12 md:p-16 space-y-12 text-[#0A0A0A] flex flex-col justify-between h-full min-h-[500px] shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center gap-3 border-b-2 border-black pb-4 w-fit">
              <Soup className="w-8 h-8" />
              <span className="text-sm font-black tracking-[0.2em] uppercase">A Family (SDG 2)</span>
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none uppercase">The <br/>Invisible <br/>Burden.</h2>
              <p className="text-xl font-medium opacity-90 max-w-md leading-relaxed">
                The opportunities to have a dignified life keep slipping away as the barriers of poverty, ignorance, inaccessibility, and illness keep piling up.
              </p>
            </div>
          </RevealStagger>

          {/* Community Card */}
          <RevealStagger delay={0.1} className="bg-[var(--sdg-3)] rounded-[3rem] p-12 md:p-16 space-y-12 text-white flex flex-col justify-between h-full min-h-[500px] shadow-2xl transform hover:-translate-y-2 transition-transform duration-500">
            <div className="flex items-center gap-3 border-b-2 border-white pb-4 w-fit">
              <Activity className="w-8 h-8" />
              <span className="text-sm font-black tracking-[0.2em] uppercase">A Community (SDG 3)</span>
            </div>
            <div className="space-y-6">
              <h2 className="text-5xl md:text-7xl font-display font-black tracking-tighter leading-none uppercase">Humanising <br/>DEVAs.</h2>
              <p className="text-xl font-medium opacity-90 max-w-md leading-relaxed">
                It takes a localised community with globalised expertise to humanise DEVAs. We believe lasting change happens when global knowledge meets local wisdom.
              </p>
            </div>
          </RevealStagger>
        </div>
      </section>

      {/* DISCC Section - SDG 5 (Orange-Red) Accent */}
      <section className="py-32 md:py-48 px-4 md:px-8 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
        <RevealStagger className="md:col-span-5 h-[700px] w-full">
          <div className="w-full h-full rounded-[3rem] overflow-hidden relative shadow-2xl group">
             {/* eslint-disable-next-line @next/next/no-img-element */}
             <img 
               src="/images/varanasi_ghats.jpg" 
               alt="Varanasi Community" 
               className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
             />
             <div className="absolute inset-0 bg-[var(--sdg-5)]/20 mix-blend-multiply"></div>
          </div>
        </RevealStagger>

        <RevealStagger delay={0.2} className="md:col-span-7 space-y-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--sdg-5)]/10 text-[var(--sdg-5)] text-xs font-black tracking-[0.2em] uppercase">
            <Equal className="w-4 h-4" /> Approach (SDG 5)
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-display font-black tracking-tighter leading-[0.9] uppercase">
            A 360-degree<br/>support<br/>system.
          </h2>
          <p className="text-2xl text-muted-foreground leading-relaxed max-w-xl">
            Grassroot understanding coupled with scientific knowledge has been the guiding principle for DISCC for more than 30 years.
          </p>
          <div className="pt-8">
             <Link href="/about">
              <Button size="lg" className="h-16 px-10 text-lg font-bold uppercase tracking-wider bg-foreground hover:bg-foreground/90 text-background rounded-full transition-transform hover:scale-105 shadow-xl">Read Our Story</Button>
            </Link>
          </div>
        </RevealStagger>
      </section>

      {/* Stories (Fetched from Backend) - SDG 1 (Red) Theme */}
      <section className="bg-[var(--sdg-1)] text-white py-32 md:py-40 px-4 md:px-8 rounded-t-[4rem]">
        <div className="max-w-7xl mx-auto space-y-24">
          <RevealStagger className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b-2 border-white/30 pb-12">
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8" />
                <span className="text-sm font-black tracking-[0.2em] uppercase">Stories (SDG 1)</span>
              </div>
              <h2 className="text-6xl md:text-8xl font-display font-black tracking-tighter uppercase leading-[0.9]">Here's what<br/>changed.</h2>
            </div>
            <Link href="/stories">
              <Button variant="secondary" className="h-16 px-10 rounded-full bg-white text-[var(--sdg-1)] hover:bg-white/90 text-lg font-bold uppercase tracking-wider transition-transform hover:scale-105">View All Stories</Button>
            </Link>
          </RevealStagger>
          
          {recentStories.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {recentStories.map((story: any, i: number) => (
                <RevealStagger key={story.id} delay={i * 0.1} className="space-y-8 group cursor-pointer">
                  <div className="w-full aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={story.image || "https://picsum.photos/seed/people/800/800"} alt={story.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[var(--sdg-1)]/20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"></div>
                  </div>
                  <div className="space-y-4">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/70">{new Date(story.publishedAt).toLocaleDateString()}</span>
                    <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-tight uppercase">{story.title}</h3>
                    <p className="text-white/80 text-lg line-clamp-3 leading-relaxed">
                      {story.summary || story.content.substring(0, 100) + "..."}
                    </p>
                  </div>
                </RevealStagger>
              ))}
            </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {[
                { title: "Empowering Rural Women", img: "https://picsum.photos/seed/women/800/800" },
                { title: "Education for All", img: "https://picsum.photos/seed/school/800/800" },
                { title: "Community Healthcare", img: "https://picsum.photos/seed/health/800/800" }
              ].map((story, i) => (
                <RevealStagger key={i} delay={i * 0.1} className="space-y-8 group cursor-pointer">
                  <div className="w-full aspect-square rounded-[3rem] overflow-hidden relative shadow-2xl">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={story.img} alt={story.title} className="object-cover w-full h-full transition-transform duration-700 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-[var(--sdg-1)]/20 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-0"></div>
                  </div>
                  <h3 className="text-3xl md:text-4xl font-display font-black tracking-tight leading-tight uppercase">{story.title}</h3>
                  <p className="text-white/80 text-lg line-clamp-3 leading-relaxed">
                    Read about the journey and the impact of the DEVA program on local communities and how lives are changing.
                  </p>
                </RevealStagger>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
