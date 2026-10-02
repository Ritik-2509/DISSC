"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
}

// Single rolling digit column with repeating numbers for authentic mechanical odometer roll
function DigitColumn({ digit, delay }: { digit: number; delay: number }) {
  // 3 cycles of 0-9 so it visibly rolls through numbers before locking
  const numbers = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9
  ];

  // Target index in the second cycle
  const targetIndex = 10 + digit;
  const singleDigitHeightPct = 100 / numbers.length;
  const targetTranslateY = -(targetIndex * singleDigitHeightPct);

  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-top leading-none">
      <motion.span
        initial={{ y: "0%" }}
        animate={{ y: `${targetTranslateY}%` }}
        transition={{
          duration: 2.2,
          delay,
          ease: [0.16, 1, 0.3, 1], // Smooth deceleration curve
        }}
        className="flex flex-col select-none"
      >
        {numbers.map((num, i) => (
          <span
            key={i}
            className="flex items-center justify-center h-[1.15em] leading-none"
          >
            {num}
          </span>
        ))}
      </motion.span>
    </span>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Format number string with Indian grouping if needed, but preserve characters
  const formattedString = value.toLocaleString("en-IN");
  const characters = formattedString.split("");

  return (
    <span ref={ref} className={`inline-flex items-center leading-none ${className}`}>
      {prefix && <span className="mr-0.5 select-none">{prefix}</span>}

      {isInView ? (
        characters.map((char, index) => {
          const digit = parseInt(char, 10);
          if (isNaN(digit)) {
            // Static punctuation like commas or dots
            return (
              <span key={index} className="select-none mx-0.5 opacity-80">
                {char}
              </span>
            );
          }
          // Rolling digit
          return (
            <DigitColumn
              key={index}
              digit={digit}
              delay={0.15 + index * 0.08}
            />
          );
        })
      ) : (
        <span>0</span>
      )}

      {suffix && <span className="ml-0.5 select-none">{suffix}</span>}
    </span>
  );
}
