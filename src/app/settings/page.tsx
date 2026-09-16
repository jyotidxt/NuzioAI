"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/navigation/bottom-nav";
import { Settings, Sliders, Moon, Shield, Bell } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex-1 flex flex-col p-5 pb-28 gap-6 overflow-y-auto">
      {/* Header */}
      <div className="flex items-center gap-2 pt-2">
        <div className="w-10 h-10 rounded-2xl bg-white/[0.08] border border-white/[0.12] flex items-center justify-center text-white">
          <Settings className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Settings</h1>
          <p className="text-xs text-[#9CA3AF]">App Configuration</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2 text-[#7C5CFF]">
            <Sliders className="w-4 h-4" />
            <span className="text-xs font-semibold uppercase tracking-wider">Design Preferences</span>
          </div>
          <CardTitle>/settings Route Shell</CardTitle>
          <CardDescription>
            System configuration & preference management shell.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 mt-2">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#111111] border border-white/[0.08]">
            <div className="flex items-center gap-3">
              <Moon className="w-4 h-4 text-[#7C5CFF]" />
              <span className="text-xs font-medium text-white">Dark System Theme</span>
            </div>
            <span className="text-xs text-[#35E6B5] font-semibold">Active (#050505)</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#111111] border border-white/[0.08]">
            <div className="flex items-center gap-3">
              <Shield className="w-4 h-4 text-[#35E6B5]" />
              <span className="text-xs font-medium text-white">Security & Privacy</span>
            </div>
            <span className="text-xs text-[#9CA3AF]">Configured</span>
          </div>

          <div className="flex items-center justify-between p-3 rounded-2xl bg-[#111111] border border-white/[0.08]">
            <div className="flex items-center gap-3">
              <Bell className="w-4 h-4 text-[#9CA3AF]" />
              <span className="text-xs font-medium text-white">Notifications</span>
            </div>
            <span className="text-xs text-[#9CA3AF]">Default</span>
          </div>
        </CardContent>
      </Card>

      <Button variant="outline" fullWidth>
        Reset Design System Defaults
      </Button>

      <BottomNavigation />
    </div>
  );
}
