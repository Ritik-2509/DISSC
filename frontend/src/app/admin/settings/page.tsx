"use client";

import { useState } from "react";
import {
  Settings,
  Building2,
  Phone,
  Mail,
  MapPin,
  Save,
  CheckCircle2,
  Cloud,
  ShieldCheck
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem } from "@/lib/admin-client";

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "DEVA International Society for Child Care (DISCC)",
    tagline: "Empowering Pure Hearts With Dignity and Care",
    helplinePhone: "+91 7007453168",
    email: "disccindia@gmail.com",
    address: "B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi, Uttar Pradesh 221010, India",
    bankName: "Kotak Mahindra Bank",
    accountName: "Deva International Society for Child Care",
    accountNumber: "4112108180",
    ifscCode: "KKBK0005291",
    fcraNumber: "Registered humanitarian NGO (1991)",
    facebookUrl: "https://www.facebook.com/profile.php?id=100072381330610",
    youtubeUrl: "https://www.youtube.com/@disccvaranasi3882/videos",
  });

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaved(true);
    await saveAdminItem("settings", { id: 1, ...formData });
    setTimeout(() => setSaved(false), 3500);
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">System Configurations</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
          Website & Organization Settings
        </h1>
        <p className="text-xs text-muted-foreground">
          Update public contact hotlines, bank donation parameters, and official social channels.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-emerald-50 text-emerald-800 border border-emerald-200 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Settings successfully updated in memory and synced with site configuration!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-8">
        {/* Organization Identity */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <Building2 className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-secondary">General Identity</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-secondary">Organization Name</label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-secondary">Official Mission Tagline</label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-secondary">Varanasi Physical Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-secondary">Helpline Contact</label>
                <input
                  type="text"
                  value={formData.helplinePhone}
                  onChange={(e) => setFormData({ ...formData, helplinePhone: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-secondary">Official Email Address</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Bank Donation Information */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-secondary">Bank Donation Details (80G & FCRA)</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-secondary">Account Holder Name</label>
                <input
                  type="text"
                  value={formData.accountName}
                  onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-secondary">Bank Name</label>
                <input
                  type="text"
                  value={formData.bankName}
                  onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-semibold text-secondary">Account Number (A/c)</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm font-mono font-bold"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-secondary">IFSC Code</label>
                <input
                  type="text"
                  value={formData.ifscCode}
                  onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm font-mono font-bold"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="bg-card rounded-3xl p-6 sm:p-8 border border-border shadow-xs space-y-5">
          <div className="flex items-center gap-3 border-b border-border pb-3">
            <Settings className="w-5 h-5 text-primary" />
            <h2 className="font-display font-bold text-lg text-secondary">Social Media Channels</h2>
          </div>

          <div className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-semibold text-secondary">Facebook Page URL</label>
              <input
                type="url"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
              />
            </div>

            <div className="space-y-1">
              <label className="font-semibold text-secondary">YouTube Channel URL</label>
              <input
                type="url"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full h-11 px-3.5 rounded-xl border border-border outline-none focus:border-primary text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button
            type="submit"
            className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-8 h-12 flex items-center gap-2 shadow-sm"
          >
            <Save className="w-4 h-4" />
            <span>Save All Configurations</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
