/**
 * The "Photo contrast" layer from Figma, laid over photos that carry paper text:
 * ink at 55% at the top, 12% at 45% of the height, 70% at the bottom.
 */
export function PhotoContrast() {
  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 bg-[linear-gradient(180deg,rgb(35_40_32/0.55)_0%,rgb(35_40_32/0.12)_45%,rgb(35_40_32/0.7)_100%)]"
    />
  );
}
