export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
};

export type Project = ProjectMeta & {
  content: string;
};

/** Custom cursor variant (desktop-only). Extensible for future e.g. "button". */
export type CursorVariant = "default" | "large" | "hidden";

