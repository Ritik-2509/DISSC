import { test, expect } from '@playwright/test';

test.describe('Navigation and Page Load Tests', () => {
  const pages = [
    { url: '/', title: /DISCC/ },
    { url: '/about', title: /About/i },
    { url: '/our-work', title: /Our Work/i },
    { url: '/our-impact', title: /Impact/i },
    { url: '/stories', title: /Stories/i },
    { url: '/knowledge', title: /Knowledge/i },
    { url: '/get-involved', title: /Get Involved/i },
    { url: '/donate', title: /Donate/i },
    { url: '/admin', title: /Admin/i },
  ];

  for (const pageInfo of pages) {
    test(`should load ${pageInfo.url} successfully`, async ({ page }) => {
      // Navigate to the page
      const response = await page.goto(pageInfo.url);
      
      // Check if page loaded successfully (no 404)
      expect(response?.status()).toBe(200);

      // Take a screenshot of each page to verify images visually
      await page.screenshot({ path: `test-results/screenshots${pageInfo.url === '/' ? '/home' : pageInfo.url}.png`, fullPage: true });
    });
  }

  test('should check if images exist on home page', async ({ page }) => {
    await page.goto('/');
    // Check that there are image elements rendered (not just colored blocks)
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(0);
  });
});
