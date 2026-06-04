"use client";

import { useState, type ReactNode } from "react";
import Image from "next/image";

interface GalleryImage {
  url: string;
  alt?: string;
}

interface ImageGalleryProps {
  mainImage: string;
  mainAlt: string;
  images?: GalleryImage[];
  priority?: boolean;
  containerClassName?: string;
  bottomOverlay?: ReactNode;
}

export function ImageGallery({
  mainImage,
  mainAlt,
  images = [],
  priority = false,
  containerClassName = "relative aspect-4/3 overflow-hidden bg-gray-100",
  bottomOverlay,
}: ImageGalleryProps) {
  const allImages = [
    { url: mainImage, alt: mainAlt },
    ...images.filter((img) => img.url !== mainImage),
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selected = allImages[selectedIndex];

  if (allImages.length <= 1) {
    return (
      <div className={containerClassName}>
        <Image
          src={mainImage}
          alt={mainAlt}
          fill
          className="object-contain"
          priority={priority}
        />
        {bottomOverlay}
      </div>
    );
  }

  return (
    <div>
      <div className={containerClassName}>
        <Image
          src={selected.url}
          alt={selected.alt || mainAlt}
          fill
          className="object-contain transition-opacity duration-300"
          priority={priority}
        />
        {bottomOverlay}
      </div>

      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
        {allImages.map((img, index) => (
          <button
            key={index}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className={`relative size-16 shrink-0 overflow-hidden rounded-lg border-2 transition-all duration-200 ${
              index === selectedIndex
                ? "border-red-600 ring-1 ring-red-600"
                : "border-gray-200 opacity-70 hover:opacity-100"
            }`}
          >
            <Image
              src={img.url}
              alt={img.alt || mainAlt}
              fill
              className="object-cover"
              sizes="64px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
