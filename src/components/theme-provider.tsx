"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark";

interface ThemeContextType {
  theme: Theme;
  tokens: {
    background: string;
    surface: string;
    card: string;
    primary: string;
    accent: string;
    textPrimary: string;
    textSecondary: string;
    border: string;
    radius: string;
    font: string;
  };
}

const defaultTokens = {
  background: "#050505",
  surface: "#111111",
  card: "#181818",
  primary: "#7C5CFF",
  accent: "#35E6B5",
  textPrimary: "#FFFFFF",
  textSecondary: "#9CA3AF",
  border: "rgba(255, 255, 255, 0.08)",
  radius: "24px",
  font: "Inter",
};

const ThemeContext = createContext<ThemeContextType>({
  theme: "dark",
  tokens: defaultTokens,
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    document.documentElement.classList.add("dark");
  }, []);

  return (
    <ThemeContext.Provider value={{ theme: "dark", tokens: defaultTokens }}>
      <div className="dark bg-[#050505] text-white min-h-screen font-sans antialiased selection:bg-[#7C5CFF]/30 selection:text-white">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
