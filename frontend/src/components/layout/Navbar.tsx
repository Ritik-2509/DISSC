"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, ChevronDown, Phone } from "lucide-react";

const NAV_LINKS = [
  { href: "/about", label: "About" },
  {
    href: "/#programs",
    label: "Programs",
    children: [
      { href: "/programs/gangotri-centre", label: "Gangotri Centre" },
      { href: "/programs/ambedkar-school", label: "Ambedkar School" },
      { href: "/programs/nakuti-raghunath-school", label: "Nakuti Raghunath School" },
      { href: "/programs/navjeevan-clinic", label: "Navjeevan Clinic" },
    ],
  },
  { href: "/stories", label: "Impact & Stories" },
  { href: "/events", label: "Events" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const isHomePage = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Is the navbar over the dark photographic hero?
  const isOverDarkHero = (isHomePage || pathname.startsWith("/programs/")) && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isOverDarkHero
          ? "bg-transparent py-5 md:py-6 border-b border-transparent"
          : "bg-white/95 backdrop-blur-md py-4 border-b border-amber-200/80 shadow-sm"
      }`}
    >
      <div className="container-wide flex items-center justify-between">
        <Link
          href="/"
          onClick={(e) => {
            if (pathname === "/") {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
          className="flex items-center gap-3.5 group cursor-pointer"
          aria-label="DISCC India Home"
        >
          <div className="relative w-12 h-12 md:w-13 md:h-13 rounded-full overflow-hidden bg-white/10 border border-white/30 flex-shrink-0 shadow-xs">
            <Image
              src="/images/discc/logo.png"
              alt="DISCC Logo"
              fill
              sizes="52px"
              className="object-contain p-1"
              priority
            />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-1.5">
              <span
                className={`font-heading font-black text-xl md:text-2xl tracking-tight leading-tight transition-colors ${
                  isOverDarkHero ? "text-white" : "text-slate-900"
                }`}
              >
                DISCC <span className="text-amber-400">INDIA</span>
              </span>
            </div>
            <span
              className={`text-[11px] md:text-xs uppercase tracking-widest font-bold leading-none mt-0.5 transition-colors ${
                isOverDarkHero ? "text-white/80" : "text-slate-600"
              }`}
            >
              Deva International Society for Child Care
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-1.5" aria-label="Main Navigation">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/" && pathname?.startsWith(link.href));

            if (link.children) {
              return (
                <div
                  key={link.href}
                  className="relative"
                  onMouseEnter={() => setDropdownOpen(true)}
                  onMouseLeave={() => setDropdownOpen(false)}
                >
                  <Link
                    href={link.href}
                    className={`flex items-center gap-1.5 px-3.5 py-2 text-[15px] font-bold rounded-lg transition-colors cursor-pointer ${
                      isOverDarkHero
                        ? isActive
                          ? "text-amber-300 bg-white/15"
                          : "text-white hover:text-amber-300 hover:bg-white/10"
                        : isActive
                        ? "text-amber-700 bg-amber-100/70"
                        : "text-slate-800 hover:text-amber-700 hover:bg-amber-50/80"
                    }`}
                  >
                    <span>{link.label}</span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-200 ${
                        dropdownOpen
                          ? "rotate-180 text-amber-400"
                          : isOverDarkHero
                          ? "text-white/70"
                          : "text-slate-500"
                      }`}
                    />
                  </Link>

                  <AnimatePresence>
                    {dropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 mt-1 w-64 bg-slate-900/95 backdrop-blur-lg shadow-2xl rounded-2xl border border-white/20 z-50 overflow-hidden py-1.5"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            onClick={() => setDropdownOpen(false)}
                            className="block px-5 py-3 text-sm font-semibold text-white/90 hover:bg-amber-400 hover:text-slate-950 transition-colors border-b border-white/10 last:border-b-0 cursor-pointer"
                          >
                            {child.label}
                          </Link>
                        ))}
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
                className={`px-3.5 py-2 text-[15px] font-bold rounded-lg transition-colors cursor-pointer relative ${
                  isOverDarkHero
                    ? isActive
                      ? "text-amber-300 bg-white/15"
                      : "text-white hover:text-amber-300 hover:bg-white/10"
                    : isActive
                    ? "text-amber-700 bg-amber-100/70"
                    : "text-slate-800 hover:text-amber-700 hover:bg-amber-50/80"
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span
                    className={`absolute bottom-1 left-3.5 right-3.5 h-0.5 rounded-full ${
                      isOverDarkHero ? "bg-amber-400" : "bg-amber-600"
                    }`}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="hidden lg:flex items-center gap-3">
          <a
            href="tel:7007453168"
            className={`flex items-center gap-2 text-xs font-bold px-3.5 py-2 rounded-full border transition-colors ${
              isOverDarkHero
                ? "text-white/90 border-white/25 hover:border-amber-400 bg-white/10"
                : "text-slate-700 border-slate-300 hover:border-teal-500 bg-white/80"
            }`}
          >
            <Phone className="w-3.5 h-3.5 text-amber-400" />
            <span>7007453168</span>
          </a>

          <Link
            href="/donate"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full font-black text-sm text-slate-950 bg-amber-400 hover:bg-amber-300 border border-amber-400 shadow-lg shadow-amber-400/30 hover:scale-105 transition-all cursor-pointer"
          >
            <Heart className="w-4 h-4 fill-slate-950" />
            <span>DONATE NOW</span>
          </Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className={`lg:hidden p-2.5 rounded-xl transition-colors ${
            isOverDarkHero
              ? "bg-white/15 text-white hover:bg-white/25"
              : "bg-amber-100/80 text-slate-900 hover:bg-amber-200"
          }`}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-slate-950/98 backdrop-blur-xl border-b border-white/15 text-white shadow-2xl overflow-hidden"
          >
            <div className="container-wide py-5 flex flex-col gap-1.5">
              {NAV_LINKS.map((link) => (
                <div key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 text-base font-bold rounded-xl transition-colors ${
                      pathname === link.href
                        ? "text-amber-400 bg-white/10"
                        : "text-white/90 hover:bg-white/5"
                    }`}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <div className="pl-6 space-y-1 mt-1 border-l-2 border-white/20 ml-4">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          onClick={() => setMobileOpen(false)}
                          className="block py-2 text-sm font-semibold text-white/70 hover:text-amber-300"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <div className="pt-4 mt-2 border-t border-white/15 flex flex-col gap-3">
                <a
                  href="tel:7007453168"
                  className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-white/30 text-sm font-bold text-white"
                >
                  <Phone className="w-4 h-4 text-amber-400" />
                  <span>Call Helpline: 7007453168</span>
                </a>

                <Link
                  href="/donate"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 py-3 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-black text-sm shadow-md"
                >
                  <Heart className="w-4 h-4 fill-slate-950" />
                  <span>DONATE NOW</span>
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
