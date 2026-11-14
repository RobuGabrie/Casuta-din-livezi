import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";

/** A large statement on the left, details and actions on the right (Cazare "Introducere"). */
export function SplitIntro({
  statement,
  text,
  highlight,
  actions,
  note,
}: {
  statement: readonly string[];
  text: string;
  /** A short line in forest, e.g. the guest rating. */
  highlight?: string;
  actions?: ReactNode;
  note?: string;
}) {
  return (
    <section>
      <Container className="grid gap-6 py-16 lg:grid-cols-[minmax(0,736fr)_minmax(0,448fr)] lg:items-start lg:gap-x-[clamp(64px,8.889vw,128px)] lg:py-[120px]">
        <h2 className="type-h2">
          <Lines lines={statement} />
        </h2>
        <div className="flex flex-col gap-6">
          <p className="type-body-l text-muted">{text}</p>
          {highlight && <p className="type-nav whitespace-pre-wrap text-forest">{highlight}</p>}
          {actions}
          {note && <p className="type-caption text-muted">{note}</p>}
        </div>
      </Container>
    </section>
  );
}
