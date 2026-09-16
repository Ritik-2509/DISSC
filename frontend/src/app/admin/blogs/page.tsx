"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  ExternalLink,
  CheckCircle2,
  Clock,
  Save,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudinaryUploadWidget } from "@/components/admin/CloudinaryUploadWidget";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBlog, setEditingBlog] = useState<any | null>(null);

  useEffect(() => {
    fetch("/firestore_export/blogs.json")
      .then((res) => res.json())
      .then((data) => setBlogs(data))
      .catch(() => {
        setBlogs([
          {
            id: 1,
            name: "How Specialized Therapy Transforms Young Minds",
            slug: "how-specialized-therapy-transforms-young-minds",
            description: "An overview of rehabilitation techniques applied at Deva Center Varanasi.",
            status: "published",
            created_at: "2026-01-15",
          },
          {
            id: 2,
            name: "The Power of Community Care in Rural Bachhaon",
            slug: "community-care-in-rural-bachhaon",
            description: "Addressing stigma and expanding intellectual disability management.",
            status: "published",
            created_at: "2025-11-20",
          }
        ]);
      });
  }, []);

  const filteredBlogs = blogs.filter((b) =>
    (b.name && b.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
    (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    let targetBlog: any;
    if (editingBlog.id && blogs.some((b) => b.id === editingBlog.id)) {
      targetBlog = { ...editingBlog, updated_at: new Date().toISOString() };
      setBlogs(blogs.map((b) => (b.id === editingBlog.id ? targetBlog : b)));
    } else {
      targetBlog = { ...editingBlog, id: Date.now(), created_at: new Date().toISOString(), updated_at: new Date().toISOString() };
      setBlogs([targetBlog, ...blogs]);
    }

    setEditingBlog(null);
    await saveAdminItem("blogs", targetBlog);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Publications & Articles</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
              {blogs.length} Posts
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
            Blogs and Success Stories
          </h1>
          <p className="text-xs text-muted-foreground">
            Manage public articles, field updates, and clinical education posts.
          </p>
        </div>

        <Button
          onClick={() =>
            setEditingBlog({
              id: null,
              name: "",
              slug: "",
              description: "",
              content: "",
              status: "published",
              imageUrl: "",
            })
          }
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider h-11 px-5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Write New Article</span>
        </Button>
      </div>

      {/* Search Input */}
      <div className="bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div className="relative">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search stories and articles..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((post) => (
          <div
            key={post.id}
            className="bg-card rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative aspect-[16/10] bg-muted w-full overflow-hidden">
                {post.imageUrl || post.image ? (
                  <Image
                    src={post.imageUrl || post.image}
                    alt={post.name}
                    fill
                    className="object-cover"
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    <BookOpen className="w-8 h-8 text-muted-foreground/50" />
                  </div>
                )}
                <span className="absolute top-3 left-3 bg-secondary text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                  {post.status || "published"}
                </span>
              </div>

              <div className="p-5 space-y-2">
                <h3 className="font-display font-bold text-base text-secondary line-clamp-2">
                  {post.name}
                </h3>
                <p className="text-xs text-muted-foreground line-clamp-3">
                  {post.description || "Article about DISCC clinical initiatives and child rehabilitation."}
                </p>
              </div>
            </div>

            <div className="p-5 pt-0 flex items-center justify-between border-t border-border/60 mt-4 pt-3 text-xs">
              <span className="text-muted-foreground text-[11px]">
                {post.created_at ? post.created_at.split("T")[0].split(" ")[0] : "Recent"}
              </span>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingBlog({ ...post })}
                className="rounded-xl text-xs font-bold border-border hover:border-primary text-secondary"
              >
                <Edit className="w-3.5 h-3.5 mr-1" />
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Edit / New Blog Modal */}
      {editingBlog && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-3xl border border-border shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
              <h3 className="font-display font-black text-xl text-secondary">
                {editingBlog.id ? "Edit Article" : "Create New Story / Blog"}
              </h3>
              <button onClick={() => setEditingBlog(null)} className="text-muted-foreground hover:text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="p-6 space-y-5 overflow-y-auto flex-1">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Article Title</label>
                <input
                  type="text"
                  value={editingBlog.name || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, name: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">URL Slug</label>
                <input
                  type="text"
                  value={editingBlog.slug || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, slug: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Short Excerpt / Summary</label>
                <textarea
                  value={editingBlog.description || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, description: e.target.value })}
                  rows={2}
                  className="w-full p-3 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <CloudinaryUploadWidget
                label="Cover Image (Cloudinary or Direct URL)"
                currentValue={editingBlog.imageUrl || editingBlog.image || ""}
                onSuccess={(url) => setEditingBlog({ ...editingBlog, imageUrl: url, image: url })}
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Full Article Content</label>
                <textarea
                  value={editingBlog.content || ""}
                  onChange={(e) => setEditingBlog({ ...editingBlog, content: e.target.value })}
                  rows={6}
                  className="w-full p-3 rounded-xl border border-border text-xs font-mono outline-none focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-border flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setEditingBlog(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider">
                  Save Article
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
