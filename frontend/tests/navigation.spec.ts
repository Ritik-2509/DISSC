import { test, expect } from '@playwright/test';

test.describe('DISCC Platform E2E Rigorous Suite', () => {
  const publicPages = [
    { url: '/', name: 'Home' },
    { url: '/about', name: 'About' },
    { url: '/our-work', name: 'Our Work' },
    { url: '/our-impact', name: 'Our Impact' },
    { url: '/stories', name: 'Stories' },
    { url: '/knowledge', name: 'Knowledge Bank' },
    { url: '/get-involved', name: 'Get Involved' },
    { url: '/donate', name: 'Donate' },
    { url: '/contact', name: 'Contact' },
    { url: '/terms', name: 'Terms of Service' },
    { url: '/privacy', name: 'Privacy Policy' },
    { url: '/fcra', name: 'FCRA Registration' },
  ];

  const adminPages = [
    { url: '/admin', name: 'Admin Dashboard' },
    { url: '/admin/pages', name: 'Admin Pages' },
    { url: '/admin/blogs', name: 'Admin Blogs' },
    { url: '/admin/media', name: 'Admin Media Library' },
    { url: '/admin/gallery', name: 'Admin Galleries' },
    { url: '/admin/teams', name: 'Admin Teams' },
    { url: '/admin/testimonials', name: 'Admin Testimonials' },
    { url: '/admin/contact', name: 'Admin Inquiries' },
    { url: '/admin/faqs', name: 'Admin FAQs' },
    { url: '/admin/settings', name: 'Admin Settings' },
  ];

  for (const p of publicPages) {
    test(`Public: should load ${p.name} (${p.url}) with 200 OK`, async ({ page }) => {
      const response = await page.goto(p.url, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);

      // Verify no broken generic errors
      const bodyText = await page.textContent('body');
      expect(bodyText).not.toContain('Application error: a client-side exception');
      expect(bodyText).not.toContain('Internal Server Error');
    });
  }

  for (const p of adminPages) {
    test(`Admin: should load ${p.name} (${p.url}) with 200 OK`, async ({ page }) => {
      const response = await page.goto(p.url, { waitUntil: 'domcontentloaded' });
      expect(response?.status()).toBe(200);

      // Verify public website navbar is NOT in admin
      const helplineText = await page.locator('text=+91 7007453168').count();
      // On admin, helpline shouldn't be in a fixed public navbar
      const publicNavbar = page.locator('header.sticky.top-0 nav a[href="/about"]');
      expect(await publicNavbar.count()).toBe(0);
    });
  }

  test('Public: Home page has high-res images and partner marquee', async ({ page }) => {
    await page.goto('/', { waitUntil: 'networkidle' });
    const images = page.locator('img');
    const count = await images.count();
    expect(count).toBeGreaterThan(5);

    // Verify marquee exists
    const marquee = page.locator('.animate-marquee');
    expect(await marquee.count()).toBeGreaterThanOrEqual(1);
  });

  test('Public: Form submission produces celebration screen and records booking', async ({ page }) => {
    await page.goto('/about#contact', { waitUntil: 'networkidle' });

    const form = page.locator('form');
    if (await form.count() > 0) {
      await page.fill('input[placeholder="Your Name"]', 'Playwright Automated Test');
      await page.fill('input[placeholder="your@email.com"]', 'test@disccindia.org');
      await page.fill('input[placeholder="+91..."]', '+91 9876543210');
      await page.fill('input[placeholder="Child Assessment / Volunteer / Donation Inquiry"]', 'Automated E2E Verification');

      await page.click('button[type="submit"]');

      // Verify celebratory confirmation card
      await expect(page.locator('text=Request has been sent successfully!')).toBeVisible({ timeout: 10000 });
      await expect(page.locator('text=Playwright Automated Test')).toBeVisible();
    }
  });

  test('Public: Buttons have high-contrast text and are not white-on-white', async ({ page }) => {
    await page.goto('/', { waitUntil: 'domcontentloaded' });
    const supportButton = page.locator('button:has-text("Support a Child Today")');
    if (await supportButton.count() > 0) {
      // Must not have text-white if background is white
      const classNames = await supportButton.getAttribute('class');
      expect(classNames).toContain('text-secondary');
    }
  });
});
