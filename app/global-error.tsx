"use client";

import React from "react";
import "./globals.css";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#070C14] text-white min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-6 bg-white/5 border border-white/10 p-8 rounded-2xl backdrop-blur-md">
          <div className="inline-flex p-4 rounded-full bg-red-500/10 text-red-400 border border-red-500/20">
            <svg
              className="w-10 h-10"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-black uppercase tracking-tight text-white">
            System Critical Fault
          </h1>
          <p className="text-sm text-gray-400 leading-relaxed">
            The root layout failed to initialize. Please reload the application or try again.
          </p>
          <div className="flex flex-col gap-3 pt-2">
            <button
              onClick={() => reset()}
              className="w-full py-3 px-6 rounded-lg bg-[#f59e0b] hover:bg-[#d97706] text-black font-bold text-sm uppercase tracking-wider transition-all cursor-pointer shadow-lg"
            >
              Reload System
            </button>
            <a
              href="/"
              className="w-full py-3 px-6 rounded-lg border border-white/20 hover:bg-white/10 text-white font-medium text-sm transition-all text-center"
            >
              Return Home
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
