import { readFileSync } from 'node:fs'
import { resolve } from 'node:path'

describe('Dark mode CSS source order', () => {
  it('dark mode globalStyle appears after :root globalStyle in source', () => {
    const source = readFileSync(
      resolve(__dirname, '../../../stl/src/config/styles.css.ts'),
      'utf-8',
    )

    const rootIndex = source.indexOf("globalStyle(':root'")
    // Search for the dark mode rule using the comment that must accompany it
    const darkCommentIndex = source.indexOf('This rule MUST appear after the :root rule')
    const darkRuleIndex = source.indexOf('globalStyle(`[${COLOR_MODE_ATTR}="dark"]`')

    // Both rules must exist
    expect(rootIndex).toBeGreaterThan(-1)
    expect(darkRuleIndex).toBeGreaterThan(-1)

    // Source-order comment must exist (guards against accidental removal)
    expect(darkCommentIndex).toBeGreaterThan(-1)

    // Dark mode rule must come after :root (source order determines CSS cascade winner)
    expect(darkRuleIndex).toBeGreaterThan(rootIndex)
  })
})
