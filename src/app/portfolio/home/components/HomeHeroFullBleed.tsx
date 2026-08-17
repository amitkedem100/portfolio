"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { HomeHero } from "./HomeHero";
import type { HomeHeroContent } from "./homeHeroContent";

const FULLBLEED_SLOT_ID = "portfolio-fullbleed-slot";

type HomeHeroFullBleedProps = {
  content?: HomeHeroContent;
};

export function HomeHeroFullBleed({ content }: HomeHeroFullBleedProps) {
  const [slot, setSlot] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setSlot(document.getElementById(FULLBLEED_SLOT_ID));
  }, []);

  if (!slot) return null;
  return createPortal(<HomeHero content={content} />, slot);
}

