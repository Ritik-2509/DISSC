"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, ChevronRight, Phone, ArrowUpRight, Sparkles, ShieldCheck } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/#programs", label: "Our Network" },
  { href: "/stories", label: "How It Works" },
  { href: "/events", label: "Regions & Sanctuaries" },
  { href: "/fcra", label: "Insights & Compliance" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Is the navbar over the dark photographic hero?
  const isOverDarkHero = (pathname === "/" || pathname.startsWith("/programs/")) && !scrolled;

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isOverDarkHero
            ? "bg-transparent py-4 md:py-5 border-b border-transparent"
            : "bg-white/95 backdrop-blur-md py-3.5 border-b border-amber-200/80 shadow-sm"
        }`}
      >
        <div className="container-wide relative flex items-center justify-between min-h-[46px]">
          
          {/* 1. LEFT CORNER: Hamburger Menu Button (Optrar Pattern) */}
          <div className="flex items-center z-10">
            <button
              onClick={() => setDrawerOpen(true)}
              className={`p-2 sm:px-3.5 sm:py-2 rounded-full flex items-center gap-2 transition-all duration-300 cursor-pointer group ${
                isOverDarkHero
                  ? "bg-white/15 hover:bg-white/25 text-white border border-white/20 shadow-md backdrop-blur-xs"
                  : "bg-stone-100 hover:bg-amber-100/80 text-slate-900 border border-stone-200 shadow-2xs"
              }`}
              aria-label="Open Navigation Menu"
            >
              <Menu className="w-5 h-5 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline-block text-[11px] font-black tracking-widest uppercase">
                Menu
              </span>
            </button>
          </div>

          {/* 2. EXACT MATHEMATICAL CENTER: DISCC India Logo & Brand Name */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center z-10 pointer-events-auto">
            <Link
              href="/"
              onClick={(e) => {
                if (pathname === "/") {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }
              }}
              className="flex items-center gap-1.5 xs:gap-2.5 sm:gap-3 group cursor-pointer text-center"
              aria-label="DISCC India Home"
            >
              <div className="relative w-8 h-8 sm:w-11 sm:h-11 rounded-full overflow-hidden bg-white/15 border border-white/30 shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                <Image
                  src="/images/discc/logo.png"
                  alt="DISCC Logo"
                  fill
                  sizes="44px"
                  className="object-contain p-0.5"
                  priority
                />
              </div>
              <div className="flex flex-col text-left">
                <span
                  className={`font-heading font-black text-sm xs:text-base sm:text-xl md:text-2xl tracking-tight leading-none transition-colors ${
                    isOverDarkHero ? "text-white" : "text-slate-900"
                  }`}
                >
                  DISCC <span className="text-amber-400">INDIA</span>
                </span>
                <span
                  className={`hidden sm:block text-[8px] sm:text-[9px] md:text-[10px] uppercase tracking-widest font-bold leading-none mt-1 transition-colors ${
                    isOverDarkHero ? "text-white/80" : "text-slate-600"
                  }`}
                >
                  DEVA INTERNATIONAL SOCIETY FOR CHILD CARE
                </span>
              </div>
            </Link>
          </div>

          {/* 3. RIGHT CORNER: Phone Helpline & Floating DONATE NOW Button */}
          <div className="flex items-center gap-1.5 sm:gap-3 z-10 shrink-0">
            <a
              href="tel:7007453168"
              className={`hidden md:flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-full border transition-all ${
                isOverDarkHero
                  ? "text-white/90 border-white/25 hover:border-amber-400 bg-white/10"
                  : "text-slate-700 border-slate-300 hover:border-amber-500 bg-white/80"
              }`}
            >
              <Phone className="w-3.5 h-3.5 text-amber-400" />
              <span>7007453168</span>
            </a>

            {/* Floating DONATE NOW Button with Gentle Bounce / Micro-Motion */}
            <motion.div
              animate={{
                y: [0, -3.5, 0],
              }}
              transition={{
                duration: 2.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Link
                href="/donate"
                className="inline-flex items-center gap-1 sm:gap-2 px-2.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-black text-[11px] sm:text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 border border-amber-400 shadow-md shadow-amber-400/20 hover:scale-105 transition-all cursor-pointer group"
              >
                <Heart className="w-3 sm:w-4 h-3 sm:h-4 fill-slate-950 group-hover:scale-115 transition-transform" />
                <span className="tracking-wide">DONATE<span className="hidden xs:inline"> NOW</span></span>
              </Link>
            </motion.div>
          </div>

        </div>
      </header>

      {/* 4. REFERENCE SIDEBAR (Matching User's Provided Editorial Layout - Screenshot 3) */}
      <AnimatePresence>
        {drawerOpen && (
          <>
            {/* Backdrop Blur Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setDrawerOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 cursor-pointer"
            />

            {/* Editorial Large Typography Slide Drawer (Screenshot 3 Style) */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 220 }}
              className="fixed top-0 left-0 bottom-0 w-full max-w-[420px] sm:max-w-[480px] bg-[#FAF8F5] text-slate-900 z-50 shadow-2xl flex flex-col justify-between overflow-y-auto border-r border-[#EADCCB] p-8 sm:p-12 select-none"
            >
              {/* Drawer Top Header: Logo + Close Button */}
              <div>
                <div className="flex items-center justify-between pb-8 border-b border-stone-200/80">
                  <div className="flex items-center gap-3">
                    <div className="relative w-10 h-10 rounded-full overflow-hidden bg-amber-100 border border-amber-300 shrink-0">
                      <Image
                        src="/images/discc/logo.png"
                        alt="DISCC Logo"
                        fill
                        sizes="40px"
                        className="object-contain p-0.5"
                      />
                    </div>
                    <div>
                      <div className="font-heading font-black text-base text-slate-900 tracking-tight leading-none">
                        DISCC <span className="text-amber-600">INDIA</span>
                      </div>
                      <div className="text-[10px] text-slate-500 uppercase tracking-widest font-bold mt-1">
                        Varanasi, Est. 1991
                      </div>
                    </div>
                  </div>

                  {/* Close Cross Button */}
                  <button
                    onClick={() => setDrawerOpen(false)}
                    className="w-10 h-10 rounded-full bg-white border border-stone-200 hover:bg-stone-100 hover:border-amber-400 text-slate-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs group"
                    aria-label="Close Navigation Drawer"
                  >
                    <X className="w-5 h-5 group-hover:rotate-90 transition-transform" />
                  </button>
                </div>

                {/* EXTRA LARGE Editorial Links (Screenshot 3 Exact Styling) */}
                <nav className="py-8 sm:py-10 space-y-5 sm:space-y-6" aria-label="Editorial Side Navigation">
                  {NAV_LINKS.map((link, idx) => {
                    const isActive = pathname === link.href;

                    return (
                      <motion.div
                        key={link.href}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.04 + idx * 0.04, duration: 0.4 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setDrawerOpen(false)}
                          className={`flex items-center justify-between text-2xl sm:text-3xl lg:text-[34px] font-serif tracking-tight transition-all duration-300 group cursor-pointer ${
                            isActive
                              ? "text-amber-700 font-bold translate-x-2"
                              : "text-slate-900 font-normal hover:text-amber-700 hover:translate-x-2"
                          }`}
                        >
                          <span className="leading-tight">
                            {link.label}
                          </span>
                          <ChevronRight
                            className={`w-6 h-6 transition-all duration-300 ${
                              isActive
                                ? "text-amber-600 translate-x-1"
                                : "text-stone-300 group-hover:text-amber-600 group-hover:translate-x-2"
                            }`}
                          />
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Bottom: Institutional Credentials & Emergency Contact */}
              <div className="pt-6 border-t border-stone-200/80 space-y-4">
                <div className="p-4 rounded-2xl bg-white border border-stone-200 shadow-2xs space-y-1.5 text-left">
                  <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                    <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                    <span>Clinical Helpline & Consultation</span>
                  </div>
                  <a
                    href="tel:7007453168"
                    className="block text-base font-bold text-slate-900 hover:text-amber-600 transition-colors"
                  >
                    7007453168 / 9415303557
                  </a>
                  <p className="text-[11px] text-slate-500">
                    B.21/100, Bind Bhavan, Kamachha & Deva Gram Bachhaon, Varanasi.
                  </p>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
                  <span className="flex items-center gap-1.5 text-emerald-700 font-bold">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    FCRA & 80G Certified
                  </span>
                  <Link
                    href="/donate"
                    onClick={() => setDrawerOpen(false)}
                    className="font-bold text-amber-700 hover:underline flex items-center gap-1"
                  >
                    <span>Donate</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
