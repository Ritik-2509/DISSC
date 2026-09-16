"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { Upload, CheckCircle2, AlertCircle, Loader2, Link as LinkIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CloudinaryUploadWidgetProps {
  onSuccess: (url: string) => void;
  currentValue?: string;
  folder?: string;
  label?: string;
}

export function CloudinaryUploadWidget({
  onSuccess,
  currentValue = "",
  folder = "discc",
  label = "Upload Image via Cloudinary",
}: CloudinaryUploadWidgetProps) {
  const [preview, setPreview] = useState<string>(currentValue);
  const [uploading, setUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [urlInput, setUrlInput] = useState<string>("");
  const [showUrlInput, setShowUrlInput] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);
    setUploading(true);

    try {
      const localPreviewUrl = URL.createObjectURL(file);
      setPreview(localPreviewUrl);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/cloudinary/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.success && data.url) {
        setPreview(data.url);
        setSuccess(true);
        onSuccess(data.url);
      } else {
        setError(data.message || data.error || "Upload to Cloudinary failed.");
      }
    } catch (err: any) {
      setError(err.message || "An unexpected error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  const handleManualUrl = () => {
    if (!urlInput.trim()) return;
    setPreview(urlInput.trim());
    onSuccess(urlInput.trim());
    setSuccess(true);
    setError(null);
  };

  return (
    <div className="space-y-3">
      {label && <label className="text-xs font-semibold text-secondary block">{label}</label>}

      <div className="flex flex-col sm:flex-row items-start gap-4">
        {/* Preview Thumbnail */}
        <div className="relative w-32 h-24 rounded-xl border-2 border-dashed border-border bg-muted/30 overflow-hidden flex items-center justify-center flex-shrink-0">
          {preview ? (
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <span className="text-[10px] text-muted-foreground text-center px-2">No image selected</span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex-1 space-y-2 w-full">
          <div className="flex flex-wrap items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="h-10 px-4 rounded-xl text-xs font-bold border-secondary/20 hover:border-primary text-secondary hover:text-primary flex items-center gap-1.5"
            >
              {uploading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Uploading to Cloudinary...</span>
                </>
              ) : (
                <>
                  <Upload className="w-3.5 h-3.5" />
                  <span>Upload File</span>
                </>
              )}
            </Button>

            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowUrlInput(!showUrlInput)}
              className="h-10 px-3 rounded-xl text-xs text-muted-foreground hover:text-secondary flex items-center gap-1"
            >
              <LinkIcon className="w-3.5 h-3.5" />
              <span>Enter URL</span>
            </Button>
          </div>

          {showUrlInput && (
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                placeholder="https://res.cloudinary.com/..."
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                className="flex-1 h-9 px-3 rounded-lg border border-border text-xs outline-none focus:border-primary"
              />
              <Button
                type="button"
                size="sm"
                onClick={handleManualUrl}
                className="h-9 px-3 rounded-lg bg-secondary text-white text-xs font-semibold"
              >
                Apply
              </Button>
            </div>
          )}

          {error && (
            <div className="flex items-start gap-1.5 text-[11px] text-destructive bg-destructive/10 p-2 rounded-lg">
              <AlertCircle className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {success && (
            <div className="flex items-center gap-1.5 text-[11px] text-emerald-600 bg-emerald-50 p-2 rounded-lg">
              <CheckCircle2 className="w-3.5 h-3.5 flex-shrink-0" />
              <span>Image linked successfully!</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
