"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ReactNode, useRef } from "react";
import { fadeUp, fadeIn, scaleIn, staggerContainer } from "@/lib/motion";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
}

export function Reveal({
  children,
  delay = 0,
  className = "",
  direction = "up",
}: RevealProps) {
  const shouldReduceMotion = useReducedMotion();

  const getInitial = () => {
    if (shouldReduceMotion) return { opacity: 1, x: 0, y: 0 };
    switch (direction) {
      case "up":
        return { opacity: 0, y: 30 };
      case "down":
        return { opacity: 0, y: -30 };
      case "left":
        return { opacity: 0, x: -30 };
      case "right":
        return { opacity: 0, x: 30 };
      case "none":
        return { opacity: 0 };
      default:
        return { opacity: 0, y: 30 };
    }
  };

  return (
    <motion.div
      className={className}
      initial={getInitial()}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function Stagger({
  children,
  className = "",
  delay = 0.1,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: 0.12,
            delayChildren: delay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={shouldReduceMotion ? {} : fadeUp}
    >
      {children}
    </motion.div>
  );
}

export function Parallax({
  children,
  offset = 40,
  className = "",
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div ref={ref} style={{ y }} className={className}>
      {children}
    </motion.div>
  );
}

export function RevealStagger({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <Reveal delay={delay} className={className}>
      {children}
    </Reveal>
  );
}
