import { expect, test } from "@playwright/test";

const routes = [
  ["/", "Home"],
  ["/about", "About Us"],
  ["/contact", "Contact Us"],
  ["/art-healing", "Art Healing 101"],
  ["/toolbox", "Healing Activities Toolbox"],
  ["/toolbox/draw-the-music", "Draw the Music"],
  ["/resources", "Resource Guide"],
  ["/corridor", 'The "Right Now" Corridor'],
] as const;

for (const [route, title] of routes) {
  test(`${route} renders its static desktop frame`, async ({ page }) => {
    await page.goto(route);
    await expect(page).toHaveTitle(new RegExp(title));
    await expect(page.locator(".page-content")).toHaveCSS("width", "1440px");
    await expect(page.locator(".site-header")).toBeVisible();
    await expect(page.locator(".site-footer")).toBeVisible();
  });
}

test("desktop canvas fills viewports wider than the design frame", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1444, height: 900 });
  await page.goto("/");

  const geometry = await page.evaluate(() => {
    const canvas = document.querySelector(".site-canvas")?.getBoundingClientRect();
    const content = document.querySelector(".page-content")?.getBoundingClientRect();
    const hero = document.querySelector(".hero");
    const heroBleed = hero && getComputedStyle(hero, "::before");

    return {
      canvas: canvas && { left: canvas.left, right: canvas.right },
      content: content && {
        left: content.left,
        right: content.right,
        width: content.width,
      },
      heroBleed: heroBleed && {
        left: Number.parseFloat(heroBleed.left),
        width: Number.parseFloat(heroBleed.width),
      },
      viewportWidth: window.innerWidth,
    };
  });

  expect(geometry.canvas).toEqual({ left: 0, right: geometry.viewportWidth });
  expect(geometry.content).toEqual({ left: 2, right: 1442, width: 1440 });
  expect(geometry.heroBleed).toEqual({ left: -2, width: geometry.viewportWidth });
});

test("hero CTA matches the design scale and uses a Lucide arrow", async ({
  page,
}) => {
  await page.goto("/");
  const heroButton = page.locator(".hero-button");

  await expect(heroButton).toHaveCSS("width", "290px");
  await expect(heroButton).toHaveCSS("height", "64px");
  await expect(heroButton).toHaveCSS("font-size", "14px");
  await expect(heroButton.locator("svg.lucide-arrow-right")).toHaveCount(1);
});

test("navigation marks the current route", async ({ page }) => {
  await page.goto("/resources");
  await expect(page.locator('.site-header a[href="/resources"]')).toHaveClass(
    /active/,
  );
});

test("narrow viewports retain the fixed desktop canvas", async ({ page }) => {
  await page.setViewportSize({ width: 1000, height: 800 });
  await page.goto("/");
  const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
  expect(scrollWidth).toBeGreaterThanOrEqual(1440);
});

test("toolbox category filters cards locally", async ({ page }) => {
  await page.goto("/toolbox");
  await expect(page.locator(".toolbox-filter__card")).toHaveCount(4);
  await page.getByRole("button", { name: "MUSIC & SOUND" }).click();
  await expect(page.locator(".toolbox-filter__card")).toHaveCount(1);
  await expect(page.locator(".toolbox-filter__category")).toHaveText(
    "Music & Sound",
  );
});

test("corridor dialog supports modes, submit, escape, and focus return", async ({
  page,
}) => {
  await page.goto("/corridor");
  const trigger = page.getByRole("button", { name: "Share Your Glimpse" });
  await trigger.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await page.getByRole("button", { name: "TEXT" }).click();
  await expect(page.getByRole("button", { name: "TEXT" })).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "SUBMIT" }).click();
  await expect(dialog).toContainText("text glimpse");
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(trigger).toBeFocused();
});

test("contact form validates and shows local success feedback", async ({ page }) => {
  await page.goto("/contact");
  await page.getByRole("button", { name: /SEND MESSAGE/ }).click();
  await expect(page.locator(".contact-demo .island-status")).toContainText(
    "complete",
  );
  await page.getByLabel("YOUR NAME").fill("Toshiki");
  await page.getByLabel("EMAIL ADDRESS").fill("hello@example.com");
  await page.getByLabel("SUBJECT").fill("Hello");
  await page.getByLabel("MESSAGE CONTENT").fill("A small note.");
  await page.getByRole("button", { name: /SEND MESSAGE/ }).click();
  await expect(page.locator(".contact-demo .island-status")).toContainText(
    "Thank you",
  );
});

test("activity actions keep like state locally and share when supported", async ({
  page,
}) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, "share", {
      configurable: true,
      value: async () => undefined,
    });
  });
  await page.goto("/toolbox/draw-the-music");
  await page.getByRole("button", { name: /LIKE/ }).click();
  await expect(page.getByRole("button", { name: /LIKED/ })).toBeVisible();
  await page.getByRole("button", { name: /SHARE/ }).click();
  await expect(page.locator(".activity-actions")).toBeVisible();
});
