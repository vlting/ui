import { SystemFontFamily, BodyFontFamily, HeadingFontFamily, CodeFontFamily, DEFAULT_FONTS } from "../../shared/models"
import { enumKeys } from "../../shared/utils"
import { CharHash } from "../utils"
import { ScaleEntry, ThemeScale } from "./scales.models"
import { getCssMapFromVars, getPropsFromCssMap, getThemePropsFromCssMap } from "./scales.utils"

/** Generator function for `fontFamily` theme scale */
export function getFontFamily(hash: CharHash) {
  const baseVars = {
    systemSans: { ...hash.var, value: SystemFontFamily.sansSerif },
    systemSerif: { ...hash.var, value: SystemFontFamily.serif },
    systemMono: { ...hash.var, value: SystemFontFamily.monospace },
    ...enumKeys(BodyFontFamily).reduce(
      (output: Record<keyof typeof BodyFontFamily, ScaleEntry>, key: keyof typeof BodyFontFamily) => {
        output[key] = { ...hash.var, value: `"${BodyFontFamily[key]}"` } as const
        return output
      },
      {} as Record<keyof typeof BodyFontFamily, ScaleEntry>
    ),
    ...enumKeys(HeadingFontFamily).reduce(
      (output: Record<keyof typeof HeadingFontFamily, ScaleEntry>, key: keyof typeof HeadingFontFamily) => {
        output[key] = { ...hash.var, value: `"${HeadingFontFamily[key]}"` } as const
        return output
      },
      {} as Record<keyof typeof HeadingFontFamily, ScaleEntry>
    ),
    ...enumKeys(CodeFontFamily).reduce(
      (output: Record<keyof typeof CodeFontFamily, ScaleEntry>, key: keyof typeof CodeFontFamily) => {
        output[key] = { ...hash.var, value: `"${CodeFontFamily[key]}"` } as const
        return output
      },
      {} as Record<keyof typeof CodeFontFamily, ScaleEntry>
    ),
  } as const

  const heading = {
    ...hash.var,
    value: `${baseVars[DEFAULT_FONTS.heading].ref}, ${baseVars.systemMono.ref}`,
  } as const

  const sharedVars = {
    heading,
    body: { ...hash.var, value: `${baseVars[DEFAULT_FONTS.body].ref}, ${baseVars.systemSans.ref}` },
    button: { ...hash.var, value: `${baseVars[DEFAULT_FONTS.button].ref}, ${baseVars.systemMono.ref}` },
    code: { ...hash.var, value: `${baseVars[DEFAULT_FONTS.code].ref}, ${baseVars.systemMono.ref}` },
    quote: { ...hash.var, value: `${heading.ref}, ${baseVars.systemSerif.ref}` },
  } as const

  const vars = { ...baseVars, ...sharedVars }
  const cssValueMap = { ...getCssMapFromVars(sharedVars) } as const
  const themeProps = { ...getThemePropsFromCssMap(cssValueMap) } as const

  return {
    vars,
    themeProps,
    cssValueMap,
    cssValueMapProps: getPropsFromCssMap(cssValueMap),
  } as ThemeScale<typeof vars, typeof themeProps, typeof cssValueMap>
}
