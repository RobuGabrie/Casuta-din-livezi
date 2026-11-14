# Design rules — read before changing any UI

The site must look exactly like the Figma design. Figma is the source of truth;
this folder is a saved copy of it so the rules are at hand in every session.

- Figma file: https://www.figma.com/design/OErqS5bTVa2JKk6zRR9LEA (page "📸 Poze")
- Exact values: [tokens.md](tokens.md)
- Components and their states: [components.md](components.md)
- Which frame is which page, with a saved picture of each: [figma-map.md](figma-map.md)
- Pictures of every screen: [screens/](screens/)

## How to work

1. Before building or changing a page, open its picture in `screens/` and read the
   matching frame in Figma for exact sizes, spacing and text. Save what you measured
   in `specs/<page>.md` so it is not measured twice.
2. Use only the tokens in `tokens.md`. If a value is missing, read it from Figma and
   add it there first. Never guess a colour, size or spacing.
3. Copy the text from Figma exactly, including Romanian diacritics (ă â î ș ț).
4. After building, run `scripts/screenshots.sh http://localhost:3000 /ro/<page>` with
   the site running. It saves the page at 390px and 1440px wide in `.screenshots/`.
   Compare them with the pictures in `screens/` and fix every visible difference
   before committing.
5. If Figma and this folder disagree, Figma wins. Update this folder in the same commit.
6. If the design does not cover something (a width between 390 and 1440, a hover
   state, an error case), choose the quietest option that fits these rules and write
   the choice down in `components.md`.

## Rules from the Figma system sheet ("Sistem vizual / Căsuța din Livezi")

- Neutral backgrounds dominate the interface.
- Forest green marks actions and closes sections (buttons, the contact band, the footer).
- All three services use the same action colour. There is no colour per service.
- Lavender stays in the photographs. It is never used for panels or buttons.
- Spacing sits on an 8px grid.
- Page margins: 24px on mobile, 64px on desktop.
- Images have no decorative corners (radius 0). Controls have a 2px radius.
- Body text is 16–18px.
- Controls are at least 48px tall.
- In every section the image, the title and the text are separate elements, never
  text baked into a picture.

## Rules from the project brief

- Three services, kept separate: Cazare, Masa la noi, Lavanda. Each has its own page
  and its own action. Do not blend them.
- Cazare: one cottage, booked only on Booking.com. The button links out.
- Masa la noi: a Punct Gastronomic Local with no fixed menu. Never show a menu card
  with prices. The action is a table request that the owner confirms by phone.
- Lavanda: no booking. The action is a phone call or WhatsApp.
- Photography leads. Use the family's real photos only, no stock images.
- Mood: calm, natural, family-run Bucovina. Not a luxury hotel, not a template.

## Typography rules

- Headings: Instrument Serif Regular, letter spacing −2%, tight line height.
- Everything else: Manrope.
- No all-caps labels. Section index labels ("01 / Cazare") are sentence case,
  Manrope Medium 12/18 with 4% letter spacing.

## Responsive rules

- Designed widths: 390 (mobile) and 1440 (desktop).
- Below 1024px the mobile layout is used; from 1024px up, the desktop layout.
- Content never grows wider than the 1440 design; past that the page stays centred.
- No horizontal scrolling at any width from 320px up.

## Still to be filled in before publishing (from the note in Figma)

Phone and WhatsApp, email, full address and exact map position, the food opening
hours, and a photo of the lavender in bloom. The English version is only shown as a
switch in the design: the pages are designed in Romanian, so English text is written
during the build and reviewed at the end.
