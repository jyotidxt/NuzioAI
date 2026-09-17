"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex-1 flex flex-col items-center justify-center p-6 text-center bg-[#050505] text-white">
      <h2 className="text-2xl font-bold mb-2">Page Not Found</h2>
      <p className="text-xs text-[#9CA3AF] mb-4">Could not find requested resource</p>
      <Link href="/splash" className="text-xs text-[#7C5CFF] underline">
        Return to App
      </Link>
    </div>
  );
}
