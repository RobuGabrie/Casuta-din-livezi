import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";

/** A title over three short columns, e.g. the house rules ("Bine de știut"). */
export function InfoColumns({
  title,
  items,
}: {
  title: string;
  items: readonly { title: string; lines: readonly string[] }[];
}) {
  return (
    <section>
      <Container className="flex flex-col gap-6 py-16 lg:pt-[120px] lg:pb-20">
        <h2 className="type-h2">{title}</h2>
        <ul className="grid gap-6 lg:grid-cols-3">
          {items.map((item) => (
            <li key={item.title} className="flex flex-col gap-4">
              <h3 className="type-h3">{item.title}</h3>
              <p className="type-body text-muted">
                <Lines lines={item.lines} />
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
