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

test("persists and resets course progress in the browser", async ({ page }) => {
  await page.goto("/courses/control");
  await expect(page.getByRole("heading", { name: "What Is Within My Control?" })).toBeVisible();

  await page.getByRole("button", { name: /complete and continue/i }).click();
  await expect(page.getByRole("heading", { name: "From the Stoa to Epictetus" })).toBeVisible();

  await page.reload();
  await expect(page.getByRole("heading", { name: "From the Stoa to Epictetus" })).toBeVisible();
  await expect(page.locator(".progress-summary strong")).toHaveText("17%");

  await page.getByRole("button", { name: /reset local progress/i }).click();
  await expect(page.getByRole("heading", { name: "A practical distinction" })).toBeVisible();
  await expect(page.locator(".progress-summary strong")).toHaveText("0%");
});
