import Link from "next/link";
import "./PortfolioHeader.css";

export function PortfolioHeader() {
  return (
    <header className="portfolio-header">
      <div className="portfolio-header-inner">
        <div className="portfolio-header-brand">
          <span className="portfolio-header-title">Portfolio</span>
        </div>
        <nav
          className="portfolio-header-nav"
          aria-label="Portfolio navigation"
        >
          <ul className="portfolio-header-nav-list">
            <li className="portfolio-header-nav-item">
              <Link href="/portfolio/home">Home</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

