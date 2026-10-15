import { expect, test } from "@playwright/test";

test("hero stays readable and within the viewport on desktop and mobile", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });

  await page.goto("/");
  await expect(
    page.getByRole("heading", {
      level: 1,
      name: "Ein Agent. Jeder Kanal. Keine Anfrage verloren.",
    }),
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Demo starten" }).first()).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);

  await page.setViewportSize({ width: 390, height: 844 });
  await page.reload();
  await expect(page.getByRole("heading", { name: /Ein Agent/ })).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
  ).toBe(true);
  expect(errors).toEqual([]);
});

test("reduced motion reveals the complete hero without scrubbed animation", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /Keine Anfrage verloren/ })).toBeVisible();
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
    page.getByRole("img", { name: "Abstrakter KI-Agent mit vier verbundenen Kanälen" }),
  ).toBeVisible();
});

test("complete narrative and planned navigation remain usable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");

  await page.getByRole("button", { name: "Menü öffnen" }).click();
  const dialog = page.getByRole("dialog", { name: "Hauptnavigation" });
  await expect(dialog).toBeVisible();
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
