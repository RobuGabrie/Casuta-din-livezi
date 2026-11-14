import { Button } from "@/components/ui/Button";

/**
 * Mobile-only bar fixed to the bottom of the screen (Figma 6:1514): the main booking
 * action plus a jump to the other booking options. The page keeps 84px free at the
 * bottom while it is shown (see globals.css).
 */
export function StickyBookingBar({
  primary,
  secondary,
}: {
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
}) {
  return (
    <div data-sticky-bar className="fixed inset-x-0 bottom-0 z-20 bg-paper p-4 lg:hidden">
      <div className="flex justify-center gap-3">
        <Button href={primary.href}>{primary.label}</Button>
        <Button href={secondary.href} variant="secondary">
          {secondary.label}
        </Button>
      </div>
    </div>
  );
}
