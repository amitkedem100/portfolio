"use client";

import "./ThemeToggle.css";
import { usePortfolioContext } from "../context/PortfolioContext";

export function ThemeToggle() {
  const ctx = usePortfolioContext();
  const theme = ctx?.theme ?? "light";
  const setTheme = ctx?.setTheme ?? (() => {});

  const isLight = theme === "light";
  const handleClick = () => setTheme(isLight ? "dark" : "light");

  return (
    <button
      type="button"
      className="theme-toggle-track"
      data-state={isLight ? "light" : "dark"}
      onClick={handleClick}
      aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
      title={isLight ? "Switch to dark mode" : "Switch to light mode"}
    >
      <span className="theme-toggle" aria-hidden>
        {isLight ? (
          <span className="theme-toggle-icon theme-toggle-sun" aria-hidden />
        ) : (
          <span className="theme-toggle-icon theme-toggle-moon" aria-hidden />
        )}
      </span>
    </button>
  );
}
