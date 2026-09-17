-- SQL Schema & Seed Data for Nuzio AI News Table

create table if not exists public.news (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  summary text not null,
  category text not null,
  source text not null,
  image_url text not null,
  read_time text not null,
  published_at timestamp with time zone default now(),
  created_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table public.news enable row level security;

-- Read policy for all authenticated & public users
create policy "Allow public read access to news"
  on public.news for select
  using (true);

-- Seed realistic news data across categories
insert into public.news (title, summary, category, source, image_url, read_time) values
(
  'OpenAI Announces Breakthrough Reasoning Architecture for Autonomous Agents',
  'Next-generation AI models demonstrate multi-step chain-of-thought planning, reducing hallucination rates by over 40% in complex domain tasks.',
  'AI & Technology',
  'TechCrunch',
  'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop',
  '3 min read'
),
(
  'Global Markets Surge Following Central Bank Policy Stabilization',
  'Equities across Asian and European exchanges rally as inflation indicators cool faster than projected by market analysts.',
  'Financial Markets',
  'Bloomberg',
  'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=800&auto=format&fit=crop',
  '4 min read'
),
(
  'India Tech Ecosystem Reaches $50B Annual VC Inflow Milestone',
  'BENGALURU — High-growth SaaS and AI infrastructure startups lead new funding rounds as global institutional investors double down on Indian tech.',
  'Indian Business',
  'Economic Times',
  'https://images.unsplash.com/photo-1532619675605-1ede6c2ed2b0?q=80&w=800&auto=format&fit=crop',
  '5 min read'
),
(
  'Next-Gen Quantum Chips Achieve Room-Temperature Qubit Coherence',
  'Researchers hit landmark breakthrough in solid-state quantum processors, unlocking potential for practical quantum computing in drug discovery.',
  'Science',
  'Nature Technology',
  'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=800&auto=format&fit=crop',
  '4 min read'
),
(
  'Silicon Valley Builders Pivot En Masse to Agentic Developer Tools',
  'YC Founders report massive migration towards automated coding copilots and autonomous workflow orchestration platforms.',
  'Startups',
  'VentureBeat',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=800&auto=format&fit=crop',
  '3 min read'
),
(
  'Global Climate Summit Ratifies Historic Clean Energy Grid Mandate',
  'Over 120 nations sign treaty accelerating renewable grid storage deployments and green hydrogen infrastructure subsides.',
  'Climate & Energy',
  'Reuters',
  'https://images.unsplash.com/photo-1466611653911-95081537e5b7?q=80&w=800&auto=format&fit=crop',
  '5 min read'
),
(
  'G7 Nations Draft Regulatory Framework for AI Frontier Safety',
  'BRUSSELS — Policy makers align on unified compliance guidelines for foundation models operating across international borders.',
  'Global Politics',
  'Financial Times',
  'https://images.unsplash.com/photo-1541872703-74c5e44368f9?q=80&w=800&auto=format&fit=crop',
  '4 min read'
),
(
  'CRISPR Gene Editing Therapeutics Gain Accelerated FDA Approval',
  'Pioneering cell therapy treatment for rare genetic disorders shows 98% efficacy in clinical trial results published this week.',
  'Health & Medicine',
  'STAT News',
  'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=800&auto=format&fit=crop',
  '4 min read'
);
