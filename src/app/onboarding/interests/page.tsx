"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { useOnboarding } from "@/lib/onboarding-context";
import { Compass, ArrowRight } from "lucide-react";

const interestsList = [
  "AI & Technology",
  "Financial Markets",
  "Indian Business",
  "Global Politics",
  "Startups",
  "Science",
  "Geopolitics",
  "Health & Medicine",
  "Climate & Energy",
  "Sports",
  "Culture & Arts",
  "Legal & Policy",
];

const MAX_INTERESTS = 7;

export default function InterestsPage() {
  const router = useRouter();
  const { data, updateData, saveProgress } = useOnboarding();
  const selectedInterests = data.interests || [];

  const toggleInterest = (topic: string) => {
    if (selectedInterests.includes(topic)) {
      updateData({
        interests: selectedInterests.filter((t) => t !== topic),
      });
    } else {
      if (selectedInterests.length < MAX_INTERESTS) {
        updateData({
          interests: [...selectedInterests, topic],
        });
      }
    }
  };

  const handleContinue = async () => {
    await saveProgress();
    router.push("/onboarding/voice");
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6">
      <div className="flex flex-col gap-6 pt-2">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 rounded-2xl bg-[#35E6B5]/15 border border-[#35E6B5]/30 flex items-center justify-center text-[#35E6B5] mb-1">
              <Compass className="w-5 h-5" />
            </div>
            <span className="text-xs font-semibold text-[#35E6B5] px-3 py-1 rounded-full bg-[#35E6B5]/10 border border-[#35E6B5]/20">
              {selectedInterests.length}/{MAX_INTERESTS} selected
            </span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            What moves your world?
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Select up to 7 topics that matter to you.
          </p>
        </div>

        {/* Interests Chips */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {interestsList.map((topic) => {
            const isSelected = selectedInterests.includes(topic);
            return (
              <Chip
                key={topic}
                active={isSelected}
                variant={isSelected ? "accent" : "default"}
                onClick={() => toggleInterest(topic)}
                className="py-2.5 px-4 text-sm rounded-2xl"
              >
                {topic}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="pt-6 pb-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={selectedInterests.length === 0}
          onClick={handleContinue}
          iconRight={<ArrowRight className="w-4 h-4" />}
          className="shadow-lg shadow-[#7C5CFF]/25"
        >
          Continue
        </Button>
      </div>
    </div>
  );
}
