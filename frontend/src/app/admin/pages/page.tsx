"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FileText,
  Search,
  ExternalLink,
  Edit,
  CheckCircle2,
  Clock,
  Plus,
  X,
  Save,
  Globe2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudinaryUploadWidget } from "@/components/admin/CloudinaryUploadWidget";
import { saveAdminItem } from "@/lib/admin-client";

export default function AdminPages() {
  const [pages, setPages] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPage, setSelectedPage] = useState<any | null>(null);
  const [editingPage, setEditingPage] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  useEffect(() => {
    // Load pages from api or static export
    fetch("/firestore_export/pages.json")
      .then((res) => res.json())
      .then((data) => {
        setPages(data);
        setLoading(false);
      })
      .catch(() => {
        // Fallback default client pages
        setPages([
          { id: 1, name: "Home", slug: "home", status: "published", updated_at: "2026-02-17" },
          { id: 6, name: "About DISCC", slug: "about", status: "published", updated_at: "2026-02-17" },
          { id: 7, name: "Deva Center", slug: "deva-center", status: "published", updated_at: "2026-02-17" },
          { id: 8, name: "Annapurna Center", slug: "annapurna-center", status: "published", updated_at: "2026-02-17" },
          { id: 9, name: "Child Education Program", slug: "child-education-program", status: "published", updated_at: "2026-02-17" },
          { id: 10, name: "Deva Gram (Bachhaon)", slug: "deva-gram-bachhaon", status: "published", updated_at: "2026-02-17" },
          { id: 11, name: "Navjeevan", slug: "navjeevan", status: "published", updated_at: "2026-02-17" },
          { id: 12, name: "Gangotri", slug: "gangotri", status: "published", updated_at: "2026-02-17" },
          { id: 13, name: "Ambedkar", slug: "ambedkar", status: "published", updated_at: "2026-02-17" },
        ]);
        setLoading(false);
      });
  }, []);

  const filteredPages = pages.filter((p) => {
    const q = searchQuery.toLowerCase();
    return (
      (p.name && p.name.toLowerCase().includes(q)) ||
      (p.slug && p.slug.toLowerCase().includes(q)) ||
      (p.description && p.description.toLowerCase().includes(q))
    );
  });

  const handleEditClick = (page: any) => {
    setEditingPage({ ...page });
    setSaveMessage(null);
  };

  const handleSavePage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPage) return;

    // Update in state immediately for fast feedback
    const updated = { ...editingPage, updated_at: new Date().toISOString() };
    setPages((prev) =>
      prev.map((p) => (p.id === editingPage.id ? updated : p))
    );

    setSaveMessage("Saving changes to database...");
    const res = await saveAdminItem("pages", updated);
    if (res.success) {
      setSaveMessage("Page updated and saved successfully!");
    } else {
      setSaveMessage("Saved locally in memory.");
    }
    setTimeout(() => setSaveMessage(null), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Content Management</span>
            <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full font-bold">
              {pages.length} Pages
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
            Manage Website Pages
          </h1>
          <p className="text-xs text-muted-foreground">
            All 39 static and dynamic pages originating from DISCC Botble CMS.
          </p>
        </div>

        <Button
          onClick={() => {
            const newId = pages.length + 1;
            setEditingPage({
              id: newId,
              name: "",
              slug: "",
              status: "published",
              description: "",
              content: "",
              imageUrl: "",
            });
          }}
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider h-11 px-5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Page</span>
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search pages by title or URL slug..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm outline-none focus:border-primary"
          />
        </div>
        <span className="text-xs text-muted-foreground hidden sm:inline">
          Showing {filteredPages.length} of {pages.length}
        </span>
      </div>

      {/* Pages Table */}
      <div className="bg-card rounded-3xl border border-border shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-muted/40 border-b border-border text-secondary font-bold uppercase tracking-wider">
              <tr>
                <th className="py-4 px-6">Title & Slug</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6">Featured Image</th>
                <th className="py-4 px-6">Last Modified</th>
                <th className="py-4 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {filteredPages.map((page) => (
                <tr key={page.id} className="hover:bg-muted/20 transition-colors">
                  <td className="py-4 px-6">
                    <div className="space-y-1">
                      <p className="font-bold text-sm text-secondary">{page.name}</p>
                      <p className="text-muted-foreground text-[11px] font-mono flex items-center gap-1">
                        <Globe2 className="w-3 h-3 text-primary" />
                        <span>/{page.slug || `page-${page.id}`}</span>
                      </p>
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700">
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{page.status || "published"}</span>
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    {page.imageUrl || page.image ? (
                      <div className="relative w-12 h-9 rounded-lg overflow-hidden border border-border bg-muted">
                        <Image
                          src={page.imageUrl || page.image}
                          alt={page.name}
                          fill
                          className="object-cover"
                          unoptimized
                        />
                      </div>
                    ) : (
                      <span className="text-muted-foreground text-[11px]">None</span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-muted-foreground">
                    {page.updated_at ? page.updated_at.split("T")[0].split(" ")[0] : "1991"}
                  </td>
                  <td className="py-4 px-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEditClick(page)}
                        className="h-8 px-3 rounded-lg text-xs font-bold border-border hover:border-primary text-secondary hover:text-primary flex items-center gap-1"
                      >
                        <Edit className="w-3 h-3" />
                        <span>Edit</span>
                      </Button>
                      <Link href={`/${page.slug || ""}`} target="_blank">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 rounded-lg text-muted-foreground hover:text-primary"
                          title="View on site"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit / Create Modal */}
      {editingPage && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-3xl border border-border shadow-2xl max-w-2xl w-full max-h-[90vh] flex flex-col overflow-hidden">
            {/* Modal Header */}
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
              <div>
                <h3 className="font-display font-black text-xl text-secondary">
                  {editingPage.id ? `Edit: ${editingPage.name}` : "Create New Page"}
                </h3>
                <p className="text-xs text-muted-foreground">Modify page parameters and Cloudinary media</p>
              </div>
              <button
                onClick={() => setEditingPage(null)}
                className="p-2 rounded-xl text-muted-foreground hover:text-secondary hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSavePage} className="p-6 space-y-5 overflow-y-auto flex-1">
              {saveMessage && (
                <div className="p-3 bg-emerald-50 text-emerald-800 text-xs rounded-xl flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{saveMessage}</span>
                </div>
              )}

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Page Title</label>
                <input
                  type="text"
                  value={editingPage.name || ""}
                  onChange={(e) => setEditingPage({ ...editingPage, name: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary">URL Slug</label>
                  <input
                    type="text"
                    value={editingPage.slug || ""}
                    onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                    required
                    className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-secondary">Publication Status</label>
                  <select
                    value={editingPage.status || "published"}
                    onChange={(e) => setEditingPage({ ...editingPage, status: e.target.value })}
                    className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary bg-card"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                    <option value="pending">Pending Review</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Brief Description</label>
                <textarea
                  value={editingPage.description || ""}
                  onChange={(e) => setEditingPage({ ...editingPage, description: e.target.value })}
                  rows={2}
                  className="w-full p-3 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              {/* Cloudinary Upload for Page Image */}
              <CloudinaryUploadWidget
                label="Featured Image (Cloudinary or Storage)"
                currentValue={editingPage.imageUrl || editingPage.image || ""}
                onSuccess={(url) => setEditingPage({ ...editingPage, imageUrl: url, image: url })}
              />

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Page HTML / Text Content</label>
                <textarea
                  value={editingPage.content || ""}
                  onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                  rows={6}
                  className="w-full p-3 rounded-xl border border-border text-xs font-mono outline-none focus:border-primary"
                />
              </div>

              <div className="pt-4 border-t border-border flex items-center justify-end gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setEditingPage(null)}
                  className="rounded-xl text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider px-6 h-11 flex items-center gap-2"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Page</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
