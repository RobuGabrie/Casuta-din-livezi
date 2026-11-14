import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

/** Forest band inviting a call: title, one line, an outline button and a small note. */
export function CallBand({
  title,
  text,
  action,
  note,
}: {
  title: string;
  text: string;
  action: { label: string; href: string };
  note: string;
}) {
  return (
    <section className="bg-forest text-paper">
      <Container className="flex flex-col items-start gap-6 py-16 lg:py-24">
        <h2 className="type-h2">{title}</h2>
        <p className="type-body-l lg:max-w-[736px]">{text}</p>
        <Button href={action.href} variant="onPhoto">
          {action.label}
        </Button>
        <p className="type-caption">{note}</p>
      </Container>
    </section>
  );
}
