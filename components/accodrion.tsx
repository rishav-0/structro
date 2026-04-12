"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

const images = [
  {
    src: "https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg",
    alt: "Building One",
    label: "Urban Steel",
  },
  {
    src: "https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg",
    alt: "Building Two",
    label: "City Heights",
  },
  {
    src: "https://img.freepik.com/free-photo/observation-urban-building-business-steel_1127-2397.jpg",
    alt: "Building Three",
    label: "Glass Tower",
  },
];

export default function AccordionCarousel() {
  const [active, setActive] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-advance every 3.5 seconds
  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % images.length);
    }, 3500);
    return () => clearInterval(timer);
  }, [isAutoPlaying]);

  return (
    <div
      className="flex gap-3 h-96 w-full mb-10"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      {images.map((img, i) => {
        const isActive = i === active;

        return (
          <div
            key={i}
            onClick={() => setActive(i)}
            className="relative overflow-hidden rounded-2xl cursor-pointer group"
            style={{
              flex: isActive ? "7 0 0%" : "1.5 0 0%",
              transition: "flex 0.7s cubic-bezier(0.76, 0, 0.24, 1)",
            }}
          >
            {/* Image */}
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover"
              style={{
                transition: "transform 0.7s cubic-bezier(0.76, 0, 0.24, 1), filter 0.5s ease",
                transform: isActive ? "scale(1.03)" : "scale(1.08)",
                filter: isActive ? "brightness(0.85)" : "brightness(0.5) saturate(0.6)",
              }}
              sizes="(max-width: 768px) 100vw, 70vw"
              priority={i === 0}
            />

            {/* Gradient overlay at bottom */}
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"
              style={{
                opacity: isActive ? 1 : 0,
                transition: "opacity 0.5s ease 0.1s",
              }}
            />

            {/* Label — only visible when active */}
            <div
              className="absolute bottom-5 left-5 right-5"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0px)" : "translateY(12px)",
                transition: "opacity 0.45s ease 0.2s, transform 0.45s ease 0.2s",
                pointerEvents: "none",
              }}
            >
              <h3 className="text-white text-2xl font-bold tracking-tight leading-tight">
                {img.label}
              </h3>
            </div>

            {/* Collapsed state — vertical label */}
            <div
              className="absolute inset-0 flex items-center justify-center"
              style={{
                opacity: isActive ? 0 : 1,
                transition: "opacity 0.3s ease",
              }}
            >
              <span
                className="text-white/70 text-xs tracking-[0.25em] uppercase font-semibold"
                style={{
                  writingMode: "vertical-rl",
                  textOrientation: "mixed",
                  transform: "rotate(180deg)",
                }}
              >
                {img.label}
              </span>
            </div>

            {/* Active indicator dot */}
            <div
              className="absolute top-4 right-4 w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(var(--primary),0.5)]"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "scale(1)" : "scale(0)",
                transition: "opacity 0.3s ease 0.3s, transform 0.3s ease 0.3s",
              }}
            />
          </div>
        );
      })}
    </div>
  );
}