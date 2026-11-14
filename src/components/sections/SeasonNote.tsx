import { Container } from "@/components/ui/Container";

/** A quiet note under a rule, e.g. "Iunie–iulie: lavanda e în floare". */
export function SeasonNote({ title, text }: { title: string; text: string }) {
  return (
    <aside>
      <Container className="py-10">
        <div className="flex flex-col gap-4 border-t border-line pt-4">
          <p className="type-h3">{title}</p>
          <p className="type-body text-muted">{text}</p>
        </div>
      </Container>
    </aside>
  );
}
