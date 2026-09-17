"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { BottomNavigation } from "@/components/navigation/bottom-nav";
import { Bookmark } from "lucide-react";

export default function SavedPage() {
  return (
    <div className="flex-1 flex flex-col p-5 pb-28 gap-6 overflow-y-auto bg-[#050505] text-white">
      {/* Header */}
      <div className="flex items-center gap-2 pt-2">
        <div className="w-10 h-10 rounded-2xl bg-[#7C5CFF]/15 border border-[#7C5CFF]/30 flex items-center justify-center text-[#7C5CFF]">
          <Bookmark className="w-5 h-5" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white">Saved Stories</h1>
          <p className="text-xs text-[#9CA3AF]">Your Bookmarked Briefings</p>
        </div>
      </div>

      <Card glow="primary">
        <CardHeader>
          <CardTitle>Saved Articles</CardTitle>
          <CardDescription>
            Your bookmarked stories are synced here for offline reading & listening.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Bookmark articles from your Morning Brief feed to save them to your personal library.
          </p>
        </CardContent>
      </Card>

      <BottomNavigation />
    </div>
  );
}
