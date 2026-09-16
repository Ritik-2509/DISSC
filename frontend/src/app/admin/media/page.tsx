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
  Cloud,
  FileText,
  ExternalLink,
  Plus
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CloudinaryUploadWidget } from "@/components/admin/CloudinaryUploadWidget";
import { saveAdminItem } from "@/lib/admin-client";

export default function AdminMediaLibrary() {
  const [mediaItems, setMediaItems] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<string>("all");
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [showUploader, setShowUploader] = useState(false);
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

  const handleCopy = (id: number, url: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleNewUpload = async (url: string) => {
    const newItem = {
      id: Date.now(),
      name: `Cloudinary Upload ${new Date().toLocaleDateString()}`,
      fullUrl: url,
      cloudinaryUrl: url,
      mime_type: "image/jpeg",
      created_at: new Date().toISOString(),
    };
    setMediaItems([newItem, ...mediaItems]);
    setShowUploader(false);
    await saveAdminItem("media", newItem);
  };

  const filteredMedia = mediaItems.filter((item) => {
    const matchesSearch = item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase());
    if (!matchesSearch) return false;
    if (filterType === "all") return true;
    if (filterType === "image") return item.mime_type?.startsWith("image");
    if (filterType === "pdf") return item.mime_type?.includes("pdf");
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-primary">Media Asset Storage</span>
            <span className="text-xs bg-accent/20 text-secondary px-2 py-0.5 rounded-full font-bold">
              {mediaItems.length} Assets
            </span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-black text-secondary mt-1">
            Media Library & Cloudinary Storage
          </h1>
          <p className="text-xs text-muted-foreground">
            Browse 750+ client images and upload new high-resolution assets directly to Cloudinary.
          </p>
        </div>

        <Button
          onClick={() => setShowUploader(!showUploader)}
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-bold text-xs uppercase tracking-wider h-11 px-5 flex items-center gap-2 shadow-sm"
        >
          <Upload className="w-4 h-4" />
          <span>Upload to Cloudinary</span>
        </Button>
      </div>

      {/* Cloudinary Uploader Dropzone Drawer */}
      {showUploader && (
        <div className="p-6 bg-card rounded-3xl border-2 border-dashed border-primary/40 shadow-md space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-secondary font-bold text-sm">
              <Cloud className="w-4 h-4 text-primary" />
              <span>Cloudinary Fast Uploader</span>
            </div>
            <button
              onClick={() => setShowUploader(false)}
              className="text-xs text-muted-foreground hover:text-secondary"
            >
              Close
            </button>
          </div>
          <CloudinaryUploadWidget
            label="Select image file to upload directly to Cloudinary (folder: discc/media)"
            folder="discc/media"
            onSuccess={handleNewUpload}
          />
        </div>
      )}

      {/* Search and Filter Controls */}
      <div className="flex flex-col sm:flex-row items-center gap-4 bg-card p-4 rounded-2xl border border-border shadow-xs">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-muted-foreground absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search media files by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-10 pr-4 rounded-xl border border-border text-sm outline-none focus:border-primary"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Filter className="w-4 h-4 text-muted-foreground hidden sm:inline" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="h-11 px-4 rounded-xl border border-border text-xs font-semibold text-secondary outline-none focus:border-primary bg-card w-full sm:w-auto"
          >
            <option value="all">All File Types</option>
            <option value="image">Images Only</option>
            <option value="pdf">Documents & PDFs</option>
          </select>
        </div>
      </div>

      {/* Media Gallery Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredMedia.slice(0, visibleCount).map((item) => {
          const isImage = item.mime_type ? item.mime_type.startsWith("image") : true;
          const displayUrl = item.cloudinaryUrl || item.fullUrl || `https://disccindia.org/storage/${item.url}`;

          return (
            <div
              key={item.id}
              className="bg-card rounded-2xl border border-border overflow-hidden shadow-xs hover:shadow-md transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-square bg-muted/40 w-full overflow-hidden flex items-center justify-center">
                {isImage && displayUrl ? (
                  <Image
                    src={displayUrl}
                    alt={item.name || "Media"}
                    fill
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    unoptimized
                  />
                ) : (
                  <FileText className="w-8 h-8 text-muted-foreground/60" />
                )}

                {item.cloudinaryUrl && (
                  <span className="absolute top-2 left-2 bg-emerald-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded shadow-xs">
                    Cloudinary
                  </span>
                )}
              </div>

              <div className="p-3 space-y-2">
                <p className="font-bold text-xs text-secondary truncate" title={item.name}>
                  {item.name || `Asset #${item.id}`}
                </p>
                <div className="flex items-center justify-between gap-1 pt-1 border-t border-border/60 text-[10px]">
                  <button
                    onClick={() => handleCopy(item.id, displayUrl)}
                    className="inline-flex items-center gap-1 text-primary hover:text-secondary font-bold transition-colors"
                    title="Copy URL to clipboard"
                  >
                    {copiedId === item.id ? (
                      <>
                        <Check className="w-3 h-3 text-emerald-600" />
                        <span className="text-emerald-600">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3 h-3" />
                        <span>Copy URL</span>
                      </>
                    )}
                  </button>

                  <a
                    href={displayUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-muted-foreground hover:text-secondary p-1"
                    title="Open full size"
                  >
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredMedia.length > visibleCount && (
        <div className="text-center py-6">
          <Button
            onClick={() => setVisibleCount((prev) => prev + 36)}
            variant="outline"
            className="rounded-full px-6 py-2 border-primary text-primary font-bold text-xs hover:bg-primary hover:text-white transition-all shadow-xs"
          >
            Load More Assets ({visibleCount} of {filteredMedia.length} displayed)
          </Button>
        </div>
      )}
    </div>
  );
}
