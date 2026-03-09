import {
  ColorNumberKey,
  ColorPalette,
  CoreColorName,
  DEFAULT_SOURCE_COLORS,
  ScaleColorName,
} from "../../shared/models/colorGen.models"
import { generateThemeColors, getTextColor } from "../../shared/utils/colorGen.utils"
import { addPrefix, CharHash } from "../utils"
import { ColorPaletteEntry, CssAliasMap, CssValueMap, ScaleEntry, ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `color` theme scale */
export function getColor(hash: CharHash) {
  const cssAliasMap = {} as CssAliasMap<any>
  const cssValueMapFromAliases = {} as CssValueMap

  const addAlias = (k: string, v: string) => {
    cssAliasMap[addPrefix(k)] = addPrefix(v)
    cssValueMapFromAliases[k] = k
  }

  const lightPalette = generateThemeColors<ScaleEntry>(
    DEFAULT_SOURCE_COLORS,
    "light",
    (
      key: keyof ColorPaletteEntry,
      palette: ColorPalette<ScaleEntry>,
      value: string | number,
      numberKey?: ColorNumberKey,
      isMapped = false
    ) => {
      if (isMapped) {
        addAlias(key, String(value))
      } else {
        palette[key] = { ...hash.var, value: String(value) }
      }
      // Create a matching text alias
      const baseKey = key.replace(String(numberKey), "")
      addAlias(`${baseKey}Text${numberKey ?? ""}`, getTextColor(baseKey as ScaleColorName, numberKey))
    }
  )

  const shadowBase = { ...hash.var, value: "0 0% 0%" }

  const lightScale = {
    shadowBase,
    shadowBlack: { ...hash.var, value: "hsl(0 0% 0%)" },
    defaultBody: { ...hash.var, value: lightPalette[getTextColor(CoreColorName.tertiary, 2)].ref },
    defaultHeading: { ...hash.var, value: lightPalette.tertiary10.ref },
    // Unique to light palette
    panel: { ...hash.var, value: lightPalette.min.ref },
    shadowLight: { ...hash.var, value: `hsl(${shadowBase.ref} / .05)` },
    shadowHeavy: { ...hash.var, value: `hsl(${shadowBase.ref} / .15)` },
    shadowHeaviest: { ...hash.var, value: `hsl(${shadowBase.ref} / .25)` },
    ...lightPalette,
  } as const

  const darkVars = {
    shadowBase,
    shadowBlack: lightScale.shadowBlack,
    defaultBody: lightScale.defaultBody,
    defaultHeading: lightScale.defaultHeading,
    // Unique to dark palette
    panel: { ...lightScale.panel, value: lightScale.tertiary3.ref },
    shadowLight: { ...lightScale.shadowLight, value: `hsl(${shadowBase.ref} / .2)` },
    shadowHeavy: { ...lightScale.shadowHeavy, value: `hsl(${shadowBase.ref} / .35)` },
    shadowHeaviest: { ...lightScale.shadowHeavy, value: `hsl(${shadowBase.ref} / .5)` },
    ...generateThemeColors<ScaleEntry>(
      DEFAULT_SOURCE_COLORS,
      "dark",
      (
        key: keyof ColorPaletteEntry,
        palette: ColorPalette<ScaleEntry>,
        value: string | number,
        _numberKey?: ColorNumberKey,
        isMapped = false
      ) => {
        if (!isMapped) {
          palette[key] = { ...lightScale[key], value: String(value) }
        }
      }
    ),
  } as const

  ////////////////////////////////////////////////////////////////////////////////
  const vars = lightScale
  const cssValueMap = { ...getCssMapFromVars(lightScale), ...cssValueMapFromAliases } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    darkVars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
    cssAliasMap,
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap, typeof cssAliasMap>
}

// FILTER KEYS ////////////////////////////////////////////////////////////////
// Used for generating types that map to only parts of this scale

export const colorCore = {
  min: true,
  max: true,
  primary1: true,
  primary2: true,
  primary3: true,
  primary4: true,
  primary5: true,
  primary6: true,
  primary7: true,
  primary8: true,
  primary9: true,
  primary10: true,
  primary11: true,
  primary12: true,
  secondary1: true,
  secondary2: true,
  secondary3: true,
  secondary4: true,
  secondary5: true,
  secondary6: true,
  secondary7: true,
  secondary8: true,
  secondary9: true,
  secondary10: true,
  secondary11: true,
  secondary12: true,
  tertiary1: true,
  tertiary2: true,
  tertiary3: true,
  tertiary4: true,
  tertiary5: true,
  tertiary6: true,
  tertiary7: true,
  tertiary8: true,
  tertiary9: true,
  tertiary10: true,
  tertiary11: true,
  tertiary12: true,
} as const

export const colorText = {
  ...colorCore,
  defaultBody: true,
  defaultHeading: true,
  primaryText1: true,
  primaryText2: true,
  primaryText3: true,
  primaryText4: true,
  primaryText5: true,
  primaryText6: true,
  primaryText7: true,
  primaryText8: true,
  primaryText9: true,
  primaryText10: true,
  primaryText11: true,
  primaryText12: true,
  secondaryText1: true,
  secondaryText2: true,
  secondaryText3: true,
  secondaryText4: true,
  secondaryText5: true,
  secondaryText6: true,
  secondaryText7: true,
  secondaryText8: true,
  secondaryText9: true,
  secondaryText10: true,
  secondaryText11: true,
  secondaryText12: true,
  tertiaryText1: true,
  tertiaryText2: true,
  tertiaryText3: true,
  tertiaryText4: true,
  tertiaryText5: true,
  tertiaryText6: true,
  tertiaryText7: true,
  tertiaryText8: true,
  tertiaryText9: true,
  tertiaryText10: true,
  tertiaryText11: true,
  tertiaryText12: true,
} as const
