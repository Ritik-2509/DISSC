"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  ImageIcon,
  Search,
  Upload,
  Copy,
  Check,
  Filter,
  FileText,
  ExternalLink,
  Plus,
  Trash2,
  X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { saveAdminItem, deleteAdminItem } from "@/lib/admin-client";

interface MediaFile {
  id: string | number;
  name: string;
  url?: string;
  fullUrl?: string;
  cloudinaryUrl?: string;
  mime_type?: string;
  created_at?: string;
}

export default function AdminMediaLibrary() {
  const [mediaItems, setMediaItems] = useState<MediaFile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedId, setCopiedId] = useState<string | number | null>(null);
  const [loading, setLoading] = useState(true);
  const [previewItem, setPreviewItem] = useState<MediaFile | null>(null);
  const [visibleCount, setVisibleCount] = useState(36);

  useEffect(() => {
    fetch("/api/media")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setMediaItems(data);
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  const handleCopy = (id: string | number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleDelete = async (id: string | number) => {
    if (confirm("Are you sure you want to delete this media asset?")) {
      setMediaItems(mediaItems.filter((m) => m.id !== id));
      if (previewItem?.id === id) setPreviewItem(null);
      await deleteAdminItem("media", id);
    }
  };

  const filteredMedia = mediaItems.filter((item) => {
    return item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold font-heading text-foreground">
            Media & Asset Library
          </h1>
          <p className="text-xs sm:text-sm text-muted-text">
            Search, copy URLs, and manage over 750+ photos, PDF reports, and brand logos.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary">
            {mediaItems.length} Total Files
          </span>
        </div>
      </div>

      {/* Search Bar */}
      <div className="p-4 rounded-3xl bg-white border border-border/80 shadow-soft flex items-center gap-3">
        <Search className="w-4 h-4 text-muted-text" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search media files by filename (e.g. clinic, award, hero)..."
          className="flex-1 bg-transparent text-sm text-foreground focus:outline-none"
        />
        <span className="text-xs text-muted-text font-bold">
          {filteredMedia.length} Matches
        </span>
      </div>

      {/* Preview Modal */}
      {previewItem && (
        <div className="p-6 sm:p-8 rounded-3xl bg-white border-2 border-primary/30 shadow-soft-lg space-y-6">
          <div className="flex items-start justify-between gap-4 border-b border-border/60 pb-4">
            <div>
              <h2 className="text-xl font-bold font-heading text-foreground">
                {previewItem.name}
              </h2>
              <p className="text-xs font-mono text-muted-text mt-1 truncate max-w-xl">
                {previewItem.url || previewItem.fullUrl || previewItem.cloudinaryUrl}
              </p>
            </div>
            <button
              onClick={() => setPreviewItem(null)}
              className="p-2 rounded-full hover:bg-muted text-muted-text cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative aspect-video max-h-96 w-full rounded-2xl overflow-hidden bg-black/5 border border-border">
            <Image
              src={previewItem.url || previewItem.fullUrl || previewItem.cloudinaryUrl || "/images/discc/children-activity.png"}
              alt={previewItem.name}
              fill
              className="object-contain"
            />
          </div>

          <div className="flex justify-between items-center pt-2">
            <Button
              onClick={() =>
                handleCopy(
                  previewItem.id,
                  previewItem.url || previewItem.fullUrl || previewItem.cloudinaryUrl || ""
                )
              }
              variant="default"
              size="sm"
              className="gap-2"
            >
              {copiedId === previewItem.id ? (
                <>
                  <Check className="w-4 h-4" />
                  URL Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Asset URL
                </>
              )}
            </Button>

            <Button
              onClick={() => handleDelete(previewItem.id)}
              variant="destructive"
              size="sm"
              className="gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Delete File
            </Button>
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.slice(0, visibleCount).map((item) => {
          const imgUrl = item.url || item.fullUrl || item.cloudinaryUrl || "/images/discc/children-activity.png";

          return (
            <div
              key={item.id}
              onClick={() => setPreviewItem(item)}
              className="group relative aspect-square rounded-2xl overflow-hidden bg-white border border-border/80 shadow-soft hover:shadow-soft-lg transition-all cursor-pointer p-1"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-muted">
                <Image
                  src={imgUrl}
                  alt={item.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3 text-white rounded-2xl">
                <p className="text-[11px] font-bold truncate">{item.name}</p>
                <div className="flex justify-end gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleCopy(item.id, imgUrl);
                    }}
                    className="p-1.5 rounded-lg bg-white/20 hover:bg-white/40 text-white"
                    title="Copy URL"
                  >
                    {copiedId === item.id ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {visibleCount < filteredMedia.length && (
        <div className="text-center pt-4">
          <Button
            onClick={() => setVisibleCount((prev) => prev + 36)}
            variant="outline"
            className="rounded-full px-8"
          >
            Load More Assets ({filteredMedia.length - visibleCount} remaining)
          </Button>
        </div>
      )}
    </div>
  );
}
