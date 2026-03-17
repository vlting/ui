import { createTheme } from './generate-theme'
import { THEME_PRESET_DEFAULT } from './presets'

describe('createTheme', () => {
  it('produces a theme with 4 palettes: primary, secondary, neutral, background', () => {
    const theme = createTheme(THEME_PRESET_DEFAULT)
    expect(theme.palettes).toHaveProperty('primary')
    expect(theme.palettes).toHaveProperty('secondary')
    expect(theme.palettes).toHaveProperty('neutral')
    expect(theme.palettes).toHaveProperty('background')
    expect(Object.keys(theme.palettes)).toHaveLength(4)
  })

  it('each palette has light and dark arrays of 12 steps', () => {
    const theme = createTheme(THEME_PRESET_DEFAULT)
    for (const [, palette] of Object.entries(theme.palettes)) {
      expect(palette.light).toHaveLength(12)
      expect(palette.dark).toHaveLength(12)
    }
  })

  it('neutral palette defaults to isNeutral behavior (dampened saturation)', () => {
    // With high saturation input but no isNeutral override,
    // neutral should auto-dampen (divide by 10)
    const tinted = createTheme({
      primary: { hue: 215, saturation: 85 },
      neutral: { hue: 215, saturation: 50 }, // will be dampened to 5
    })
    const chromatic = createTheme({
      primary: { hue: 215, saturation: 85 },
      background: { hue: 215, saturation: 50 }, // stays 50
    })
    // Neutral with 50 sat → 5 (dampened) should differ from background with 50 sat (full)
    expect(tinted.palettes.neutral.light).not.toEqual(chromatic.palettes.background.light)
  })

  it('isTinted overrides isNeutral default on neutral palette', () => {
    const dampened = createTheme({
      primary: { hue: 215, saturation: 85 },
      neutral: { hue: 290, saturation: 50 }, // default isNeutral → dampened to 5
    })
    const tinted = createTheme({
      primary: { hue: 215, saturation: 85 },
      neutral: { hue: 290, saturation: 50, isTinted: true }, // override → stays 50
    })
    expect(dampened.palettes.neutral.light).not.toEqual(tinted.palettes.neutral.light)
  })

  it('does not have tertiary palette', () => {
    const theme = createTheme(THEME_PRESET_DEFAULT)
    expect(theme.palettes).not.toHaveProperty('tertiary')
  })

  it('theme object is frozen', () => {
    const theme = createTheme(THEME_PRESET_DEFAULT)
    expect(Object.isFrozen(theme)).toBe(true)
  })
})
