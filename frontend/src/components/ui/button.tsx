"use client";

import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-all duration-200 outline-none select-none disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] cursor-pointer",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-white shadow-md hover:bg-[#0D7A7C] hover:shadow-lg shadow-primary/20",
        donate:
          "bg-[#F5A524] text-[#1E2A3A] font-bold shadow-md hover:bg-[#E09314] hover:shadow-lg shadow-[#F5A524]/20 transition-all",
        secondary:
          "bg-[#E8F4FB] text-[#0F8B8D] hover:bg-[#D8EEFA]",
        outline:
          "border-2 border-primary text-primary bg-transparent hover:bg-primary hover:text-white",
        outlineWhite:
          "border-2 border-white/80 text-white bg-transparent hover:bg-white hover:text-foreground backdrop-blur-sm",
        ghost:
          "text-foreground hover:bg-black/5 hover:text-primary",
        ghostWhite:
          "text-white hover:bg-white/10",
        destructive:
          "bg-red-600 text-white hover:bg-red-700",
      },
      size: {
        default: "h-11 px-6 py-2.5",
        sm: "h-9 px-4 text-xs",
        lg: "h-13 px-8 text-base",
        icon: "h-11 w-11 p-0 rounded-full",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
