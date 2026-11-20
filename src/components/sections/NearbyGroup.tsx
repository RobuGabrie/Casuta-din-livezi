import { Container } from "@/components/ui/Container";
import { ExternalLinkIcon } from "@/components/ui/icons";
import { Photo } from "@/components/ui/Photo";

export type NearbyCard = {
  name: string;
  text: string;
  /** "25 km · 35 min cu mașina". */
  distance: string;
  photo: { src: string; alt: string; credit: string; creditHref: string };
  links: readonly { label: string; href: string }[];
};

/**
 * One group of places on Împrejurimi: a heading over cards with a photo, the distance,
 * a short text and outside links. Not in Figma; built from the existing type styles,
 * rules and spacing (choice written down in docs/design/components.md).
 */
export function NearbyGroup({ title, places }: { title: string; places: readonly NearbyCard[] }) {
  return (
    <section>
      <Container className="flex flex-col gap-10 py-16 lg:gap-14 lg:py-20">
        <h2 className="type-h2 border-t border-line pt-[15px] lg:pt-8">{title}</h2>
        <ul className="grid gap-y-14 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-20">
          {places.map((p) => (
            <li key={p.name}>
              <article className="flex flex-col gap-4">
                <figure className="flex flex-col gap-2">
                  <Photo
                    src={p.photo.src}
                    alt={p.photo.alt}
                    sizes="(min-width: 64rem) 50vw, 100vw"
                    className="aspect-[4/3]"
                  />
                  <figcaption className="type-caption text-muted">
                    <a
                      href={p.photo.creditHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="underline-offset-4 hover:underline"
                    >
                      {p.photo.credit}
                    </a>
                  </figcaption>
                </figure>
                <div className="flex flex-col gap-2 pt-2">
                  <h3 className="type-h3">{p.name}</h3>
                  <p className="type-nav text-forest">{p.distance}</p>
                </div>
                <p className="type-body text-muted">{p.text}</p>
                <ul className="type-nav flex flex-wrap gap-x-6 gap-y-2 text-forest">
                  {p.links.map((l) => (
                    <li key={l.href}>
                      <a
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex min-h-12 items-center gap-2 underline underline-offset-4 hover:no-underline"
                      >
                        {l.label}
                        <ExternalLinkIcon className="size-3.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
