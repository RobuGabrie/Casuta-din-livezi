import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";

/** "Bun venit": a large serif statement beside a short paragraph. */
export function IntroStatement({
  id,
  statement,
  text,
}: {
  id?: string;
  statement: readonly string[];
  text: string;
}) {
  return (
    <section id={id} className="scroll-mt-0">
      <Container className="grid gap-6 py-16 lg:grid-cols-[minmax(0,736fr)_minmax(0,448fr)] lg:items-center lg:gap-x-[clamp(64px,8.889vw,128px)] lg:py-[120px]">
        <h2 className="type-statement">
          <Lines lines={statement} />
        </h2>
        <p className="type-body-l text-muted">{text}</p>
      </Container>
    </section>
  );
}
