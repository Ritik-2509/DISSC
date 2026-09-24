"use client";

import { ReactNode } from "react";
import { Reveal } from "@/components/ui/reveal";

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center" | "right";
  className?: string;
  light?: boolean;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className = "",
  light = false,
}: SectionHeadingProps) {
  const alignClass =
    align === "center"
      ? "text-center mx-auto items-center"
      : align === "right"
      ? "text-right ml-auto items-end"
      : "text-left items-start";

  return (
    <div className={`flex flex-col max-w-3xl mb-12 md:mb-16 ${alignClass} ${className}`}>
      {eyebrow && (
        <Reveal delay={0.05}>
          <span className="inline-block px-3.5 py-1 mb-3 text-xs font-semibold tracking-wider uppercase rounded-full bg-primary/10 text-primary border border-primary/20">
            {eyebrow}
          </span>
        </Reveal>
      )}

      <Reveal delay={0.1}>
        <h2
          className={`text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight font-heading leading-tight ${
            light ? "text-white" : "text-foreground"
          }`}
        >
          {title}
        </h2>
      </Reveal>

      {description && (
        <Reveal delay={0.15}>
          <p
            className={`mt-4 text-base sm:text-lg leading-relaxed max-w-[65ch] ${
              light ? "text-white/80" : "text-muted-text"
            }`}
          >
            {description}
          </p>
        </Reveal>
      )}
    </div>
  );
}
