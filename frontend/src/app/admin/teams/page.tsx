"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  Edit2,
  Trash2,
  Mail,
  Phone,
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

interface TeamMember {
  id: string | number;
  name: string;
  title: string;
  description: string;
  photoUrl?: string;
  email?: string;
  phone?: string;
  location?: string;
}

const DEFAULT_MEMBERS: TeamMember[] = [
  {
    id: 1,
    name: "Dr. C. Tulsi Das",
    title: "Founder President & Director",
    photoUrl: "/images/discc/dr-tulsi-portrait.jpg",
    description: "Ph.D. (Psychiatry - Clinical Psychologist). Recipient of Best Professional Psychologist Award from UP Chief Minister.",
    email: "disccindia@gmail.com",
    phone: "+91 7007453168",
  },
  {
    id: 2,
    name: "Jean-Max Tassel",
    title: "Chief International Patron",
    photoUrl: "/images/discc/founders-meet.jpg",
    description: "French art historian and philanthropist supporting DISCC for over 25 years through Deva Europe.",
    email: "contact@deva-europe.org",
  },
  {
    id: 3,
    name: "Er. Raaj Deva",
    title: "Director of Operations",
    photoUrl: "/images/discc/deva-building.jpg",
    description: "Leading rural center extension, systems infrastructure, and administrative compliance across DISCC.",
    email: "raaj@disccindia.org",
  }
];

export default function AdminTeams() {
  const [teams, setTeams] = useState<TeamMember[]>(DEFAULT_MEMBERS);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    fetch("/firestore_export/teams.json")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTeams(data);
      })
      .catch(() => {});
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    let target: TeamMember;
    if (!isNew && teams.some((t) => t.id === editingMember.id)) {
      target = { ...editingMember };
      setTeams(teams.map((t) => (t.id === editingMember.id ? target : t)));
    } else {
      target = { ...editingMember, id: Date.now() };
      setTeams([target, ...teams]);
    }

    setEditingMember(null);
    setIsNew(false);
    await saveAdminItem("teams", target);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this team member?")) {
      setTeams(teams.filter((t) => t.id !== id));
      if (editingMember?.id === id) setEditingMember(null);
      await deleteAdminItem("teams", id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Teams & Leadership Management
          </h1>
          <p className="text-xs sm:text-sm text-muted-text">
            Manage clinical directors, advisory board members, and operations leadership.
          </p>
        </div>

        <Button
          onClick={() => {
            setIsNew(true);
            setEditingMember({
              id: Date.now(),
              name: "",
              title: "",
              description: "",
              photoUrl: "/images/discc/dr-tulsi-portrait.jpg",
              email: "",
              phone: "",
            });
          }}
          variant="default"
          size="sm"
          className="rounded-full gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Team Member
        </Button>
      </div>

      {/* Editor Form */}
      {editingMember && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-foreground">
              {isNew ? "Add Team Member" : "Edit Team Member"}
            </h2>
            <button
              onClick={() => setEditingMember(null)}
              className="text-xs font-bold text-muted-text hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.name}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, name: e.target.value })
                  }
                  placeholder="e.g. Dr. C. Tulsi Das"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Role / Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingMember.title}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, title: e.target.value })
                  }
                  placeholder="e.g. Founder President & Director"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Photo URL
                </label>
                <input
                  type="text"
                  value={editingMember.photoUrl || ""}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, photoUrl: e.target.value })
                  }
                  placeholder="/images/discc/dr-tulsi-portrait.jpg"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={editingMember.email || ""}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, email: e.target.value })
                  }
                  placeholder="disccindia@gmail.com"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Phone Number
                </label>
                <input
                  type="text"
                  value={editingMember.phone || ""}
                  onChange={(e) =>
                    setEditingMember({ ...editingMember, phone: e.target.value })
                  }
                  placeholder="+91 7007453168"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Bio & Clinical Background
              </label>
              <textarea
                rows={3}
                value={editingMember.description}
                onChange={(e) =>
                  setEditingMember({ ...editingMember, description: e.target.value })
                }
                placeholder="Details of qualifications, academic background, and years of service..."
                className="w-full p-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingMember(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" className="gap-2">
                <Save className="w-4 h-4" />
                Save Member
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((member) => (
          <div
            key={member.id}
            className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-2xl overflow-hidden bg-muted border border-border shrink-0">
                  <Image
                    src={member.photoUrl || "/images/discc/dr-tulsi-portrait.jpg"}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-heading font-bold text-lg text-foreground">
                    {member.name}
                  </h3>
                  <p className="text-xs font-bold text-primary mt-0.5">
                    {member.title}
                  </p>
                </div>
              </div>

              <p className="text-xs text-muted-text line-clamp-3 leading-relaxed">
                {member.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between">
              <span className="text-[11px] text-muted-text truncate max-w-[140px]">
                {member.email || "DISCC Leader"}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setIsNew(false);
                    setEditingMember(member);
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-1 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(member.id)}
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
