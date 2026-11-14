import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Form field from Figma: label (Manrope Medium 14/20), 8px, then a white control,
 * 60px tall, 1px line border, radius 2, padding 16, Body M text.
 */
export function Field({
  id,
  label,
  hint,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  /** A short line under the control (Caption, muted). */
  hint?: string;
  /** Error message (Caption, error red); give the control aria-invalid. */
  error?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label htmlFor={id} className="type-nav text-ink">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="type-caption text-error">
          {error}
        </p>
      )}
      {hint && (
        <p id={`${id}-hint`} className="type-caption text-muted">
          {hint}
        </p>
      )}
    </div>
  );
}

/** aria props tying a control to its Field's hint and error lines. */
export function describedBy(id: string, { hint, error }: { hint?: boolean; error?: boolean }) {
  const ids = [error && `${id}-error`, hint && `${id}-hint`].filter(Boolean).join(" ");
  return { "aria-invalid": error || undefined, "aria-describedby": ids || undefined };
}

export const controlClass =
  "type-body w-full rounded-control border border-line bg-white px-4 py-4 text-ink placeholder:text-muted aria-invalid:border-error " +
  "focus-visible:border-forest focus-visible:outline-1 focus-visible:outline-offset-0 focus-visible:outline-forest";

export function TextInput({ className, ...props }: ComponentProps<"input">) {
  return <input {...props} className={cn(controlClass, "h-[60px]", className)} />;
}

export function TextArea({ className, ...props }: ComponentProps<"textarea">) {
  return <textarea {...props} className={cn(controlClass, "h-[112px] resize-none", className)} />;
}

/**
 * A native select with the "⌄" mark drawn on the right. While its empty placeholder
 * option is chosen (a required select that is still :invalid), the text is muted,
 * like a placeholder.
 */
export function Select({ className, children, ...props }: ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(controlClass, "h-[60px] appearance-none pr-10 invalid:text-muted", className)}
      >
        {children}
      </select>
      <svg
        aria-hidden="true"
        width="12"
        height="8"
        viewBox="0 0 12 8"
        fill="none"
        className="pointer-events-none absolute top-1/2 right-4 -translate-y-1/2 text-muted"
      >
        <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}
