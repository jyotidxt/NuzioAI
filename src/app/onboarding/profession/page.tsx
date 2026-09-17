"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { useOnboarding } from "@/lib/onboarding-context";
import { Briefcase, ArrowRight } from "lucide-react";

const professions = [
  "Finance & Trading",
  "Legal",
  "Technology",
  "Healthcare",
  "Consulting",
  "Marketing & Media",
  "Government & Policy",
  "Real Estate",
  "Education",
  "Founder / Builder",
];

export default function ProfessionPage() {
  const router = useRouter();
  const { data, updateData, saveProgress } = useOnboarding();

  React.useEffect(() => {
    // Immediately create / ensure initial row exists for authenticated user
    saveProgress();
  }, []);

  const handleSelect = (item: string) => {
    updateData({ profession: item });
  };

  const handleContinue = async () => {
    await saveProgress();
    router.push("/onboarding/interests");
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6">
      <div className="flex flex-col gap-6 pt-2">
        <div className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF] mb-1">
            <Briefcase className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            What&apos;s your profession?
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Tell us what you do so we can tailor your daily briefing.
          </p>
        </div>

        {/* Professions Chip List */}
        <div className="flex flex-wrap gap-2.5 pt-2">
          {professions.map((prof) => {
            const isSelected = data.profession === prof;
            return (
              <Chip
                key={prof}
                active={isSelected}
                variant={isSelected ? "primary" : "default"}
                onClick={() => handleSelect(prof)}
                className="py-2.5 px-4 text-sm rounded-2xl"
              >
                {prof}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Button Container */}
      <div className="pt-6 pb-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          disabled={!data.profession}
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
