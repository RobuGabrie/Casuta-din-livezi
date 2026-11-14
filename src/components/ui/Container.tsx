import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/** Page margins from Figma: 24px on mobile, 64px on desktop, 1440px at most. */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-page px-6 lg:px-16", className)}>{children}</div>;
}
