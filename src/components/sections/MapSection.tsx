import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MapImage } from "@/components/ui/MapImage";

/** Full-width village map, a button to open the real map, and a caption ("Hartă"). */
export function MapSection({
  mapAlt,
  action,
  caption,
}: {
  mapAlt: string;
  action: { label: string; href: string };
  caption: string;
}) {
  return (
    <section>
      <Container className="flex flex-col items-start gap-6 pb-16 lg:pb-[120px]">
        <MapImage alt={mapAlt} className="h-[320px] w-full lg:h-[520px]" />
        <Button href={action.href} variant="secondary" arrow>
          {action.label}
        </Button>
        <p className="type-caption text-muted">{caption}</p>
      </Container>
    </section>
  );
}
