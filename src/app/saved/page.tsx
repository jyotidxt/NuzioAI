"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNavigation } from "@/components/navigation/bottom-nav";
import { supabase } from "@/lib/supabase";
import { getSavedArticles, toggleSavedArticle, NewsArticle } from "@/lib/news";
import { Bookmark, BookmarkX, Trash2, Compass } from "lucide-react";

export default function SavedPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [savedArticles, setSavedArticles] = useState<NewsArticle[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

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

        setUserId(user.id);
        const articles = await getSavedArticles(user.id);
        setSavedArticles(articles);
      } catch (err) {
        console.warn("Auth check error on saved:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  const handleRemove = async (articleId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!userId) return;

    // Optimistically update UI
    setSavedArticles((prev) => prev.filter((a) => a.id !== articleId));
    await toggleSavedArticle(userId, articleId);
  };

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col p-5 pb-28 gap-5 overflow-y-auto bg-[#050505] text-white">
        <div className="flex flex-col gap-1 pt-2">
          <div className="w-24 h-6 bg-white/[0.08] rounded-full animate-pulse" />
          <div className="w-36 h-4 bg-white/[0.08] rounded-full animate-pulse" />
        </div>
        <div className="flex flex-col gap-4">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="bg-[#181818] border border-white/[0.08] rounded-[24px] p-4 flex flex-col gap-3 animate-pulse"
            >
              <div className="w-full h-44 bg-white/[0.05] rounded-2xl" />
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
      {/* Header */}
      <div className="flex flex-col gap-1 pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">Saved</h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">Read later</p>
      </div>

      {/* Saved Feed / Empty State */}
      {loading ? (
        <div className="flex flex-col gap-4">
          {[1, 2].map((n) => (
            <div
              key={n}
              className="bg-[#181818] border border-white/[0.08] rounded-[24px] p-4 flex flex-col gap-3 animate-pulse"
            >
              <div className="w-full h-44 bg-white/[0.05] rounded-2xl" />
              <div className="w-1/3 h-4 bg-white/[0.08] rounded-full" />
              <div className="w-full h-5 bg-white/[0.08] rounded-full" />
            </div>
          ))}
        </div>
      ) : savedArticles.length === 0 ? (
        /* Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center p-8 my-auto bg-[#181818]/60 border border-white/[0.08] rounded-[24px] gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#7C5CFF]">
            <BookmarkX className="w-8 h-8" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-white">
              No saved stories yet
            </h3>
            <p className="text-xs text-[#9CA3AF]">
              Bookmark stories in Discover or Morning Brief to read them here later.
            </p>
          </div>

          <Button
            variant="primary"
            size="md"
            onClick={() => router.push("/discover")}
            iconLeft={<Compass className="w-4 h-4" />}
            className="mt-2 text-xs shadow-lg shadow-[#7C5CFF]/20"
          >
            Explore Discover
          </Button>
        </motion.div>
      ) : (
        /* Saved Cards List */
        <div className="flex flex-col gap-4">
          {savedArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.07 }}
            >
              <Card
                interactive
                className="overflow-hidden p-0 bg-[#181818] border-white/[0.08] rounded-[24px]"
              >
                {/* Thumbnail Image */}
                <div className="relative w-full aspect-video bg-[#111111] overflow-hidden">
                  <img
                    src={article.image_url}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 bg-[#050505]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[10px] font-semibold text-[#35E6B5]">
                    {article.category}
                  </div>
                  <button
                    onClick={(e) => handleRemove(article.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#050505]/80 backdrop-blur-md border border-white/10 text-white hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    aria-label="Remove bookmark"
                  >
                    <Bookmark className="w-4 h-4 fill-[#7C5CFF] text-[#7C5CFF]" />
                  </button>
                </div>

                {/* Article Content */}
                <div className="p-4 flex flex-col gap-2">
                  <h3 className="text-base font-bold text-white tracking-tight leading-snug hover:text-[#7C5CFF] transition-colors">
                    {article.title}
                  </h3>
                  <p className="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">
                    {article.summary}
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-white/[0.06] text-[11px] text-[#9CA3AF]">
                    <span className="font-semibold text-white/90">
                      {article.source}
                    </span>
                    <div className="flex items-center gap-3">
                      <span>{article.read_time}</span>
                      <button
                        onClick={(e) => handleRemove(article.id, e)}
                        className="text-xs text-red-400/80 hover:text-red-400 flex items-center gap-1 transition-colors"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Remove</span>
                      </button>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Bottom Navigation */}
      <BottomNavigation />
    </div>
  );
}
