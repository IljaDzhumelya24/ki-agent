import { expect, test } from "@playwright/test";

test("hero centers the black hole and fills the viewport on desktop and mobile", async ({ page }) => {
  const errors: string[] = [];
  const relevantWarnings: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
    const isChromiumReadbackDiagnostic = /GL Driver Message.*GPU stall due to ReadPixels/i.test(message.text());
    if (message.type() === "warning" && !isChromiumReadbackDiagnostic && /deprecated|WebGL|hydration/i.test(message.text())) {
      relevantWarnings.push(message.text());
    }
  });

  await page.goto("/");
  await expect(
    page.getByRole("img", { name: "Statische Darstellung eines schwarzen Lochs mit Akkretionsscheibe" }),
  ).toBeVisible();
  await expect(page.getByTestId("signal-core-canvas")).toHaveCount(0);
  await expect(page.locator("#top h1")).toHaveCount(0);
  const navCenter = await page.getByRole("navigation", { name: "Hauptnavigation" }).evaluate((nav) => {
    const { left, width } = nav.getBoundingClientRect();
    return left + width / 2;
  });
  expect(Math.round(navCenter)).toBe(Math.round(await page.evaluate(() => window.innerWidth / 2)));
  expect(
    await page.locator("#top").evaluate((hero) => Math.round(hero.getBoundingClientRect().height)),
  ).toBe(await page.evaluate(() => window.innerHeight));
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect(page.locator("#top [role='img']")).toBeVisible();
  await expect(page.locator("#top h1")).toHaveCount(0);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
  expect(errors).toEqual([]);
  expect(relevantWarnings).toEqual([]);
});

test("reduced motion keeps the black-hole fallback visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(
    page.getByRole("img", { name: "Statische Darstellung eines schwarzen Lochs mit Akkretionsscheibe" }),
  ).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("data-motion", "reduced");
});

test("WebGL absence renders intentional fallback artwork", async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, "WebGL2RenderingContext", {
      configurable: true,
      value: undefined,
    });
  });
  await page.goto("/");

  await expect(
    page.getByRole("img", { name: "Statische Darstellung eines schwarzen Lochs mit Akkretionsscheibe" }),
  ).toBeVisible();
});

test("complete narrative and planned navigation remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Menü öffnen" }).click();
  const dialog = page.getByRole("dialog", { name: "Hauptnavigation" });
  await expect(dialog).toBeVisible();
  await expect(page.getByRole("button", { name: "Menü schließen" })).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(dialog.getByRole("button", { name: /Preise.*in Vorbereitung/i })).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(page.getByRole("button", { name: "Menü schließen" })).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(page.getByRole("button", { name: "Menü öffnen" })).toBeFocused();

  await page.getByRole("button", { name: "Menü öffnen" }).click();
  await dialog.getByRole("button", { name: /Lösungen.*in Vorbereitung/i }).click();
  await expect(page.getByRole("status")).toContainText("Lösungen ist in Vorbereitung");
  await expect(page).toHaveURL(/\/$/);

  await page.keyboard.press("Escape");
  await page.keyboard.press("Tab");
  expect(
    await page.evaluate(() => {
      const active = document.activeElement;
      return active instanceof HTMLElement && getComputedStyle(active).outlineStyle !== "none";
    }),
  ).toBe(true);

  for (const heading of [
    "Vier Türen. Ein Gehirn.",
    "Kein Bot. Ein System, das handelt.",
    "Gebaut für den echten Betrieb.",
    "Wert, der sich messen lässt.",
    "Von der ersten Frage bis zum Go-live.",
    "Ein Einstieg, der mitwächst.",
    "Bereit, keinen Anruf mehr zu verlieren?",
  ]) {
    await expect(page.getByRole("heading", { name: heading })).toBeAttached();
  }

  await expect(
    page.getByRole("button", { name: /Branchen-Seite in Vorbereitung/i }),
  ).toHaveCount(8);
  await page.getByRole("heading", { name: "Bereit, keinen Anruf mehr zu verlieren?" }).scrollIntoViewIfNeeded();
  await expect(page.getByRole("link", { name: "Demo anfragen" })).toBeVisible();
});

test("every same-page call to action resolves to an existing section", async ({ page }) => {
  await page.goto("/");

  const unresolvedTargets = await page.locator('a[href^="#"]').evaluateAll((links) =>
    links
      .map((link) => link.getAttribute("href"))
      .filter((href): href is string => Boolean(href) && document.querySelector(href!) === null),
  );

  expect(unresolvedTargets).toEqual([]);
});

test("essential sales narrative remains readable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Vier Türen. Ein Gehirn." })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Gebaut für den echten Betrieb." })).toBeAttached();
  await expect(page.getByRole("heading", { name: "Bereit, keinen Anruf mehr zu verlieren?" })).toBeAttached();
  await expect(
    page.getByRole("img", { name: "Statische Darstellung eines schwarzen Lochs mit Akkretionsscheibe" }),
  ).toBeVisible();

  await context.close();
});

test("uses a slim dark scrollbar", async ({ page }) => {
  await page.goto("/");

  await expect(page.locator("html")).toHaveCSS("scrollbar-width", "thin");
  expect(
    await page.evaluate(() => getComputedStyle(document.documentElement, "::-webkit-scrollbar").width),
  ).toBe("8px");
});
