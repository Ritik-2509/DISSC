"use client";

import { useState } from "react";
import {
  Database,
  CheckCircle2,
  AlertCircle,
  Copy,
  Check,
  FileCode,
  Download,
  Play,
  Cloud,
  Terminal
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AdminMigration() {
  const [copiedCmd, setCopiedCmd] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(false);

  const collections = [
    { name: "pages", count: 39, file: "pages.json", description: "All 39 static and program landing pages" },
    { name: "blogs", count: 3, file: "blogs.json", description: "Articles and success stories" },
    { name: "galleries", count: 44, file: "galleries.json", description: "Photo albums with full image arrays" },
    { name: "media", count: 755, file: "media.json", description: "Complete media file library and URLs" },
    { name: "contacts", count: 1571, file: "contacts.json", description: "All past inquiries and contact messages" },
    { name: "teams", count: 5, file: "teams.json", description: "Founder and leadership team members" },
    { name: "testimonials", count: 4, file: "testimonials.json", description: "Client & parent feedback" },
    { name: "faqs", count: 18, file: "faqs.json", description: "Frequently asked questions" },
    { name: "settings", count: 100, file: "settings.json", description: "Key-value configuration documents" },
    { name: "categories", count: 9, file: "categories.json", description: "Blog and project categories" },
  ];

  const handleCopyCommand = () => {
    navigator.clipboard.writeText("node scripts/migrate_to_firestore.js");
    setCopiedCmd(true);
    setTimeout(() => setCopiedCmd(false), 2000);
  };

  const handleCopyDeploy = () => {
    navigator.clipboard.writeText("firebase deploy --only firestore:indexes");
    setCopiedIndex(true);
    setTimeout(() => setCopiedIndex(false), 2000);
  };

  return (
    <div className="space-y-8 max-w-5xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Database Sync Console</span>
          <span className="text-xs bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded-full font-bold">
            Parsed from wpadmin.sql
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
          SQL to Firebase Firestore Migration
        </h1>
        <p className="text-xs text-muted-foreground">
          Your complete database has been extracted into production-grade Firestore collections with indexing rules.
        </p>
      </div>

      {/* Summary Card */}
      <div className="bg-secondary rounded-3xl p-6 md:p-8 text-white space-y-4 border border-white/10">
        <div className="flex items-center gap-3">
          <CheckCircle2 className="w-6 h-6 text-accent flex-shrink-0" />
          <h2 className="font-display font-black text-xl">
            10 Collections Ready for Firestore Migration
          </h2>
        </div>
        <p className="text-xs text-white/80 leading-relaxed max-w-2xl">
          The parser has processed all 3.3 MB of <code className="bg-black/30 px-2 py-0.5 rounded font-mono text-accent">wpadmin.sql</code>, mapped every URL slug, preserved relational image arrays, and prepared index definitions.
        </p>
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <button
            onClick={handleCopyCommand}
            className="px-5 py-2.5 rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 shadow-sm transition-all"
          >
            {copiedCmd ? <Check className="w-3.5 h-3.5" /> : <Terminal className="w-3.5 h-3.5" />}
            <span>{copiedCmd ? "Copied Command!" : "Copy CLI Upload Command"}</span>
          </button>

          <button
            onClick={handleCopyDeploy}
            className="px-5 py-2.5 rounded-full bg-white/15 hover:bg-white/25 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-2 transition-all"
          >
            {copiedIndex ? <Check className="w-3.5 h-3.5" /> : <Database className="w-3.5 h-3.5" />}
            <span>{copiedIndex ? "Copied!" : "Deploy Firestore Indexes"}</span>
          </button>
        </div>
      </div>

      {/* Collections Grid */}
      <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <div>
            <h3 className="font-display font-bold text-lg text-secondary">Exported Firestore Collections</h3>
            <p className="text-xs text-muted-foreground">Stored locally in frontend/firestore_export/</p>
          </div>
          <span className="text-xs font-bold text-primary">Total: 2,442 Documents</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {collections.map((col) => (
            <div key={col.name} className="p-4 rounded-2xl bg-muted/30 border border-border/80 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-secondary capitalize">{col.name}</span>
                <span className="text-xs font-bold bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                  {col.count} docs
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground line-clamp-2">{col.description}</p>
              <div className="pt-1 text-[10px] text-primary font-mono font-semibold">
                frontend/firestore_export/{col.file}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step by Step Guide for Credentials */}
      <div className="bg-card rounded-3xl border border-border p-6 sm:p-8 shadow-xs space-y-6">
        <div className="flex items-center gap-3 border-b border-border pb-3">
          <Terminal className="w-5 h-5 text-primary" />
          <div>
            <h3 className="font-display font-bold text-lg text-secondary">
              Step-by-Step Guide for Firebase & Cloudinary
            </h3>
            <p className="text-xs text-muted-foreground">Follow these 2 simple steps to execute live cloud synchronization</p>
          </div>
        </div>

        <div className="space-y-6 text-xs leading-relaxed">
          {/* Step 1 */}
          <div className="space-y-2">
            <h4 className="font-bold text-sm text-secondary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">1</span>
              <span>Enable Firebase Admin Write Access (Optional for Live DB)</span>
            </h4>
            <p className="text-muted-foreground">
              To write all 2,440+ documents into your live Firestore project <code className="bg-muted px-1.5 py-0.5 rounded text-secondary font-mono">dissc-60e94</code>:
            </p>
            <ol className="list-decimal list-inside pl-2 space-y-1 text-muted-foreground">
              <li>Open your Firebase Console: <a href="https://console.firebase.google.com/project/dissc-60e94/settings/serviceaccounts/adminsdk" target="_blank" className="text-primary underline font-medium">Firebase Console Service Accounts</a></li>
              <li>Click <strong>Generate new private key</strong> and download the JSON file.</li>
              <li>Rename it to <code className="bg-muted px-1.5 py-0.5 rounded text-secondary font-mono">serviceAccountKey.json</code> and place it in the <code className="bg-muted px-1.5 py-0.5 rounded text-secondary font-mono">frontend/</code> directory.</li>
              <li>Run: <code className="bg-secondary text-white px-2 py-0.5 rounded font-mono">node scripts/migrate_to_firestore.js</code></li>
            </ol>
          </div>

          {/* Step 2 */}
          <div className="space-y-2 pt-4 border-t border-border">
            <h4 className="font-bold text-sm text-secondary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">2</span>
              <span>Configure Cloudinary Media Storage</span>
            </h4>
            <p className="text-muted-foreground">
              Add your Cloudinary account credentials to <code className="bg-muted px-1.5 py-0.5 rounded text-secondary font-mono">frontend/.env.local</code>:
            </p>
            <div className="bg-secondary text-white p-3.5 rounded-xl font-mono text-[11px] space-y-1">
              <p>CLOUDINARY_CLOUD_NAME=your_cloud_name</p>
              <p>CLOUDINARY_API_KEY=your_api_key</p>
              <p>CLOUDINARY_API_SECRET=your_api_secret</p>
            </div>
            <p className="text-muted-foreground">
              Once added, images upload directly from the Admin Media Library, Pages, Blogs, and Galleries into your Cloudinary cloud!
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2 pt-4 border-t border-border">
            <h4 className="font-bold text-sm text-secondary flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-primary text-white flex items-center justify-center text-[10px]">3</span>
              <span>Apply Firestore Composite Indexing</span>
            </h4>
            <p className="text-muted-foreground">
              The file <code className="bg-muted px-1.5 py-0.5 rounded text-secondary font-mono">firestore.indexes.json</code> has been generated with 6 optimized compound indexes. Deploy it anytime using:
            </p>
            <div className="bg-secondary text-white p-3 rounded-xl font-mono text-[11px]">
              firebase deploy --only firestore:indexes
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
