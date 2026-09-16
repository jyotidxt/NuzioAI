"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export interface OnboardingData {
  profession: string;
  interests: string[];
  narratorVoice: string;
  briefLength: string;
  deliveryTime: string;
  notificationsEnabled: boolean;
  completedAt: string | null;
}

interface OnboardingContextType {
  data: OnboardingData;
  updateData: (fields: Partial<OnboardingData>) => void;
  saveProgress: (overrideFields?: Partial<OnboardingData>) => Promise<void>;
  markComplete: () => Promise<void>;
}

const defaultData: OnboardingData = {
  profession: "",
  interests: [],
  narratorVoice: "Aria",
  briefLength: "5 min",
  deliveryTime: "7:00 AM",
  notificationsEnabled: false,
  completedAt: null,
};

const OnboardingContext = createContext<OnboardingContextType>({
  data: defaultData,
  updateData: () => {},
  saveProgress: async () => {},
  markComplete: async () => {},
});

export const OnboardingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [data, setData] = useState<OnboardingData>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nuzio_onboarding");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          // ignore error
        }
      }
    }
    return defaultData;
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("nuzio_onboarding", JSON.stringify(data));
    }
  }, [data]);

  const updateData = (fields: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...fields }));
  };

  const saveProgress = async (overrideFields?: Partial<OnboardingData>) => {
    const currentData = { ...data, ...overrideFields };
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        await supabase.from("onboarding_profiles").upsert(
          {
            user_id: user.id,
            profession: currentData.profession,
            interests: currentData.interests,
            narrator_voice: currentData.narratorVoice,
            brief_length: currentData.briefLength,
            delivery_time: currentData.deliveryTime,
            notifications_enabled: currentData.notificationsEnabled,
            completed_at: currentData.completedAt,
            updated_at: new Date().toISOString(),
          },
          { onConflict: "user_id" }
        );
      }
    } catch (err) {
      console.warn("Failed to persist onboarding to Supabase:", err);
    }
  };

  const markComplete = async () => {
    const completedAt = new Date().toISOString();
    updateData({ completedAt });
    await saveProgress({ completedAt });
  };

  return (
    <OnboardingContext.Provider
      value={{ data, updateData, saveProgress, markComplete }}
    >
      {children}
    </OnboardingContext.Provider>
  );
};

export const useOnboarding = () => useContext(OnboardingContext);
