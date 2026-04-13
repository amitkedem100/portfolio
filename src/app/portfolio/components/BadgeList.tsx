import "./BadgeList.css";

type BadgeListProps = {
  items: string[];
  className?: string;
};

export function splitBadges(raw: string): string[] {
  return raw
    .split("·")
    .map((part) => part.trim())
    .filter(Boolean);
}

export function BadgeList({ items, className = "" }: BadgeListProps) {
  if (items.length === 0) return null;

  return (
    <ul className={`badge-list ${className}`.trim()}>
      {items.map((item) => (
        <li key={item} className="badge-list__item">
          <span className="badge-list__badge">{item}</span>
        </li>
      ))}
    </ul>
  );
}
