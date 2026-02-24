export function identityTitle(title: string) {
  return title;
}

export function firstTagOrNull(tags: string[]): string | null {
  if (tags.length === 0) {
    return null;
  }

  return tags[0] ?? null;
}

