"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { AlertOctagon, RotateCcw, Home, PhoneCall, ChevronDown, ChevronUp } from "lucide-react";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    console.error("Structro Application Runtime Exception:", error);
  }, [error]);

  return (
    <div className="relative min-h-[85vh] bg-[#070C14] text-white flex flex-col justify-center overflow-hidden py-16 md:py-24">
      {/* Background Architectural Grid & Glow Effects */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_center,rgba(220,38,38,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff08_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:32px_32px] opacity-25" />
      
      <div className="absolute top-10 right-10 w-80 h-80 bg-red-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-primary/10 rounded-full blur-3xl pointer-events-none" />

      <Container className="relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Warning Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-md mb-8">
            <AlertOctagon className="w-4 h-4 text-red-400 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
              System Anomaly • Execution Failed
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white uppercase tracking-tight mb-4">
            Structural System Interruption
          </h1>
          <p className="text-gray-400 text-sm sm:text-base md:text-lg max-w-xl mx-auto leading-relaxed mb-8">
            An unexpected error interrupted the page generation. Our engineering telemetry has logged this event. You can attempt to rebuild the view or return to the main dashboard.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
            <Button
              onClick={() => reset()}
              variant="saffron"
              size="lg"
              className="gap-2 shadow-lg shadow-primary/20 cursor-pointer"
            >
              <RotateCcw size={18} />
              Re-attempt Connection
            </Button>

            <Link href="/">
              <Button
                variant="outline"
                size="lg"
                className="border-white/20 text-white bg-transparent hover:bg-white/10 hover:text-white gap-2 cursor-pointer"
              >
                <Home size={18} />
                Return to Homepage
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="border-red-500/30 text-red-400 bg-red-500/5 hover:bg-red-500/15 gap-2 cursor-pointer"
              >
                <PhoneCall size={18} />
                Report to Helpdesk
              </Button>
            </Link>
          </div>

          {/* Technical Diagnostics Collapsible */}
          <div className="max-w-2xl mx-auto mt-6">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="inline-flex items-center gap-2 text-xs font-mono text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-wider mb-3 cursor-pointer"
            >
              {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
              {showDetails ? "Hide Technical Details" : "View Technical Diagnostics"}
            </button>

            {showDetails && (
              <div className="p-4 rounded-xl bg-black/60 border border-white/10 text-left font-mono text-xs text-red-300/90 overflow-x-auto space-y-2">
                <div>
                  <span className="text-gray-500">DIGEST: </span>
                  <span className="text-white">{error.digest || "N/A (Local Dev / Client Error)"}</span>
                </div>
                <div>
                  <span className="text-gray-500">MESSAGE: </span>
                  <span>{error.message || "An unspecified application exception occurred."}</span>
                </div>
                {error.stack && (
                  <pre className="mt-2 text-[11px] text-gray-400 whitespace-pre-wrap leading-tight max-h-48 overflow-y-auto">
                    {error.stack}
                  </pre>
                )}
              </div>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
