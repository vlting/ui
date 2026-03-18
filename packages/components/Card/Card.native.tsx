import type React from 'react'
import type { ViewStyle } from 'react-native'
import { Text as RNText, View } from 'react-native'
import { styled } from '../../stl-native/src/config/styled'

// ---------------------------------------------------------------------------
// Styled frames
// ---------------------------------------------------------------------------

const CardFrame = styled(
  View,
  {
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '$borderColor',
    borderRadius: '$3',
    overflow: 'hidden',
    backgroundColor: '$surface1',
  },
  {
    theme: {
      primary: {},
      secondary: {},
      neutral: {},
    },
    size: {
      sm: { padding: 8 },
      md: { padding: 0 },
      lg: { padding: 0 },
    },
    elevation: {
      flat: {},
      normal: {
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: 1,
        shadowOpacity: 0.08,
        shadowRadius: 3,
        elevation: 2,
      },
      raised: {
        borderWidth: 0,
        shadowColor: '#000',
        shadowOffset: 4,
        shadowOpacity: 0.15,
        shadowRadius: 12,
        elevation: 8,
      },
    },
  },
  'Card',
)

const CardHeaderFrame = styled(
  View,
  {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
    gap: 4,
  },
  'CardHeader',
)

const CardContentFrame = styled(
  View,
  {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingVertical: 8,
    flex: 1,
    overflow: 'hidden',
  },
  'CardContent',
)

const CardFooterFrame = styled(
  View,
  {
    flexDirection: 'column',
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 16,
  },
  'CardFooter',
)

const CardTitleText = styled(
  RNText,
  {
    fontWeight: '600',
    color: '$defaultHeading',
  },
  {
    size: {
      sm: { fontSize: 16 },
      md: { fontSize: 18 },
      lg: { fontSize: 21 },
    },
  },
  'CardTitle',
)

const CardDescriptionText = styled(
  RNText,
  {
    color: '$secondaryText12',
  },
  {
    size: {
      sm: { fontSize: 12 },
      md: { fontSize: 14 },
      lg: { fontSize: 16 },
    },
  },
  'CardDescription',
)

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CardHeader({
  children,
  style,
  ...props
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return (
    <CardHeaderFrame style={style} {...props}>
      {children}
    </CardHeaderFrame>
  )
}

function CardContent({
  children,
  style,
  ...props
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return (
    <CardContentFrame style={style} {...props}>
      {children}
    </CardContentFrame>
  )
}

function CardFooter({
  children,
  style,
  ...props
}: {
  children?: React.ReactNode
  style?: ViewStyle
}) {
  return (
    <CardFooterFrame style={style} {...props}>
      {children}
    </CardFooterFrame>
  )
}

function CardTitle({
  children,
  size = 'md',
  style,
}: {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}) {
  return (
    <CardTitleText size={size} style={style} accessibilityRole="header">
      {children}
    </CardTitleText>
  )
}

function CardDescription({
  children,
  size = 'md',
  style,
}: {
  children?: React.ReactNode
  size?: 'sm' | 'md' | 'lg'
  style?: ViewStyle
}) {
  return (
    <CardDescriptionText size={size} style={style}>
      {children}
    </CardDescriptionText>
  )
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------

export interface CardProps {
  children?: React.ReactNode
  theme?: 'primary' | 'secondary' | 'neutral'
  size?: 'sm' | 'md' | 'lg'
  elevation?: 'flat' | 'normal' | 'raised'
  style?: ViewStyle
}

function CardRoot({ children, theme = 'neutral', size = 'md', elevation = 'normal', style, ...props }: CardProps) {
  return (
    <CardFrame theme={theme} size={size} elevation={elevation} style={style} {...props}>
      {children}
    </CardFrame>
  )
}

export const Card = Object.assign(CardRoot, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})
