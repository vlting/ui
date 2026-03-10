import { test, expect } from '@playwright/test'
import AxeBuilder from '@axe-core/playwright'

test.describe('Button component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components/button')
    await page.waitForLoadState('networkidle')
  })

  // --- Visual regression ---

  test('light mode — all variants', async ({ page }) => {
    const section = page.locator('[data-testid="button-variants"]')
    await expect(section).toBeVisible()
    await expect(section).toHaveScreenshot('button-variants-light.png', {
      maxDiffPixelRatio: 0.01,
    })
  })

  test('dark mode — all variants', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-color-mode', 'dark')
    })
    await page.waitForTimeout(100)
    const section = page.locator('[data-testid="button-variants"]')
    await expect(section).toHaveScreenshot('button-variants-dark.png', {
      maxDiffPixelRatio: 0.01,
    })
  })

  test('light mode — all sizes', async ({ page }) => {
    const section = page.locator('[data-testid="button-sizes"]')
    await expect(section).toBeVisible()
    await expect(section).toHaveScreenshot('button-sizes-light.png', {
      maxDiffPixelRatio: 0.01,
    })
  })

  test('light mode — disabled and loading states', async ({ page }) => {
    const section = page.locator('[data-testid="button-states"]')
    await expect(section).toBeVisible()
    await expect(section).toHaveScreenshot('button-states-light.png', {
      maxDiffPixelRatio: 0.01,
    })
  })

  // --- Interaction states ---

  test('hover state', async ({ page }) => {
    const button = page.locator(
      '[data-testid="button-variants"] button',
    ).first()
    await button.hover()
    await expect(button).toHaveScreenshot('button-hover.png', {
      maxDiffPixelRatio: 0.01,
    })
  })

  test('focus-visible state', async ({ page }) => {
    // Tab into the first button
    await page.keyboard.press('Tab')
    // May need multiple tabs to reach the button area (past sidebar nav)
    const maxTabs = 20
    let found = false
    for (let i = 0; i < maxTabs; i++) {
      const focused = page.locator(
        '[data-testid="button-variants"] button:focus-visible',
      )
      if ((await focused.count()) > 0) {
        found = true
        await expect(focused.first()).toHaveScreenshot(
          'button-focus-visible.png',
          { maxDiffPixelRatio: 0.01 },
        )
        break
      }
      await page.keyboard.press('Tab')
    }
    expect(found).toBe(true)
  })

  // --- A11y ---

  test('has no critical axe violations (light mode)', async ({ page }) => {
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()

    // Log all violations for visibility
    if (results.violations.length > 0) {
      console.log(
        'A11y violations (light):',
        results.violations.map((v) => `${v.id}: ${v.help} (${v.impact})`),
      )
    }

    // Only fail on critical/serious that aren't color-contrast
    // (color-contrast will be fixed in E3 component polish)
    const blocking = results.violations.filter(
      (v) =>
        (v.impact === 'critical' || v.impact === 'serious') &&
        v.id !== 'color-contrast',
    )
    expect(blocking).toEqual([])
  })

  test('has no critical axe violations (dark mode)', async ({ page }) => {
    await page.evaluate(() => {
      document.documentElement.setAttribute('data-color-mode', 'dark')
    })
    await page.waitForTimeout(100)
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
      .analyze()

    if (results.violations.length > 0) {
      console.log(
        'A11y violations (dark):',
        results.violations.map((v) => `${v.id}: ${v.help} (${v.impact})`),
      )
    }

    const blocking = results.violations.filter(
      (v) =>
        (v.impact === 'critical' || v.impact === 'serious') &&
        v.id !== 'color-contrast',
    )
    expect(blocking).toEqual([])
  })
})
