/** Maps CSS logical property names (used by STL core) to React Native style property names */
export const cssToRN: Readonly<Record<string, string>> = Object.freeze({
  // Dimensions
  inlineSize: 'width',
  blockSize: 'height',
  minInlineSize: 'minWidth',
  maxInlineSize: 'maxWidth',
  minBlockSize: 'minHeight',
  maxBlockSize: 'maxHeight',

  // Margin (block = vertical, inline = horizontal with RTL)
  marginBlockStart: 'marginTop',
  marginBlockEnd: 'marginBottom',
  marginInlineStart: 'marginStart',
  marginInlineEnd: 'marginEnd',

  // Padding
  paddingBlockStart: 'paddingTop',
  paddingBlockEnd: 'paddingBottom',
  paddingInlineStart: 'paddingStart',
  paddingInlineEnd: 'paddingEnd',

  // Position
  insetBlockStart: 'top',
  insetBlockEnd: 'bottom',
  insetInlineStart: 'start',
  insetInlineEnd: 'end',

  // Border radius (logical -> RN directional)
  borderStartStartRadius: 'borderTopStartRadius',
  borderStartEndRadius: 'borderTopEndRadius',
  borderEndStartRadius: 'borderBottomStartRadius',
  borderEndEndRadius: 'borderBottomEndRadius',

  // Border width
  borderBlockStartWidth: 'borderTopWidth',
  borderBlockEndWidth: 'borderBottomWidth',
  borderInlineStartWidth: 'borderStartWidth',
  borderInlineEndWidth: 'borderEndWidth',

  // Border color
  borderBlockStartColor: 'borderTopColor',
  borderBlockEndColor: 'borderBottomColor',
  borderInlineStartColor: 'borderStartColor',
  borderInlineEndColor: 'borderEndColor',

  // Border style
  borderBlockStartStyle: 'borderTopStyle',
  borderBlockEndStyle: 'borderBottomStyle',
  borderInlineStartStyle: 'borderStartStyle',
  borderInlineEndStyle: 'borderEndStyle',

  // Direct 1:1 mappings
  backgroundColor: 'backgroundColor',
  color: 'color',
  fontSize: 'fontSize',
  fontWeight: 'fontWeight',
  fontFamily: 'fontFamily',
  lineHeight: 'lineHeight',
  letterSpacing: 'letterSpacing',
  opacity: 'opacity',
  zIndex: 'zIndex',
  overflow: 'overflow',
  display: 'display',
  flexDirection: 'flexDirection',
  flexWrap: 'flexWrap',
  flexGrow: 'flexGrow',
  flexShrink: 'flexShrink',
  flexBasis: 'flexBasis',
  alignItems: 'alignItems',
  alignSelf: 'alignSelf',
  alignContent: 'alignContent',
  justifyContent: 'justifyContent',
  position: 'position',
  textAlign: 'textAlign',
  textTransform: 'textTransform',
  textDecorationLine: 'textDecorationLine',
  textDecorationColor: 'textDecorationColor',
  textDecorationStyle: 'textDecorationStyle',
  rowGap: 'rowGap',
  columnGap: 'columnGap',
  borderRadius: 'borderRadius',
  borderWidth: 'borderWidth',
  borderColor: 'borderColor',
  borderStyle: 'borderStyle',
  fontStyle: 'fontStyle',
})

/** Normalizes a CSS logical prop to its RN equivalent. Passthrough if no mapping exists. */
export function normalizeToRN(cssProp: string): string {
  return cssToRN[cssProp] ?? cssProp
}
