import { supabase } from "@/lib/supabase";

export interface NewsArticle {
  id: string;
  title: string;
  summary: string;
  category: string;
  source: string;
  image_url: string;
  read_time: string;
  published_at: string;
}

export const fallbackArticles: NewsArticle[] = [
  {
    id: "1",
    title: "OpenAI Announces Breakthrough Reasoning Architecture for Autonomous Agents",
    summary: "Next-generation AI models demonstrate multi-step chain-of-thought planning, reducing hallucination rates by over 40% in complex domain tasks.",
    category: "AI & Technology",
    source: "TechCrunch",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    read_time: "3 min read",
    published_at: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Global Markets Surge Following Central Bank Policy Stabilization",
    summary: "Equities across Asian and European exchanges rally as inflation indicators cool faster than projected by market analysts.",
    category: "Financial Markets",
    source: "Bloomberg",
    image_url: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop",
    read_time: "4 min read",
    published_at: new Date().toISOString(),
  },
  {
    id: "3",
    title: "India Tech Ecosystem Reaches $50B Annual VC Inflow Milestone",
    summary: "BENGALURU — High-growth SaaS and AI infrastructure startups lead new funding rounds as global institutional investors double down on Indian tech.",
    category: "Indian Business",
    source: "Economic Times",
    image_url: "https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=800&auto=format&fit=crop",
    read_time: "5 min read",
    published_at: new Date().toISOString(),
  },
  {
    id: "4",
    title: "Next-Gen Quantum Chips Achieve Room-Temperature Qubit Coherence",
    summary: "Researchers hit landmark breakthrough in solid-state quantum processors, unlocking potential for practical quantum computing in drug discovery.",
    category: "Science",
    source: "Nature Technology",
    image_url: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop",
    read_time: "4 min read",
    published_at: new Date().toISOString(),
  },
  {
    id: "5",
    title: "Silicon Valley Builders Pivot En Masse to Agentic Developer Tools",
    summary: "YC Founders report massive migration towards automated coding copilots and autonomous workflow orchestration platforms.",
    category: "Startups",
    source: "VentureBeat",
    image_url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop",
    read_time: "3 min read",
    published_at: new Date().toISOString(),
  },
  {
    id: "6",
    title: "Global Climate Summit Ratifies Historic Clean Energy Grid Mandate",
    summary: "Over 120 nations sign treaty accelerating renewable grid storage deployments and green hydrogen infrastructure subsides.",
    category: "Climate & Energy",
    source: "Reuters",
    image_url: "https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop",
    read_time: "5 min read",
    published_at: new Date().toISOString(),
  },
  {
    id: "7",
    title: "G7 Nations Draft Regulatory Framework for AI Frontier Safety",
    summary: "BRUSSELS — Policy makers align on unified compliance guidelines for foundation models operating across international borders.",
    category: "Global Politics",
    source: "Financial Times",
    image_url: "https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop",
    read_time: "4 min read",
    published_at: new Date().toISOString(),
  },
  {
    id: "8",
    title: "CRISPR Gene Editing Therapeutics Gain Accelerated FDA Approval",
    summary: "Pioneering cell therapy treatment for rare genetic disorders shows 98% efficacy in clinical trial results published this week.",
    category: "Health & Medicine",
    source: "STAT News",
    image_url: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop",
    read_time: "4 min read",
    published_at: new Date().toISOString(),
  },
];

export async function getNewsArticles(selectedCategory?: string): Promise<NewsArticle[]> {
  try {
    let query = supabase.from("news").select("*").order("published_at", { ascending: false });

    if (selectedCategory && selectedCategory !== "All") {
      query = query.ilike("category", `%${selectedCategory}%`);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      if (selectedCategory && selectedCategory !== "All") {
        return fallbackArticles.filter((item) =>
          item.category.toLowerCase().includes(selectedCategory.toLowerCase())
        );
      }
      return fallbackArticles;
    }

    return data as NewsArticle[];
  } catch (err) {
    console.warn("Using fallback news data:", err);
    return fallbackArticles;
  }
}
