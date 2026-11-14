// Screenshots pages at the two Figma widths (390 and 1440) for comparing with
// docs/design/screens/. Scrolls through each page first so lazy images load.
// Needs the site running (e.g. `npm run dev`).
//
//   node scripts/screenshots.mjs [base-url] [path ...]
//   node scripts/screenshots.mjs http://localhost:3000 /ro /ro/cazare
//
// Output: .screenshots/<page>-mobil.png and <page>-desktop.png (not committed).
import { mkdirSync } from "node:fs";
import { chromium } from "playwright";

const [base = "http://localhost:3000", ...args] = process.argv.slice(2);
const paths = args.length ? args : ["/ro/styleguide"];
const widths = { mobil: [390, 844], desktop: [1440, 900] };
mkdirSync(".screenshots", { recursive: true });

const browser = await chromium.launch();
for (const path of paths) {
  const name = path.replace(/^\//, "").replace(/\//g, "-") || "acasa";
  for (const [label, [width, height]] of Object.entries(widths)) {
    const page = await browser.newPage({ viewport: { width, height } });
    await page.goto(base + path, { waitUntil: "networkidle" });
    // Scroll down in steps so lazy images start loading, then back to the top.
    const total = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < total; y += height / 2) {
      await page.evaluate((top) => window.scrollTo(0, top), y);
      await page.waitForTimeout(100);
    }
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForLoadState("networkidle");
    await page.evaluate(() => Promise.all([...document.images].map((img) => img.decode().catch(() => {}))));
    const file = `.screenshots/${name}-${label}.png`;
    await page.screenshot({ path: file, fullPage: true });
    console.log(file);
    await page.close();
  }
}
await browser.close();
