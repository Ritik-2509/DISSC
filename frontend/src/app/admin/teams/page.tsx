"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const API_URL = "http://localhost:3001/api"; 

export default function AdminTeams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", bio: "", image: "" });

  const fetchTeams = () => {
    setLoading(true);
    fetch(`${API_URL}/teams`)
      .then(res => res.json())
      .then(data => {
        setTeams(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching teams:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this team member?")) return;
    try {
      await fetch(`${API_URL}/teams/${id}`, { method: "DELETE" });
      fetchTeams();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/teams`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData })
      });
      setIsCreating(false);
      setFormData({ name: "", role: "", bio: "", image: "" });
      fetchTeams();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Team</h1>
          <p className="text-muted-foreground">Manage the leadership and core members.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? "Cancel" : "Add Team Member"}
        </Button>
      </div>

      {isCreating && (
        <div className="border rounded-xl bg-card p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Add Team Member</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Name</label>
              <Input 
                required 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                placeholder="Full Name" 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Role</label>
              <Input 
                required
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})} 
                placeholder="e.g. Director, Founder" 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Image URL</label>
              <Input 
                value={formData.image} 
                onChange={(e) => setFormData({...formData, image: e.target.value})} 
                placeholder="https://..." 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Bio</label>
              <Textarea 
                required 
                rows={3}
                value={formData.bio} 
                onChange={(e) => setFormData({...formData, bio: e.target.value})} 
                placeholder="Brief bio..." 
              />
            </div>
            <Button type="submit">Save Member</Button>
          </form>
        </div>
      )}

      <div className="border rounded-xl bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : teams.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No team members found.</div>
        ) : (
          <div className="divide-y">
            {teams.map((member: any) => (
              <div key={member.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {member.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={member.image} alt="" className="w-16 h-16 rounded-md object-cover grayscale" />
                  )}
                  <div>
                    <h3 className="font-medium">{member.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(member.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
