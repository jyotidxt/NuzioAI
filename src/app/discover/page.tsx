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
import { Search, X, Bookmark, TrendingUp, SearchX } from "lucide-react";
import { cn } from "@/lib/utils";

const categories = [
  "All",
  "AI",
  "Technology",
  "Business",
  "Startups",
  "Science",
  "Politics",
  "Health",
  "Sports",
];

export default function DiscoverPage() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [articles, setArticles] = useState<NewsArticle[]>([]);
  const [savedIds, setSavedIds] = useState<Record<string, boolean>>({});

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

        const { getSavedNewsIds } = await import("@/lib/news");
        const initialSavedIds = await getSavedNewsIds(user.id);
        const initialSavedMap: Record<string, boolean> = {};
        initialSavedIds.forEach((id) => (initialSavedMap[id] = true));
        setSavedIds(initialSavedMap);

        const newsData = await getNewsArticles();
        setArticles(newsData);
      } catch (err) {
        console.warn("Auth check error on discover:", err);
      } finally {
        setLoading(false);
      }
    };

    checkAuthAndFetch();
  }, [router]);

  const toggleBookmark = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const isCurrentlySaved = savedIds[id];
    setSavedIds((prev) => ({ ...prev, [id]: !isCurrentlySaved }));

    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (user) {
        const { toggleSavedArticle } = await import("@/lib/news");
        await toggleSavedArticle(user.id, id);
      }
    } catch (err) {
      console.warn("Toggle bookmark error:", err);
    }
  };

  const clearSearch = () => {
    setSearchQuery("");
    setSelectedCategory("All");
  };

  // Real-time filtering by category chip AND search query (title, summary, category, source)
  const filteredArticles = articles.filter((article) => {
    // Category check
    const matchesCategory =
      selectedCategory === "All" ||
      article.category.toLowerCase().includes(selectedCategory.toLowerCase());

    // Search query check across title, summary, category, source
    const query = searchQuery.trim().toLowerCase();
    const matchesQuery =
      query === "" ||
      article.title.toLowerCase().includes(query) ||
      article.summary.toLowerCase().includes(query) ||
      article.category.toLowerCase().includes(query) ||
      article.source.toLowerCase().includes(query);

    return matchesCategory && matchesQuery;
  });

  if (!mounted) {
    return (
      <div className="flex-1 flex flex-col p-5 pb-28 gap-5 overflow-y-auto bg-[#050505] text-white">
        <div className="flex flex-col gap-1 pt-2">
          <div className="w-28 h-6 bg-white/[0.08] rounded-full animate-pulse" />
          <div className="w-48 h-4 bg-white/[0.08] rounded-full animate-pulse" />
        </div>
        <div className="w-full h-12 bg-white/[0.08] rounded-[20px] animate-pulse" />
        <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
          {[1, 2, 3, 4].map((n) => (
            <div key={n} className="w-20 h-8 bg-white/[0.08] rounded-2xl animate-pulse shrink-0" />
          ))}
        </div>
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col p-5 pb-28 gap-5 overflow-y-auto bg-[#050505] text-white">
      {/* Top Header */}
      <div className="flex flex-col gap-1 pt-2">
        <h1 className="text-2xl font-bold tracking-tight text-white">
          Discover
        </h1>
        <p className="text-xs text-[#9CA3AF] leading-relaxed">
          Explore stories tailored to your interests
        </p>
      </div>

      {/* Premium Rounded Search Bar (20px radius, black glass #111111) */}
      <div className="relative flex items-center w-full">
        <Search className="absolute left-4 w-4 h-4 text-[#9CA3AF] pointer-events-none" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search news, topics or sources"
          className="w-full h-12 pl-11 pr-11 bg-[#111111]/90 backdrop-blur-md text-white placeholder-[#9CA3AF]/60 text-sm rounded-[20px] border border-white/[0.08] transition-all duration-200 focus:outline-none focus:border-[#7C5CFF] focus:ring-1 focus:ring-[#7C5CFF]"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery("")}
            className="absolute right-4 text-[#9CA3AF] hover:text-white transition-colors"
            aria-label="Clear search"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Horizontally Scrollable Category Chips */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <Chip
              key={cat}
              active={isSelected}
              variant={isSelected ? "primary" : "default"}
              onClick={() => setSelectedCategory(cat)}
              className="whitespace-nowrap py-2 px-4 text-xs font-semibold rounded-2xl"
            >
              {cat}
            </Chip>
          );
        })}
      </div>

      {/* Main Section Header */}
      <div className="flex items-center justify-between pt-1">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#9CA3AF] flex items-center gap-1.5 px-1">
          <TrendingUp className="w-3.5 h-3.5 text-[#35E6B5]" />
          {searchQuery ? `Search Results (${filteredArticles.length})` : "Trending Today"}
        </h2>
      </div>

      {/* News Feed / Empty State */}
      {loading ? (
        /* Skeleton Loading Animation */
        <div className="flex flex-col gap-4">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="bg-[#181818] border border-white/[0.08] rounded-[24px] p-4 flex flex-col gap-3 animate-pulse"
            >
              <div className="w-full h-44 bg-white/[0.05] rounded-2xl" />
              <div className="w-1/3 h-4 bg-white/[0.08] rounded-full" />
              <div className="w-full h-5 bg-white/[0.08] rounded-full" />
              <div className="w-2/3 h-4 bg-white/[0.05] rounded-full" />
            </div>
          ))}
        </div>
      ) : filteredArticles.length === 0 ? (
        /* Centered Illustration Empty State */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col items-center justify-center text-center p-8 my-6 bg-[#181818]/60 border border-white/[0.08] rounded-[24px] gap-4"
        >
          <div className="w-16 h-16 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center text-[#9CA3AF]">
            <SearchX className="w-8 h-8 text-[#7C5CFF]" />
          </div>

          <div className="flex flex-col gap-1">
            <h3 className="text-lg font-bold text-white">No stories found</h3>
            <p className="text-xs text-[#9CA3AF]">
              Try another topic or category.
            </p>
          </div>

          <Button
            variant="outline"
            size="md"
            onClick={clearSearch}
            className="mt-2 text-xs"
          >
            Clear Search
          </Button>
        </motion.div>
      ) : (
        /* Articles List */
        <div className="flex flex-col gap-4">
          {filteredArticles.map((article, idx) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.07 }}
            >
              <Card interactive className="overflow-hidden p-0 bg-[#181818] border-white/[0.08] rounded-[24px]">
                {/* 16:9 Thumbnail Image */}
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
                    onClick={(e) => toggleBookmark(article.id, e)}
                    className="absolute top-3 right-3 p-2 rounded-full bg-[#050505]/80 backdrop-blur-md border border-white/10 text-white hover:bg-white/20 transition-colors"
                    aria-label="Bookmark story"
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
                    <span>{article.read_time}</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Fixed Bottom Navigation with Discover Active */}
      <BottomNavigation />
    </div>
  );
}
