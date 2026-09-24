"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  Images,
  Plus,
  Search,
  Calendar,
  X,
  CheckCircle2,
  Edit2,
  Trash2,
  Upload,
  Layers,
  Save,
  Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

interface GalleryImage {
  url: string;
  caption?: string;
  order?: number;
}

interface Album {
  id: string | number;
  name: string;
  year: string | number;
  category: string;
  description: string;
  imageUrl?: string;
  status: "published" | "draft";
  images: (string | GalleryImage)[];
}

export default function AdminGalleryPage() {
  const [galleries, setGalleries] = useState<Album[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGallery, setSelectedGallery] = useState<Album | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const [newGallery, setNewGallery] = useState<Album>({
    id: `gal-${Date.now()}`,
    name: "",
    year: "2026",
    category: "Events",
    description: "",
    imageUrl: "",
    status: "published",
    images: [],
  });

  useEffect(() => {
    fetch("/firestore_export/galleries.json")
      .then((res) => res.json())
      .then((data) => setGalleries(data))
      .catch(() => {});
  }, []);

  const filteredGalleries = galleries.filter((g) => {
    return (
      (g.name && g.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (g.year && String(g.year).includes(searchQuery))
    );
  });

  const handleCreateGallery = async (e: React.FormEvent) => {
    e.preventDefault();
    const created: Album = {
      ...newGallery,
      id: Date.now(),
      imageUrl: newGallery.imageUrl || (newGallery.images[0] ? (typeof newGallery.images[0] === "string" ? newGallery.images[0] : newGallery.images[0].url) : "/images/discc/children-activity.png"),
    };
    setGalleries([created, ...galleries]);
    setShowCreateModal(false);
    await saveAdminItem("galleries", created);
  };

  const handleDeleteGallery = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this album?")) {
      setGalleries(galleries.filter((g) => g.id !== id));
      if (selectedGallery?.id === id) setSelectedGallery(null);
      await deleteAdminItem("galleries", id);
    }
  };

  const handleSimulateBulkUpload = (files: FileList | null) => {
    if (!files || !selectedGallery) return;
    setUploadProgress(10);
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (!prev || prev >= 100) {
          clearInterval(interval);
          // Add uploaded files as sample drive asset urls
          const sampleUrls = [
            "/hero/slide-1-cm-award.png",
            "/images/discc/children-activity.png",
            "/images/discc/hero-children.png",
          ];
          const updatedImages = [...selectedGallery.images, ...sampleUrls];
          const updatedGallery = { ...selectedGallery, images: updatedImages };
          setSelectedGallery(updatedGallery);
          setGalleries(galleries.map((g) => (g.id === selectedGallery.id ? updatedGallery : g)));
          saveAdminItem("galleries", updatedGallery);
          return null;
        }
        return prev + 30;
      });
    }, 300);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Photo Albums & Event Galleries
          </h1>
          <p className="text-xs sm:text-sm text-muted-text">
            Manage photo collections from 1991 to 2026, upload bulk event photos, and set covers.
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          variant="default"
          size="sm"
          className="rounded-full gap-2"
        >
          <Plus className="w-4 h-4" />
          Create New Album
        </Button>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-2xl bg-white border border-border/80 shadow-soft flex items-center gap-3">
        <Search className="w-4 h-4 text-muted-text" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search albums by year (e.g. 2026, 2025) or event name..."
          className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
        />
        <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
          {filteredGalleries.length} Albums
        </span>
      </div>

      {/* Create Album Modal */}
      {showCreateModal && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold font-heading text-foreground">
              Create New Photo Album
            </h2>
            <button
              onClick={() => setShowCreateModal(false)}
              className="text-xs font-bold text-muted-text hover:text-foreground cursor-pointer"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleCreateGallery} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-foreground mb-1">
                  Album Name *
                </label>
                <input
                  type="text"
                  required
                  value={newGallery.name}
                  onChange={(e) => setNewGallery({ ...newGallery, name: e.target.value })}
                  placeholder="e.g. Purple Fair for Divyangjan 2026"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Year *
                </label>
                <input
                  type="text"
                  required
                  value={newGallery.year}
                  onChange={(e) => setNewGallery({ ...newGallery, year: e.target.value })}
                  placeholder="2026"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Category
                </label>
                <select
                  value={newGallery.category}
                  onChange={(e) => setNewGallery({ ...newGallery, category: e.target.value })}
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                >
                  <option value="Events">Flagship Events & Festivals</option>
                  <option value="Action Areas">Rural Sanctuaries & Outposts</option>
                  <option value="Clinical Care">Clinical Therapy & Classrooms</option>
                  <option value="Recognition">Awards & Felicitation</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-foreground mb-1">
                  Cover Image Path
                </label>
                <input
                  type="text"
                  value={newGallery.imageUrl}
                  onChange={(e) => setNewGallery({ ...newGallery, imageUrl: e.target.value })}
                  placeholder="/images/discc/children-activity.png"
                  className="w-full h-11 px-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-foreground mb-1">
                Description / Context
              </label>
              <textarea
                rows={2}
                value={newGallery.description}
                onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                placeholder="Brief summary of the festival, participants, and location..."
                className="w-full p-4 rounded-xl border border-border bg-[#FFFAF2]/50 text-sm focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex justify-end gap-3 pt-4">
              <Button type="button" variant="outline" onClick={() => setShowCreateModal(false)}>
                Cancel
              </Button>
              <Button type="submit" variant="default" className="gap-2">
                <Save className="w-4 h-4" />
                Save Album
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Selected Album Detail & Multi-Image Manager */}
      {selectedGallery && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-0.5 rounded-full text-xs font-bold bg-primary text-white">
                  {selectedGallery.year}
                </span>
                <span className="text-xs font-bold text-muted-text">
                  {selectedGallery.category || "Events"}
                </span>
              </div>
              <h2 className="text-2xl font-bold font-heading text-foreground mt-1">
                {selectedGallery.name}
              </h2>
              <p className="text-xs text-muted-text mt-0.5">
                {selectedGallery.description || "Photo archive collection"}
              </p>
            </div>

            <button
              onClick={() => setSelectedGallery(null)}
              className="p-2 rounded-full hover:bg-muted text-muted-text cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Bulk Upload Dropzone */}
          <div className="p-6 rounded-2xl border-2 border-dashed border-primary/40 bg-[#FFFAF2]/60 text-center space-y-3">
            <Upload className="w-8 h-8 text-primary mx-auto" />
            <div>
              <p className="text-sm font-bold text-foreground">
                Drag and drop multi-image files here or click to select
              </p>
              <p className="text-xs text-muted-text">
                Supports JPG, PNG, WebP up to 10MB each
              </p>
            </div>

            <label className="inline-block">
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleSimulateBulkUpload(e.target.files)}
                className="hidden"
              />
              <span className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary text-white text-xs font-bold cursor-pointer hover:bg-primary-hover transition-colors shadow-soft">
                <Upload className="w-3.5 h-3.5" />
                Select Multiple Photos
              </span>
            </label>

            {uploadProgress !== null && (
              <div className="max-w-xs mx-auto space-y-1 pt-2">
                <div className="h-2 w-full bg-border rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
                <p className="text-[11px] text-muted-text">Uploading {uploadProgress}%...</p>
              </div>
            )}
          </div>

          {/* Photos in Album */}
          <div className="space-y-3">
            <h3 className="font-bold text-sm text-foreground">
              Photos in this Album ({selectedGallery.images.length})
            </h3>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {selectedGallery.images.map((img, i) => {
                const url = typeof img === "string" ? img : img.url;
                const isCover = selectedGallery.imageUrl === url;

                return (
                  <div
                    key={i}
                    className="group relative aspect-square rounded-2xl overflow-hidden bg-muted border border-border shadow-xs"
                  >
                    <Image src={url} alt="Album photo" fill className="object-cover" />

                    {isCover && (
                      <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-[#F5A524] text-[#1E2A3A] font-bold text-[10px] flex items-center gap-1 shadow-xs">
                        <Star className="w-3 h-3 fill-current" />
                        Cover
                      </div>
                    )}

                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                      {!isCover && (
                        <button
                          onClick={() => {
                            const updated = { ...selectedGallery, imageUrl: url };
                            setSelectedGallery(updated);
                            setGalleries(galleries.map((g) => (g.id === selectedGallery.id ? updated : g)));
                            saveAdminItem("galleries", updated);
                          }}
                          className="p-1.5 rounded-lg bg-white/90 text-foreground text-xs font-bold hover:bg-white cursor-pointer"
                          title="Set as cover"
                        >
                          Cover
                        </button>
                      )}
                      <button
                        onClick={() => {
                          const updatedImages = selectedGallery.images.filter((_, idx) => idx !== i);
                          const updated = { ...selectedGallery, images: updatedImages };
                          setSelectedGallery(updated);
                          setGalleries(galleries.map((g) => (g.id === selectedGallery.id ? updated : g)));
                          saveAdminItem("galleries", updated);
                        }}
                        className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 cursor-pointer"
                        title="Delete photo"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Album Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredGalleries.map((album) => {
          const cover =
            album.imageUrl ||
            (album.images && album.images[0]
              ? typeof album.images[0] === "string"
                ? album.images[0]
                : album.images[0].url
              : "/images/discc/children-activity.png");

          return (
            <div
              key={album.id}
              className="p-6 rounded-3xl bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-muted mb-4 border border-border">
                  <Image src={cover} alt={album.name} fill className="object-cover" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-xs text-white text-xs font-bold font-mono">
                    {album.year}
                  </div>
                  <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-full bg-white/90 text-foreground text-xs font-bold shadow-xs">
                    {(album.images && album.images.length) || 0} Photos
                  </div>
                </div>

                <h3 className="font-heading font-bold text-lg text-foreground line-clamp-1">
                  {album.name}
                </h3>
                <p className="text-xs text-muted-text mt-1 line-clamp-2">
                  {album.description || "Photo archive"}
                </p>
              </div>

              <div className="pt-4 border-t border-border/60 mt-4 flex items-center justify-between">
                <button
                  onClick={() => setSelectedGallery(album)}
                  className="text-xs font-bold text-primary hover:text-primary-hover flex items-center gap-1 cursor-pointer"
                >
                  <Edit2 className="w-3.5 h-3.5" />
                  Manage Photos
                </button>
                <Button
                  onClick={() => handleDeleteGallery(album.id)}
                  variant="destructive"
                  size="sm"
                  className="p-2"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
