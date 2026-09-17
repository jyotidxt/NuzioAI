"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function SplashPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const timer = setTimeout(() => {
      const preferredLang = localStorage.getItem("preferred_language");
      if (preferredLang) {
        router.push("/login");
      } else {
        router.push("/language");
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="relative flex-1 flex flex-col items-center justify-center p-6 bg-[#050505] overflow-hidden text-white">
      {/* Small Glowing Purple Orb Behind Logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#7C5CFF]/30 rounded-full blur-[90px] pointer-events-none" />

      {/* Fade-in Animation (500ms) */}
      {mounted && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="relative z-10 flex flex-col items-center text-center gap-4"
        >
          {/* Nuzio AI Icon Badge */}
          <div className="w-16 h-16 rounded-2xl bg-[#7C5CFF] flex items-center justify-center text-white shadow-2xl shadow-[#7C5CFF]/50 border border-white/20">
            <Sparkles className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-1 pt-2">
            <h1 className="text-3xl font-bold tracking-tight text-white">
              Nuzio AI
            </h1>
            <p className="text-xs font-medium text-[#9CA3AF] tracking-wide">
              Personalized News. Smarter Mornings.
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
