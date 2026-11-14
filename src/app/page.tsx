import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";

// Placeholder until the real pages arrive in milestones 2 and 3.
export default function Home() {
  return (
    <Container className="flex min-h-dvh flex-col items-start justify-center gap-8">
      <h1 className="type-display">Căsuța din Livezi</h1>
      <p className="type-body-l text-muted">Site în lucru. Fundația de design este gata.</p>
      <Button href="/styleguide" variant="secondary">
        Vezi sistemul vizual
      </Button>
    </Container>
  );
}
