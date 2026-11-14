"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { CloseIcon } from "@/components/ui/icons";

export type LightboxPhoto = { src: string; alt: string; label: string };
export type LightboxLabels = { dialogTitle: string; previous: string; next: string; close: string };

/**
 * Enlarged gallery view, Figma frames 6:1449 (desktop) and 6:1672 (mobile).
 * A modal <dialog>: focus stays inside, Escape closes, arrow keys move between photos.
 * The photo is shown whole (not cropped); see docs/design/specs/cazare.md.
 */
export function Lightbox({
  photos,
  index,
  onIndexChange,
  labels,
}: {
  photos: readonly LightboxPhoto[];
  index: number | null;
  onIndexChange: (index: number | null) => void;
  labels: LightboxLabels;
}) {
  const dialog = useRef<HTMLDialogElement>(null);
  const open = index !== null;
  const count = photos.length;

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

  const go = (step: number) => index !== null && onIndexChange((index + step + count) % count);
  const photo = index !== null ? photos[index] : null;
  const counter = photo ? `${index! + 1} / ${count} · ${photo.label}` : "";

  return (
    <dialog
      ref={dialog}
      onClose={() => onIndexChange(null)}
      onClick={(e) => e.target === e.currentTarget && onIndexChange(null)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") go(-1);
        if (e.key === "ArrowRight") go(1);
      }}
      aria-label={labels.dialogTitle}
      className="m-0 h-dvh max-h-none w-full max-w-none bg-forest p-0 text-paper backdrop:bg-ink/80 lg:m-auto lg:h-[min(766px,calc(100dvh-48px))] lg:w-[min(1100px,calc(100vw-48px))]"
    >
      {photo && (
        <div className="flex h-full flex-col px-6 pt-8 pb-[54px] lg:gap-6 lg:p-10">
          <div className="flex items-start justify-between">
            <p className="type-nav pt-1 lg:pt-0">
              <span className="lg:hidden" aria-live="polite">
                {counter}
              </span>
              <span className="hidden lg:inline">{labels.dialogTitle}</span>
            </p>
            <button
              type="button"
              onClick={() => onIndexChange(null)}
              aria-label={labels.close}
              className="-my-[10px] -mr-[10px] flex size-12 items-center justify-center"
            >
              <CloseIcon />
            </button>
          </div>

          <div className="relative mt-10 min-h-0 flex-1 lg:mt-0">
            <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(min-width: 64rem) 1020px, 100vw" className="object-contain" />
          </div>

          <div className="type-nav mt-[50px] flex items-center justify-between lg:mt-0">
            <button type="button" onClick={() => go(-1)} className="-my-3 py-3 hover:underline hover:underline-offset-4">
              ← {labels.previous}
            </button>
            <p className="type-caption hidden lg:block" aria-live="polite">
              {counter}
            </p>
            <button type="button" onClick={() => go(1)} className="-my-3 py-3 hover:underline hover:underline-offset-4">
              {labels.next} →
            </button>
          </div>
        </div>
      )}
    </dialog>
  );
}
