import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

/**
 * One service on the home page: text column and a photo (docs/design/specs/acasa.md).
 * On desktop the photo sits left or right; on mobile it is always on top.
 */
export function ServiceBlock({
  index,
  title,
  text,
  facts,
  actions,
  photo,
  photoSide,
  photoAspect,
}: {
  index: string;
  title: readonly string[];
  text: string;
  facts: readonly string[];
  /** The button(s); wrap several in a flex row with a 12px gap (see StayActions). */
  actions: ReactNode;
  photo: { src: string; alt: string };
  photoSide: "left" | "right";
  /** Desktop photo aspect from Figma: "cazare" 736×760, "masa" 736×600. */
  photoAspect: "tall" | "wide";
}) {
  return (
    <section>
      <Container
        className={cn(
          "grid items-center gap-6 pt-6 pb-16 lg:gap-x-[clamp(64px,8.889vw,128px)] lg:pt-0 lg:pb-[120px]",
          photoSide === "right"
            ? "lg:grid-cols-[minmax(0,448fr)_minmax(0,736fr)]"
            : "lg:grid-cols-[minmax(0,736fr)_minmax(0,448fr)]",
        )}
      >
        <Photo
          src={photo.src}
          alt={photo.alt}
          sizes="(min-width: 64rem) 51vw, 100vw"
          className={cn(
            "h-[440px] lg:h-auto",
            photoAspect === "tall" ? "lg:aspect-[736/760]" : "lg:aspect-[736/600]",
            photoSide === "right" && "lg:order-2",
          )}
        />

        <div className="flex flex-col gap-6">
          <p className="type-index text-muted">{index}</p>
          <h2 className="type-h2">
            <Lines lines={title} />
          </h2>
          <p className="type-body text-muted">{text}</p>
          <p className="type-nav text-muted">
            <Lines lines={facts} />
          </p>
          <div className="flex flex-wrap gap-3">{actions}</div>
          <div aria-hidden="true" className="h-px bg-line" />
        </div>
      </Container>
    </section>
  );
}
