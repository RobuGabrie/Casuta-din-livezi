import Link from "next/link";
import { Container } from "@/components/ui/Container";

/** "În apropiere": a title beside a list of places and distances. */
export function PlacesList({
  title,
  items,
  more,
}: {
  title: string;
  items: readonly { name: string; distance: string }[];
  /** Link under the list to the full page of places. */
  more?: { label: string; href: string };
}) {
  return (
    <section>
      <Container className="grid gap-10 py-16 lg:grid-cols-[minmax(0,448fr)_minmax(0,736fr)] lg:gap-x-[clamp(64px,8.889vw,128px)] lg:py-[120px]">
        <h2 className="type-h2">{title}</h2>
        <ul className="flex flex-col gap-6">
          {/* Figma lays the rule over the 16px top padding, so border + 15px = 16px. */}
          {items.map((item) => (
            <li
              key={item.name}
              className="grid gap-2 border-t border-line pt-[15px] lg:grid-cols-[minmax(0,430fr)_minmax(0,282fr)] lg:items-start lg:gap-6"
            >
              <span className="type-h3">{item.name}</span>
              <span className="type-nav text-muted">{item.distance}</span>
            </li>
          ))}
          {more && (
            <li>
              <Link
                href={more.href}
                className="type-nav inline-flex min-h-12 items-center text-forest underline underline-offset-4 hover:no-underline"
              >
                {more.label} →
              </Link>
            </li>
          )}
        </ul>
      </Container>
    </section>
  );
}
