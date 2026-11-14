# Căsuța din Livezi — website plan

Website for a family place in Cacica, Bucovina, with three separate services:
**Cazare** (one holiday cottage, booked only on Booking.com), **Masa la noi**
(a Punct Gastronomic Local with no fixed menu, table requests on the site) and
**Lavanda** (a 1 ha field, no booking, contact only).

Design source: Figma file `OErqS5bTVa2JKk6zRR9LEA`, page "📸 Poze" (the designed
frames live there). The code follows the Figma design; it does not invent a new one.

## 1. Decisions already made

- Three services, each with its own page and its own action. They are not blended.
- Stay bookings: link out to Booking.com. No booking system of our own.
- Table requests: our own form. The owner confirms by phone.
- No fixed menu on the food page. It shows how the family cooks and example dishes.
- Languages: Romanian (default) and English.
- Hosting: a small VPS, no platform plans (no Vercel, no Supabase).

## 2. Stack

| Part | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router), TypeScript | Asked for; good image handling and SEO |
| Styling | Tailwind CSS v4 with tokens from Figma | One place for colours, type, spacing |
| Table requests | WhatsApp (CallMeBot) + email (Nodemailer, SMTP) | The owner prefers WhatsApp; email is the backup and the history. No database (owner decision) |
| Hosting | Hetzner VPS + Caddy (automatic HTTPS) | About €4–5/month, nothing to block the project |
| Deploy | Docker image, updated on push to GitHub | One command to publish |

Note: the current Next.js version has breaking changes compared with older guides.
Before writing code for a feature, read the matching guide in
`node_modules/next/dist/docs/`.

## 3. Design tokens (measured from the Figma frames)

- Fonts: **Instrument Serif** (headings, 26–144px, letter spacing −2%) and
  **Manrope** (body 16/26, large body 18/30, labels 14/20, captions 12/18).
- Colours: paper `#F8F7F3`, ink `#232820`, muted text `#62665E`, olive `#354537`,
  line `#CECEC4`, soft surface `#E8E5DC`, white `#FFFFFF`, error `#A64032`.
- Corner radius: 2px everywhere.
- Spacing scale: 4, 8, 16, 24, 32, 40, 64, 80, 96, 120.
- Breakpoints: designed at 390 (mobile) and 1440 (desktop).

## 4. Folder structure (modular)

```
src/
  app/
    [lang]/                 one folder per page: page.tsx only wires sections together
      page.tsx              Acasă
      cazare/page.tsx
      masa-la-noi/page.tsx
      lavanda/page.tsx
      contact/page.tsx
    admin/                  owner's page for table requests
  content/                  ALL text and facts, no text inside components
    site.ts                 phone, email, address, Booking link, hours, distances
    ro.ts  en.ts            page copy per language
    photos.ts               one list of photos: file, alt text, section
  components/
    ui/                     small pieces: Button, Photo, Container, Heading, Field
    layout/                 Header, MobileMenu, Footer, LangSwitch
    sections/               page sections: Hero, ServiceBlock, LavenderBand,
                            Nearby, ContactBlock, Gallery, Lightbox, Facilities, ...
  features/
    reservations/           everything about table requests in one place:
                            form, validation, server action, db, email, admin list
  lib/                      shared helpers (i18n, dates)
  styles/                   tokens and global CSS
public/photos/              optimised photos, grouped by section
docs/                       this plan, deploy notes
```

Rules that keep it modular:

1. A page file only arranges sections. It holds no layout CSS and no copy.
2. A section gets its text and photos through props, so it can be reused and tested alone.
3. Text lives in `content/`. Changing a phone number or a sentence never touches a component.
4. The reservations feature is self-contained. The rest of the site works without it.
5. Colours, fonts and spacing come only from the tokens.

## 5. Milestones

Each milestone ends with a working site and one or more commits. Commits are small
and say what changed (for example `feat(home): add service blocks`).

| # | Milestone | What you can see at the end |
|---|---|---|
| 0 | Repo and plan | This document |
| 1 | Foundation | Project runs; fonts, colours, Button, Photo, Container match Figma |
| 2 | Layout and languages | Header, mobile menu, footer, `/ro` and `/en`, language switch |
| 3 | Acasă | Home page matches Figma on mobile and desktop. **Review stop** |
| 4 | Cazare | Page, photo gallery with the enlarged view, fixed Booking button on mobile |
| 5 | Masa la noi (content) | Page without the working form yet |
| 6 | Lavanda and Contact | Both pages, map |
| 7 | Table requests | Form with its 4 states, sent to the owner by WhatsApp and email (docs/notifications.md) |
| 8 | ~~Admin~~ | Dropped for now (owner decision): WhatsApp and email are enough. The Figma screen stays for later |
| 9 | Quality pass | Done: metadata, share images, sitemap, robots, structured data, 404 page, site icon, skip link and focus rings, AVIF photos, English review. Lighthouse 97–100 everywhere; axe finds no problems |
| 10 | Publish | Server, domain, HTTPS, automatic deploy, backup of the database |

After milestone 3 we stop and compare with Figma before building the other pages,
so any shared problem is fixed once.

## 6. How each milestone is checked

- Run the site and compare each page with its Figma frame at 390px and 1440px.
- `npm run lint` and `npm run build` pass before every commit that ends a milestone.
- Milestone 7: `scripts/check-form.mjs` walks through the form (errors, sending,
  success); failure, rate limit and the spam trap are checked against a server with no
  sending set up.

## 7. Information still needed (placeholders until then)

- ~~Phone and WhatsApp number, email address~~ +40 751 425 215, robumihaela69@gmail.com.
- ~~Food opening hours~~ 11:00–18:00, tables for at most 2 hours, up to 25 guests.
- Domain name (for example `casutadinlivezi.ro`).
- Exact map position of the property.
- Photo of the lavender field in bloom.
- ~~Email or WhatsApp alerts~~ WhatsApp, with email as backup. Needs the CallMeBot key and a Gmail app password.

Known already: Booking page
`https://www.booking.com/hotel/ro/casuta-din-livezi-suceava2.html`, check-in from
15:00, check-out until 11:00, no pets, no smoking.

## 8. Not in the first version

- Online payment.
- Automatic limits per time slot for tables.
- A content editor for the owner (text changes go through the `content/` files).
- A separate events page (events stay a block on Masa la noi).
