"use client";

import { useState, useEffect, useLayoutEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import "./PortfolioHeader.css";
import { CursorZone } from "./CursorZone";
import { ThemeToggle } from "./ThemeToggle";
import { SELECTED_WORK_SCROLL_FLAG_KEY } from "@/app/portfolio/home/ScrollToSelectedWork";
import { scrollToSelectedWorkWithAnimation } from "@/app/portfolio/home/scrollToSelectedWork.utils";

/* Cumulative scroll deltas — short downward burst hides bar; shorter upward burst shows (any page depth). */
const SCROLL_DOWN_TO_HIDE_PX = 56;
const SCROLL_UP_TO_SHOW_PX = 28;
const SCROLL_NEAR_TOP_PX = 12;

const HOME_PATH = "/portfolio/home";

const WORK_PROJECTS = [
  { label: "Astra", href: "/portfolio/saas" },
  { label: "Basilar", href: "/portfolio/basilar" },
] as const;

function isWorkProjectPathActive(pathname: string, projectHref: string) {
  return pathname === projectHref || pathname.startsWith(`${projectHref}/`);
}

function workProjectLinkClass(pathname: string, projectHref: string) {
  return [
    "portfolio-header-work-dropdown-link",
    isWorkProjectPathActive(pathname, projectHref) && "portfolio-header-work-dropdown-link--current",
  ]
    .filter(Boolean)
    .join(" ");
}

export function PortfolioHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [workDropdownOpen, setWorkDropdownOpen] = useState(false);
  const [retracted, setRetracted] = useState(false);
  const [menuPortalEl, setMenuPortalEl] = useState<HTMLElement | null>(null);
  const lastScrollY = useRef(0);
  const trendPx = useRef(0);
  const workDropdownLeaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const closeWorkDropdown = useCallback(() => {
    if (workDropdownLeaveTimer.current) {
      clearTimeout(workDropdownLeaveTimer.current);
      workDropdownLeaveTimer.current = null;
    }
    setWorkDropdownOpen(false);
  }, []);

  const openWorkDropdown = useCallback(() => {
    if (workDropdownLeaveTimer.current) {
      clearTimeout(workDropdownLeaveTimer.current);
      workDropdownLeaveTimer.current = null;
    }
    setWorkDropdownOpen(true);
  }, []);

  const scheduleCloseWorkDropdown = useCallback(() => {
    if (workDropdownLeaveTimer.current) {
      clearTimeout(workDropdownLeaveTimer.current);
      workDropdownLeaveTimer.current = null;
    }
    workDropdownLeaveTimer.current = setTimeout(() => setWorkDropdownOpen(false), 200);
  }, []);

  /* :focus-within on the panel kept it visible after click because focus stayed on the Link. */
  const handleWorkAreaBlur = useCallback(
    (e: React.FocusEvent<HTMLDivElement>) => {
      const next = e.relatedTarget as Node | null;
      if (next && e.currentTarget.contains(next)) return;
      scheduleCloseWorkDropdown();
    },
    [scheduleCloseWorkDropdown]
  );

  useEffect(
    () => () => {
      if (workDropdownLeaveTimer.current) {
        clearTimeout(workDropdownLeaveTimer.current);
      }
    },
    []
  );

  useEffect(() => {
    closeWorkDropdown();
  }, [pathname, closeWorkDropdown]);

  useEffect(() => {
    if (!workDropdownOpen) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeWorkDropdown();
    };
    document.addEventListener("keydown", onEscape);
    return () => document.removeEventListener("keydown", onEscape);
  }, [workDropdownOpen, closeWorkDropdown]);

  const handleWorkNavClick = () => {
    if (pathname === HOME_PATH) {
      scrollToSelectedWorkWithAnimation(1050);
      return;
    }
    try {
      sessionStorage.setItem(SELECTED_WORK_SCROLL_FLAG_KEY, "1");
    } catch {
      /* private / blocked storage */
    }
    router.push(HOME_PATH);
  };

  /* Portal keeps fixed overlay/panel under the viewport; header transform would otherwise clip fixed to the bar. */
  useLayoutEffect(() => {
    setMenuPortalEl(document.body);
  }, []);

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

  /* Block document scroll while mobile menu is open (overlay/panel are portaled to body). */
  useLayoutEffect(() => {
    if (!menuOpen) return;
    const html = document.documentElement;
    const prev = {
      htmlOverflow: html.style.overflow,
      htmlOverscroll: html.style.overscrollBehavior,
      bodyOverflow: document.body.style.overflow,
      bodyOverscroll: document.body.style.overscrollBehavior,
    };
    html.style.overflow = "hidden";
    html.style.overscrollBehavior = "none";
    document.body.style.overflow = "hidden";
    document.body.style.overscrollBehavior = "none";
    return () => {
      html.style.overflow = prev.htmlOverflow;
      html.style.overscrollBehavior = prev.htmlOverscroll;
      document.body.style.overflow = prev.bodyOverflow;
      document.body.style.overscrollBehavior = prev.bodyOverscroll;
    };
  }, [menuOpen]);

  /* Keep global accent for custom cursor while pointer is in header (project --cursor-accent applies below) */
  useEffect(() => {
    return () => {
      document.documentElement.removeAttribute("data-cursor-global-accent");
    };
  }, []);

  const handleHeaderPointerEnter = () => {
    document.documentElement.setAttribute("data-cursor-global-accent", "");
  };

  const handleHeaderPointerLeave = () => {
    document.documentElement.removeAttribute("data-cursor-global-accent");
  };

  useEffect(() => {
    if (menuOpen) {
      setRetracted(false);
      trendPx.current = 0;
    }
  }, [menuOpen]);

  useEffect(() => {
    lastScrollY.current = typeof window !== "undefined" ? window.scrollY : 0;

    const onScroll = () => {
      if (menuOpen) return;

      const y = window.scrollY ?? document.documentElement.scrollTop;

      if (y < SCROLL_NEAR_TOP_PX) {
        setRetracted(false);
        trendPx.current = 0;
        lastScrollY.current = y;
        return;
      }

      const dy = y - lastScrollY.current;
      lastScrollY.current = y;
      if (dy === 0) return;

      if (dy > 0) {
        if (trendPx.current >= 0) trendPx.current += dy;
        else trendPx.current = dy;
        if (trendPx.current >= SCROLL_DOWN_TO_HIDE_PX) {
          setRetracted(true);
          trendPx.current = 0;
        }
      } else {
        if (trendPx.current <= 0) trendPx.current += dy;
        else trendPx.current = dy;
        if (trendPx.current <= -SCROLL_UP_TO_SHOW_PX) {
          setRetracted(false);
          trendPx.current = 0;
        }
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [menuOpen]);

  const desktopWorkNav = (
    <li className="portfolio-header-nav-item portfolio-header-nav-item--work">
      <div
        className={`portfolio-header-work${workDropdownOpen ? " portfolio-header-work--dropdown-open" : ""}`}
        onPointerEnter={openWorkDropdown}
        onPointerLeave={scheduleCloseWorkDropdown}
        onFocusCapture={openWorkDropdown}
        onBlur={handleWorkAreaBlur}
      >
        <CursorZone variant="large">
          <button
            type="button"
            className="portfolio-header-work-trigger"
            aria-haspopup="menu"
            aria-expanded={workDropdownOpen}
            onClick={() => {
              handleWorkNavClick();
              closeWorkDropdown();
            }}
          >
            Work
          </button>
        </CursorZone>
        <div className="portfolio-header-work-dropdown" role="menu" aria-label="Projects">
          {WORK_PROJECTS.map((p) => (
            <CursorZone variant="large" key={p.href}>
              <Link
                href={p.href}
                className={workProjectLinkClass(pathname, p.href)}
                role="menuitem"
                onClick={(e) => {
                  if (isWorkProjectPathActive(pathname, p.href)) {
                    e.preventDefault();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }
                  closeWorkDropdown();
                }}
              >
                {p.label}
              </Link>
            </CursorZone>
          ))}
        </div>
      </div>
    </li>
  );

  const navLinksSecondary = (
    <>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#about" onClick={closeMenu}>
            About
          </Link>
        </CursorZone>
      </li>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#contact" onClick={closeMenu}>
            Contact
          </Link>
        </CursorZone>
      </li>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#cv" onClick={closeMenu}>
            CV
          </Link>
        </CursorZone>
      </li>
    </>
  );

  const mobileMenuNav = (
    <ul className="portfolio-header-menu-list">
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link
            href="/portfolio/home"
            onClick={() => {
              closeMenu();
              closeWorkDropdown();
            }}
          >
            Home
          </Link>
        </CursorZone>
      </li>
      <li className="portfolio-header-menu-group portfolio-header-menu-group--work">
        <button
          type="button"
          className="portfolio-header-menu-work-trigger"
          onClick={() => {
            handleWorkNavClick();
            closeMenu();
          }}
        >
          Work
        </button>
        <ul className="portfolio-header-menu-work-list" aria-label="Projects">
          {WORK_PROJECTS.map((p) => (
            <li key={p.href} className="portfolio-header-menu-work-item">
              <CursorZone variant="large">
                <Link
                  href={p.href}
                  className={workProjectLinkClass(pathname, p.href)}
                  onClick={(e) => {
                    if (isWorkProjectPathActive(pathname, p.href)) {
                      e.preventDefault();
                      window.scrollTo({ top: 0, behavior: "smooth" });
                    }
                    closeMenu();
                    closeWorkDropdown();
                  }}
                >
                  {p.label}
                </Link>
              </CursorZone>
            </li>
          ))}
        </ul>
      </li>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#about" onClick={closeMenu}>
            About
          </Link>
        </CursorZone>
      </li>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#contact" onClick={closeMenu}>
            Contact
          </Link>
        </CursorZone>
      </li>
      <li className="portfolio-header-nav-item">
        <CursorZone variant="large">
          <Link href="#cv" onClick={closeMenu}>
            CV
          </Link>
        </CursorZone>
      </li>
    </ul>
  );

  return (
    <header
      className={`portfolio-header${retracted ? " portfolio-header--retracted" : ""}`}
      onPointerEnter={handleHeaderPointerEnter}
      onPointerLeave={handleHeaderPointerLeave}
    >
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
            {desktopWorkNav}
            {navLinksSecondary}
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

       {menuPortalEl
        ? createPortal(
            <>
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
                  {mobileMenuNav}
                </div>
              </div>
            </>,
            menuPortalEl
          )
        : null}
    </header>
  );
}

