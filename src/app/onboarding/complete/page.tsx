"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useOnboarding } from "@/lib/onboarding-context";
import { supabase } from "@/lib/supabase";
import { Check, Sparkles, Volume2, Clock, Briefcase, Heart, Play } from "lucide-react";

export default function OnboardingCompletePage() {
  const router = useRouter();
  const { data, markComplete } = useOnboarding();
  const [userName, setUserName] = useState<string>("");

  useEffect(() => {
    markComplete();

    const fetchUser = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          const emailName = user.email ? user.email.split("@")[0] : "";
          const formattedName = emailName ? emailName.charAt(0).toUpperCase() + emailName.slice(1) : "";
          setUserName(user.user_metadata?.full_name || formattedName);
        }
      } catch {}
    };
    fetchUser();
  }, []);

  const handleStart = async () => {
    await markComplete();
    router.push("/home");
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 overflow-y-auto">
      <div className="flex flex-col items-center text-center gap-5 pt-6">
        {/* Green Success Circle with Checkmark */}
        <div className="w-16 h-16 rounded-full bg-[#35E6B5]/20 border-2 border-[#35E6B5] flex items-center justify-center text-[#35E6B5] shadow-xl shadow-[#35E6B5]/20 animate-bounce">
          <Check className="w-8 h-8 stroke-[3]" />
        </div>

        <div className="flex flex-col gap-1.5">
          <h1 className="text-3xl font-bold tracking-tight text-white">
            {userName ? `You're ready, ${userName}.` : "You're ready."}
          </h1>
          <p className="text-xs text-[#9CA3AF] max-w-[280px] leading-relaxed">
            Your daily audio briefing has been personalized and queued for listening.
          </p>
        </div>

        {/* Summary Card */}
        <Card className="w-full text-left bg-[#181818]/90 border border-white/[0.08] shadow-2xl flex flex-col gap-3">
          <CardHeader className="mb-1">
            <div className="flex items-center gap-2 text-[#7C5CFF]">
              <Sparkles className="w-4 h-4" />
              <span className="text-[11px] font-semibold uppercase tracking-wider">
                Personalized Briefing Summary
              </span>
            </div>
            <CardTitle className="text-base">Daily Preferences</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-3 text-xs">
            {/* Profession */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Briefcase className="w-4 h-4 text-[#7C5CFF]" />
                <span>Profession</span>
              </div>
              <span className="text-white font-semibold">
                {data.profession || "Founder / Builder"}
              </span>
            </div>

            {/* Interests */}
            <div className="flex flex-col gap-1.5 pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Heart className="w-4 h-4 text-[#35E6B5]" />
                <span>Interests</span>
              </div>
              <div className="flex flex-wrap gap-1 pt-0.5">
                {(data.interests && data.interests.length > 0
                  ? data.interests
                  : ["AI & Technology", "Financial Markets", "Global Politics"]
                ).map((interest) => (
                  <span
                    key={interest}
                    className="px-2 py-0.5 rounded-full bg-white/[0.06] text-[10px] text-white"
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>

            {/* Voice & Duration */}
            <div className="flex items-center justify-between pb-2 border-b border-white/[0.06]">
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Volume2 className="w-4 h-4 text-[#7C5CFF]" />
                <span>Voice & Length</span>
              </div>
              <span className="text-white font-semibold">
                {data.narratorVoice || "Aria"} · {data.briefLength || "5 min"}
              </span>
            </div>

            {/* Delivery Time */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[#9CA3AF]">
                <Clock className="w-4 h-4 text-[#35E6B5]" />
                <span>Delivery Schedule</span>
              </div>
              <span className="text-[#35E6B5] font-bold">
                {data.deliveryTime || "7:00 AM"}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Large Gradient Button */}
      <div className="pt-6 pb-2">
        <Button
          variant="accent"
          size="lg"
          fullWidth
          onClick={handleStart}
          iconRight={<Play className="w-4 h-4 fill-current ml-1" />}
          className="bg-gradient-to-r from-[#7C5CFF] to-[#35E6B5] text-white hover:opacity-95 shadow-xl shadow-[#35E6B5]/20 border-none font-bold text-base h-14"
        >
          Start listening
        </Button>
      </div>
    </div>
  );
}
