import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

/**
 * A photo beside a short story: optional label, heading, a lead and/or paragraphs,
 * and actions ("Cum gătim", "Evenimente în familie"; docs/design/specs/masa-la-noi.md).
 * On mobile the photo is always on top.
 */
export function StoryBlock({
  label,
  title,
  lead,
  paragraphs = [],
  actions,
  photo,
  photoSide,
  photoAspect,
}: {
  label?: string;
  title: readonly string[];
  /** First paragraph in Body L. */
  lead?: string;
  /** Further paragraphs in Body M. */
  paragraphs?: readonly string[];
  actions?: ReactNode;
  photo: { src: string; alt: string };
  photoSide: "left" | "right";
  /** Desktop photo aspect, Figma width/height, e.g. "736/800". */
  photoAspect: "736/800" | "736/680";
}) {
  return (
    <section>
      <Container
        className={cn(
          "grid items-center gap-6 py-16 lg:gap-x-[clamp(64px,8.889vw,128px)] lg:py-[120px]",
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
            photoAspect === "736/800" ? "lg:aspect-[736/800]" : "lg:aspect-[736/680]",
            photoSide === "right" && "lg:order-2",
          )}
        />
        <div className="flex flex-col items-start gap-6">
          {label && <p className="type-index text-muted">{label}</p>}
          <h2 className="type-h2">
            <Lines lines={title} />
          </h2>
          {lead && <p className="type-body-l text-muted">{lead}</p>}
          {paragraphs.map((text) => (
            <p key={text} className="type-body text-muted">
              {text}
            </p>
          ))}
          {actions}
        </div>
      </Container>
    </section>
  );
}
