"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const API_URL = "http://localhost:3001/api"; 

export default function AdminPages() {
  const [pages, setPages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });

  const fetchPages = () => {
    setLoading(true);
    fetch(`${API_URL}/pages`)
      .then(res => res.json())
      .then(data => {
        setPages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching pages:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchPages();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this program?")) return;
    try {
      await fetch(`${API_URL}/pages/${id}`, { method: "DELETE" });
      fetchPages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/pages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData })
      });
      setIsCreating(false);
      setFormData({ title: "", content: "", image: "" });
      fetchPages();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Programs & Pages</h1>
          <p className="text-muted-foreground">Manage the core initiatives of DISCC.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? "Cancel" : "Add New Program"}
        </Button>
      </div>

      {isCreating && (
        <div className="border rounded-xl bg-card p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create New Program</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title (e.g. Children Education Program)</label>
              <Input 
                required 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                placeholder="Program Title" 
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
              <label className="text-sm font-medium mb-1 block">Description</label>
              <Textarea 
                required 
                rows={5}
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                placeholder="Details about the initiative..." 
              />
            </div>
            <Button type="submit">Save Program</Button>
          </form>
        </div>
      )}

      <div className="border rounded-xl bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : pages.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No programs found.</div>
        ) : (
          <div className="divide-y">
            {pages.map((page: any) => (
              <div key={page.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {page.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={page.image} alt="" className="w-16 h-16 rounded-md object-cover" />
                  )}
                  <div>
                    <h3 className="font-medium">{page.title}</h3>
                    <p className="text-sm text-muted-foreground truncate max-w-md">
                      {page.content}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(page.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
