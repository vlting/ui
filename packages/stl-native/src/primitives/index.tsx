import { forwardRef, useState, useCallback } from "react"
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
