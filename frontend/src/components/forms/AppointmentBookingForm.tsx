"use client";

import { useState } from "react";
import { CheckCircle2, Loader2, Send, AlertCircle, Calendar, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export function AppointmentBookingForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      subject: formData.subject.trim() || "Consultation & Appointment Request",
      content: formData.message.trim() || "Consultation and Appointment Request",
      message: formData.message.trim() || "Consultation and Appointment Request",
      status: "unread",
      type: "appointment_inquiry",
      created_at: new Date().toISOString(),
      createdAt: new Date().toISOString(),
    };

    let clientWriteSuccess = false;

    // 1. Direct Firestore write from client browser (instant & authentic)
    try {
      await addDoc(collection(db, "contacts"), payload);
      clientWriteSuccess = true;
    } catch (err: any) {
      console.warn("Direct Firestore write notice:", err.message);
    }

    // 2. Route handler call to sync local files and admin panels
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        clientWriteSuccess = true;
      }
    } catch (apiErr: any) {
      console.warn("API route notice:", apiErr.message);
    }

    if (clientWriteSuccess) {
      setStatus("success");
    } else {
      // Fallback: If both network calls failed, show graceful error
      setStatus("error");
      setErrorMessage("Network issue submitting your request. Please call our Varanasi helpline at +91 7007453168 or email disccindia@gmail.com.");
    }
  };

  const handleReset = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    });
    setStatus("idle");
  };

  if (status === "success") {
    return (
      <div className="bg-emerald-50 dark:bg-emerald-950/40 border-2 border-emerald-500/40 rounded-2xl p-8 text-center space-y-5 animate-in fade-in zoom-in duration-300">
        <div className="w-16 h-16 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto shadow-lg shadow-emerald-500/30">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        
        <div className="space-y-2">
          <h3 className="font-display font-black text-2xl text-emerald-900 dark:text-emerald-200">
            Request has been sent successfully!
          </h3>
          <p className="text-sm text-emerald-800 dark:text-emerald-300 max-w-md mx-auto leading-relaxed">
            Thank you, <span className="font-bold">{formData.name}</span>. Your appointment request has been recorded in our system. Our clinical coordinator at the Deva Center in Varanasi will review your request and contact you promptly.
          </p>
        </div>

        <div className="bg-white/80 dark:bg-card/80 rounded-xl p-4 max-w-sm mx-auto text-left text-xs space-y-1.5 border border-emerald-200 dark:border-emerald-800">
          <div className="font-bold text-secondary text-[11px] uppercase tracking-wider">Submission Summary:</div>
          <div className="text-muted-foreground"><span className="font-semibold text-foreground">Name:</span> {formData.name}</div>
          {formData.phone && <div className="text-muted-foreground"><span className="font-semibold text-foreground">Phone:</span> {formData.phone}</div>}
          {formData.email && <div className="text-muted-foreground"><span className="font-semibold text-foreground">Email:</span> {formData.email}</div>}
          <div className="text-muted-foreground"><span className="font-semibold text-foreground">Subject:</span> {formData.subject || "General Consultation"}</div>
        </div>

        <Button
          onClick={handleReset}
          variant="outline"
          className="rounded-xl border-emerald-600 text-emerald-700 hover:bg-emerald-100 dark:hover:bg-emerald-900/40 font-bold text-xs uppercase tracking-wider"
        >
          Book Another Appointment or Send Inquiry
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 pt-2">
      {status === "error" && (
        <div className="bg-destructive/10 border border-destructive/30 rounded-xl p-3.5 flex items-start gap-3 text-destructive text-xs">
          <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5" />
          <span>{errorMessage}</span>
        </div>
      )}

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-secondary">
          Full Name <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full h-11 px-3.5 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-secondary">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full h-11 px-3.5 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
          />
        </div>
        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-secondary">
            Phone Number <span className="text-primary">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            placeholder="+91..."
            required
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full h-11 px-3.5 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-secondary">
          Subject / Type of Inquiry <span className="text-primary">*</span>
        </label>
        <input
          type="text"
          name="subject"
          placeholder="Child Assessment / Volunteer / Donation Inquiry"
          required
          value={formData.subject}
          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
          className="w-full h-11 px-3.5 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all"
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-semibold text-secondary">
          Additional Details or Preferred Appointment Time
        </label>
        <textarea
          name="message"
          rows={3}
          placeholder="Please describe your query or preferred date and time for consultation..."
          value={formData.message}
          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          className="w-full p-3.5 rounded-xl border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary outline-none text-sm transition-all resize-none"
        />
      </div>

      <Button
        type="submit"
        disabled={status === "loading"}
        className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md active:scale-[0.99]"
      >
        {status === "loading" ? (
          <span className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin" />
            Sending Request...
          </span>
        ) : (
          <span className="flex items-center gap-2">
            <Send className="w-4 h-4" />
            Submit Request
          </span>
        )}
      </Button>

      <p className="text-[11px] text-muted-foreground text-center">
        Your information is secure and directly sent to DISCC administration in Varanasi.
      </p>
    </form>
  );
}
