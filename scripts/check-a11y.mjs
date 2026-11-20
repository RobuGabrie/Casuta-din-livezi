// Runs axe (WCAG 2.1 A and AA rules) on every page at 390px and 1440px.
//   node scripts/check-a11y.mjs [base-url]
import AxeBuilder from "@axe-core/playwright";
import { chromium } from "playwright";

const base = process.argv[2] ?? "http://localhost:3000";
const paths = ["/ro", "/ro/cazare", "/ro/masa-la-noi", "/ro/lavanda", "/ro/imprejurimi", "/ro/contact", "/en", "/ro/nu-exista"];
const browser = await chromium.launch();
let total = 0;
for (const width of [390, 1440]) {
  for (const path of paths) {
    const context = await browser.newContext({ viewport: { width, height: 900 } });
    const page = await context.newPage();
    await page.goto(base + path, { waitUntil: "networkidle" });
    const { violations } = await new AxeBuilder({ page }).withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"]).analyze();
    for (const v of violations) {
      total += v.nodes.length;
      console.log(`${width} ${path}  [${v.impact}] ${v.id}: ${v.help}`);
      for (const n of v.nodes.slice(0, 3)) console.log(`     ${n.target.join(" ")}  ${n.failureSummary?.split("\n")[1]?.trim() ?? ""}`);
    }
    await context.close();
  }
}
console.log(total ? `${total} problem(s) found` : "no problems found");
await browser.close();
