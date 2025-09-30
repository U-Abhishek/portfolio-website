"use client";
import React from "react";
import { Spotlight } from "@/components/ui/spotlight-new";

export const FixedSpotlightBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full bg-black/[0.96] antialiased bg-grid-white/[0.02] pointer-events-none z-0">
      <Spotlight />
    </div>
  );
};
