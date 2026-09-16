"use client";

import React, { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

export interface CardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children?: React.ReactNode;
  interactive?: boolean;
  glow?: "none" | "primary" | "accent";
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      children,
      className,
      interactive = false,
      glow = "none",
      onClick,
      ...props
    },
    ref
  ) => {
    const glowStyles = {
      none: "",
      primary: "border-[#7C5CFF]/30 shadow-lg shadow-[#7C5CFF]/10",
      accent: "border-[#35E6B5]/30 shadow-lg shadow-[#35E6B5]/10",
    };

    return (
      <motion.div
        ref={ref}
        whileHover={interactive ? { y: -2, transition: { duration: 0.2 } } : undefined}
        whileTap={interactive && onClick ? { scale: 0.98 } : undefined}
        onClick={onClick}
        className={cn(
          "bg-[#181818] border border-white/[0.08] rounded-[24px] p-5 text-white transition-colors duration-200",
          interactive && "cursor-pointer hover:border-white/[0.16] hover:bg-[#1C1C1C]",
          glowStyles[glow],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export const CardHeader = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("flex flex-col gap-1 mb-3", className)} {...props} />
);

export const CardTitle = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) => (
  <h3 className={cn("text-lg font-semibold text-white tracking-tight", className)} {...props} />
);

export const CardDescription = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) => (
  <p className={cn("text-xs text-[#9CA3AF] leading-relaxed", className)} {...props} />
);

export const CardContent = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("relative", className)} {...props} />
);

export const CardFooter = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn("mt-4 pt-3 border-t border-white/[0.06] flex items-center justify-between", className)} {...props} />
);
