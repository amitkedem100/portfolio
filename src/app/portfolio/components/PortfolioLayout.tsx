import type { ReactNode } from "react";
import "./PortfolioLayout.css";
import { PortfolioCursor } from "./PortfolioCursor";
import { PortfolioFooter } from "./PortfolioFooter";
import { PortfolioHeader } from "./PortfolioHeader";

type PortfolioLayoutProps = {
  children: ReactNode;
};

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="portfolio-layout layout-grid">
      <PortfolioCursor />
      <PortfolioHeader />
      <main className="portfolio-layout-main" role="main">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  );
}

