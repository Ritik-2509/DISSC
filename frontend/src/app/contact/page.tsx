"use client";

import { useState } from "react";
import Image from "next/image";
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
  Plus,
  Minus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { HandUnderline } from "@/components/ui/HandDrawn";

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
    a: "We welcome pediatricians, special educators, speech therapists, and university study abroad cohorts. Please select 'Volunteer or Academic Research' in the form and provide your background details."
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
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
    <div className="w-full flex flex-col items-center bg-[#FAF7F0] text-[#1A2530]">
      
      {/* 1. Header */}
      <section className="w-full pt-28 pb-14 md:pt-36 md:pb-20 border-b border-[#E8DFD3] bg-[#FAF7F0]">
        <div className="container-custom">
          <div className="max-w-3xl">
            <span className="text-xs font-bold text-[#0F8B8D] uppercase tracking-widest block mb-2">
              Direct Clinical Inquiries · Varanasi
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-[#1A2530] leading-tight">
              Consult Our Specialists or Schedule a Visit.
            </h1>
            <div className="mt-2 mb-4">
              <HandUnderline className="text-[#F5A524] w-48 h-3.5" />
            </div>
            <p className="text-base sm:text-lg text-[#5B6B7C] leading-relaxed">
              Our clinical psychologists, administrative team, and rural coordinators in Varanasi are available for parent evaluations and campus appointments.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Calm Two-Column Contact Section (Unboxed Layout) */}
      <section className="w-full py-16 md:py-24 bg-[#FFFDF9] border-b border-[#E8DFD3]">
        <div className="container-custom">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            
            {/* Left: Clean Form */}
            <div className="lg:col-span-6">
              <div className="max-w-xl">
                <h2 className="text-2xl font-heading font-bold text-[#1A2530] mb-2">
                  Send an Inquiry or Book Assessment
                </h2>
                <p className="text-sm text-[#5B6B7C] mb-8">
                  Fill in your contact details below and our team will get back to you promptly.
                </p>

                {submitted ? (
                  <div className="p-8 rounded-3xl bg-[#E6F6EE] border border-[#0F8B8D]/30 text-center">
                    <CheckCircle2 className="w-12 h-12 text-[#0F8B8D] mx-auto mb-3" />
                    <h3 className="text-xl font-heading font-bold text-[#1A2530]">
                      Inquiry Successfully Received
                    </h3>
                    <p className="text-sm text-[#5B6B7C] mt-2">
                      Our clinical counselor will call your phone number within 24 business hours.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-bold text-[#1A2530] uppercase tracking-wider mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Chandra"
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DFD3] text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-[#1A2530] uppercase tracking-wider mb-2">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="10-digit mobile"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8DFD3] text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-[#1A2530] uppercase tracking-wider mb-2">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="name@domain.com"
                          className="w-full px-4 py-3 rounded-xl border border-[#E8DFD3] text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A2530] uppercase tracking-wider mb-2">
                        Inquiry Topic
                      </label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DFD3] text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                      >
                        <option value="child-assessment">Child Developmental & Psychological Assessment</option>
                        <option value="speech-therapy">Speech & Sensory Therapy Consultation</option>
                        <option value="rural-admissions">Deva Gram (Bachhaon) Rural Campus Services</option>
                        <option value="volunteer-research">Volunteer or Academic Research Exchange</option>
                        <option value="donor-csr">Donor, CSR & Corporate Sponsorship</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-[#1A2530] uppercase tracking-wider mb-2">
                        Additional Context or Questions
                      </label>
                      <textarea
                        rows={4}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder="Tell us about the child's age, condition, or your specific requirements..."
                        className="w-full px-4 py-3 rounded-xl border border-[#E8DFD3] text-sm focus:outline-none focus:border-[#0F8B8D] bg-[#FAF7F0]"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={loading}
                      size="lg"
                      className="w-full bg-[#1A2530] hover:bg-[#0F8B8D] text-white font-bold rounded-xl h-12 text-sm shadow-xs cursor-pointer"
                    >
                      {loading ? "Sending Message..." : "Submit Consultation Request"}
                    </Button>
                  </form>
                )}
              </div>
            </div>

            {/* Right: Center Details & Location Photograph */}
            <div className="lg:col-span-6 space-y-8">
              
              <div className="relative bg-white p-3 rounded-2xl border border-[#E8DFD3] shadow-xs">
                <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden bg-[#F2ECE1]">
                  <Image
                    src="/images/discc/dr-tulsi-clinic.png"
                    alt="Deva Center Kamachha Clinic"
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </div>
                <div className="p-3">
                  <span className="text-xs font-bold text-[#0F8B8D]">
                    Flagship Institute
                  </span>
                  <h3 className="text-base font-bold text-[#1A2530]">
                    Deva Center Clinical Headquarters
                  </h3>
                  <p className="text-xs text-[#5B6B7C]">
                    B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi, UP 221010
                  </p>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#0F8B8D] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A2530] uppercase tracking-wider">
                      Helpline & Clinical Appointments
                    </h4>
                    <p className="text-sm font-semibold text-[#1A2530] mt-0.5">
                      7007453168 / 9415303557 / 9129853531
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] flex items-start gap-3">
                  <Mail className="w-4 h-4 text-[#0F8B8D] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A2530] uppercase tracking-wider">
                      Official Inquiries
                    </h4>
                    <p className="text-sm font-semibold text-[#1A2530] mt-0.5">
                      disccindia@gmail.com
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-white border border-[#E8DFD3] flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#0F8B8D] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1A2530] uppercase tracking-wider">
                      Center Operating Hours
                    </h4>
                    <p className="text-sm text-[#5B6B7C] mt-0.5">
                      Monday to Saturday: 8:00 AM - 5:00 PM (Sundays reserved for caregiver workshops)
                    </p>
                  </div>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 3. FAQ Section (Generous Whitespace Editorial List - No Cards) */}
      <section className="w-full py-20 bg-[#FAF7F0]">
        <div className="container-custom max-w-3xl">
          
          <div className="mb-12 text-left">
            <span className="text-xs font-bold text-[#D97706] uppercase tracking-widest block mb-1">
              Common Questions
            </span>
            <h2 className="text-3xl font-heading font-bold text-[#1A2530]">
              Frequently Asked Questions.
            </h2>
          </div>

          <div className="divide-y divide-[#E8DFD3]">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;

              return (
                <div key={idx} className="py-5">
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full flex items-center justify-between text-left gap-4 font-bold text-base sm:text-lg text-[#1A2530] hover:text-[#0F8B8D] transition-colors cursor-pointer"
                  >
                    <span>{faq.q}</span>
                    <span className="p-1 rounded-full bg-white border border-[#E8DFD3] text-[#5B6B7C] shrink-0">
                      {isOpen ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                    </span>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="text-sm sm:text-base text-[#5B6B7C] pt-3 leading-relaxed">
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

        </div>
      </section>

    </div>
  );
}
