"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Home, Compass, Settings, LogIn } from "lucide-react";
import { cn } from "@/lib/utils";

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string }>;
}

const defaultNavItems: NavItem[] = [
  { label: "Home", href: "/home", icon: Home },
  { label: "Discover", href: "/discover", icon: Compass },
  { label: "Settings", href: "/settings", icon: Settings },
  { label: "Login", href: "/login", icon: LogIn },
];

export const BottomNavigation: React.FC<{ items?: NavItem[]; className?: string }> = ({
  items = defaultNavItems,
  className,
}) => {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 max-w-[390px] mx-auto pb-6 pt-2 px-4 pointer-events-auto",
        className
      )}
    >
      <div className="bg-[#111111]/90 backdrop-blur-xl border border-white/[0.08] rounded-[24px] p-2 flex items-center justify-around shadow-2xl shadow-black/80">
        {items.map((item) => {
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center justify-center py-2 px-3 rounded-[18px] transition-colors duration-200 select-none",
                isActive ? "text-[#7C5CFF]" : "text-[#9CA3AF] hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabGlow"
                  className="absolute inset-0 bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 rounded-[18px]"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <Icon className={cn("w-5 h-5 z-10 transition-transform duration-200", isActive && "scale-110")} />
              <span className={cn("text-[10px] font-medium mt-1 z-10 tracking-tight", isActive ? "text-white" : "text-[#9CA3AF]")}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};
