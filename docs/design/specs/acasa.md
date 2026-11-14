# Acasă spec

Measured in Figma on 2026-11-14 from frames `6:271` (desktop 1440) and `6:262`
(mobile 390). Pictures: `screens/acasa-desktop.jpg`, `screens/acasa-mobil.jpg`.
Section components: `src/components/sections/`.

Page order: Hero → Bun venit → Cazare → Masa la noi → Lavanda → În apropiere →
Contact → footer. Section heights (desktop / mobile): 920/800, 432/368, 880/931,
720/957, 760/660, 488/576, 520/748.

Between 1024 and 1440 the desktop columns keep the Figma proportions (fr units) and the
128px column gap shrinks with the width; photos keep the Figma aspect ratio.

## Hero → `HomeHero`

Photo `casa-de-sus-cu-dealuri`, cover. Contrast layer: ink, top to bottom
55% → 12% (at 45%) → 70%.

| | Desktop (920 tall) | Mobile (800 tall) |
|---|---|---|
| Header | onPhoto, rule in paper at 40% | same |
| "Cacica, Bucovina · La noi, acasă" (Nav, paper) | y 170 | y 130 |
| Service entries | y 570, one row, columns 372 / 464 / 412, 32 apart | y 350, stacked, 16 apart |
| Entry | rule (paper 60%), 16, number box 36, 16, word | rule, 4, number box 36, 4, word |
| Word | Serif 112/116 | Serif 64/64 |
| Bottom line "O căsuță. O masă bună. Un câmp de lavandă." (Nav) | y 850, left | y 730, left |
| "Descoperă locul ↓" (Caption) | y 852, right-aligned | y 766, right-aligned |

The three words link to Cazare, Masa la noi and Lavanda. "Descoperă locul ↓" jumps to
"Bun venit".

Decision: in Figma the numbers "01", "02", "03" sit in zero-width text boxes, so each
digit wraps onto its own line. That is a glitch, not a design choice. The code shows
"01" on one line in the Index style, at the left, inside the same 36px box so the words
stay where Figma puts them.

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
to a new line when they don't fit:
1. "Rezervă pe Booking.com ↗" (booking), as in Figma.
2. "Rezervă pe Airbnb ↗" (secondary with arrow), when `site.airbnbUrl` is set.
3. "Rezervă cu noi" (secondary): calls the family directly. It is a tel: link once
   `site.phone` is set; until then it opens the Contact page.

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
