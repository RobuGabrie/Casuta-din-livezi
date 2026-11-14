import type { Metadata } from "next";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Photo } from "@/components/ui/Photo";

// Mirror of the Figma sheet "Sistem vizual / Căsuța din Livezi" (6:1079), for
// comparing the code with the design. Not linked from the site.
export const metadata: Metadata = { title: "Sistem vizual", robots: { index: false } };

const colors = [
  ["Paper", "#F8F7F3", "bg-paper"],
  ["Ink", "#232820", "bg-ink"],
  ["Forest", "#354537", "bg-forest"],
  ["Stone", "#E8E5DC", "bg-stone"],
  ["Surface", "#FFFFFF", "bg-white"],
  ["Muted", "#62665E", "bg-muted"],
  ["Line", "#CECEC4", "bg-line"],
  ["Error", "#A64032", "bg-error"],
] as const;

const type = [
  ["Display", "type-display", "Lavanda"],
  ["Service link", "type-service-link", "Masa la noi"],
  ["Statement", "type-statement", "La capătul drumului, începe tihna."],
  ["H2", "type-h2", "O căsuță, numai a voastră."],
  ["Wordmark", "type-wordmark", "Căsuța din Livezi"],
  ["H3", "type-h3", "1 dormitor & living"],
  ["Body L", "type-body-l", "Suntem o familie din Cacica, cu o livadă, o bucătărie de casă și un câmp de lavandă."],
  ["Body M", "type-body", "Dimineți cu vedere spre dealuri și seri lungi în grădină. Un loc simplu, pentru a fi împreună."],
  ["Button", "type-button", "Rezervă o masă"],
  ["Nav", "type-nav", "Cazare · Masa la noi · Lavanda · Contact"],
  ["Accent", "type-accent", "Punct Gastronomic Local"],
  ["Index", "type-index", "01 / Cazare"],
  ["Caption", "type-caption", "Curtea, iazul și livada"],
] as const;

export default function Styleguide() {
  return (
    <Container className="flex flex-col gap-16 py-16">
      <header className="flex flex-col gap-6">
        <h1 id="continut" className="type-h2">
          Sistem vizual / Căsuța din Livezi
        </h1>
        <p className="type-body text-muted">Instrument Serif + Manrope · Paper / Ink / Forest · 390 / 1440</p>
      </header>

      <section className="flex flex-col gap-6">
        <h2 className="type-wordmark">Culori</h2>
        <ul className="grid grid-cols-2 gap-4 lg:grid-cols-8">
          {colors.map(([name, hex, bg]) => (
            <li key={name} className="flex flex-col gap-2">
              <div className={`h-24 border border-line ${bg}`} />
              <span className="type-caption">
                {name} · {hex}
              </span>
            </li>
          ))}
        </ul>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="type-wordmark">Tipografie</h2>
        <dl className="flex flex-col gap-6">
          {type.map(([name, cls, sample]) => (
            <div key={name} className="grid gap-2 border-t border-line pt-4 lg:grid-cols-[160px_1fr]">
              <dt className="type-caption text-muted">{name}</dt>
              <dd className={cls}>{sample}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="type-wordmark">Butoane</h2>
        <div className="flex flex-wrap items-center gap-4">
          <Button href="/ro/styleguide">Rezervă o masă</Button>
          <Button href="/ro/styleguide" variant="secondary">
            Află mai multe
          </Button>
          <Button href="https://www.booking.com/hotel/ro/casuta-din-livezi-suceava2.html" variant="booking">
            Rezervă pe Booking.com
          </Button>
          <Button disabled>Se trimite…</Button>
        </div>
        <div className="flex flex-wrap items-center gap-4 bg-forest p-6">
          <Button href="/ro/styleguide" variant="onPhoto">
            Descoperă câmpul
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <h2 className="type-wordmark">Fotografie</h2>
        <div className="grid gap-4 lg:grid-cols-2">
          <Photo
            src="/photos/cazare/casa-de-sus-cu-dealuri.jpg"
            alt="Casa văzută de sus, cu dealurile în spate"
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="aspect-[4/3]"
            preload
          />
          <Photo
            src="/photos/masa/sala-panorama-1.jpg"
            alt="Sala de mese cu ferestre spre livadă"
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="aspect-[4/3]"
          />
        </div>
      </section>
    </Container>
  );
}
