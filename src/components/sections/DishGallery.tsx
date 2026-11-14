import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { cn } from "@/lib/cn";

// Desktop photo sizes from Figma: 421×580, 421×440, 421×520, bottom-aligned.
// Mobile heights: 440, 360, 440.
const sizes = [
  "h-[440px] lg:h-auto lg:aspect-[421/580]",
  "h-[360px] lg:h-auto lg:aspect-[421/440]",
  "h-[440px] lg:h-auto lg:aspect-[421/520]",
];

/** Three captioned photos of different heights ("Din bucătărie"). */
export function DishGallery({
  title,
  items,
  footer,
}: {
  title: string;
  items: readonly { src: string; alt: string; caption: string }[];
  /** Optional line under the photos, e.g. a link to Instagram. */
  footer?: ReactNode;
}) {
  return (
    <section>
      <Container className="flex flex-col gap-10 pb-16 lg:pb-[120px]">
        <h2 className="type-h2">{title}</h2>
        <div className="flex flex-col gap-6">
          <ul className="grid gap-6 lg:grid-cols-3 lg:items-end">
            {items.slice(0, 3).map((item, i) => (
              <li key={item.src} className="flex flex-col gap-4">
                <Photo src={item.src} alt={item.alt} sizes="(min-width: 64rem) 30vw, 100vw" className={cn(sizes[i])} />
                <p className="type-nav text-muted">{item.caption}</p>
              </li>
            ))}
          </ul>
          {footer}
        </div>
      </Container>
    </section>
  );
}
