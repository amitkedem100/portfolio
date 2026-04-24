import type { ReactNode } from "react";
import "./HeroKeywordBadge.css";

type HeroKeywordBadgeProps = {
  children: ReactNode;
};

export function HeroKeywordBadge({ children }: HeroKeywordBadgeProps) {
  return <span className="hero-keyword-badge">{children}</span>;
}

