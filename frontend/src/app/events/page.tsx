import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Sparkles, ArrowRight, Heart, Users } from "lucide-react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

export const metadata = {
  title: "Events & Workshops - DISCC India",
  description: "Explore ongoing community festivals, masterclasses, Purple Fair 2026, and international study abroad programs hosted by DISCC India in Varanasi.",
};

export default function EventsPage() {
  const events = [
    {
      title: "Purple Fair for Divyangjan 2026",
      category: "Flagship Annual Festival",
      date: "February 2026",
      location: "Deva Center, Varanasi",
      image: CLOUDINARY_IMAGES.purpleFair,
      description: "An exuberant annual carnival bringing together over 500 children with neurodivergent conditions and physical challenges across Eastern UP for games, arts, and talent showcases.",
      status: "Recent Highlight",
    },
    {
      title: "University of Wisconsin Oshkosh Study Abroad",
      category: "Academic & Cultural Exchange",
      date: "Winter Experiential Program",
      location: "Varanasi / DISCC Centers",
      image: CLOUDINARY_IMAGES.foundersMeet,
      description: "Coordinated by Dr. Tulsi Das, offering American psychology and social work scholars deep immersion in community-based rehabilitation, spiritual traditions, and eastern holistic therapies.",
      status: "Ongoing Collaboration",
    },
    {
      title: "Ramayan Theatrical Play by Special Students",
      category: "Cultural Expression",
      date: "January 2026",
      location: "Deva Center Auditorium",
      image: CLOUDINARY_IMAGES.ramayanPlay,
      description: "Special children with autism and intellectual challenges took center stage to perform classical dialogue and dance, breaking stigmas before an audience of community leaders and parents.",
      status: "Milestone Event",
    },
    {
      title: "Sensory Yoga and Motor Well-being Workshops",
      category: "Therapeutic Health",
      date: "Monthly Cohorts",
      location: "Deva Gram (Bachhaon)",
      image: CLOUDINARY_IMAGES.yogaDay,
      description: "Adaptive gentle yoga and sensory regulation workshops designed for children with cerebral palsy and neuromuscular mobility differences.",
      status: "Active Program",
    },
    {
      title: "Parental Psychological Counseling Seminars",
      category: "Family Support",
      date: "Every Alternate Saturday",
      location: "Deva Center Clinical Wing",
      image: CLOUDINARY_IMAGES.drTulsiClinic,
      description: "Free guided clinical sessions led by Dr. Tulsi Das for mothers and caregivers to reduce caregiver fatigue, build behavioral toolkits, and foster home support.",
      status: "Open Registration",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-20">
        {/* Header */}
        <RevealStagger className="w-full space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Events and Initiatives
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-secondary tracking-tight leading-[1.08] max-w-5xl">
            Community Celebrations, Exchanges, and Workshops
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl">
            Join our inclusive gatherings in Varanasi, from cultural festivals and international study cohorts to specialized clinical workshops.
          </p>
        </RevealStagger>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 border-t border-border/70 pt-12">
          {events.map((event, idx) => (
            <RevealStagger key={event.title} delay={idx * 0.08} className="bg-card rounded-3xl overflow-hidden border border-border shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
              <div className="space-y-4">
                <div className="relative w-full aspect-[16/10] overflow-hidden">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute top-3 left-3 bg-secondary/85 backdrop-blur-md text-white text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {event.category}
                  </div>
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-primary" />
                      {event.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-primary" />
                      {event.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-display font-black text-secondary leading-snug group-hover:text-primary transition-colors">
                    {event.title}
                  </h3>

                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              <div className="p-6 pt-0 border-t border-border/40 mt-4 flex items-center justify-between">
                <span className="text-xs font-bold text-primary">
                  {event.status}
                </span>
                <Link href="/contact" className="inline-flex items-center text-xs font-bold uppercase tracking-wider text-secondary hover:text-primary transition-colors">
                  Inquire Now <ArrowRight className="w-3.5 h-3.5 ml-1" />
                </Link>
              </div>
            </RevealStagger>
          ))}
        </div>

        {/* Action Banner */}
        <div className="rounded-3xl bg-secondary text-white p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl font-display font-black">
              Host or Volunteer at a DISCC Event
            </h3>
            <p className="text-sm text-white/80 max-w-xl">
              Are you an artist, medical professional, teacher, or community organization interested in organizing an event for special children? Reach out to collaborate.
            </p>
          </div>
          <Link href="/contact">
            <Button size="lg" className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase text-xs tracking-wider px-8 h-12 shadow-lg">
              Partner With Us
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
