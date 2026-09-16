import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Heart } from "lucide-react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

export default function StoriesPage() {
  const authenticStories = [
    {
      title: "Purple Fair 2026: Celebrating Divyangjan Abilities",
      category: "Community Inclusion",
      image: CLOUDINARY_IMAGES.purpleFair,
      summary: "Bringing together hundreds of neurodivergent children, parents, and volunteers across Varanasi for an exuberant display of artistic talent, sports, and joy.",
      date: "February 2026"
    },
    {
      title: "From Street Corner to Stage: The Ramayan Play",
      category: "Cultural Expression",
      image: CLOUDINARY_IMAGES.ramayanPlay,
      summary: "Children with autism and intellectual challenges at the Deva Center mastered classical dialogue and movement to deliver an awe-inspiring theatrical performance.",
      date: "January 2026"
    },
    {
      title: "Jadugar O.P. Sharma Magic Day at Deva Center",
      category: "Joy & Recreation",
      image: CLOUDINARY_IMAGES.magicShow,
      summary: "Renowned magician Jadugar O.P. Sharma hosted a specialized interactive illusion showcase creating unforgettable wonder for special students and staff.",
      date: "December 2025"
    },
    {
      title: "World Yoga Day: Sensory Calming and Physical Healing",
      category: "Therapeutic Health",
      image: CLOUDINARY_IMAGES.yogaDay,
      summary: "Adapting ancient yogic breathing and gentle asanas for children with physical mobility limitations and cerebral palsy to improve motor control.",
      date: "June 2025"
    },
    {
      title: "Republic Day in Varanasi: Pride, Belonging, and Hope",
      category: "Civic Inclusion",
      image: CLOUDINARY_IMAGES.republicDay,
      summary: "Deva children unfurled the tricolor, celebrated national pride, and demonstrated that every child belongs at the heart of our democracy.",
      date: "January 2026"
    },
    {
      title: "Empowering Rural Families in Bachhaon Village",
      category: "Rural Outreach",
      image: CLOUDINARY_IMAGES.communityProgram,
      summary: "How regular counseling and physical therapy at Deva Gram removed superstitious stigma and gave rural families pride in their children.",
      date: "November 2025"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-24">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Impact in Action
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight leading-[1.05] max-w-5xl">
            Stories of Courage, Inclusion, and Triumph
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal pt-2 max-w-4xl">
            Real narratives from our students, families, and therapists across 32 years of humanitarian service in Varanasi.
          </p>
        </RevealStagger>

        {/* Stories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-border/70 pt-16 w-full">
          {authenticStories.map((story, i) => (
            <RevealStagger key={story.title} delay={i * 0.08} className="p-6 rounded-3xl bg-card border border-border shadow-xs space-y-5 flex flex-col justify-between group hover:shadow-md transition-shadow">
              <div className="space-y-4">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden shadow-xs">
                  <Image
                    src={story.image}
                    alt={story.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-secondary/90 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur-sm">
                    {story.category}
                  </div>
                </div>

                <div className="space-y-2">
                  <span className="text-xs text-muted-foreground block">{story.date}</span>
                  <h3 className="text-xl font-display font-bold text-secondary group-hover:text-primary transition-colors leading-snug">
                    {story.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {story.summary}
                  </p>
                </div>
              </div>

              <div className="pt-2 border-t border-border/60">
                <Link href="/contact" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-primary group-hover:text-secondary transition-colors">
                  Read full feature <ArrowRight className="w-4 h-4 ml-1.5" />
                </Link>
              </div>
            </RevealStagger>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="bg-secondary rounded-3xl p-8 md:p-12 text-white flex flex-col sm:flex-row items-center justify-between gap-6 w-full">
          <div className="space-y-2">
            <h3 className="font-display font-bold text-2xl">Want to Share or Feature a Story?</h3>
            <p className="text-xs text-white/70">Connect with our communications desk in Varanasi.</p>
          </div>
          <Link href="/contact">
            <Button className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-6 h-12">
              Contact Communications Desk
            </Button>
          </Link>
        </div>

      </div>
    </div>
  );
}
