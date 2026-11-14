import { cn } from "@/lib/cn";

/**
 * The "Photo contrast" layer from Figma, laid over photos that carry paper text.
 * - "home" (Acasă): ink 55% at the top, 12% at 45% of the height, 70% at the bottom.
 * - "page" (Cazare, Masa la noi, Lavanda heroes): 55%, 8% at 35%, 72%.
 */
export function PhotoContrast({ variant = "home" }: { variant?: "home" | "page" }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "absolute inset-0",
        variant === "home"
          ? "bg-[linear-gradient(180deg,rgb(35_40_32/0.55)_0%,rgb(35_40_32/0.12)_45%,rgb(35_40_32/0.7)_100%)]"
          : "bg-[linear-gradient(180deg,rgb(35_40_32/0.55)_0%,rgb(35_40_32/0.08)_35%,rgb(35_40_32/0.72)_100%)]",
      )}
    />
  );
}
