"use client";

import { ReactNode } from "react";

interface MarqueeProps {
  children: ReactNode;
  pauseOnHover?: boolean;
  speed?: number; // duration in seconds
  className?: string;
}

export function Marquee({
  children,
  pauseOnHover = true,
  speed = 35,
  className = "",
}: MarqueeProps) {
  return (
    <div
      className={`relative overflow-hidden w-full flex select-none py-4 ${className}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <div
        className={`flex min-w-full shrink-0 items-center justify-around gap-10 animate-smooth-marquee ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={`flex min-w-full shrink-0 items-center justify-around gap-10 animate-smooth-marquee ${
          pauseOnHover ? "hover:[animation-play-state:paused]" : ""
        }`}
        style={{ animationDuration: `${speed}s` }}
      >
        {children}
      </div>
    </div>
  );
}
