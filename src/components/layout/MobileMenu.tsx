"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";

/**
 * Menu icon plus the full-screen menu from Figma frame 6:1426 (docs/design/specs/layout.md).
 * Uses a modal <dialog>, which keeps focus inside and closes on Escape.
 */
export function MobileMenu({
  wordmark,
  homeHref,
  links,
  langSwitch,
  footer,
  openLabel,
  closeLabel,
}: {
  wordmark: string;
  homeHref: string;
  links: { href: string; label: string }[];
  langSwitch: ReactNode;
  footer: ReactNode;
  openLabel: string;
  closeLabel: string;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const el = dialog.current;
    if (!el) return;
    if (open && !el.open) el.showModal();
    if (!open && el.open) el.close();
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const close = () => setOpen(false);

  return (
    <>
      <button
        type="button"
        aria-label={openLabel}
        aria-haspopup="dialog"
        aria-expanded={open}
        onClick={() => setOpen(true)}
        className="-my-[9px] -mr-[10px] flex size-12 items-center justify-center"
      >
        <MenuIcon />
      </button>

      <dialog
        ref={dialog}
        onClose={close}
        aria-label={wordmark}
        className="m-0 h-dvh max-h-none w-full max-w-none bg-forest p-6 text-paper backdrop:bg-transparent"
      >
        <div className="flex flex-col gap-6">
          {/* Figma bar: wordmark in a 266px box, then the × box 24px later (at x 314). */}
          <div className="flex h-[30px] items-center gap-[14px]">
            <Link href={homeHref} onClick={close} className="type-wordmark w-[266px]">
              {wordmark}
            </Link>
            <button
              type="button"
              aria-label={closeLabel}
              onClick={close}
              className="-my-[9px] flex size-12 items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>
          <ul className="flex flex-col gap-6">
            {links.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={close} className="font-serif text-[64px] leading-[64px] tracking-[-0.02em]">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          {langSwitch}
          {footer}
        </div>
      </dialog>
    </>
  );
}
