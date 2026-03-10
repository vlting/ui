import React, { forwardRef, useState, useCallback, useEffect, useRef } from 'react'
import {
  View,
  Text as RNText,
  Pressable as RNPressable,
  Image as RNImage,
  ScrollView as RNScrollView,
  Linking,
  ActivityIndicator,
  Animated,
} from 'react-native'
import type { LayoutChangeEvent, ViewStyle } from 'react-native'
import { styled } from '../config/styled'

/** Basic layout container — maps to RN View */
export const Box = styled(View, {}, 'Box')

/** Horizontal flex row */
export const Row = styled(
  View,
  {
    flexDirection: 'row',
    alignItems: 'center',
  },
  'Row',
)

/** Vertical flex column */
export const Column = styled(
  View,
  {
    flexDirection: 'column',
  },
  'Column',
)

/** Text element */
export const Text = styled(
  RNText,
  {
    color: '$defaultBody',
  },
  'Text',
)

/** Heading text */
export const Heading = styled(
  RNText,
  {
    color: '$defaultHeading',
    fontWeight: '$h2',
    fontSize: '$h2',
    lineHeight: '$heading',
  },
  'Heading',
)

/** SubHeading text */
export const SubHeading = styled(
  RNText,
  {
    color: '$defaultHeading',
    fontWeight: '$h5',
    fontSize: '$h5',
    lineHeight: '$subHeading',
  },
  'SubHeading',
)

/** Styled Image */
export const Image = styled(RNImage, {}, 'Image')

/** Pressable with styling support */
export const Pressable = styled(RNPressable, {}, 'Pressable')

/** ScrollView with styling support */
export const ScrollView = styled(RNScrollView, {}, 'ScrollView')

/** Grid layout */
const GridBase = styled(View, { flexDirection: 'row', flexWrap: 'wrap' }, 'Grid')

export const Grid = forwardRef<View, any>(
  ({ columns = 2, gap = 0, children, style, ...props }, ref) => {
    const [containerWidth, setContainerWidth] = useState(0)
    const childWidth =
      containerWidth > 0 ? (containerWidth - gap * (columns - 1)) / columns : 0
    const onLayout = (e: LayoutChangeEvent) =>
      setContainerWidth(e.nativeEvent.layout.width)

    const kids = Array.isArray(children) ? children : children ? [children] : []

    return (
      <GridBase {...props} ref={ref} style={style} onLayout={onLayout}>
        {containerWidth > 0 &&
          kids.map((child, i) => {
            if (!child || typeof child !== 'object') return child
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
  },
)
Grid.displayName = 'Grid'

/** Link — opens URL via Linking */
const LinkBase = styled(RNPressable, {}, 'Link')

export const Link = forwardRef<View, any>(
  ({ href, onPress, children, ...props }, ref) => {
    const handlePress = useCallback(
      (e: any) => {
        onPress?.(e)
        if (href) Linking.openURL(href)
      },
      [href, onPress],
    )

    return (
      <LinkBase {...props} ref={ref} onPress={handlePress}>
        {children}
      </LinkBase>
    )
  },
)
Link.displayName = 'Link'

/** List primitives */
export const List = styled(View, { flexDirection: 'column' }, 'List')
export const OList = styled(View, { flexDirection: 'column' }, 'OList')
export const ListItem = styled(View, {}, 'ListItem')
export const FlexList = styled(
  View,
  { flexDirection: 'row', flexWrap: 'wrap' },
  'FlexList',
)
export const FlexListItem = styled(View, {}, 'FlexListItem')

/** AspectRatio — constrains children to a given aspect ratio */
export interface AspectRatioProps {
  ratio?: number
  children?: React.ReactNode
  style?: ViewStyle
}

export const AspectRatio = forwardRef<View, AspectRatioProps>(
  ({ ratio = 1, children, style, ...props }, ref) => (
    <View
      ref={ref}
      style={[{ width: '100%' as any, aspectRatio: ratio }, style]}
      {...props}
    >
      {children}
    </View>
  ),
)
AspectRatio.displayName = 'AspectRatio'

/** Divider — horizontal or vertical line */
export const Divider = styled(
  View,
  {
    backgroundColor: '$borderColor',
    height: 1,
    width: '100%',
  },
  {
    orientation: {
      horizontal: { height: 1, width: '100%', marginTop: '$2', marginBottom: '$2' },
      vertical: { width: 1, height: '100%', marginStart: '$2', marginEnd: '$2' },
    },
  },
  'Divider',
)

/** Separator — accessible divider with separator role */
export interface SeparatorProps {
  orientation?: 'horizontal' | 'vertical'
  decorative?: boolean
  style?: ViewStyle
}

const SeparatorBase = styled(
  View,
  {
    backgroundColor: '$borderColor',
    height: 1,
    width: '100%',
  },
  {
    orientation: {
      horizontal: { height: 1, width: '100%', marginTop: '$2', marginBottom: '$2' },
      vertical: { width: 1, height: '100%', marginStart: '$2', marginEnd: '$2' },
    },
  },
  'Separator',
)

export const Separator = forwardRef<View, SeparatorProps>(
  ({ orientation = 'horizontal', decorative = false, ...rest }, ref) => (
    <SeparatorBase
      ref={ref}
      orientation={orientation}
      accessibilityRole={decorative ? 'none' : ('separator' as any)}
      {...rest}
    />
  ),
)
Separator.displayName = 'Separator'

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
  'Spacer',
)

/** Skeleton — animated placeholder with pulse animation */
export interface SkeletonProps {
  width?: number | string
  height?: number | string
  borderRadius?: number
  circle?: boolean
  style?: ViewStyle
}

export const Skeleton = forwardRef<View, SkeletonProps>(
  (
    { width = '100%', height = 20, borderRadius = 4, circle = false, style, ...props },
    ref,
  ) => {
    const opacity = useRef(new Animated.Value(0.4)).current

    useEffect(() => {
      const animation = Animated.loop(
        Animated.sequence([
          Animated.timing(opacity, { toValue: 1, duration: 800, useNativeDriver: true }),
          Animated.timing(opacity, {
            toValue: 0.4,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
      )
      animation.start()
      return () => animation.stop()
    }, [opacity])

    const size = circle ? Math.max(Number(width) || 40, Number(height) || 40) : undefined

    return (
      <Animated.View
        ref={ref}
        style={[
          {
            width: circle ? size : width,
            height: circle ? size : height,
            borderRadius: circle ? (size ?? 40) / 2 : borderRadius,
            backgroundColor: '#e0e0e0',
            opacity,
          },
          style,
        ]}
        {...props}
      />
    )
  },
)
Skeleton.displayName = 'Skeleton'

/** Spinner — loading indicator wrapping ActivityIndicator */
export interface SpinnerProps {
  size?: 'small' | 'large'
  color?: string
  style?: ViewStyle
}

export const Spinner = forwardRef<View, SpinnerProps>(
  ({ size = 'small', color, style, ...props }, ref) => (
    <View ref={ref} style={style} {...props}>
      <ActivityIndicator size={size} color={color} />
    </View>
  ),
)
Spinner.displayName = 'Spinner'

/** Kbd — keyboard key display */
export const Kbd = styled(
  RNText,
  {
    fontSize: 12,
    fontFamily: 'monospace',
    backgroundColor: '$color3',
    color: '$defaultBody',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '$borderColor',
    overflow: 'hidden',
  },
  {},
  'Kbd',
)

/** Badge — small status indicator */
const BadgeContainer = styled(
  View,
  {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 9999,
    alignSelf: 'flex-start',
  },
  {
    variant: {
      default: { backgroundColor: '$primary6' },
      secondary: { backgroundColor: '$color4' },
      destructive: { backgroundColor: '$red6' },
      outline: {
        backgroundColor: 'transparent',
        borderWidth: 1,
        borderColor: '$borderColor',
      },
    },
  },
  'Badge',
)

const BadgeText = styled(
  RNText,
  { fontSize: 12, fontWeight: '600' },
  {
    variant: {
      default: { color: '#fff' },
      secondary: { color: '$defaultBody' },
      destructive: { color: '#fff' },
      outline: { color: '$defaultBody' },
    },
  },
  'BadgeText',
)

export interface BadgeProps {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline'
  children?: React.ReactNode
  style?: ViewStyle
}

export const Badge = forwardRef<View, BadgeProps>(
  ({ variant = 'default', children, style, ...props }, ref) => (
    <BadgeContainer ref={ref} variant={variant} style={style} {...props}>
      {typeof children === 'string' ? (
        <BadgeText variant={variant}>{children}</BadgeText>
      ) : (
        children
      )}
    </BadgeContainer>
  ),
)
Badge.displayName = 'Badge'

/** VisuallyHidden — hidden visually, accessible to screen readers */
export const VisuallyHidden = forwardRef<View, { children?: React.ReactNode }>(
  ({ children, ...props }, ref) => (
    <View
      ref={ref}
      style={{
        position: 'absolute',
        width: 1,
        height: 1,
        overflow: 'hidden',
        opacity: 0,
      }}
      accessibilityElementsHidden={false}
      importantForAccessibility="yes"
      {...props}
    >
      {children}
    </View>
  ),
)
VisuallyHidden.displayName = 'VisuallyHidden'

/** Portal — passthrough wrapper (RN doesn't have DOM portals) */
export const Portal = forwardRef<View, { children?: React.ReactNode }>(
  ({ children }, _ref) => <>{children}</>,
)
Portal.displayName = 'Portal'
