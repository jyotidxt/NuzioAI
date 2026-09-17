"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { BottomNavigation } from "@/components/navigation/bottom-nav";
import { supabase } from "@/lib/supabase";
import { getNewsArticles, NewsArticle } from "@/lib/news";
import { Play, Pause, Bookmark, Sparkles, Clock, Volume2 } from "lucide-react";
import { cn } from "@/lib/utils";

export default function HomePage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userName, setUserName] = useState("Alex");
  const [greeting, setGreeting] = useState("Good Morning");
  const [userInterests, setUserInterests] = useState<string[]>([]);
  const [selectedChip, setSelectedChip] = useState("All");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioProgress, setAudioProgress] = useState(30);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setMounted(true);

    // Determine time-of-day greeting
    const hour = new Date().getHours();
    if (hour < 12) {
      setGreeting("Good Morning");
    } else if (hour < 17) {
      setGreeting("Good Afternoon");
    } else {
      setGreeting("Good Evening");
    }

    // Authenticated user & onboarding profile guard
    const checkAuthAndFetch = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (!user) {
          router.push("/login");
          return;
        }

        // Derive user name from metadata or email
        const emailName = user.email ? user.email.split("@")[0] : "Alex";
        const formattedName =
          emailName.charAt(0).toUpperCase() + emailName.slice(1);
        setUserName(user.user_metadata?.full_name || formattedName);

        // Fetch onboarding profile
        const { data: profile } = await supabase
          .from("onboarding_profiles")
          .select("interests, completed_at")
          .eq("user_id", user.id)
          .maybeSingle();

        if (!profile || !profile.completed_at) {
          router.push("/onboarding/profession");
          return;
        }

        const interests = profile.interests || ["AI & Technology", "Financial Markets", "Startups"];
        setUserInterests(interests);

        // Fetch news articles
        const fetchedNews = await getNewsArticles();
        setArticles(fetchedNews);
      } catch (err) {
        console.warn("Auth check warning:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  // Audio progress bar simulation when playing
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setAudioProgress((prev) => (prev >= 100 ? 0 : prev + 1));
      }, 300);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const toggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSavedIds((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredArticles =
    selectedChip === "All"
      ? articles
      : articles.filter((a) =>
          a.category.toLowerCase().includes(selectedChip.toLowerCase())
        );

  const chipsList = ["All", ...userInterests];

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col p-5 pb-28 gap-5 overflow-y-auto bg-[#050505] text-white">
        {/* Top Header Placeholder */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex flex-col gap-1">
            <div className="w-24 h-3.5 bg-white/[0.08] rounded-full animate-pulse" />
            <div className="w-32 h-6 bg-white/[0.08] rounded-full animate-pulse" />
          </div>
          <div className="w-10 h-10 rounded-full bg-white/[0.08] animate-pulse" />
        </div>

        {/* Featured Card Placeholder */}
        <div className="relative overflow-hidden bg-gradient-to-br from-[#7C5CFF] to-[#5C3DFF] rounded-[24px] p-5 text-white shadow-xl border border-white/10 opacity-80">
          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="w-28 h-6 bg-white/20 rounded-full animate-pulse" />
              <div className="w-12 h-4 bg-white/20 rounded-full animate-pulse" />
            </div>
            <div className="flex flex-col gap-1.5">
              <div className="w-48 h-6 bg-white/20 rounded-full animate-pulse" />
              <div className="w-36 h-4 bg-white/20 rounded-full animate-pulse" />
            </div>
            <div className="flex items-center gap-3 pt-1">
              <div className="w-12 h-12 rounded-full bg-white/20 animate-pulse" />
              <div className="flex-1 h-2 bg-white/20 rounded-full animate-pulse" />
            </div>
          </div>
        </div>

        {/* Chips Placeholder */}
        <div className="flex flex-col gap-2.5">
          <div className="w-24 h-3 bg-white/[0.08] rounded-full animate-pulse" />
          <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="w-20 h-8 bg-white/[0.08] rounded-2xl animate-pulse shrink-0" />
            ))}
          </div>
        </div>

        {/* News Feed Skeleton */}
        <div className="flex flex-col gap-4 pt-1">
          <div className="w-28 h-3 bg-white/[0.08] rounded-full animate-pulse" />
          {[1, 2].map((n) => (
            <div key={n} className="bg-[#181818] border border-white/[0.08] rounded-[24px] p-4 flex flex-col gap-3 animate-pulse">
              <div className="w-full h-40 bg-white/[0.05] rounded-2xl" />
              <div className="w-1/3 h-4 bg-white/[0.08] rounded-full" />
              <div className="w-full h-5 bg-white/[0.08] rounded-full" />
            </div>
          ))}
        </div>

        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-5 pb-28 gap-5 overflow-y-auto bg-[#050505] text-white">
      {/* Top Header */}
      <div className="flex items-center justify-between pt-2">
        <div className="flex flex-col gap-0.5">
          <span className="text-xs font-medium text-[#9CA3AF]">
            {greeting},
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-white">
            {userName}
          </h1>
        </div>

        {/* Circular Profile Avatar */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#7C5CFF] to-[#35E6B5] flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-[#7C5CFF]/20 border border-white/20 select-none">
          {userName.slice(0, 2).toUpperCase()}
        </div>
      </div>

      {/* Featured AI Morning Brief Card */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className="relative overflow-hidden bg-gradient-to-br from-[#7C5CFF] to-[#5C3DFF] rounded-[24px] p-5 text-white shadow-xl shadow-[#7C5CFF]/25 border border-white/10"
      >
        {/* Background glow circle */}
        <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-semibold tracking-wide">
              <Sparkles className="w-3.5 h-3.5 text-[#35E6B5]" />
              <span>AI Audio Digest</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-white/80 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>5 min</span>
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <h2 className="text-xl font-bold tracking-tight">Your Morning Brief</h2>
            <p className="text-xs text-white/80 font-medium">
              5 stories curated for you
            </p>
          </div>

          {/* Audio Player Controls */}
          <div className="flex items-center gap-3 pt-1">
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setIsPlaying(!isPlaying)}
              className="w-12 h-12 rounded-full bg-white text-[#7C5CFF] flex items-center justify-center shadow-lg hover:bg-white/95 transition-all shrink-0"
              aria-label={isPlaying ? "Pause audio brief" : "Play audio brief"}
            >
              {isPlaying ? (
                <Pause className="w-5 h-5 fill-current" />
              ) : (
                <Play className="w-5 h-5 fill-current ml-0.5" />
              )}
            </motion.button>

            {/* Audio Progress Bar */}
            <div className="flex-1 flex flex-col gap-1.5">
              <div className="w-full bg-black/20 rounded-full h-2 overflow-hidden relative">
                <motion.div
                  className="bg-[#35E6B5] h-full rounded-full"
                  style={{ width: `${audioProgress}%` }}
                />
              </div>
              <div className="flex justify-between items-center text-[10px] text-white/70 font-mono">
                <span>{isPlaying ? "0:45" : "0:00"}</span>
                <span>5:00</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* User Interest Chips */}
      <div className="flex flex-col gap-2.5">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] px-1">
          Your Topics
        </h3>
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {chipsList.map((chip) => {
            const isSelected = selectedChip === chip;
            return (
              <Chip
                key={chip}
                active={isSelected}
                variant={isSelected ? "primary" : "default"}
                onClick={() => setSelectedChip(chip)}
                className="whitespace-nowrap py-2 px-4 text-xs font-semibold rounded-2xl"
              >
                {chip}
              </Chip>
            );
          })}
        </div>
      </div>

      {/* News Feed List */}
      <div className="flex flex-col gap-4 pt-1">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] px-1">
          Top Stories ({filteredArticles.length})
        </h3>

        {loading ? (
          /* Skeleton Loading Animation */
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((n) => (
              <div
                key={n}
                className="bg-[#181818] border border-white/[0.08] rounded-[24px] p-4 flex flex-col gap-3 animate-pulse"
              >
                <div className="w-full h-40 bg-white/[0.05] rounded-2xl" />
                <div className="w-1/3 h-4 bg-white/[0.08] rounded-full" />
                <div className="w-full h-5 bg-white/[0.08] rounded-full" />
                <div className="w-2/3 h-4 bg-white/[0.05] rounded-full" />
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <Card className="p-6 text-center">
            <p className="text-xs text-[#9CA3AF]">
              No articles found for &quot;{selectedChip}&quot;. Select another topic.
            </p>
          </Card>
        ) : (
          filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.08 }}
            >
              <Card interactive className="overflow-hidden p-0 bg-[#181818] border-white/[0.08] rounded-[24px]">
                {/* Article Cover Image */}
                <div className="relative w-full h-44 bg-[#111111] overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-semibold text-[#35E6B5]">
                    {article.category}
                  </div>
                  <button
                    onClick={(e) => toggleBookmark(article.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#050505]/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Bookmark article"
                  >
                    <Bookmark
                      className={cn(
                        "w-4 h-4 transition-colors",
                        savedIds[article.id]
                          ? "fill-[#7C5CFF] text-[#7C5CFF]"
                          : "text-white"
                      )}
                    />
                  </button>
                </div>

                {/* Article Content */}
                <div className="p-4 flex flex-col gap-2">
                  <h4 className="text-base font-bold text-white tracking-tight leading-snug hover:text-[#7C5CFF] transition-colors">
                    {article.title}
                  </h4>
                  <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-[#9CA3AF]">
                    <span className="font-semibold text-white/90">
                      {article.source}
                    </span>
                    <span>{article.read_time}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))
        )}
      </div>

      {/* Fixed Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
