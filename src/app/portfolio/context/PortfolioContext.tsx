"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState, useEffect } from "react";

export type Theme = "light" | "dark";

type PortfolioContextValue = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const PortfolioContext = createContext<PortfolioContextValue | undefined>(
  undefined,
);

type PortfolioContextProviderProps = {
  children: ReactNode;
};

export function PortfolioContextProvider({
  children,
}: PortfolioContextProviderProps) {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  const value: PortfolioContextValue = { theme, setTheme };

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  return useContext(PortfolioContext);
}

