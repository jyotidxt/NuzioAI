"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.session && data.user) {
        // Check onboarding completion status
        const { data: profile } = await supabase
          .from("onboarding_profiles")
          .select("completed_at")
          .eq("user_id", data.user.id)
          .maybeSingle();

        const localOnboarding =
          typeof window !== "undefined"
            ? localStorage.getItem("nuzio_onboarding")
            : null;
        let isLocallyCompleted = false;
        if (localOnboarding) {
          try {
            const parsed = JSON.parse(localOnboarding);
            isLocallyCompleted =
              Boolean(parsed.onboardingCompleted) || Boolean(parsed.completedAt);
          } catch {
            // ignore error
          }
        }

        const isCompleted =
          isLocallyCompleted || (Boolean(profile) && Boolean(profile?.completed_at));

        const targetRoute = isCompleted ? "/home" : "/onboarding/profession";
        window.location.href = targetRoute;
      }
    } catch (err: unknown) {
      setError((err as Error).message || "An unexpected error occurred.");
      setLoading(false);
    }
  };

  return (
    <div className="relative flex-1 flex flex-col justify-between p-6 overflow-hidden bg-[#050505]">
      {/* Subtle Purple Radial Glow Effect */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[350px] h-[350px] bg-[#7C5CFF]/20 rounded-full blur-[100px] pointer-events-none" />

      {/* Top Header & Logo */}
      <div className="relative z-10 flex flex-col gap-6 pt-4">
        {/* Nuzio AI Logo */}
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-[#7C5CFF] flex items-center justify-center text-white shadow-lg shadow-[#7C5CFF]/30">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="text-lg font-bold text-white tracking-tight">
            Nuzio AI
          </span>
        </div>

        {/* Heading & Subtitle */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight text-white leading-tight">
            Good morning.<br />
            <span className="text-[#7C5CFF] italic font-serif">News on go.</span>
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Stay ahead with real-time AI curated news feed tailored for you.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 flex flex-col gap-5 my-auto py-6">
        <form onSubmit={handleSignIn} className="flex flex-col gap-4">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <Input
            label="Email address"
            type="email"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft={<Mail className="w-4 h-4 text-[#9CA3AF]" />}
            required
            autoComplete="email"
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft={<Lock className="w-4 h-4 text-[#9CA3AF]" />}
            iconRight={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#9CA3AF] hover:text-white transition-colors focus:outline-none"
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            }
            required
            autoComplete="current-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={loading}
            className="mt-2 shadow-lg shadow-[#7C5CFF]/25"
          >
            Sign In
          </Button>
        </form>

        {/* Create Account Link */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#9CA3AF]">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="text-[#7C5CFF] hover:underline font-semibold transition-colors"
            >
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Terms & Privacy */}
      <div className="relative z-10 text-center pb-2">
        <p className="text-[11px] text-[#9CA3AF]/70 leading-relaxed">
          By signing in, you agree to our{" "}
          <a href="#" className="underline hover:text-[#9CA3AF]">
            Terms of Service
          </a>{" "}
          &{" "}
          <a href="#" className="underline hover:text-[#9CA3AF]">
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  );
}
