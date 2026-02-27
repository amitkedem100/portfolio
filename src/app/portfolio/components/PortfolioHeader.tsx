"use client";

import Link from "next/link";
import Image from "next/image";
import "./PortfolioHeader.css";
import { usePortfolioContext } from "../context/PortfolioContext";

export function PortfolioHeader() {
  const { theme, setTheme } = usePortfolioContext();

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <div className="portfolio-header-brand">
          <Link href="/portfolio/home" className="portfolio-header-logo-link" aria-label="Home">
            <Image
              src="/AmitDesignLogo.svg"
              alt=""
              width={40}
              height={40}
              className="portfolio-header-logo"
            />
          </Link>
        </div>
        <div className="portfolio-header-theme">
          <button
            type="button"
            className="portfolio-header-theme-btn"
            onClick={toggleTheme}
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>
        <nav
          className="portfolio-header-nav"
          aria-label="Portfolio navigation"
        >
          <ul className="portfolio-header-nav-list">
            <li className="portfolio-header-nav-item">
              <Link href="/portfolio/home">Work</Link>
            </li>
            <li className="portfolio-header-nav-item">
              <Link href="#about">About</Link>
            </li>
            <li className="portfolio-header-nav-item">
              <Link href="#contact">Contact</Link>
            </li>
            <li className="portfolio-header-nav-item">
              <Link href="#cv">CV</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

