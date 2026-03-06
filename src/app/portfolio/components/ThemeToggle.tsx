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
    <div
      className="theme-toggle-track"
      data-state={isLight ? "light" : "dark"}
      role="presentation"
    >
      <button
        type="button"
        className="theme-toggle"
        onClick={handleClick}
        aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
        title={isLight ? "Switch to dark mode" : "Switch to light mode"}
      >
        {isLight ? (
          <span className="theme-toggle-icon theme-toggle-sun" aria-hidden />
        ) : (
          <span className="theme-toggle-icon theme-toggle-moon" aria-hidden />
        )}
      </button>
    </div>
  );
}
