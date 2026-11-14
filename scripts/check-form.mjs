// Walks through the table request form like a guest and saves the states as
// screenshots (.screenshots/formular-*.png) for comparing with docs/design/screens/.
// Run against a server started with RESERVATIONS_DRY_RUN=1 so nothing is really sent.
//   node scripts/check-form.mjs [base-url]
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
const report = {};
const form = () => page.locator("#rezervare");

await page.goto(`${base}/ro/masa-la-noi#rezervare`, { waitUntil: "networkidle" });

// 1. Empty form: every required field should complain, focus on the first.
await page.getByRole("button", { name: "Trimite cererea" }).click();
await page.waitForSelector("#rezervare-nume-error");
report.emptyErrors = await form().locator(".text-error").allTextContents();
report.focusAfterEmpty = await page.evaluate(() => document.activeElement?.getAttribute("name"));
await form().screenshot({ path: ".screenshots/formular-eroare.png" });

// 2. Fill in, with a phone number that is too short: only the phone should complain.
await page.fill("#rezervare-nume", "Ana Popescu");
await page.fill("#rezervare-telefon", "0744");
await page.selectOption("#rezervare-data", { index: 3 });
await page.selectOption("#rezervare-ora", "13:00");
await page.selectOption("#rezervare-persoane", "4");
await page.fill("#rezervare-mentiuni", "Fără nuci, vă rugăm.");
await page.getByRole("button", { name: "Trimite cererea" }).click();
await page.waitForTimeout(800);
report.shortPhoneErrors = await form().locator(".text-error").allTextContents();
report.keptName = await page.inputValue("#rezervare-nume");
report.keptTime = await page.inputValue("#rezervare-ora");

// 3. Fix the phone and send; hold the response back a moment to see "Se trimite…".
await page.fill("#rezervare-telefon", "0744 123 214");
await page.route("**/ro/masa-la-noi*", async (route) => {
  if (route.request().method() !== "POST") return route.continue();
  const response = await route.fetch();
  await new Promise((r) => setTimeout(r, 1500));
  await route.fulfill({ response });
});
await page.getByRole("button", { name: "Trimite cererea" }).click();
await page.waitForSelector("text=Se trimite…");
report.sendingShown = true;
await form().screenshot({ path: ".screenshots/formular-trimitere.png" });

// 4. Success.
try {
  await page.waitForSelector("text=Am primit cererea.", { timeout: 10_000 });
} catch (error) {
  console.log("no success; page says:", await form().locator(".text-error, [role=alert]").allTextContents());
  throw error;
}
await form().screenshot({ path: ".screenshots/formular-succes.png" });
report.success = true;

// 5. "Trimite o altă cerere" brings back an empty form.
await page.getByRole("button", { name: "Trimite o altă cerere" }).click();
report.freshFormName = await page.inputValue("#rezervare-nume");

console.log(JSON.stringify(report, null, 1));
await browser.close();
