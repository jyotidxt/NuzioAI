"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Chip } from "@/components/ui/chip";
import { BottomNavigation } from "@/components/navigation/bottom-nav";
import { Compass, Search, Filter } from "lucide-react";

export default function DiscoverPage() {
  return (
    <div className="flex-1 flex flex-col p-5 pb-28 gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-2xl bg-[#35E6B5]/15 border border-[#35E6B5]/30 flex items-center justify-center text-[#35E6B5]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white">Discover</h1>
            <p className="text-xs text-[#9CA3AF]">Explore AI Feed & Topics</p>
          </div>
        </div>
      </div>

      <Input
        placeholder="Search feeds, topics, or AI tags..."
        iconLeft={<Search className="w-4 h-4" />}
        iconRight={<Filter className="w-4 h-4 cursor-pointer hover:text-white" />}
      />

      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        <Chip active variant="accent" size="sm">
          Trending
        </Chip>
        <Chip variant="outline" size="sm">
          World News
        </Chip>
        <Chip variant="outline" size="sm">
          Technology
        </Chip>
        <Chip variant="outline" size="sm">
          Analysis
        </Chip>
      </div>

      <Card glow="accent">
        <CardHeader>
          <CardTitle>/discover Route Shell</CardTitle>
          <CardDescription>
            Foundational search & discovery layout using reusable Input, Chip, and Card components.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Ready for live discovery feed integration in future phases.
          </p>
        </CardContent>
      </Card>

      <BottomNavigation />
    </div>
  );
}
