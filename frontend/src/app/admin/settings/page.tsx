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
  ShieldCheck,
  CreditCard,
  Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem } from "@/lib/admin-client";

export default function AdminSettings() {
  const [saved, setSaved] = useState(false);
  const [formData, setFormData] = useState({
    siteName: "DEVA International Society for Child Care (DISCC)",
    tagline: "First Professional Clinical Psychology & Special Rehabilitation in Eastern UP",
    founder: "Dr. C. Tulsi Das (CM State Award Recipient)",
    helplinePhone: "7007453168",
    alternatePhone1: "9415303557",
    alternatePhone2: "9129853531",
    email: "disccindia@gmail.com",
    address: "B.21/100, Bind Bhavan, Kamachha Chungi, Varanasi, Uttar Pradesh 221010, India",
    workingHours: "Monday to Saturday: 8:00 AM - 5:00 PM (Sunday Closed)",
    bankName: "Kotak Mahindra Bank",
    accountName: "Deva International Society for Child Care",
    accountNumber: "4112108180",
    ifscCode: "KKBK0005291",
    accountType: "Current Account",
    upiId: "4112108180@kotak",
    fcraStatus: "FCRA Registered Non Governmental Organization (1991)",
    tax80gStatus: "Section 80G & 12A Certified",
    facebookUrl: "https://www.facebook.com/profile.php?id=100072381330610",
    youtubeUrl: "https://www.youtube.com/@disccvaranasi3882",
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
        <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
          Organization & System Settings
        </h1>
        <p className="text-xs sm:text-sm text-muted-text">
          Update public contact hotlines, bank donation parameters, FCRA numbers, and social channels.
        </p>
      </div>

      {saved && (
        <div className="p-4 rounded-2xl bg-[#E6F6EE] border border-[#0F8B8D]/30 text-[#0F8B8D] text-xs sm:text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Organization settings saved and synchronized successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* 1. General Organization Identity */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3 text-primary font-bold text-sm">
            <Building2 className="w-4 h-4" />
            <span>General Identity & Accreditation</span>
          </div>

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Organization Legal Name
              </label>
              <input
                type="text"
                value={formData.siteName}
                onChange={(e) => setFormData({ ...formData, siteName: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Tagline / Value Proposition
              </label>
              <input
                type="text"
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Founder Credential Line
              </label>
              <input
                type="text"
                value={formData.founder}
                onChange={(e) => setFormData({ ...formData, founder: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        {/* 2. Contact & Helplines */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3 text-primary font-bold text-sm">
            <Phone className="w-4 h-4" />
            <span>Contact Information & Helplines</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Primary Helpline *
              </label>
              <input
                type="text"
                value={formData.helplinePhone}
                onChange={(e) => setFormData({ ...formData, helplinePhone: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Alternate Phone 1
              </label>
              <input
                type="text"
                value={formData.alternatePhone1}
                onChange={(e) => setFormData({ ...formData, alternatePhone1: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Alternate Phone 2
              </label>
              <input
                type="text"
                value={formData.alternatePhone2}
                onChange={(e) => setFormData({ ...formData, alternatePhone2: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Official Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Consultation Hours
              </label>
              <input
                type="text"
                value={formData.workingHours}
                onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-foreground mb-1">
              Registered Physical Address
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
            />
          </div>
        </div>

        {/* 3. Bank & Donation Parameters */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3 text-primary font-bold text-sm">
            <CreditCard className="w-4 h-4" />
            <span>Bank & UPI Donation Parameters</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Bank Name
              </label>
              <input
                type="text"
                value={formData.bankName}
                onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Account Holder Name
              </label>
              <input
                type="text"
                value={formData.accountName}
                onChange={(e) => setFormData({ ...formData, accountName: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Account Number
              </label>
              <input
                type="text"
                value={formData.accountNumber}
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                IFSC Code
              </label>
              <input
                type="text"
                value={formData.ifscCode}
                onChange={(e) => setFormData({ ...formData, ifscCode: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                UPI ID (Virtual Payment Address)
              </label>
              <input
                type="text"
                value={formData.upiId}
                onChange={(e) => setFormData({ ...formData, upiId: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
              />
            </div>
          </div>
        </div>

        {/* 4. Social & Media Channels */}
        <div className="p-6 sm:p-8 rounded-3xl bg-white border border-border/80 shadow-soft space-y-4">
          <div className="flex items-center gap-2.5 border-b border-border/60 pb-3 text-primary font-bold text-sm">
            <Share2 className="w-4 h-4" />
            <span>Social & Video Channels</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                YouTube Channel
              </label>
              <input
                type="text"
                value={formData.youtubeUrl}
                onChange={(e) => setFormData({ ...formData, youtubeUrl: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Facebook Page
              </label>
              <input
                type="text"
                value={formData.facebookUrl}
                onChange={(e) => setFormData({ ...formData, facebookUrl: e.target.value })}
                className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <Button type="submit" variant="default" size="lg" className="rounded-full gap-2 px-8">
            <Save className="w-4 h-4" />
            Save All Settings
          </Button>
        </div>
      </form>
    </div>
  );
}
