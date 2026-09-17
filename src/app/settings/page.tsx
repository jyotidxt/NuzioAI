"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNavigation } from "@/components/navigation/bottom-nav";
import { supabase } from "@/lib/supabase";
import {
  User,
  Mail,
  Clock,
  Globe,
  Bell,
  Sparkles,
  Shield,
  FileText,
  Info,
  LogOut,
  Volume2,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("User");
  const [userEmail, setUserEmail] = useState("");
  const [briefLength, setBriefLength] = useState("5 min");
  const [deliveryTime, setDeliveryTime] = useState("7:00 AM");
  const [language, setLanguage] = useState("English");
  const [morningBriefEnabled, setMorningBriefEnabled] = useState(true);
  const [breakingNewsEnabled, setBreakingNewsEnabled] = useState(true);
  const [loggingOut, setLoggingOut] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    setMounted(true);

    const checkAuthAndFetch = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        const emailName = user.email ? user.email.split("@")[0] : "User";
        const formattedName =
          emailName.charAt(0).toUpperCase() + emailName.slice(1);
        setUserName(user.user_metadata?.full_name || formattedName);
        setUserEmail(user.email || "");

        // Fetch onboarding profile data
        const { data: profile } = await supabase
          .from("onboarding_profiles")
          .select("brief_length, delivery_time, notifications_enabled")
          .eq("user_id", user.id)
          .maybeSingle();

        const localOnboarding =
          typeof window !== "undefined"
            ? localStorage.getItem("nuzio_onboarding")
            : null;
        let parsedLocal: any = null;
        if (localOnboarding) {
          try {
            parsedLocal = JSON.parse(localOnboarding);
          } catch {}
        }

        const lengthVal = profile?.brief_length
          ? typeof profile.brief_length === "number"
            ? `${profile.brief_length} min`
            : profile.brief_length
          : parsedLocal?.briefLength || "5 min";

        const timeVal =
          profile?.delivery_time || parsedLocal?.deliveryTime || "7:00 AM";

        const prefLang =
          typeof window !== "undefined"
            ? localStorage.getItem("preferred_language")
            : null;
        const langVal = prefLang === "hi" ? "हिन्दी (Hindi)" : "English (UK)";

        setBriefLength(lengthVal);
        setDeliveryTime(timeVal);
        setLanguage(langVal);

        if (profile?.notifications_enabled !== undefined) {
          setMorningBriefEnabled(Boolean(profile.notifications_enabled));
        } else if (parsedLocal?.notificationsEnabled !== undefined) {
          setMorningBriefEnabled(Boolean(parsedLocal.notificationsEnabled));
        }
      } catch (err) {
        console.warn("Settings fetch warning:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  const handleSaveName = async () => {
    if (!newName.trim()) return;
    try {
      const { error } = await supabase.auth.updateUser({
        data: { full_name: newName.trim() },
      });
      if (!error) {
        setUserName(newName.trim());
        setIsEditingName(false);
      }
    } catch (err) {
      console.warn("Failed to update name:", err);
    }
  };

  const handleSignOut = async () => {
    setLoggingOut(true);
    try {
      await supabase.auth.signOut();
      if (typeof window !== "undefined") {
        localStorage.removeItem("nuzio_onboarding");
      }
      window.location.href = "/login";
    } catch (err) {
      console.error("Logout error:", err);
      setLoggingOut(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col p-5 pb-28 gap-5 overflow-y-auto bg-[#050505] text-white">
        <div className="flex flex-col gap-1 pt-2">
          <div className="w-28 h-6 bg-white/[0.08] rounded-full animate-pulse" />
        </div>
        <div className="w-full h-32 bg-white/[0.08] rounded-[24px] animate-pulse" />
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-5 pb-28 gap-6 overflow-y-auto bg-[#050505] text-white">
      {/* Header */}
      <div className="flex flex-col gap-1 pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Settings
        </h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          Manage your profile, preferences & app settings
        </p>
      </div>

      {/* Account Section */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] px-1">
          Account
        </h2>
        <Card className="p-4 bg-[#181818] border-white/[0.08] rounded-[24px] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-[#35E6B5] flex items-center justify-center text-white font-bold text-base shadow-md shadow-[#7C5CFF]/20 border border-white/20 select-none shrink-0">
                {userName.slice(0, 2).toUpperCase()}
              </div>
              <div className="flex flex-col gap-0.5 overflow-hidden">
                <span className="text-base font-bold text-white truncate">
                  {userName}
                </span>
                <span className="text-xs text-[#9CA3AF] truncate flex items-center gap-1">
                  <Mail className="w-3 h-3 shrink-0" />
                  {userEmail || "user@example.com"}
                </span>
              </div>
            </div>
            <button
              onClick={() => {
                setNewName(userName);
                setIsEditingName(!isEditingName);
              }}
              className="px-3 py-1.5 rounded-xl border border-white/10 text-xs font-semibold text-white hover:border-[#7C5CFF] transition-colors"
            >
              {isEditingName ? "Cancel" : "Edit Name"}
            </button>
          </div>

          {isEditingName && (
            <div className="flex items-center gap-2 pt-2 border-t border-white/[0.06]">
              <input
                type="text"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                placeholder="Enter new full name"
                className="flex-1 bg-[#111111] text-xs text-white px-3 py-2 rounded-xl border border-white/10 focus:outline-none focus:border-[#7C5CFF]"
              />
              <Button
                variant="primary"
                size="sm"
                onClick={handleSaveName}
                className="text-xs px-3 py-2 h-8 shrink-0"
              >
                Save
              </Button>
            </div>
          )}
        </Card>
      </div>

      {/* Reading Preferences Section */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] px-1">
          Reading Preferences
        </h2>
        <Card className="p-4 bg-[#181818] border-white/[0.08] rounded-[24px] flex flex-col gap-3.5">
          {/* Brief Length */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#7C5CFF]/15 text-[#7C5CFF] flex items-center justify-center">
                <Volume2 className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white">
                Preferred Brief Length
              </span>
            </div>
            <span className="text-xs font-medium text-[#35E6B5] bg-[#35E6B5]/10 px-2.5 py-1 rounded-full border border-[#35E6B5]/20">
              {briefLength}
            </span>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* Delivery Time */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#35E6B5]/15 text-[#35E6B5] flex items-center justify-center">
                <Clock className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white">
                Daily Delivery Schedule
              </span>
            </div>
            <span className="text-xs font-medium text-white/90 bg-white/[0.08] px-2.5 py-1 rounded-full">
              {deliveryTime}
            </span>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* Language (Read-only) */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-white/[0.08] text-[#9CA3AF] flex items-center justify-center">
                <Globe className="w-4 h-4" />
              </div>
              <span className="text-xs font-semibold text-white">
                App Language (Read-only)
              </span>
            </div>
            <span className="text-xs text-[#9CA3AF] font-medium">
              {language}
            </span>
          </div>
        </Card>
      </div>

      {/* Notifications Section */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] px-1">
          Notifications
        </h2>
        <Card className="p-4 bg-[#181818] border-white/[0.08] rounded-[24px] flex flex-col gap-3.5">
          {/* Morning Brief Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#7C5CFF]/15 text-[#7C5CFF] flex items-center justify-center">
                <Bell className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">
                  Morning Brief
                </span>
                <span className="text-[10px] text-[#9CA3AF]">
                  Daily audio summary alert
                </span>
              </div>
            </div>
            <button
              onClick={() => setMorningBriefEnabled(!morningBriefEnabled)}
              className={cn(
                "w-11 h-6 rounded-full p-0.5 transition-colors duration-200 relative focus:outline-none",
                morningBriefEnabled ? "bg-[#7C5CFF]" : "bg-white/20"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200",
                  morningBriefEnabled ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>

          <div className="h-px bg-white/[0.06]" />

          {/* Breaking News Toggle */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-[#35E6B5]/15 text-[#35E6B5] flex items-center justify-center">
                <Sparkles className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-white">
                  Breaking News Alerts
                </span>
                <span className="text-[10px] text-[#9CA3AF]">
                  High-impact market updates
                </span>
              </div>
            </div>
            <button
              onClick={() => setBreakingNewsEnabled(!breakingNewsEnabled)}
              className={cn(
                "w-11 h-6 rounded-full p-0.5 transition-colors duration-200 relative focus:outline-none",
                breakingNewsEnabled ? "bg-[#35E6B5]" : "bg-white/20"
              )}
            >
              <div
                className={cn(
                  "w-5 h-5 rounded-full bg-white shadow-md transition-transform duration-200",
                  breakingNewsEnabled ? "translate-x-5" : "translate-x-0"
                )}
              />
            </button>
          </div>
        </Card>
      </div>

      {/* App Info Section */}
      <div className="flex flex-col gap-2.5">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] px-1">
          App Information
        </h2>
        <Card className="p-4 bg-[#181818] border-white/[0.08] rounded-[24px] flex flex-col gap-3">
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between text-xs text-white hover:text-[#7C5CFF] transition-colors py-1"
          >
            <div className="flex items-center gap-2.5">
              <Shield className="w-4 h-4 text-[#9CA3AF]" />
              <span>Privacy Policy</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
          </a>

          <div className="h-px bg-white/[0.06]" />

          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="flex items-center justify-between text-xs text-white hover:text-[#7C5CFF] transition-colors py-1"
          >
            <div className="flex items-center gap-2.5">
              <FileText className="w-4 h-4 text-[#9CA3AF]" />
              <span>Terms of Service</span>
            </div>
            <ChevronRight className="w-4 h-4 text-[#9CA3AF]" />
          </a>

          <div className="h-px bg-white/[0.06]" />

          <div className="flex items-center justify-between text-xs text-[#9CA3AF] py-1">
            <div className="flex items-center gap-2.5">
              <Info className="w-4 h-4 text-[#9CA3AF]" />
              <span>About Nuzio AI</span>
            </div>
            <span className="text-[11px] font-mono">v1.0.0 (Phase 6)</span>
          </div>
        </Card>
      </div>

      {/* Large Outlined Logout Button */}
      <div className="pt-2 pb-4">
        <Button
          variant="outline"
          size="lg"
          fullWidth
          isLoading={loggingOut}
          onClick={handleSignOut}
          iconLeft={<LogOut className="w-4 h-4 text-red-400" />}
          className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:text-red-300 h-13 rounded-2xl shadow-lg"
        >
          Sign Out
        </Button>
      </div>

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
