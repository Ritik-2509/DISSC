"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Heart, ShieldCheck, ArrowRight, ExternalLink } from "lucide-react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

export function Footer() {
  const pathname = usePathname();

  // Do not render public footer inside admin dashboard
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative text-white overflow-hidden group py-14 px-4 sm:px-6 md:px-10 lg:px-14 border-t border-secondary/30">
      {/* Cinematic Varanasi Ghats Photographic Background */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-[10000ms] ease-out group-hover:scale-105 z-0"
        style={{
          backgroundImage: `url('${CLOUDINARY_IMAGES.varanasiGhats || "/images/varanasi_ghats.jpg"}')`,
          filter: "contrast(1.15) brightness(0.75)",
        }}
      />

      {/* Deep Royal Navy & Crimson Gradient Filter Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#00194C]/85 via-[#00194C]/92 to-[#001033]/98 z-0" />

      {/* Ambient Pulsing Glow Orbs */}
      <div className="absolute inset-0 opacity-25 pointer-events-none z-0">
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-primary rounded-full blur-[140px] animate-pulse" />
        <div className="absolute top-10 left-10 w-96 h-96 bg-accent rounded-full blur-[140px] animate-pulse" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 space-y-8">
        {/* Changemakers-inspired Frosted Glass Main Card */}
        <div className="bg-[#00194C]/75 backdrop-blur-xl border border-white/20 rounded-[36px] p-8 sm:p-10 md:p-14 shadow-2xl relative overflow-hidden">
          {/* Subtle Corner Glow Accent */}
          <div className="absolute -top-24 -right-24 w-72 h-72 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 sm:gap-12 relative z-10">
            {/* Column 1: Organization Identity & Mission */}
            <div className="md:col-span-5 space-y-5">
              <div className="flex items-center gap-3.5">
                <div className="relative w-12 h-12 rounded-full border-2 border-accent/60 bg-white overflow-hidden flex items-center justify-center p-1.5 shrink-0 shadow-lg">
                  <Image
                    src={CLOUDINARY_IMAGES.logo}
                    alt="DISCC India Logo"
                    fill
                    className="object-contain p-1"
                  />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-black text-white tracking-wide leading-none">
                    DISCC <span className="text-accent">INDIA</span>
                  </h3>
                  <span className="text-[11px] text-white/70 uppercase tracking-widest font-semibold block mt-1">
                    DEVA International Society for Child Care
                  </span>
                </div>
              </div>

              <p className="text-white/85 text-sm sm:text-base leading-relaxed font-normal">
                Founded in Varanasi in 1991 by Dr. C. Tulsi Das. Dedicated to clinical psychology, comprehensive disability rehabilitation, rural women empowerment, and child welfare across Uttar Pradesh.
              </p>

              <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-accent font-bold">
                  FCRA Certified
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-bold">
                  80G Tax Exempt
                </span>
                <span className="px-3 py-1 rounded-full bg-white/10 border border-white/15 text-white font-bold">
                  National Trust
                </span>
              </div>
            </div>

            {/* Column 2: Strategic Navigation Links */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-xs font-bold text-accent uppercase tracking-widest pb-2 border-b border-white/15">
                Explore Platform
              </h4>
              <ul className="space-y-2.5 text-sm font-medium">
                <li>
                  <Link href="/about" className="text-white/90 hover:text-accent transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-accent/70" />
                    Who We Are
                  </Link>
                </li>
                <li>
                  <Link href="/our-work" className="text-white/90 hover:text-accent transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-accent/70" />
                    What We Do (Programs)
                  </Link>
                </li>
                <li>
                  <Link href="/stories" className="text-white/90 hover:text-accent transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-accent/70" />
                    Impact Stories
                  </Link>
                </li>
                <li>
                  <Link href="/events" className="text-white/90 hover:text-accent transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-accent/70" />
                    Events & Masterclasses
                  </Link>
                </li>
                <li>
                  <Link href="/knowledge" className="text-white/90 hover:text-accent transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-accent/70" />
                    Resources & Audited Filings
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-white/90 hover:text-accent transition-colors flex items-center gap-1.5">
                    <ArrowRight className="w-3.5 h-3.5 text-accent/70" />
                    Contact & Appointments
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Clinical Helpline */}
            <div className="md:col-span-4 space-y-4">
              <h4 className="text-xs font-bold text-accent uppercase tracking-widest pb-2 border-b border-white/15">
                Varanasi Headquarters
              </h4>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3 text-white/90">
                  <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1" />
                  <span className="leading-snug">
                    B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi 221010, Uttar Pradesh, India
                  </span>
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <Phone className="w-4 h-4 text-accent flex-shrink-0" />
                  <a href="tel:+917007453168" className="hover:text-accent transition-colors font-bold">
                    +91 7007453168
                  </a>
                </li>
                <li className="flex items-center gap-3 text-white/90">
                  <Mail className="w-4 h-4 text-accent flex-shrink-0" />
                  <a href="mailto:info@disccindia.org" className="hover:text-accent transition-colors">
                    info@disccindia.org
                  </a>
                </li>
              </ul>

              <div className="pt-2">
                <Link href="/donate">
                  <button className="w-full py-3 px-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2">
                    <Heart className="w-4 h-4 fill-current" />
                    Support a Child's Rehabilitation
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Sub-Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/70 px-4">
          <p>© 2026 DEVA International Society for Child Care (DISCC India). All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-white transition-colors">
              Terms of Service
            </Link>
            <span>•</span>
            <Link href="/fcra" className="hover:text-white transition-colors">
              FCRA Returns
            </Link>
            <span>•</span>
            <Link href="/admin/login" className="hover:text-accent transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
