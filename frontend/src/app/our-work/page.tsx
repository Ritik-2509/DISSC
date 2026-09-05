import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BookOpen, TrendingUp, HeartPulse, Building2, ChevronRight } from "lucide-react";
import { db } from "@/lib/firebase-admin";

async function getPrograms() {
  try {
    const snapshot = await db.collection("pages").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch (e) {
    console.error("Failed to fetch programs:", e);
    return [];
  }
}

export default async function OurWorkPage() {
  const programs = await getPrograms();
  const sortedPrograms = programs.sort((a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());

  return (
    <div className="flex flex-col min-h-screen pt-32 pb-40">
      <div className="max-w-7xl mx-auto px-4 md:px-8 w-full space-y-40">
        
        {/* Header */}
        <RevealStagger className="max-w-5xl space-y-8">
          <span className="text-xs font-black tracking-[0.2em] uppercase text-primary border-b-2 border-primary pb-2 inline-block">Our Work</span>
          <h1 className="text-6xl md:text-8xl lg:text-[8rem] font-display font-black tracking-tighter leading-[0.85] uppercase">
            Education <br/>that <span className="text-primary">Opens</span> <br/>Doors.
          </h1>
          <p className="text-2xl text-muted-foreground leading-relaxed font-medium pt-8 max-w-2xl">
            At DISCC, education is seen not simply as a service, but as a pathway to dignity, opportunity and greater participation in society.
          </p>
        </RevealStagger>

        {/* Dynamic Programs */}
        <div className="space-y-40">
          
          {sortedPrograms.length > 0 ? (
             sortedPrograms.map((program: any, i: number) => (
              <div key={program.id} className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <RevealStagger className={`w-full aspect-[4/3] rounded-[3rem] overflow-hidden relative shadow-2xl ${i % 2 !== 0 ? 'md:order-2' : ''}`}>
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src={program.image || `https://picsum.photos/seed/education${i}/1000/800`} alt={program.title} className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700" />
                </RevealStagger>
                <RevealStagger delay={0.1} className={`space-y-8 ${i % 2 !== 0 ? 'md:order-1' : ''}`}>
                  <div className="flex items-center gap-4 text-primary border-b-2 border-primary/20 pb-4 w-fit">
                    <BookOpen className="w-8 h-8" />
                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground uppercase">{program.title}</h2>
                  </div>
                  <div className="prose prose-lg dark:prose-invert text-muted-foreground">
                    <p>{program.content}</p>
                  </div>
                  <Button size="lg" className="h-14 px-8 rounded-full font-bold uppercase tracking-wider group">
                    Learn More <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </RevealStagger>
              </div>
             ))
          ) : (
            // Fallback content if backend is empty
            <>
              {/* Program 1 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <RevealStagger className="order-2 md:order-1 w-full aspect-[4/3] rounded-[3rem] overflow-hidden relative shadow-2xl">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src="/images/education.jpg" alt="Children Education Program" className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700" />
                </RevealStagger>
                <RevealStagger delay={0.1} className="order-1 md:order-2 space-y-8">
                  <div className="flex items-center gap-4 text-[var(--sdg-4)] border-b-2 border-current pb-4 w-fit">
                    <BookOpen className="w-8 h-8" />
                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground uppercase">Children Education Program</h2>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    Investing in Potential. The CEP is one of DISCC's flagship initiatives. It identifies and supports meritorious and deserving students throughout their educational journey, addressing barriers like school fees, books, and uniforms.
                  </p>
                  <Button size="lg" className="h-14 px-8 rounded-full font-bold uppercase tracking-wider group">
                    Learn More <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </RevealStagger>
              </div>

              {/* Program 2 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <RevealStagger className="space-y-8">
                  <div className="flex items-center gap-4 text-[var(--sdg-4)] border-b-2 border-current pb-4 w-fit">
                    <BookOpen className="w-8 h-8" />
                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground uppercase">Gangotri School</h2>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A Bridge to Education. Starting beneath a tree in 1999 along the banks of the Ganga, Gangotri offered a safe place for 30-40 children at a time. It acted as a bridge, moving children from informal learning to mainstream schools.
                  </p>
                  <Button size="lg" className="h-14 px-8 rounded-full font-bold uppercase tracking-wider group">
                    Learn More <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </RevealStagger>
                <RevealStagger delay={0.1} className="w-full aspect-[4/3] rounded-[3rem] overflow-hidden relative shadow-2xl">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src="https://picsum.photos/seed/school/1000/800" alt="Gangotri School" className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700" />
                </RevealStagger>
              </div>

              {/* Program 3 */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
                <RevealStagger className="order-2 md:order-1 w-full aspect-[4/3] rounded-[3rem] overflow-hidden relative shadow-2xl">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src="https://picsum.photos/seed/village/1000/800" alt="Ambedkar School" className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700" />
                </RevealStagger>
                <RevealStagger delay={0.1} className="order-1 md:order-2 space-y-8">
                  <div className="flex items-center gap-4 text-[var(--sdg-4)] border-b-2 border-current pb-4 w-fit">
                    <BookOpen className="w-8 h-8" />
                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground uppercase">Ambedkar School</h2>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    When a community asks, education can begin anywhere. Established in Nakati Raghunathpur village based on community demand, teachers were drawn from the community and trained at the DEVA Centre.
                  </p>
                  <Button size="lg" className="h-14 px-8 rounded-full font-bold uppercase tracking-wider group">
                    Learn More <ChevronRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </RevealStagger>
              </div>
              
              {/* Annapoorna & Helpline */}
              <div className="border-t border-border/50 pt-32 grid grid-cols-1 md:grid-cols-2 gap-20 items-start">
                 <RevealStagger className="bg-muted p-12 rounded-[3rem] space-y-8 h-full">
                  <div className="flex items-center gap-4 text-[var(--sdg-8)] border-b-2 border-black/10 pb-4 w-fit">
                    <TrendingUp className="w-8 h-8" />
                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground uppercase">Annapoorna</h2>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A Space to Learn, Earn and Lead. A vocational training centre for women in Bachhaon village. It encourages women to develop skills, create livelihoods and move towards greater self-reliance, education, and healthcare awareness.
                  </p>
                </RevealStagger>
                <RevealStagger delay={0.1} className="bg-muted p-12 rounded-[3rem] space-y-8 h-full">
                  <div className="flex items-center gap-4 text-[var(--sdg-3)] border-b-2 border-black/10 pb-4 w-fit">
                    <HeartPulse className="w-8 h-8" />
                    <h2 className="text-4xl md:text-5xl font-display font-black tracking-tight text-foreground uppercase">Help Line</h2>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    When someone reaches out, someone responds. A grassroots initiative that acts as an emergency response for assistive devices, medical support, or helping children move away from the streets. It is a doorway where a problem meets a possibility.
                  </p>
                </RevealStagger>
              </div>

              {/* DEVA Centre */}
              <div className="border-t border-border/50 pt-32 grid grid-cols-1 md:grid-cols-12 gap-16 items-center">
                 <RevealStagger className="md:col-span-5 space-y-8">
                  <div className="flex items-center gap-4 text-[var(--sdg-10)] border-b-2 border-current pb-4 w-fit">
                    <Building2 className="w-8 h-8" />
                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-display font-black tracking-tighter text-foreground uppercase leading-[0.9]">DEVA Centre & DEVAGRAM</h2>
                  </div>
                  <p className="text-xl text-muted-foreground leading-relaxed">
                    A Place to Learn, Belong and Grow. Creating a space since 1991 where children with disabilities receive education, rehabilitation, and therapeutic interventions.
                  </p>
                  <Button size="lg" className="h-16 px-10 rounded-full font-bold uppercase tracking-wider bg-foreground text-background hover:bg-foreground/90 transition-transform hover:scale-105">
                    Explore DEVAGRAM
                  </Button>
                </RevealStagger>
                <RevealStagger delay={0.1} className="md:col-span-7 w-full aspect-video rounded-[3rem] overflow-hidden relative shadow-2xl">
                   {/* eslint-disable-next-line @next/next/no-img-element */}
                   <img src="/images/varanasi_ghats.jpg" alt="DEVA Centre Campus" className="object-cover w-full h-full transform hover:scale-105 transition-transform duration-700" />
                </RevealStagger>
              </div>
            </>
          )}
          
        </div>
      </div>
    </div>
  );
}
