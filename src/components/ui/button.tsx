"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "children"> {
  children?: React.ReactNode;
  variant?: "primary" | "accent" | "secondary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isLoading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      children,
      className,
      variant = "primary",
      size = "md",
      isLoading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7C5CFF] disabled:opacity-50 disabled:pointer-events-none select-none rounded-[24px]";

    const variants = {
      primary:
        "bg-[#7C5CFF] text-white hover:bg-[#6A49FF] active:bg-[#5C3DFF] shadow-lg shadow-[#7C5CFF]/20 border border-transparent",
      accent:
        "bg-[#35E6B5] text-[#050505] font-semibold hover:bg-[#2BD2A4] active:bg-[#24B890] shadow-lg shadow-[#35E6B5]/20 border border-transparent",
      secondary:
        "bg-[#111111] text-white hover:bg-[#181818] border border-white/[0.08] active:bg-[#202020]",
      outline:
        "bg-transparent text-white border border-white/[0.08] hover:bg-[#111111] active:bg-[#181818]",
      ghost:
        "bg-transparent text-[#9CA3AF] hover:text-white hover:bg-white/[0.05] active:bg-white/[0.1]",
    };

    const sizes = {
      sm: "h-10 px-4 text-xs gap-2 rounded-full",
      md: "h-12 px-6 text-sm gap-2.5 rounded-[24px]",
      lg: "h-14 px-8 text-base gap-3 rounded-[24px]",
    };

    return (
      <motion.button
        ref={ref}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        disabled={disabled || isLoading}
        className={cn(
          baseStyles,
          variants[variant],
          sizes[size],
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 animate-spin text-current" />
        ) : (
          iconLeft && <span className="inline-flex shrink-0">{iconLeft}</span>
        )}
        {children && <span>{children}</span>}
        {!isLoading && iconRight && (
          <span className="inline-flex shrink-0">{iconRight}</span>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";
