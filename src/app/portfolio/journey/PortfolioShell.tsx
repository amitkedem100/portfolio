"use client";

import type { ReactNode } from "react";
import "../portfolio.css";
import { PortfolioLayout } from "../components/PortfolioLayout";
import { CursorContextProvider } from "../context/CursorContext";
import { PortfolioContextProvider } from "../context/PortfolioContext";
import { PortfolioJourneyProvider } from "./PortfolioJourneyProvider";

type PortfolioShellProps = {
  children: ReactNode;
};

export function PortfolioShell({ children }: PortfolioShellProps) {
  return (
    <PortfolioContextProvider>
      <CursorContextProvider>
        <PortfolioJourneyProvider>
          <div className="portfolio-page">
            <PortfolioLayout>{children}</PortfolioLayout>
          </div>
        </PortfolioJourneyProvider>
      </CursorContextProvider>
    </PortfolioContextProvider>
  );
}
