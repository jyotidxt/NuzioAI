"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function RootPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/splash");
  }, [router]);

  return (
    <div className="flex-1 flex items-center justify-center bg-[#050505] text-white">
      <div className="w-6 h-6 border-2 border-[#7C5CFF] border-t-transparent rounded-full animate-spin" />
    </div>
  );
}
