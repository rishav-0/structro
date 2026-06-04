"use client";

import { useState, useRef } from "react";
import { LoaderCircle, Trash2, ImagePlus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface GalleryImage {
  url: string;
  alt?: string;
  publicId?: string;
}

interface AdminGalleryUploadProps {
  value: GalleryImage[];
  onChange: (value: GalleryImage[]) => void;
  folder: string;
  disabled?: boolean;
}

interface UploadResponse {
  secureUrl?: string;
  publicId?: string;
  error?: string;
}

export function AdminGalleryUpload({
  value,
  onChange,
  folder,
  disabled = false,
}: AdminGalleryUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;

    setUploading(true);
    setError(null);

    const uploaded: GalleryImage[] = [];

    for (const file of Array.from(files)) {
      if (!file.type.startsWith("image/")) continue;

      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("folder", folder);

        const response = await fetch("/api/admin/uploads", {
          method: "POST",
          body: formData,
        });
        const data = (await response.json()) as UploadResponse;

        if (!response.ok || !data.secureUrl) {
          throw new Error(data.error || "Image upload failed.");
        }

        uploaded.push({
          url: data.secureUrl,
          publicId: data.publicId,
          alt: "",
        });
      } catch (uploadError) {
        setError(
          uploadError instanceof Error
            ? uploadError.message
            : "Image upload failed."
        );
      }
    }

    onChange([...value, ...uploaded]);

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    setUploading(false);
  };

  const removeImage = (index: number) => {
    onChange(value.filter((_, i) => i !== index));
  };

  const updateAlt = (index: number, alt: string) => {
    const updated = [...value];
    updated[index] = { ...updated[index], alt };
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-sm font-medium">Additional Images</label>
        <div>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={(e) => handleFiles(e.target.files)}
            disabled={disabled || uploading}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-transparent"
            disabled={disabled || uploading}
            onClick={() => fileInputRef.current?.click()}
          >
            {uploading ? (
              <LoaderCircle className="mr-2 size-4 animate-spin" />
            ) : (
              <ImagePlus className="mr-2 size-4" />
            )}
            {uploading ? "Uploading..." : "Upload Images"}
          </Button>
        </div>
      </div>

      {error ? (
        <p className="text-xs text-red-400">{error}</p>
      ) : null}

      {value.length === 0 ? (
        <p className="py-2 text-xs text-neutral-500">
          No additional images yet. Upload multiple images or paste URLs below.
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
          {value.map((item, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-lg border border-white/10 bg-neutral-950"
            >
              <div className="relative aspect-4/3 overflow-hidden">
                <img
                  src={item.url}
                  alt={item.alt || ""}
                  className="h-full w-full object-cover"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => removeImage(index)}
                  className="absolute right-1 top-1 size-7 bg-black/60 text-red-400 opacity-0 transition-opacity hover:bg-black/80 group-hover:opacity-100"
                >
                  <Trash2 className="size-4" />
                </Button>
              </div>
              <div className="p-2">
                <Input
                  value={item.alt || ""}
                  onChange={(e) => updateAlt(index, e.target.value)}
                  placeholder="Alt text (optional)"
                  className="h-7 border-neutral-700 bg-neutral-800 px-2 text-xs"
                  disabled={disabled}
                />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
