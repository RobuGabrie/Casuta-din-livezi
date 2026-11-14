# Publishing on a Hetzner server with Coolify

One small server runs this site and any future projects (sites, databases). Coolify is
a free control panel on that server: it builds the site from GitHub on every push and
handles HTTPS. Steps marked **you** need your accounts or payment details; the rest
can be done together.

The project is ready for it: `Dockerfile` builds the production image (tested locally:
all pages, photos, 404, sitemap and the table form work inside the container).

Checked on 2026-11-15 against Coolify's install and firewall docs. Prices change;
confirm on hetzner.com before ordering.

## 1. Domain (you)

Register `casutadinlivezi.ro` (it was free on 2026-11-15) at any .ro registrar, for
example ROMARG or Hostico, about €10/year. Don't buy hosting with it, only the domain.

## 2. SSH key on your Mac (you, once)

```bash
ssh-keygen -t ed25519 -C "gabi-mac"     # press Enter for the defaults, choose a passphrase
cat ~/.ssh/id_ed25519.pub               # copy this line for step 3
```

## 3. Server (you)

In the Hetzner Cloud console (console.hetzner.cloud):

1. Create a project, e.g. "Robu".
2. Add a server:
   - Location: Falkenstein or Nuremberg (Germany; ~25–35 ms from Romania).
   - Image: **Ubuntu 24.04**.
   - Type: **CX23** (2 vCPU, 4 GB RAM, 40 GB, 20 TB traffic; about €5.49/month + VAT)
     or **CAX11** (same, ARM). Coolify needs at least 2 cores and 2 GB RAM.
   - SSH key: paste the line from step 2.
   - **Backups: on** (+20%).
   - Name: e.g. `server-1`.
3. Firewalls → create one, attach it to the server, inbound rules (TCP):
   - 22 (SSH), 80, 443: keep.
   - 8000, 6001, 6002: Coolify dashboard; **remove after step 6**.
4. Note the server's IPv4 address.

## 4. DNS (you)

At the registrar, point the domain to the server (A records, the IPv4 from step 3):

| Name | Type | Value |
|---|---|---|
| `@` (casutadinlivezi.ro) | A | server IP |
| `www` | A | server IP |
| `coolify` | A | server IP (the dashboard) |

Changes can take from minutes to a few hours to work everywhere.

## 5. Install Coolify

```bash
ssh root@SERVER_IP
apt update && apt upgrade -y
curl -fsSL https://cdn.coollabs.io/coolify/install.sh | bash
```

**Right after it finishes**, open `http://SERVER_IP:8000` and create the admin account.
Coolify accepts the first account only in the first 10 minutes, and whoever registers
first controls the server. If the page says "Setup window closed", run
`docker restart coolify` and reload.

Then save a copy of `/data/coolify/source/.env` somewhere safe (a password manager): it
holds the keys needed to restore Coolify from a backup.

## 6. Dashboard on its own address

In Coolify: Settings → Instance's Domain → `https://coolify.casutadinlivezi.ro` → Save.
Once `https://coolify.casutadinlivezi.ro` opens, delete the 8000, 6001 and 6002 rules
from the Hetzner firewall.

## 7. Add the site

1. Sources → add a **GitHub App** and give it access to `RobuGabrie/Casuta-din-livezi`.
2. Projects → New → Add resource → Public/Private repository (GitHub App) → the repo,
   branch `main`.
3. Build Pack: **Dockerfile**. Port: **3000**.
4. Domains: `https://casutadinlivezi.ro,https://www.casutadinlivezi.ro`, and set the
   redirect to the non-www address.
5. Environment variables:

   | Name | Value | Build variable? |
   |---|---|---|
   | `SITE_URL` | `https://casutadinlivezi.ro` | **yes** |
   | `CALLMEBOT_APIKEY` | from docs/notifications.md | no |
   | `SMTP_HOST` | `smtp.gmail.com` | no |
   | `SMTP_PORT` | `465` | no |
   | `SMTP_USER` | the sending Gmail address | no |
   | `SMTP_PASS` | its app password | no |
   | `NOTIFY_EMAIL` | `robumihaela69@gmail.com` | no |

6. Deploy. The first build takes a few minutes. HTTPS certificates are created
   automatically once DNS points at the server.
7. Turn on **Automatic deployment** so every push to `main` publishes the site.

## 8. Check

- `https://casutadinlivezi.ro` opens and redirects to `/ro`; `www.` redirects too.
- Send a real table request and confirm the WhatsApp message and the email arrive.
- Optional: `node scripts/check-a11y.mjs https://casutadinlivezi.ro` and
  `node scripts/screenshots.mjs https://casutadinlivezi.ro /ro`.

## Later

- **Google:** add the site to Google Search Console and submit
  `https://casutadinlivezi.ro/sitemap.xml`. Link the site from the Google Business
  profile, Booking.com, Airbnb, Facebook and both Instagram bios.
- **Updates:** Ubuntu installs security updates automatically
  (`unattended-upgrades` is on by default); Coolify shows when it has an update.
- **More projects:** add each as a new resource in Coolify, with its own domain.
