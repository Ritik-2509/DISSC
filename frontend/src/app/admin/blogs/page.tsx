"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  BookOpen,
  Plus,
  Search,
  Edit2,
  Trash2,
  Save,
  X,
  Calendar,
  Sparkles,
  CheckCircle2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

interface BlogItem {
  id: string | number;
  name: string;
  slug: string;
  category: string;
  description: string;
  content: string;
  image?: string;
  is_featured?: boolean;
  status: "published" | "draft";
  created_at?: string;
}

export default function AdminBlogs() {
  const [blogs, setBlogs] = useState<BlogItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [editingBlog, setEditingBlog] = useState<BlogItem | null>(null);
  const [isNew, setIsNew] = useState(false);

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
            category: "Clinical Care",
            description: "An overview of rehabilitation techniques applied at Deva Center Varanasi.",
            content: "Full article content covering clinical psychology and sensory integration...",
            image: "/images/discc/children-activity.png",
            status: "published",
            created_at: "2026-01-15",
          },
          {
            id: 2,
            name: "The Power of Community Care in Rural Bachhaon",
            slug: "community-care-in-rural-bachhaon",
            category: "Rural Outreach",
            description: "Addressing stigma and expanding intellectual disability management in rural villages.",
            content: "Deva Gram in Bachhaon village extends comprehensive care...",
            image: "/images/discc/community-program.png",
            status: "published",
            created_at: "2025-11-20",
          }
        ]);
      });
  }, []);

  const filteredBlogs = blogs.filter(
    (b) =>
      (b.name && b.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (b.description && b.description.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBlog) return;

    let targetBlog: BlogItem;
    if (!isNew && blogs.some((b) => b.id === editingBlog.id)) {
      targetBlog = { ...editingBlog };
      setBlogs(blogs.map((b) => (b.id === editingBlog.id ? targetBlog : b)));
    } else {
      targetBlog = {
        ...editingBlog,
        id: Date.now(),
        created_at: new Date().toISOString().split("T")[0],
      };
      setBlogs([targetBlog, ...blogs]);
    }

    setEditingBlog(null);
    setIsNew(false);
    await saveAdminItem("blogs", targetBlog);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      setBlogs(blogs.filter((b) => b.id !== id));
      if (editingBlog?.id === id) setEditingBlog(null);
      await deleteAdminItem("blogs", id);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Articles & Impact Stories
          </h1>
          <p className="text-xs sm:text-sm text-muted-text">
            Publish educational articles, clinical breakthroughs, and field updates.
          </p>
        </div>

        <Button
          onClick={() => {
            setIsNew(true);
            setEditingBlog({
              id: Date.now(),
              name: "",
              slug: "",
              category: "Clinical Care",
              description: "",
              content: "",
              image: "/images/discc/children-activity.png",
              is_featured: false,
              status: "published",
            });
          }}
          variant="default"
          size="sm"
          className="rounded-full gap-2"
        >
          <Plus className="w-4 h-4" />
          Write New Article
        </Button>
      </div>

      {/* Search */}
      <div className="p-4 rounded-3xl bg-white border border-border/80 shadow-soft flex items-center gap-3">
        <Search className="w-4 h-4 text-muted-text" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search articles by title or keyword..."
          className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
        />
        <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
          {filteredBlogs.length} Articles
        </span>
      </div>

      {/* Editor Form */}
      {editingBlog && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-foreground">
              {isNew ? "Write New Article" : "Edit Article"}
            </h2>
            <button
              onClick={() => setEditingBlog(null)}
              className="text-xs font-bold text-muted-text hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Article Title *
                </label>
                <input
                  type="text"
                  required
                  value={editingBlog.name}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
                    })
                  }
                  placeholder="e.g. World Autism Awareness Day: Building Inclusive Classrooms"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  URL Slug
                </label>
                <input
                  type="text"
                  value={editingBlog.slug}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, slug: e.target.value })
                  }
                  placeholder="e.g. world-autism-day-classrooms"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Category
                </label>
                <select
                  value={editingBlog.category}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, category: e.target.value })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Clinical Care">Clinical Psychology & Therapy</option>
                  <option value="Rural Outreach">Rural Outreach & Sanctuaries</option>
                  <option value="Education">Inclusive Special Education</option>
                  <option value="Events">Festivals & Celebrations</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Featured Image URL
                </label>
                <input
                  type="text"
                  value={editingBlog.image || ""}
                  onChange={(e) =>
                    setEditingBlog({ ...editingBlog, image: e.target.value })
                  }
                  placeholder="/images/discc/children-activity.png"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Status
                </label>
                <select
                  value={editingBlog.status}
                  onChange={(e) =>
                    setEditingBlog({
                      ...editingBlog,
                      status: e.target.value as "published" | "draft",
                    })
                  }
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="published">Published</option>
                  <option value="draft">Draft</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Short Summary / Excerpt
              </label>
              <textarea
                rows={2}
                value={editingBlog.description}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, description: e.target.value })
                }
                placeholder="One or two sentences explaining the story..."
                className="w-full p-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Full Article Content
              </label>
              <textarea
                rows={6}
                value={editingBlog.content}
                onChange={(e) =>
                  setEditingBlog({ ...editingBlog, content: e.target.value })
                }
                placeholder="Write the full story or report here..."
                className="w-full p-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono text-xs"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setEditingBlog(null)}
              >
                Cancel
              </Button>
              <Button type="submit" variant="default" className="gap-2">
                <Save className="w-4 h-4" />
                Save Article
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBlogs.map((b) => (
          <div
            key={b.id}
            className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-primary/10 text-primary">
                  {b.category || "General"}
                </span>
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10.5px] font-bold ${
                    b.status === "published"
                      ? "bg-[#E6F6EE] text-[#0F8B8D]"
                      : "bg-muted text-muted-text"
                  }`}
                >
                  {b.status || "published"}
                </span>
              </div>

              <h3 className="font-heading font-bold text-lg text-foreground mb-1">
                {b.name}
              </h3>
              <p className="text-xs text-muted-text line-clamp-2">
                {b.description}
              </p>
            </div>

            <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between">
              <span className="text-xs text-muted-text font-medium">
                {b.created_at || "Recent"}
              </span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => {
                    setIsNew(false);
                    setEditingBlog(b);
                  }}
                  variant="outline"
                  size="sm"
                  className="gap-1 text-xs"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Edit
                </Button>
                <Button
                  onClick={() => handleDelete(b.id)}
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
