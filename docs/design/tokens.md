# Tokens — exact values from Figma

Read from the Figma variables and text styles on 2026-11-14. In code they live in
`src/styles/tokens.css`. Change both together.

## Colours

| Token | Value | Figma variable | Use |
|---|---|---|---|
| paper | `#F8F7F3` | color/bg/linen, color/text/on-dark | Page background; text on forest and on photos |
| white | `#FFFFFF` | color/bg/surface | Form fields, cards on the admin page |
| stone | `#E8E5DC` | color/bg/sage-soft | Soft panels (facilities block) |
| ink | `#232820` | color/text/ink | Main text, headings |
| muted | `#62665E` | color/text/muted | Secondary text, captions |
| forest | `#354537` | color/brand/olive | Buttons, contact band, footer, mobile menu |
| line | `#CECEC4` | color/border/line | Hairlines, field borders |
| error | `#A64032` | color/state/error | Field errors, "Refuzată" status |
| forest-deep | `#313F32` | (not in Figma) | Hover on forest buttons: forest mixed 20% with ink |
| sage | `#8A927E` | color/brand/sage | Defined, not used on the pages yet |
| wood | `#7F6C53` | color/brand/wood | Defined, not used on the pages yet |

## Type styles

Serif = Instrument Serif Regular, letter spacing −2%. Sans = Manrope, letter spacing 0
unless noted. Sizes are font size / line height in px.

| Style | Font | Mobile | Desktop | Used for |
|---|---|---|---|---|
| Display | Serif | 64/64 | 144/144 | Largest page titles |
| Hero intro | Serif | 44/48 | 64/64 | Home hero greeting |
| Service selector | Serif, −1% | 32/40 | 48/56 | The three services at the bottom of the home hero |
| Statement | Serif | 44/48 | 92/96 | Opening statement under the hero |
| H2 | Serif | 44/48 | 76/80 | Section headings |
| Footer wordmark | Serif | 64/64 | 92/96 | "Căsuța din Livezi" in the footer |
| Wordmark | Serif | 26/30 | 32/36 | "Căsuța din Livezi" in the header |
| H3 | Sans Medium | 20/28 | 20/28 | Small headings, list titles |
| Body L | Sans Regular | 18/30 | 18/30 | Lead paragraphs |
| Body M | Sans Regular | 16/26 | 16/26 | Body text |
| Button label | Sans SemiBold | 14/20 | 14/20 | Buttons |
| Nav | Sans Medium | 14/20 | 14/20 | Navigation, small labels |
| Accent | Sans Medium | 13/20 | 13/20 | Small emphasised notes |
| Index | Sans Medium, +4% | 12/18 | 12/18 | "01 / Cazare" labels |
| Caption | Sans Regular | 12/18 | 12/18 | Photo captions, fine print |
| Map attribution | Sans Regular | 11/18 | 11/18 | Map credit |

Mobile sizes for Service link and Statement are read from the mobile frames, where
they use the Display mobile and H2 mobile styles.

## Spacing

Scale in px: 4, 8, 12 (gap between controls), 16, 24, 32, 40, 64, 80, 96, 120,
128 (editorial gutter between the text column and the photo column).

Page margins: 24 (mobile), 64 (desktop).

## Radius

- Controls (buttons, fields, cards): 2px.
- Photos and sections: 0.

## Breakpoint

One switch at 1024px. Below it: mobile layout. From it up: desktop layout.
Between 1024px and 1440px the serif sizes scale with the screen width and reach the
Figma size at 1440px.

## In code

Colours are Tailwind utilities (`bg-forest`, `text-muted`, `border-line`). Type
styles are single classes: `type-display`, `type-hero-intro`, `type-service-selector`, `type-statement`,
`type-h2`, `type-footer-wordmark`, `type-wordmark`, `type-h3`, `type-body-l`, `type-body`, `type-button`,
`type-nav`, `type-accent`, `type-index`, `type-caption`, `type-attribution`.
Compare the result with Figma at `/styleguide`.
