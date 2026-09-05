"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";

const API_URL = "/api";

export default function AdminGallery() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_URL}/gallery`)
      .then(res => res.json())
      .then(data => {
        setImages(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Error fetching gallery:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Manage Gallery</h1>
          <p className="text-muted-foreground">Upload and organize photos.</p>
        </div>
        <Button>Upload Image</Button>
      </div>

      {loading ? (
        <div className="p-8 text-center text-muted-foreground">Loading...</div>
      ) : images.length === 0 ? (
        <div className="p-8 text-center text-muted-foreground border rounded-xl bg-card">No images in gallery.</div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img: any) => (
            <div key={img.id} className="group relative aspect-square rounded-xl overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.imageUrl} alt={img.caption || "Gallery image"} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <Button variant="secondary" size="sm">Edit</Button>
                <Button variant="destructive" size="sm">Delete</Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
