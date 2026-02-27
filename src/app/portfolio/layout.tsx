import type { ReactNode } from "react";
import "./portfolio.css";
import { PortfolioLayout } from "./components/PortfolioLayout";
import { PortfolioContextProvider } from "./context/PortfolioContext";

type PortfolioRootLayoutProps = {
  children: ReactNode;
};

export default function PortfolioRootLayout({
  children,
}: PortfolioRootLayoutProps) {
  return (
    <PortfolioContextProvider>
      <div className="portfolio-page">
        <PortfolioLayout>{children}</PortfolioLayout>
      </div>
    </PortfolioContextProvider>
  );
}

