import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * A photo that fills its box, cropped like an image fill in Figma.
 * The box size comes from `className` (a height or an aspect ratio). The box is
 * `relative`; to position it, wrap it rather than passing `absolute`.
 * Photos have no rounded corners (docs/design/RULES.md).
 */
export function Photo({
  src,
  alt,
  sizes,
  className,
  position,
  preload,
}: {
  src: string;
  alt: string;
  /** What width the photo takes on screen, e.g. "(min-width: 64rem) 50vw, 100vw". */
  sizes: string;
  className?: string;
  /** CSS object-position, when the default centre crop cuts the subject. */
  position?: string;
  /** Set on the first large photo of a page so it loads early. */
  preload?: boolean;
}) {
  return (
    <div className={cn("relative overflow-hidden bg-stone", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        preload={preload}
        className="object-cover"
        style={position ? { objectPosition: position } : undefined}
      />
    </div>
  );
}
