import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
const supabaseAnonKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  "";

export const createClient = () => {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.warn("Supabase credentials missing in process.env!");
  }
  return createBrowserClient(supabaseUrl, supabaseAnonKey);
};

export const supabase = createClient();
