"use client";

import type { ReactNode } from "react";
import { createContext, useContext, useState } from "react";
import type { CursorVariant } from "../types/portfolio.types";

type CursorContextValue = {
  variant: CursorVariant;
  setVariant: (variant: CursorVariant) => void;
};

const CursorContext = createContext<CursorContextValue | undefined>(undefined);

type CursorContextProviderProps = {
  children: ReactNode;
};

export function CursorContextProvider({ children }: CursorContextProviderProps) {
  const [variant, setVariant] = useState<CursorVariant>("default");
  const value: CursorContextValue = { variant, setVariant };

  return (
    <CursorContext.Provider value={value}>{children}</CursorContext.Provider>
  );
}

export function useCursorContext() {
  const ctx = useContext(CursorContext);
  if (ctx === undefined) {
    throw new Error("useCursorContext must be used within CursorContextProvider");
  }
  return ctx;
}
