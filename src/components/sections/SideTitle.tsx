import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";

/** A heading in a 448 column beside content in a 736 column ("Cum ajungi"). */
export function SideTitle({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section>
      <Container className="grid gap-6 py-16 lg:grid-cols-[minmax(0,448fr)_minmax(0,736fr)] lg:gap-x-[clamp(64px,8.889vw,128px)] lg:py-20">
        <h2 className="type-h2">{title}</h2>
        <div className="flex flex-col gap-6">{children}</div>
      </Container>
    </section>
  );
}
