"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HomeHero } from "./HomeHero";

const FULLBLEED_SLOT_ID = "portfolio-fullbleed-slot";

export function HomeHeroFullBleed() {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById(FULLBLEED_SLOT_ID));
  }, []);

  if (!slot) return null;
  return createPortal(<HomeHero />, slot);
}

