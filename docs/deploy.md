# Publishing on the Oracle server with Cloudflare

The site runs on the existing Oracle Cloud server (the one that hosted
`scolaritate-usv-proxy`), published through its own **Cloudflare Tunnel**, so the server
needs no open web ports. GitHub Actions builds and deploys it on every push to `main`
(`.github/workflows/deploy.yml`), the same pattern the proxy used.

Cost: €0 for hosting; the domain is about €10/year.
Backup plan if the Oracle server goes away: `docs/deploy-hetzner-coolify.md`. Nothing
lives only on the server (no database), so moving takes about an hour.

How it fits together:

```
push to main → GitHub Actions: lint, type-check, build image → ghcr.io/robugabrie/casuta-din-livezi
             → SSH to the server: copy deploy/docker-compose.yml, write .env, docker compose up
visitor → Cloudflare → tunnel (cloudflared container on the server) → web container :3000
```

Tested locally on 2026-11-15 with the same compose file: healthy, photos cached in the
volume, about 160 MB of memory (limit 512 MB).

## 1. Free the server (you)

1. In the `scolaritate-usv-proxy` repo: Actions → "CI & Deploy" → ⋯ → **Disable
   workflow**, so a push there doesn't start it again.
2. On the server: `cd ~/scolaritate-usv-proxy && docker compose down`
   (add `-v` to also delete its Grafana and Loki data).

## 2. Domain on Cloudflare (you)

1. Buy `casutadinlivezi.ro` at a .ro registrar (ROMARG, Hostico…). Cloudflare can't
   sell .ro domains.
2. Cloudflare dashboard → **Add a domain** → `casutadinlivezi.ro` → Free plan.
3. Cloudflare shows two nameservers. At the registrar, replace the domain's nameservers
   with those two. Wait until Cloudflare says the domain is **Active** (minutes to a
   few hours).
4. SSL/TLS → Edge Certificates → **Always Use HTTPS: on**.

## 3. Tunnel (you)

1. Cloudflare → Zero Trust → Networks → **Tunnels** → Create a tunnel → Cloudflared →
   name it `casuta`.
2. On the install screen, copy the **token** (the long string after `--token` in the
   shown command). Don't run the command; the server runs cloudflared in Docker.
3. Public hostnames → add two, both with Service **HTTP** and URL **`web:3000`**:
   - `casutadinlivezi.ro`
   - `www.casutadinlivezi.ro`

## 4. Cloudflare rules (you, once)

- Rules → Redirect Rules → template **"Redirect from WWW to root"**.
- Caching → Cache Rules → new rule "Photos and assets": when **URI Path starts with**
  `/_next/image` **or** `/_next/static` **or** `/photos/` **or** `/og/` → **Eligible for
  cache**, Edge TTL: **use cache-control header if present**. The server's small CPU
  then converts each photo once and Cloudflare serves it after that.

## 5. GitHub secrets and settings (you)

In `Casuta-din-livezi` → Settings → Secrets and variables → Actions:

| Secret | Value |
|---|---|
| `SERVER_HOST` | same as in the proxy repo (the server's IP or name) |
| `SERVER_USER` | same as in the proxy repo |
| `SERVER_SSH_KEY` | same private key as in the proxy repo |
| `CLOUDFLARE_TUNNEL_TOKEN` | the token from step 3 |
| `CALLMEBOT_APIKEY` | from WhatsApp, see docs/notifications.md |
| `SMTP_USER` | the Gmail address that sends the copies |
| `SMTP_PASS` | its app password, see docs/notifications.md |

GitHub never shows a saved secret again, so the three `SERVER_*` values have to come
from wherever you kept them when you set up the proxy. If the SSH key is lost, make a
new one (`ssh-keygen -t ed25519 -f ~/.ssh/casuta_deploy`), add the `.pub` line to
`~/.ssh/authorized_keys` on the server (Oracle console → instance → Console connection
or Cloud Shell), and use the new private key.

Variables tab:

| Variable | Value |
|---|---|
| `DEPLOY_ENABLED` | `true` (deploys are off until this is set) |
| `SITE_URL` | optional; defaults to `https://casutadinlivezi.ro` |

## 6. First deploy

Actions → "Check & deploy" → **Run workflow** (or push to `main`). The deploy job:
copies `deploy/docker-compose.yml` to `~/casuta-din-livezi` on the server, writes `.env`
there from the secrets (readable only by that user), pulls the image and starts the
`web` and `tunnel` containers. Its log ends with `docker compose ps`.

## 7. Check

- `https://casutadinlivezi.ro` opens and goes to `/ro`; `www.` redirects.
- Send one real table request: the WhatsApp message and the email arrive.
- In Cloudflare Zero Trust → Tunnels, `casuta` shows **Healthy**.

## Day to day

- Every push to `main` deploys by itself in about 3–5 minutes.
- On the server: `cd ~/casuta-din-livezi && docker compose ps` (status),
  `docker compose logs -f web` (logs), `docker compose restart` (restart).
- Oracle Always Free: idle servers can be reclaimed. Upgrading the Oracle account to
  Pay As You Go (still €0 within the free limits) is reported to prevent that; set a
  budget alert of €1 so any charge is noticed.

## After launch

- Google Search Console → add the site → submit `https://casutadinlivezi.ro/sitemap.xml`.
- Link the site from Google Business, Booking.com, Airbnb, Facebook and both Instagram
  bios.
