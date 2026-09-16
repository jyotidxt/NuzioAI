"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";
import { Volume2, Play, Pause, ArrowRight, Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface Voice {
  id: string;
  name: string;
  accent: string;
  trait: string;
  language: string;
  avatarColor: string;
  initials: string;
}

const voices: Voice[] = [
  {
    id: "Aria",
    name: "Aria",
    accent: "British",
    trait: "Warm",
    language: "English",
    avatarColor: "bg-gradient-to-tr from-[#7C5CFF] to-[#35E6B5]",
    initials: "AR",
  },
  {
    id: "Kai",
    name: "Kai",
    accent: "American",
    trait: "Focused",
    language: "English",
    avatarColor: "bg-gradient-to-tr from-blue-500 to-indigo-600",
    initials: "KA",
  },
  {
    id: "Meera",
    name: "Meera",
    accent: "Indian",
    trait: "Bright",
    language: "Hindi",
    avatarColor: "bg-gradient-to-tr from-amber-500 to-rose-500",
    initials: "ME",
  },
];

const lengths = ["5 min", "10 min", "15 min", "Custom"];

export default function VoicePage() {
  const router = useRouter();
  const { data, updateData, saveProgress } = useOnboarding();
  const [playingId, setPlayingId] = useState<string | null>(null);

  const selectedVoice = data.narratorVoice || "Aria";
  const selectedLength = data.briefLength || "5 min";

  const togglePlay = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (playingId === id) {
      setPlayingId(null);
    } else {
      setPlayingId(id);
      setTimeout(() => setPlayingId(null), 3000); // Simulate audio preview
    }
  };

  const handleContinue = async () => {
    await saveProgress();
    router.push("/onboarding/time");
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6">
      <div className="flex flex-col gap-6 pt-2">
        <div className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF] mb-1">
            <Volume2 className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Pick a narrator voice.
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Choose your AI narrator and preferred daily briefing duration.
          </p>
        </div>

        {/* Voice Cards */}
        <div className="flex flex-col gap-3">
          {voices.map((voice) => {
            const isSelected = selectedVoice === voice.name;
            const isPlaying = playingId === voice.id;

            return (
              <div
                key={voice.id}
                onClick={() => updateData({ narratorVoice: voice.name })}
                className={cn(
                  "relative flex items-center justify-between p-4 rounded-[24px] bg-[#181818] border transition-all cursor-pointer select-none",
                  isSelected
                    ? "border-[#7C5CFF] bg-[#7C5CFF]/10 shadow-lg shadow-[#7C5CFF]/10"
                    : "border-white/[0.08] hover:border-white/[0.16] hover:bg-[#1C1C1C]"
                )}
              >
                <div className="flex items-center gap-3.5">
                  {/* Circular Avatar */}
                  <div
                    className={cn(
                      "w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md",
                      voice.avatarColor
                    )}
                  >
                    {voice.initials}
                  </div>

                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-semibold text-white">
                        {voice.name}
                      </span>
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-white/[0.08] text-[#9CA3AF]">
                        {voice.accent}
                      </span>
                    </div>
                    <span className="text-xs text-[#9CA3AF]">
                      {voice.trait} · {voice.language}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {/* Play Audio Button */}
                  <button
                    type="button"
                    onClick={(e) => togglePlay(voice.id, e)}
                    aria-label={`Preview ${voice.name} voice`}
                    className={cn(
                      "w-9 h-9 rounded-full flex items-center justify-center transition-colors",
                      isPlaying
                        ? "bg-[#35E6B5] text-[#050505]"
                        : "bg-white/[0.08] text-white hover:bg-white/[0.15]"
                    )}
                  >
                    {isPlaying ? (
                      <Pause className="w-4 h-4" />
                    ) : (
                      <Play className="w-4 h-4 ml-0.5" />
                    )}
                  </button>

                  {/* Selection Check */}
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-[#7C5CFF] flex items-center justify-center text-white">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Brief Length Selector */}
        <div className="flex flex-col gap-2.5 pt-2">
          <label className="text-xs font-medium text-[#9CA3AF]">
            Brief Length
          </label>
          <div className="grid grid-cols-4 gap-2">
            {lengths.map((len) => {
              const isSelected = selectedLength === len;
              return (
                <button
                  key={len}
                  type="button"
                  onClick={() => updateData({ briefLength: len })}
                  className={cn(
                    "py-2.5 px-2 text-xs font-semibold rounded-2xl border transition-all text-center",
                    isSelected
                      ? "bg-[#7C5CFF] text-white border-[#7C5CFF] shadow-md shadow-[#7C5CFF]/20"
                      : "bg-[#111111] text-[#9CA3AF] border-white/[0.08] hover:text-white"
                  )}
                >
                  {len}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Fixed Dynamic Bottom Button */}
      <div className="pt-6 pb-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
          iconRight={<ArrowRight className="w-4 h-4" />}
          className="shadow-lg shadow-[#7C5CFF]/25"
        >
          Continue with {selectedVoice} · {selectedLength}
        </Button>
      </div>
    </div>
  );
}
