type PropValue = string | number

/** Maps a value to one or more RN style props */
function getNativePropMapper<K extends string>(...keys: K[]) {
  return <V extends PropValue>(value: V) => {
    const result = {} as Record<K, V>
    for (const key of keys) {
      result[key] = value
    }
    return result
  }
}

/**
 * Maps STL shorthand props to expanded RN style props.
 * Uses RN prop names directly (no CSS logical names).
 */
export const nativeMappedProps = {
  // Padding shorthands
  p: getNativePropMapper('paddingTop', 'paddingBottom', 'paddingStart', 'paddingEnd'),
  pt: getNativePropMapper('paddingTop'),
  pr: getNativePropMapper('paddingEnd'),
  pb: getNativePropMapper('paddingBottom'),
  pl: getNativePropMapper('paddingStart'),
  px: getNativePropMapper('paddingStart', 'paddingEnd'),
  paddingX: getNativePropMapper('paddingStart', 'paddingEnd'),
  py: getNativePropMapper('paddingTop', 'paddingBottom'),
  paddingY: getNativePropMapper('paddingTop', 'paddingBottom'),

  // Margin shorthands
  m: getNativePropMapper('marginTop', 'marginBottom', 'marginStart', 'marginEnd'),
  mt: getNativePropMapper('marginTop'),
  mr: getNativePropMapper('marginEnd'),
  mb: getNativePropMapper('marginBottom'),
  ml: getNativePropMapper('marginStart'),
  mx: getNativePropMapper('marginStart', 'marginEnd'),
  marginX: getNativePropMapper('marginStart', 'marginEnd'),
  my: getNativePropMapper('marginTop', 'marginBottom'),
  marginY: getNativePropMapper('marginTop', 'marginBottom'),

  // Background
  bg: getNativePropMapper('backgroundColor'),
  background: getNativePropMapper('backgroundColor'),

  // Radius shorthands
  radius: getNativePropMapper(
    'borderTopStartRadius',
    'borderTopEndRadius',
    'borderBottomStartRadius',
    'borderBottomEndRadius',
  ),
  radiusTop: getNativePropMapper('borderTopStartRadius', 'borderTopEndRadius'),
  radiusBottom: getNativePropMapper('borderBottomEndRadius', 'borderBottomStartRadius'),
  radiusLeft: getNativePropMapper('borderTopStartRadius', 'borderBottomStartRadius'),
  radiusRight: getNativePropMapper('borderTopEndRadius', 'borderBottomEndRadius'),
  radiusTopLeft: getNativePropMapper('borderTopStartRadius'),
  radiusTopRight: getNativePropMapper('borderTopEndRadius'),
  radiusBottomLeft: getNativePropMapper('borderBottomStartRadius'),
  radiusBottomRight: getNativePropMapper('borderBottomEndRadius'),
  borderRadius: getNativePropMapper(
    'borderTopStartRadius',
    'borderTopEndRadius',
    'borderBottomStartRadius',
    'borderBottomEndRadius',
  ),

  // Size shorthands
  z: getNativePropMapper('zIndex'),
  h: getNativePropMapper('height'),
  w: getNativePropMapper('width'),
  size: getNativePropMapper('height', 'width'),
  height: getNativePropMapper('height'),
  width: getNativePropMapper('width'),
  minHeight: getNativePropMapper('minHeight'),
  minWidth: getNativePropMapper('minWidth'),
  maxHeight: getNativePropMapper('maxHeight'),
  maxWidth: getNativePropMapper('maxWidth'),

  // Physical margin/padding -> RN names
  margin: getNativePropMapper('marginTop', 'marginBottom', 'marginStart', 'marginEnd'),
  marginBottom: getNativePropMapper('marginBottom'),
  marginLeft: getNativePropMapper('marginStart'),
  marginRight: getNativePropMapper('marginEnd'),
  marginTop: getNativePropMapper('marginTop'),
  padding: getNativePropMapper(
    'paddingTop',
    'paddingBottom',
    'paddingStart',
    'paddingEnd',
  ),
  paddingBottom: getNativePropMapper('paddingBottom'),
  paddingLeft: getNativePropMapper('paddingStart'),
  paddingRight: getNativePropMapper('paddingEnd'),
  paddingTop: getNativePropMapper('paddingTop'),

  // Position shorthands
  inset: getNativePropMapper('top', 'bottom', 'start', 'end'),
  top: getNativePropMapper('top'),
  bottom: getNativePropMapper('bottom'),
  left: getNativePropMapper('start'),
  right: getNativePropMapper('end'),

  // Border shorthands -> expanded to individual RN props
  border: getNativePropMapper(
    'borderTopColor',
    'borderTopWidth',
    'borderBottomColor',
    'borderBottomWidth',
    'borderStartColor',
    'borderStartWidth',
    'borderEndColor',
    'borderEndWidth',
  ),
  borderColor: getNativePropMapper(
    'borderTopColor',
    'borderBottomColor',
    'borderStartColor',
    'borderEndColor',
  ),
  borderWidth: getNativePropMapper(
    'borderTopWidth',
    'borderBottomWidth',
    'borderStartWidth',
    'borderEndWidth',
  ),
  borderTop: getNativePropMapper('borderTopColor', 'borderTopWidth'),
  borderTopColor: getNativePropMapper('borderTopColor'),
  borderTopWidth: getNativePropMapper('borderTopWidth'),
  borderBottom: getNativePropMapper('borderBottomColor', 'borderBottomWidth'),
  borderBottomColor: getNativePropMapper('borderBottomColor'),
  borderBottomWidth: getNativePropMapper('borderBottomWidth'),
  borderLeft: getNativePropMapper('borderStartColor', 'borderStartWidth'),
  borderLeftColor: getNativePropMapper('borderStartColor'),
  borderLeftWidth: getNativePropMapper('borderStartWidth'),
  borderRight: getNativePropMapper('borderEndColor', 'borderEndWidth'),
  borderRightColor: getNativePropMapper('borderEndColor'),
  borderRightWidth: getNativePropMapper('borderEndWidth'),

  // CSS logical border shorthands -> RN
  borderBlock: getNativePropMapper(
    'borderTopColor',
    'borderTopWidth',
    'borderBottomColor',
    'borderBottomWidth',
  ),
  borderBlockColor: getNativePropMapper('borderTopColor', 'borderBottomColor'),
  borderBlockWidth: getNativePropMapper('borderTopWidth', 'borderBottomWidth'),
  borderInline: getNativePropMapper(
    'borderStartColor',
    'borderStartWidth',
    'borderEndColor',
    'borderEndWidth',
  ),
  borderInlineColor: getNativePropMapper('borderStartColor', 'borderEndColor'),
  borderInlineWidth: getNativePropMapper('borderStartWidth', 'borderEndWidth'),
  borderBlockStart: getNativePropMapper('borderTopColor', 'borderTopWidth'),
  borderBlockEnd: getNativePropMapper('borderBottomColor', 'borderBottomWidth'),
  borderInlineStart: getNativePropMapper('borderStartColor', 'borderStartWidth'),
  borderInlineEnd: getNativePropMapper('borderEndColor', 'borderEndWidth'),
  borderX: getNativePropMapper(
    'borderStartColor',
    'borderStartWidth',
    'borderEndColor',
    'borderEndWidth',
  ),
  borderY: getNativePropMapper(
    'borderTopColor',
    'borderTopWidth',
    'borderBottomColor',
    'borderBottomWidth',
  ),

  // Gap
  gap: getNativePropMapper('rowGap', 'columnGap'),

  // Font shorthand (partial — only the RN-compatible sub-props)
  font: getNativePropMapper('fontSize', 'fontFamily', 'fontWeight', 'fontStyle'),
} as const

export type NativeMappedPropKey = keyof typeof nativeMappedProps
