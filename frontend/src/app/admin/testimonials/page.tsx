"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { saveAdminItem, deleteAdminItem, fetchAdminCollection } from "@/lib/admin-client";

export default function AdminTestimonials() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ name: "", role: "", quote: "", image: "" });

  const fetchTestimonials = () => {
    setLoading(true);
    fetchAdminCollection("testimonials")
      .then(data => {
        setTestimonials(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching testimonials:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleDelete = async (id: string | number) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    try {
      await deleteAdminItem("testimonials", id);
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await saveAdminItem("testimonials", { ...formData, id: Date.now() });
      setIsCreating(false);
      setFormData({ name: "", role: "", quote: "", image: "" });
      fetchTestimonials();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Testimonials</h1>
          <p className="text-muted-foreground">What people say about DISCC.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? "Cancel" : "Add Testimonial"}
        </Button>
      </div>

      {isCreating && (
        <div className="border rounded-xl bg-card p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Add Testimonial</h2>
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
              <label className="text-sm font-medium mb-1 block">Role / Context</label>
              <Input 
                required
                value={formData.role} 
                onChange={(e) => setFormData({...formData, role: e.target.value})} 
                placeholder="e.g. Volunteer, Parent" 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Image URL (optional)</label>
              <Input 
                value={formData.image} 
                onChange={(e) => setFormData({...formData, image: e.target.value})} 
                placeholder="https://..." 
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1 block">Quote</label>
              <Textarea 
                required 
                rows={3}
                value={formData.quote} 
                onChange={(e) => setFormData({...formData, quote: e.target.value})} 
                placeholder="Quote..." 
              />
            </div>
            <Button type="submit">Save Testimonial</Button>
          </form>
        </div>
      )}

      <div className="border rounded-xl bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : testimonials.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No testimonials found.</div>
        ) : (
          <div className="divide-y">
            {testimonials.map((test: any) => (
              <div key={test.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {test.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={test.image} alt="" className="w-16 h-16 rounded-md object-cover" />
                  )}
                  <div>
                    <h3 className="font-medium">{test.name}</h3>
                    <p className="text-sm text-muted-foreground truncate max-w-md">
                      "{test.quote}"
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(test.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
