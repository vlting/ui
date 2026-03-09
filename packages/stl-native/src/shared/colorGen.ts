/**
 * Color generation utilities inlined from @vlting/stl to avoid
 * pulling in vanilla-extract (which is web-only) via the stl barrel export.
 *
 * Source: packages/stl/src/shared/utils/colorGen.utils.ts
 *         packages/stl/src/shared/models/colorGen.models.ts
 */

// TYPES ////////////////////////////////////////////////////////////////////////

export type ColorMode = "light" | "dark"

export type ColorNumberKey = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12

type ColorObject = { hue: number; saturation?: number; isNeutral?: boolean }
type StaticSourceColor = { hue: number; saturation: number; contrast: number }
type SourceColor = number | `${ScaleColorName}` | ColorObject

export type ColorGenOptions = { [k in CoreColorName]: SourceColor } & {
  [k in StaticColorName]?: StaticSourceColor
} & { [k in StatusColorName | FlavorColorName]?: SourceColor }

type SemanticColors = { [k in CoreColorName]: ColorObject }

type ScaleColor<Base extends string> = `${Base}${ColorNumberKey}`
type TextColor<Base extends string> = `${Base}Text`
type ScaleTextColor = ScaleColor<TextColor<ScaleColorName>>
type ThemeColor = `${StaticColorName}` | ScaleColor<ScaleColorName> | ScaleTextColor

type ColorPalette<T = string> = { [key in ThemeColor]: T }

type ColorSetter<T = string> = (
  key: keyof ColorPalette<T>,
  palette: ColorPalette<T>,
  value: string | number,
  numberKey?: ColorNumberKey,
  isMapped?: boolean,
) => void

// ENUMS (as const objects to avoid pulling in TS enums) ////////////////////////

enum StaticColorName {
  max = "max",
  min = "min",
}

enum CoreColorName {
  primary = "primary",
  secondary = "secondary",
  tertiary = "tertiary",
}

enum StatusColorName {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

enum FlavorColorName {
  tomato = "tomato",
  amber = "amber",
  grass = "grass",
  forest = "forest",
  aqua = "aqua",
  indigo = "indigo",
  plum = "plum",
  magenta = "magenta",
}

enum AlphaColorName {
  primaryAlpha = "primaryAlpha",
  secondaryAlpha = "secondaryAlpha",
  tertiaryAlpha = "tertiaryAlpha",
  maxAlpha = "maxAlpha",
  minAlpha = "minAlpha",
}

type ScaleColorName = CoreColorName | StatusColorName | FlavorColorName | AlphaColorName

// CONSTANTS ////////////////////////////////////////////////////////////////////

export const DEFAULT_COLOR_MODE = "light" as const

const DEFAULT_HUE = 174
const DEFAULT_PALETTE = 2
const DEFAULT_SATURATIONS: [number, number, number] = [87, 50, 5]
const MAX_NEUTRAL_SATURATION = 40
const ALPHA_KEY = "Alpha"

const TEXT_COLOR_TARGETS: Record<ColorNumberKey, string | number> = {
  1: 10, 2: 11, 3: 11, 4: 12, 5: 12, 6: 12, 7: 12, 8: 12, 9: "min", 10: "min", 11: 3, 12: 5,
}
const ALPHA_TEXT_COLOR_TARGETS: Record<ColorNumberKey, string | number> = {
  1: "max", 2: "max", 3: "max", 4: "max", 5: "max", 6: "max", 7: "max", 8: "max",
  9: "min", 10: "min", 11: 1, 12: 2,
}
const MIN_ALPHA_TEXT_COLOR_TARGETS: Record<ColorNumberKey, string | number> = {
  1: "max", 2: "max", 3: 12, 4: 12, 5: 11, 6: 11, 7: 10, 8: 10, 9: 9, 10: 9, 11: 8, 12: 8,
}
const MAX_ALPHA_TEXT_COLOR_TARGETS: Record<ColorNumberKey, string | number> = {
  1: "max", 2: "max", 3: "max", 4: "max", 5: "max", 6: "max", 7: "max", 8: "min",
  9: "min", 10: 1, 11: 2, 12: 3,
}

const ALPHA_VALUES = [0.015, 0.05, 0.1, 0.15, 0.23, 0.32, 0.42, 0.53, 0.75, 0.85, 0.9, 0.95] as const
const ZERO_SATURATION_LUMINANCE = `|{ywrnhaF?5)|{ywsnhaF?5)&+15:=@EUbjy"&,037:=S]jz`
const ZERO_SATURATION_INDICES = {
  light: { color: 0, neutral: 12 },
  dark: { color: 24, neutral: 36 },
}
const MATRIX_INDICES = {
  light: { color: 0, neutral: 17280 },
  dark: { color: 34560, neutral: 51840 },
} as const
const SEGMENT_SIZE = { hue: 48, set: 24, valuePair: 2, value: 1 } as const
const DECODE_DIFF = -26
const COLOR_KEYS: readonly ColorNumberKey[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]

// Color matrix (encoded perceptual color data)
const COLOR_MATRIX: Record<string, string> = {
  "8352, 8376": "<|C{@x@t?n@j@a?VK:L5K.L%",
  "8376, 8400": '~y~w~p~gt^i[ZVKP~2~/~)~"',
  "12672, 12696": "<}A|?z@x@tAr?l@fKRKLK?K.",
  "29952, 29976": ".})|/z.x.t.p.j.c-L.D-9-+",
  "9312, 9336": "A|<{>x@v@q@m?e@]L?K9K1K'",
  "9336, 9360": "~|~z~w~t~m~gt^[W~9~4~-~$",
  "5904, 5928": "A|?{>x@u@o@k@b@XK;K6K.L%",
  "5928, 5952": "~z~y~t~n|ap]^XOQ~3~/~*~#",
  "1608, 1632": "~|~{~w~t~n~i{a_X~;~6~.~%",
  "16800, 16824": "<}A|BzBx>tAqAk?dKMKEK9K,",
  "16824, 16848": "~}~|~{~y~v~t~o~i~F~?~6~*",
  "384, 408": "C}E|?z@xAtAq@j@cKKKCK8K+",
  "408, 432": "~}~|~{~y~u~s~m~f~E~?~5~)",
  "2184, 2208": "~z~x~s~n~cv_bYQS~6~1~+~#",
  "3720, 3744": '~u~q~ex_k]cYUTHN~2~.~(~"',
  "6624, 6648": "E|?{>xAu?o?k@b?WK;L6K.K%",
  "6648, 6672": "~z~x~s~lyan]]WNQ~3~/~)~#",
  "9264, 9288": "A|<{>x@vAq?l@e@[K?L9L0L&",
  "9288, 9312": "~{~z~w~s~l~fp]ZV~8~3~-~$",
  "10656, 10680": "C}E|?z@xAt@q@k@dKNKGK:J,",
  "10680, 10704": "~}~|~{~y~v~s~n~h~R~J~=~.",
  "12816, 12840": "<}A|?z@x@t?r@l@eKRKLK>L.",
  "12840, 12864": "~}~|~{~z~w~u~q~k~W~N~@~0",
  "15024, 15048": "C}A|Bz@x@t@q@k@dKJKCK8K+",
  "15048, 15072": "~}~|~{~y~v~s~n~f~C~=~4~)",
  "42912, 42936": ";$;(<-:0;4:7;9;=};VMW]Wv",
  "42936, 42960": "V#V%U*U-V0U3U5U8~;~C~G~q",
  "47232, 47256": ":*:/:7;<;B;F:J@OVaVjVpT{",
  "64512, 64536": `#"!'"-!2!5!8"<!?$V%_$k$z`,
  "43872, 43896": ";%:):.;3:7;::=;@aHV]VfXx",
  "43896, 43920": "U$T(U-V0V4V7U9V=~D~O~a~w",
  "40464, 40488": ":$:(;-;1;5;8:::>}=VRVaXw",
  "40488, 40512": "T#U&V*U.U1V3U6U9~<~D~I~t",
  "36168, 36192": "V$V(V-V1V5V8U;U>~F~V~c~x",
  "51360, 51384": "<(:-:4::;?;B;F;KV]UiVoV{",
  "51384, 51408": "U)V.U5V:V?VCUFUK~^~k~q~{",
  "34944, 34968": ";(;,;3;8;=;A;D;IVZVgWnXz",
  "34968, 34992": "U(U-V3U8V=VAUDVI~Z~h~o~{",
  "36744, 36768": "V#V&U+V.U2V4U7V:~@~H~O~t",
  "38280, 38304": 'V"U%V)V,V/U2U4U7~:~B~F~g',
  "41184, 41208": "<$:(;-:1;5:7;:;=}=VQVaTw",
  "41208, 41232": "T#U&V*U.U1V3U6U8~<~D~I~s",
  "43824, 43848": ":%;):.:3;6::;<:@eGW[VeYx",
  "43848, 43872": "U$V'V,V0U4U7V9U<~C~L~^~w",
  "45216, 45240": ";(:-;4;9:>;B;F;KV]VhVnXz",
  "45240, 45264": "U*U/U7V<UBVFVJ^O~a~j~p~{",
  "47376, 47400": ";);/:6:<;A;F;J?NVaVjVpT{",
  "47400, 47424": "U,U2V:U@UFUK_OqU~d~m~r~{",
  "49584, 49608": ":(:-:3:8:=;A;D;IV[VgVnXz",
  "49608, 49632": "U(U-V3V8U=U@UDUH~Y~i~p~{",
}

// DEFAULT SOURCE COLORS ////////////////////////////////////////////////////////

function shiftHue(hue: number, shift: number) {
  const sum = shift + hue
  return sum > 360 ? sum - 360 : sum
}

function getColorPalettes(
  hue: number,
  saturations: [number, number, number],
): [SemanticColors, SemanticColors, SemanticColors] {
  const colors: SemanticColors[] = []
  const isTealish = 110 <= hue && hue <= 208
  const isGreenish = 60 <= hue && hue < 110
  const isYellowish = 35 <= hue && hue < 85
  const isRedToned = 279 <= hue || hue < 16

  const tetradSecondary = shiftHue(hue, 180)
  const tetradSecondaryVariant = shiftHue(hue, 90)
  const triadSecondary = shiftHue(hue, 120)
  const triadSecondaryVariant = shiftHue(hue, 240)
  const splitSecondary = shiftHue(hue, 150)
  const splitSecondaryVariant = shiftHue(hue, 210)

  colors.push({
    primary: { hue, saturation: saturations[0] },
    secondary: {
      hue: isTealish ? triadSecondaryVariant : tetradSecondary,
      saturation: saturations[1],
    },
    tertiary: {
      hue: isTealish ? triadSecondaryVariant : tetradSecondary,
      saturation: saturations[2],
      isNeutral: true,
    },
  })
  colors.push({
    primary: { hue, saturation: saturations[0] },
    secondary: {
      hue: isGreenish || isRedToned ? triadSecondary : tetradSecondaryVariant,
      saturation: saturations[1],
    },
    tertiary: {
      hue: isGreenish || isRedToned ? triadSecondary : tetradSecondaryVariant,
      saturation: saturations[2],
      isNeutral: true,
    },
  })
  colors.push({
    primary: { hue, saturation: saturations[0] },
    secondary: {
      hue: isYellowish ? splitSecondaryVariant : isRedToned ? triadSecondaryVariant : splitSecondary,
      saturation: saturations[1],
    },
    tertiary: {
      hue: isYellowish ? splitSecondaryVariant : isRedToned ? triadSecondaryVariant : splitSecondary,
      saturation: saturations[2],
      isNeutral: true,
    },
  })

  return colors as [SemanticColors, SemanticColors, SemanticColors]
}

function generatePaletteFromHue(
  hue: number,
  variant: 1 | 2 | 3 = 1,
  saturations: [number, number, number] = DEFAULT_SATURATIONS,
): SemanticColors {
  return getColorPalettes(hue, saturations)[variant - 1]
}

export const DEFAULT_SOURCE_COLORS: ColorGenOptions = {
  ...generatePaletteFromHue(DEFAULT_HUE, DEFAULT_PALETTE, [85, 50, 0]),
  min: { hue: 0, saturation: 0, contrast: 0 },
  max: { hue: 0, saturation: 0, contrast: 100 },
  info: { hue: 194, saturation: 95 },
  success: { hue: 123, saturation: 90 },
  warning: { hue: 33, saturation: 100 },
  error: { hue: 350, saturation: 75 },
  tomato: { hue: 8, saturation: 90 },
  amber: { hue: 45, saturation: 100 },
  grass: { hue: 77, saturation: 100 },
  forest: { hue: 138, saturation: 90 },
  aqua: { hue: 193, saturation: 90 },
  indigo: { hue: 222, saturation: 90 },
  plum: { hue: 267, saturation: 90 },
  magenta: { hue: 313, saturation: 80 },
}

// COLOR GENERATION /////////////////////////////////////////////////////////////

function getHSL(hue: number, saturation: number, luminance: number, alpha?: number) {
  const alphaText = alpha ? `,${String(alpha).replace("0.", ".")}` : ""
  return `hsl(${hue},${saturation}%,${luminance}%${alphaText})`
}

function numerize(name: ScaleColorName, numberKey: ColorNumberKey): ThemeColor {
  return `${name}${numberKey}`
}

function decodeValue(value: string) {
  return value.charCodeAt(0) + DECODE_DIFF
}

type Processor = (key: ColorNumberKey, saturation: number, luminance: number) => void

/** Sorted hues present in the COLOR_MATRIX for each mode/type */
const AVAILABLE_HUES = [8, 33, 45, 77, 123, 138, 174, 193, 194, 222, 264, 267, 313, 350] as const

/**
 * Finds the two nearest hues in the matrix and returns them with an
 * interpolation factor. Wraps around 360°.
 */
function findBracketingHues(targetHue: number): { lowHue: number; highHue: number; t: number } {
  const hues = AVAILABLE_HUES
  // Find the two hues that bracket targetHue
  for (let i = 0; i < hues.length; i++) {
    if (hues[i] === targetHue) return { lowHue: targetHue, highHue: targetHue, t: 0 }
    if (hues[i] > targetHue) {
      const low = i > 0 ? hues[i - 1] : hues[hues.length - 1]
      const high = hues[i]
      const span = low < high ? high - low : (360 - low) + high
      const dist = low < targetHue ? targetHue - low : (360 - low) + targetHue
      return { lowHue: low, highHue: high, t: dist / span }
    }
  }
  // targetHue > all available hues — wraps to first
  const low = hues[hues.length - 1]
  const high = hues[0]
  const span = (360 - low) + high
  const dist = targetHue - low
  return { lowHue: low, highHue: high, t: dist / span }
}

/**
 * Reads a 12-step set from the matrix for a given hue, falling back to
 * interpolation between the two nearest available hues.
 */
function getMatrixSet(
  hue: number,
  saturation: number,
  isNeutral: boolean,
  mode: "light" | "dark",
): string | null {
  const fullSat = isNeutral ? MAX_NEUTRAL_SATURATION : 100
  const colorType = isNeutral ? "neutral" : "color"
  const baseIndex = MATRIX_INDICES[mode][colorType]
  const hueIndex = baseIndex + SEGMENT_SIZE.hue * hue
  const setIndex = saturation < fullSat ? hueIndex : hueIndex + SEGMENT_SIZE.set
  const key = `${setIndex}, ${setIndex + SEGMENT_SIZE.set}`
  return COLOR_MATRIX[key] ?? null
}

/**
 * Fallback: interpolates between the two nearest pre-computed hues in the
 * COLOR_MATRIX to generate a 12-step palette for an arbitrary hue.
 */
function generateInterpolatedPalette(
  hue: number,
  saturation: number,
  isNeutral: boolean,
  mode: "light" | "dark",
  processor: Processor,
) {
  const { lowHue, highHue, t } = findBracketingHues(hue)

  const lowSet = getMatrixSet(lowHue, saturation, isNeutral, mode)
  const highSet = getMatrixSet(highHue, saturation, isNeutral, mode)

  if (lowSet && highSet && lowHue !== highHue) {
    // Interpolate between the two nearest hues
    interpolateSets(lowSet, highSet, t, processor)
  } else if (lowSet) {
    // Only one match — use it directly
    processSet(lowSet, processor)
  } else if (highSet) {
    processSet(highSet, processor)
  } else {
    // No matrix data at all — simple HSL ramp
    const isDark = mode === "dark"
    const lightLum = [97, 94, 89, 83, 73, 63, 53, 43, 33, 25, 18, 10]
    const darkLum = [8, 12, 17, 23, 30, 38, 47, 56, 66, 76, 85, 93]
    const lums = isDark ? darkLum : lightLum
    const satCurve = [0.4, 0.55, 0.7, 0.8, 0.88, 0.95, 1.0, 1.0, 0.95, 0.88, 0.8, 0.7]
    COLOR_KEYS.forEach((key, i) => {
      processor(key, Math.round(saturation * satCurve[i]), lums[i])
    })
  }
}

function processSet(set: string, processor: Processor, isZeroSat = false) {
  const size = isZeroSat ? SEGMENT_SIZE.value : SEGMENT_SIZE.valuePair
  let index = 0
  COLOR_KEYS.forEach(key => {
    const pair = set.substring(index, index + size)
    const saturation = isZeroSat ? 0 : decodeValue(pair[0])
    const luminance = isZeroSat ? decodeValue(pair[0]) : decodeValue(pair[1])
    processor(key, saturation, luminance)
    index += size
  })
}

function interpolatePair(fullValue: number, halfValue: number, multiplier: number) {
  const diff = fullValue - halfValue
  const mod = parseFloat((diff * multiplier).toFixed(2))
  return halfValue + mod
}

function interpolateSets(
  startSet: string,
  endSet: string,
  multiplier: number,
  processor: Processor,
  isStartSetZeroSat = false,
) {
  const startSize = isStartSetZeroSat ? SEGMENT_SIZE.value : SEGMENT_SIZE.valuePair
  let startIndex = 0
  const endSize = SEGMENT_SIZE.valuePair
  let endIndex = 0
  COLOR_KEYS.forEach(key => {
    const startPair = startSet.substring(startIndex, startIndex + startSize)
    const startSaturation = isStartSetZeroSat ? 0 : decodeValue(startPair[0])
    const startLuminance = isStartSetZeroSat ? decodeValue(startPair[0]) : decodeValue(startPair[1])

    const endPair = endSet.substring(endIndex, endIndex + endSize)
    const endSaturation = decodeValue(endPair[0])
    const endLuminance = decodeValue(endPair[1])

    const saturation = interpolatePair(startSaturation, endSaturation, multiplier)
    const luminance = interpolatePair(startLuminance, endLuminance, multiplier)

    processor(key, saturation, luminance)

    startIndex += startSize
    endIndex += endSize
  })
}

export function getTextColor(color: ScaleColorName, numberKey?: ColorNumberKey): ThemeColor {
  const isMin = color.startsWith(StaticColorName.min)
  const isMax = color.startsWith(StaticColorName.max)
  const isAlpha = color.endsWith(ALPHA_KEY)
  let targets: Record<ColorNumberKey, string | number> = TEXT_COLOR_TARGETS
  if (isAlpha) {
    if (isMin) targets = MIN_ALPHA_TEXT_COLOR_TARGETS
    else if (isMax) targets = MAX_ALPHA_TEXT_COLOR_TARGETS
    else targets = ALPHA_TEXT_COLOR_TARGETS
  }
  if (!numberKey) return isMin ? StaticColorName.max : StaticColorName.min
  const targetKey = targets[numberKey]
  const safeColor = isMin || isMax ? CoreColorName.primary : color
  const targetColor = isAlpha ? safeColor.replace(ALPHA_KEY, "") : safeColor
  return (typeof targetKey === "number" ? `${targetColor}${targetKey}` : targetKey) as ThemeColor
}

/** Generates a color mode-based palette */
export function generateThemeColors<T = string>(
  inputColors: Partial<ColorGenOptions>,
  mode: ColorMode,
  setValue: ColorSetter<T>,
): ColorPalette<T> {
  const isDark = mode === "dark"
  const colors = {} as ColorPalette<T>

  Object.entries(inputColors).forEach(([colorKey, inputValue]) => {
    const isMapped = typeof inputValue === "string"
    const isInputObject = typeof inputValue === "object"
    const isStatic = isInputObject && "contrast" in inputValue
    const isNeutral = isInputObject && "isNeutral" in inputValue && inputValue.isNeutral

    let hue = isInputObject ? inputValue.hue : (inputValue as number)
    let saturation = isInputObject ? inputValue.saturation ?? 100 : 100

    if ((!isMapped && typeof hue !== "number") || isNaN(hue) || hue > 360 || hue < 0) {
      throw new Error(`Invalid value for hue on color "${colorKey}": ${hue}. Must be a number between 0 and 360.`)
    }
    if (typeof saturation !== "number" || isNaN(saturation) || saturation > 100 || saturation < 0) {
      throw new Error(
        `Invalid value for saturation on color "${colorKey}": ${saturation}. Must be a number between 0 and 100.`,
      )
    }

    if (!isMapped) {
      hue = Math.round(hue)
      hue = hue > 359 ? 0 : hue
    }
    saturation = Math.round(saturation)
    saturation = isNeutral && saturation > 40 ? Math.round((saturation / 100) * 40) : saturation

    if (isMapped) {
      COLOR_KEYS.forEach(numberKey => {
        setValue(
          numerize(colorKey as ScaleColorName, numberKey),
          colors,
          numerize(inputValue as ScaleColorName, numberKey),
          numberKey,
          true,
        )
      })
    } else if (isStatic) {
      const contrast = inputValue.contrast
      if (typeof contrast !== "number" || isNaN(contrast) || contrast > 100 || contrast < 0) {
        throw new Error(
          `Invalid value for contrast on color "${colorKey}": ${contrast}. Must be a number between 0 and 100.`,
        )
      }
      setValue(colorKey as keyof ColorPalette<T>, colors, getHSL(hue, saturation, isDark ? contrast : 100 - contrast))
    } else {
      const fullSat = isNeutral ? MAX_NEUTRAL_SATURATION : 100
      const halfSat = fullSat / 2
      const colorType = isNeutral ? "neutral" : "color"
      const baseIndex = MATRIX_INDICES[mode][colorType]
      const hueIndex = baseIndex + SEGMENT_SIZE.hue * hue
      const setIndex = saturation < fullSat ? hueIndex : hueIndex + SEGMENT_SIZE.set

      const zeroSatIndex = ZERO_SATURATION_INDICES[mode][colorType]
      const zeroSatSet = ZERO_SATURATION_LUMINANCE.substring(zeroSatIndex, zeroSatIndex + 12)

      const needsInterpolation = saturation !== 0 && saturation !== fullSat && saturation !== halfSat

      // Check if matrix has entries for this hue; fall back to HSL generation if not
      const halfSatKey = `${setIndex}, ${setIndex + SEGMENT_SIZE.set}`
      const hasMatrixEntry = saturation === 0 || COLOR_MATRIX[halfSatKey] !== undefined

      if (!hasMatrixEntry) {
        // Fallback: interpolate between nearest available hues in the matrix
        generateInterpolatedPalette(hue, saturation, !!isNeutral, mode, (setKey, setSaturation, setLuminance) => {
          setValue(numerize(colorKey as ScaleColorName, setKey), colors, getHSL(hue, setSaturation, setLuminance), setKey)
        })
      } else if (!needsInterpolation) {
        const isZeroSat = saturation === 0
        const set = isZeroSat ? zeroSatSet : COLOR_MATRIX[halfSatKey]
        processSet(
          set,
          (setKey, setSaturation, setLuminance) => {
            setValue(numerize(colorKey as ScaleColorName, setKey), colors, getHSL(hue, setSaturation, setLuminance), setKey)
          },
          isZeroSat,
        )
      } else {
        let multiplier = (saturation - halfSat) / (fullSat - halfSat)

        if (saturation < halfSat) {
          multiplier = saturation / halfSat
          const startSet = zeroSatSet
          const endSet = COLOR_MATRIX[halfSatKey]
          interpolateSets(
            startSet,
            endSet,
            multiplier,
            (setKey, setSaturation, setLuminance) => {
              setValue(numerize(colorKey as ScaleColorName, setKey), colors, getHSL(hue, setSaturation, setLuminance), setKey)
            },
            true,
          )
        } else {
          const startSet = COLOR_MATRIX[halfSatKey]
          const endSet = COLOR_MATRIX[`${setIndex + SEGMENT_SIZE.set}, ${setIndex + SEGMENT_SIZE.set * 2}`]
          interpolateSets(startSet, endSet, multiplier, (setKey, setSaturation, setLuminance) => {
            setValue(numerize(colorKey as ScaleColorName, setKey), colors, getHSL(hue, setSaturation, setLuminance), setKey)
          })
        }
      }

      const alphaColorKey = AlphaColorName[`${colorKey}${ALPHA_KEY}` as keyof typeof AlphaColorName]
      if (alphaColorKey) {
        const minLuminance = isDark ? 0 : 100
        const maxLuminance = isDark ? 100 : 0
        const luminance = colorKey === "min" ? minLuminance : colorKey === "max" ? maxLuminance : 50
        ALPHA_VALUES.forEach((alpha, index) => {
          const alphaKey = (index + 1) as ColorNumberKey
          setValue(numerize(alphaColorKey, alphaKey), colors, getHSL(hue, saturation, luminance, alpha), alphaKey)
        })
      }
    }
  })

  return colors
}
