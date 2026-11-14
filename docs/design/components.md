# Components — as designed in Figma

The Figma frame "Elemente & stări · Căsuța din Livezi" (`6:1079`, picture:
`screens/elemente-si-stari.jpg`) shows every component and state. Each entry below
lists the measured values and the code file once it exists.

## Buton (Figma component set `1:217`) → `src/components/ui/Button.tsx`

All variants: padding 16px top/bottom, 24px left/right; label Manrope SemiBold
14/20; radius 2px; height 52px.

| Variant (Figma) | Code name | Fill | Border | Label | Extra |
|---|---|---|---|---|---|
| Tip=Principal | `primary` | forest | none | paper | |
| Tip=Secundar | `secondary` | none | 1px forest | forest | |
| Tip=Booking | `booking` | forest | none | paper | external-link arrow after the label, 12px gap |
| Tip=Pe fotografie | `onPhoto` | none | 1px paper | paper | used over photos and on forest bands |
| Tip=Lavandă | (same as `primary`) | forest | none | paper | no separate style: all services share one action colour |

States not drawn in Figma, chosen here:
- Hover: the fill or border darkens slightly (forest mixed with ink). No movement.
- Keyboard focus: 2px outline, 2px away from the button, in the label's contrast colour.
- Disabled / sending: 60% opacity, no pointer.

## Header (antet) → `src/components/layout/SiteHeader.tsx`

Full measurements: `specs/layout.md`.

Four designed variants: desktop on forest, desktop on paper (also used transparent
over the hero photo with paper text), mobile on forest, mobile on paper.
- Left: wordmark "Căsuța din Livezi" (Wordmark style).
- Desktop right: Cazare, Masa la noi, Lavanda, Contact, then "RO / EN" (Nav style).
- Mobile right: "RO / EN" and a three-line menu icon.

## Mobile menu → `src/components/layout/MobileMenu.tsx` (picture: `screens/meniu-mobil-deschis.jpg`)

Full-screen forest panel. Wordmark and a close "×" on top. Links in large serif:
Acasă, Cazare, Masa la noi, Lavanda, Contact. Then "RO / EN" and two short lines
("Cacica, Bucovina" / "Un loc al familiei noastre.").

## Home sections → `src/components/sections/`

Measured in `specs/acasa.md`: `HomeHero`, `IntroStatement` ("Bun venit"),
`ServiceBlock`, `PhotoBand` (Lavanda band), `PlacesList` ("În apropiere"),
`ContactBand`. Shared pieces in `src/components/ui/`: `PhotoContrast` (the gradient
over photos), `MapImage` (map with attribution), `Lines` (Figma line breaks).

Figma glitches handled in code (see `specs/acasa.md`): the hero numbers in zero-width
boxes, the 1px desktop list rules, and the "Pe fotografie" button variant showing
"Rezervă o masă" instead of its own label.

## Service block ("Servicii · două așezări")

Two mirrored layouts: text left with photo right, and photo left with text right.
Text column: index label ("01 / Cazare"), H2, body paragraph, two short fact lines,
a button, then a hairline.

## Gallery and enlarged view

Gallery: three photos of different heights, aligned at the bottom, with a caption.
Enlarged view (pictures: `screens/galerie-marita-desktop.jpg`, `-mobil.jpg`): forest
panel, title and "×" on top, the photo, then "← Înapoi", a counter with the photo
name ("1 / 3 · Livingul") and "Înainte →".

## Facilities panel

Stone background, H2, then a grid of items (3 columns on desktop): a line icon, a
title (H3-like, Manrope Medium) and one muted line.

## Fields and messages

- Field: label above (Nav style), white box with a 1px line border, radius 2px,
  at least 48px tall.
- Error: the border turns error red and a short message appears under the field.
- Success card: white box with a line border, a serif title ("Am primit cererea."),
  one body line and a caption.
- Season note: a hairline above, a title line and a muted line
  ("Iunie–iulie: lavanda e în floare").

## Contact band

Forest background. Left: H2 "Hai pe la noi.", address, phone and email, an
`onPhoto` button. Right: the map.

## Footer (subsol) → `src/components/layout/SiteFooter.tsx`

Forest background, hairline on top, large serif wordmark, one tagline, four nav
links, Facebook and Instagram icons, then text links and the copyright line.

## Admin request card

White card with a line border: time and party size, status (Nouă / Confirmată /
Refuzată, the last in error red), name, phone, note, then Confirmă (primary) and
Refuză (secondary) for new requests only.
