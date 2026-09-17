"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";
import { Sparkles, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle2 } from "lucide-react";

export default function SignUpPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    try {
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
      });

      if (authError) {
        setError(authError.message);
        setLoading(false);
        return;
      }

      if (data.user) {
        if (data.session) {
          window.location.href = "/onboarding/profession";
        } else {
          // Attempt automatic sign-in immediately so user doesn't have to re-enter email/password
          const { data: signInData } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (signInData?.session) {
            window.location.href = "/onboarding/profession";
          } else {
            setSuccessMsg(
              "Account created! If email confirmation is enabled on your Supabase project, please check your inbox, or click Sign In."
            );
            setLoading(false);
          }
        }
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
            Join Nuzio AI.<br />
            <span className="text-[#7C5CFF] italic font-serif">Stay informed.</span>
          </h1>
          <p className="text-xs text-[#9CA3AF] leading-relaxed">
            Create an account to unlock your personalized AI intelligence feed.
          </p>
        </div>
      </div>

      {/* Form Section */}
      <div className="relative z-10 flex flex-col gap-5 my-auto py-4">
        <form onSubmit={handleSignUp} className="flex flex-col gap-3.5">
          {error && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {successMsg && (
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-[#35E6B5]/15 border border-[#35E6B5]/30 text-[#35E6B5] text-xs">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-[#35E6B5]" />
              <span>{successMsg}</span>
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
            placeholder="At least 6 characters"
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
            autoComplete="new-password"
          />

          <Input
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            iconLeft={<Lock className="w-4 h-4 text-[#9CA3AF]" />}
            required
            autoComplete="new-password"
          />

          <Button
            type="submit"
            variant="primary"
            size="lg"
            fullWidth
            isLoading={loading}
            className="mt-2 shadow-lg shadow-[#7C5CFF]/25"
          >
            Create Account
          </Button>
        </form>

        {/* Already have an account link */}
        <div className="text-center pt-2">
          <p className="text-xs text-[#9CA3AF]">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#7C5CFF] hover:underline font-semibold transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>

      {/* Footer Terms & Privacy */}
      <div className="relative z-10 text-center pb-2">
        <p className="text-[11px] text-[#9CA3AF]/70 leading-relaxed">
          By signing up, you agree to our{" "}
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
