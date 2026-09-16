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
  ExternalLink,
  Edit,
  Upload
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudinaryUploadWidget } from "@/components/admin/CloudinaryUploadWidget";
import { saveAdminItem } from "@/lib/admin-client";

export default function AdminGallery() {
  const [galleries, setGalleries] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedGallery, setSelectedGallery] = useState<any | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newGallery, setNewGallery] = useState({
    name: "",
    year: "2026",
    description: "",
    imageUrl: "",
    status: "published",
    images: [] as string[],
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
    const created = {
      ...newGallery,
      id: Date.now(),
      created_at: new Date().toISOString(),
    };
    setGalleries([created, ...galleries]);
    setShowCreateModal(false);
    setNewGallery({
      name: "",
      year: "2026",
      description: "",
      imageUrl: "",
      status: "published",
      images: [],
    });
    await saveAdminItem("galleries", created);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Photo & Event Archives</span>
            <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-bold">
              {galleries.length} Albums
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
            Manage Photo Galleries
          </h1>
          <p className="text-xs text-muted-foreground">
            Original event photo albums from 1991 to 2026 including the Purple Fair and annual festivals.
          </p>
        </div>

        <Button
          onClick={() => setShowCreateModal(true)}
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider h-11 px-5 flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Album</span>
        </Button>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search albums by event name or year..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm outline-none focus:border-primary"
          />
        </div>
      </div>

      {/* Gallery Album Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredGalleries.map((gal) => (
          <div
            key={gal.id}
            onClick={() => setSelectedGallery(gal)}
            className="bg-card rounded-3xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div className="relative aspect-[4/3] bg-muted w-full overflow-hidden">
              {gal.imageUrl ? (
                <Image
                  src={gal.imageUrl}
                  alt={gal.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  unoptimized
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  <Images className="w-8 h-8 text-muted-foreground/50" />
                </div>
              )}
              <span className="absolute top-3 right-3 bg-secondary/80 text-white text-[10px] font-bold px-2.5 py-1 rounded-full backdrop-blur-xs">
                {gal.year || "2026"}
              </span>
            </div>

            <div className="p-5 space-y-2">
              <h3 className="font-display font-bold text-base text-secondary group-hover:text-primary transition-colors line-clamp-1">
                {gal.name}
              </h3>
              <p className="text-xs text-muted-foreground line-clamp-2">
                {gal.description || "Photo archive from DISCC Varanasi community event."}
              </p>
              <div className="pt-2 border-t border-border/60 flex items-center justify-between text-[11px] text-muted-foreground">
                <span>{Array.isArray(gal.images) ? gal.images.length : 0} photos</span>
                <span className="text-primary font-bold group-hover:underline">View Album →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Album Preview Modal */}
      {selectedGallery && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-card rounded-3xl border border-border shadow-2xl max-w-3xl w-full max-h-[85vh] flex flex-col overflow-hidden">
            <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
              <div>
                <h3 className="font-display font-black text-xl text-secondary">{selectedGallery.name}</h3>
                <p className="text-xs text-muted-foreground">Year: {selectedGallery.year || "2026"} • Status: {selectedGallery.status}</p>
              </div>
              <button
                onClick={() => setSelectedGallery(null)}
                className="p-2 rounded-xl text-muted-foreground hover:text-secondary hover:bg-muted"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-2">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">Cover Photo</p>
                {selectedGallery.imageUrl && (
                  <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-border">
                    <Image
                      src={selectedGallery.imageUrl}
                      alt={selectedGallery.name}
                      fill
                      className="object-cover"
                      unoptimized
                    />
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <p className="text-xs font-bold uppercase tracking-wider text-primary">
                  Album Photos ({Array.isArray(selectedGallery.images) ? selectedGallery.images.length : 0})
                </p>
                {Array.isArray(selectedGallery.images) && selectedGallery.images.length > 0 ? (
                  <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
                    {selectedGallery.images.map((img: any, i: number) => {
                      const imgUrl = typeof img === "string" ? img : img.img;
                      const fullSrc = imgUrl?.startsWith("http") ? imgUrl : `https://disccindia.org/storage/${imgUrl}`;
                      return (
                        <div key={i} className="relative aspect-square rounded-xl overflow-hidden border border-border bg-muted">
                          <Image
                            src={fullSrc}
                            alt="Photo"
                            fill
                            className="object-cover"
                            unoptimized
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-xs text-muted-foreground">No additional photos uploaded to this album.</p>
                )}
              </div>
            </div>

            <div className="p-4 border-t border-border flex justify-end">
              <Button onClick={() => setSelectedGallery(null)} className="rounded-xl text-xs">
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Create New Album Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-card rounded-3xl border border-border shadow-2xl max-w-lg w-full p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <h3 className="font-display font-black text-xl text-secondary">New Photo Album</h3>
              <button onClick={() => setShowCreateModal(false)} className="text-muted-foreground hover:text-secondary">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateGallery} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Album Name</label>
                <input
                  type="text"
                  placeholder="e.g. World Autism Day Celebration"
                  value={newGallery.name}
                  onChange={(e) => setNewGallery({ ...newGallery, name: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Event Year</label>
                <input
                  type="text"
                  value={newGallery.year}
                  onChange={(e) => setNewGallery({ ...newGallery, year: e.target.value })}
                  required
                  className="w-full h-11 px-3.5 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-secondary">Description</label>
                <textarea
                  placeholder="Brief context about this event..."
                  value={newGallery.description}
                  onChange={(e) => setNewGallery({ ...newGallery, description: e.target.value })}
                  rows={2}
                  className="w-full p-3 rounded-xl border border-border text-sm outline-none focus:border-primary"
                />
              </div>

              <CloudinaryUploadWidget
                label="Album Cover Image"
                currentValue={newGallery.imageUrl}
                onSuccess={(url) => setNewGallery({ ...newGallery, imageUrl: url })}
              />

              <div className="pt-3 flex justify-end gap-2">
                <Button type="button" variant="ghost" onClick={() => setShowCreateModal(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="rounded-xl bg-primary text-white font-bold text-xs uppercase tracking-wider">
                  Save Album
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
