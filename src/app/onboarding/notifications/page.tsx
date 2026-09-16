"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding-context";
import { Bell, Sparkles, Check, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface NotificationPref {
  id: string;
  title: string;
  desc: string;
}

const prefs: NotificationPref[] = [
  {
    id: "morning",
    title: "Morning brief ready",
    desc: "Receive your audio summary every morning at your set time.",
  },
  {
    id: "breaking",
    title: "Breaking story",
    desc: "Get instant alerts for high-impact market & tech events.",
  },
  {
    id: "digest",
    title: "Weekly digest",
    desc: "A curated recap of major trends every Sunday evening.",
  },
];

export default function NotificationsPage() {
  const router = useRouter();
  const { updateData, saveProgress } = useOnboarding();
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([
    "morning",
    "breaking",
  ]);

  const togglePref = (id: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleAllow = async () => {
    updateData({ notificationsEnabled: true });
    await saveProgress({ notificationsEnabled: true });
    router.push("/onboarding/complete");
  };

  const handleNotNow = async () => {
    updateData({ notificationsEnabled: false });
    await saveProgress({ notificationsEnabled: false });
    router.push("/onboarding/complete");
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6">
      <div className="flex flex-col gap-5 pt-2">
        <div className="flex flex-col gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF] mb-1">
            <Bell className="w-5 h-5" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            Stay in the loop.
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Choose what alerts you want to receive directly on your lock screen.
          </p>
        </div>

        {/* Preview Notification Card */}
        <div className="p-3.5 bg-[#181818]/90 border border-[#7C5CFF]/30 rounded-[22px] shadow-lg shadow-[#7C5CFF]/10 backdrop-blur-md flex items-start gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#7C5CFF] flex items-center justify-center text-white shrink-0 mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-white">Nuzio AI</span>
              <span className="text-[10px] text-[#9CA3AF]">now</span>
            </div>
            <p className="text-xs font-medium text-white">Your Morning Brief is Ready 🎧</p>
            <p className="text-[11px] text-[#9CA3AF] line-clamp-1">
              5 AI-curated stories on Indian Tech, Markets, & Geopolitics.
            </p>
          </div>
        </div>

        {/* Preference Cards */}
        <div className="flex flex-col gap-2.5 pt-1">
          {prefs.map((pref) => {
            const isChecked = selectedPrefs.includes(pref.id);
            return (
              <div
                key={pref.id}
                onClick={() => togglePref(pref.id)}
                className={cn(
                  "flex items-center justify-between p-3.5 rounded-2xl bg-[#111111] border transition-all cursor-pointer select-none",
                  isChecked
                    ? "border-[#7C5CFF] bg-[#7C5CFF]/10"
                    : "border-white/[0.08] hover:border-white/[0.15]"
                )}
              >
                <div className="flex flex-col gap-0.5 pr-3">
                  <span className="text-sm font-semibold text-white">
                    {pref.title}
                  </span>
                  <span className="text-[11px] text-[#9CA3AF]">
                    {pref.desc}
                  </span>
                </div>
                <div
                  className={cn(
                    "w-5 h-5 rounded-md flex items-center justify-center border transition-colors shrink-0",
                    isChecked
                      ? "bg-[#7C5CFF] border-[#7C5CFF] text-white"
                      : "border-white/20 bg-transparent"
                  )}
                >
                  {isChecked && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Fixed Bottom Action Buttons */}
      <div className="flex flex-col gap-2.5 pt-6 pb-2">
        <Button
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleAllow}
          iconRight={<ArrowRight className="w-4 h-4" />}
          className="shadow-lg shadow-[#7C5CFF]/25"
        >
          Allow Notifications
        </Button>
        <Button
          variant="ghost"
          size="md"
          fullWidth
          onClick={handleNotNow}
          className="text-[#9CA3AF] hover:text-white"
        >
          Not now
        </Button>
      </div>
    </div>
  );
}
