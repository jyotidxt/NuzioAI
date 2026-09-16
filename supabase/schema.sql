-- SQL Schema for Nuzio AI Onboarding Profiles

create table if not exists public.onboarding_profiles (
  id uuid default gen_random_uuid() primary key,
  user_id uuid references auth.users(id) on delete cascade unique,
  profession text,
  interests text[],
  narrator_voice text,
  brief_length text,
  delivery_time text,
  notifications_enabled boolean default false,
  completed_at timestamp with time zone,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security (RLS)
alter table public.onboarding_profiles enable row level security;

-- RLS Policies
create policy "Users can view their own onboarding profile"
  on public.onboarding_profiles for select
  using (auth.uid() = user_id);

create policy "Users can insert/update their own onboarding profile"
  on public.onboarding_profiles for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own onboarding profile"
  on public.onboarding_profiles for update
  using (auth.uid() = user_id);
