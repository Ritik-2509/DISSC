"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Award,
  Users,
  Building2,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Sparkles,
  MapPin,
  Calendar,
  CheckCircle2,
  Phone,
  BookOpen,
  Activity,
  Smile,
  Quote,
  Send,
  Lock,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { VibrantHero } from "@/components/ui/VibrantHero";
import { GovernmentRecognitionTicker } from "@/components/ui/GovernmentRecognitionTicker";
import { InteractiveProgramShowcase } from "@/components/ui/InteractiveProgramShowcase";
import { StoryShowcase } from "@/components/ui/StoryShowcase";
import { InteractiveSponsorship } from "@/components/ui/InteractiveSponsorship";

export default function HomePage() {
  // Quick callback form state
  const [callbackName, setCallbackName] = useState("");
  const [callbackPhone, setCallbackPhone] = useState("");
  const [callbackTopic, setCallbackTopic] = useState("child-admission");
  const [callbackSubmitted, setCallbackSubmitted] = useState(false);
  const [callbackLoading, setCallbackLoading] = useState(false);

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!callbackName || !callbackPhone) return;
    setCallbackLoading(true);

    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackName,
          phone: callbackPhone,
          subject: `Quick Consultation Request: ${callbackTopic}`,
          content: `Inquiry type: ${callbackTopic}. Phone: ${callbackPhone}`,
          type: "callback",
        }),
      });
      setCallbackSubmitted(true);
    } catch {
      setCallbackSubmitted(true);
    } finally {
      setCallbackLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#FFFDF9] text-slate-900">
      
      {/* 1. Grand Animated Vibrant Hero (Features UP CM Yogi Adityanath Award & Dr. Tulsi) */}
      <VibrantHero />

      {/* 2. Official Government Honors Ticker */}
      <GovernmentRecognitionTicker />

      {/* 3. The 1991 Genesis & Grassroots Mission (Editorial Narrative) */}
      <section className="w-full py-20 md:py-28 bg-[#FFFDF7] border-b border-amber-200/60 relative">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Founder Documentary Photograph & Quote */}
            <div className="lg:col-span-5 flex flex-col">
              <div className="relative bg-white p-4 rounded-3xl border-2 border-amber-200 shadow-xl">
                <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100">
                  <Image
                    src="/images/discc/dr-tulsi-portrait.jpg"
                    alt="Dr. C. Tulsi Das with special children"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>
                <div className="p-4 bg-gradient-to-r from-amber-50 to-teal-50 rounded-2xl mt-4 border border-amber-100">
                  <p className="text-xs sm:text-sm font-serif italic text-slate-800 leading-relaxed">
                    &ldquo;Disability is not a lack of capability. It is a societal lack of appropriate, compassionate scientific support.&rdquo;
                  </p>
                  <p className="text-xs font-black text-slate-900 mt-2">
                    Dr. C. Tulsi Das <span className="font-normal text-slate-500">· Founder President & Clinical Psychologist</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Flowing Vibrant Mission Narrative */}
            <div className="lg:col-span-7 flex flex-col justify-center text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-teal-100 text-teal-800 border border-teal-300 text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>The 1991 Genesis in Varanasi</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-black text-slate-900 leading-tight mb-6">
                Bridging the Deep Vacuum with Clinical Science & Compassion.
              </h2>

              <div className="space-y-4 text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                <p>
                  In 1991, families raising children with intellectual disabilities in Varanasi faced an isolating reality: deep social stigma, zero diagnostic centers, and no inclusive schooling.
                </p>
                <p>
                  Equipped with clinical training and profound compassion, Dr. C. Tulsi Das established <strong>DEVA International Society for Child Care (DISCC)</strong>. Rather than offering temporary charity, DISCC established a rigorous clinical standard: pediatric psychological diagnostics, sensory integration gym therapy, speech therapy, and customized Individualized Education Plans (IEPs).
                </p>
                <p>
                  Today, spanning our <strong>Deva Center in Kamachha</strong> and our expansive <strong>Deva Gram rural sanctuary in Bachhaon</strong>, we provide continuous rehabilitation across all 21 legally recognized disability categories.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200 flex flex-wrap items-center gap-6">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-sm font-bold text-teal-700 hover:text-teal-800 group cursor-pointer"
                >
                  <span>Read Dr. Tulsi&apos;s Full 35-Year Journey</span>
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-sm font-bold text-slate-800 hover:text-teal-700 cursor-pointer"
                >
                  <span>Schedule a Campus Walkthrough</span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </Link>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 4. Interactive Campus Showcase (Jai Vakeel / IAC Style) */}
      <InteractiveProgramShowcase />

      {/* 5. Emotional Stories of Breakthroughs (Rubaroo Style) */}
      <StoryShowcase />

      {/* 6. Child Sponsorship Calculator (Dynamic Tiers) */}
      <InteractiveSponsorship />

      {/* 7. Consultation & Immediate Help Booking */}
      <section className="w-full py-20 bg-gradient-to-br from-[#FFF9F2] via-white to-[#FFF5E8] border-b border-amber-200/80 relative">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Direct Consultation Appeal */}
            <div className="lg:col-span-6 flex flex-col text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-800 border border-amber-300 text-xs font-bold uppercase tracking-wider mb-3 w-fit">
                <Phone className="w-3.5 h-3.5" />
                <span>Parent Consultation Helpline</span>
              </div>
              
              <h2 className="text-3xl sm:text-4xl font-heading font-black text-slate-900 mb-4 leading-tight">
                Looking for Assessment or Therapy for Your Child?
              </h2>
              
              <p className="text-base text-slate-600 leading-relaxed mb-8">
                Our licensed clinical psychologists in Varanasi provide comprehensive developmental profiling, sensory evaluations, and individualized therapy roadmaps.
              </p>

              <div className="space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-start gap-3.5">
                  <MapPin className="w-5 h-5 text-teal-700 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Deva Center (Kamachha, Varanasi)</h4>
                    <p className="text-xs text-slate-600 mt-0.5">B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi, UP 221010</p>
                  </div>
                </div>

                <div className="p-4 rounded-2xl bg-white border border-amber-200 shadow-sm flex items-start gap-3.5">
                  <Phone className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-900">Direct Helpline Numbers</h4>
                    <p className="text-xs font-bold text-teal-700 mt-0.5">7007453168 / 9415303557 / 9129853531</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Booking Form */}
            <div className="lg:col-span-6">
              <div className="bg-white p-6 sm:p-8 rounded-3xl border-2 border-amber-200 shadow-xl">
                <h3 className="text-xl font-heading font-black text-slate-900 mb-2">
                  Schedule a Consultation or Campus Visit
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 mb-6">
                  Fill in your details and our senior clinical counselor will call you within 24 business hours.
                </p>

                {callbackSubmitted ? (
                  <div className="p-6 rounded-2xl bg-teal-50 border border-teal-300 text-center">
                    <CheckCircle2 className="w-10 h-10 text-teal-700 mx-auto mb-2" />
                    <h4 className="text-base font-bold text-slate-900">Appointment Request Received</h4>
                    <p className="text-xs text-slate-600 mt-1">
                      Our counselor will contact you shortly to confirm your visit slot.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleCallbackSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                        Parent or Guardian Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={callbackName}
                        onChange={(e) => setCallbackName(e.target.value)}
                        placeholder="e.g. Smt. Anjali Sharma"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                        Mobile Phone Number *
                      </label>
                      <input
                        type="tel"
                        required
                        value={callbackPhone}
                        onChange={(e) => setCallbackPhone(e.target.value)}
                        placeholder="10-digit mobile number"
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600 bg-slate-50"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-900 uppercase tracking-wider mb-1.5">
                        Inquiry / Service Topic
                      </label>
                      <select
                        value={callbackTopic}
                        onChange={(e) => setCallbackTopic(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-teal-600 bg-slate-50"
                      >
                        <option value="child-admission">Child Assessment & Admission (Kamachha Center)</option>
                        <option value="speech-therapy">Speech & Sensory Therapy Consultation</option>
                        <option value="rural-outreach">Rural Deva Gram Care (Bachhaon Campus)</option>
                        <option value="donor-visit">Donor or Volunteer Center Visit</option>
                      </select>
                    </div>

                    <Button
                      type="submit"
                      disabled={callbackLoading}
                      className="w-full bg-slate-900 hover:bg-teal-700 text-white font-black rounded-xl h-12 text-sm shadow-md cursor-pointer"
                    >
                      {callbackLoading ? "Submitting..." : "Schedule Free Callback"}
                    </Button>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>
  );
}
