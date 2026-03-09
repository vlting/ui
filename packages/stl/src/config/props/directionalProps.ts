export const directionalProps = {
  //// simpleDirectionalShorthands // JUST REMAP
  float: getMapper({
    ltr: {
      left: "left",
      right: "right",
    },
    rtl: {
      left: "right",
      right: "left",
    },
  }),

  //// backgroundShorthand // REQUIRE PARSING
  // background: true,

  //// positionOffsetShorthands // REQUIRE PARSING
  // backgroundPosition: true,
  // offsetAnchor: true,
  // offsetPosition: true,

  // DEPRECATED //
  //// animationOffsetShorthands
  // offset: true, // NICE-TO-HAVE
} as const

/** Used for turning a RTL-value-map object into a conditional mapping function */
function getMapper(valueMap: { ltr: Record<string, string>; rtl: Record<string, string> }) {
  return (value: string, isRTL = false) => {
    const currentMap = isRTL ? valueMap.rtl : valueMap.ltr
    if (currentMap[value] !== undefined) {
      return currentMap[value]
    }
    return value
  }
}
