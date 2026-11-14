# Layout spec — header, mobile menu, footer

Measured in Figma on 2026-11-14 from frames `6:271` (Acasă desktop), `6:262` (Acasă
mobile), `6:337` / `6:331` (Contact), `6:1426` (mobile menu). Code:
`src/components/layout/`.

## Header

Two tones:

| Tone | Where | Text colour | Background | Below the row |
|---|---|---|---|---|
| `onPhoto` ("Antet transparent") | Pages that open with a photo: Acasă, Cazare, Masa la noi, Lavanda | paper | none, sits over the hero photo | a 1px rule |
| `paper` ("Antet solid") | Contact (no hero photo) | ink | none (page is paper) | nothing |

The header is not sticky; it scrolls away with the page.

Desktop (1440):
- Row: x 64, y 32, width 1312, height 36. Wordmark left, navigation right
  (space-between, centred vertically).
- Wordmark: Instrument Serif 32/36, −2%.
- Navigation: Cazare, Masa la noi, Lavanda, Contact, "RO / EN". Manrope Medium 14/20,
  32px apart. Each item has a fixed-width box: 64, 92, 64, 64, 72. The navigation block
  is 620 wide and starts at x 692 of the row, so the last item ends about 136px before
  the right margin. Keep that gap; it is how the design looks.
- `paper` tone: the header block is 100px tall (32px padding top and bottom).
- `onPhoto` tone: a 1px rule at y 108 (40px under the row), full content width.
  Rule colour: paper at 40% on Acasă, line (#CECEC4) at 40% on the other pages.

Mobile (390):
- Row: x 24, y 24, width 342, height 30. Wordmark left; "RO / EN" and the menu icon right.
- Wordmark: Instrument Serif 26/30, −2%.
- Menu icon: drawn 28×28; the tap area is 48×48 (rules: controls ≥ 48px).
- `paper` tone: the header block is 78px tall (24px padding).
- `onPhoto` tone: rule at y 84 (30px under the row).

Language switch: "RO / EN" in Nav style. The current language is not marked visually
in Figma; in code it carries `aria-current` and the other language is the link.

## Mobile menu (open)

- Full screen (390×844), forest background, 24px padding, items 24px apart.
- Top bar, 30px tall: wordmark (serif 26/30) in a 266px box, then 24px later the close
  "×" box (28×28, at x 314, not at the right edge). The × is a small 8px mark at the
  left of its box. Tap area 48×48.
- Links, each Instrument Serif 64/64: Acasă, Cazare, Masa la noi, Lavanda, Contact.
- "RO / EN" (Manrope Medium 14/20).
- Two lines, Manrope Medium 14/20: "Cacica, Bucovina" / "Un loc al familiei noastre."
- All text paper.
- Behaviour (not in Figma): opens from the menu icon, closes with ×, Escape, or when a
  link is chosen. The page behind does not scroll while it is open.

## Footer ("Subsol")

Forest background, full width. Content column inside the page margins.

| | Desktop | Mobile |
|---|---|---|
| Padding (top / sides / bottom) | 80 / 64 / 40 | 64 / 24 / 40 |
| Gap between items | 24 | 24 |
| Wordmark | Instrument Serif 92/96 | Instrument Serif 64/64 (wraps to 2 lines) |
| Links | 4 in a row, each 160 wide, 24 apart | 2 columns, each 150 wide, 24 apart, rows 16 apart |

Items in order:
1. Rule: 1px, paper at 22%, full content width.
2. Wordmark "Căsuța din Livezi".
3. Tagline "Un loc al familiei noastre. Un pic de liniște pentru tine." (Body M).
4. Links: Cazare, Masa la noi, Lavanda, Contact (Nav style).
5. Social icons: Facebook, Instagram; 24×24, 1.5px paper stroke, 24 apart.
6. Text links: Facebook, Instagram, Booking.com (Nav style, about 20px apart).
7. "© 2026 Căsuța din Livezi · Cacica, Bucovina" (Caption).

All text paper. Facebook and Instagram are shown only once their addresses are known
(`src/content/site.ts`); Booking.com is always shown.
