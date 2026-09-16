"use client";

import React from "react";
import { motion, HTMLMotionProps } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ChipProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "default" | "primary" | "accent" | "outline";
  active?: boolean;
  icon?: React.ReactNode;
  onRemove?: () => void;
  size?: "sm" | "md";
}

export const Chip: React.FC<ChipProps> = ({
  children,
  variant = "default",
  active = false,
  icon,
  onRemove,
  size = "md",
  className,
  onClick,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-200 select-none rounded-full border";

  const sizes = {
    sm: "h-7 px-3 text-xs gap-1.5",
    md: "h-9 px-4 text-sm gap-2",
  };

  const getVariantStyles = () => {
    if (active) {
      switch (variant) {
        case "accent":
          return "bg-[#35E6B5] text-[#050505] border-[#35E6B5] shadow-md shadow-[#35E6B5]/20 font-semibold";
        case "primary":
        default:
          return "bg-[#7C5CFF] text-white border-[#7C5CFF] shadow-md shadow-[#7C5CFF]/20";
      }
    }

    switch (variant) {
      case "primary":
        return "bg-[#7C5CFF]/10 text-[#7C5CFF] border-[#7C5CFF]/30 hover:bg-[#7C5CFF]/20";
      case "accent":
        return "bg-[#35E6B5]/10 text-[#35E6B5] border-[#35E6B5]/30 hover:bg-[#35E6B5]/20";
      case "outline":
        return "bg-transparent text-white border-white/[0.12] hover:bg-white/[0.05]";
      case "default":
      default:
        return "bg-[#111111] text-[#9CA3AF] border-white/[0.08] hover:text-white hover:border-white/[0.15] hover:bg-[#181818]";
    }
  };

  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={onClick}
      className={cn(baseStyles, sizes[size], getVariantStyles(), className)}
      {...props}
    >
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {onRemove && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-0.5 p-0.5 rounded-full hover:bg-black/20 transition-colors"
          role="button"
          aria-label="Remove chip"
        >
          <X className="w-3 h-3" />
        </span>
      )}
    </motion.button>
  );
};
