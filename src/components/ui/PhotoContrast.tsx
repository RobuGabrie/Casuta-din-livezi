import { cn } from "@/lib/cn";

/**
 * The "Photo contrast" layer from Figma, laid over photos that carry paper text.
 * - "hero" (Acasă hero): ink 55% at the top, 12% at 38%, 62% at 58%, 80% at the bottom.
 * - "home" (Lavanda band on Acasă): 55% at the top, 12% at 45% of the height, 70% at the bottom.
 * - "page" (service page heroes): 55%, 8% at `middle`% (35 on Cazare, 40 on Masa la
 *   noi), 72%.
 */
export function PhotoContrast({
  variant = "home",
  middle = 35,
}: {
  variant?: "hero" | "home" | "page";
  middle?: number;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0",
        variant === "home" &&
          "bg-[linear-gradient(180deg,rgb(35_40_32/0.55)_0%,rgb(35_40_32/0.12)_45%,rgb(35_40_32/0.7)_100%)]",
        variant === "hero" &&
          "bg-[linear-gradient(180deg,rgb(35_40_32/0.55)_0%,rgb(35_40_32/0.12)_38%,rgb(35_40_32/0.62)_58%,rgb(35_40_32/0.8)_100%)]",
      )}
      style={
        variant === "page"
          ? {
              backgroundImage: `linear-gradient(180deg, rgb(35 40 32 / 0.55) 0%, rgb(35 40 32 / 0.08) ${middle}%, rgb(35 40 32 / 0.72) 100%)`,
            }
          : undefined
      }
    />
  );
}
