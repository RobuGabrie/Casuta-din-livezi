# Cazare spec

Measured in Figma on 2026-11-14 from frames `6:290` (desktop), `6:280` (mobile),
`6:1449`–`6:1467` and `6:1672`–`6:1686` (enlarged gallery), `6:1514` (mobile with the
fixed booking bar). Pictures in `screens/`: `cazare-desktop.jpg`, `cazare-mobil.jpg`,
`galerie-marita-*.jpg`, `cazare-mobil-buton-fix.jpg`.

Order: Hero → Introducere → Galerie → Facilități → Bine de știut → Notă de sezon →
Hartă și rezervare → footer.

## Hero → `PageHero`

Photo `casa-de-sus-cu-dealuri`. Contrast layer differs from Acasă: ink 55% → 8% (at
35%) → 72%. Header onPhoto with the line-colour rule.

| | Desktop (840 tall) | Mobile (740 tall) |
|---|---|---|
| Index "01 / Cacica, Bucovina" (Index, paper) | y 520 | y 490 |
| Title "Cazare" | Serif 144/144, y 558 | Serif 64/64, y 530 |
| Lead "O singură căsuță. Toată liniștea, numai pentru voi." (Body L) | y 730, 850 wide | y 620 |
| Space under the lead | 80 | 60 |

## Introducere → `SplitIntro`

- Desktop: padding 120 / 64; statement column 736 (Serif 76/80, "Dimineți fără
  grabă,⏎cu dealurile la fereastră."), gap 128, details column 448, both top-aligned.
- Mobile: padding 64 / 24; statement 44/48, then 24, then details.
- Details, 24 apart: paragraph (Body L, muted) → rating "9,5 / 10  ·  Evaluarea
  oaspeților pe Booking.com" (Nav, forest) → buttons → caption (Caption, muted).

Owner requests (not in Figma): the buttons are the stay set from `specs/acasa.md`
("Rezervă cu noi" first, then Booking.com and Airbnb). Figma's caption "Disponibilitatea,
tarifele și rezervările sunt exclusiv pe Booking.com." is no longer true, so it reads
"Rezervă cu noi, la telefon, sau online pe Booking.com și Airbnb." The rating is
9,7 / 10 (owner, replacing Figma's 9,5).

## Galerie → `Gallery` + `Lightbox`

- Desktop: no top padding, 120 bottom. Title "Un pic din locul nostru" (Serif 76/80),
  24, photos, 24, caption.
- Photos, bottom-aligned, 16 apart: living 640×740, bedroom 320×460, bathroom 320×590.
- Mobile: title 44/48; photos stacked 16 apart, full width: 440, 360, 440 tall; 64
  bottom padding.
- Caption "Livingul cu masa mare, dormitorul de la mansardă și baia · Apasă o
  fotografie pentru a o mări." (Caption, muted).
- Each photo opens the enlarged view at that photo. The enlarged view moves through all
  15 stay photos (11 inside, 4 of the yard), not only the three on the page; their
  order and labels are in `src/content/ro.ts` (`stay.gallery.photos`). Owner decision.

Enlarged view (`Lightbox`):
- Desktop: forest panel 1100×766, padding 40, 24 between rows. Top row: "Căsuța din
  Livezi · Galerie" (Nav) and × (28 tall). Photo 1020×590. Bottom row: "← Înapoi"
  (Nav), counter "1 / 3 · Livingul" (Caption, centred), "Înainte →" (Nav).
- Mobile: full screen forest. Counter (Nav) top left at y 36, × top right; photo
  342×620 at y 100; "← Înapoi" and "Înainte →" at y 770.
- Not in Figma, chosen here: the panel is centred over the page with an ink backdrop
  at 80%; arrow keys move between photos; Escape and the backdrop close it.
- Decision: Figma crops the enlarged photo to fill its box. An enlarged view exists to
  show the whole photo, so the code shows it uncropped (contain) on the forest panel.

## Facilități → `FacilitiesPanel`

Stone background. Desktop padding 80 / 64; title "Ai tot ce-ți trebuie." (76/80), 40,
then a 3-column grid (each 421, 24 apart), rows 40 apart. Mobile padding 64 / 24, one
column, items 40 apart.
Item: icon 28×28 (1.5px forest line, from Figma), 16, then title (H3) and one line
(Body M, muted) 8 apart.

| Icon | Title | Line |
|---|---|---|
| house | 1 dormitor & living | Spațiu pentru odihnă și timp împreună. |
| kitchen | Chicinetă | Pentru cafeaua și micile voastre obiceiuri. |
| sun | Balcon & terasă la soare | Vedere spre grădină și munte. |
| car | Parcare privată gratuită | Loc pentru mașină, în gospodărie. |
| snowflake | Aer condiționat | Confort și în zilele călduroase. |
| leaf | Grădină & seri în aer liber | Șemineu exterior și zonă de picnic. |

## Bine de știut → `InfoColumns`

Desktop padding 120 / 64 / 80; title (76/80), 24, 3 columns (421, 24 apart). Mobile
padding 64 / 24; stacked 24 apart. Column: title (H3), 16, text (Body M, muted).
- Sosire & plecare — Check-in de la 15:00⏎Check-out până la 11:00
- O casă fără fum — Fumatul nu este permis.
- Fără animale de companie — Îți mulțumim pentru înțelegere.

## Notă de sezon → `SeasonNote`

Padding 40 / 64 (mobile 40 / 24): rule (line), 16, "Iunie–iulie: lavanda e în floare"
(H3), 16, "La final de iunie și în iulie, grădina capătă alt parfum. Înflorirea depinde
de vreme." (Body M, muted).

## Hartă și rezervare → `MapAside`

- Desktop: padding 80 / 64 / 120; map 736×360 left, gap 128, text 448 right, centred
  vertically.
- Mobile: padding 64 / 24; map 342×260, 40, text.
- Text, 24 apart: "Ne găsești în Cacica." (76/80, 44/48) → "Județul Suceava,
  Bucovina.⏎O bază tihnită pentru a descoperi împrejurimile." (Body M, muted) → the
  stay buttons.

## Fixed booking bar (mobile only) → `StickyBookingBar`

From `6:1514`: a bar fixed to the bottom of the screen, 84 tall, paper, padding 16,
button centred. Figma has one Booking button. With direct booking now the main action,
the bar holds "Rezervă cu noi" (primary) and "Booking · Airbnb" (secondary), which
jumps to the Hartă și rezervare section where both links are. The page gets 84px of
extra space at the bottom on mobile so the bar never covers the footer.
