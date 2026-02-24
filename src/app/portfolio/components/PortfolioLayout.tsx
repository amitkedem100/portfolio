import type { ReactNode } from "react";
import "./PortfolioLayout.css";
import { PortfolioHeader } from "./PortfolioHeader";
import { PortfolioFooter } from "./PortfolioFooter";

type PortfolioLayoutProps = {
  children: ReactNode;
};

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="portfolio-layout">
      <PortfolioHeader />
      <main className="portfolio-layout-main" role="main">
        {children}
      </main>
      <PortfolioFooter />
    </div>
  );
}

