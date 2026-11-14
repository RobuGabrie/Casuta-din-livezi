/** Icons exported from Figma. They take the current text colour. */

type IconProps = { className?: string };

export function ExternalLinkIcon({ className }: IconProps) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path
        d="M12.6666 10.6667V3.33337H5.33331M12.6666 3.33337L3.33331 12.6667"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function FacebookIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M14 21V13H17L17.5 9H14V7C14 6 14.5 5 16 5H18V1H15C11 1 10 3.5 10 7V9H7V13H10V21"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path
        d="M17.5 6.5H17.51M7 3H17C18.0609 3 19.0783 3.42143 19.8284 4.17157C20.5786 4.92172 21 5.93913 21 7V17C21 18.0609 20.5786 19.0783 19.8284 19.8284C19.0783 20.5786 18.0609 21 17 21H7C5.93913 21 4.92172 20.5786 4.17157 19.8284C3.42143 19.0783 3 18.0609 3 17V7C3 5.93913 3.42143 4.92172 4.17157 4.17157C4.92172 3.42143 5.93913 3 7 3ZM16 12C16 13.0609 15.5786 14.0783 14.8284 14.8284C14.0783 15.5786 13.0609 16 12 16C10.9391 16 9.92172 15.5786 9.17157 14.8284C8.42143 14.0783 8 13.0609 8 12C8 10.9391 8.42143 9.92172 9.17157 9.17157C9.92172 8.42143 10.9391 8 12 8C13.0609 8 14.0783 8.42143 14.8284 9.17157C15.5786 9.92172 16 10.9391 16 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Three lines, standing in for the "☰" glyph in Figma (a 28×28 box with the glyph
 * drawn toward its left side).
 */
export function MenuIcon({ className }: IconProps) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <path d="M3 9H18M3 14H18M3 19H18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

/** A small ×, standing in for the "×" glyph in Figma (an 8px mark at the left of a 28×28 box). */
export function CloseIcon({ className }: IconProps) {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <path d="M1.5 10.5L8.5 17.5M8.5 10.5L1.5 17.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
