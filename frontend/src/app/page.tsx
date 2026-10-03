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
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import { VibrantHero } from "@/components/ui/VibrantHero";
import { GovernmentRecognitionTicker } from "@/components/ui/GovernmentRecognitionTicker";
import { InteractiveProgramShowcase } from "@/components/ui/InteractiveProgramShowcase";
import { StoryShowcase } from "@/components/ui/StoryShowcase";
import { PartnerMarquee } from "@/components/ui/PartnerMarquee";
import { MissionCapsuleStrip } from "@/components/ui/MissionCapsuleStrip";

const LandingAnnouncementModal = dynamic(
  () => import("@/components/ui/LandingAnnouncementModal").then((mod) => mod.LandingAnnouncementModal),
  { ssr: false }
);

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
    <div className="w-full flex flex-col items-center bg-[#F6F4EE] text-slate-900">
      
      {/* Active Programs & Emergency Helpline Floating Attention Modal (Image 3 Style) */}
      <LandingAnnouncementModal />

      {/* 1. Grand Animated Vibrant Hero (Features UP CM Yogi Adityanath Award & Dr. Tulsi) */}
      <VibrantHero />

      {/* 2. Official Government Honors Ticker */}
      <GovernmentRecognitionTicker />

      {/* 3. The 1991 Genesis & Founder Profile Section (Styled with Reference Layout) */}
      <section className="w-full py-20 md:py-28 bg-[#F6F4EE] border-b border-[#E5E0D4] relative overflow-hidden">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            
            {/* Left: Founder Portrait with Forest Green Floating Quote Badge */}
            <motion.div
              initial={{ opacity: 0, x: -80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-5 flex justify-center lg:justify-start"
            >
              <div className="relative w-full max-w-[400px] aspect-[4/5] sm:h-[490px]">
                {/* Main Portrait of Dr. Tulsi Das */}
                <div className="relative w-full h-full rounded-[28px] sm:rounded-[34px] overflow-hidden bg-[#EFE9DF] shadow-xl shadow-stone-900/5 border border-stone-200">
                  <Image
                    src="/images/discc/dr-tulsi-clinic.png"
                    alt="Dr. C. Tulsi Das, Founder President of DISCC India"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority
                  />
                </div>

                {/* Overlapping Forest Green Quote Badge (Bottom-Right) with Floating Bounce & Interactive Hover */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{
                    scale: 1.05,
                    y: -14,
                    boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.4)",
                    transition: { duration: 0.25, ease: "easeOut" }
                  }}
                  className="absolute -bottom-6 right-0 xs:-right-2 sm:-bottom-8 sm:-right-6 bg-[#184639] text-white p-4 sm:p-6 rounded-[20px] sm:rounded-[22px] max-w-[240px] xs:max-w-[260px] sm:max-w-[285px] shadow-2xl z-10 border border-emerald-900/40 cursor-pointer select-none transition-shadow"
                >
                  <span className="block text-[11px] font-bold tracking-[0.18em] text-emerald-200/90 uppercase">
                    DR. C. TULSI DAS, PH.D.
                  </span>
                  <span className="block text-[10px] font-medium tracking-[0.14em] text-stone-300 uppercase mt-0.5">
                    FOUNDER PRESIDENT · EST. 1991
                  </span>
                  <p className="mt-3 font-serif italic text-white text-sm sm:text-[14px] leading-snug">
                    &ldquo;Disability is not a lack of capability. It is a societal lack of appropriate, compassionate scientific support.&rdquo;
                  </p>
                </motion.div>
              </div>
            </motion.div>

            {/* Right: Authentic DISCC Narrative & 3 Core Clinical Pillars */}
            <motion.div
              initial={{ opacity: 0, x: 80 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-7 flex flex-col justify-center text-left lg:pl-4"
            >
              
              {/* Eyebrow: Warm Brown Accent Bar + THE 1991 GENESIS */}
              <div className="inline-flex items-center gap-3 mb-5">
                <span className="w-8 h-[2px] bg-[#9A5B32] shrink-0 inline-block" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8C5E3C]">
                  THE 1991 GENESIS IN VARANASI
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-serif font-bold text-slate-900 tracking-tight leading-[1.18]">
                Bridging the deep void
                <span className="block font-serif italic text-[#1D5443] font-normal mt-1">
                  with clinical science & empathy.
                </span>
              </h2>

              {/* Narrative Paragraph */}
              <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed font-normal mt-6 max-w-2xl">
                In 1991, Eastern Uttar Pradesh lacked specialized diagnostic centers and inclusive schooling for children with intellectual disabilities. Rather than offering temporary charity, clinical psychologist <strong>Dr. C. Tulsi Das</strong> established <strong>DEVA International Society for Child Care (DISCC)</strong> to introduce rigorous developmental assessments, pediatric therapies, and structured life-skills rehabilitation.
              </p>

              {/* 3 Core Clinical Pillars (Fitting the Reference 3-Column System) */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-6 mt-10 pt-8 border-t border-stone-200/90">
                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900">
                    Pediatric Diagnostics
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Comprehensive clinical profiling across all 21 RPwD conditions.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900">
                    Multi-Sensory Therapy
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    Sensory integration gym, speech correction & adaptive hydrotherapy.
                  </p>
                </div>

                <div>
                  <h3 className="text-lg font-serif font-bold text-slate-900">
                    Deva Gram Sanctuary
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                    5-acre rural campus providing free therapy & life-skills schooling.
                  </p>
                </div>
              </div>

              {/* Action Buttons / Links */}
              <div className="flex flex-wrap items-center gap-6 mt-8">
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-[#1D5443] hover:text-[#123B2E] font-bold text-base group transition-colors cursor-pointer"
                >
                  <span>Read Dr. Tulsi&apos;s Full 35-Year Story</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </Link>

                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold text-sm transition-colors cursor-pointer"
                >
                  <span>Schedule Campus Walkthrough</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </Link>
              </div>

            </motion.div>

          </div>
        </div>
      </section>

      {/* 4. Comprehensive Care Spectrum (Editorial Photo Capsules - theNGO Pattern) */}
      <MissionCapsuleStrip />

      {/* 5. Interactive Campus Showcase (Jai Vakeel / IAC Style) */}
      <InteractiveProgramShowcase />

      {/* 5. Emotional Stories of Breakthroughs (Rubaroo Style) */}
      <StoryShowcase />

      {/* 6. Institutional & Corporate Partner Logos (Unboxed Continuous Marquee) */}
      <PartnerMarquee />

      {/* 7. Consultation & Immediate Help Booking */}
      <section className="w-full py-20 bg-white border-b border-amber-200/80 relative">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
            
            {/* Left: Direct Consultation Appeal */}
            <motion.div
              initial={{ opacity: 0, x: -70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="lg:col-span-6 flex flex-col text-left"
            >
              <div className="inline-flex items-center gap-3 mb-4">
                <span className="w-8 h-[2px] bg-[#9A5B32] shrink-0 inline-block" />
                <span className="text-xs font-bold uppercase tracking-[0.22em] text-[#8C5E3C]">
                  PARENT CONSULTATION HELPLINE
                </span>
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
            </motion.div>

            {/* Right: Booking Form */}
            <motion.div
              initial={{ opacity: 0, x: 70 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              className="lg:col-span-6"
            >
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
            </motion.div>

          </div>

        </div>
      </section>

    </div>
  );
}
