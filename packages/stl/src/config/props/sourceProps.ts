/**
 * NOTE: If you add a prop here, remember to add it to `directionalProps` too,
 * if it needs special LTR/RTL (directional) processing.
 *
 * These props are ORDERED by how commonly used they are, to ensure that common
 * props (and the classes we generate for them) get shorter hashes.
 */

/** Complex shorthand properties */
const complexShorthandProps = {
  animation: true,
  background: true,
  border: true,
  borderBlockEnd: true,
  borderBlockStart: true,
  borderBottom: true,
  borderColor: true,
  borderInlineEnd: true,
  borderInlineStart: true,
  borderLeft: true,
  borderRadius: true,
  borderRight: true,
  borderStyle: true,
  borderTop: true,
  borderWidth: true,
  columnRule: true,
  columns: true,
  flex: true,
  font: true,
  gap: true,
  grid: true,
  gridArea: true,
  gridColumn: true,
  gridRow: true,
  gridTemplate: true,
  listStyle: true,
  outline: true,
  textDecoration: true,
  transition: true,

  /** Not complex
  all: true,
  margin: true,
  overflow: true,
  padding: true,
  */

  /** Nice-to-have
  placeContent: true,
  placeItems: true,
  placeSelf: true,
  */

  /** Unsupported
  containIntrinsicSize: true,
  flexFlow: true,
  offset: true,
  scrollTimeline: true,
  */
} as const

/** Props for which we generate CSS classes — so no mapped/alias props */
export const sourceClassedProps = {
  ...complexShorthandProps,

  display: true,

  inlineSize: true,
  minInlineSize: true,
  maxInlineSize: true,
  blockSize: true,
  minBlockSize: true,
  maxBlockSize: true,

  marginBlockStart: true,
  marginBlockEnd: true,
  marginInlineStart: true,
  marginInlineEnd: true,

  paddingBlockStart: true,
  paddingBlockEnd: true,
  paddingInlineStart: true,
  paddingInlineEnd: true,

  position: true,

  backgroundColor: true,
  backgroundImage: true,

  insetBlockStart: true,
  insetBlockEnd: true,
  insetInlineStart: true,
  insetInlineEnd: true,

  color: true,

  fontFamily: true,
  fontSize: true,
  fontWeight: true,
  fontStyle: true,
  typo: true,

  borderBlockStartColor: true,
  borderBlockStartStyle: true,
  borderBlockStartWidth: true,
  borderBlockEndColor: true,
  borderBlockEndStyle: true,
  borderBlockEndWidth: true,

  borderInlineStartColor: true,
  borderInlineStartStyle: true,
  borderInlineStartWidth: true,

  borderInlineEndColor: true,
  borderInlineEndStyle: true,
  borderInlineEndWidth: true,

  borderStartStartRadius: true,
  borderStartEndRadius: true,
  borderEndStartRadius: true,
  borderEndEndRadius: true,

  borderImage: true,

  opacity: true,
  visibility: true,

  overflow: true,
  overflowX: true,
  overflowY: true,

  outlineColor: true,
  outlineOffset: true,
  outlineStyle: true,
  outlineWidth: true,

  backgroundPosition: true,

  zIndex: true,

  textAlign: true,
  verticalAlign: true,

  alignItems: true,
  justifyContent: true,

  boxShadow: true,

  cursor: true,

  flexBasis: true,
  flexDirection: true,
  flexFlow: true,
  flexGrow: true,
  flexShrink: true,
  flexWrap: true,

  rowGap: true,
  columnGap: true,

  gridAutoRows: true,
  gridAutoColumns: true,
  gridAutoFlow: true,
  gridTemplateAreas: true, // UTIL: gtAreas
  gridTemplateColumns: true, // UTIL: gtColumns
  gridTemplateRows: true, // UTIL: gtRows
  gridRowStart: true,
  gridColumnStart: true,
  gridRowEnd: true,
  gridColumnEnd: true,

  linearGradient: true,
  radialGradient: true,
  conicGradient: true,

  whiteSpace: true,

  pointerEvents: true,

  lineHeight: true,

  alignSelf: true,
  justifySelf: true,
  alignContent: true,
  justifyItems: true,

  float: true,

  listStyleImage: true,
  listStylePosition: true,
  listStyleType: true,

  resize: true,

  textOverflow: true,
  textTransform: true,
  textUnderlineOffset: true,
  textEmphasis: true,

  letterSpacing: true,
  wordSpacing: true,
  wordBreak: true,
  overflowWrap: true,

  fill: true,
  stroke: true,

  mask: true,

  transform: true,
  transformOrigin: true,

  borderCollapse: true,
  borderSpacing: true,

  appearance: true,

  userSelect: true,

  filter: true,

  textShadow: true,

  all: true,

  backgroundBlendMode: true,
  backgroundSize: true,
  backgroundRepeat: true,

  boxSizing: true,

  caretColor: true,
  columnRuleColor: true,
  columnRuleStyle: true,
  columnRuleWidth: true,
  columnCount: true,
  columnWidth: true,

  scrollBehavior: true,
  scrollSnapAlign: true,
  scrollSnapType: true,
  scrollMargin: true,
  scrollPadding: true,

  writingMode: true,

  // Spread shorthand props
  animationName: true,
  animationDuration: true,
  animationIterationCount: true,
  animationDelay: true,
  animationDirection: true,
  animationFillMode: true,
  animationPlayState: true,
  animationTimingFunction: true,

  transitionDelay: true,
  transitionDuration: true,
  transitionProperty: true,
  transitionTimingFunction: true,

  textDecorationColor: true,
  textDecorationLine: true,
  textDecorationStyle: true,
  textDecorationThickness: true,

  // FOR FUTURE CONSIDERATION
  // "quotes": true,

  // "transformStyle": true,

  // "textIndent": true,
  // "textOrientation": true,

  // "gridColumnEnd": true, // Skip
  // "gridColumnStart": true, // Skip
  // "gridRowEnd": true, // Skip
  // "gridRowStart": true, // Skip

  // "offset": true, // NICE-TO-HAVE
  // "offsetAnchor": true, // EXPERIMENTAL
  // "offsetPosition": true, // EXPERIMENTAL
  // "textJustify": true,
  // "textUnderlinePosition": true,
} as const

/** Full list of supported CSS props (186 props + 39 utility props) */
export const sourceProps = {
  ////////////////////
  // Remapped Props // (Skip class creation for these)
  ////////////////////
  // Utils
  p: true,
  pt: true,
  pr: true,
  pb: true,
  pl: true,
  px: true,
  paddingX: true,
  py: true,
  paddingY: true,

  m: true,
  mt: true,
  mr: true,
  mb: true,
  ml: true,
  mx: true,
  marginX: true,
  my: true,
  marginY: true,

  bg: true,

  borderX: true,
  borderY: true,

  radius: true,
  radiusTop: true,
  radiusBottom: true,
  radiusLeft: true,
  radiusRight: true,
  radiusTopLeft: true,
  radiusTopRight: true,
  radiusBottomLeft: true,
  radiusBottomRight: true,

  inset: true,

  z: true,

  h: true,
  w: true,
  size: true,

  gt: true, // gridTemplate
  gtAreas: true, // gridTemplateAreas
  gtColumns: true, // gridTemplateColumns
  gtRows: true, // gridTemplateRows

  typography: true,

  // Standard Props
  height: true,
  width: true,
  minHeight: true,
  minWidth: true,
  maxHeight: true,
  maxWidth: true,

  margin: true,
  marginBottom: true,
  marginLeft: true,
  marginRight: true,
  marginTop: true,

  padding: true,
  paddingBottom: true,
  paddingLeft: true,
  paddingRight: true,
  paddingTop: true,

  bottom: true,
  top: true,
  left: true,
  right: true,

  borderBlock: true,
  borderBlockColor: true,
  borderBlockStyle: true,
  borderBlockWidth: true,

  borderInline: true,
  borderInlineColor: true,
  borderInlineStyle: true,
  borderInlineWidth: true,

  borderTopColor: true,
  borderTopStyle: true,
  borderTopWidth: true,

  borderBottomColor: true,
  borderBottomStyle: true,
  borderBottomWidth: true,

  borderLeftColor: true,
  borderLeftStyle: true,
  borderLeftWidth: true,

  borderRightColor: true,
  borderRightStyle: true,
  borderRightWidth: true,

  borderTopLeftRadius: true,
  borderTopRightRadius: true,
  borderBottomLeftRadius: true,
  borderBottomRightRadius: true,

  wordWrap: true, // Alias for "overflowWrap"

  ///////////////////
  // Classed Props //
  ///////////////////
  ...sourceClassedProps,
} as const

export type ComplexShorthandProp = keyof typeof complexShorthandProps

type ClassedProp = keyof typeof sourceClassedProps

/** Maps (classed) source props to numeric IDs */
export const sourcePropsIdMap = {} as { [k in ClassedProp]: number }

Object.keys(sourceProps).forEach((prop, id) => {
  sourcePropsIdMap[prop as ClassedProp] = id
})
