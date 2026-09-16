"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";
import { Clock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

const hoursList = Array.from({ length: 12 }, (_, i) => i + 1);
const minutesList = ["00", "15", "30", "45"];

export default function BriefTimePage() {
  const router = useRouter();
  const { data, updateData, saveProgress } = useOnboarding();

  const [selectedHour, setSelectedHour] = useState(7);
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [period, setPeriod] = useState<"AM" | "PM">("AM");

  const formattedTime = `${selectedHour}:${selectedMinute} ${period}`;

  const handleContinue = async () => {
    updateData({ deliveryTime: formattedTime });
    await saveProgress({ deliveryTime: formattedTime });
    router.push("/onboarding/notifications");
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6">
      <div className="flex flex-col gap-6 pt-2">
        <div className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF] mb-1">
            <Clock className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            When do you want your brief?
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Choose the exact time your daily AI summary arrives every day.
          </p>
        </div>

        {/* AM / PM Segmented Control */}
        <div className="flex p-1 bg-[#111111] rounded-2xl border border-white/[0.08] w-full">
          <button
            type="button"
            onClick={() => setPeriod("AM")}
            className={cn(
              "flex-1 py-2 text-xs font-semibold rounded-xl transition-all",
              period === "AM"
                ? "bg-[#7C5CFF] text-white shadow-md shadow-[#7C5CFF]/20"
                : "text-[#9CA3AF] hover:text-white"
            )}
          >
            AM (Morning)
          </button>
          <button
            type="button"
            onClick={() => setPeriod("PM")}
            className={cn(
              "flex-1 py-2 text-xs font-semibold rounded-xl transition-all",
              period === "PM"
                ? "bg-[#7C5CFF] text-white shadow-md shadow-[#7C5CFF]/20"
                : "text-[#9CA3AF] hover:text-white"
            )}
          >
            PM (Evening)
          </button>
        </div>

        {/* iOS-Style Wheel Time Picker Box */}
        <div className="relative bg-[#181818] border border-white/[0.08] rounded-[24px] p-6 flex flex-col items-center justify-center gap-4">
          <span className="text-xs text-[#9CA3AF] font-medium">
            Delivery Schedule
          </span>
          <div className="text-4xl font-bold tracking-tight text-white flex items-center gap-1 font-mono">
            <span>{selectedHour < 10 ? `0${selectedHour}` : selectedHour}</span>
            <span className="text-[#7C5CFF] animate-pulse">:</span>
            <span>{selectedMinute}</span>
            <span className="text-lg font-sans font-semibold text-[#35E6B5] ml-2">
              {period}
            </span>
          </div>

          {/* Hour & Minute Selectors */}
          <div className="w-full grid grid-cols-2 gap-4 pt-2 border-t border-white/[0.06]">
            {/* Hours selection */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-[#9CA3AF] text-center font-medium">
                Hour
              </span>
              <div className="flex flex-wrap justify-center gap-1.5 max-h-28 overflow-y-auto no-scrollbar p-1">
                {hoursList.map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setSelectedHour(h)}
                    className={cn(
                      "w-8 h-8 rounded-xl text-xs font-semibold transition-colors flex items-center justify-center",
                      selectedHour === h
                        ? "bg-[#7C5CFF] text-white"
                        : "bg-white/[0.05] text-[#9CA3AF] hover:text-white"
                    )}
                  >
                    {h}
                  </button>
                ))}
              </div>
            </div>

            {/* Minutes selection */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[10px] text-[#9CA3AF] text-center font-medium">
                Minute
              </span>
              <div className="flex flex-col gap-1.5 p-1">
                {minutesList.map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setSelectedMinute(m)}
                    className={cn(
                      "py-1.5 px-3 rounded-xl text-xs font-semibold transition-colors text-center",
                      selectedMinute === m
                        ? "bg-[#35E6B5] text-[#050505]"
                        : "bg-white/[0.05] text-[#9CA3AF] hover:text-white"
                    )}
                  >
                    :{m}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Button */}
      <div className="pt-6 pb-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleContinue}
          iconRight={<ArrowRight className="w-4 h-4" />}
          className="shadow-lg shadow-[#7C5CFF]/25"
        >
          Set Delivery for {formattedTime}
        </Button>
      </div>
    </div>
  );
}
