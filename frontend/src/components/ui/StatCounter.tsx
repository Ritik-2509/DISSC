"use client";

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

interface StatCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  sublabel?: string;
  className?: string;
}

export function StatCounter({
  value,
  suffix = "",
  prefix = "",
  label,
  sublabel,
  className = "",
}: StatCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 30,
    stiffness: 80,
  });
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, value, motionValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      if (ref.current) {
        ref.current.textContent = `${prefix}${Math.floor(latest).toLocaleString()}${suffix}`;
      }
    });
  }, [springValue, prefix, suffix]);

  return (
    <div className={`flex flex-col items-center text-center p-6 rounded-3xl bg-white/80 backdrop-blur-xs border border-border/60 shadow-soft transition-all duration-300 hover:shadow-soft-lg hover:-translate-y-1 ${className}`}>
      <span
        ref={ref}
        className="text-4xl sm:text-5xl font-extrabold font-heading text-primary tracking-tight"
      >
        {prefix}0{suffix}
      </span>
      <span className="mt-2 text-base font-bold text-foreground">
        {label}
      </span>
      {sublabel && (
        <span className="mt-1 text-xs text-muted-text max-w-[24ch]">
          {sublabel}
        </span>
      )}
    </div>
  );
}
