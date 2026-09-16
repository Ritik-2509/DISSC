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
  ArrowRight,
  Sparkles,
  Building2,
  BookOpen,
  GraduationCap,
  HeartPulse,
  Award,
  Users
} from "lucide-react";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

interface SubItem {
  title: string;
  desc: string;
  badge?: string;
  href: string;
  icon?: any;
}

const currentPrograms: SubItem[] = [
  {
    title: "Deva Center, Varanasi",
    desc: "Flagship institute for clinical neurodivergence & autism rehabilitation",
    badge: "Active Care",
    href: "/our-work#deva-center",
    icon: Building2,
  },
  {
    title: "Deva Gram (Bachhaon)",
    desc: "Rural comprehensive rehabilitation campus for all 21 disabilities",
    badge: "Rural Center",
    href: "/our-work#deva-gram",
    icon: Users,
  },
  {
    title: "Annapurna Center",
    desc: "Empowerment, nutrition, and safety for rural girls & women",
    badge: "Women & Child",
    href: "/our-work#annapurna-center",
    icon: Heart,
  },
  {
    title: "Child Education Program",
    desc: "School sponsorships and learning toolkits for marginalized children",
    badge: "Education",
    href: "/our-work#child-education-program",
    icon: GraduationCap,
  },
  {
    title: "Navjeevan Clinic",
    desc: "Dignity, clinical wound care and medical aid for leprosy patients",
    badge: "Medical Aid",
    href: "/our-work#navjeevan-clinic",
    icon: HeartPulse,
  },
];

const pastPrograms: SubItem[] = [
  {
    title: "Gangotri Riverside School",
    desc: "Foundational education under a tree on Ganga ghats (est. 1999)",
    badge: "Historical Milestone",
    href: "/our-work#gangotri-school",
    icon: BookOpen,
  },
  {
    title: "Project SAAHAS (UP Police)",
    desc: "Mental resilience training for 500+ emergency personnel",
    badge: "Systemic Reform",
    href: "/our-work#changemakers-ventures",
    icon: Award,
  },
  {
    title: "Purple Fair & ARUNIM Showcases",
    desc: "National artistic platforms celebrating Divyangjan special talents",
    badge: "Annual Milestone",
    href: "/stories",
    icon: Sparkles,
  },
];

export function Navbar() {
  const pathname = usePathname();
  const { scrollY } = useScroll();

  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [whatWeDoTab, setWhatWeDoTab] = useState<"current" | "past">("current");

  // Exclude public website navbar from admin workspace
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const diff = latest - previous;

    // Scrolling down past threshold -> hide navbar
    if (diff > 5 && latest > 120) {
      setHidden(true);
      setMobileMenuOpen(false);
      setActiveDropdown(null);
    } 
    // Scrolling up or near top -> show navbar
    else if (diff < -5 || latest <= 40) {
      setHidden(false);
    }

    // Toggle compact mode
    setScrolled(latest > 30);
  });

  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/95 backdrop-blur-md shadow-md border-b border-border/80 py-2.5"
            : "bg-white border-b border-border/60 py-3.5"
        }`}
      >
        <div className="w-full px-4 sm:px-8 lg:px-12 2xl:px-16 flex items-center justify-between">
          {/* Logo brand click navigates to Home */}
          <Link
            href="/"
            onClick={() => {
              setActiveDropdown(null);
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-3 group"
            aria-label="DISCC India Home"
          >
            <div className="relative w-11 h-11 sm:w-12 sm:h-12 flex-shrink-0 transition-transform duration-300 group-hover:scale-105 rounded-full p-1 bg-white shadow-xs border border-border">
              <Image
                src={CLOUDINARY_IMAGES.logo}
                alt="DISCC India Logo"
                fill
                className="object-contain p-1"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-secondary leading-none">
                DISCC <span className="text-primary">INDIA</span>
              </span>
              <span className="text-[10px] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">
                Varanasi • Est. 1991
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2">
            {/* WHO WE ARE Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("who")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <Link
                href="/about"
                className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  pathname?.startsWith("/about")
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                }`}
              >
                Who We Are
                <ChevronDown className="w-3.5 h-3.5 transition-transform" />
              </Link>

              <AnimatePresence>
                {activeDropdown === "who" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full left-0 mt-1 w-72 bg-white rounded-2xl shadow-xl border border-border p-2 space-y-1 z-50"
                  >
                    <Link
                      href="/about"
                      onClick={() => setActiveDropdown(null)}
                      className="p-3 rounded-xl hover:bg-muted/70 flex flex-col gap-0.5 transition-colors group"
                    >
                      <span className="text-xs font-bold text-secondary group-hover:text-primary transition-colors">
                        About DISCC & History
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        32 years of humanitarian service in Varanasi
                      </span>
                    </Link>
                    <Link
                      href="/about#founder"
                      onClick={() => setActiveDropdown(null)}
                      className="p-3 rounded-xl hover:bg-muted/70 flex flex-col gap-0.5 transition-colors group"
                    >
                      <span className="text-xs font-bold text-secondary group-hover:text-primary transition-colors">
                        Dr. C. Tulsi Das
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        Founder President & Clinical Psychologist
                      </span>
                    </Link>
                    <Link
                      href="/our-impact"
                      onClick={() => setActiveDropdown(null)}
                      className="p-3 rounded-xl hover:bg-muted/70 flex flex-col gap-0.5 transition-colors group"
                    >
                      <span className="text-xs font-bold text-secondary group-hover:text-primary transition-colors">
                        Verified Impact & Honors
                      </span>
                      <span className="text-[11px] text-muted-foreground">
                        National awards, PM & CM accolades
                      </span>
                    </Link>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* WHAT WE DO: Interactive Current & Past Programs Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setActiveDropdown("what")}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              <button
                type="button"
                className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all flex items-center gap-1.5 ${
                  pathname?.startsWith("/our-work")
                    ? "text-primary bg-primary/10"
                    : "text-foreground/80 hover:text-primary hover:bg-muted"
                }`}
              >
                What We Do
                <ChevronDown className="w-3.5 h-3.5 transition-transform" />
              </button>

              <AnimatePresence>
                {activeDropdown === "what" && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.98 }}
                    transition={{ duration: 0.18 }}
                    className="absolute top-full -left-20 mt-1 w-[440px] bg-white rounded-3xl shadow-2xl border border-border p-4 z-50 space-y-3"
                  >
                    {/* Switcher Tabs */}
                    <div className="flex bg-muted/60 p-1 rounded-2xl">
                      <button
                        onClick={() => setWhatWeDoTab("current")}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          whatWeDoTab === "current"
                            ? "bg-white text-secondary shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Current Programs
                      </button>
                      <button
                        onClick={() => setWhatWeDoTab("past")}
                        className={`flex-1 py-1.5 rounded-xl text-xs font-bold transition-all ${
                          whatWeDoTab === "past"
                            ? "bg-white text-secondary shadow-xs"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        Past Milestones
                      </button>
                    </div>

                    {/* Content List */}
                    <div className="space-y-1 max-h-[300px] overflow-y-auto pr-1">
                      {(whatWeDoTab === "current" ? currentPrograms : pastPrograms).map((item) => {
                        const Icon = item.icon || Sparkles;
                        return (
                          <Link
                            key={item.title}
                            href={item.href}
                            onClick={() => setActiveDropdown(null)}
                            className="p-2.5 rounded-2xl hover:bg-muted/70 flex items-start gap-3 transition-colors group"
                          >
                            <div className="w-8 h-8 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                              <Icon className="w-4 h-4" />
                            </div>
                            <div className="flex flex-col flex-1 min-w-0">
                              <div className="flex items-center justify-between gap-2">
                                <span className="text-xs font-bold text-secondary group-hover:text-primary transition-colors truncate">
                                  {item.title}
                                </span>
                                {item.badge && (
                                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-primary/10 text-primary whitespace-nowrap">
                                    {item.badge}
                                  </span>
                                )}
                              </div>
                              <span className="text-[11px] text-muted-foreground line-clamp-1 mt-0.5">
                                {item.desc}
                              </span>
                            </div>
                          </Link>
                        );
                      })}
                    </div>

                    <div className="pt-2 border-t border-border flex items-center justify-between px-2">
                      <Link
                        href="/our-work"
                        onClick={() => setActiveDropdown(null)}
                        className="text-xs font-bold text-primary hover:underline flex items-center gap-1"
                      >
                        Explore all programs & centers
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* IMPACT STORIES */}
            <Link
              href="/stories"
              className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                pathname?.startsWith("/stories")
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-muted"
              }`}
            >
              Impact Stories
            </Link>

            {/* EVENTS */}
            <Link
              href="/events"
              className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                pathname?.startsWith("/events")
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-muted"
              }`}
            >
              Events
            </Link>

            {/* RESOURCES */}
            <Link
              href="/knowledge"
              className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                pathname?.startsWith("/knowledge")
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-muted"
              }`}
            >
              Resources
            </Link>

            {/* CONTACT US */}
            <Link
              href="/contact"
              className={`px-3.5 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all ${
                pathname?.startsWith("/contact")
                  ? "text-primary bg-primary/10"
                  : "text-foreground/80 hover:text-primary hover:bg-muted"
              }`}
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Corner: Donate CTA Button */}
          <div className="hidden sm:flex items-center gap-3">
            <Link href="/donate">
              <Button
                size="sm"
                className="h-10 px-5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold uppercase text-xs tracking-wider shadow-md hover:shadow-lg transition-all flex items-center gap-1.5"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                Donate
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex lg:hidden items-center gap-2">
            <Link href="/donate" className="sm:hidden">
              <Button size="sm" className="h-9 px-3 rounded-full bg-primary text-white font-bold text-xs uppercase">
                Donate
              </Button>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl text-foreground hover:bg-muted transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden border-t border-border bg-white px-4 py-6 space-y-4 shadow-xl overflow-hidden"
            >
              <div className="space-y-1">
                <Link
                  href="/about"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-bold text-sm text-secondary hover:bg-muted"
                >
                  Who We Are (About DISCC)
                </Link>

                <Link
                  href="/our-work"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-bold text-sm text-secondary hover:bg-muted"
                >
                  What We Do (Centers & Programs)
                </Link>

                <Link
                  href="/stories"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-bold text-sm text-secondary hover:bg-muted"
                >
                  Impact Stories
                </Link>

                <Link
                  href="/events"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-bold text-sm text-secondary hover:bg-muted"
                >
                  Events
                </Link>

                <Link
                  href="/knowledge"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-bold text-sm text-secondary hover:bg-muted"
                >
                  Resources & Filings
                </Link>

                <Link
                  href="/contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-2.5 rounded-xl font-bold text-sm text-secondary hover:bg-muted"
                >
                  Contact Us
                </Link>
              </div>

              <div className="pt-2 border-t border-border">
                <Link href="/donate" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full h-12 rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider shadow-md">
                    <Heart className="w-4 h-4 mr-2 fill-current" />
                    Donate to DISCC
                  </Button>
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </>
  );
}
