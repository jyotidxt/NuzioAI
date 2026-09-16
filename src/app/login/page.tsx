"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Chip } from "@/components/ui/chip";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { ProgressIndicator } from "@/components/ui/progress-indicator";
import { BottomNavigation } from "@/components/navigation/bottom-nav";
import { Sparkles, Search, ArrowRight, CheckCircle2, ShieldAlert } from "lucide-react";

export default function LoginPage() {
  const [activeChip, setActiveChip] = useState("all");
  const [inputValue, setInputValue] = useState("");
  const [progress, setProgress] = useState(65);

  return (
    <div className="flex-1 flex flex-col p-5 pb-28 gap-6 overflow-y-auto">
      {/* Header Badge */}
      <div className="flex flex-col gap-2 pt-2">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 text-[#7C5CFF] text-xs font-semibold w-fit">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Phase 1 — Foundation Only</span>
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Nuzio AI Design System
        </h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          Premium dark theme tokens, mobile layout (390×844), and reusable UI components.
        </p>
      </div>

      {/* Design Tokens Color Palette Showcase */}
      <Card className="flex flex-col gap-3">
        <CardHeader>
          <CardTitle className="text-sm">Design Tokens Palette</CardTitle>
          <CardDescription>Exact Figma hex values & radius specifications</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-2 text-xs">
          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#050505] border border-white/[0.08]">
            <div className="w-6 h-6 rounded-lg bg-[#050505] border border-white/20" />
            <div>
              <p className="text-white font-medium text-[11px]">Background</p>
              <p className="text-[10px] text-[#9CA3AF]">#050505</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#111111] border border-white/[0.08]">
            <div className="w-6 h-6 rounded-lg bg-[#111111] border border-white/20" />
            <div>
              <p className="text-white font-medium text-[11px]">Surface</p>
              <p className="text-[10px] text-[#9CA3AF]">#111111</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#181818] border border-white/[0.08]">
            <div className="w-6 h-6 rounded-lg bg-[#181818] border border-white/20" />
            <div>
              <p className="text-white font-medium text-[11px]">Card</p>
              <p className="text-[10px] text-[#9CA3AF]">#181818</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#111111] border border-white/[0.08]">
            <div className="w-6 h-6 rounded-lg bg-[#7C5CFF]" />
            <div>
              <p className="text-white font-medium text-[11px]">Primary Purple</p>
              <p className="text-[10px] text-[#9CA3AF]">#7C5CFF</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#111111] border border-white/[0.08]">
            <div className="w-6 h-6 rounded-lg bg-[#35E6B5]" />
            <div>
              <p className="text-white font-medium text-[11px]">Accent Green</p>
              <p className="text-[10px] text-[#9CA3AF]">#35E6B5</p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#111111] border border-white/[0.08]">
            <div className="w-6 h-6 rounded-lg bg-white/10 border border-white/20" />
            <div>
              <p className="text-white font-medium text-[11px]">Radius</p>
              <p className="text-[10px] text-[#9CA3AF]">24px</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Buttons Showcase */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Buttons
        </h2>
        <div className="flex flex-col gap-2.5">
          <Button variant="primary" fullWidth iconRight={<ArrowRight className="w-4 h-4" />}>
            Primary Purple Action
          </Button>
          <Button variant="accent" fullWidth iconLeft={<Sparkles className="w-4 h-4" />}>
            Accent Green Action
          </Button>
          <div className="grid grid-cols-2 gap-2">
            <Button variant="secondary" size="md">
              Secondary
            </Button>
            <Button variant="outline" size="md">
              Outline
            </Button>
          </div>
        </div>
      </div>

      {/* Input Showcase */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Inputs
        </h2>
        <Input
          label="Search Prompt"
          placeholder="Enter AI query..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          iconLeft={<Search className="w-4 h-4" />}
          helperText="Reusable input component with dark surface styling"
        />
      </div>

      {/* Chips Showcase */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Chips & Badges
        </h2>
        <div className="flex flex-wrap gap-2">
          <Chip
            active={activeChip === "all"}
            onClick={() => setActiveChip("all")}
            variant="primary"
          >
            All Topics
          </Chip>
          <Chip
            active={activeChip === "ai"}
            onClick={() => setActiveChip("ai")}
            variant="accent"
          >
            AI Models
          </Chip>
          <Chip
            active={activeChip === "tech"}
            onClick={() => setActiveChip("tech")}
            variant="outline"
          >
            Technology
          </Chip>
          <Chip variant="default" icon={<CheckCircle2 className="w-3.5 h-3.5 text-[#35E6B5]" />}>
            Verified
          </Chip>
        </div>
      </div>

      {/* Progress Indicators Showcase */}
      <div className="flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF]">
          Progress Indicators
        </h2>
        <Card className="flex flex-col gap-4">
          <ProgressIndicator
            value={progress}
            showLabel
            variant="primary"
          />
          <ProgressIndicator
            currentStep={2}
            totalSteps={4}
            showLabel
            variant="accent"
          />
        </Card>
      </div>

      {/* Interactive Card */}
      <Card interactive glow="primary">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Interactive Container Card</CardTitle>
            <ShieldAlert className="w-5 h-5 text-[#35E6B5]" />
          </div>
          <CardDescription>
            Card component with #181818 surface background, 24px border radius, and Framer Motion micro-interactions.
          </CardDescription>
        </CardHeader>
        <CardFooter>
          <span className="text-xs text-[#9CA3AF]">Phase 1 Foundation</span>
          <span className="text-xs font-semibold text-[#35E6B5]">Ready</span>
        </CardFooter>
      </Card>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
