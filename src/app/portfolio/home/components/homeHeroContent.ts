import type { JourneyOrigin } from "@/app/portfolio/journey/portfolioJourney";
import type { HeroKeywordTone } from "./HeroKeywordBadge";

export type HomeHeroSupportingPart =
  | { type: "text"; value: string }
  | { type: "keyword"; value: string; tone: HeroKeywordTone };

export type HomeHeroContent = {
  headlineLead: string;
  /* Shown after a desktop-only line break, matching the homepage headline rhythm. */
  headlineTail?: string;
  supporting: HomeHeroSupportingPart[];
};

export const DEFAULT_HOME_HERO_CONTENT: HomeHeroContent = {
  headlineLead: "I’m Amit, a Product Designer crafting clear",
  headlineTail: "digital experiences.",
  supporting: [
    {
      type: "text",
      value: "My work spans discovery through delivery, combining ",
    },
    { type: "keyword", value: "UX UI", tone: "ui" },
    { type: "text", value: ", " },
    { type: "keyword", value: "Systems", tone: "systems" },
    { type: "text", value: " thinking, and " },
    { type: "keyword", value: "AI", tone: "ai" },
    {
      type: "text",
      value:
        " to create useful, scalable products that work for both businesses and the people who use them.",
    },
  ],
};

export const NICHE_HOME_HERO_CONTENT: Partial<
  Record<JourneyOrigin, HomeHeroContent>
> = {
  "product-operations": {
    headlineLead: "Product thinking for better",
    headlineTail: "systems and ways of working.",
    supporting: [
      {
        type: "text",
        value:
          "I work across product, operations, and design, combining ",
      },
      { type: "keyword", value: "Product Operations", tone: "ui" },
      { type: "text", value: ", " },
      { type: "keyword", value: "Complex Systems", tone: "systems" },
      { type: "text", value: ", and " },
      { type: "keyword", value: "AI Workflows", tone: "ai" },
      {
        type: "text",
        value:
          " to connect user and business needs and turn operational challenges into practical solutions.",
      },
    ],
  },
  "customer-operations": {
    headlineLead: "Helping customers succeed with",
    headlineTail: "complex digital products.",
    supporting: [
      { type: "text", value: "I combine " },
      { type: "keyword", value: "Customer Support", tone: "ux" },
      { type: "text", value: " experience with " },
      { type: "keyword", value: "Product Thinking", tone: "systems" },
      { type: "text", value: " and " },
      { type: "keyword", value: "B2B SaaS", tone: "ui" },
      {
        type: "text",
        value:
          " to guide users, solve operational challenges, and turn feedback into practical improvements.",
      },
    ],
  },
  "ai-workflows": {
    headlineLead: "Making AI useful in",
    headlineTail: "real product workflows.",
    supporting: [
      { type: "text", value: "I apply " },
      { type: "keyword", value: "AI Workflows", tone: "ai" },
      { type: "text", value: " across " },
      { type: "keyword", value: "User Research", tone: "ux" },
      { type: "text", value: ", documentation, " },
      { type: "keyword", value: "Product Thinking", tone: "systems" },
      {
        type: "text",
        value:
          ", prototyping, and execution to build clearer and more efficient ways of working.",
      },
    ],
  },
};
