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
  onboardingCompleted: boolean;
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
  onboardingCompleted: false,
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
  const [data, setData] = useState<OnboardingData>(defaultData);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("nuzio_onboarding");
      if (saved) {
        try {
          setData(JSON.parse(saved));
        } catch {
          // ignore error
        }
      }
    }
  }, []);

  useEffect(() => {
    if (mounted && typeof window !== "undefined") {
      localStorage.setItem("nuzio_onboarding", JSON.stringify(data));
    }
  }, [data, mounted]);

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
        const isCompleted =
          currentData.onboardingCompleted || Boolean(currentData.completedAt);
        const completedAtValue =
          currentData.completedAt || (isCompleted ? new Date().toISOString() : null);

        const briefLengthNum = parseInt(String(currentData.briefLength || "5")) || 5;

        const profile = {
          user_id: user.id,
          profession: currentData.profession || null,
          interests: currentData.interests || [],
          narrator_voice: currentData.narratorVoice || "Aria",
          brief_length: briefLengthNum,
          delivery_time: currentData.deliveryTime || "7:00 AM",
          notifications_enabled: Boolean(currentData.notificationsEnabled),
          completed_at: completedAtValue,
        };

        const { error } = await supabase
          .from("onboarding_profiles")
          .upsert(profile, { onConflict: "user_id" });

        if (error) {
          if (error.code === "42501") {
            console.warn(
              "Supabase RLS table permissions restricted (42501). Falling back to client-side onboarding state."
            );
          } else {
            console.error(error.message, error.details, error.code);
          }
        }
      }
    } catch (err) {
      console.warn("Failed to persist onboarding to Supabase:", err);
    }
  };

  const markComplete = async () => {
    const completedAt = new Date().toISOString();
    const overrides: Partial<OnboardingData> = {
      completedAt,
      onboardingCompleted: true,
    };
    const updated = { ...data, ...overrides };
    setData(updated);
    if (typeof window !== "undefined") {
      localStorage.setItem("nuzio_onboarding", JSON.stringify(updated));
    }
    await saveProgress(overrides);
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
