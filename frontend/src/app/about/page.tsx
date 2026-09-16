import Image from "next/image";
import Link from "next/link";
import { RevealStagger } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { BookOpen, Globe2, Scale, MapPin, Phone, Mail, Award, CheckCircle2, Heart } from "lucide-react";
import { db } from "@/lib/firebase-admin";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";
import { AppointmentBookingForm } from "@/components/forms/AppointmentBookingForm";

async function getTeams() {
  try {
    const snapshot = await db.collection("teams").get();
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
  } catch {
    return [];
  }
}

export default async function AboutPage() {
  const leaders = await getTeams();

  const leadershipList = [
    {
      name: "Dr. C. Tulsi Das",
      role: "Founder President & Director",
      desc: "Ph.D. (Psychiatry - Clinical Psychologist). Recipient of Best Professional Psychologist Award from Chief Minister of UP and honored by Prime Minister of India. Over 40 years of pioneering work.",
      image: CLOUDINARY_IMAGES.drTulsiPortrait
    },
    {
      name: "Jean-Max Tassel",
      role: "Chief International Patron",
      desc: "French art historian and philanthropist who met Dr. Tulsi in 1998. Key partner for over 25 years in fostering European-Indian medical and charitable solidarity.",
      image: CLOUDINARY_IMAGES.foundersMeet
    },
    {
      name: "Er. Raaj Deva",
      role: "Director of Operations",
      desc: "Leading daily management, community center extensions, infrastructure modernization, and technological integration across DISCC facilities.",
      image: CLOUDINARY_IMAGES.devaBuilding
    }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 space-y-28">
        
        {/* Header */}
        <RevealStagger className="w-full space-y-6">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            About DISCC India
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black text-secondary tracking-tight leading-[1.05] max-w-5xl">
            Serving the Last, Least, and Lost in Varanasi
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground leading-relaxed font-normal pt-2 max-w-4xl">
            Established in 1991 to bring medical dignity, scientific rehabilitation, and educational hope to children and families with intellectual disabilities.
          </p>
        </RevealStagger>

        {/* Founding Story Section */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center border-t border-border/70 pt-16">
          <RevealStagger className="md:col-span-7 space-y-6 text-foreground/80 text-base md:text-lg leading-relaxed">
            <h2 className="text-3xl font-display font-black text-secondary tracking-tight">
              A Legacy of Compassion and Science
            </h2>
            <p>
              Dr. Chellapilla Tulsi Das was born and brought up in the holy city of Varanasi. Growing up with a deep devotion to community welfare inherited from his mother, he dedicated his clinical academic career to understanding the human mind.
            </p>
            <p>
              While finishing his Doctoral degree in clinical psychology, he had close personal encounters with families struggling under the immense emotional and financial isolation of intellectual disabilities. At the time, Uttar Pradesh had almost no specialized institutions for neurodivergent children.
            </p>
            <p>
              In 1991, DEVA International Society for Child Care (DISCC) was formally founded and registered as a humanitarian Non Governmental Organization. Shortly after, DEVA Center was established as the first comprehensive rehabilitation facility for individuals with intellectual disabilities in eastern Uttar Pradesh.
            </p>
            
            <blockquote className="border-l-4 border-primary pl-6 py-4 my-6 italic text-secondary font-display font-semibold text-xl leading-snug bg-muted/40 rounded-r-2xl">
              "Main akela hi chala tha janib-e-manzil magar<br />
              Log saath aate gaye aur karvan banta gaya"
            </blockquote>

            <p>
              In 1998, Dr. Tulsi met Mr. Jean-Max Tassel, an eminent French art historian. Their cross-cultural friendship laid the foundation for Deva Europe, connecting French, German, and American volunteers with grassroots initiatives in Varanasi for over a quarter of a century.
            </p>
          </RevealStagger>
          
          <RevealStagger delay={0.15} className="md:col-span-5 space-y-4">
            <div className="w-full aspect-[4/5] rounded-3xl overflow-hidden relative shadow-xl border-4 border-white">
              <Image
                src={CLOUDINARY_IMAGES.devaBuilding}
                alt="Deva Center Building in Varanasi"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-5 right-5 text-white">
                <p className="font-display font-bold text-base">Deva Center Headquarters</p>
                <p className="text-xs text-white/80">Kamachha Chungi, Varanasi, India</p>
              </div>
            </div>
            
            <div className="w-full aspect-[16/9] rounded-2xl overflow-hidden relative shadow-md border-2 border-border">
              <Image
                src={CLOUDINARY_IMAGES.drTulsiClinic}
                alt="Dr. Tulsi Clinical Consultation"
                fill
                className="object-cover"
              />
            </div>
          </RevealStagger>
        </div>

        {/* Vision, Mission, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-border/70 pt-16">
          <RevealStagger className="p-8 rounded-3xl bg-card border border-border/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <BookOpen className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">Our Vision</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Every child thrives with dignity. Every person with intellectual differences is treated with reverence, full human rights, and social inclusion.
            </p>
          </RevealStagger>
          
          <RevealStagger delay={0.1} className="p-8 rounded-3xl bg-card border border-border/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">Our Mission</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              To dismantle systemic barriers of poverty and ignorance by pairing clinical expertise with grassroots compassionate care across urban and rural UP.
            </p>
          </RevealStagger>
          
          <RevealStagger delay={0.2} className="p-8 rounded-3xl bg-card border border-border/80 shadow-xs space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-accent/20 text-secondary flex items-center justify-center">
              <Scale className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-display font-black text-secondary uppercase tracking-tight">Our Philosophy</h3>
            <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
              Local wisdom combined with global evidence. We listen to families, respect Indian cultural realities, and apply rigorous modern psychology.
            </p>
          </RevealStagger>
        </div>

        {/* Founder & Leadership */}
        <div id="founder" className="border-t border-border/70 pt-20 space-y-12">
          <RevealStagger className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
              Guidance and Governance
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-black text-secondary tracking-tight">
              Leadership Committed to Service
            </h2>
          </RevealStagger>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {leadershipList.map((leader, i) => (
              <RevealStagger key={leader.name} delay={i * 0.1} className="p-6 bg-card rounded-3xl border border-border/80 shadow-xs space-y-5 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden relative shadow-sm bg-muted/30">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      className="object-contain p-2"
                    />
                  </div>
                  <div>
                    <h4 className="text-xl font-display font-black text-secondary">{leader.name}</h4>
                    <p className="text-xs font-bold uppercase tracking-wider text-primary">{leader.role}</p>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">{leader.desc}</p>
                </div>
              </RevealStagger>
            ))}
          </div>
        </div>

        {/* Contact & Consultation Section */}
        <div id="contact" className="border-t border-border/70 pt-20 pb-10">
          <div className="bg-secondary rounded-3xl p-8 md:p-14 text-white">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
              <div className="lg:col-span-6 space-y-6">
                <span className="text-xs font-bold uppercase tracking-wider text-accent">Contact and Consultations</span>
                <h3 className="text-3xl sm:text-4xl font-display font-black">
                  Visit or Connect With DISCC
                </h3>
                <p className="text-white/80 text-sm md:text-base leading-relaxed">
                  We welcome families, social workers, volunteers, researchers, and donors. Reach out for appointments, student admissions, or general inquiries.
                </p>

                <div className="space-y-4 pt-2 text-sm text-white/90">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
                    <span>B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi, Uttar Pradesh 221010, India</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>Direct Helpline: +91 7007453168</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-accent flex-shrink-0" />
                    <span>disccindia@gmail.com</span>
                  </div>
                </div>

                <div className="pt-4 flex items-center gap-2 text-xs text-white/70">
                  <CheckCircle2 className="w-4 h-4 text-accent" />
                  <span>FCRA Registered Humanitarian Non Governmental Organization</span>
                </div>
              </div>

              {/* Consultation Booking Card */}
              <div className="lg:col-span-6 bg-card text-foreground rounded-2xl p-8 shadow-xl border border-border space-y-4">
                <h4 className="font-display font-bold text-xl text-secondary">
                  Request an Appointment or Information
                </h4>
                <p className="text-xs text-muted-foreground">
                  Leave your details and our coordinator in Varanasi will connect with you promptly.
                </p>

                <AppointmentBookingForm />
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
