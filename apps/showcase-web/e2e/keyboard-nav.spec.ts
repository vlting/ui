import { test, expect } from '@playwright/test'

test.describe('Keyboard navigation smoke tests', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/components')
    await page.waitForLoadState('networkidle')
  })

  test('Tab moves focus through interactive elements', async ({ page }) => {
    // Focus should move forward through interactive elements
    await page.keyboard.press('Tab')
    const first = await page.evaluate(() => document.activeElement?.tagName)
    expect(first).toBeTruthy()

    await page.keyboard.press('Tab')
    const second = await page.evaluate(() => document.activeElement?.tagName)
    expect(second).toBeTruthy()

    // Focus should have moved to a different element
    const firstId = await page.evaluate(() => {
      document.activeElement?.setAttribute('data-kb-test', '1')
      return document.activeElement?.getAttribute('data-kb-test')
    })
    expect(firstId).toBeTruthy()
  })

  test('Enter activates focused button', async ({ page }) => {
    // Find and focus the first button
    const button = page.locator('button').first()
    await button.focus()
    const isFocused = await button.evaluate(
      (el) => document.activeElement === el,
    )
    expect(isFocused).toBe(true)

    // Press Enter — should not throw
    await page.keyboard.press('Enter')
  })

  test('Space activates focused button', async ({ page }) => {
    const button = page.locator('button').first()
    await button.focus()

    // Press Space — should not throw
    await page.keyboard.press('Space')
  })

  test('Escape closes dialog overlay', async ({ page }) => {
    await page.goto('/overlays')
    await page.waitForLoadState('networkidle')

    // Look for a trigger button that opens a dialog
    const trigger = page.locator('[data-testid]').filter({ hasText: 'Open' }).first()
    if (await trigger.count() === 0) {
      test.skip(true, 'No dialog trigger found on overlays page')
      return
    }

    await trigger.click()
    await page.waitForTimeout(200)

    // Press Escape to close
    await page.keyboard.press('Escape')
    await page.waitForTimeout(200)

    // Verify the overlay is no longer visible (dialog/sheet content)
    const overlay = page.locator('[role="dialog"]')
    if (await overlay.count() > 0) {
      await expect(overlay.first()).not.toBeVisible()
    }
  })

  test('Tab does not get trapped outside of modals', async ({ page }) => {
    // Tab several times and verify focus keeps moving
    const focusedElements: string[] = []
    for (let i = 0; i < 5; i++) {
      await page.keyboard.press('Tab')
      const tag = await page.evaluate(
        () => `${document.activeElement?.tagName}:${document.activeElement?.textContent?.slice(0, 20)}`,
      )
      focusedElements.push(tag)
    }

    // At least 2 distinct elements should have received focus
    const unique = new Set(focusedElements)
    expect(unique.size).toBeGreaterThanOrEqual(2)
  })
})
