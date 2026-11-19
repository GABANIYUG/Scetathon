"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-[#080B12] text-white min-h-screen flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full p-8 rounded-2xl bg-white/[0.03] border border-white/10 text-center space-y-5 backdrop-blur-xl">
          <div className="w-12 h-12 rounded-full bg-red-500/20 text-red-400 flex items-center justify-center mx-auto text-xl font-bold">
            !
          </div>
          <div className="space-y-1">
            <h1 className="text-xl font-bold">Critical Application Interruption</h1>
            <p className="text-xs text-white/60">
              The platform encountered a root-level initialization error.
            </p>
          </div>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => reset()}
              className="px-4 py-2 rounded-xl text-xs font-semibold bg-white text-black hover:bg-white/90 transition-colors cursor-pointer"
            >
              Reload Platform
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}

