import type { ReactNode } from "react";
import "./HeroKeywordBadge.css";

type HeroKeywordBadgeProps = {
  children: ReactNode;
  tone?: "ux" | "systems" | "ai" | "ui" | "code" | "yellow" | "orange" | "red";
  /** Inline sentence use (Hero supporting copy). Default keeps contact/workspace sizing. */
  variant?: "default" | "inline";
};

export function HeroKeywordBadge({
  children,
  tone = "ux",
  variant = "default",
}: HeroKeywordBadgeProps) {
  const variantClass =
    variant === "inline" ? " hero-keyword-badge--inline" : "";

  return (
    <span
      className={`hero-keyword-badge hero-keyword-badge--${tone}${variantClass}`}
    >
      {children}
    </span>
  );
}
