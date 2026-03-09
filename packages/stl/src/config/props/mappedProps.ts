import { CoreCustomValues, NotShared, Shared } from "../../shared/models"
import { OverrideScaledProp } from "../styles.css"
import { CssPropKey } from "./props.models"
import { ComplexShorthandProp } from "./sourceProps"

type PropValue = string | number

/** Map CSS value to one or more keys */
function mapValue<V extends PropValue, K extends CssPropKey>(value: V, keys: K[]) {
  return keys.reduce((output, key) => {
    output[key] = value
    return output
  }, {} as Record<K, V>)
}

/** Maps a value to one or more CSS props */
function getPropMapper<K extends CssPropKey>(...keys: K[]) {
  return <V extends PropValue>(value: V) => mapValue(value, keys)
}

export const mappedProps = {
  // UTILS
  p: getPropMapper("paddingBlockStart", "paddingBlockEnd", "paddingInlineStart", "paddingInlineEnd"),
  pt: getPropMapper("paddingBlockStart"),
  pr: getPropMapper("paddingInlineEnd"),
  pb: getPropMapper("paddingBlockEnd"),
  pl: getPropMapper("paddingInlineStart"),
  px: getPropMapper("paddingInlineStart", "paddingInlineEnd"),
  paddingX: getPropMapper("paddingInlineStart", "paddingInlineEnd"),
  py: getPropMapper("paddingBlockStart", "paddingBlockEnd"),
  paddingY: getPropMapper("paddingBlockStart", "paddingBlockEnd"),

  m: getPropMapper("marginBlockStart", "marginBlockEnd", "marginInlineStart", "marginInlineEnd"),
  mt: getPropMapper("marginBlockStart"),
  mr: getPropMapper("marginInlineEnd"),
  mb: getPropMapper("marginBlockEnd"),
  ml: getPropMapper("marginInlineStart"),
  mx: getPropMapper("marginInlineStart", "marginInlineEnd"),
  marginX: getPropMapper("marginInlineStart", "marginInlineEnd"),
  my: getPropMapper("marginBlockStart", "marginBlockEnd"),
  marginY: getPropMapper("marginBlockStart", "marginBlockEnd"),

  bg: getPropMapper("backgroundColor"),
  background: getPropMapper("backgroundColor"),

  borderX: getPropMapper(
    "borderInlineStartColor",
    "borderInlineStartStyle",
    "borderInlineStartWidth",
    "borderInlineEndColor",
    "borderInlineEndStyle",
    "borderInlineEndWidth"
  ),
  borderY: getPropMapper(
    "borderBlockStartColor",
    "borderBlockStartStyle",
    "borderBlockStartWidth",
    "borderBlockEndColor",
    "borderBlockEndStyle",
    "borderBlockEndWidth"
  ),

  radius: getPropMapper("borderStartStartRadius", "borderStartEndRadius", "borderEndStartRadius", "borderEndEndRadius"),
  radiusTop: getPropMapper("borderStartStartRadius", "borderStartEndRadius"),
  radiusBottom: getPropMapper("borderEndEndRadius", "borderEndStartRadius"),
  radiusLeft: getPropMapper("borderStartStartRadius", "borderEndStartRadius"),
  radiusRight: getPropMapper("borderStartEndRadius", "borderEndEndRadius"),
  radiusTopLeft: getPropMapper("borderStartStartRadius"),
  radiusTopRight: getPropMapper("borderStartEndRadius"),
  radiusBottomLeft: getPropMapper("borderEndStartRadius"),
  radiusBottomRight: getPropMapper("borderEndEndRadius"),

  z: getPropMapper("zIndex"),

  h: getPropMapper("blockSize"),
  w: getPropMapper("inlineSize"),
  size: getPropMapper("blockSize", "inlineSize"),

  gt: getPropMapper("gridTemplate"),
  gtAreas: getPropMapper("gridTemplateAreas"),
  autoRows: getPropMapper("gridAutoRows"),
  gtRows: getPropMapper("gridTemplateRows"),
  gtColumns: getPropMapper("gridTemplateColumns"),

  typography: getPropMapper("font", "lineHeight", "textTransform", "fontStyle"),

  // Remapped CSS Props
  height: getPropMapper("blockSize"),
  width: getPropMapper("inlineSize"),
  minHeight: getPropMapper("minBlockSize"),
  minWidth: getPropMapper("minInlineSize"),
  maxHeight: getPropMapper("maxBlockSize"),
  maxWidth: getPropMapper("maxInlineSize"),

  margin: getPropMapper("marginBlockStart", "marginBlockEnd", "marginInlineStart", "marginInlineEnd"),
  marginBottom: getPropMapper("marginBlockEnd"),
  marginLeft: getPropMapper("marginInlineStart"),
  marginRight: getPropMapper("marginInlineEnd"),
  marginTop: getPropMapper("marginBlockStart"),

  padding: getPropMapper("paddingBlockStart", "paddingBlockEnd", "paddingInlineStart", "paddingInlineEnd"),
  paddingBottom: getPropMapper("paddingBlockEnd"),
  paddingLeft: getPropMapper("paddingInlineStart"),
  paddingRight: getPropMapper("paddingInlineEnd"),
  paddingTop: getPropMapper("paddingBlockStart"),

  inset: getPropMapper("insetBlockEnd", "insetBlockStart", "insetInlineStart", "insetInlineEnd"),
  bottom: getPropMapper("insetBlockEnd"),
  top: getPropMapper("insetBlockStart"),
  left: getPropMapper("insetInlineStart"),
  right: getPropMapper("insetInlineEnd"),

  border: getPropMapper(
    "borderBlockStartColor",
    "borderBlockStartStyle",
    "borderBlockStartWidth",
    "borderBlockEndColor",
    "borderBlockEndStyle",
    "borderBlockEndWidth",
    "borderInlineStartColor",
    "borderInlineStartStyle",
    "borderInlineStartWidth",
    "borderInlineEndColor",
    "borderInlineEndStyle",
    "borderInlineEndWidth"
  ),
  borderColor: getPropMapper(
    "borderBlockStartColor",
    "borderBlockEndColor",
    "borderInlineStartColor",
    "borderInlineEndColor"
  ),
  borderStyle: getPropMapper(
    "borderBlockStartStyle",
    "borderBlockEndStyle",
    "borderInlineStartStyle",
    "borderInlineEndStyle"
  ),
  borderWidth: getPropMapper(
    "borderBlockStartWidth",
    "borderBlockEndWidth",
    "borderInlineStartWidth",
    "borderInlineEndWidth"
  ),

  borderBlock: getPropMapper(
    "borderBlockStartColor",
    "borderBlockStartStyle",
    "borderBlockStartWidth",
    "borderBlockEndColor",
    "borderBlockEndStyle",
    "borderBlockEndWidth"
  ),
  borderBlockColor: getPropMapper("borderBlockStartColor", "borderBlockEndColor"),
  borderBlockStyle: getPropMapper("borderBlockStartStyle", "borderBlockEndStyle"),
  borderBlockWidth: getPropMapper("borderBlockStartWidth", "borderBlockEndWidth"),

  borderInline: getPropMapper(
    "borderInlineStartColor",
    "borderInlineStartStyle",
    "borderInlineStartWidth",
    "borderInlineEndColor",
    "borderInlineEndStyle",
    "borderInlineEndWidth"
  ),
  borderInlineColor: getPropMapper("borderInlineStartColor", "borderInlineEndColor"),
  borderInlineStyle: getPropMapper("borderInlineStartStyle", "borderInlineEndStyle"),
  borderInlineWidth: getPropMapper("borderInlineStartWidth", "borderInlineEndWidth"),

  borderTop: getPropMapper("borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"),
  borderTopColor: getPropMapper("borderBlockStartColor"),
  borderTopStyle: getPropMapper("borderBlockStartStyle"),
  borderTopWidth: getPropMapper("borderBlockStartWidth"),

  borderBottom: getPropMapper("borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"),
  borderBottomColor: getPropMapper("borderBlockEndColor"),
  borderBottomStyle: getPropMapper("borderBlockEndStyle"),
  borderBottomWidth: getPropMapper("borderBlockEndWidth"),

  borderLeft: getPropMapper("borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"),
  borderLeftColor: getPropMapper("borderInlineStartColor"),
  borderLeftStyle: getPropMapper("borderInlineStartStyle"),
  borderLeftWidth: getPropMapper("borderInlineStartWidth"),

  borderRight: getPropMapper("borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"),
  borderRightColor: getPropMapper("borderInlineEndColor"),
  borderRightStyle: getPropMapper("borderInlineEndStyle"),
  borderRightWidth: getPropMapper("borderInlineEndWidth"),

  borderBlockStart: getPropMapper("borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"),
  borderBlockEnd: getPropMapper("borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"),
  borderInlineStart: getPropMapper("borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"),
  borderInlineEnd: getPropMapper("borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"),

  borderRadius: getPropMapper(
    "borderStartStartRadius",
    "borderStartEndRadius",
    "borderEndStartRadius",
    "borderEndEndRadius"
  ),
  borderTopLeftRadius: getPropMapper("borderStartStartRadius"),
  borderTopRightRadius: getPropMapper("borderStartEndRadius"),
  borderBottomLeftRadius: getPropMapper("borderEndStartRadius"),
  borderBottomRightRadius: getPropMapper("borderEndEndRadius"),

  outline: getPropMapper("outlineColor", "outlineStyle", "outlineWidth", "outlineOffset"),

  font: getPropMapper("fontSize", "fontStyle", "fontFamily", "fontWeight"),

  typo: getPropMapper("font", "lineHeight", "textTransform", "fontStyle"),

  gap: getPropMapper("rowGap", "columnGap"),

  wordWrap: getPropMapper("overflowWrap"),

  textDecoration: getPropMapper(
    "textDecorationLine",
    "textDecorationStyle",
    "textDecorationColor",
    "textDecorationThickness"
  ),

  animation: getPropMapper(
    "animationName",
    "animationDuration",
    "animationIterationCount",
    "animationTimingFunction",
    "animationFillMode",
    "transform",
    "transformOrigin",
    "transitionProperty",
    "transitionDuration",
    "opacity",
    "pointerEvents"
  ),
} as const

/** Maps complex shorthand props to the base props that they replace */
export const complexShorthandMappedProps: Record<ComplexShorthandProp, CssPropKey[]> = {
  // NOTE: Commented out props are currently unsupported
  animation: [
    "animationName",
    "animationDuration",
    "animationTimingFunction",
    "animationDelay",
    "animationIterationCount",
    "animationDirection",
    "animationFillMode",
    "animationPlayState",
  ],
  background: [
    "backgroundColor",
    "backgroundImage",
    "backgroundPosition",
    "backgroundRepeat",
    "backgroundSize",
    // "backgroundAttachment",
    // "backgroundClip",
    // "backgroundOrigin",
  ],

  border: [
    "borderBlockStartColor",
    "borderBlockStartStyle",
    "borderBlockStartWidth",
    "borderBlockEndColor",
    "borderBlockEndStyle",
    "borderBlockEndWidth",
    "borderInlineStartColor",
    "borderInlineStartStyle",
    "borderInlineStartWidth",
    "borderInlineEndColor",
    "borderInlineEndStyle",
    "borderInlineEndWidth",
  ],
  borderColor: ["borderBlockStartColor", "borderBlockEndColor", "borderInlineStartColor", "borderInlineEndColor"],
  borderStyle: ["borderBlockStartStyle", "borderBlockEndStyle", "borderInlineStartStyle", "borderInlineEndStyle"],
  borderWidth: ["borderBlockStartWidth", "borderBlockEndWidth", "borderInlineStartWidth", "borderInlineEndWidth"],
  borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
  borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
  borderTop: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
  borderBottom: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
  borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
  borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
  borderLeft: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
  borderRight: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
  borderRadius: ["borderStartStartRadius", "borderStartEndRadius", "borderEndStartRadius", "borderEndEndRadius"],
  // borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],

  columnRule: ["columnRuleWidth", "columnRuleStyle", "columnRuleColor"],
  columns: ["columnCount", "columnWidth"],
  flex: ["flexGrow", "flexShrink", "flexBasis"],
  font: [
    "fontFamily",
    "fontSize",
    "fontStyle",
    "fontWeight",
    "lineHeight",
    // "fontStretch",
    // "fontVariant",
  ],
  gap: ["columnGap", "rowGap"],
  grid: [
    "gridAutoColumns",
    "gridAutoFlow",
    "gridAutoRows",
    "gridTemplateAreas",
    "gridTemplateColumns",
    "gridTemplateRows",
  ],
  gridArea: ["gridRowStart", "gridColumnStart", "gridRowEnd", "gridColumnEnd"],
  gridColumn: ["gridColumnEnd", "gridColumnStart"],
  gridRow: ["gridRowStart", "gridRowEnd"],
  gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
  listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
  // mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPosition", "maskRepeat", "maskSize"],
  outline: ["outlineColor", "outlineStyle", "outlineWidth"],
  textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle", "textDecorationThickness"],
  transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
}

/*************************************************************************************************
 * HELPERS
 *************************************************************************************************/

export const valueMappers = {
  gridTemplate: (value: string) => {
    // Check for line-breaks; throw error if they're found (only row/col syntax supported)
    const hasLineBreaks = (String(value).match(/\r|\n/) || []).length > 0
    if (hasLineBreaks)
      throw new Error("We do not currently support areas via this property; please use `gridArea` for that.")
    return value
  },
} as const

/*************************************************************************************************
 * TYPES
 *************************************************************************************************/
type MapType = typeof mappedProps
type MapKey = keyof MapType
type MappedProps<K extends MapKey> = keyof ReturnType<MapType[K]>
type MaybeCustomString<T, K extends MapKey | ComplexShorthandProp> = K extends ComplexShorthandProp
  ? T | CoreCustomValues
  : T

// prettier-ignore
export type WithMappedProps<T extends Partial<Record<CssPropKey, any>>> = 
  & T
  & { [key in Shared<MapType, OverrideScaledProp>]?: MaybeCustomString<OverrideScaledProp[key], key> }
  & { [key in NotShared<MapType, OverrideScaledProp>]?: T[Extract<keyof T, MappedProps<key>>] }
