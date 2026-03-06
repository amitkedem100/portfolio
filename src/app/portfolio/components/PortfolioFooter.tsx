import "./PortfolioFooter.css";

export function PortfolioFooter() {
  return (
    <footer className="portfolio-footer">
      <div className="portfolio-footer-inner">
        <p className="portfolio-footer-text">
          © {new Date().getFullYear()} Designed & built by Amit Kedem
        </p>
      </div>
    </footer>
  );
}

