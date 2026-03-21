"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCursorContext } from "../context/CursorContext";

/* Reset cursor variant on route change; scope Basilar cursor accent on document root (cursor is outside page DOM) */
export function CursorRouteReset() {
  const pathname = usePathname();
  const { setVariant } = useCursorContext();

  useEffect(() => {
    setVariant("default");

    const isBasilar =
      pathname === "/portfolio/basilar" ||
      pathname.startsWith("/portfolio/basilar/");
    document.documentElement.classList.toggle("basilar-project", isBasilar);

    return () => {
      document.documentElement.classList.remove("basilar-project");
    };
  }, [pathname, setVariant]);

  return null;
}
