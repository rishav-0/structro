"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link as LinkIcon, Check, Share2, Facebook, Twitter, Linkedin } from "lucide-react";
import { toast } from "sonner"; // Assuming sonner is used, if not I'll check

export function ShareButtons({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [isShareSupported, setIsShareSupported] = useState(false);

  useEffect(() => {
    if (typeof navigator !== "undefined" && !!navigator.share) {
      setIsShareSupported(true);
    }
  }, []);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      // If sonner or other toast is available, use it.
      // For now I'll just use state for visual feedback.
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shareData = {
    title: title,
    url: typeof window !== "undefined" ? window.location.href : "",
  };

  const handleNativeShare = async () => {
    if (isShareSupported) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing", err);
      }
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleCopyLink}
        className="flex items-center gap-2 rounded-full border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all"
      >
        {copied ? (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-xs font-bold">Copied</span>
          </>
        ) : (
          <>
            <LinkIcon className="h-4 w-4" />
            <span className="text-xs font-bold uppercase tracking-wider">Copy Link</span>
          </>
        )}
      </Button>

      {/* Native Share for Mobile */}
      {isShareSupported && (
        <Button 
          variant="outline" 
          size="sm" 
          onClick={handleNativeShare}
          className="flex items-center gap-2 rounded-full border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all md:hidden"
        >
          <Share2 className="h-4 w-4" />
          <span className="text-xs font-bold uppercase tracking-wider">Share</span>
        </Button>
      )}

      {/* Social Icons for Desktop */}
      <div className="hidden md:flex items-center gap-2">
        <a 
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareData.url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-600 transition-all border border-transparent hover:border-blue-100"
          title="Share on Facebook"
        >
          <Facebook className="h-4 w-4" />
        </a>
        <a 
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareData.url)}&text=${encodeURIComponent(title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-50 hover:bg-sky-50 text-gray-400 hover:text-sky-500 transition-all border border-transparent hover:border-sky-100"
          title="Share on Twitter"
        >
          <Twitter className="h-4 w-4" />
        </a>
        <a 
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareData.url)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-full bg-gray-50 hover:bg-blue-50 text-gray-400 hover:text-blue-700 transition-all border border-transparent hover:border-blue-100"
          title="Share on LinkedIn"
        >
          <Linkedin className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
