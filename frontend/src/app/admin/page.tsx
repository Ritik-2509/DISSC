import Link from "next/link";
import Image from "next/image";
import fs from "fs";
import path from "path";
import {
  FileText,
  BookOpen,
  Image as ImageIcon,
  Images,
  MessageSquare,
  Users,
  ArrowRight,
  Database,
  CheckCircle2,
  Sliders,
  Sparkles,
  ShieldCheck,
  Plus,
  Heart,
  PhoneCall
} from "lucide-react";
import { Button } from "@/components/ui/button";

function getStats() {
  const exportDir = path.join(process.cwd(), "firestore_export");
  let counts = {
    hero: 4,
    projects: 8,
    pages: 39,
    blogs: 6,
    media: 755,
    galleries: 44,
    contacts: 1571,
    teams: 3,
  };

  let recentContacts: any[] = [];
  let recentGalleries: any[] = [];

  try {
    if (fs.existsSync(exportDir)) {
      const pFile = path.join(exportDir, "pages.json");
      if (fs.existsSync(pFile)) counts.pages = JSON.parse(fs.readFileSync(pFile, "utf8")).length;

      const bFile = path.join(exportDir, "blogs.json");
      if (fs.existsSync(bFile)) counts.blogs = JSON.parse(fs.readFileSync(bFile, "utf8")).length;

      const mFile = path.join(exportDir, "media.json");
      if (fs.existsSync(mFile)) counts.media = JSON.parse(fs.readFileSync(mFile, "utf8")).length;

      const gFile = path.join(exportDir, "galleries.json");
      if (fs.existsSync(gFile)) {
        const gals = JSON.parse(fs.readFileSync(gFile, "utf8"));
        counts.galleries = gals.length;
        recentGalleries = gals.slice(0, 4);
      }

      const cFile = path.join(exportDir, "contacts.json");
      if (fs.existsSync(cFile)) {
        const conts = JSON.parse(fs.readFileSync(cFile, "utf8"));
        counts.contacts = conts.length;
        recentContacts = conts.slice(-6).reverse();
      }

      const tFile = path.join(exportDir, "teams.json");
      if (fs.existsSync(tFile)) counts.teams = JSON.parse(fs.readFileSync(tFile, "utf8")).length;
    }
  } catch (e) {
    console.error("Error reading export stats:", e);
  }

  return { counts, recentContacts, recentGalleries };
}

export default function AdminDashboard() {
  const { counts, recentContacts, recentGalleries } = getStats();

  return (
    <div className="space-y-8">
      {/* 1. Header Banner */}
      <div className="bg-gradient-to-r from-[#FFEFE0] via-[#FFFAF2] to-[#FFEFE0] rounded-3xl p-6 sm:p-8 border border-border/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DISCC Central Administration</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Welcome to DISCC CMS Portal
          </h1>
          <p className="text-xs sm:text-sm text-muted-text max-w-xl leading-relaxed">
            Manage clinical programmes, hero slides, photo galleries, donor acknowledgments, and family consultation requests.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/hero">
            <Button variant="default" size="sm" className="rounded-full gap-1.5 shadow-soft">
              <Sliders className="w-4 h-4" />
              Manage Hero Slides
            </Button>
          </Link>
          <Link href="/admin/contact">
            <Button variant="donate" size="sm" className="rounded-full gap-1.5 shadow-glow-marigold">
              <MessageSquare className="w-4 h-4" />
              View Inquiries ({counts.contacts})
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. Key Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        <Link href="/admin/hero" className="p-5 rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
            <Sliders className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold font-heading text-foreground">{counts.hero}</p>
          <p className="text-xs text-muted-text font-semibold mt-0.5">Hero Slides</p>
        </Link>

        <Link href="/admin/projects" className="p-5 rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="w-10 h-10 rounded-2xl bg-[#0F8B8D]/10 text-[#0F8B8D] flex items-center justify-center mb-3">
            <Sparkles className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold font-heading text-foreground">{counts.projects}</p>
          <p className="text-xs text-muted-text font-semibold mt-0.5">Programmes</p>
        </Link>

        <Link href="/admin/gallery" className="p-5 rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="w-10 h-10 rounded-2xl bg-[#F5A524]/10 text-[#F5A524] flex items-center justify-center mb-3">
            <Images className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold font-heading text-foreground">{counts.galleries}</p>
          <p className="text-xs text-muted-text font-semibold mt-0.5">Photo Albums</p>
        </Link>

        <Link href="/admin/media" className="p-5 rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="w-10 h-10 rounded-2xl bg-[#EE6C4D]/10 text-[#EE6C4D] flex items-center justify-center mb-3">
            <ImageIcon className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold font-heading text-foreground">{counts.media}</p>
          <p className="text-xs text-muted-text font-semibold mt-0.5">Media Assets</p>
        </Link>

        <Link href="/admin/blogs" className="p-5 rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="w-10 h-10 rounded-2xl bg-[#8E7CC3]/10 text-[#8E7CC3] flex items-center justify-center mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold font-heading text-foreground">{counts.blogs}</p>
          <p className="text-xs text-muted-text font-semibold mt-0.5">Articles & Stories</p>
        </Link>

        <Link href="/admin/contact" className="p-5 rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all">
          <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-3">
            <MessageSquare className="w-5 h-5" />
          </div>
          <p className="text-2xl font-bold font-heading text-foreground">{counts.contacts}</p>
          <p className="text-xs text-muted-text font-semibold mt-0.5">Inquiries</p>
        </Link>
      </div>

      {/* 3. Recent Contacts & Inquiries */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold font-heading text-foreground">
              Recent Consultations & Inquiries
            </h2>
            <p className="text-xs text-muted-text">
              Real-time patient assessments, volunteer registrations, and callback requests
            </p>
          </div>
          <Link href="/admin/contact">
            <Button variant="outline" size="sm" className="rounded-full gap-1 text-xs">
              View All Inquiries
              <ArrowRight className="w-3.5 h-3.5" />
            </Button>
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="border-b border-border/60 text-muted-text font-bold uppercase text-[10.5px]">
                <th className="pb-3">Name / Contact</th>
                <th className="pb-3">Phone</th>
                <th className="pb-3">Subject / Request</th>
                <th className="pb-3">Status</th>
                <th className="pb-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {recentContacts.map((contact, i) => (
                <tr key={contact.id || i} className="hover:bg-[#FFFAF2]/50 transition-colors">
                  <td className="py-3.5 font-bold text-foreground">
                    {contact.name || "Anonymous Visitor"}
                    {contact.email && (
                      <span className="block text-[11px] text-muted-text font-normal">
                        {contact.email}
                      </span>
                    )}
                  </td>
                  <td className="py-3.5 font-mono text-xs font-semibold text-primary">
                    {contact.phone || "-"}
                  </td>
                  <td className="py-3.5 text-muted-text max-w-xs truncate">
                    {contact.subject || contact.content || "Assessment Booking"}
                  </td>
                  <td className="py-3.5">
                    <span className="px-2.5 py-1 rounded-full text-[10.5px] font-bold bg-[#E6F6EE] text-[#0F8B8D]">
                      {contact.status || "new"}
                    </span>
                  </td>
                  <td className="py-3.5 text-right">
                    <Link
                      href="/admin/contact"
                      className="text-xs font-bold text-primary hover:underline"
                    >
                      Respond
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
