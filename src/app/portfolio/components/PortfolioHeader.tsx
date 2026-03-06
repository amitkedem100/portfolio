"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import "./PortfolioHeader.css";
import { usePortfolioContext } from "../context/PortfolioContext";
import { CursorZone } from "./CursorZone";
import { ThemeToggle } from "./ThemeToggle";

export function PortfolioHeader() {
  const [menuOpen, setMenuOpen] = useState(false);

  const openMenu = () => setMenuOpen(true);
  const closeMenu = () => setMenuOpen(false);

  useEffect(() => {
    if (!menuOpen) return;
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [menuOpen]);

  const navLinks = (
    <>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="/portfolio/home" onClick={closeMenu}>Work</Link>
        </CursorZone>
      </li>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#about" onClick={closeMenu}>About</Link>
        </CursorZone>
      </li>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#contact" onClick={closeMenu}>Contact</Link>
        </CursorZone>
      </li>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#cv" onClick={closeMenu}>CV</Link>
        </CursorZone>
      </li>
    </>
  );

  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <div className="portfolio-header-brand">
          <CursorZone variant="large">
            <Link href="/portfolio/home" className="portfolio-header-logo-link" aria-label="Home">
              <svg
                className="portfolio-header-logo"
                width={40}
                height={40}
                viewBox="0 0 80 80"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden
              >
                <path
                  d="M55 45C56.8103 45 58.2206 45.7679 59.1562 46.9375C60.0716 48.0816 60.5 49.5636 60.5 51C60.5 52.4364 60.0716 53.9184 59.1562 55.0625C58.2206 56.2321 56.8103 57 55 57H33.4717C32.3356 57.0002 31.2972 57.6421 30.7891 58.6582L26 68.2363C25.1531 69.93 23.4219 70.9998 21.5283 71H3.50293L4.07617 69.6172L11.7959 51H13.9609L6.49707 69H21.5283C22.6644 68.9998 23.7028 68.3579 24.2109 67.3418L29 57.7637C29.8469 56.07 31.5781 55.0002 33.4717 55H55C56.1897 55 57.0294 54.5179 57.5938 53.8125C58.1784 53.0816 58.5 52.0636 58.5 51C58.5 49.9364 58.1784 48.9184 57.5938 48.1875C57.0294 47.4821 56.1897 47 55 47H14C13.4477 47 13 46.5523 13 46C13 45.4477 13.4477 45 14 45H55ZM45.4141 9C47.3815 9.00016 49.1663 10.1541 49.9736 11.9482L75.9121 69.5898L76.5469 71H59.5342C57.5986 70.9999 55.839 69.8826 55.0137 68.1328V68.1318L50.6309 59H52.8486L56.8193 67.2734L56.8223 67.2793C57.3178 68.3298 58.3736 68.9999 59.5342 69H73.4531L48.1494 12.7686C47.665 11.6923 46.5943 11.0002 45.4141 11H32.667C31.9342 11 31.2445 11.267 30.7109 11.7256C33.7501 18.1736 37.2994 25.7732 40.4414 32.4912C42.2858 36.4349 43.9903 40.0743 45.3701 43H43.1611C42.0724 40.6876 40.8071 37.9911 39.4482 35.0869L36.3691 40.4951L36.0811 41H12C11.4477 41 11 40.5523 11 40C11 39.4477 11.4477 39 12 39H34.9189L38.4102 32.8691C35.5239 26.6975 32.3183 19.8354 29.4893 13.8252L23.583 28H21.417L28.0518 12.0771C28.1915 11.7417 28.3655 11.4272 28.5684 11.1367C28.6385 10.9568 28.7607 10.7972 28.9258 10.6816C29.858 9.63111 31.2111 9 32.667 9H45.4141ZM10 45C10.5523 45 11 45.4477 11 46C11 46.5523 10.5523 47 10 47H5.5C4.94772 47 4.5 46.5523 4.5 46C4.5 45.4477 4.94772 45 5.5 45H10ZM8 39C8.55228 39 9 39.4477 9 40C9 40.5523 8.55228 41 8 41H3.5C2.94772 41 2.5 40.5523 2.5 40C2.5 39.4477 2.94772 39 3.5 39H8ZM12.5 33C13.0523 33 13.5 33.4477 13.5 34C13.5 34.5523 13.0523 35 12.5 35H12C11.4477 35 11 34.5523 11 34C11 33.4477 11.4477 33 12 33H12.5ZM24.5 33C25.0523 33 25.5 33.4477 25.5 34C25.5 34.5523 25.0523 35 24.5 35H16.5C15.9477 35 15.5 34.5523 15.5 34C15.5 33.4477 15.9477 33 16.5 33H24.5Z"
                  fill="currentColor"
                />
              </svg>
            </Link>
          </CursorZone>
        </div>
        <div className="portfolio-header-theme">
          <CursorZone variant="large">
            <ThemeToggle />
          </CursorZone>
        </div>
        <nav
          className="portfolio-header-nav"
          aria-label="Portfolio navigation"
        >
          <ul className="portfolio-header-nav-list">
            {navLinks}
          </ul>
          <button
            type="button"
            className="portfolio-header-menu-btn"
            onClick={openMenu}
            aria-label="Open menu"
            aria-expanded={menuOpen}
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fillRule="evenodd"
                fill="currentColor"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5"
              />
            </svg>
          </button>
        </nav>
      </div>

      {/* Mobile menu overlay and panel */}
      <div
        className="portfolio-header-menu-overlay"
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />
      <div
        className="portfolio-header-menu-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!menuOpen}
        data-open={menuOpen}
      >
        <div className="portfolio-header-menu-panel-inner">
          <button
            type="button"
            className="portfolio-header-menu-close"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg
              width={24}
              height={24}
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden
            >
              <path
                fill="currentColor"
                d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z"
              />
            </svg>
          </button>
          <ul className="portfolio-header-menu-list">
            {navLinks}
          </ul>
        </div>
      </div>
    </header>
  );
}

