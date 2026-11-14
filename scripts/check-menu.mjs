// Opens the mobile menu at 390px and saves a screenshot, for comparing with
// docs/design/screens/meniu-mobil-deschis.jpg. Also checks Escape closes it.
//   node scripts/check-menu.mjs [base-url]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
await page.goto(`${base}/ro`);
await page.getByRole("button", { name: "Deschide meniul" }).click();
await page.waitForTimeout(300);
await page.screenshot({ path: ".screenshots/meniu-mobil-deschis.png" });
const open = await page.locator("dialog[open]").count();
await page.keyboard.press("Escape");
await page.waitForTimeout(200);
const closed = await page.locator("dialog[open]").count();
const scrollLocked = await page.evaluate(() => document.documentElement.style.overflow);
console.log(JSON.stringify({ openedDialogs: open, afterEscape: closed, overflowAfterClose: scrollLocked }));
await browser.close();
