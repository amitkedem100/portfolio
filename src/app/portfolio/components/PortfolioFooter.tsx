import "./PortfolioFooter.css";

export function PortfolioFooter() {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-inner">
        <p className="portfolio-footer-text">
          © {new Date().getFullYear()} Portfolio
        </p>
      </div>
    </footer>
  );
}

