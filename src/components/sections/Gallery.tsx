"use client";

import Image from "next/image";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/cn";
import { Lightbox, type LightboxLabels, type LightboxPhoto } from "./Lightbox";

// Desktop sizes from Figma: 640×740, 320×460, 320×590, bottom-aligned, 16 apart.
// Mobile heights: 440, 360, 440.
const layout = [
  { col: "640fr", desktop: "lg:aspect-[640/740]", mobile: "h-[440px]" },
  { col: "320fr", desktop: "lg:aspect-[320/460]", mobile: "h-[360px]" },
  { col: "320fr", desktop: "lg:aspect-[320/590]", mobile: "h-[440px]" },
];

/**
 * Three photos of different heights; each opens the enlarged view at that photo,
 * which then moves through all `photos` (docs/design/specs/cazare.md).
 */
export function Gallery({
  title,
  caption,
  photos,
  featured,
  labels,
}: {
  title: string;
  caption: string;
  photos: readonly LightboxPhoto[];
  /** Positions in `photos` of the three shown on the page. */
  featured: readonly number[];
  labels: LightboxLabels & { open: string };
}) {
  const [openAt, setOpenAt] = useState<number | null>(null);

  return (
    <section>
      <Container className="flex flex-col gap-6 pb-16 lg:pb-[120px]">
        <h2 className="type-h2">{title}</h2>
        <div className="grid gap-4 lg:grid-cols-[640fr_320fr_320fr] lg:items-end">
          {featured.slice(0, 3).map((at, i) => {
            const photo = photos[at];
            return (
              <button
                key={photo.src}
                type="button"
                onClick={() => setOpenAt(at)}
                aria-label={`${labels.open}: ${photo.label}`}
                className={cn(
                  "relative block overflow-hidden bg-stone lg:h-auto",
                  layout[i].mobile,
                  layout[i].desktop,
                )}
              >
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  sizes={
                    i === 0
                      ? "(min-width: 64rem) 45vw, 100vw"
                      : "(min-width: 64rem) 23vw, 100vw"
                  }
                  className="object-cover"
                />
              </button>
            );
          })}
        </div>
        <p className="type-caption text-muted">{caption}</p>
      </Container>

      <Lightbox
        photos={photos}
        index={openAt}
        onIndexChange={setOpenAt}
        labels={labels}
      />
    </section>
  );
}
