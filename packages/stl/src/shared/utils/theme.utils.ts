import {
  BodyFontFamily,
  bodyFonts,
  CodeFontFamily,
  codeFonts,
  DEFAULT_FONTS,
  FontFamilyData,
  FontFamilyKey,
  FontFamilySpec,
  FontWeight,
  GetThemeFonts,
  HeadingFontFamily,
  headingFonts,
  HtmlHeadLink,
} from "../models"

const getFontWeightReducer =
  (prefix: number) =>
  (output: string, weight: FontWeight, index: number): string => {
    output += `${!index ? "" : ";"}${prefix},${weight}`
    return output
  }

/** Get HTML <head> Link data for the design system's fonts */
export function getFontLinks(fontFamilies: FontFamilySpec = DEFAULT_FONTS): HtmlHeadLink[] {
  let families = ""

  // Make sure we merge repeated fonts, to get all the necessary weights!
  const bodyKey = fontFamilies.body || DEFAULT_FONTS.body
  const bodyWeights: FontWeight[] = bodyFonts[bodyKey].weights
  const bodyItalicWeights: FontWeight[] = bodyFonts[bodyKey].italicWeights
  const headingKey = fontFamilies.heading || DEFAULT_FONTS.heading
  let headingWeights: FontWeight[] = headingFonts[headingKey].weights
  let headingItalicWeights: FontWeight[] = headingFonts[headingKey].italicWeights
  const codeKey = fontFamilies.code || DEFAULT_FONTS.code
  let codeWeights: FontWeight[] = codeFonts[codeKey].weights
  let codeItalicWeights: FontWeight[] = codeFonts[codeKey].italicWeights

  if (headingKey === bodyKey) {
    headingWeights = [...bodyWeights, ...headingFonts[headingKey].weights]
    headingItalicWeights = [...bodyItalicWeights, ...headingFonts[headingKey].italicWeights]
  }
  if (codeKey === headingKey) {
    codeWeights = [...headingWeights, ...codeFonts[codeKey].weights]
    codeItalicWeights = [...headingItalicWeights, ...codeFonts[codeKey].italicWeights]
  }

  const familyData = new Map<FontFamilyKey, FontFamilyData>()
  familyData.set(bodyKey, {
    name: BodyFontFamily[bodyKey],
    weights: Array.from(bodyWeights).sort(),
    italicWeights: Array.from(bodyItalicWeights).sort(),
  })
  familyData.set(headingKey, {
    name: HeadingFontFamily[headingKey],
    weights: Array.from(headingWeights).sort(),
    italicWeights: Array.from(headingItalicWeights).sort(),
  })
  familyData.set(codeKey, {
    name: CodeFontFamily[codeKey],
    weights: Array.from(codeWeights).sort(),
    italicWeights: Array.from(codeItalicWeights).sort(),
  })
  const fonts = Array.from(familyData)

  fonts.forEach(([, fontData]: [FontFamilyKey, FontFamilyData]) => {
    if (!fontData) {
      return
    }
    const { weights, italicWeights } = fontData
    const fontName = String(fontData.name).replace(" ", "+")
    let variants = ""
    if (weights.length + italicWeights.length > 1) {
      const regular = weights.reduce(getFontWeightReducer(0), "")
      const italic = italicWeights.reduce(getFontWeightReducer(1), "")
      variants = `:ital,wght@${regular};${italic}`
    }
    families += `&family=${fontName}${variants}`
  })
  return [
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossOrigin: "anonymous",
    },
    {
      rel: "preload",
      as: "style",
      href: `https://fonts.googleapis.com/css2?display=auto${families}`,
    },
    {
      rel: "stylesheet",
      href: `https://fonts.googleapis.com/css2?display=auto${families}`,
    },
  ]
}

/** Get theme font data + font links to add to the HTML <head> */
export function getThemeFonts(fontFamilies: FontFamilySpec = DEFAULT_FONTS): GetThemeFonts {
  const { body, button, heading, code } = fontFamilies
  const bodyKey = body || DEFAULT_FONTS.body
  const buttonKey = button || body || DEFAULT_FONTS.button
  const headingKey = heading || DEFAULT_FONTS.heading
  const codeKey = code || DEFAULT_FONTS.code
  const buttonFontData =
    bodyFonts[buttonKey as keyof typeof bodyFonts] || headingFonts[buttonKey as keyof typeof headingFonts]
  const bodyFallback = bodyFonts[bodyKey as keyof typeof bodyFonts].fallbackKey || "systemSans"
  const buttonFallback = buttonFontData.fallbackKey || "systemSans"
  const headingFallback = headingFonts[headingKey as keyof typeof headingFonts].fallbackKey || "systemSerif"
  const codeFallback = codeFonts[codeKey as keyof typeof codeFonts].fallbackKey || "systemCode"
  return {
    fonts: {
      body: `$${bodyKey}, $${bodyFallback}`,
      button: `$${buttonKey}, $${buttonFallback}`,
      heading: `$${headingKey}, $${headingFallback}`,
      code: `$${codeKey}, $${codeFallback}`,
    },
    links: getFontLinks(fontFamilies),
  }
}
