import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { MapImage } from "@/components/ui/MapImage";

/** The village map beside a title, a short text and actions ("Hartă și rezervare"). */
export function MapAside({
  id,
  title,
  lines,
  mapAlt,
  actions,
}: {
  id?: string;
  title: string;
  lines: readonly string[];
  mapAlt: string;
  actions?: ReactNode;
}) {
  return (
    <section id={id}>
      <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,736fr)_minmax(0,448fr)] lg:items-center lg:gap-x-[clamp(64px,8.889vw,128px)] lg:pt-20 lg:pb-[120px]">
        <MapImage alt={mapAlt} className="aspect-[342/260] lg:aspect-[736/360]" />
        <div className="flex flex-col gap-6">
          <h2 className="type-h2">{title}</h2>
          <p className="type-body text-muted">
            <Lines lines={lines} />
          </p>
          {actions}
        </div>
      </Container>
    </section>
  );
}
