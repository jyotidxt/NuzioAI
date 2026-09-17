-- SQL Schema for Nuzio AI Saved Articles

create table if not exists public.saved_articles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade not null,
  news_id text not null,
  saved_at timestamp with time zone default now(),
  unique (user_id, news_id)
);

-- Grant privileges to authenticated users & service role
grant all privileges on table public.saved_articles to authenticated;
grant all privileges on table public.saved_articles to service_role;
grant all privileges on table public.saved_articles to anon;

-- Enable Row Level Security (RLS)
alter table public.saved_articles enable row level security;

-- Drop existing policies if any
drop policy if exists "Users can view their own saved articles" on public.saved_articles;
drop policy if exists "Users can insert their own saved articles" on public.saved_articles;
drop policy if exists "Users can delete their own saved articles" on public.saved_articles;

-- RLS Policies
create policy "Users can view their own saved articles"
  on public.saved_articles for select
  using (auth.uid() = user_id);

create policy "Users can insert their own saved articles"
  on public.saved_articles for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own saved articles"
  on public.saved_articles for delete
  using (auth.uid() = user_id);
