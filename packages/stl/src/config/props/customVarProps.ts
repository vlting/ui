import { omitKeys } from "./props.utils"
import { FilterKeys, CssPropKey, CustomVarPropValue, KeysFromScale } from "./props.models"
import { getColor } from "../scales"

/**
 * Used to generate CSS classes for custom values (via a combo of className + CSS var).
 * Returns an object containing props with values matching a signature of:
 * `{ varName: string; className: string }`
 */
export function generateCustomVarPropsCss<K extends FilterKeys>(
  generateCss: (prop: CssPropKey, template?: (value: string) => string) => CustomVarPropValue,
  keys?: K
) {
  function value(prop: CssPropKey, template?: (value: string) => string): CustomVarPropValue {
    return keys && !keys[prop] ? { varName: "", className: "" } : generateCss(prop, template)
  }

  const props = {
    // Complex shorthand props come first
    background: value("background"),

    borderColor: value("borderColor"),
    borderStyle: value("borderStyle"),
    borderWidth: value("borderWidth"),
    borderTop: value("borderTop"),
    borderBottom: value("borderBottom"),
    borderLeft: value("borderLeft"),
    borderRight: value("borderRight"),
    borderBlockStart: value("borderBlockStart"),
    borderBlockEnd: value("borderBlockEnd"),
    borderInlineStart: value("borderInlineStart"),
    borderInlineEnd: value("borderInlineEnd"),

    columnRule: value("columnRule"),
    columnCount: value("columnCount"),
    columnWidth: value("columnWidth"),

    flex: value("flex"),

    gridTemplate: value("gridTemplate"),
    gridArea: value("gridArea"),
    gridRow: value("gridRow"),
    gridColumn: value("gridColumn"),

    transition: value("transition"),

    listStyle: value("listStyle"),

    animation: value("animation"),
    border: value("border"),
    borderRadius: value("borderRadius"),
    columns: value("columns"),
    font: value("font"),
    gap: value("gap"),
    grid: value("grid"),
    outline: value("outline"),
    textDecoration: value("textDecoration"),

    // These are technically remapped, but we want the inline var assignment to only need to
    // include the actual gradient, not the type. This will keep those assignments shorter!
    linearGradient: value("backgroundImage", v => `linear-gradient(${v})`),
    radialGradient: value("backgroundImage", v => `radial-gradient(${v})`),
    conicGradient: value("backgroundImage", v => `conic-gradient(${v})`),

    backgroundColor: value("backgroundColor"),
    backgroundBlendMode: value("backgroundBlendMode"),
    backgroundPosition: value("backgroundPosition"),
    backgroundImage: value("backgroundImage"),
    backgroundSize: value("backgroundSize"),
    backgroundRepeat: value("backgroundRepeat"),

    borderSpacing: value("borderSpacing"),
    borderBlock: value("borderBlock"),
    borderBlockColor: value("borderBlockColor"),
    borderBlockStyle: value("borderBlockStyle"),
    borderBlockWidth: value("borderBlockWidth"),
    borderInline: value("borderInline"),
    borderInlineColor: value("borderInlineColor"),
    borderInlineStyle: value("borderInlineStyle"),
    borderInlineWidth: value("borderInlineWidth"),
    borderTopColor: value("borderTopColor"),
    borderTopStyle: value("borderTopStyle"),
    borderTopWidth: value("borderTopWidth"),
    borderBottomColor: value("borderBottomColor"),
    borderBottomStyle: value("borderBottomStyle"),
    borderBottomWidth: value("borderBottomWidth"),
    borderLeftColor: value("borderLeftColor"),
    borderLeftStyle: value("borderLeftStyle"),
    borderLeftWidth: value("borderLeftWidth"),
    borderRightColor: value("borderRightColor"),
    borderRightStyle: value("borderRightStyle"),
    borderRightWidth: value("borderRightWidth"),
    borderImage: value("borderImage"),

    boxShadow: value("boxShadow"),

    outlineColor: value("outlineColor"),
    outlineStyle: value("outlineStyle"),
    outlineWidth: value("outlineWidth"),

    color: value("color"),
    fill: value("fill"),
    stroke: value("stroke"),

    caretColor: value("caretColor"),
    columnRuleColor: value("columnRuleColor"),
    columnRuleStyle: value("columnRuleStyle"),
    columnRuleWidth: value("columnRuleWidth"),

    fontSize: value("fontSize"),
    fontFamily: value("fontFamily"),
    textDecorationLine: value("textDecorationLine"),
    textDecorationColor: value("textDecorationColor"),
    textDecorationThickness: value("textDecorationThickness"),
    textShadow: value("textShadow"),
    letterSpacing: value("letterSpacing"),

    flexGrow: value("flexGrow"),
    flexShrink: value("flexShrink"),
    flexBasis: value("flexBasis"),

    gridTemplateRows: value("gridTemplateRows"),
    gridTemplateColumns: value("gridTemplateColumns"),
    gridTemplateAreas: value("gridTemplateAreas"),
    gridAutoRows: value("gridAutoRows"),
    gridAutoColumns: value("gridAutoColumns"),
    gridRowStart: value("gridRowStart"),
    gridColumnStart: value("gridColumnStart"),
    gridRowEnd: value("gridRowEnd"),
    gridColumnEnd: value("gridColumnEnd"),

    transform: value("transform"),
    transformOrigin: value("transformOrigin"),

    animationDelay: value("animationDelay"),
    animationDuration: value("animationDuration"),
    animationIterationCount: value("animationIterationCount"),
    animationName: value("animationName"),
    animationTimingFunction: value("animationTimingFunction"),

    transitionProperty: value("transitionProperty"),
    transitionDuration: value("transitionDuration"),
    transitionDelay: value("transitionDelay"),
    transitionTimingFunction: value("transitionTimingFunction"),

    opacity: value("opacity"),
    mask: value("mask"),

    listStyleImage: value("listStyleImage"),

    filter: value("filter"),

    scrollMargin: value("scrollMargin"),
    scrollPadding: value("scrollPadding"),

    textEmphasis: value("textEmphasis"),

    // Make sure all sizing-related properties can have custom values
    inlineSize: value("inlineSize"),
    minInlineSize: value("minInlineSize"),
    maxInlineSize: value("maxInlineSize"),
    blockSize: value("blockSize"),
    minBlockSize: value("minBlockSize"),
    maxBlockSize: value("maxBlockSize"),

    marginBlockStart: value("marginBlockStart"),
    marginBlockEnd: value("marginBlockEnd"),
    marginInlineStart: value("marginInlineStart"),
    marginInlineEnd: value("marginInlineEnd"),

    paddingBlockStart: value("paddingBlockStart"),
    paddingBlockEnd: value("paddingBlockEnd"),
    paddingInlineStart: value("paddingInlineStart"),
    paddingInlineEnd: value("paddingInlineEnd"),

    insetBlockStart: value("insetBlockStart"),
    insetBlockEnd: value("insetBlockEnd"),
    insetInlineStart: value("insetInlineStart"),
    insetInlineEnd: value("insetInlineEnd"),
  } as const

  if (keys) {
    return omitKeys(props, keys)
  }
  return props
}

export type Colors = KeysFromScale<ReturnType<typeof getColor>["cssValueMap"]>

export type CustomVarPropHints = {
  background: Colors
  backgroundColor: Colors
  color: Colors
  fill: Colors
  stroke: Colors
  caretColor: Colors
  columnRuleColor: Colors
  borderColor: Colors
  borderBlockColor: Colors
  borderInlineColor: Colors
  borderTopColor: Colors
  borderBottomColor: Colors
  borderLeftColor: Colors
  borderRightColor: Colors
  outlineColor: Colors
}
