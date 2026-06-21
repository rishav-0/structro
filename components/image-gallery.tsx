"use client";

import { useState, useEffect, type ReactNode } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  url: string;
  alt?: string;
}

interface ImageGalleryProps {
  mainImage: string;
  mainAlt: string;
  mainImageAlt?: string;
  images?: GalleryImage[];
  priority?: boolean;
  containerClassName?: string;
  bottomOverlay?: ReactNode;
}

export function ImageGallery({
  mainImage,
  mainAlt,
  mainImageAlt,
  images = [],
  priority = false,
  containerClassName = "relative aspect-4/3 overflow-hidden bg-gray-100",
  bottomOverlay,
}: ImageGalleryProps) {
  const allImages = [
    { url: mainImage, alt: mainImageAlt || mainAlt },
    ...images.filter((img) => img.url !== mainImage),
  ];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const selected = allImages[selectedIndex];

  useEffect(() => {
    if (allImages.length <= 1 || isPaused) return;

    const timer = setInterval(() => {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % allImages.length);
    }, 2500);

    return () => clearInterval(timer);
  }, [allImages.length, isPaused]);

  if (allImages.length <= 1) {
    return (
      <div>
        {mainImageAlt && (
          <div className="mb-2 min-h-[1.5rem] text-center text-sm text-gray-500 font-medium tracking-wide">
            {mainImageAlt}
          </div>
        )}
        <div className={containerClassName}>
          <Image
            src={mainImage}
            alt={mainImageAlt || mainAlt}
            fill
            className="object-contain"
            priority={priority}
          />
          {bottomOverlay}
        </div>
      </div>
    );
  }

  const currentAlt = selectedIndex === 0 ? mainImageAlt : selected.alt;

  return (
    <div>
      <div className="mb-2 min-h-[1.5rem] text-center text-sm text-gray-500 font-medium tracking-wide">
        {currentAlt ? currentAlt : "\u00A0"}
      </div>
      <div 
        className={`${containerClassName} group`}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <Image
          src={selected.url}
          alt={selected.alt || mainAlt}
          fill
          className="object-contain transition-opacity duration-350"
          priority={priority}
        />
        {bottomOverlay}

        {/* Navigation Arrows */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIndex((prevIndex) => (prevIndex - 1 + allImages.length) % allImages.length);
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          type="button"
          aria-label="Previous image"
        >
          <ChevronLeft className="size-5" />
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation();
            setSelectedIndex((prevIndex) => (prevIndex + 1) % allImages.length);
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center justify-center size-10 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          type="button"
          aria-label="Next image"
        >
          <ChevronRight className="size-5" />
        </button>
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
