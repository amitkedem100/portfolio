"use client";

import type { ReactNode } from "react";
import { useCursorContext } from "../context/CursorContext";
import type { CursorVariant } from "../types/portfolio.types";

type CursorZoneProps = {
  variant: CursorVariant;
  children: ReactNode;
};

export function CursorZone({ variant, children }: CursorZoneProps) {
  const { setVariant } = useCursorContext();

  return (
    <div
      onMouseEnter={() => setVariant(variant)}
      onMouseLeave={() => setVariant("default")}
    >
      {children}
    </div>
  );
}
