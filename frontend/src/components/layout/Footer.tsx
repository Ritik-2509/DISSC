"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Phone, Mail, MapPin, Heart, ShieldCheck, ArrowRight, Award, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Footer() {
  const pathname = usePathname();

  // Do not render public footer inside admin routes
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <footer className="relative bg-[#FFEFE0] text-foreground border-t border-border/80 pt-16 pb-12 overflow-hidden select-none">
      {/* Soft background organic accent blobs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#0F8B8D]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#F5A524]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-border/70">
          {/* Column 1: Brand & Founder Credibility */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-12 h-12 rounded-full bg-white p-1 shadow-soft border border-border/60">
                <Image
                  src="/images/discc/logo.png"
                  alt="DISCC Logo"
                  fill
                  className="object-contain p-0.5"
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-xl tracking-tight text-foreground block group-hover:text-primary transition-colors">
                  DISCC <span className="text-primary font-bold">INDIA</span>
                </span>
                <span className="text-[11px] text-muted-text font-medium uppercase tracking-wider block">
                  DEVA International Society for Child Care
                </span>
              </div>
            </Link>

            <p className="text-sm text-muted-text leading-relaxed">
              Founded in 1991 in Varanasi by Dr. C. Tulsi Das, recipient of the Best Professional Psychologist Award by the Chief Minister of Uttar Pradesh. Empowering neurodivergent and marginalized children with specialized clinical rehabilitation, therapy, and education.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
              <span className="px-3 py-1 rounded-full bg-white text-primary font-bold border border-primary/20 shadow-xs">
                FCRA Registered
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#1E2A3A] font-bold border border-border shadow-xs">
                80G Tax Exempt
              </span>
              <span className="px-3 py-1 rounded-full bg-white text-[#1E2A3A] font-bold border border-border shadow-xs">
                National Trust
              </span>
            </div>
          </div>

          {/* Column 2: Key Programmes */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
              Core Programmes
            </h4>
            <ul className="space-y-2 text-sm text-muted-text">
              <li>
                <Link href="/our-work#deva-center" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-primary/70" />
                  Deva Center (Kamachha)
                </Link>
              </li>
              <li>
                <Link href="/our-work#deva-gram" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-primary/70" />
                  Deva Gram Campus (Bachhaon)
                </Link>
              </li>
              <li>
                <Link href="/our-work#annapurna-center" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-primary/70" />
                  Annapurna Center for Girls
                </Link>
              </li>
              <li>
                <Link href="/our-work#child-education-program" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-primary/70" />
                  Child Education Sponsorship
                </Link>
              </li>
              <li>
                <Link href="/our-work#helpline" className="hover:text-primary transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3.5 h-3.5 text-primary/70" />
                  24/7 Crisis Help Line
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
              Explore
            </h4>
            <ul className="space-y-2 text-sm text-muted-text">
              <li>
                <Link href="/about" className="hover:text-primary transition-colors">
                  About Dr. Tulsi
                </Link>
              </li>
              <li>
                <Link href="/events" className="hover:text-primary transition-colors">
                  Gallery & Events
                </Link>
              </li>
              <li>
                <Link href="/stories" className="hover:text-primary transition-colors">
                  Impact Stories
                </Link>
              </li>
              <li>
                <Link href="/fcra" className="hover:text-primary transition-colors">
                  FCRA Declarations
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-primary transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-primary transition-colors">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Immediate Action */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-primary uppercase tracking-widest">
              Contact & Helpline
            </h4>
            <div className="space-y-2.5 text-xs sm:text-sm text-muted-text">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span>B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi, UP 221010</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-primary shrink-0" />
                <span>7007453168 / 9415303557 / 9129853531</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-primary shrink-0" />
                <span>disccindia@gmail.com</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-primary shrink-0" />
                <span>Mon to Sat: 8:00 AM - 5:00 PM</span>
              </div>
            </div>

            <div className="pt-2">
              <Link href="/donate">
                <Button variant="donate" size="sm" className="w-full gap-2 shadow-glow-marigold">
                  <Heart className="w-4 h-4 fill-current" />
                  Support Our Mission
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-text">
          <p>
            &copy; {new Date().getFullYear()} DEVA International Society for Child Care (DISCC). All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <span>&bull;</span>
            <Link href="/terms" className="hover:text-primary transition-colors">
              Terms of Use
            </Link>
            <span>&bull;</span>
            <Link href="/admin" className="hover:text-primary transition-colors">
              Admin Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
