import { ColorSetter } from "../../config/scales/scales.models"
import {
  ColorGenOptions,
  ColorMode,
  ColorNumberKey,
  ColorPalette,
  COLOR_KEYS,
  StaticColorName,
  ScaleColorName,
  ThemeColor,
  MATRIX_INDICES,
  SEGMENT_SIZE,
  MAX_NEUTRAL_SATURATION,
  DECODE_DIFF,
  ZERO_SATURATION_LUMINANCE,
  ALPHA_KEY,
  MAX_ALPHA_TEXT_COLOR_TARGETS,
  MIN_ALPHA_TEXT_COLOR_TARGETS,
  TEXT_COLOR_TARGETS,
  ALPHA_TEXT_COLOR_TARGETS,
  AlphaColorName,
  ALPHA_VALUES,
  CoreColorName,
  ZERO_SATURATION_INDICES,
} from "../models/colorGen.models"

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

export function getTextColor(color: ScaleColorName, numberKey?: ColorNumberKey): ThemeColor {
  const isMin = color.startsWith(StaticColorName.min)
  const isMax = color.startsWith(StaticColorName.max)
  const isAlpha = color.endsWith(ALPHA_KEY)
  let targets: Record<ColorNumberKey, string | number> = TEXT_COLOR_TARGETS
  if (isAlpha) {
    if (isMin) {
      targets = MIN_ALPHA_TEXT_COLOR_TARGETS
    } else if (isMax) {
      targets = MAX_ALPHA_TEXT_COLOR_TARGETS
    } else {
      targets = ALPHA_TEXT_COLOR_TARGETS
    }
  }
  if (!numberKey) {
    return isMin ? StaticColorName.max : StaticColorName.min
  }
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

    // Validate hue and saturation
    if ((!isMapped && typeof hue !== "number") || isNaN(hue) || hue > 360 || hue < 0) {
      throw new Error(`Invalid value for hue on color "${colorKey}": ${hue}. Must be a number between 0 and 360.`)
    }
    if (typeof saturation !== "number" || isNaN(saturation) || saturation > 100 || saturation < 0) {
      throw new Error(
        `Invalid value for saturation on color "${colorKey}": ${saturation}. Must be a number between 0 and 100.`,
      )
    }

    if (!isMapped) {
      // Make sure we normalize hue, and map 360 to 0
      hue = Math.round(hue)
      hue = hue > 359 ? 0 : hue
    }
    // Make sure we normalize saturation, including for neutrals
    saturation = Math.round(saturation)
    saturation = isNeutral && saturation > 40 ? Math.round((saturation / 100) * 40) : saturation

    if (isMapped) {
      /** These colors just reference another color */
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
      /** These colors are NOT scaled */
      const contrast = inputValue.contrast
      // Validate contrast
      if (typeof contrast !== "number" || isNaN(contrast) || contrast > 100 || contrast < 0) {
        throw new Error(
          `Invalid value for contrast on color "${colorKey}": ${contrast}. Must be a number between 0 and 100.`,
        )
      }
      setValue(colorKey as StaticColorName, colors, getHSL(hue, saturation, isDark ? contrast : 100 - contrast))
    } else {
      /**
       * We are dealing with a non-mapped, scaled color, so we need to grab scaled luminance values
       * from the encoded matrix, and interpolate those against the target saturation.
       */

      const fullSat = isNeutral ? MAX_NEUTRAL_SATURATION : 100
      const halfSat = fullSat / 2

      // Get our starting index in the encoded matrix
      const colorType = isNeutral ? "neutral" : "color"
      const baseIndex = MATRIX_INDICES[mode][colorType]
      const hueIndex = baseIndex + SEGMENT_SIZE.hue * hue
      // Only skip the half-saturation set if we are dealing with full saturation
      const setIndex = saturation < fullSat ? hueIndex : hueIndex + SEGMENT_SIZE.set

      const zeroSatIndex = ZERO_SATURATION_INDICES[mode][colorType]
      const zeroSatSet = ZERO_SATURATION_LUMINANCE.substring(zeroSatIndex, zeroSatIndex + 12)

      const needsInterpolation = saturation !== 0 && saturation !== fullSat && saturation !== halfSat
      let set = ""

      if (!needsInterpolation) {
        // Our saturation matches a set exactly, so we don't need to interpolate!
        const isZeroSat = saturation === 0
        set = isZeroSat ? zeroSatSet : COLOR_MATRIX[`${setIndex}, ${setIndex + SEGMENT_SIZE.set}`]
        processSet(
          set,
          (setKey, setSaturation, setLuminance) => {
            setValue(
              numerize(colorKey as ScaleColorName, setKey),
              colors,
              getHSL(hue, setSaturation, setLuminance),
              setKey,
            )
          },
          isZeroSat,
        )
      } else {
        let startSet = ""
        let endSet = ""
        let multiplier = (saturation - halfSat) / (fullSat - halfSat)

        if (saturation < halfSat) {
          // Interpolate using zero and half sets
          multiplier = saturation / halfSat
          startSet = zeroSatSet
          endSet = COLOR_MATRIX[`${setIndex}, ${setIndex + SEGMENT_SIZE.set}`]
          interpolateSets(
            startSet,
            endSet,
            multiplier,
            (setKey, setSaturation, setLuminance) => {
              setValue(
                numerize(colorKey as ScaleColorName, setKey),
                colors,
                getHSL(hue, setSaturation, setLuminance),
                setKey,
              )
            },
            true,
          )
        } else {
          // Interpolate using half and full sets
          startSet = COLOR_MATRIX[`${setIndex}, ${setIndex + SEGMENT_SIZE.set}`]
          endSet = COLOR_MATRIX[`${setIndex + SEGMENT_SIZE.set}, ${setIndex + SEGMENT_SIZE.set * 2}`]
          interpolateSets(startSet, endSet, multiplier, (setKey, setSaturation, setLuminance) => {
            setValue(
              numerize(colorKey as ScaleColorName, setKey),
              colors,
              getHSL(hue, setSaturation, setLuminance),
              setKey,
            )
          })
        }
      }
    }

    /**
     * If the current `colorKey` is supposed to have an alpha scale, create it now
     */
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
  })

  return colors
}

// INTERNAL UTILS /////////////////////////////////////////////////////////////////////////////////

function getHSL(hue: number, saturation: number, luminance: number, alpha?: number) {
  const alphaText = alpha ? `,${String(alpha).replace("0.", ".")}` : ""
  return `hsl(${hue},${saturation}%,${luminance}%${alphaText})`
}

function numerize(name: ScaleColorName, numberKey: ColorNumberKey): ThemeColor {
  return `${name}${numberKey}`
}

type Processor = (key: ColorNumberKey, saturation: number, luminance: number) => void

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

function decodeValue(value: string) {
  return value.charCodeAt(0) + DECODE_DIFF
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

function interpolatePair(fullValue: number, halfValue: number, multiplier: number) {
  const diff = fullValue - halfValue
  const mod = parseFloat((diff * multiplier).toFixed(2))

  return halfValue + mod
}
