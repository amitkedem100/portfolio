export type ProjectMeta = {
  slug: string;
  title: string;
  summary: string;
  tags: string[];
};

export type Project = ProjectMeta & {
  content: string;
};

