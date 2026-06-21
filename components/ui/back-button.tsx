"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";

interface BackButtonProps {
  fallbackUrl?: string;
  className?: string;
  text?: string;
}

export function BackButton({ fallbackUrl, className, text = "Back" }: BackButtonProps) {
  const router = useRouter();

  const handleBack = () => {
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else if (fallbackUrl) {
      router.push(fallbackUrl);
    } else {
      router.push("/");
    }
  };

  return (
    <button
      onClick={handleBack}
      className={`group inline-flex items-center gap-2 text-primary font-bold text-xs uppercase tracking-[0.2em] mb-8 hover:-translate-x-1 transition-transform duration-300 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 group-hover:text-primary/70 transition-colors" />
      {text}
    </button>
  );
}
