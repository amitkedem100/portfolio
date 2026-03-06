import type { ReactNode } from "react";
import "./portfolio.css";
import { PortfolioLayout } from "./components/PortfolioLayout";
import { CursorContextProvider } from "./context/CursorContext";
import { PortfolioContextProvider } from "./context/PortfolioContext";

type PortfolioRootLayoutProps = {
  children: ReactNode;
};

export default function PortfolioRootLayout({
  children,
}: PortfolioRootLayoutProps) {
  return (
    <PortfolioContextProvider>
      <CursorContextProvider>
        <div className="portfolio-page">
          <PortfolioLayout>{children}</PortfolioLayout>
        </div>
      </CursorContextProvider>
    </PortfolioContextProvider>
  );
}

