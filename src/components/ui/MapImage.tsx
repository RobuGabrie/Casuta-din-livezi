import Image from "next/image";
import { cn } from "@/lib/cn";

/**
 * The village map from Figma (a static OpenStreetMap image) with its attribution box,
 * bottom right. The box size comes from `className`.
 */
export function MapImage({ alt, className }: { alt: string; className?: string }) {
  return (
    <div className={cn("relative overflow-hidden bg-stone", className)}>
      <Image
        src="/maps/cacica.jpg"
        alt={alt}
        fill
        sizes="(min-width: 64rem) 51vw, 100vw"
        className="object-cover"
      />
      <p className="type-attribution absolute right-0 bottom-1.5 flex h-[22px] w-[238px] items-center bg-white pl-2 text-ink">
        © OpenStreetMap contributors
      </p>
    </div>
  );
}
