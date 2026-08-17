import type { ReactNode } from "react";
import { PortfolioShell } from "./journey/PortfolioShell";

type PortfolioRootLayoutProps = {
  children: ReactNode;
};

export default function PortfolioRootLayout({
  children,
}: PortfolioRootLayoutProps) {
  return <PortfolioShell>{children}</PortfolioShell>;
}
