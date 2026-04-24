import type { CSSProperties } from "react";

type HomeContactIconButtonProps = {
  href?: string;
  label: string;
  iconSrc: string;
  openInNewTab?: boolean;
  onClick?: () => void;
};

export function HomeContactIconButton({
  href,
  label,
  iconSrc,
  openInNewTab = false,
  onClick,
}: HomeContactIconButtonProps) {
  const buttonContent = (
    <span
      className="home-contact__icon-glyph"
      aria-hidden
      style={{ "--contact-icon": `url(${iconSrc})` } as CSSProperties}
    />
  );

  if (onClick) {
    return (
      <button
        type="button"
        className="home-contact__icon-button"
        aria-label={label}
        title={label}
        onClick={onClick}
      >
        {buttonContent}
      </button>
    );
  }

  return (
    <a
      className="home-contact__icon-button"
      href={href}
      aria-label={label}
      title={label}
      target={openInNewTab ? "_blank" : undefined}
      rel={openInNewTab ? "noreferrer" : undefined}
    >
      {buttonContent}
    </a>
  );
}
