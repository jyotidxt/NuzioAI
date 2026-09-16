"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ProgressIndicatorProps {
  /** Numerical value 0 - 100 for linear mode */
  value?: number;
  /** Current step index (1-based) for segmented mode */
  currentStep?: number;
  /** Total number of steps for segmented mode */
  totalSteps?: number;
  /** Color theme */
  variant?: "primary" | "accent";
  /** Optional height class (default h-2) */
  height?: string;
  /** Show text percentage or step label */
  showLabel?: boolean;
  className?: string;
}

export const ProgressIndicator: React.FC<ProgressIndicatorProps> = ({
  value = 0,
  currentStep,
  totalSteps,
  variant = "primary",
  height = "h-2",
  showLabel = false,
  className,
}) => {
  const colorMap = {
    primary: "bg-[#7C5CFF]",
    accent: "bg-[#35E6B5]",
  };

  // Segmented mode
  if (totalSteps && totalSteps > 0) {
    const activeIndex = (currentStep ?? 1) - 1;

    return (
      <div className={cn("w-full flex flex-col gap-2", className)}>
        {showLabel && (
          <div className="flex justify-between items-center text-xs font-medium text-[#9CA3AF] px-0.5">
            <span>Progress</span>
            <span className="text-white">
              Step {currentStep ?? 1} of {totalSteps}
            </span>
          </div>
        )}
        <div className="flex items-center gap-1.5 w-full">
          {Array.from({ length: totalSteps }).map((_, index) => {
            const isCompleted = index < activeIndex;
            const isCurrent = index === activeIndex;

            return (
              <div
                key={index}
                className={cn(
                  "flex-1 relative overflow-hidden rounded-full bg-white/[0.08]",
                  height
                )}
              >
                <motion.div
                  className={cn("h-full rounded-full", colorMap[variant])}
                  initial={{ width: "0%" }}
                  animate={{
                    width: isCompleted || isCurrent ? "100%" : "0%",
                  }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  // Continuous linear mode
  const clampedValue = Math.min(100, Math.max(0, value));

  return (
    <div className={cn("w-full flex flex-col gap-1.5", className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium text-[#9CA3AF] px-0.5">
          <span>Completion</span>
          <span className="text-white font-semibold">{Math.round(clampedValue)}%</span>
        </div>
      )}
      <div
        className={cn(
          "w-full bg-white/[0.08] rounded-full overflow-hidden relative",
          height
        )}
      >
        <motion.div
          className={cn("h-full rounded-full transition-colors", colorMap[variant])}
          initial={{ width: "0%" }}
          animate={{ width: `${clampedValue}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};
