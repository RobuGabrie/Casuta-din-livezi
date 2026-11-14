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

/** Facility icons from Figma (28×28, 1.5px line). They take the current text colour. */
const facilityPaths = {
  house: "M10.5 23.3333V15.1666H17.5V23.3333M3.5 23.3333V8.16659L14 2.33325L24.5 8.16659V23.3333H3.5Z",
  kitchen:
    "M3.5 19.8334H24.5M8.16667 11.6667V8.16675H19.8333V11.6667M5.83333 23.3334V19.8334V11.6667H22.1667V19.8334V23.3334",
  sun: "M14 3.5V5.83333M14 22.1667V24.5M3.5 14H5.83333M22.1667 14H24.5M7 7L8.16667 8.16667M19.8333 19.8333L21 21M7 21L8.16667 19.8333M19.8333 8.16667L21 7M18.6667 14C18.6667 15.2377 18.175 16.4247 17.2998 17.2998C16.4247 18.175 15.2377 18.6667 14 18.6667C12.7623 18.6667 11.5753 18.175 10.7002 17.2998C9.825 16.4247 9.33333 15.2377 9.33333 14C9.33333 12.7623 9.825 11.5753 10.7002 10.7002C11.5753 9.825 12.7623 9.33333 14 9.33333C15.2377 9.33333 16.4247 9.825 17.2998 10.7002C18.175 11.5753 18.6667 12.7623 18.6667 14Z",
  parking:
    "M4.6665 23.3334V11.6667L8.1665 4.66675H19.8332L23.3332 11.6667V23.3334M4.6665 14.0001H23.3332M8.1665 18.6667H9.33317M18.6665 18.6667H19.8332",
  snow: "M13.9998 3.5V24.5M4.6665 8.16667L23.3332 19.8333M4.6665 19.8333L23.3332 8.16667M10.4998 5.83333L13.9998 9.33333L17.4998 5.83333M10.4998 22.1667L13.9998 18.6667L17.4998 22.1667",
  leaf: "M14 24.5C4.66667 18.6667 4.66667 9.33333 14 3.5C23.3333 9.33333 23.3333 18.6667 14 24.5ZM14 24.5V8.16667M9.33333 12.8333L14 17.5L18.6667 12.8333",
} as const;

export type FacilityIconName = keyof typeof facilityPaths;

export function FacilityIcon({ name, className }: IconProps & { name: string }) {
  const d = facilityPaths[name as FacilityIconName];
  if (!d) return null;
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none" aria-hidden="true" className={className}>
      <path d={d} stroke="currentColor" strokeWidth="1.51667" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
