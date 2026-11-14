import { Fragment } from "react";

/** Text with line breaks where Figma has them. Each item is one line. */
export function Lines({ lines }: { lines: readonly string[] }) {
  return lines.map((line, i) => (
    <Fragment key={i}>
      {i > 0 && <br />}
      {line}
    </Fragment>
  ));
}
