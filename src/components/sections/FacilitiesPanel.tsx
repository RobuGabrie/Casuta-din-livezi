import { Container } from "@/components/ui/Container";
import { FacilityIcon } from "@/components/ui/icons";

/** Stone panel with a title and a grid of facilities, each with a line icon. */
export function FacilitiesPanel({
  title,
  items,
}: {
  title: string;
  items: readonly { icon: string; title: string; text: string }[];
}) {
  return (
    <section className="bg-stone">
      <Container className="flex flex-col gap-10 py-16 lg:py-20">
        <h2 className="type-h2">{title}</h2>
        <ul className="grid gap-10 lg:grid-cols-3 lg:gap-x-6">
          {items.map((item) => (
            <li key={item.title} className="flex gap-4">
              <FacilityIcon name={item.icon} className="shrink-0 text-forest" />
              <div className="flex flex-col gap-2">
                <h3 className="type-h3">{item.title}</h3>
                <p className="type-body text-muted">{item.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
