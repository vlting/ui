import { createThemeBuilder } from '@tamagui/theme-builder'
import { accentPalettes, darkPalette, lightPalette } from './palettes'
import {
  type ShadowScale,
  darkShadows,
  lightShadows,
  shadowScaleToThemeValues,
} from './shadows'

const templates = {
  base: {
    background: 0,
    backgroundHover: 1,
    backgroundPress: 2,
    backgroundFocus: 1,
    backgroundTransparent: 0,
    color: 11,
    colorHover: 11,
    colorPress: 10,
    colorFocus: 11,
    colorTransparent: 11,
    borderColor: 4,
    borderColorHover: 5,
    borderColorPress: 3,
    borderColorFocus: 5,
    colorSubtitle: 8,
    placeholderColor: 7,
    outlineColor: 5,
    shadowColor: 0,
    color1: 0,
    color2: 1,
    color3: 2,
    color4: 3,
    color5: 4,
    color6: 5,
    color7: 6,
    color8: 7,
    color9: 8,
    color10: 9,
    color11: 10,
    color12: 11,
  },
  surface1: {
    background: 1,
    backgroundHover: 2,
    backgroundPress: 3,
    backgroundFocus: 2,
    borderColor: 4,
    borderColorHover: 5,
    borderColorPress: 3,
    borderColorFocus: 5,
  },
  surface2: {
    background: 2,
    backgroundHover: 3,
    backgroundPress: 4,
    backgroundFocus: 3,
    borderColor: 5,
    borderColorHover: 6,
    borderColorPress: 4,
    borderColorFocus: 6,
  },
  surface3: {
    background: 3,
    backgroundHover: 4,
    backgroundPress: 5,
    backgroundFocus: 4,
    borderColor: 6,
    borderColorHover: 7,
    borderColorPress: 5,
    borderColorFocus: 7,
  },
  inverse: {
    background: 11,
    backgroundHover: 10,
    backgroundPress: 9,
    backgroundFocus: 10,
    color: 0,
    colorHover: 0,
    colorPress: 1,
    colorFocus: 0,
    borderColor: 8,
    borderColorHover: 7,
    borderColorPress: 9,
    borderColorFocus: 7,
  },
}

export function buildThemes(
  overridePalettes?: Record<string, string[]>,
  overrideShadows?: {
    light?: ShadowScale
    dark?: ShadowScale
  },
) {
  const mergedLightShadows = shadowScaleToThemeValues(overrideShadows?.light ?? lightShadows)
  const mergedDarkShadows = shadowScaleToThemeValues(overrideShadows?.dark ?? darkShadows)

  // Child color themes — using `any` assertion due to v2 RC type inference
  // limitation where addChildThemes doesn't infer palette keys from addPalettes
  const colorChildThemes: Record<string, unknown> = {
    blue: [
      { parent: 'light', palette: 'light_blue', template: 'base' },
      { parent: 'dark', palette: 'dark_blue', template: 'base' },
    ],
    red: [
      { parent: 'light', palette: 'light_red', template: 'base' },
      { parent: 'dark', palette: 'dark_red', template: 'base' },
    ],
    green: [
      { parent: 'light', palette: 'light_green', template: 'base' },
      { parent: 'dark', palette: 'dark_green', template: 'base' },
    ],
    orange: [
      { parent: 'light', palette: 'light_orange', template: 'base' },
      { parent: 'dark', palette: 'dark_orange', template: 'base' },
    ],
    purple: [
      { parent: 'light', palette: 'light_purple', template: 'base' },
      { parent: 'dark', palette: 'dark_purple', template: 'base' },
    ],
    pink: [
      { parent: 'light', palette: 'light_pink', template: 'base' },
      { parent: 'dark', palette: 'dark_pink', template: 'base' },
    ],
    yellow: [
      { parent: 'light', palette: 'light_yellow', template: 'base' },
      { parent: 'dark', palette: 'dark_yellow', template: 'base' },
    ],
  }

  const themeBuilder = createThemeBuilder()
    .addPalettes({
      light: overridePalettes?.light ?? lightPalette,
      dark: overridePalettes?.dark ?? darkPalette,
      light_blue: overridePalettes?.light_blue ?? accentPalettes.blue.light,
      dark_blue: overridePalettes?.dark_blue ?? accentPalettes.blue.dark,
      light_red: overridePalettes?.light_red ?? accentPalettes.red.light,
      dark_red: overridePalettes?.dark_red ?? accentPalettes.red.dark,
      light_green: overridePalettes?.light_green ?? accentPalettes.green.light,
      dark_green: overridePalettes?.dark_green ?? accentPalettes.green.dark,
      light_orange: overridePalettes?.light_orange ?? accentPalettes.orange.light,
      dark_orange: overridePalettes?.dark_orange ?? accentPalettes.orange.dark,
      light_purple: overridePalettes?.light_purple ?? accentPalettes.purple.light,
      dark_purple: overridePalettes?.dark_purple ?? accentPalettes.purple.dark,
      light_pink: overridePalettes?.light_pink ?? accentPalettes.pink.light,
      dark_pink: overridePalettes?.dark_pink ?? accentPalettes.pink.dark,
      light_yellow: overridePalettes?.light_yellow ?? accentPalettes.yellow.light,
      dark_yellow: overridePalettes?.dark_yellow ?? accentPalettes.yellow.dark,
    })
    .addTemplates(templates)
    .addThemes({
      light: {
        template: 'base',
        palette: 'light',
        nonInheritedValues: mergedLightShadows,
      },
      dark: {
        template: 'base',
        palette: 'dark',
        nonInheritedValues: mergedDarkShadows,
      },
    })
    // @ts-expect-error v2 RC: addChildThemes palette type inference limitation
    .addChildThemes(colorChildThemes)
    .addChildThemes(
      {
        alt1: { template: 'surface1' },
        alt2: { template: 'surface2' },
        surface1: { template: 'surface1' },
        surface2: { template: 'surface2' },
        surface3: { template: 'surface3' },
        inverseSurface: { template: 'inverse' },
      },
      {
        avoidNestingWithin: [
          'alt1',
          'alt2',
          'surface1',
          'surface2',
          'surface3',
          'inverseSurface',
        ],
      },
    )

  return themeBuilder.build()
}
