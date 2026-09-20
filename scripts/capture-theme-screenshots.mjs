/**
 * Recapture README theme screenshots from the live showcase.
 *
 *   npx --yes puppeteer-core@24 node scripts/capture-theme-screenshots.mjs
 *
 * Optional: SHOWCASE_URL (default Pages URL), CHROME_PATH (default macOS Chrome).
 */
import puppeteer from "puppeteer-core";
import { mkdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "docs/images");
const url = process.env.SHOWCASE_URL ?? "https://core-design-system.pages.dev/";
const executablePath =
  process.env.CHROME_PATH ??
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome";

await mkdir(outDir, { recursive: true });

const browser = await puppeteer.launch({
  executablePath,
  headless: true,
  args: ["--hide-scrollbars", "--no-sandbox", "--disable-setuid-sandbox"],
  defaultViewport: { width: 1440, height: 900, deviceScaleFactor: 2 },
});

const page = await browser.newPage();
await page.goto(url, { waitUntil: "networkidle0", timeout: 60000 });

async function clickNamed(role, name) {
  await page.evaluate(
    ({ role, name }) => {
      const nodes = [...document.querySelectorAll(`[role="${role}"], a`)];
      const target = nodes.find((el) => el.textContent?.trim() === name);
      if (!target) throw new Error(`Missing ${role} ${name}`);
      target.click();
    },
    { role, name }
  );
  await new Promise((r) => setTimeout(r, 350));
}

for (const theme of ["Indigo", "Forge"]) {
  await clickNamed("radio", theme);
  await clickNamed("link", "Introduction");
  await page.evaluate(() => window.scrollTo(0, 0));
  await new Promise((r) => setTimeout(r, 200));
  const file =
    theme === "Indigo" ? "showcase-indigo.png" : "showcase-forge.png";
  await page.screenshot({ path: path.join(outDir, file), type: "png" });
}

await browser.close();
console.log("Wrote docs/images/showcase-indigo.png and showcase-forge.png");
