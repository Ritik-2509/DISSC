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
  BookOpen
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
    if (latest > 30) {
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

  const isHome = pathname === "/";

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled || !isHome
          ? "glass-nav py-3 shadow-soft text-foreground"
          : "bg-[#050C18]/75 backdrop-blur-md py-3.5 border-b border-white/10 text-white"
      }`}
    >
      <div className="container-custom flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group focus:outline-none"
          aria-label="DISCC India Home"
        >
          <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-white p-1 flex-shrink-0 shadow-soft border border-border/60 transition-transform group-hover:scale-105">
            <Image
              src="/images/discc/logo.png"
              alt="DISCC Emblem"
              fill
              className="object-contain p-0.5"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className={`font-heading font-extrabold text-lg sm:text-xl tracking-tight leading-tight transition-colors ${
              scrolled || !isHome ? "text-foreground group-hover:text-primary" : "text-white group-hover:text-[#F5A524]"
            }`}>
              DISCC <span className={scrolled || !isHome ? "text-primary font-bold" : "text-[#F5A524] font-bold"}>INDIA</span>
            </span>
            <span className={`text-[10.5px] uppercase tracking-wider font-medium leading-none ${
              scrolled || !isHome ? "text-muted-text" : "text-slate-300"
            }`}>
              Deva Child Care · Varanasi
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
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
                        ? scrolled || !isHome
                          ? "text-primary bg-primary/10"
                          : "text-[#F5A524] bg-white/10 font-bold"
                        : scrolled || !isHome
                        ? "text-foreground/90 hover:text-primary hover:bg-black/5"
                        : "text-white/90 hover:text-white hover:bg-white/10"
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
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-2 w-80 p-3 rounded-2xl bg-[#0B1528] text-white shadow-2xl border border-white/15 z-50"
                      >
                        <div className="space-y-1">
                          {programmeItems.map((item) => {
                            const Icon = item.icon || Building2;
                            return (
                              <Link
                                key={item.title}
                                href={item.href}
                                onClick={() => setProgrammesOpen(false)}
                                className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group"
                              >
                                <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                                  <Icon className="w-4 h-4" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-xs font-bold text-white group-hover:text-[#F5A524] transition-colors">
                                    {item.title}
                                  </p>
                                  <p className="text-[11px] text-slate-300 line-clamp-1 mt-0.5">
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
                    ? scrolled || !isHome
                      ? "text-primary bg-primary/10"
                      : "text-[#F5A524] bg-white/10 font-bold"
                    : scrolled || !isHome
                    ? "text-foreground/90 hover:text-primary hover:bg-black/5"
                    : "text-white/90 hover:text-white hover:bg-white/10"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Desktop Action CTAs */}
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact#callback">
            <Button
              variant="ghost"
              size="sm"
              className={`font-bold text-xs ${
                scrolled || !isHome ? "text-foreground" : "text-white hover:bg-white/15"
              }`}
            >
              Request Callback
            </Button>
          </Link>
          <Link href="/donate">
            <Button
              size="sm"
              className="gap-1.5 bg-[#F5A524] hover:bg-[#E09314] text-[#0F172A] font-extrabold rounded-full px-5 h-9 shadow-lg hover:scale-105 transition-all"
            >
              <Heart className="w-4 h-4 fill-current" />
              <span>Donate</span>
            </Button>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`lg:hidden p-2.5 rounded-full border shadow-soft cursor-pointer ${
            scrolled || !isHome
              ? "bg-white/80 hover:bg-white text-foreground border-border/80"
              : "bg-black/50 hover:bg-black/70 text-white border-white/20"
          }`}
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
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-white/95 backdrop-blur-lg border-b border-border shadow-soft-lg overflow-hidden"
          >
            <div className="container-custom py-6 flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 rounded-xl text-base font-semibold transition-colors ${
                    pathname === link.href
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-black/5"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border/60 flex flex-col gap-3">
                <Link
                  href="/donate"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="donate" size="lg" className="w-full gap-2 shadow-glow-marigold">
                    <Heart className="w-5 h-5 fill-current" />
                    Donate Now
                  </Button>
                </Link>
                <Link
                  href="/contact#callback"
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full"
                >
                  <Button variant="outline" size="lg" className="w-full">
                    Request a Call Back
                  </Button>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
