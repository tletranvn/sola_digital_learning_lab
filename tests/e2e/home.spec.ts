import { expect, test } from "@playwright/test";

test("introduces Sola and links to the learning experiences", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: /ideas become experiences/i })).toBeVisible();
  await page.getByRole("link", { name: /explore the experiences/i }).click();
  await expect(page.getByRole("heading", { name: "Learning experiences" })).toBeVisible();
});

test("keeps the foundation routes usable on a narrow keyboard-driven viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 360, height: 800 });

  for (const path of ["/", "/courses", "/courses/control", "/about", "/accessibility"]) {
    await page.goto(path);
    await expect(page.locator("h1")).toBeVisible();
  }

  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to main content" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("#main-content")).toBeFocused();
});
