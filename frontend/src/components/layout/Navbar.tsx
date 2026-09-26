"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Menu,
  X,
  ChevronDown,
  Building2,
  Users,
  GraduationCap,
  Sparkles,
  PhoneCall,
  Calendar,
  BookOpen,
  ShieldCheck
} from "lucide-react";

interface SubItem {
  title: string;
  desc: string;
  href: string;
  icon?: any;
}

const programmeItems: SubItem[] = [
  {
    title: "Deva Center, Kamachha",
    desc: "Flagship clinic for intellectual disability & speech therapy (Est. 1991)",
    href: "/our-work#deva-center",
    icon: Building2,
  },
  {
    title: "Deva Gram, Bachhaon",
    desc: "Holistic 21-disability rural care & hydrotherapy campus",
    href: "/our-work#deva-gram",
    icon: Users,
  },
  {
    title: "Annapurna Center",
    desc: "Empowerment, nutrition & safe shelter for rural girls & women",
    href: "/our-work#annapurna-center",
    icon: Heart,
  },
  {
    title: "Child Education Program",
    desc: "School sponsorships & adaptive learning toolkits",
    href: "/our-work#child-education-program",
    icon: GraduationCap,
  },
  {
    title: "Emergency Help Line & Clinics",
    desc: "24/7 crisis support and mobile outreach medical aid",
    href: "/our-work#helpline",
    icon: PhoneCall,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [programmesOpen, setProgrammesOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  });

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About Dr. Tulsi" },
    { href: "/our-work", label: "Programmes", hasDropdown: true },
    { href: "/events", label: "Gallery & Events" },
    { href: "/stories", label: "Stories & Impact" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-[#FAF7F0]/95 backdrop-blur-md py-3 shadow-xs border-b border-[#E8DFD3]"
          : "bg-[#FAF7F0]/90 backdrop-blur-xs py-3.5 border-b border-[#E8DFD3]/70"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="DISCC India Home"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-1 flex-shrink-0 shadow-xs border border-[#E8DFD3] transition-transform group-hover:scale-105">
            <Image
              src="/images/discc/logo.png"
              alt="DISCC Emblem"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-extrabold text-lg sm:text-xl tracking-tight leading-tight text-[#1A2530] group-hover:text-[#0F8B8D] transition-colors">
              DISCC <span className="text-[#0F8B8D] font-bold">INDIA</span>
            </span>
            <span className="text-[10.5px] uppercase tracking-wider font-semibold text-[#5B6B7C] leading-none">
              Deva Child Care · Varanasi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;

            if (link.hasDropdown) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setProgrammesOpen(true)}
                  onMouseLeave={() => setProgrammesOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1 px-3.5 py-2 text-sm font-semibold rounded-full transition-colors ${
                      isActive || pathname.startsWith("/our-work")
                        ? "text-[#0F8B8D] bg-[#0F8B8D]/10 font-bold"
                        : "text-[#2C3E50] hover:text-[#0F8B8D] hover:bg-[#EAE4D9]/60"
                    }`}
                  >
                    {link.label}
                    <ChevronDown
                      className={`w-3.5 h-3.5 transition-transform duration-200 ${
                        programmesOpen ? "rotate-180" : ""
                      }`}
                    />
                  </Link>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {programmesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 p-3 rounded-2xl bg-white text-[#1A2530] shadow-xl border border-[#E8DFD3] z-50"
                      >
                        <div className="space-y-1">
                          {programmeItems.map((item) => {
                            const Icon = item.icon || Building2;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setProgrammesOpen(false)}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-[#FAF7F0] transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-[#0F8B8D]/10 text-[#0F8B8D] group-hover:bg-[#0F8B8D] group-hover:text-white transition-colors">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs font-bold text-[#1A2530] group-hover:text-[#0F8B8D] transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-[11px] text-[#5B6B7C] line-clamp-1 mt-0.5">
                                    {item.desc}
                                  </p>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3.5 py-2 text-sm font-semibold rounded-full transition-colors ${
                  isActive
                    ? "text-[#0F8B8D] bg-[#0F8B8D]/10 font-bold"
                    : "text-[#2C3E50] hover:text-[#0F8B8D] hover:bg-[#EAE4D9]/60"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action CTAs */}
        {/* Desktop Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            href="/contact#callback"
            className="px-3.5 py-1.5 rounded-full font-bold text-xs text-[#2C3E50] hover:text-[#0F8B8D] hover:bg-[#EAE4D9]/60 transition-colors"
          >
            Request Callback
          </Link>
          <Link
            href="/donate"
            className="inline-flex items-center gap-1.5 bg-[#F5A524] hover:bg-[#E09314] text-[#1A2530] font-extrabold rounded-full px-5 h-9 text-xs shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-current text-[#1A2530]" />
            <span>Donate</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="lg:hidden p-2.5 rounded-full border border-[#E8DFD3] bg-white text-[#1A2530] shadow-xs cursor-pointer"
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-[#FAF7F0] border-b border-[#E8DFD3] shadow-md overflow-hidden"
          >
            <div className="container-custom py-5 flex flex-col gap-1.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-[#0F8B8D]/10 text-[#0F8B8D] font-bold"
                      : "text-[#1A2530] hover:bg-[#EAE4D9]/60"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-[#E8DFD3] flex flex-col gap-2.5">
                <Link
                  href="/donate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#F5A524] hover:bg-[#E09314] text-[#1A2530] font-extrabold rounded-full py-3 text-sm shadow-xs"
                >
                  <Heart className="w-5 h-5 fill-current" />
                  <span>Support a Child (Donate)</span>
                </Link>
                <Link
                  href="/contact#callback"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full inline-flex items-center justify-center border border-[#C8BFB3] text-[#1A2530] font-bold rounded-full py-2.5 text-sm hover:bg-[#EAE4D9]/60"
                >
                  Request a Call Back
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
