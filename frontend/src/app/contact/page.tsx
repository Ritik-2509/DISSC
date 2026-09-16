import Link from "next/link";
import { Phone, Mail, MapPin, Clock, ShieldCheck, Heart } from "lucide-react";
import { AppointmentBookingForm } from "@/components/forms/AppointmentBookingForm";
import { RevealStagger } from "@/components/ui/reveal";

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen pt-12 pb-32 bg-background text-foreground">
      <div className="w-full px-4 sm:px-8 lg:px-12 xl:px-16 2xl:px-20 space-y-16">
        
        {/* Header */}
        <RevealStagger className="space-y-4">
          <span className="text-xs font-bold uppercase tracking-wider text-primary border-b-2 border-primary/30 pb-1 inline-block">
            Connect With DISCC India
          </span>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-display font-black text-secondary tracking-tight">
            Schedule an Appointment or Send an Inquiry
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed">
            Our clinical experts and administrative team in Varanasi are available to assist with patient rehabilitation assessments, international partnerships, volunteer placements, and general questions.
          </p>
        </RevealStagger>

        {/* Two Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Contact Details Card */}
          <RevealStagger className="lg:col-span-5 bg-secondary text-white rounded-3xl p-8 sm:p-10 space-y-8 shadow-xl">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-accent block">Headquarters & Clinic</span>
              <h3 className="font-display font-black text-2xl mt-1">Deva Center, Varanasi</h3>
              <p className="text-xs text-white/70 mt-1">First Clinical Psychology Institute in Eastern Uttar Pradesh</p>
            </div>

            <div className="space-y-6 text-sm">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Registered Address</p>
                  <p className="text-xs text-white/80 leading-relaxed mt-0.5">
                    B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi - 221010, Uttar Pradesh, India
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Direct Phone & WhatsApp</p>
                  <p className="text-xs text-white/80 leading-relaxed mt-0.5">
                    +91 7007453168 / +91 9415204456
                  </p>
                  <p className="text-[11px] text-accent mt-0.5">Mon - Sat: 9:30 AM to 5:30 PM IST</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Official Email</p>
                  <p className="text-xs text-white/80 leading-relaxed mt-0.5">
                    disccindia@gmail.com / info@disccindia.org
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center flex-shrink-0 text-accent">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">Consultation Hours</p>
                  <p className="text-xs text-white/80 leading-relaxed mt-0.5">
                    Monday to Saturday: 10:00 AM - 4:00 PM (Prior Appointment Recommended)
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-6 border-t border-white/10 flex items-center gap-3 text-xs text-white/70">
              <ShieldCheck className="w-4 h-4 text-accent flex-shrink-0" />
              <span>FCRA Certified & 80G Tax Exemption Registered Society</span>
            </div>
          </RevealStagger>

          {/* Interactive Form */}
          <RevealStagger delay={0.1} className="lg:col-span-7 bg-card text-foreground rounded-3xl p-8 sm:p-10 shadow-xl border border-border space-y-6">
            <div>
              <h3 className="font-display font-black text-2xl text-secondary">
                Request an Appointment or Information
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                Please provide your contact information below. Our team in Varanasi will get back to you promptly.
              </p>
            </div>

            <AppointmentBookingForm />
          </RevealStagger>
        </div>

      </div>
    </div>
  );
}
