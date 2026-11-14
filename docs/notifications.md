# Table requests: how they reach the family

Code: `src/features/reservations/`. There is no database and no admin page (owner
decision, 2026-11-14): each request is sent as a WhatsApp message and as an email, and the
email inbox is the history. An admin page can be added later without changing the form.

## What happens on "Trimite cererea"

1. The server checks the request (`validate.ts`): a name, a phone number with 9–15
   digits, a date in the next 60 days, one of the listed times (11:00–16:00, so a table
   of at most 2 hours ends by 18:00), and 1–25 guests or "more than 25".
2. Spam protection (`actions.ts`): a hidden field that only bots fill in, and at most 5
   requests per visitor in 10 minutes.
3. The request is sent (`notify.ts`) by WhatsApp and by email at the same time. It
   counts as delivered if at least one arrives. If neither arrives, the guest is asked
   to call +40 751 425 215.

The message, in Romanian:

```
Cerere nouă de masă (de pe site)

Nume: Ana Popescu
Telefon: 0744 123 214
Data: luni, 16 noiembrie 2026
Ora: 13:00 (până la 15:00)
Persoane: 4
Mențiuni: Fără nuci, vă rugăm.
Limba paginii: RO
```

## Settings

Copy `.env.example` to `.env.local` for development, or set the same variables on the
server. With nothing set, `npm run dev` prints requests to the terminal instead of
sending them; production refuses to pretend and shows the guest the phone number.

### WhatsApp (CallMeBot)

Free and meant for personal use; it is not an official WhatsApp product, so the email
is the backup. To activate, on the phone that should receive the alerts (+40 751 425 215):

1. Open https://www.callmebot.com/blog/free-api-whatsapp-messages/ and save the bot's
   current phone number in Contacts (the number has changed over the years, so take it
   from that page).
2. Send the bot this WhatsApp message: `I allow callmebot to send me messages`
3. The bot answers with an API key. Put it in `CALLMEBOT_APIKEY`.

If no key arrives within a couple of minutes, try again after 24 hours.

### Email (Gmail)

Use a Gmail account with two-step verification turned on:

1. Google Account → Security → App passwords → create one named "Căsuța site".
2. Set `SMTP_USER` to that Gmail address and `SMTP_PASS` to the 16-letter app password.
3. Requests go to `NOTIFY_EMAIL` (default robumihaela69@gmail.com).

## Testing

`RESERVATIONS_DRY_RUN=1 npm run build && RESERVATIONS_DRY_RUN=1 npm start`, then
`node scripts/check-form.mjs http://localhost:3000`. It fills the form like a guest,
checks the error, sending and success states, and saves screenshots in `.screenshots/`.
