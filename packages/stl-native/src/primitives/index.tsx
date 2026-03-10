import React, { forwardRef, useState, useCallback } from "react"
import { View, Text as RNText, Pressable as RNPressable, Image as RNImage, ScrollView as RNScrollView, Linking } from "react-native"
import type { LayoutChangeEvent, ViewStyle } from "react-native"
import { styled } from "../config/styled"

/** Basic layout container — maps to RN View */
export const Box = styled(View, {}, "Box")

/** Horizontal flex row */
export const Row = styled(View, {
  flexDirection: "row",
  alignItems: "center",
}, "Row")

/** Vertical flex column */
export const Column = styled(View, {
  flexDirection: "column",
}, "Column")

/** Text element */
export const Text = styled(RNText, {
  color: "$defaultBody",
}, "Text")

/** Heading text */
export const Heading = styled(RNText, {
  color: "$defaultHeading",
  fontWeight: "$h2",
  fontSize: "$h2",
  lineHeight: "$heading",
}, "Heading")

/** SubHeading text */
export const SubHeading = styled(RNText, {
  color: "$defaultHeading",
  fontWeight: "$h5",
  fontSize: "$h5",
  lineHeight: "$subHeading",
}, "SubHeading")

/** Styled Image */
export const Image = styled(RNImage, {}, "Image")

/** Pressable with styling support */
export const Pressable = styled(RNPressable, {}, "Pressable")

/** ScrollView with styling support */
export const ScrollView = styled(RNScrollView, {}, "ScrollView")

/** Grid layout */
const GridBase = styled(View, { flexDirection: "row", flexWrap: "wrap" }, "Grid")

export const Grid = forwardRef<View, any>(({ columns = 2, gap = 0, children, style, ...props }, ref) => {
  const [containerWidth, setContainerWidth] = useState(0)
  const childWidth = containerWidth > 0 ? (containerWidth - gap * (columns - 1)) / columns : 0
  const onLayout = (e: LayoutChangeEvent) => setContainerWidth(e.nativeEvent.layout.width)

  const kids = Array.isArray(children) ? children : children ? [children] : []

  return (
    <GridBase {...props} ref={ref} style={style} onLayout={onLayout}>
      {containerWidth > 0 && kids.map((child, i) => {
        if (!child || typeof child !== "object") return child
        const cellStyle: ViewStyle = {
          width: childWidth,
          marginLeft: i % columns !== 0 ? gap : 0,
          marginBottom: gap,
        }
        return (
          <View key={(child as any).key ?? i} style={cellStyle}>
            {child}
          </View>
        )
      })}
    </GridBase>
  )
})
Grid.displayName = "Grid"

/** Link — opens URL via Linking */
const LinkBase = styled(RNPressable, {}, "Link")

export const Link = forwardRef<View, any>(({ href, onPress, children, ...props }, ref) => {
  const handlePress = useCallback((e: any) => {
    onPress?.(e)
    if (href) Linking.openURL(href)
  }, [href, onPress])

  return <LinkBase {...props} ref={ref} onPress={handlePress}>{children}</LinkBase>
})
Link.displayName = "Link"

/** List primitives */
export const List = styled(View, { flexDirection: "column" }, "List")
export const OList = styled(View, { flexDirection: "column" }, "OList")
export const ListItem = styled(View, {}, "ListItem")
export const FlexList = styled(View, { flexDirection: "row", flexWrap: "wrap" }, "FlexList")
export const FlexListItem = styled(View, {}, "FlexListItem")

/** AspectRatio — constrains children to a given aspect ratio */
export interface AspectRatioProps {
  ratio?: number
  children?: React.ReactNode
  style?: ViewStyle
}

export const AspectRatio = forwardRef<View, AspectRatioProps>(
  ({ ratio = 1, children, style, ...props }, ref) => (
    <View ref={ref} style={[{ width: "100%" as any, aspectRatio: ratio }, style]} {...props}>
      {children}
    </View>
  )
)
AspectRatio.displayName = "AspectRatio"

/** Divider — horizontal or vertical line */
export const Divider = styled(
  View,
  {
    backgroundColor: "$borderColor",
    height: 1,
    width: "100%",
  },
  {
    orientation: {
      horizontal: { height: 1, width: "100%", marginTop: "$2", marginBottom: "$2" },
      vertical: { width: 1, height: "100%", marginStart: "$2", marginEnd: "$2" },
    },
  },
  "Divider"
)

/** Separator — accessible divider with separator role */
export interface SeparatorProps {
  orientation?: "horizontal" | "vertical"
  decorative?: boolean
  style?: ViewStyle
}

const SeparatorBase = styled(
  View,
  {
    backgroundColor: "$borderColor",
    height: 1,
    width: "100%",
  },
  {
    orientation: {
      horizontal: { height: 1, width: "100%", marginTop: "$2", marginBottom: "$2" },
      vertical: { width: 1, height: "100%", marginStart: "$2", marginEnd: "$2" },
    },
  },
  "Separator"
)

export const Separator = forwardRef<View, SeparatorProps>(
  ({ orientation = "horizontal", decorative = false, ...rest }, ref) => (
    <SeparatorBase
      ref={ref}
      orientation={orientation}
      accessibilityRole={decorative ? "none" : "separator" as any}
      {...rest}
    />
  )
)
Separator.displayName = "Separator"

/** Spacer — flexible space (flex: 1) or fixed size via variant */
export const Spacer = styled(
  View,
  { flex: 1 },
  {
    size: {
      xs: { flex: 0, width: 2, height: 2 },
      sm: { flex: 0, width: 4, height: 4 },
      md: { flex: 0, width: 8, height: 8 },
      lg: { flex: 0, width: 16, height: 16 },
      xl: { flex: 0, width: 24, height: 24 },
    },
  },
  "Spacer"
)
