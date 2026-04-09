import type { ReactNode } from "react";
import "./PortfolioLayout.css";
import { CursorRouteReset } from "./CursorRouteReset";
import { PortfolioCursor } from "./PortfolioCursor";
import { PortfolioFooter } from "./PortfolioFooter";
import { PortfolioHeader } from "./PortfolioHeader";
import { ProjectPageLoader } from "./ProjectPageLoader";

type PortfolioLayoutProps = {
  children: ReactNode;
};

export function PortfolioLayout({ children }: PortfolioLayoutProps) {
  return (
    <div className="portfolio-layout layout-grid">
      <CursorRouteReset />
      <PortfolioCursor />
      <PortfolioHeader />
      <main className="portfolio-layout-main" role="main">
        <ProjectPageLoader>{children}</ProjectPageLoader>
      </main>
      <PortfolioFooter />
    </div>
  );
}

