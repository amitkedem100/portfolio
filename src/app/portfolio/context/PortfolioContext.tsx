"use client";

import type { ReactNode } from "react";
import { createContext, useContext } from "react";

type PortfolioContextValue = Record<string, never>;

const PortfolioContext = createContext<PortfolioContextValue | undefined>(
  undefined,
);

type PortfolioContextProviderProps = {
  children: ReactNode;
};

export function PortfolioContextProvider({
  children,
}: PortfolioContextProviderProps) {
  const value: PortfolioContextValue = {};

  return (
    <PortfolioContext.Provider value={value}>
      {children}
    </PortfolioContext.Provider>
  );
}

export function usePortfolioContext() {
  return useContext(PortfolioContext);
}

