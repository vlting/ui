import React from "react"
import { View, Text as RNText } from "react-native"
import type { ViewStyle } from "react-native"
import { styled } from "../../stl-native/src/config/styled"

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const AlertFrame = styled(
  View,
  {
    flexDirection: "row",
    borderRadius: "$3",
    borderWidth: 1,
    borderColor: "$borderColor",
    padding: 12,
    gap: 8,
    alignItems: "flex-start",
  },
  {
    variant: {
      default: { backgroundColor: "$surface1" },
      destructive: { borderColor: "$red8", backgroundColor: "$red2" },
      warning: { borderColor: "$yellow8", backgroundColor: "$yellow2" },
      info: { borderColor: "$blue8", backgroundColor: "$blue2" },
    },
  },
  "Alert",
)

const AlertTitle = styled(
  RNText,
  {
    fontWeight: "600",
    fontSize: 16,
    color: "$defaultBody",
  },
  "AlertTitle",
)

const AlertDescription = styled(
  RNText,
  {
    fontSize: 14,
    color: "$secondaryText12",
  },
  "AlertDescription",
)

const AlertIconFrame = styled(
  View,
  {
    alignItems: "center",
    justifyContent: "center",
    width: 16,
    height: 16,
    marginTop: 2,
  },
  "AlertIcon",
)

// ---------------------------------------------------------------------------
// Alert
// ---------------------------------------------------------------------------

export interface AlertProps {
  children: React.ReactNode
  variant?: "default" | "destructive" | "warning" | "info"
  style?: ViewStyle
}

function Root({ children, variant = "default", style }: AlertProps) {
  return (
    <AlertFrame
      variant={variant}
      style={style}
      accessibilityRole={variant === "destructive" ? "alert" : "summary"}
    >
      {children}
    </AlertFrame>
  )
}

function Title({ children }: { children: React.ReactNode }) {
  return <AlertTitle>{children}</AlertTitle>
}

function Description({ children }: { children: React.ReactNode }) {
  return <AlertDescription>{children}</AlertDescription>
}

function Icon({ children }: { children: React.ReactNode }) {
  return <AlertIconFrame>{children}</AlertIconFrame>
}

export const Alert = { Root, Title, Description, Icon }
