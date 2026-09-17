"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface LanguageOption {
  code: string;
  label: string;
  flag: string;
  native: string;
}

const languages: LanguageOption[] = [
  {
    code: "en",
    label: "English",
    flag: "🇬🇧",
    native: "English",
  },
  {
    code: "hi",
    label: "हिन्दी",
    flag: "🇮🇳",
    native: "Hindi",
  },
];

export default function LanguagePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [selectedLang, setSelectedLang] = useState<string | null>(null);
  const [isFirstLaunch, setIsFirstLaunch] = useState(true);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("preferred_language");
    if (saved) {
      setSelectedLang(saved);
      setIsFirstLaunch(false);
    }
  }, []);

  const handleContinue = () => {
    if (!selectedLang) return;
    localStorage.setItem("preferred_language", selectedLang);
    router.push("/login");
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between p-6 bg-[#050505] overflow-hidden text-white">
      {/* Subtle Purple Radial Ambient Glow */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#7C5CFF]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Section */}
      <div className="relative z-10 flex items-center justify-between pt-2">
        {!isFirstLaunch ? (
          <button
            onClick={() => router.back()}
            className="w-10 h-10 rounded-2xl bg-[#111111] border border-white/[0.08] flex items-center justify-center text-[#9CA3AF] hover:text-white transition-colors"
            aria-label="Back"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        ) : (
          <div className="w-10 h-10" />
        )}
      </div>

      {/* Center Section: Heading & Language Cards */}
      <div className="relative z-10 flex flex-col gap-6 my-auto py-4">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
            Choose your language
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            This will personalize your reading and narration experience.
          </p>
        </div>

        {/* 2 Rounded Selection Cards */}
        <div className="flex flex-col gap-3.5 pt-2">
          {languages.map((lang) => {
            const isSelected = selectedLang === lang.code;

            return (
              <motion.div
                key={lang.code}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSelectedLang(lang.code)}
                className={cn(
                  "relative flex items-center justify-between p-5 rounded-[24px] bg-[#181818] border transition-all cursor-pointer select-none",
                  isSelected
                    ? "border-[#7C5CFF] bg-[#7C5CFF]/10 shadow-lg shadow-[#7C5CFF]/20"
                    : "border-white/[0.08] hover:border-white/[0.16] hover:bg-[#1C1C1C]"
                )}
              >
                <div className="flex items-center gap-3.5">
                  <span className="text-2xl">{lang.flag}</span>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-base font-semibold text-white">
                      {lang.label}
                    </span>
                    <span className="text-xs text-[#9CA3AF]">
                      {lang.native}
                    </span>
                  </div>
                </div>

                {/* Filled Radio Indicator */}
                <div
                  className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center border transition-all",
                    isSelected
                      ? "border-[#7C5CFF] bg-[#7C5CFF] text-white shadow-md shadow-[#7C5CFF]/30"
                      : "border-white/20 bg-transparent"
                  )}
                >
                  {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 flex flex-col gap-4 pt-4 pb-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!selectedLang}
          onClick={handleContinue}
          iconRight={<ArrowRight className="w-4 h-4" />}
          className="shadow-lg shadow-[#7C5CFF]/25 font-semibold text-sm"
        >
          Continue
        </Button>

        <p className="text-[11px] text-center text-[#9CA3AF]/70 leading-relaxed">
          You can change your language preference anytime in Settings.
        </p>
      </div>
    </div>
  );
}
