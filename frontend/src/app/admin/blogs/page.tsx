"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const API_URL = "/api"; 

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState({ title: "", content: "", image: "" });

  const fetchBlogs = () => {
    setLoading(true);
    fetch(`${API_URL}/blogs`)
      .then(res => res.json())
      .then(data => {
        setBlogs(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching blogs:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this blog?")) return;
    try {
      await fetch(`${API_URL}/blogs/${id}`, { method: "DELETE" });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`${API_URL}/blogs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, publishedAt: new Date().toISOString() })
      });
      setIsCreating(false);
      setFormData({ title: "", content: "", image: "" });
      fetchBlogs();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Blogs</h1>
          <p className="text-muted-foreground">Create, edit, and delete stories of change.</p>
        </div>
        <Button onClick={() => setIsCreating(!isCreating)}>
          {isCreating ? "Cancel" : "Add New Blog"}
        </Button>
      </div>

      {isCreating && (
        <div className="border rounded-xl bg-card p-6 mb-8 shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Create New Blog</h2>
          <form onSubmit={handleCreate} className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1 block">Title</label>
              <Input 
                required 
                value={formData.title} 
                onChange={(e) => setFormData({...formData, title: e.target.value})} 
                placeholder="Blog Title" 
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
              <label className="text-sm font-medium mb-1 block">Content</label>
              <Textarea 
                required 
                rows={5}
                value={formData.content} 
                onChange={(e) => setFormData({...formData, content: e.target.value})} 
                placeholder="Blog content..." 
              />
            </div>
            <Button type="submit">Save Blog</Button>
          </form>
        </div>
      )}

      <div className="border rounded-xl bg-card">
        {loading ? (
          <div className="p-8 text-center text-muted-foreground">Loading...</div>
        ) : blogs.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">No blogs found.</div>
        ) : (
          <div className="divide-y">
            {blogs.map((blog: any) => (
              <div key={blog.id} className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  {blog.image && (
                    /* eslint-disable-next-line @next/next/no-img-element */
                    <img src={blog.image} alt="" className="w-16 h-16 rounded-md object-cover" />
                  )}
                  <div>
                    <h3 className="font-medium">{blog.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Published: {new Date(blog.publishedAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(blog.id)}>Delete</Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
