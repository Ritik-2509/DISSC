"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Heart,
  Send,
  CheckCircle2,
  ChevronDown,
  HelpCircle,
  AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const FAQS = [
  {
    q: "How can I schedule a diagnostic evaluation for my child?",
    a: "You can submit the appointment form on this page or call our Varanasi clinic helpline at 7007453168. Our clinical psychologists will schedule an in-depth developmental, cognitive, and sensory assessment at Deva Center, Kamachha."
  },
  {
    q: "Are the rehabilitation and therapy services subsidized?",
    a: "Yes. As a non-profit humanitarian NGO, DISCC provides highly subsidized clinical care, and 100% free rehabilitation, schooling, and nutrition for underprivileged and impoverished families through donor sponsorships."
  },
  {
    q: "How can international volunteers or scholars participate?",
    a: "We welcome pediatricians, special educators, speech therapists, and university study abroad cohorts. Please select 'Volunteer / Internship' in the form below and attach your background details."
  },
  {
    q: "Is my donation eligible for tax exemption?",
    a: "Yes. All Indian donations to DISCC are eligible for 50% income tax deduction under Section 80G. We issue digital 80G tax exemption receipts immediately."
  },
  {
    q: "What disability categories do you support at Deva Gram?",
    a: "Our rural Deva Gram campus in Bachhaon supports all 21 categories recognized under the Rights of Persons with Disabilities (RPwD) Act 2016, including Autism, Cerebral Palsy, Intellectual Disability, and Multiple Disabilities."
  }
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "child-assessment",
    message: "",
    honeypot: "", // anti-spam honeypot
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.honeypot) return; // bot detected
    if (!formData.name || !formData.phone) return;

    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: formData.subject,
          content: formData.message || `Subject: ${formData.subject}`,
          type: "inquiry",
        }),
      });
      setSubmitted(true);
    } catch {
      setSubmitted(true);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center bg-[#FFFAF2]">
      {/* 1. Header */}
      <section className="w-full pt-32 pb-16 md:pt-40 md:pb-20 bg-gradient-to-b from-[#FFEFE0]/60 to-[#FFFAF2] relative">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="px-3.5 py-1 text-xs font-bold uppercase tracking-wider rounded-full bg-primary/10 text-primary border border-primary/20 inline-block mb-4">
              Get in Touch · Varanasi
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-heading text-foreground tracking-tight leading-[1.1]">
              Consult Our Specialists or Inquire Today
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-muted-text leading-relaxed max-w-[60ch]">
              Our clinical psychologists, administrative team, and rural coordinators in Varanasi are here to assist your family.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Contact Details & Interactive Form */}
      <section className="w-full py-16 md:py-24 bg-white border-y border-border/70 relative">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            {/* Left: Contact Information Cards */}
            <div className="lg:col-span-5 space-y-6">
              <div className="p-8 rounded-3xl bg-[#FFFAF2] border border-border/80 shadow-soft space-y-6">
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-primary">
                    Headquarters & Clinic
                  </span>
                  <h3 className="text-2xl font-bold font-heading text-foreground mt-1">
                    Deva Center, Varanasi
                  </h3>
                  <p className="text-xs text-muted-text mt-1">
                    First Special Rehabilitation Institute in Eastern Uttar Pradesh
                  </p>
                </div>

                <div className="space-y-4 text-sm text-foreground">
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-border/80 flex items-center justify-center shrink-0 text-primary shadow-xs">
                      <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Registered Office</p>
                      <p className="text-xs text-muted-text leading-relaxed mt-0.5">
                        B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi - 221010, Uttar Pradesh, India
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-border/80 flex items-center justify-center shrink-0 text-primary shadow-xs">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Helpline & WhatsApp</p>
                      <p className="text-xs text-muted-text leading-relaxed mt-0.5">
                        7007453168 / 9415303557 / 9129853531
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-border/80 flex items-center justify-center shrink-0 text-primary shadow-xs">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Official Email</p>
                      <p className="text-xs text-muted-text leading-relaxed mt-0.5">
                        disccindia@gmail.com
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-white border border-border/80 flex items-center justify-center shrink-0 text-primary shadow-xs">
                      <Clock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold">Working Hours</p>
                      <p className="text-xs text-muted-text leading-relaxed mt-0.5">
                        Monday to Saturday: 8:00 AM - 5:00 PM (Sunday Closed)
                      </p>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-border/60 flex items-center gap-2 text-xs text-muted-text">
                  <ShieldCheck className="w-4 h-4 text-primary shrink-0" />
                  <span>FCRA & National Trust Certified Humanitarian Society</span>
                </div>
              </div>

              {/* Emergency Hotline Alert */}
              <div className="p-6 rounded-3xl bg-[#E6F6EE] border border-[#0F8B8D]/30 flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shrink-0 shadow-soft">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">
                    Urgent Child Crisis?
                  </h4>
                  <p className="text-xs text-muted-text mt-0.5">
                    Call Dr. Tulsi&apos;s direct clinical line: <span className="font-bold text-primary">7007453168</span>
                  </p>
                </div>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="lg:col-span-7">
              <div className="p-8 sm:p-10 rounded-3xl bg-[#FFFAF2] border border-border/80 shadow-soft">
                <h3 className="text-2xl font-bold font-heading text-foreground mb-2">
                  Send an Inquiry / Book Assessment
                </h3>
                <p className="text-sm text-muted-text mb-6">
                  Please fill out the form below. Our clinical coordinator will respond within 24 hours.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-2xl bg-white border border-primary/30 text-center space-y-4">
                    <CheckCircle2 className="w-14 h-14 text-primary mx-auto" />
                    <h4 className="text-2xl font-bold text-foreground">Message Received!</h4>
                    <p className="text-sm text-muted-text max-w-md mx-auto">
                      Thank you for contacting DISCC India. Our team will get in touch with you at {formData.phone || formData.email}.
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          phone: "",
                          subject: "child-assessment",
                          message: "",
                          honeypot: "",
                        });
                      }}
                      className="mt-2"
                    >
                      Send Another Inquiry
                    </Button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Honeypot anti-spam field */}
                    <input
                      type="text"
                      name="website"
                      tabIndex={-1}
                      autoComplete="off"
                      value={formData.honeypot}
                      onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
                      className="hidden"
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1.5">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="e.g. Ramesh Chandra"
                          className="w-full h-11 px-4 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1.5">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="e.g. 9876543210"
                          className="w-full h-11 px-4 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1.5">
                          Email Address (Optional)
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="e.g. name@example.com"
                          className="w-full h-11 px-4 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-foreground mb-1.5">
                          Inquiry Type *
                        </label>
                        <select
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          className="w-full h-11 px-4 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                        >
                          <option value="child-assessment">Child Assessment & Rehabilitation</option>
                          <option value="speech-sensory">Speech & Sensory Integration Therapy</option>
                          <option value="rural-admissions">Deva Gram (Bachhaon) Admissions</option>
                          <option value="annapurna-girl-child">Annapurna Girl Child Center</option>
                          <option value="volunteer-internship">Volunteer / Study Abroad Internship</option>
                          <option value="csr-donation">Donations & Corporate CSR Partnership</option>
                          <option value="other">General Inquiry</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-foreground mb-1.5">
                        Your Message / Child Details
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Please share age of child, diagnosis, current concerns or questions..."
                        className="w-full p-4 rounded-xl border border-border bg-white text-foreground text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      variant="default"
                      size="lg"
                      className="w-full gap-2 text-base mt-2"
                    >
                      <Send className="w-4 h-4" />
                      {loading ? "Sending Message..." : "Submit Inquiry"}
                    </Button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions (Accordion) */}
      <section className="w-full py-20 bg-[#FFFAF2] relative">
        <div className="container-custom max-w-3xl">
          <SectionHeading
            title="Frequently Asked Questions"
            description="Clear answers about appointments, therapy admissions, and donor governance."
          />

          <div className="space-y-4">
            {FAQS.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white border border-border/80 shadow-soft overflow-hidden transition-colors"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 font-heading font-bold text-base sm:text-lg text-foreground cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-primary shrink-0 transition-transform duration-200 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === index && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25 }}
                    >
                      <div className="px-6 pb-6 text-sm sm:text-base text-muted-text leading-relaxed border-t border-border/40 pt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
