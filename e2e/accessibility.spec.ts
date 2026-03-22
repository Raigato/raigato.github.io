import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("Accessibility", () => {
  test("homepage has no axe-core violations", async ({ page }) => {
    await page.goto("/");
    await page.waitForLoadState("networkidle");

    // Scroll through the full page so scroll-triggered sections are rendered
    await page.evaluate(async () => {
      await new Promise<void>((resolve) => {
        const distance = 300;
        const delay = 100;
        const timer = setInterval(() => {
          window.scrollBy(0, distance);
          if (
            window.scrollY + window.innerHeight >=
            document.body.scrollHeight
          ) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, delay);
      });
    });
    await page.waitForTimeout(500);

    const results = await new AxeBuilder({ page }).analyze();

    if (results.violations.length > 0) {
      const report = results.violations
        .map(
          (v) =>
            `[${v.impact}] ${v.id}: ${v.description}\n  Nodes: ${v.nodes.map((n) => n.html).join(", ")}`,
        )
        .join("\n\n");
      console.error("Axe violations:\n" + report);
    }

    expect(results.violations).toEqual([]);
  });
});
