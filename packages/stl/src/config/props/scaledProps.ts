import { omitKeys } from "./props.utils"
import {
  Scale,
  CssValueMap,
  Scales,
  outlineCombos,
  outlineColors,
  outlineOffsets,
  outlineWidths,
  borderCombos,
  borderColors,
  borderStyles,
  borderWidths,
  hiddenBorderColors,
  hiddenBorderStyles,
  hiddenBorderWidths,
  CssValue,
  animationCombos,
  animationDurations,
  colorCore,
  colorText,
  CssAliasMap,
  outlineStyles,
  hiddenOutlineColors,
  hiddenOutlineOffsets,
  hiddenOutlineStyles,
  hiddenOutlineWidths,
  fontCombos,
  typoCombos,
  textDecorationCombos,
  hiddenTextDecorationColors,
  hiddenTextDecorationLines,
  hiddenTextDecorationStyles,
  hiddenTextDecorationThicknesses,
  textDecorationColors,
  textDecorationLines,
  textDecorationStyles,
  textDecorationThicknesses,
  animationFillModes,
  animationIterationCounts,
  animationNames,
  animationTimingFunctions,
  hiddenAnimationDurations,
  hiddenAnimationFillModes,
  hiddenAnimationIterationCounts,
  hiddenAnimationNames,
  hiddenAnimationTimingFunctions,
  hiddenOpacities,
  hiddenTransformOrigins,
  hiddenTransitionDurations,
  hiddenTransitionProperties,
  opacities,
  transformOrigins,
  transitionDurations,
  transitionProperties,
  pointerEvents,
  hiddenPointerEvents,
  hiddenTransforms,
  transforms,
} from "../scales"
import {
  CssPropKey,
  CssRule,
  CssValueClassMap,
  FilterKeys,
  KeysFromScale,
  PickKeys,
  SCALED_PLACEHOLDER,
} from "./props.models"
import { addPrefix } from "../utils"

function filterMap<M extends CssValueMap, K extends Record<string, unknown>, H extends Record<string, unknown>>(
  map: M,
  keys: K,
  hiddenKeys?: H
) {
  const output: PickKeys<M, typeof keys> = { ...map }
  Object.keys(map).forEach((key: keyof M) => {
    const isKey = keys[key as keyof typeof keys]
    const isHiddenKey = hiddenKeys?.[key as keyof typeof hiddenKeys]
    if (!isKey && (!hiddenKeys || !isHiddenKey)) {
      delete output[key as keyof typeof output]
    }
  })
  return output
}

/** Util to extract the CSS value map from a scale object */
function map<
  S extends Scales,
  V extends Scale,
  K extends Record<string, unknown> = Record<keyof S[V]["cssValueMap"], unknown>,
  H extends Record<string, unknown> = Record<keyof S[V]["cssValueMap"], unknown>
>(scales: S, scale: V, keys?: K, hiddenKeys?: H) {
  const map = scales[scale].cssValueMap as S[V]["cssValueMap"]
  if (keys) {
    return filterMap(map, keys, hiddenKeys)
  }
  return map
}

/**
 * Used to generate CSS classes for various CSS props, based on scaled values.
 * Returns an object containing props with values matching a signature of:
 * `Record<ScaleKey, CssClassForThatKey>`
 */
export function generateScaledPropsCss<S extends Scales, K extends FilterKeys>(
  scales: S,
  generateClass: (value: CssRule) => string,
  keys?: K
) {
  function entries<M extends CssValueMap, A extends CssAliasMap = CssAliasMap>(prop: CssPropKey, map: M, aliasMap?: A) {
    return Object.entries(map).reduce(
      (output: Record<KeysFromScale<M>, string>, [scaleKey, scaleValue]: [keyof M, CssValue]) => {
        const value = typeof scaleValue === "string" ? { [prop]: scaleValue } : scaleValue

        const isFilteredKey = keys && !keys[prop]
        const isAliasKey = aliasMap?.[addPrefix(String(scaleKey))]
        const fallbackValue = isAliasKey ? SCALED_PLACEHOLDER : ""
        const className = isFilteredKey || isAliasKey ? fallbackValue : generateClass(value)

        const key = addPrefix(String(scaleKey)) as KeysFromScale<M>
        output[key] = className

        return output
      },
      {} as CssValueClassMap<typeof map>
    )
  }

  const backgroundColor = entries(
    "backgroundColor",
    map(scales, Scale.color, colorCore),
    scales[Scale.color].cssAliasMap
  )

  const props = {
    inlineSize: entries("inlineSize", map(scales, Scale.size), scales[Scale.size].cssAliasMap),
    blockSize: entries("blockSize", map(scales, Scale.size), scales[Scale.size].cssAliasMap),
    minInlineSize: entries("minInlineSize", map(scales, Scale.size), scales[Scale.size].cssAliasMap),
    maxInlineSize: entries("maxInlineSize", map(scales, Scale.size), scales[Scale.size].cssAliasMap),
    minBlockSize: entries("minBlockSize", map(scales, Scale.size), scales[Scale.size].cssAliasMap),
    maxBlockSize: entries("maxBlockSize", map(scales, Scale.size), scales[Scale.size].cssAliasMap),

    marginBlockStart: entries("marginBlockStart", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    marginBlockEnd: entries("marginBlockEnd", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    marginInlineStart: entries("marginInlineStart", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    marginInlineEnd: entries("marginInlineEnd", map(scales, Scale.space), scales[Scale.space].cssAliasMap),

    paddingBlockStart: entries("paddingBlockStart", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    paddingBlockEnd: entries("paddingBlockEnd", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    paddingInlineStart: entries("paddingInlineStart", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    paddingInlineEnd: entries("paddingInlineEnd", map(scales, Scale.space), scales[Scale.space].cssAliasMap),

    insetBlockStart: entries("insetBlockStart", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    insetBlockEnd: entries("insetBlockEnd", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    insetInlineStart: entries("insetInlineStart", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    insetInlineEnd: entries("insetInlineEnd", map(scales, Scale.space), scales[Scale.space].cssAliasMap),

    outline: entries("outline", map(scales, Scale.outline, outlineCombos), scales[Scale.outline].cssAliasMap),
    outlineWidth: entries(
      "outlineWidth",
      map(scales, Scale.outline, outlineWidths, hiddenOutlineWidths),
      scales[Scale.outline].cssAliasMap
    ),
    outlineColor: entries(
      "outlineColor",
      map(scales, Scale.outline, outlineColors, hiddenOutlineColors),
      scales[Scale.outline].cssAliasMap
    ),
    outlineStyle: entries(
      "outlineStyle",
      map(scales, Scale.outline, outlineStyles, hiddenOutlineStyles),
      scales[Scale.outline].cssAliasMap
    ),
    outlineOffset: entries(
      "outlineOffset",
      map(scales, Scale.outline, outlineOffsets, hiddenOutlineOffsets),
      scales[Scale.outline].cssAliasMap
    ),

    border: entries("border", map(scales, Scale.border, borderCombos), scales[Scale.border].cssAliasMap),
    borderBlockStart: entries(
      "borderBlockStart",
      map(scales, Scale.border, borderCombos),
      scales[Scale.border].cssAliasMap
    ),
    borderBlockEnd: entries(
      "borderBlockEnd",
      map(scales, Scale.border, borderCombos),
      scales[Scale.border].cssAliasMap
    ),
    borderInlineStart: entries(
      "borderInlineStart",
      map(scales, Scale.border, borderCombos),
      scales[Scale.border].cssAliasMap
    ),
    borderInlineEnd: entries(
      "borderInlineEnd",
      map(scales, Scale.border, borderCombos),
      scales[Scale.border].cssAliasMap
    ),

    borderBlockStartColor: entries(
      "borderBlockStartColor",
      map(scales, Scale.border, borderColors, hiddenBorderColors),
      scales[Scale.border].cssAliasMap
    ),
    borderBlockEndColor: entries(
      "borderBlockEndColor",
      map(scales, Scale.border, borderColors, hiddenBorderColors),
      scales[Scale.border].cssAliasMap
    ),
    borderInlineStartColor: entries(
      "borderInlineStartColor",
      map(scales, Scale.border, borderColors, hiddenBorderColors),
      scales[Scale.border].cssAliasMap
    ),
    borderInlineEndColor: entries(
      "borderInlineEndColor",
      map(scales, Scale.border, borderColors, hiddenBorderColors),
      scales[Scale.border].cssAliasMap
    ),

    borderBlockStartStyle: entries(
      "borderBlockStartStyle",
      map(scales, Scale.border, borderStyles, hiddenBorderStyles),
      scales[Scale.border].cssAliasMap
    ),
    borderBlockEndStyle: entries(
      "borderBlockEndStyle",
      map(scales, Scale.border, borderStyles, hiddenBorderStyles),
      scales[Scale.border].cssAliasMap
    ),
    borderInlineStartStyle: entries(
      "borderInlineStartStyle",
      map(scales, Scale.border, borderStyles, hiddenBorderStyles),
      scales[Scale.border].cssAliasMap
    ),
    borderInlineEndStyle: entries(
      "borderInlineEndStyle",
      map(scales, Scale.border, borderStyles, hiddenBorderStyles),
      scales[Scale.border].cssAliasMap
    ),

    borderBlockStartWidth: entries(
      "borderBlockStartWidth",
      map(scales, Scale.border, borderWidths, hiddenBorderWidths),
      scales[Scale.border].cssAliasMap
    ),
    borderBlockEndWidth: entries(
      "borderBlockEndWidth",
      map(scales, Scale.border, borderWidths, hiddenBorderWidths),
      scales[Scale.border].cssAliasMap
    ),
    borderInlineStartWidth: entries(
      "borderInlineStartWidth",
      map(scales, Scale.border, borderWidths, hiddenBorderWidths),
      scales[Scale.border].cssAliasMap
    ),
    borderInlineEndWidth: entries(
      "borderInlineEndWidth",
      map(scales, Scale.border, borderWidths, hiddenBorderWidths),
      scales[Scale.border].cssAliasMap
    ),

    flexBasis: entries("flexBasis", map(scales, Scale.size), scales[Scale.size].cssAliasMap),

    // gridTemplateRows is probably not useful enough. Instead, use...
    gridAutoRows: entries("gridAutoRows", map(scales, Scale.row), scales[Scale.row].cssAliasMap),
    gridTemplateColumns: entries("gridTemplateColumns", map(scales, Scale.column), scales[Scale.column].cssAliasMap),

    columnGap: entries("columnGap", map(scales, Scale.space), scales[Scale.space].cssAliasMap),
    rowGap: entries("rowGap", map(scales, Scale.space), scales[Scale.space].cssAliasMap),

    borderStartStartRadius: entries(
      "borderStartStartRadius",
      map(scales, Scale.radius),
      scales[Scale.radius].cssAliasMap
    ),
    borderStartEndRadius: entries("borderStartEndRadius", map(scales, Scale.radius), scales[Scale.radius].cssAliasMap),
    borderEndStartRadius: entries("borderEndStartRadius", map(scales, Scale.radius), scales[Scale.radius].cssAliasMap),
    borderEndEndRadius: entries("borderEndEndRadius", map(scales, Scale.radius), scales[Scale.radius].cssAliasMap),

    // Scaled color values from `background` get routed to this instead
    background: backgroundColor,
    backgroundColor,

    color: entries("color", map(scales, Scale.color, colorText), scales[Scale.color].cssAliasMap),
    fill: entries("fill", map(scales, Scale.color, colorCore), scales[Scale.color].cssAliasMap),
    stroke: entries("stroke", map(scales, Scale.color, colorCore), scales[Scale.color].cssAliasMap),

    font: entries("font", map(scales, Scale.font, fontCombos), scales[Scale.font].cssAliasMap),
    fontFamily: entries("fontFamily", map(scales, Scale.fontFamily), scales[Scale.fontFamily].cssAliasMap),
    fontSize: entries("fontSize", map(scales, Scale.fontSize), scales[Scale.fontSize].cssAliasMap),
    fontWeight: entries("fontWeight", map(scales, Scale.fontWeight), scales[Scale.fontWeight].cssAliasMap),

    textDecoration: entries(
      "textDecoration",
      map(scales, Scale.textDecoration, textDecorationCombos),
      scales[Scale.textDecoration].cssAliasMap
    ),
    textDecorationLine: entries(
      "textDecorationLine",
      map(scales, Scale.textDecoration, textDecorationLines, hiddenTextDecorationLines)
    ),
    textDecorationStyle: entries(
      "textDecorationStyle",
      map(scales, Scale.textDecoration, textDecorationStyles, hiddenTextDecorationStyles)
    ),
    textDecorationColor: entries(
      "textDecorationColor",
      map(scales, Scale.textDecoration, textDecorationColors, hiddenTextDecorationColors)
    ),
    textDecorationThickness: entries(
      "textDecorationThickness",
      map(scales, Scale.textDecoration, textDecorationThicknesses, hiddenTextDecorationThicknesses)
    ),

    typo: entries("typo", map(scales, Scale.typo, typoCombos), scales[Scale.typo].cssAliasMap),
    lineHeight: entries("lineHeight", map(scales, Scale.lineHeight), scales[Scale.lineHeight].cssAliasMap),
    letterSpacing: entries("letterSpacing", map(scales, Scale.typoSpace), scales[Scale.typoSpace].cssAliasMap),
    wordSpacing: entries("wordSpacing", map(scales, Scale.typoSpace), scales[Scale.typoSpace].cssAliasMap),
    textUnderlineOffset: entries(
      "textUnderlineOffset",
      map(scales, Scale.typoSpace),
      scales[Scale.typoSpace].cssAliasMap
    ),

    zIndex: entries("zIndex", map(scales, Scale.zIndex), scales[Scale.zIndex].cssAliasMap),

    boxShadow: entries("boxShadow", map(scales, Scale.shadow), scales[Scale.shadow].cssAliasMap),

    animation: entries("animation", map(scales, Scale.animation, animationCombos), scales[Scale.animation].cssAliasMap),
    animationName: entries(
      "animationName",
      map(scales, Scale.animation, animationNames, hiddenAnimationNames),
      scales[Scale.animation].cssAliasMap
    ),
    animationDuration: entries(
      "animationDuration",
      map(scales, Scale.animation, animationDurations, hiddenAnimationDurations),
      scales[Scale.animation].cssAliasMap
    ),
    animationIterationCount: entries(
      "animationIterationCount",
      map(scales, Scale.animation, animationIterationCounts, hiddenAnimationIterationCounts),
      scales[Scale.animation].cssAliasMap
    ),
    animationTimingFunction: entries(
      "animationTimingFunction",
      map(scales, Scale.animation, animationTimingFunctions, hiddenAnimationTimingFunctions),
      scales[Scale.animation].cssAliasMap
    ),
    animationFillMode: entries(
      "animationFillMode",
      map(scales, Scale.animation, animationFillModes, hiddenAnimationFillModes),
      scales[Scale.animation].cssAliasMap
    ),
    transform: entries(
      "transform",
      map(scales, Scale.animation, transforms, hiddenTransforms),
      scales[Scale.animation].cssAliasMap
    ),
    transformOrigin: entries(
      "transformOrigin",
      map(scales, Scale.animation, transformOrigins, hiddenTransformOrigins),
      scales[Scale.animation].cssAliasMap
    ),
    transitionProperty: entries(
      "transitionProperty",
      map(scales, Scale.animation, transitionProperties, hiddenTransitionProperties),
      scales[Scale.animation].cssAliasMap
    ),
    transitionDuration: entries(
      "transitionDuration",
      map(scales, Scale.animation, transitionDurations, hiddenTransitionDurations),
      scales[Scale.animation].cssAliasMap
    ),
    opacity: entries(
      "opacity",
      map(scales, Scale.animation, opacities, hiddenOpacities),
      scales[Scale.animation].cssAliasMap
    ),
    pointerEvents: entries(
      "pointerEvents",
      map(scales, Scale.animation, pointerEvents, hiddenPointerEvents),
      scales[Scale.animation].cssAliasMap
    ),
  } as const

  if (keys) {
    return omitKeys(props, keys)
  }
  return props
}

export const scaledPropScale = {
  inlineSize: Scale.size,
  blockSize: Scale.size,
  minInlineSize: Scale.size,
  maxInlineSize: Scale.size,
  minBlockSize: Scale.size,
  maxBlockSize: Scale.size,

  marginBlockStart: Scale.space,
  marginBlockEnd: Scale.space,
  marginInlineStart: Scale.space,
  marginInlineEnd: Scale.space,

  paddingBlockStart: Scale.space,
  paddingBlockEnd: Scale.space,
  paddingInlineStart: Scale.space,
  paddingInlineEnd: Scale.space,

  insetBlockStart: Scale.space,
  insetBlockEnd: Scale.space,
  insetInlineStart: Scale.space,
  insetInlineEnd: Scale.space,

  outline: Scale.outline,
  outlineWidth: Scale.outline,
  outlineColor: Scale.outline,
  outlineStyle: Scale.outline,
  outlineOffset: Scale.outline,

  border: Scale.border,
  borderBlockStart: Scale.border,
  borderBlockEnd: Scale.border,
  borderInlineStart: Scale.border,
  borderInlineEnd: Scale.border,

  borderBlockStartColor: Scale.border,
  borderBlockEndColor: Scale.border,
  borderInlineStartColor: Scale.border,
  borderInlineEndColor: Scale.border,

  borderBlockStartStyle: Scale.border,
  borderBlockEndStyle: Scale.border,
  borderInlineStartStyle: Scale.border,
  borderInlineEndStyle: Scale.border,

  borderBlockStartWidth: Scale.border,
  borderBlockEndWidth: Scale.border,
  borderInlineStartWidth: Scale.border,
  borderInlineEndWidth: Scale.border,

  flexBasis: Scale.size,

  gridAutoRows: Scale.row,
  gridTemplateColumns: Scale.column,

  columnGap: Scale.space,
  rowGap: Scale.space,

  borderStartStartRadius: Scale.radius,
  borderStartEndRadius: Scale.radius,
  borderEndStartRadius: Scale.radius,
  borderEndEndRadius: Scale.radius,

  background: Scale.color,
  backgroundColor: Scale.color,

  color: Scale.color,
  fill: Scale.color,
  stroke: Scale.color,

  font: Scale.font,
  fontFamily: Scale.fontFamily,
  fontSize: Scale.fontSize,
  fontWeight: Scale.fontWeight,

  textDecoration: Scale.textDecoration,
  textDecorationLine: Scale.textDecoration,
  textDecorationStyle: Scale.textDecoration,
  textDecorationColor: Scale.textDecoration,
  textDecorationThickness: Scale.textDecoration,

  typo: Scale.typo,
  lineHeight: Scale.lineHeight,
  letterSpacing: Scale.typoSpace,
  wordSpacing: Scale.typoSpace,
  textUnderlineOffset: Scale.typoSpace,

  zIndex: Scale.zIndex,

  boxShadow: Scale.shadow,

  animation: Scale.animation,
  animationName: Scale.animation,
  animationDuration: Scale.animation,
  animationIterationCount: Scale.animation,
  animationTimingFunction: Scale.animation,
  animationFillMode: Scale.animation,
  transform: Scale.animation,
  transformOrigin: Scale.animation,
  transitionProperty: Scale.animation,
  transitionDuration: Scale.animation,
  opacity: Scale.animation,
  pointerEvents: Scale.animation,
} as const
