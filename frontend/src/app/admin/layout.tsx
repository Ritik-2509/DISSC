"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  FileText,
  BookOpen,
  Image as ImageIcon,
  Images,
  Users,
  MessageSquare,
  Quote,
  HelpCircle,
  Settings,
  Database,
  Menu,
  X,
  ExternalLink,
  ShieldCheck,
  ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/pages", label: "Manage Pages", icon: FileText, badge: "39" },
  { href: "/admin/blogs", label: "Blogs & Stories", icon: BookOpen },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon, badge: "755" },
  { href: "/admin/gallery", label: "Galleries", icon: Images, badge: "44" },
  { href: "/admin/teams", label: "Teams & Leadership", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/contact", label: "Contact Inquiries", icon: MessageSquare, badge: "1.5K" },
  { href: "/admin/faqs", label: "Manage FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/migration", label: "Database Migration", icon: Database },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-muted/20 flex flex-col lg:flex-row text-foreground antialiased">
      {/* Mobile Top Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-secondary text-white border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full bg-white p-0.5 flex-shrink-0">
            <Image
              src={CLOUDINARY_IMAGES.logo}
              alt="DISCC Logo"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <span className="font-display font-black text-lg tracking-tight">
            DISCC <span className="text-accent">ADMIN</span>
          </span>
        </div>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-secondary text-white flex flex-col transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:flex-shrink-0 ${
          mobileMenuOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-6 border-b border-white/10 flex items-center justify-between">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full bg-white p-1 flex-shrink-0 shadow-xs">
              <Image
                src={CLOUDINARY_IMAGES.logo}
                alt="DISCC Emblem"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <span className="font-display font-black text-xl tracking-tight block text-white group-hover:text-accent transition-colors">
                DISCC <span className="text-primary font-bold">ADMIN</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-white/60 block">
                Disability Care Foundation
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden text-white/70 hover:text-white p-1"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* User Badge */}
        <div className="px-6 py-3.5 bg-black/20 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xs">
              RD
            </div>
            <div className="truncate">
              <p className="text-xs font-bold text-white leading-none">Raaj Deva</p>
              <p className="text-[10px] text-accent mt-0.5">raajdeva@disccindia.org</p>
            </div>
          </div>
          <span className="w-2 h-2 rounded-full bg-emerald-400" title="Active Admin Session"></span>
        </div>

        {/* Nav Links */}
        <nav className="flex-1 overflow-y-auto p-4 space-y-1 scrollbar-thin">
          <span className="text-[10px] uppercase tracking-widest text-white/40 font-bold px-3 py-1.5 block">
            Navigation Menu
          </span>
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== "/admin" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-colors ${
                  isActive
                    ? "bg-primary text-white shadow-sm font-bold"
                    : "text-white/75 hover:text-white hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-accent"}`} />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                      isActive ? "bg-white/20 text-white" : "bg-white/10 text-white/80"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/10 space-y-2 bg-black/10">
          <Link href="/" target="_blank" className="w-full block">
            <Button
              variant="outline"
              className="w-full h-10 rounded-xl text-xs font-bold border-white/20 hover:border-white text-white hover:text-secondary bg-transparent hover:bg-white flex items-center justify-center gap-2"
            >
              <span>View Live Website</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Button>
          </Link>
          <p className="text-[10px] text-white/50 text-center pt-1">
            DISCC Varanasi • 32 Years of Service
          </p>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Dynamic Navbar */}
        <header className="hidden lg:flex sticky top-0 z-30 h-16 bg-card/90 backdrop-blur-md border-b border-border/80 px-8 items-center justify-between shadow-xs transition-all">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Link href="/admin" className="hover:text-primary transition-colors">
              Admin
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-muted-foreground/50" />
            <span className="font-semibold text-secondary capitalize">
              {pathname.split("/")[2] || "Dashboard"}
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-xs text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Connected to DISCC Cloud</span>
            </div>
            <Link href="/" target="_blank">
              <Button size="sm" variant="ghost" className="text-xs text-secondary hover:text-primary flex items-center gap-1">
                <span>Visit Site</span>
                <ExternalLink className="w-3 h-3" />
              </Button>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 2xl:p-10 w-full">
          {children}
        </main>
      </div>

      {/* Mobile Backdrop */}
      {mobileMenuOpen && (
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-xs lg:hidden"
        />
      )}
    </div>
  );
}
