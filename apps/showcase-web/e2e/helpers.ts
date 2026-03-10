import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

interface ComponentTestOptions {
  /** Route path, e.g. '/components/card' */
  route: string
  /** Map of test name → data-testid */
  sections: Record<string, string>
  /** Whether to test dark mode screenshots (default: true) */
  darkMode?: boolean
}

/**
 * Generate a standard visual + a11y test suite for a component page.
 * Produces: per-section light screenshot, first section dark screenshot,
 * and axe-core a11y checks for both modes.
 */
export function componentTests(name: string, opts: ComponentTestOptions) {
  const { route, sections, darkMode = true } = opts

  test.describe(`${name} component`, () => {
    test.beforeEach(async ({ page }) => {
      await page.goto(route)
      await page.waitForLoadState('networkidle')
    })

    // Visual regression for each section (light mode)
    for (const [label, testId] of Object.entries(sections)) {
      test(`light mode — ${label}`, async ({ page }) => {
        const section = page.locator(`[data-testid="${testId}"]`)
        await expect(section).toBeVisible()
        await expect(section).toHaveScreenshot(`${testId}-light.png`, {
          maxDiffPixelRatio: 0.01,
        })
      })
    }

    // Dark mode screenshot for first section
    if (darkMode) {
      const firstEntry = Object.entries(sections)[0]
      if (firstEntry) {
        const [label, testId] = firstEntry
        test(`dark mode — ${label}`, async ({ page }) => {
          await page.evaluate(() => {
            document.documentElement.setAttribute('data-color-mode', 'dark')
          })
          await page.waitForTimeout(100)
          const section = page.locator(`[data-testid="${testId}"]`)
          await expect(section).toHaveScreenshot(`${testId}-dark.png`, {
            maxDiffPixelRatio: 0.01,
          })
        })
      }
    }

    // A11y
    test('a11y — light mode', async ({ page }) => {
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze()

      if (results.violations.length > 0) {
      }

      const blocking = results.violations.filter(
        (v) =>
          (v.impact === 'critical' || v.impact === 'serious') &&
          // Known issues deferred to E3 (component quality audit)
          !['color-contrast', 'target-size'].includes(v.id),
      )
      expect(blocking).toEqual([])
    })

    test('a11y — dark mode', async ({ page }) => {
      await page.evaluate(() => {
        document.documentElement.setAttribute('data-color-mode', 'dark')
      })
      await page.waitForTimeout(100)

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze()

      if (results.violations.length > 0) {
      }

      const blocking = results.violations.filter(
        (v) =>
          (v.impact === 'critical' || v.impact === 'serious') &&
          // Known issues deferred to E3 (component quality audit)
          !['color-contrast', 'target-size'].includes(v.id),
      )
      expect(blocking).toEqual([])
    })
  })
}
