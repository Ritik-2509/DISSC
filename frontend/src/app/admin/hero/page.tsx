"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Sliders,
  Plus,
  Trash2,
  Edit2,
  Save,
  Eye,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  Video,
  Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeroSlideItem {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  badge?: string;
  order: number;
  status: "active" | "draft";
}

const INITIAL_SLIDES: HeroSlideItem[] = [
  {
    id: "slide-cm-award",
    image: "/hero/slide-1-cm-award.png",
    eyebrow: "Since 1991 · Varanasi, Uttar Pradesh",
    title: "First Professional Clinical Psychologist in Mental Health & Intellectual Disability Care in Uttar Pradesh",
    subtitle: "Honoured with the Best Professional Psychologist Award by the Chief Minister of Uttar Pradesh, Yogi Adityanath.",
    badge: "CM State Award Recipient",
    order: 1,
    status: "active",
  },
  {
    id: "slide-role-model",
    image: "/hero/slide-2-role-model.png",
    eyebrow: "32+ Years of Impact · Eastern UP",
    title: "Dedicated to Empowering Children with Neurodivergence & Special Needs",
    subtitle: "Pioneering clinical psychological diagnostics, individual education plans, and holistic speech therapy.",
    badge: "State Role Model",
    order: 2,
    status: "active",
  },
  {
    id: "slide-children",
    image: "/hero/slide-3-children.png",
    eyebrow: "Holistic Rehabilitation · Deva Center",
    title: "Transforming Lives Through Compassionate Education & Inclusion",
    subtitle: "Providing specialized clinical care, sensory integration, and family counseling for over 12,000 children.",
    badge: "12,000+ Lives Touched",
    order: 3,
    status: "active",
  },
  {
    id: "slide-therapy",
    image: "/hero/slide-4-therapy.jpg",
    eyebrow: "Certified Clinical Excellence",
    title: "Restoring Dignity & Nurturing Independence for Every Child",
    subtitle: "Fully certified by National Trust, FCRA, and State/Central welfare authorities.",
    badge: "FCRA & National Trust Certified",
    order: 4,
    status: "active",
  },
];

export default function AdminHeroSlidesPage() {
  const [slides, setSlides] = useState<HeroSlideItem[]>(INITIAL_SLIDES);
  const [videoUrl, setVideoUrl] = useState("https://www.youtube.com/watch?v=dQw4w9WgXcQ");
  const [editingSlide, setEditingSlide] = useState<HeroSlideItem | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSaveSlide = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSlide) return;

    if (isNew) {
      setSlides([...slides, { ...editingSlide, order: slides.length + 1 }]);
    } else {
      setSlides(slides.map((s) => (s.id === editingSlide.id ? editingSlide : s)));
    }

    setEditingSlide(null);
    setIsNew(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleDeleteSlide = (id: string) => {
    if (confirm("Are you sure you want to delete this hero slide?")) {
      setSlides(slides.filter((s) => s.id !== id));
    }
  };

  const moveSlide = (index: number, direction: "up" | "down") => {
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= slides.length) return;

    const updated = [...slides];
    const temp = updated[index];
    updated[index] = updated[targetIndex];
    updated[targetIndex] = temp;
    setSlides(updated);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Hero Slideshow Manager
          </h1>
          <p className="text-xs sm:text-sm text-muted-text">
            Configure full-screen cinematic slides, CM award slide order, titles, and documentary video URL.
          </p>
        </div>

        <Button
          onClick={() => {
            setIsNew(true);
            setEditingSlide({
              id: `slide-${Date.now()}`,
              image: "/hero/slide-1-cm-award.png",
              eyebrow: "Since 1991 · Varanasi",
              title: "",
              subtitle: "",
              badge: "Accredited Care",
              order: slides.length + 1,
              status: "active",
            });
          }}
          variant="default"
          size="sm"
          className="rounded-full gap-2"
        >
          <Plus className="w-4 h-4" />
          Add New Slide
        </Button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-[#E6F6EE] border border-[#0F8B8D]/30 text-[#0F8B8D] text-xs sm:text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Hero Slideshow updated and saved successfully!</span>
        </div>
      )}

      {/* Global Video URL Setting */}
      <div className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft space-y-3">
        <div className="flex items-center gap-2 text-primary font-bold text-sm">
          <Video className="w-4 h-4" />
          <span>Organisation Documentary Video URL (Watch Our Story Button)</span>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="YouTube embed or direct MP4 URL"
            className="flex-1 h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-foreground text-sm focus:outline-none focus:border-primary"
          />
          <Button
            onClick={() => {
              setSavedNotice(true);
              setTimeout(() => setSavedNotice(false), 3000);
            }}
            variant="default"
            size="sm"
            className="rounded-xl px-6"
          >
            Save Video URL
          </Button>
        </div>
      </div>

      {/* Slide Editor Modal / Form */}
      {editingSlide && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-foreground">
              {isNew ? "Create New Hero Slide" : "Edit Hero Slide"}
            </h2>
            <button
              onClick={() => setEditingSlide(null)}
              className="text-xs font-bold text-muted-text hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveSlide} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Image Path / URL *
                </label>
                <input
                  type="text"
                  required
                  value={editingSlide.image}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, image: e.target.value })
                  }
                  placeholder="/hero/slide-1-cm-award.png"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Eyebrow Text
                </label>
                <input
                  type="text"
                  value={editingSlide.eyebrow}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, eyebrow: e.target.value })
                  }
                  placeholder="Since 1991 · Varanasi"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Main Headline (H1) *
              </label>
              <textarea
                required
                rows={2}
                value={editingSlide.title}
                onChange={(e) =>
                  setEditingSlide({ ...editingSlide, title: e.target.value })
                }
                placeholder="First Professional Clinical Psychologist in Mental Health..."
                className="w-full p-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm font-heading font-bold focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Subtext / Description
              </label>
              <textarea
                rows={2}
                value={editingSlide.subtitle}
                onChange={(e) =>
                  setEditingSlide({ ...editingSlide, subtitle: e.target.value })
                }
                placeholder="Honoured with the Best Professional Psychologist Award..."
                className="w-full p-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Badge Label
                </label>
                <input
                  type="text"
                  value={editingSlide.badge || ""}
                  onChange={(e) =>
                    setEditingSlide({ ...editingSlide, badge: e.target.value })
                  }
                  placeholder="CM State Award Recipient"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Status
                </label>
                <select
                  value={editingSlide.status}
                  onChange={(e) =>
                    setEditingSlide({
                      ...editingSlide,
                      status: e.target.value as "active" | "draft",
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="active">Active (Visible on Home)</option>
                  <option value="draft">Draft (Hidden)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingSlide(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" className="gap-2">
                <Save className="w-4 h-4" />
                Save Slide
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Slides List Table / Cards */}
      <div className="space-y-4">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="flex items-center gap-4">
              <div className="relative w-24 h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                />
              </div>

              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-primary/10 text-primary">
                    Slide {index + 1}
                  </span>
                  {slide.badge && (
                    <span className="px-2 py-0.5 rounded-full text-[10.5px] font-bold bg-[#F5A524]/20 text-foreground">
                      {slide.badge}
                    </span>
                  )}
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10.5px] font-bold ${
                      slide.status === "active"
                        ? "bg-[#E6F6EE] text-[#0F8B8D]"
                        : "bg-muted text-muted-text"
                    }`}
                  >
                    {slide.status}
                  </span>
                </div>
                <h3 className="font-heading font-bold text-base text-foreground line-clamp-1">
                  {slide.title}
                </h3>
                <p className="text-xs text-muted-text line-clamp-1 mt-0.5">
                  {slide.subtitle}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-center">
              <button
                onClick={() => moveSlide(index, "up")}
                disabled={index === 0}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 cursor-pointer"
                aria-label="Move slide up"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
              <button
                onClick={() => moveSlide(index, "down")}
                disabled={index === slides.length - 1}
                className="p-2 rounded-lg border border-border hover:bg-muted disabled:opacity-30 cursor-pointer"
                aria-label="Move slide down"
              >
                <ArrowDown className="w-4 h-4" />
              </button>
              <Button
                onClick={() => {
                  setIsNew(false);
                  setEditingSlide(slide);
                }}
                variant="outline"
                size="sm"
                className="gap-1.5"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Button>
              <Button
                onClick={() => handleDeleteSlide(slide.id)}
                variant="destructive"
                size="sm"
                className="p-2"
                aria-label="Delete slide"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
