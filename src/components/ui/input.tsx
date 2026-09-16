"use client";

import React, { forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      className,
      type = "text",
      label,
      error,
      helperText,
      iconLeft,
      iconRight,
      containerClassName,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <div className={cn("w-full flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label className="text-xs font-medium text-[#9CA3AF] px-1 select-none">
            {label}
          </label>
        )}
        <div className="relative flex items-center w-full">
          {iconLeft && (
            <div className="absolute left-4 text-[#9CA3AF] pointer-events-none flex items-center justify-center">
              {iconLeft}
            </div>
          )}
          <input
            type={type}
            ref={ref}
            disabled={disabled}
            className={cn(
              "w-full h-12 bg-[#111111] text-white placeholder-[#9CA3AF]/60 text-sm font-normal rounded-[24px] border border-white/[0.08] transition-all duration-200 focus:outline-none focus:border-[#7C5CFF] focus:ring-1 focus:ring-[#7C5CFF] disabled:opacity-50 disabled:cursor-not-allowed",
              iconLeft ? "pl-11" : "pl-4",
              iconRight ? "pr-11" : "pr-4",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            {...props}
          />
          {iconRight && (
            <div className="absolute right-4 text-[#9CA3AF] flex items-center justify-center">
              {iconRight}
            </div>
          )}
        </div>
        {(error || helperText) && (
          <p
            className={cn(
              "text-xs px-1",
              error ? "text-red-400 font-medium" : "text-[#9CA3AF]"
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
