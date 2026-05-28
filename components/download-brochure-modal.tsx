"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { submitBrochureDownload } from "@/app/actions/public-actions";
import { FileDown, LoaderCircle, CheckCircle2 } from "lucide-react";

interface DownloadBrochureButtonProps {
  brochureUrl: string;
  brochureTitle: string;
}

export function DownloadBrochureButton({ brochureUrl, brochureTitle }: DownloadBrochureButtonProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = async () => {
    if (!name.trim() || !phone.trim() || !email.trim()) {
      return;
    }

    setSubmitting(true);
    try {
      await submitBrochureDownload({
        name: name.trim(),
        phone: phone.trim(),
        email: email.trim(),
        interest: interest.trim() || undefined,
        address: address.trim() || undefined,
      });

      setSubmitted(true);

      if (brochureUrl) {
        try {
          const filename = brochureTitle ? `${brochureTitle}.pdf` : "Structro_Brochure.pdf";
          // Route through our proxy — avoids CORS, 401, and popup blockers
          const proxyUrl = `/api/download-brochure?url=${encodeURIComponent(brochureUrl)}&filename=${encodeURIComponent(filename)}`;

          const response = await fetch(proxyUrl);
          if (!response.ok) throw new Error(`Proxy error: ${response.status}`);
          const blob = await response.blob();

          // Create a local blob URL and trigger the download
          const blobUrl = window.URL.createObjectURL(blob);
          const link = document.createElement("a");
          link.href = blobUrl;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          setTimeout(() => window.URL.revokeObjectURL(blobUrl), 1000);
        } catch (error) {
          console.error("Auto-download failed, falling back to direct link:", error);
          // Last-resort fallback: direct Cloudinary link
          window.location.assign(brochureUrl);
        }
      }
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleClose = () => {
    setOpen(false);
    setTimeout(() => {
      setName("");
      setPhone("");
      setEmail("");
      setInterest("");
      setAddress("");
      setSubmitted(false);
    }, 200);
  };

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) handleClose(); else setOpen(true) }}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 text-gray-400 text-sm hover:text-primary transition-colors">
          <FileDown size={16} className="text-accent" />
          Download Brochure
        </button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-neutral-900 text-white border-neutral-800">
        {submitted ? (
          <>
            <DialogHeader>
              <div className="flex flex-col items-center gap-3 py-6">
                <CheckCircle2 className="size-12 text-green-400" />
                <DialogTitle className="text-lg text-center">Thank You!</DialogTitle>
                <p className="text-sm text-neutral-400 text-center">
                  Your request has been submitted successfully.
                </p>
                {brochureUrl && (
                  <div className="flex flex-col items-center gap-3 mt-2">
                    <p className="text-sm text-neutral-500 text-center">
                      The brochure should open automatically. If it was blocked, click below:
                    </p>
                    <a
                      href={`/api/download-brochure?url=${encodeURIComponent(brochureUrl)}&filename=${encodeURIComponent(brochureTitle ? `${brochureTitle}.pdf` : "Structro_Brochure.pdf")}`}
                      download={brochureTitle ? `${brochureTitle}.pdf` : "Structro_Brochure.pdf"}
                      className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90 rounded-md text-sm font-medium transition-colors"
                    >
                      <FileDown size={16} />
                      Download Manually
                    </a>
                  </div>
                )}
              </div>
            </DialogHeader>
            <div className="flex justify-center pb-4">
              <Button onClick={handleClose}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle className="text-lg">Download Brochure</DialogTitle>
              <p className="text-sm text-neutral-400 mt-1">
                Fill in your details to download {brochureTitle || "our brochure"}.
              </p>
            </DialogHeader>
            <div className="grid gap-4 py-2">
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Name <span className="text-red-400">*</span>
                </label>
                <Input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className="bg-neutral-800 border-neutral-700"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Phone <span className="text-red-400">*</span>
                </label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Your phone number"
                  className="bg-neutral-800 border-neutral-700"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">
                  Email <span className="text-red-400">*</span>
                </label>
                <Input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email address"
                  className="bg-neutral-800 border-neutral-700"
                  type="email"
                  required
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Interest (optional)</label>
                <Input
                  value={interest}
                  onChange={(e) => setInterest(e.target.value)}
                  placeholder="What are you interested in?"
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium">Address (optional)</label>
                <Textarea
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Your address"
                  rows={2}
                  className="bg-neutral-800 border-neutral-700"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <Button variant="outline" onClick={handleClose} className="bg-transparent">
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={submitting || !name.trim() || !phone.trim() || !email.trim()}
              >
                {submitting ? (
                  <>
                    <LoaderCircle className="mr-2 size-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <FileDown className="mr-2 size-4" />
                    Download
                  </>
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
