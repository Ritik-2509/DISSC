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
  Cloud,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";

function getStats() {
  const exportDir = path.join(process.cwd(), "firestore_export");
  let counts = {
    pages: 39,
    blogs: 3,
    media: 755,
    galleries: 44,
    contacts: 1571,
    teams: 5,
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
        recentContacts = conts.slice(-5).reverse();
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
  const isCloudinarySet = Boolean(process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_CLOUD_NAME);

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-secondary rounded-3xl p-6 md:p-8 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm border border-white/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-accent text-xs font-bold uppercase tracking-wider">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>DISCC Central Administration Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-white">
            Welcome, Raaj Deva
          </h1>
          <p className="text-xs text-white/75 max-w-xl">
            Complete management of DISCC India web assets, clinical programs, original photo galleries, and database synchronization.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Link href="/admin/migration">
            <Button className="rounded-full bg-accent text-secondary hover:bg-accent/90 font-bold text-xs uppercase tracking-wider px-5 h-11 shadow-sm flex items-center gap-2">
              <Database className="w-4 h-4" />
              <span>Firebase Migration</span>
            </Button>
          </Link>
          <Link href="/admin/media">
            <Button className="rounded-full bg-white hover:bg-accent text-secondary hover:text-secondary font-bold text-xs uppercase tracking-wider px-5 h-11 shadow-sm flex items-center gap-2 transition-all">
              <Cloud className="w-4 h-4" />
              <span>Media Library</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        <Link href="/admin/pages" className="group">
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-primary/50 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Pages</span>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <FileText className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-black text-secondary">{counts.pages}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <span>All client pages indexed</span>
                <ArrowRight className="w-3 h-3 text-primary" />
              </p>
            </div>
          </div>
        </Link>

        <Link href="/admin/media" className="group">
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-primary/50 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Media Files</span>
              <div className="w-10 h-10 rounded-2xl bg-accent/20 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <ImageIcon className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-black text-secondary">{counts.media}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <span>Cloudinary ready</span>
                <ArrowRight className="w-3 h-3 text-primary" />
              </p>
            </div>
          </div>
        </Link>

        <Link href="/admin/gallery" className="group">
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-primary/50 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Galleries</span>
              <div className="w-10 h-10 rounded-2xl bg-secondary/10 text-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                <Images className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-black text-secondary">{counts.galleries}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <span>2025 and 2026 albums</span>
                <ArrowRight className="w-3 h-3 text-primary" />
              </p>
            </div>
          </div>
        </Link>

        <Link href="/admin/contact" className="group">
          <div className="p-6 rounded-3xl bg-card border border-border shadow-xs hover:border-primary/50 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Inquiries</span>
              <div className="w-10 h-10 rounded-2xl bg-primary/10 text-primary flex items-center justify-center group-hover:scale-110 transition-transform">
                <MessageSquare className="w-5 h-5" />
              </div>
            </div>
            <div>
              <p className="text-3xl sm:text-4xl font-display font-black text-secondary">{counts.contacts}</p>
              <p className="text-[11px] text-muted-foreground mt-1 flex items-center gap-1">
                <span>Total messages captured</span>
                <ArrowRight className="w-3 h-3 text-primary" />
              </p>
            </div>
          </div>
        </Link>
      </div>

      {/* Cloudinary Integration Status Bar */}
      <div className={`p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isCloudinarySet ? "bg-emerald-50 border-emerald-200 text-emerald-950" : "bg-amber-50 border-amber-200 text-amber-950"
      }`}>
        <div className="flex items-center gap-3">
          <Cloud className={`w-6 h-6 ${isCloudinarySet ? "text-emerald-600" : "text-amber-600"}`} />
          <div>
            <p className="text-xs font-bold">
              {isCloudinarySet ? "Cloudinary API Connected" : "Cloudinary Setup Required"}
            </p>
            <p className="text-[11px] opacity-85">
              {isCloudinarySet
                ? "Your Cloudinary credentials are active. Images upload directly to your cloud storage."
                : "Add CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in frontend/.env.local."}
            </p>
          </div>
        </div>
        <Link href="/admin/media">
          <Button size="sm" variant="outline" className="text-xs rounded-xl font-bold bg-white text-secondary hover:bg-muted">
            Manage Cloud Storage
          </Button>
        </Link>
      </div>

      {/* Main Grid: Recent Inquiries & Recent Galleries */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Col: Recent Contact Messages */}
        <div className="lg:col-span-7 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-display font-black text-secondary">Recent Contact Inquiries</h2>
              <p className="text-xs text-muted-foreground">Inquiries from families, donors and volunteers</p>
            </div>
            <Link href="/admin/contact">
              <Button variant="ghost" size="sm" className="text-xs text-primary font-bold hover:text-secondary">
                View All {counts.contacts} <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="divide-y divide-border/60">
            {recentContacts.map((contact, i) => (
              <div key={contact.id || i} className="py-3.5 flex items-start justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-secondary">{contact.name || "Anonymous"}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-medium">
                      {contact.phone || "No phone"}
                    </span>
                  </div>
                  <p className="text-xs text-primary font-medium">{contact.email || "No email"}</p>
                  <p className="text-xs text-muted-foreground line-clamp-1 max-w-md">
                    {contact.content || contact.subject || "Inquiry submission"}
                  </p>
                </div>
                <span className="text-[11px] text-muted-foreground flex-shrink-0 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{contact.created_at ? contact.created_at.split(" ")[0] : "Recent"}</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Col: Gallery Showcase */}
        <div className="lg:col-span-5 bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-border pb-4">
            <div>
              <h2 className="text-lg font-display font-black text-secondary">Recent Galleries</h2>
              <p className="text-xs text-muted-foreground">Active event photo albums</p>
            </div>
            <Link href="/admin/gallery">
              <Button variant="ghost" size="sm" className="text-xs text-primary font-bold hover:text-secondary">
                View All <ArrowRight className="w-3.5 h-3.5 ml-1" />
              </Button>
            </Link>
          </div>

          <div className="space-y-4">
            {recentGalleries.map((gal, i) => (
              <div key={gal.id || i} className="flex items-center gap-4 p-2 rounded-2xl hover:bg-muted/40 transition-colors">
                <div className="relative w-16 h-14 rounded-xl overflow-hidden bg-muted border border-border flex-shrink-0">
                  {gal.imageUrl ? (
                    <Image
                      src={gal.imageUrl}
                      alt={gal.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-[10px]">No image</div>
                  )}
                </div>
                <div className="truncate flex-1">
                  <p className="font-bold text-sm text-secondary truncate">{gal.name}</p>
                  <p className="text-xs text-muted-foreground">{gal.year || "2026"} • {Array.isArray(gal.images) ? gal.images.length : 0} photos</p>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Link href="/admin/gallery">
              <Button className="w-full h-11 rounded-xl bg-secondary hover:bg-secondary/90 text-white font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2">
                <Plus className="w-4 h-4" />
                <span>Create New Gallery Album</span>
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
