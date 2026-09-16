"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { BottomNavigation } from "@/components/navigation/bottom-nav";
import { Home, Sparkles, TrendingUp, Zap } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex-1 flex flex-col p-5 pb-28 gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF]">
            <Home className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Home Shell</h1>
            <p className="text-xs text-[#9CA3AF]">Nuzio AI Foundation</p>
          </div>
        </div>
        <Chip variant="accent" size="sm" icon={<Zap className="w-3.5 h-3.5 text-[#050505]" />}>
          Active
        </Chip>
      </div>

      <Card glow="primary" interactive>
        <CardHeader>
          <div className="flex items-center gap-2 text-[#7C5CFF]">
            <Sparkles className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Route Shell</span>
          </div>
          <CardTitle>/home Route</CardTitle>
          <CardDescription>
            Foundational home layout container ready for Phase 2 feature integration.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="p-3 bg-[#111111] rounded-2xl border border-white/[0.08] text-xs text-[#9CA3AF]">
            Design tokens enforced: #050505 background, #111111 surface, #181818 card, 24px radius.
          </div>
        </CardContent>
      </Card>

      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] flex items-center gap-1.5">
          <TrendingUp className="w-3.5 h-3.5 text-[#35E6B5]" />
          Quick Status
        </h2>
        <Card>
          <div className="flex justify-between items-center text-xs">
            <span className="text-[#9CA3AF]">Global Layout Container</span>
            <span className="text-[#35E6B5] font-medium">390 × 844 Mobile</span>
          </div>
        </Card>
      </div>

      <BottomNavigation />
    </div>
  );
}
