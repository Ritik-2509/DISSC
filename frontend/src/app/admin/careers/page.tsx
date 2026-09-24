"use client";

import { useEffect, useState } from "react";
import { Briefcase, Plus, Search, Edit, Trash2, X, Save, MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

export default function AdminCareers() {
  const [careers, setCareers] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingJob, setEditingJob] = useState<any | null>(null);

  useEffect(() => {
    fetch("/firestore_export/careers.json")
      .then((r) => r.json())
      .then((d) => setCareers(d))
      .catch(() => {
        setCareers([
          {
            id: 1,
            title: "Special Educator (Intellectual Disabilities)",
            department: "Education & Therapy",
            location: "Varanasi, UP",
            type: "Full-Time",
            status: "published",
            description: "Provide personalized pedagogical support and IEP plans for students with developmental needs."
          },
          {
            id: 2,
            title: "Occupational Therapist",
            department: "Clinical Care",
            location: "Deva Center, Varanasi",
            type: "Full-Time",
            status: "published",
            description: "Deliver sensory integration and motor skills therapy to children and young adults."
          },
          {
            id: 3,
            title: "Speech Therapist",
            department: "Clinical Care",
            location: "Varanasi, UP",
            type: "Part-Time",
            status: "published",
            description: "Conduct articulation assessments and alternative communication training."
          }
        ]);
      });
  }, []);

  const filteredCareers = careers.filter((c) =>
    (c.title && c.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.department && c.department.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (c.description && c.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingJob) return;
    let target: any;
    if (editingJob.id && careers.some((c) => c.id === editingJob.id)) {
      target = { ...editingJob, updated_at: new Date().toISOString() };
      setCareers(careers.map((c) => (c.id === editingJob.id ? target : c)));
    } else {
      target = { ...editingJob, id: Date.now(), created_at: new Date().toISOString() };
      setCareers([target, ...careers]);
    }
    setEditingJob(null);
    await saveAdminItem("careers", target);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to remove this position?")) {
      setCareers(careers.filter((c) => c.id !== id));
      await deleteAdminItem("careers", id);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Recruitment</span>
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">
              {careers.length} Openings
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
            Careers & Open Roles
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage job vacancies, internships, and clinical opportunities at DISCC.
          </p>
        </div>

        <Button
          onClick={() =>
            setEditingJob({
              id: null,
              title: "",
              department: "Education & Therapy",
              location: "Varanasi, UP",
              type: "Full-Time",
              status: "published",
              description: "",
            })
          }
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider h-11 px-5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Post New Job</span>
        </Button>
      </div>

      <div className="bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search roles by title, department, or requirements..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      <div className="bg-card rounded-3xl border border-border shadow-xs overflow-hidden divide-y divide-border/60">
        {filteredCareers.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground text-sm">
            No openings found matching your criteria.
          </div>
        ) : (
          filteredCareers.map((job) => (
            <div key={job.id} className="p-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4 hover:bg-muted/20 transition-colors">
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-primary/10 text-primary">
                    {job.department || "General"}
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-secondary/10 text-secondary">
                    {job.type || "Full-Time"}
                  </span>
                  <span className="text-xs text-muted-foreground flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-primary" />
                    {job.location || "Varanasi, UP"}
                  </span>
                </div>
                <h3 className="font-display font-bold text-base text-secondary">{job.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">{job.description}</p>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setEditingJob({ ...job })}
                  className="h-8 px-3 rounded-lg text-xs font-bold border-border text-secondary hover:border-primary"
                >
                  <Edit className="w-3.5 h-3.5 mr-1" />
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => handleDelete(job.id)}
                  className="h-8 w-8 p-0 rounded-lg text-destructive hover:bg-destructive/10"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          ))
        )}
      </div>

      {editingJob && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-black text-xl text-secondary">
                {editingJob.id ? "Edit Job Posting" : "New Job Opening"}
              </h3>
              <button onClick={() => setEditingJob(null)} className="text-muted-foreground hover:text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Job Title</label>
                <input
                  type="text"
                  value={editingJob.title || ""}
                  onChange={(e) => setEditingJob({ ...editingJob, title: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary">Department</label>
                  <input
                    type="text"
                    value={editingJob.department || ""}
                    onChange={(e) => setEditingJob({ ...editingJob, department: e.target.value })}
                    required
                    className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary">Type</label>
                  <select
                    value={editingJob.type || "Full-Time"}
                    onChange={(e) => setEditingJob({ ...editingJob, type: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary bg-card"
                  >
                    <option value="Full-Time">Full-Time</option>
                    <option value="Part-Time">Part-Time</option>
                    <option value="Contract">Contract</option>
                    <option value="Internship">Internship</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Location</label>
                <input
                  type="text"
                  value={editingJob.location || ""}
                  onChange={(e) => setEditingJob({ ...editingJob, location: e.target.value })}
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Description & Requirements</label>
                <textarea
                  value={editingJob.description || ""}
                  onChange={(e) => setEditingJob({ ...editingJob, description: e.target.value })}
                  rows={4}
                  required
                  className="w-full p-3 rounded-xl border border-border text-xs leading-relaxed outline-none focus:border-primary"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setEditingJob(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider">
                  Save Position
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
