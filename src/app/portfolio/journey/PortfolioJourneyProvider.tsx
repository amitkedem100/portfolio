"use client";

import { createContext, Suspense, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import {
  JOURNEY_FROM_PARAM,
  isGenericHomePath,
  originFromPathname,
  resolveOrigin,
  type JourneyOrigin,
} from "./portfolioJourney";
import {
  clearJourneySession,
  readJourneySession,
  writeJourneySession,
} from "./journeySession";

type PortfolioJourneyContextValue = {
  origin: JourneyOrigin | null;
  ready: boolean;
};

const PortfolioJourneyContext = createContext<PortfolioJourneyContextValue>({
  origin: null,
  ready: false,
});

type PortfolioJourneyProviderProps = {
  children: ReactNode;
};

function PathJourneyProvider({
  children,
  pathOrigin,
}: {
  children: ReactNode;
  pathOrigin: JourneyOrigin | null;
}) {
  useEffect(() => {
    if (pathOrigin) {
      writeJourneySession(pathOrigin);
      return;
    }
    clearJourneySession();
  }, [pathOrigin]);

  const value = useMemo(
    () => ({ origin: pathOrigin, ready: true }),
    [pathOrigin]
  );

  return (
    <PortfolioJourneyContext.Provider value={value}>
      {children}
    </PortfolioJourneyContext.Provider>
  );
}

function SearchParamsJourneyProvider({
  children,
  pathname,
}: {
  children: ReactNode;
  pathname: string;
}) {
  const searchParams = useSearchParams();
  const fromPresent = searchParams.has(JOURNEY_FROM_PARAM);
  const fromValue = searchParams.get(JOURNEY_FROM_PARAM) ?? "";
  const [sessionOrigin, setSessionOrigin] = useState<JourneyOrigin | null>(null);

  useEffect(() => {
    const stored = readJourneySession();
    const frame = window.requestAnimationFrame(() => {
      setSessionOrigin(stored);
    });
    return () => window.cancelAnimationFrame(frame);
  }, [pathname]);

  const resolved = useMemo(
    () =>
      resolveOrigin({
        pathname,
        fromPresent,
        fromValue,
        sessionOrigin,
      }),
    [fromPresent, fromValue, pathname, sessionOrigin]
  );

  useEffect(() => {
    if (resolved.sessionAction === "write" && resolved.origin) {
      writeJourneySession(resolved.origin);
      return;
    }
    if (resolved.sessionAction === "clear") {
      clearJourneySession();
    }
  }, [resolved.origin, resolved.sessionAction]);

  const value = useMemo(
    () => ({ origin: resolved.origin, ready: true }),
    [resolved.origin]
  );

  return (
    <PortfolioJourneyContext.Provider value={value}>
      {children}
    </PortfolioJourneyContext.Provider>
  );
}

export function PortfolioJourneyProvider({ children }: PortfolioJourneyProviderProps) {
  const pathname = usePathname() ?? "/";
  const pathOrigin = originFromPathname(pathname);

  if (pathOrigin || isGenericHomePath(pathname)) {
    return <PathJourneyProvider pathOrigin={pathOrigin}>{children}</PathJourneyProvider>;
  }

  return (
    <Suspense
      fallback={
        <PortfolioJourneyContext.Provider value={{ origin: null, ready: false }}>
          {children}
        </PortfolioJourneyContext.Provider>
      }
    >
      <SearchParamsJourneyProvider pathname={pathname}>
        {children}
      </SearchParamsJourneyProvider>
    </Suspense>
  );
}

export function usePortfolioJourney(): PortfolioJourneyContextValue {
  return useContext(PortfolioJourneyContext);
}
