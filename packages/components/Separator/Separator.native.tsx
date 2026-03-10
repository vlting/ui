import React, { forwardRef } from "react"
import { View } from "react-native"
import type { ViewStyle } from "react-native"
import { styled } from "../../stl-native/src/config/styled"

// ---------------------------------------------------------------------------
// Styled frame
// ---------------------------------------------------------------------------

const SeparatorBase = styled(
  View,
  {
    backgroundColor: "$borderColor",
    height: 1,
    width: "100%",
  },
  {
    orientation: {
      horizontal: { height: 1, width: "100%", marginTop: 8, marginBottom: 8 },
      vertical: { width: 1, height: "100%", marginStart: 8, marginEnd: 8 },
    },
  },
  "Separator",
)

// ---------------------------------------------------------------------------
// Separator
// ---------------------------------------------------------------------------

export interface SeparatorProps {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  style?: ViewStyle
}

export const Separator = forwardRef<View, SeparatorProps>(
  ({ orientation = "horizontal", decorative = false, style, ...rest }, ref) => (
    <SeparatorBase
      ref={ref}
      orientation={orientation}
      style={style}
      accessibilityRole={decorative ? "none" : ("separator" as any)}
      {...rest}
    />
  ),
)
Separator.displayName = "Separator"
