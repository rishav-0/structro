"use client";

import { useState, type ChangeEvent } from "react";
import { LoaderCircle, Upload } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface AdminImageUploadFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  folder: string;
  placeholder?: string;
  description?: string;
  disabled?: boolean;
  showPreview?: boolean;
}

interface UploadResponse {
  secureUrl?: string;
  error?: string;
}

export function AdminImageUploadField({
  label,
  value,
  onChange,
  folder,
  placeholder = "https://...",
  description = "Upload to Cloudinary or paste an existing URL.",
  disabled = false,
  showPreview = true,
}: AdminImageUploadFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    setUploading(true);
    setError(null);

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

      onChange(data.secureUrl);
    } catch (uploadError) {
      setError(
        uploadError instanceof Error
          ? uploadError.message
          : "Image upload failed."
      );
    } finally {
      setUploading(false);
      event.target.value = "";
    }
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between gap-3">
        <label className="text-sm font-medium">{label}</label>
        <label>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
            disabled={disabled || uploading}
          />
          <Button
            type="button"
            variant="outline"
            size="sm"
            className="bg-transparent"
            disabled={disabled || uploading}
            asChild
          >
            <span>
              {uploading ? (
                <LoaderCircle className="mr-2 size-4 animate-spin" />
              ) : (
                <Upload className="mr-2 size-4" />
              )}
              {uploading ? "Uploading..." : "Upload"}
            </span>
          </Button>
        </label>
      </div>
      <Input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="bg-neutral-800 border-neutral-700"
        disabled={disabled || uploading}
      />
      <p className="text-xs text-neutral-500">{description}</p>
      {error ? <p className="text-xs text-red-400">{error}</p> : null}
      {showPreview && value ? (
        <div className="overflow-hidden rounded-lg border border-white/10 bg-neutral-950">
          <img
            key={value}
            src={value}
            alt={label}
            className="h-40 w-full object-cover"
            onError={(event) => {
              event.currentTarget.style.display = "none";
            }}
          />
        </div>
      ) : null}
    </div>
  );
}