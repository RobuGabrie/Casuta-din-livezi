# Acasă spec

Measured in Figma on 2026-11-14 from frames `6:271` (desktop 1440) and `6:262`
(mobile 390). Pictures: `screens/acasa-desktop.jpg`, `screens/acasa-mobil.jpg`.
Section components: `src/components/sections/`.

Page order: Hero → Bun venit → Cazare → Masa la noi → Lavanda → În apropiere →
Contact → footer. Section heights (desktop / mobile): 920/800, 432/368, 880/931,
720/957, 760/660, 488/576, 520/748.

Between 1024 and 1440 the desktop columns keep the Figma proportions (fr units) and the
128px column gap shrinks with the width; photos keep the Figma aspect ratio.

## Hero → `HomeHero` (redesigned in Figma on 2026-11-15)

Photo `casa-de-sus-cu-dealuri`, cover. Contrast layer (`PhotoContrast variant="hero"`):
ink 55% at the top, 12% at 38%, 62% at 58%, 80% at the bottom.

| | Desktop (920 tall) | Mobile (800 tall) |
|---|---|---|
| Header | onPhoto, rule in paper at 40% | same |
| "Cacica, Bucovina · La noi, acasă" (Nav, paper) | y 170 | y 130 |
| Greeting "Bine ai venit⏎la noi, acasă." (h1) | Serif 64/64, −2%, y 430 | Serif 44/48, y 438 |
| Line "O căsuță. O masă bună. Un câmp de lavandă." | Body M, 24 under the greeting | Body M, 16 under |
| Services | 136 under the line; 3 equal columns, 32 apart | 16 under "Descoperă locul"; columns 98 / 122 / 98, 12 apart |
| "Descoperă locul ↓" (Caption) | 37 under the services, right-aligned; 28 from the bottom | 28 under the line, left-aligned |
| Space under the last item | 28 | 69 (under the services) |

Each service selector links to its page: a 1px rule (paper 60%), 8, the name and, on
desktop, an arrow "→" (Manrope Medium 20/28) at the right end, 8, a description.

| | Name style | Description |
|---|---|---|
| Desktop | Serif 48/56, −1% | Nav (Manrope Medium 14/20): "O căsuță doar pentru voi", "Bucătărie de sezon, în familie", "Un hectar de lavandă" |
| Mobile | Serif 32/40, −1% | Caption (12/18): "Doar pentru voi", "Bucătărie de sezon", "Un hectar de lavandă" |

Decision: below 390px wide the mobile name size follows the column width (about 25px at
320) so "Masa la noi" stays on one line; at 390 it is exactly the Figma 32px.

## Bun venit → `IntroStatement`

- Desktop: padding 120 / 64; two columns 736 and 448, 128 apart, centred vertically.
  Statement Serif 92/96 ("La capătul drumului,⏎începe tihna.", line break kept);
  paragraph Body L, muted.
- Mobile: padding 64 / 24; stacked, 24 apart; statement 44/48.

## Cazare and Masa la noi → `ServiceBlock`

| | Desktop | Mobile |
|---|---|---|
| Section padding | 0 top, 64 sides, 120 bottom | 24 top, 24 sides, 64 bottom |
| Layout | row: text 448, gap 128, photo 736; centred vertically | photo 342×440, then text, 24 apart |
| Photo size | Cazare 736×760; Masa 736×600 | 342×440 |
| Photo side | Cazare right; Masa left | always on top |

Text column, items 24 apart: index ("01 / Cazare", Index, muted) → heading (Serif 76/80
desktop, 44/48 mobile) → paragraph (Body M, muted) → two fact lines (Nav, muted) →
button → 1px rule in line colour.

| | Cazare | Masa la noi |
|---|---|---|
| Index | 01 / Cazare | 02 / Masa la noi |
| Heading | O căsuță, numai a voastră. | Din grădină,⏎la masa noastră. |
| Paragraph | Dimineți cu vedere spre dealuri și seri lungi în grădină. Un loc simplu, pentru a fi împreună. | Gătim în familie, cu roade din gospodărie și din sat. Nu avem meniu fix: anotimpul ne spune ce punem pe masă. |
| Facts | 1 dormitor · living · chicinetă⏎Balcon · grădină · parcare gratuită | Punct Gastronomic Local⏎Mese cu vedere spre livadă |
| Button | Rezervă pe Booking.com (booking) | Rezervă o masă (primary) → Masa la noi page, form |
| Photo | casa-de-sus-cu-dealuri | sala-panorama-1 |

Owner requests (not in Figma): the stay block has three buttons, 12px apart, wrapping
to a new line when they don't fit. Direct bookings come first, because they cost the
family no commission:
1. "Rezervă cu noi" (primary): calls the family (tel: link from `site.phone`; the
   Contact page if the phone is ever empty).
2. "Rezervă pe Booking.com ↗" (secondary with arrow).
3. "Rezervă pe Airbnb ↗" (secondary with arrow), when `site.airbnbUrl` is set.
This replaces Figma's single filled Booking button. Apply the same order wherever the
stay is booked (Cazare page, fixed mobile bar).

## Lavanda → `PhotoBand`

Photo `randuri-lavanda-toamna`, same contrast layer as the hero.

| | Desktop (760 tall) | Mobile (660 tall) |
|---|---|---|
| Title "Lavanda" | Serif 144/144 | Serif 64/64 |
| Line "Un hectar de liniște parfumată, chiar în curtea noastră." | Body L, 700 wide, 16 under the title | Body L, 16 under the title |
| Button "Află mai multe" (onPhoto) → Lavanda page | to the right of the text block: x 1100 of the 1312 row, top 148px below the title's top | under the text, 26 apart |
| Caption "Sfârșit de iunie–iulie · înflorirea depinde de vreme. Fotografie: câmpul toamna." | 80 under the button row, 40 from the bottom | 40 under the button, 24 from the bottom |

## În apropiere → `PlacesList`

- Desktop: padding 120 / 64; title "Mai rămâi o zi." (Serif 76/80) in a 448 column,
  gap 128, list in 736. Each item: 16 top padding, rule on top, name (H3) in 430 and
  distance (Nav, muted) in 282, 24 apart, both top-aligned. Items 24 apart.
- Mobile: padding 64 / 24; title 44/48, then 40, then the list. Each item: rule, 16,
  name, 8, distance.

Decision: in desktop Figma the item rules are 1×1px (a glitch); the code draws them full
width, as on mobile.

Items: Salina & Bazilica Cacica — În sat · aprox. 15 min pe jos; Gura Humorului — 10 km;
Mănăstirea Voroneț — 25 km; Aeroportul Suceava — aprox. 35 km.

## Contact → `ContactBand`

Forest background, paper text.
- Desktop: padding 80 / 64; text column 448, gap 128, map 736×360.
- Mobile: padding 64 / 24; stacked, 40 apart; map 342×260.
- Text column, 24 apart: "Hai pe la noi." (Serif 76/80, 44/48 mobile) → address
  (Body M, 2 lines) → phone and email (Body M, 2 lines) → button "Cum ajungi la noi"
  (onPhoto) → Contact page → note "Datele de contact urmează să fie completate."
  (Caption; shown only while the phone is missing).
- Map: `public/maps/cacica.jpg` (the 1024×640 image from Figma), cover. Attribution
  "© OpenStreetMap contributors" (11/18, ink) on a white box 238×22, bottom right,
  8px from the right edge and 6px from the bottom.
