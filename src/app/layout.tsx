import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nuzio AI — Premium Dark Mobile App",
  description: "Phase 1 Foundation Design System & Components for Nuzio AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`dark ${inter.variable}`} suppressHydrationWarning>
      <body className="bg-[#050505] text-white flex justify-center items-center min-h-screen antialiased selection:bg-[#7C5CFF]/30" suppressHydrationWarning>
        <ThemeProvider>
          {/* Mobile-first viewport container (390 x 844 ratio frame on desktop, full width on mobile) */}
          <div className="w-full max-w-[390px] min-h-screen sm:min-h-[844px] sm:h-[844px] bg-[#050505] sm:border sm:border-white/[0.08] sm:rounded-[36px] sm:shadow-2xl sm:shadow-[#7C5CFF]/10 relative flex flex-col overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
