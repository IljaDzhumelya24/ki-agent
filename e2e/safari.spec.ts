import { expect, test } from "@playwright/test";

const routes = ["/", "/loesungen", "/branchen", "/preise", "/kontakt"];

test("marketing pages stay readable without horizontal overflow", async ({ page }) => {
  for (const width of [390, 1440]) {
    await page.setViewportSize({ width, height: width < 600 ? 844 : 900 });
    for (const route of routes) {
      const errors: string[] = [];
      const onError = (error: Error) => errors.push(error.message);
      page.on("pageerror", onError);
      await page.goto(route);
      await expect(page.locator("main h1")).toBeVisible();
      expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `${route} at ${width}px`).toBe(true);
      expect(errors, `${route} at ${width}px`).toEqual([]);
      page.off("pageerror", onError);
    }
  }
});

test("the phone story remains visible through all three chapters", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(page.locator(".entry-intro")).toHaveCount(0);
  await page.locator("#channels").scrollIntoViewIfNeeded();
  const story = page.locator("#channels");
  const bounds = await story.boundingBox();
  expect(bounds).not.toBeNull();
  for (const progress of [0.1, 0.45, 0.85]) {
    await page.evaluate(({ top, height, progress }) => window.scrollTo(0, top + scrollY + height * progress), {
      top: bounds!.y,
      height: bounds!.height,
      progress,
    });
    await page.waitForTimeout(700);
    const phone = page.locator(".signal-device-stage--mobile .signal-phone");
    const box = await phone.boundingBox();
    expect(box, `phone missing at ${progress}`).not.toBeNull();
    expect(box!.height, `phone too short at ${progress}`).toBeGreaterThan(300);
    expect(box!.y, `phone above viewport at ${progress}`).toBeGreaterThanOrEqual(0);
    expect(box!.y + box!.height, `phone below viewport at ${progress}`).toBeLessThanOrEqual(844);
    await page.screenshot({ path: testInfo.outputPath(`phone-${progress}.png`) });
  }
});

test("mobile navigation opens, closes and restores scroll", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Menü öffnen" }).click();
  await expect(page.getByRole("dialog", { name: "Hauptnavigation" })).toBeVisible();
  await page.getByRole("button", { name: "Menü schließen" }).click();
  await expect(page.getByRole("dialog", { name: "Hauptnavigation" })).toHaveCount(0);
  expect(await page.evaluate(() => getComputedStyle(document.body).overflow)).not.toBe("hidden");
});

test("mobile navigation preserves the current section when dismissed", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/loesungen");
  await page.locator("#ablauf").scrollIntoViewIfNeeded();
  await page.waitForTimeout(400);
  await page.evaluate(() => window.scrollBy(0, -120));
  await expect(page.locator("header")).toHaveAttribute("data-scroll-state", "shown");
  await expect(page.locator("header")).toHaveCSS("pointer-events", "auto");
  const before = await page.evaluate(() => scrollY);
  await page.getByRole("button", { name: "Menü öffnen" }).click();
  await page.screenshot({ path: testInfo.outputPath("mobile-menu.png") });
  await page.getByRole("button", { name: "Menü schließen" }).click();
  expect(Math.abs((await page.evaluate(() => scrollY)) - before)).toBeLessThan(4);
});

test("the desktop phone stays visible at the final chapter transition", async ({ page }, testInfo) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/");
  await expect(page.locator(".entry-intro")).toHaveCount(0);
  const story = page.locator("#channels");
  const bounds = await story.boundingBox();
  expect(bounds).not.toBeNull();
  await page.evaluate(({ top, height }) => window.scrollTo(0, top + scrollY + height * 0.9), {
    top: bounds!.y,
    height: bounds!.height,
  });
  await page.waitForTimeout(900);
  const phone = page.locator(".signal-device-rail .signal-phone");
  const box = await phone.boundingBox();
  expect(box).not.toBeNull();
  expect(box!.y).toBeGreaterThanOrEqual(0);
  expect(box!.y + box!.height).toBeLessThanOrEqual(900);
  await page.screenshot({ path: testInfo.outputPath("desktop-transition.png") });
});

test("mobile solution panels and pricing calculator respond to input", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/loesungen");
  await page.getByRole("button", { name: "WhatsApp" }).click();
  await expect(page.locator("#mobile-channel-whatsapp")).toContainText("10:30 Uhr passt.");

  await page.goto("/preise");
  await page.locator("#missed-requests").focus();
  await page.locator("#missed-requests").press("ArrowRight");
  await expect(page.locator('label[for="missed-requests"] strong')).toHaveText("25");
  await expect(page.locator('span[aria-live="polite"]')).toContainText(/1\.125\s*€/);
});

test("contact form fields remain usable and validate before mail handoff", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/kontakt");
  await page.getByLabel("Dein Name").fill("Test Person");
  await page.getByLabel("Deine E-Mail").fill("keine-mail");
  await page.getByLabel("Deine Nachricht").fill("Ich möchte eine Demo.");
  expect(await page.locator("form").evaluate((form: HTMLFormElement) => form.checkValidity())).toBe(false);
  await page.getByLabel("Deine E-Mail").fill("test@example.com");
  expect(await page.locator("form").evaluate((form: HTMLFormElement) => form.checkValidity())).toBe(true);
});

test("short mobile viewport and reduced motion keep the phone narrative readable", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 650 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator("#channels").scrollIntoViewIfNeeded();
  await expect(page.locator("#channels .signal-chapter h2")).toHaveCount(3);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await expect(page.locator(".signal-device-stage--mobile .signal-phone")).toBeVisible();
});
