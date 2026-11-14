import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";

/** Stone panel with a heading and a short note ("Program" on Masa la noi). */
export function NotePanel({ title, lines }: { title: string; lines: readonly string[] }) {
  return (
    <section className="bg-stone">
      <Container className="flex flex-col gap-4 py-16 lg:py-20">
        <h2 className="type-h2">{title}</h2>
        <p className="type-body text-muted">
          <Lines lines={lines} />
        </p>
      </Container>
    </section>
  );
}
