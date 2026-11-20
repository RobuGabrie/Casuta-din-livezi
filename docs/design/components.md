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

## Cazare sections → `src/components/sections/`

Measured in `specs/cazare.md`: `PageHero` (also for Masa la noi and Lavanda),
`SplitIntro`, `Gallery` + `Lightbox`, `FacilitiesPanel`, `InfoColumns`, `SeasonNote`,
`MapAside`, `StickyBookingBar`. `StayActions` holds the stay's booking buttons
(Rezervă cu noi, Booking.com, Airbnb) for every page that books the cottage.

Choices not drawn in Figma: the enlarged view shows whole photos (not cropped), with an
ink backdrop at 80%, arrow keys and Escape. The mobile booking bar holds two buttons.
One footer layout everywhere (the Acasă version); the Cazare frames order it slightly
differently.

## Masa la noi sections

Measured in `specs/masa-la-noi.md`: `StoryBlock` (photo beside a story; "Cum gătim"
and "Evenimente"), `DishGallery`, `NotePanel` (stone panel), and the reservation
feature in `src/features/reservations/` (`ReservationSection`, `ReservationForm`).
Form controls in `src/components/ui/Field.tsx`: `Field`, `TextInput`, `TextArea`,
`Select`. Date and time are lists (not the browser's pickers) so they look like Figma.

## Lavanda and Contact sections

Measured in `specs/lavanda-contact.md`: `CallBand` (forest call-to-action),
`SideTitle` (heading beside text), `MapSection` (full-width map, button, caption),
`ContactIntro`. `SplitIntro` now takes its details as children; `StoryBlock` has a
`spacing` option and the 736×720 photo size; `PageHero` has an optional index and note.
Call and WhatsApp links come from `src/lib/contact.ts`.

## Not-found page → `src/app/[lang]/not-found.tsx`

Not in Figma. Paper header, Display title "Aici nu e nimic.", one Body L line, "Înapoi
acasă" (primary) and text links to the three services. Returns status 404 with noindex.

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

Forest background, hairline on top, large serif wordmark, one tagline, five nav
links (Împrejurimi added after Figma, between Lavanda and Contact), Facebook and Instagram icons, then text links and the copyright line.

## Admin request card

White card with a line border: time and party size, status (Nouă / Confirmată /
Refuzată, the last in error red), name, phone, note, then Confirmă (primary) and
Refuză (secondary) for new requests only.

## Împrejurimi (not in Figma) → `src/components/sections/NearbyGroup.tsx`

Added 2026-11-20 at the owner's request, without a Figma frame, from existing parts:
`PageHero`, `IntroStatement`, `InfoColumns` (day trips) and `CallBand`. Each group of
places is an H2 over a hairline, then cards in one column on mobile and two from 1024px:
a 4:3 photo (radius 0) with its credit as a caption, H3 name, the distance in Nav forest,
Body M muted text, then forest Nav links (directions, Wikipedia) at least 48px tall.
The photos come from Wikimedia Commons; their licences require the author and licence
next to each photo, so the caption stays. The page is linked from the footer, the
"Mai rămâi o zi." list on Acasă and is not in the header nav (its link widths are fixed
in Figma).
