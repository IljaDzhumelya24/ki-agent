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
