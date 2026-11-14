# Lavanda and Contact spec

Measured in Figma on 2026-11-14: Lavanda `6:323` (desktop) and `6:315` (mobile);
Contact `6:337` and `6:331`. Pictures: `screens/lavanda-*.jpg`, `screens/contact-*.jpg`.

Phone and WhatsApp: +40 751 425 215 (owner). WhatsApp links use `wa.me/40751425215`.

## Lavanda

Order: Hero → Sezonul lavandei → Plimbare prin câmp → Ședințe foto → Produse din
lavandă → Contact lavanda → footer.

### Hero → `PageHero` (no index, with a note)

Photo `randuri-lavanda-toamna`, contrast 55% → 8% at 40% → 72%.

| | Desktop (840) | Mobile (740) |
|---|---|---|
| Title "Lavanda" | Serif 144, y 540 | Serif 64, y 500 |
| Lead "Un hectar de tihnă,⏎chiar în curtea noastră." (Body L) | 20 under the title | 26 under |
| Note "Câmpul toamna · fotografia înfloririi, în curând" (Caption) | 28 under the lead | 40 under |
| Space under the note | 30 | 32 |

### Sezonul lavandei → `SplitIntro`

Padding 120 / 64 (mobile 64 / 24). Statement "Când se îmbracă în mov." (H2) in 736;
details in 448, 24 apart: "De la sfârșitul lui iunie, până în iulie." (Accent 13/20,
forest) → "Înflorirea depinde de vreme, iar fiecare vară are ritmul ei. Sună-ne înainte
de drum, ca să-ți spunem cum arată câmpul. Lavanda este o bucurie în plus a vizitei, nu
un serviciu de rezervat." (Body L, muted) → button.

Decision: Figma has one button "Sună-ne / WhatsApp". The code splits it into "Sună-ne"
(primary, tel:) and "WhatsApp" (secondary, opens a chat), as on the Contact page, so
each does exactly what it says.

### Plimbare prin câmp, Ședințe foto, Produse din lavandă → `StoryBlock`

Three blocks: no top padding, 120 bottom (mobile 0 / 64). Photo 736×720 (mobile
342×440), text 448, 128 apart, centred vertically. Text: label (Index, muted), H2,
paragraph (Body M, muted).

| Block | Photo | Side | Heading | Paragraph |
|---|---|---|---|---|
| Plimbare prin câmp | `randuri-lavanda-toamna` | right | Pași mici.⏎Aer cu parfum de vară. | Ia-o încet printre rânduri și bucură-te de peisaj. Un hectar de lavandă, cu dealurile Bucovinei la orizont. |
| Ședințe foto | `rama-foto-lavanda-1` | left | O ramă pentru⏎amintirile voastre. | Rama albă din lemn sculptat vă așteaptă în câmp. Pentru o ședință foto, povestim înainte despre sezon și momentul potrivit al zilei. |
| Produse din lavandă | `apus-peste-livada` | right | Un pic de vară,⏎luat acasă. | Întreabă-ne ce pregătim din recolta de lavandă. Disponibilitatea produselor se schimbă cu sezonul. |

### Contact lavanda → `CallBand`

Forest, padding 96 / 64 (mobile 64 / 24), items 24 apart: "Ne vedem printre rânduri?"
(H2) → "Pentru înflorire, vizite și fotografii, cel mai simplu este să povestim." (Body L,
736 wide) → "Întreabă de ședințe foto" (onPhoto; opens WhatsApp with a first line
written) → "Telefon / WhatsApp: +40 751 425 215" (Caption).

## Contact

Header: paper tone (no hero photo). Order: Contact → Cum ajungi → Hartă → footer.

### Contact → `ContactIntro`

- Desktop: padding 64 / 64 / 120. Title "Drumul până la noi." (Display, 144), 64, then a
  row: details 448, gap 128, photo `iaz-foisor-salcii-1` 736×780.
- Mobile: padding 40 / 24 / 64. Title 64/64 (two lines), 64, details, 40, photo 342×440.
- Details, 24 apart: "Te așteptăm în Cacica." (H2) → "Cacica, județul Suceava⏎Bucovina,
  România" (Body L, ink) → "Telefon & WhatsApp" (Nav, forest) → "+40 751 425 215" (H3,
  ink) → buttons "Sună-ne" (primary) and "WhatsApp" (secondary), 16 apart → "E-mail:
  robumihaela69@gmail.com" (Body M, muted).
- Decision: Figma's note "Numărul de telefon, e-mailul, adresa completă și poziția exactă
  pe hartă trebuie confirmate înainte de publicare." is a reminder for the family, not
  text for guests, so it is left out.

### Cum ajungi → `SideTitle`

Padding 80 / 64 (mobile 64 / 24). Title "Cum ajungi" (H2) in 448, gap 128, text in 736,
24 apart: "Din Gura Humorului, Cacica este la aproximativ 10 km. Dacă vii cu avionul,
Aeroportul Suceava se află la circa 35 km. La căsuță ai parcare privată gratuită." (Body
L, muted) → "Salina și Bazilica din Cacica sunt la aproximativ 15 minute de mers pe jos.
Mănăstirea Voroneț se află la 25 km." (Body M, muted). Mobile: stacked, 24 apart.

### Hartă → `MapSection`

Padding 0 / 64 / 120 (mobile 0 / 24 / 64). Map full content width, 520 tall (mobile 320),
attribution bottom right. 24, "Deschide Google Maps ↗" (secondary with arrow), 24,
caption "Harta localității Cacica · poziția exactă a proprietății urmează să fie
confirmată." (Caption, muted). The button searches Google Maps for the place by name
until the exact pin is known.
