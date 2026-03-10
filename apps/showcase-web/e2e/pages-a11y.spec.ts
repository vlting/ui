import AxeBuilder from '@axe-core/playwright'
import { expect, test } from '@playwright/test'

const KNOWN_ISSUES = ['color-contrast', 'target-size']

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Styling', path: '/styling' },
  { name: 'Primitives', path: '/primitives' },
  { name: 'Components', path: '/components' },
  { name: 'Forms', path: '/forms' },
  { name: 'Overlays', path: '/overlays' },
  { name: 'Data Display', path: '/data-display' },
  { name: 'Navigation', path: '/navigation' },
  { name: 'Hooks', path: '/hooks' },
  { name: 'Blocks', path: '/blocks' },
  { name: 'Icons', path: '/icons' },
  { name: 'Charts', path: '/charts' },
  { name: 'Utils', path: '/utils' },
]

for (const pg of pages) {
  test.describe(`${pg.name} page a11y`, () => {
    test('light mode', async ({ page }) => {
      await page.goto(pg.path)
      await page.waitForLoadState('networkidle')

      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag22aa'])
        .analyze()

      if (results.violations.length > 0) {
      }

      const blocking = results.violations.filter(
        (v) =>
          (v.impact === 'critical' || v.impact === 'serious') &&
          !KNOWN_ISSUES.includes(v.id),
      )
      expect(blocking).toEqual([])
    })

    test('dark mode', async ({ page }) => {
      await page.goto(pg.path)
      await page.waitForLoadState('networkidle')
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
          !KNOWN_ISSUES.includes(v.id),
      )
      expect(blocking).toEqual([])
    })
  })
}
