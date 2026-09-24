"use client";

import { useEffect, useState } from "react";
import { Quote, Plus, Edit2, Trash2, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem, fetchAdminCollection } from "@/lib/admin-client";

interface TestimonialItem {
  id: string | number;
  name: string;
  role: string;
  quote?: string;
  content?: string;
  company?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    id: 1,
    name: "Dr. V. K. Tripathi",
    role: "Senior Developmental Consultant, Varanasi",
    quote: "Dr. Tulsi and DISCC represent the benchmark for clinical psychological assessments and compassionate child care in Eastern Uttar Pradesh.",
  },
  {
    id: 2,
    name: "Prof. S. R. Mukherjee",
    role: "Department of Psychology, BHU",
    quote: "The dedication of the therapists at Deva Center has transformed hundreds of children from complete dependency to self-reliance and joy.",
  },
  {
    id: 3,
    name: "Anand Agrawal",
    role: "Patron & CSR Committee Chair, Varanasi",
    quote: "Every rupee donated to DISCC reaches the ground directly. Their transparency and 32-year track record are exemplary.",
  }
];

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(DEFAULT_TESTIMONIALS);
  const [editing, setEditing] = useState<TestimonialItem | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetchAdminCollection("testimonials")
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editing) return;

    let target: TestimonialItem;
    if (!isNew && testimonials.some((t) => t.id === editing.id)) {
      target = { ...editing };
      setTestimonials(testimonials.map((t) => (t.id === editing.id ? target : t)));
    } else {
      target = { ...editing, id: Date.now() };
      setTestimonials([target, ...testimonials]);
    }

    setEditing(null);
    setIsNew(false);
    await saveAdminItem("testimonials", target);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this testimonial?")) {
      setTestimonials(testimonials.filter((t) => t.id !== id));
      if (editing?.id === id) setEditing(null);
      await deleteAdminItem("testimonials", id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Testimonials & Endorsements
          </h1>
          <p className="text-xs sm:text-sm text-muted-text">
            Manage quotes from developmental pediatricians, partner professors, and parents.
          </p>
        </div>

        <Button
          onClick={() => {
            setIsNew(true);
            setEditing({
              id: Date.now(),
              name: "",
              role: "",
              quote: "",
            });
          }}
          variant="default"
          size="sm"
          className="rounded-full gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Endorsement
        </Button>
      </div>

      {/* Editor Form */}
      {editing && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-foreground">
              {isNew ? "Add New Endorsement" : "Edit Endorsement"}
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
                  Name *
                </label>
                <input
                  type="text"
                  required
                  value={editing.name}
                  onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                  placeholder="e.g. Dr. V. K. Tripathi"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Role / Organization *
                </label>
                <input
                  type="text"
                  required
                  value={editing.role}
                  onChange={(e) => setEditing({ ...editing, role: e.target.value })}
                  placeholder="e.g. Senior Developmental Consultant, Varanasi"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Quote Content *
              </label>
              <textarea
                required
                rows={3}
                value={editing.quote || editing.content || ""}
                onChange={(e) =>
                  setEditing({
                    ...editing,
                    quote: e.target.value,
                    content: e.target.value,
                  })
                }
                placeholder="Endorsement message..."
                className="w-full p-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setEditing(null)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" className="gap-2">
                <Save className="w-4 h-4" />
                Save Endorsement
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft flex flex-col justify-between"
          >
            <div>
              <Quote className="w-8 h-8 text-primary/30 mb-3" />
              <p className="text-sm text-muted-text leading-relaxed italic mb-4">
                &ldquo;{t.quote || t.content}&rdquo;
              </p>
              <h3 className="font-heading font-bold text-base text-foreground">
                {t.name}
              </h3>
              <p className="text-xs text-primary font-semibold mt-0.5">{t.role}</p>
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 flex justify-end gap-2">
              <Button
                onClick={() => {
                  setIsNew(false);
                  setEditing(t);
                }}
                variant="outline"
                size="sm"
                className="gap-1 text-xs"
              >
                <Edit2 className="w-3.5 h-3.5" />
                Edit
              </Button>
              <Button
                onClick={() => handleDelete(t.id)}
                variant="destructive"
                size="sm"
                className="p-2"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
