"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Sliders,
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
  ChevronRight,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/hero", label: "Hero Slideshow", icon: Sliders },
  { href: "/admin/projects", label: "Projects & Care", icon: Sparkles },
  { href: "/admin/pages", label: "Manage Pages", icon: FileText },
  { href: "/admin/blogs", label: "Blogs & Stories", icon: BookOpen },
  { href: "/admin/gallery", label: "Galleries & Events", icon: Images },
  { href: "/admin/media", label: "Media Library", icon: ImageIcon },
  { href: "/admin/teams", label: "Teams & Advisory", icon: Users },
  { href: "/admin/testimonials", label: "Testimonials", icon: Quote },
  { href: "/admin/contact", label: "Inquiries & Callbacks", icon: MessageSquare },
  { href: "/admin/faqs", label: "Manage FAQs", icon: HelpCircle },
  { href: "/admin/settings", label: "Site Settings", icon: Settings },
  { href: "/admin/migration", label: "Data & Migration", icon: Database },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FFFAF2] flex flex-col lg:flex-row text-foreground antialiased selection:bg-primary selection:text-white">
      {/* Mobile Header */}
      <header className="lg:hidden sticky top-0 z-40 bg-white border-b border-border/80 px-4 py-3 flex items-center justify-between shadow-xs">
        <Link href="/admin" className="flex items-center gap-2.5">
          <div className="relative w-8 h-8 rounded-full bg-white p-0.5 border border-border shadow-xs">
            <Image
              src="/images/discc/logo.png"
              alt="DISCC Logo"
              fill
              className="object-contain p-0.5"
            />
          </div>
          <span className="font-heading font-extrabold text-base tracking-tight text-foreground">
            DISCC <span className="text-primary font-bold">ADMIN</span>
          </span>
        </Link>
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-xl bg-[#FFFAF2] border border-border text-foreground hover:bg-muted transition-colors cursor-pointer"
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Sidebar Navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-72 bg-white border-r border-border/80 flex flex-col transition-transform duration-300 ease-in-out lg:sticky lg:top-0 lg:h-screen lg:flex-shrink-0 ${
          mobileMenuOpen ? "translate-x-0 shadow-2xl" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="p-5 border-b border-border/70 flex items-center justify-between bg-[#FFFAF2]/50">
          <Link href="/admin" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 rounded-full bg-white p-1 border border-border shadow-soft flex-shrink-0 transition-transform group-hover:scale-105">
              <Image
                src="/images/discc/logo.png"
                alt="DISCC Logo"
                fill
                className="object-contain p-0.5"
                priority
              />
            </div>
            <div>
              <span className="font-heading font-extrabold text-lg tracking-tight block text-foreground group-hover:text-primary transition-colors leading-tight">
                DISCC <span className="text-primary font-bold">CMS</span>
              </span>
              <span className="text-[10px] uppercase tracking-wider text-muted-text font-medium block">
                Varanasi Foundation
              </span>
            </div>
          </Link>
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="lg:hidden p-1.5 rounded-lg text-muted-text hover:text-foreground"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          <p className="px-3 py-1.5 text-[10.5px] font-bold uppercase tracking-wider text-muted-text">
            Management Modules
          </p>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-white shadow-soft font-bold"
                    : "text-foreground/80 hover:bg-[#FFFAF2] hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-white" : "text-primary/80"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>
                {isActive && <ChevronRight className="w-4 h-4 opacity-80" />}
              </Link>
            );
          })}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-border/70 bg-[#FFFAF2]/50 space-y-3">
          <Link href="/" target="_blank">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-center gap-2 text-xs bg-white"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View Public Website
            </Button>
          </Link>
          <div className="flex items-center justify-between text-[11px] text-muted-text px-1">
            <span>Admin Active</span>
            <span className="flex items-center gap-1 text-primary font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Connected
            </span>
          </div>
        </div>
      </aside>

      {/* Main Admin Content */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 lg:p-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
