"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Sparkles,
  Plus,
  Trash2,
  Edit2,
  Save,
  CheckCircle2,
  MapPin,
  Calendar,
  Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface AdminProject {
  id: string;
  title: string;
  subtitle: string;
  category: "current" | "past";
  sdgColor: string;
  sdgName: string;
  targetGroup: string;
  location: string;
  year: string;
  image: string;
  summary: string;
  status: "published" | "draft";
}

const INITIAL_PROJECTS: AdminProject[] = [
  {
    id: "deva-center",
    title: "Deva Center, Varanasi",
    subtitle: "First Special Rehabilitation Institute in Eastern UP",
    category: "current",
    sdgColor: "#0F8B8D",
    sdgName: "SDG 10: Reduced Inequalities",
    targetGroup: "Special Children",
    location: "Kamachha Chungi, Varanasi",
    year: "1991 - Present",
    image: "/images/discc/deva-building.jpg",
    summary: "Clinical psychological evaluations, sensory integration therapy, speech therapy, and individualized education plans (IEPs).",
    status: "published"
  },
  {
    id: "deva-gram",
    title: "Deva Gram (Bachhaon Campus)",
    subtitle: "21-Disability Rural Care & Respite Sanctuary",
    category: "current",
    sdgColor: "#3F7E44",
    sdgName: "SDG 3: Good Health & Well-Being",
    targetGroup: "Rural Communities",
    location: "Bachhaon Village, Varanasi",
    year: "2010 - Present",
    image: "/images/discc/community-program.png",
    summary: "Sprawling rural campus offering hydrotherapy, garden therapy, sports training, and respite care for 21 disability categories.",
    status: "published"
  },
  {
    id: "annapurna-center",
    title: "Annapurna Center for the Girl Child",
    subtitle: "Protecting, Educating, and Nurturing Rural Girls",
    category: "current",
    sdgColor: "#EE6C4D",
    sdgName: "SDG 5: Gender Equality",
    targetGroup: "Women & Girls",
    location: "Rural Varanasi Outskirts",
    year: "1995 - Present",
    image: "/images/discc/hero-children.png",
    summary: "Grassroots safe haven managed by local women providing nutrition, health camps, schooling, and handcraft independence.",
    status: "published"
  },
  {
    id: "child-education",
    title: "Child Education Program (CEP)",
    subtitle: "Tuition, Adaptive Kits & School Integration",
    category: "current",
    sdgColor: "#F5A524",
    sdgName: "SDG 4: Quality Education",
    targetGroup: "Special Children",
    location: "Varanasi Urban & Rural",
    year: "2002 - Present",
    image: "/images/discc/children-activity.png",
    summary: "Sponsoring school tuition, uniforms, assistive learning kits, and teacher sensitization for marginalized students.",
    status: "published"
  }
];

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<AdminProject[]>(INITIAL_PROJECTS);
  const [editing, setEditing] = useState<AdminProject | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    if (isNew) {
      setProjects([...projects, editing]);
    } else {
      setProjects(projects.map((p) => (p.id === editing.id ? editing : p)));
    }

    setEditing(null);
    setIsNew(false);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this programme?")) {
      setProjects(projects.filter((p) => p.id !== id));
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Programmes & Action Areas
          </h1>
          <p className="text-xs sm:text-sm text-muted-text">
            Manage flagship facilities, SDG badges, impact summaries, and community outreach centers.
          </p>
        </div>

        <Button
          onClick={() => {
            setIsNew(true);
            setEditing({
              id: `program-${Date.now()}`,
              title: "",
              subtitle: "",
              category: "current",
              sdgColor: "#0F8B8D",
              sdgName: "SDG 10: Reduced Inequalities",
              targetGroup: "Special Children",
              location: "Varanasi",
              year: "2026 - Present",
              image: "/images/discc/deva-building.jpg",
              summary: "",
              status: "published"
            });
          }}
          variant="default"
          size="sm"
          className="rounded-full gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Programme
        </Button>
      </div>

      {savedNotice && (
        <div className="p-4 rounded-2xl bg-[#E6F6EE] border border-[#0F8B8D]/30 text-[#0F8B8D] text-xs sm:text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" />
          <span>Programme changes successfully saved!</span>
        </div>
      )}

      {/* Editor Modal / Form */}
      {editing && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-foreground">
              {isNew ? "Add New Programme" : "Edit Programme"}
            </h2>
            <button
              onClick={() => setEditing(null)}
              className="text-xs font-bold text-muted-text hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Programme Title *
                </label>
                <input
                  type="text"
                  required
                  value={editing.title}
                  onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  placeholder="e.g. Deva Center, Varanasi"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Subtitle / Mission Line
                </label>
                <input
                  type="text"
                  value={editing.subtitle}
                  onChange={(e) => setEditing({ ...editing, subtitle: e.target.value })}
                  placeholder="e.g. First Special Rehabilitation Institute"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Location
                </label>
                <input
                  type="text"
                  value={editing.location}
                  onChange={(e) => setEditing({ ...editing, location: e.target.value })}
                  placeholder="e.g. Kamachha Chungi, Varanasi"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Year Range
                </label>
                <input
                  type="text"
                  value={editing.year}
                  onChange={(e) => setEditing({ ...editing, year: e.target.value })}
                  placeholder="e.g. 1991 - Present"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  SDG Badge Name
                </label>
                <input
                  type="text"
                  value={editing.sdgName}
                  onChange={(e) => setEditing({ ...editing, sdgName: e.target.value })}
                  placeholder="SDG 10: Reduced Inequalities"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Image Path / URL
                </label>
                <input
                  type="text"
                  value={editing.image}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  placeholder="/images/discc/deva-building.jpg"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  SDG Theme Color
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="color"
                    value={editing.sdgColor}
                    onChange={(e) => setEditing({ ...editing, sdgColor: e.target.value })}
                    className="w-11 h-11 rounded-xl border border-border cursor-pointer p-1"
                  />
                  <input
                    type="text"
                    value={editing.sdgColor}
                    onChange={(e) => setEditing({ ...editing, sdgColor: e.target.value })}
                    className="flex-1 h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Executive Summary
              </label>
              <textarea
                rows={3}
                value={editing.summary}
                onChange={(e) => setEditing({ ...editing, summary: e.target.value })}
                placeholder="Comprehensive overview of therapies, facilities, and target demographics..."
                className="w-full p-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" className="gap-2">
                <Save className="w-4 h-4" />
                Save Programme
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {projects.map((prog) => (
          <div
            key={prog.id}
            className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="relative w-20 h-16 rounded-xl overflow-hidden bg-muted shrink-0 border border-border">
                  <Image
                    src={prog.image}
                    alt={prog.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold text-white shadow-xs"
                  style={{ backgroundColor: prog.sdgColor }}
                >
                  {prog.sdgName}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-foreground">
                {prog.title}
              </h3>
              <p className="text-xs text-primary font-semibold mt-0.5">
                {prog.subtitle}
              </p>
              <p className="text-xs text-muted-text mt-2 line-clamp-2">
                {prog.summary}
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-text font-medium">
                {prog.year}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setIsNew(false);
                    setEditing(prog);
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-1 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(prog.id)}
                  variant="destructive"
                  size="sm"
                  className="p-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
