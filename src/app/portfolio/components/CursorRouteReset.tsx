"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useCursorContext } from "../context/CursorContext";

/* Reset cursor variant on route change; scope project cursor accents on document root */
export function CursorRouteReset() {
  const pathname = usePathname();
  const { setVariant } = useCursorContext();

  useEffect(() => {
    setVariant("default");

    const isBasilar =
      pathname === "/portfolio/basilar" ||
      pathname.startsWith("/portfolio/basilar/");
    const isSaas =
      pathname === "/portfolio/saas" ||
      pathname.startsWith("/portfolio/saas/");
    document.documentElement.classList.toggle("basilar-project", isBasilar);
    document.documentElement.classList.toggle("saas-project", isSaas);

    return () => {
      document.documentElement.classList.remove("basilar-project");
      document.documentElement.classList.remove("saas-project");
    };
  }, [pathname, setVariant]);

  return null;
}
