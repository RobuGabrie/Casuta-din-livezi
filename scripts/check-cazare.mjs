// Checks the Cazare page's interactive parts and saves screenshots for comparing
// with docs/design/screens/galerie-marita-*.jpg and cazare-mobil-buton-fix.jpg.
//   node scripts/check-cazare.mjs [base-url]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
const results = {};

for (const [label, viewport] of Object.entries({ desktop: { width: 1440, height: 900 }, mobil: { width: 390, height: 844 } })) {
  const page = await browser.newPage({ viewport });
  await page.goto(`${base}/ro/cazare`, { waitUntil: "networkidle" });
  if (label === "mobil") await page.screenshot({ path: ".screenshots/cazare-mobil-buton-fix.png" });

  await page.getByRole("button", { name: /Mărește fotografia: Livingul/ }).click();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `.screenshots/galerie-marita-${label}.png` });
  await page.keyboard.press("ArrowRight");
  await page.waitForTimeout(300);
  const second = await page.locator("dialog[open] img").getAttribute("alt");
  await page.keyboard.press("Escape");
  await page.waitForTimeout(200);
  results[label] = {
    afterArrowRight: second,
    closedByEscape: (await page.locator("dialog[open]").count()) === 0,
    stickyBarVisible: await page.locator("[data-sticky-bar]").isVisible(),
  };
  await page.close();
}
console.log(JSON.stringify(results, null, 1));
await browser.close();
