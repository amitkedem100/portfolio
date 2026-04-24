import type { ReactNode } from "react";
import "./HeroKeywordBadge.css";

type HeroKeywordBadgeProps = {
  children: ReactNode;
  tone?: "ux" | "systems" | "ai" | "code";
};

export function HeroKeywordBadge({
  children,
  tone = "ux",
}: HeroKeywordBadgeProps) {
  return (
    <span className={`hero-keyword-badge hero-keyword-badge--${tone}`}>
      {children}
    </span>
  );
}

