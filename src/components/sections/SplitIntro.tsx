import type { ReactNode } from "react";
import { Container } from "@/components/ui/Container";
import { Lines } from "@/components/ui/Lines";

/**
 * A large statement on the left (736) and a details column on the right (448), items
 * 24 apart ("Introducere" on Cazare, "Sezonul lavandei" on Lavanda).
 */
export function SplitIntro({ statement, children }: { statement: readonly string[]; children: ReactNode }) {
  return (
    <section>
      <Container className="grid gap-6 py-16 lg:grid-cols-[minmax(0,736fr)_minmax(0,448fr)] lg:items-start lg:gap-x-[clamp(64px,8.889vw,128px)] lg:py-[120px]">
        <h2 className="type-h2">
          <Lines lines={statement} />
        </h2>
        <div className="flex flex-col items-start gap-6">{children}</div>
      </Container>
    </section>
  );
}
