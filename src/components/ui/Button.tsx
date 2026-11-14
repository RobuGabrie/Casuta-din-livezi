import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";
import { ExternalLinkIcon } from "./icons";

/**
 * Figma component "Buton" (1:217). See docs/design/components.md.
 * - primary: forest fill
 * - secondary: forest outline
 * - booking: forest fill with an external-link arrow; always opens a new tab
 * - onPhoto: paper outline, for photos and forest bands
 */
export type ButtonVariant = "primary" | "secondary" | "booking" | "onPhoto";

const base =
  "type-button inline-flex min-h-[52px] items-center justify-center gap-3 rounded-control px-6 py-4 " +
  "transition-colors disabled:pointer-events-none disabled:opacity-60 aria-disabled:pointer-events-none aria-disabled:opacity-60";

const variants: Record<ButtonVariant, string> = {
  primary: "bg-forest text-paper hover:bg-forest-deep",
  secondary: "border border-forest text-forest hover:bg-forest hover:text-paper",
  booking: "bg-forest text-paper hover:bg-forest-deep",
  onPhoto:
    "border border-paper text-paper hover:bg-paper hover:text-forest focus-visible:outline-paper",
};

type Common = { variant?: ButtonVariant; className?: string; children: ReactNode };
type AsLink = Common & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type AsButton = Common & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

export function Button(props: AsLink | AsButton) {
  const { variant = "primary", className, children, ...rest } = props;
  const classes = cn(base, variants[variant], className);
  const content = (
    <>
      {children}
      {variant === "booking" && <ExternalLinkIcon />}
    </>
  );

  if (rest.href === undefined) {
    return (
      <button type="button" {...(rest as ComponentProps<"button">)} className={classes}>
        {content}
      </button>
    );
  }

  const { href, ...anchor } = rest as AsLink;
  const external = variant === "booking" || /^(https?:|tel:|mailto:)/.test(href);
  if (external) {
    const newTab = href.startsWith("http");
    return (
      <a
        {...anchor}
        href={href}
        className={classes}
        {...(newTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {content}
      </a>
    );
  }
  return (
    <Link {...anchor} href={href} className={classes}>
      {content}
    </Link>
  );
}
