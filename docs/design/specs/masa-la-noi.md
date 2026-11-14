# Masa la noi spec

Measured in Figma on 2026-11-14 from frames `6:307` (desktop) and `6:299` (mobile).
Pictures: `screens/masa-la-noi-desktop.jpg`, `screens/masa-la-noi-mobil.jpg`. Form
states (milestone 7): `screens/formular-*.jpg`.

Order: Hero → Cum gătim → Din bucătărie → Evenimente în familie → Program → Rezervă o
masă → footer.

## Hero → `PageHero`

Photo `sala-panorama-1`. Contrast: ink 55% → 8% (at 40%) → 72%.
- Index "Punct Gastronomic Local · Cacica", title "Masa la noi", lead "Bunătăți de-ale
  locului. Gătite în familie."
- Desktop: same positions as Cazare (index y 520, title 558, lead 730, 80 below).
- Mobile: index y 480, title 520, lead 610 (one line), 100 below the lead (Cazare has
  60 because its lead takes two lines; both keep the text block at the same height).

## Cum gătim → `StoryBlock`

- Desktop: padding 120 / 64; text 448 left, gap 128, photo 736×800 right
  (`cos-paine-brodat`), centred vertically.
- Mobile: padding 64 / 24; photo 342×440, 24, text.
- Text, 24 apart: label "Cum gătim" (Index, muted) → "Ce dă grădina,⏎ce știe familia."
  (H2) → "La noi, masa începe în gospodărie. Gătim cu roade din ferma noastră și cu
  bunătăți de la oamenii din sat." (Body L, muted) → "Nu avem meniu fix. Bucatele se
  schimbă cu anotimpul și cu ce ne dă grădina. Spune-ne din timp dacă ai alergii sau
  preferințe." (Body M, muted) → "Rezervă o masă" (primary) → the form below.

## Din bucătărie → `DishGallery`

- Desktop: no top padding, 120 bottom. Title "Câte ceva de pe masa noastră" (H2), 40,
  three columns (421, 24 apart), bottom-aligned. Each: photo, 16, caption (Nav, muted).
  Photo heights 580, 440, 520.
- Mobile: 64 bottom; title, 40, stacked 24 apart; photo heights 440, 360, 440.
- Dishes: `platouri-aperitive` "Platouri de împărțit"; `aperitive-sfecla` "Aperitive de
  sezon"; `fel-principal-mamaliga` "Gust de acasă, cu mămăligă".
- Owner request (not in Figma): under the dishes, 24 below, a text link to the kitchen's
  Instagram, "Vezi ce gătim pe Instagram ↗" (Nav, forest, underlined).

## Evenimente în familie → `StoryBlock`

- Desktop: padding 120 / 64; photo 736×680 left (`masa-botez-1`), gap 128, text 448.
- Mobile: padding 64 / 24; photo 342×440, 24, text.
- Text, 24 apart: "O masă mare.⏎Oameni dragi." (H2) → "Botezuri, prânzuri în familie și
  zile care merită sărbătorite. Sala luminoasă, cu ferestre spre livadă și dealuri, face
  loc poveștilor voastre." → "Povestește-ne ocazia în cererea de masă. Stabilim împreună
  detaliile, în funcție de sezon și disponibilitate." (both Body M, muted) → "Vorbește-ne
  despre eveniment" (secondary). The button calls the family (an event is easier to
  plan by phone than in the form).

## Program → `NotePanel`

Stone background. Padding 80 / 64 (mobile 64 / 24). "O masă pregătită pentru voi." (H2),
16, "Vă primim cu rezervare și confirmare telefonică.⏎Ziua și ora se stabilesc
împreună; programul exact va fi publicat aici." (Body M, muted).

## Rezervă o masă → `ReservationSection` + `ReservationForm`

- Desktop: padding 120 / 64; intro 448 left, gap 128, form 736 right, top-aligned.
- Mobile: padding 64 / 24; intro, 40, form.
- Intro, 24 apart: "Vă păstrăm⏎un loc la masă." (H2) → "Trimite-ne câteva detalii și te
  sunăm noi. Cererea devine rezervare doar după confirmarea telefonică." (Body L, muted)
  → "Pentru alergii sau o ocazie specială, lasă-ne un mesaj în câmpul Mențiuni." (Body M,
  muted).
- Form, items 24 apart. Desktop: Nume | Telefon, Data | Ora (two columns, 24 apart),
  then Număr persoane and Mențiuni full width. Mobile: all one column.
- Field: label (Manrope Medium 14/20, ink), 8, control: white, 1px line border, radius
  2, 60 tall, padding 16, text Body M. Mențiuni is 112 tall. Placeholders in muted:
  "2 persoane ⌄" (select), "Alergii, ocazie sau ce ai vrea să știm…".
- Placeholders from Figma: "Numele tău", "07xx xxx xxx", "Alege data", "Alege ora",
  "2 persoane". Data and Ora are lists, not the browser's date and time boxes, so they
  look like Figma on every phone: the next 60 days, and the times in
  `site.tableTimes` (to confirm with the family). The "⌄" sits at the right edge of the
  box rather than right after the text.
- Owner rules (not in Figma): up to 25 guests in the list, then "Mai mult de 25 de
  persoane"; a table is booked for at most 2 hours, said in a caption under Ora
  ("Masa se rezervă pentru cel mult 2 ore.", Caption, muted, 8 below the control).
  On desktop the hint makes the Data | Ora row 26px taller.
- Under the fields: "Folosim datele doar pentru a răspunde cererii tale.⏎Nu se face
  nicio plată online." (Caption, muted), 24, "Trimite cererea" (primary).
- The section has the id `rezervare`; other pages link to it.
- States (Figma `6:1306`–`6:1416` and the sheet's "Mesaj / Succes" component):
  - Error: the control's border turns error red and a Caption line in error red sits
    under it; the cursor moves to the first field to fix. The error goes away as soon
    as that field is edited.
  - Sending: the button reads "Se trimite…" at 65% opacity, with "Mai durează o clipă.
    Te rugăm să nu închizi pagina." (Caption, muted) under it.
  - Success: the form is replaced by the "Mesaj / Succes" card (1px line border,
    padding 24, 16 apart: "Am primit cererea." H2, "Te sunăm în curând pentru
    confirmare." Body M, "Rezervarea este valabilă după confirmarea telefonică."
    Caption muted), then "Trimite o altă cerere" (secondary) for a fresh form.
  - Not sent (no WhatsApp or email went out) and too many requests: a Body M line in
    error red above the button, with the phone number.
  The Figma mobile state frames show the form as its own screen with "← Înapoi"; the
  site keeps the form on the Masa la noi page, so that bar is not used.
