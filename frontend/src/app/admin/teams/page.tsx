"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Users,
  Plus,
  Edit,
  Mail,
  Phone,
  MapPin,
  X,
  Save,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudinaryUploadWidget } from "@/components/admin/CloudinaryUploadWidget";
import { CLOUDINARY_IMAGES } from "@/lib/cloudinary-images";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

export default function AdminTeams() {
  const [teams, setTeams] = useState<any[]>([]);
  const [editingMember, setEditingMember] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetch("/firestore_export/teams.json")
      .then((res) => res.json())
      .then((data) => setTeams(data))
      .catch(() => {
        setTeams([
          {
            id: 1,
            name: "Dr. C. Tulsi Das",
            title: "Founder President & Director",
            photoUrl: CLOUDINARY_IMAGES.drTulsiPortrait,
            description: "Ph.D. (Psychiatry - Clinical Psychologist). Recipient of Best Professional Psychologist Award.",
            email: "disccindia@gmail.com",
            phone: "+91 7007453168",
          },
          {
            id: 2,
            name: "Jean-Max Tassel",
            title: "Chief International Patron",
            photoUrl: CLOUDINARY_IMAGES.foundersMeet,
            description: "French art historian and philanthropist supporting DISCC for over 25 years.",
            email: "contact@deva-europe.org",
            phone: "+33 1 42 68 00 00",
          }
        ]);
      });
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingMember) return;

    let target: any;
    if (editingMember.id && teams.some((t) => t.id === editingMember.id)) {
      target = { ...editingMember, updated_at: new Date().toISOString() };
      setTeams(teams.map((t) => (t.id === editingMember.id ? target : t)));
    } else {
      target = { ...editingMember, id: Date.now(), created_at: new Date().toISOString() };
      setTeams([target, ...teams]);
    }

    setEditingMember(null);
    setShowModal(false);
    await saveAdminItem("teams", target);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Governance & Staff</span>
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">
              {teams.length} Members
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
            Teams & Leadership Management
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage trustees, clinical psychologists, and key operations leadership.
          </p>
        </div>

        <Button
          onClick={() =>
            setEditingMember({
              id: null,
              name: "",
              title: "",
              description: "",
              photoUrl: "",
              email: "",
              phone: "",
              location: "Varanasi, India",
            })
          }
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider h-11 px-5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Member</span>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teams.map((member) => (
          <div
            key={member.id}
            className="bg-card rounded-3xl border border-border p-6 shadow-xs flex flex-col justify-between space-y-5"
          >
            <div className="space-y-4">
              <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-muted border border-border">
                {member.photoUrl || member.photo ? (
                  <Image
                    src={member.photoUrl || member.photo}
                    alt={member.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <Users className="w-12 h-12 text-muted-foreground/40" />
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-display font-bold text-lg text-secondary">{member.name}</h3>
                <p className="text-xs font-bold uppercase tracking-wider text-primary">{member.title}</p>
              </div>

              <p className="text-xs text-muted-foreground line-clamp-3 leading-relaxed">
                {member.description || "Member of the leadership and clinical team at DISCC Varanasi."}
              </p>

              <div className="space-y-1.5 pt-2 border-t border-border/60 text-[11px] text-muted-foreground">
                {member.email && (
                  <p className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-primary" />
                    <span>{member.email}</span>
                  </p>
                )}
                {member.phone && (
                  <p className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    <span>{member.phone}</span>
                  </p>
                )}
              </div>
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={() => setEditingMember({ ...member })}
              className="w-full rounded-xl text-xs font-bold border-border hover:border-primary text-secondary"
            >
              <Edit className="w-3.5 h-3.5 mr-1" />
              Edit Profile
            </Button>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingMember && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-3xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-black text-xl text-secondary">
                {editingMember.id ? "Edit Team Member" : "New Team Member"}
              </h3>
              <button onClick={() => setEditingMember(null)} className="text-muted-foreground hover:text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Full Name</label>
                <input
                  type="text"
                  value={editingMember.name || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, name: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Designation / Role</label>
                <input
                  type="text"
                  value={editingMember.title || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, title: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Bio / Description</label>
                <textarea
                  value={editingMember.description || ""}
                  onChange={(e) => setEditingMember({ ...editingMember, description: e.target.value })}
                  rows={3}
                  className="w-full p-3 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary">Email</label>
                  <input
                    type="email"
                    value={editingMember.email || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, email: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-border text-xs outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary">Phone</label>
                  <input
                    type="tel"
                    value={editingMember.phone || ""}
                    onChange={(e) => setEditingMember({ ...editingMember, phone: e.target.value })}
                    className="w-full h-10 px-3 rounded-xl border border-border text-xs outline-none focus:border-primary"
                  />
                </div>
              </div>

              <CloudinaryUploadWidget
                label="Portrait Photo (Cloudinary)"
                currentValue={editingMember.photoUrl || editingMember.photo || ""}
                onSuccess={(url) => setEditingMember({ ...editingMember, photoUrl: url, photo: url })}
              />

              <div className="pt-3 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setEditingMember(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider">
                  Save Profile
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
