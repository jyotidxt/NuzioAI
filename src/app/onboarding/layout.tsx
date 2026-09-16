"use client";

import React from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingProvider } from "@/lib/onboarding-context";
import { ProgressIndicator } from "@/components/ui/progress-indicator";

const stepMap: Record<string, number> = {
  "/onboarding/profession": 1,
  "/onboarding/interests": 2,
  "/onboarding/voice": 3,
  "/onboarding/time": 4,
  "/onboarding/notifications": 5,
  "/onboarding/complete": 6,
};

function OnboardingHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const currentStep = stepMap[pathname] || 1;

  if (pathname === "/onboarding/complete") {
    return null; // Complete screen has its own top header
  }

  return (
    <div className="flex flex-col gap-3 pt-4 px-6 pb-2 relative z-20">
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-[#9CA3AF]">
          Step {currentStep} of 6
        </span>
        <button
          onClick={() => router.push("/home")}
          className="text-xs font-semibold text-[#9CA3AF] hover:text-white transition-colors"
        >
          Skip
        </button>
      </div>
      <ProgressIndicator
        currentStep={currentStep}
        totalSteps={6}
        variant="primary"
        height="h-1.5"
      />
    </div>
  );
}

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <OnboardingProvider>
      <div className="relative flex-1 flex flex-col justify-between overflow-hidden bg-[#050505]">
        {/* Subtle Background Glow */}
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[380px] h-[380px] bg-[#7C5CFF]/15 rounded-full blur-[120px] pointer-events-none" />

        <OnboardingHeader />

        <main className="relative z-10 flex-1 flex flex-col overflow-y-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={pathname}
              initial={{ x: 40, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -40, opacity: 0 }}
              transition={{ duration: 0.28, ease: "easeOut" }}
              className="flex-1 flex flex-col justify-between"
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </OnboardingProvider>
  );
}
