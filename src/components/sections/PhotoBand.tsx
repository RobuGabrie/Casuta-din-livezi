import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";
import { PhotoContrast } from "@/components/ui/PhotoContrast";

/** Full-width photo with a large title, a line, a button and a caption (Lavanda on Acasă). */
export function PhotoBand({
  title,
  text,
  action,
  caption,
  photo,
}: {
  title: string;
  text: string;
  action: { label: string; href: string };
  caption: string;
  photo: { src: string; alt: string };
}) {
  return (
    <section className="relative h-[660px] text-paper lg:h-[760px]">
      <div className="absolute inset-0">
        <Photo src={photo.src} alt={photo.alt} sizes="100vw" className="h-full" />
      </div>
      <PhotoContrast />

      <Container className="relative flex h-full flex-col justify-end pb-6 lg:pb-10">
        {/* Desktop: the button sits 148px below the title's top, at x 1100 of the row. */}
        <div className="flex flex-col items-start gap-[26px] lg:flex-row lg:gap-0">
          <div className="flex flex-col gap-4 lg:w-[calc(900/1312*100%)]">
            <h2 className="type-display">{title}</h2>
            <p className="type-body-l lg:max-w-[700px]">{text}</p>
          </div>
          <Button href={action.href} variant="onPhoto" className="lg:mt-[148px] lg:ml-[calc(200/1312*100%)]">
            {action.label}
          </Button>
        </div>
        <p className="type-caption mt-10 lg:mt-20">{caption}</p>
      </Container>
    </section>
  );
}
