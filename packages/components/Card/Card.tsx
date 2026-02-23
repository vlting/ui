import type React from 'react'
import type { GetProps } from 'tamagui'
import { Text, YStack, styled, withStaticProperties } from 'tamagui'
import { CardFrame as TamaguiCardFrame } from '@tamagui/card'

// Extend Tamagui's Card frame with our custom variants.
// Tamagui's Card provides a YStack-based container with theme support
// and size→borderRadius token mapping via createStyledContext.
// @ts-expect-error Tamagui v2 RC
const CardFrame = styled(TamaguiCardFrame, {
  borderWidth: 1,
  borderColor: '$borderColor',
  borderRadius: '$4',
  overflow: 'hidden',

  variants: {
    size: {
      sm: { padding: '$2' },
      md: { padding: '$0' },
      lg: { padding: '$0' },
    },
    elevated: {
      true: {
        borderWidth: 0,
      },
    },
    interactive: {
      true: {
        cursor: 'pointer',
        tabIndex: 0,
        role: 'button',
        hoverStyle: { backgroundColor: '$backgroundHover' },
        pressStyle: { backgroundColor: '$backgroundPress', scale: 0.99 },
        focusStyle: {
          outlineWidth: 2,
          outlineOffset: 2,
          outlineColor: '$outlineColor',
          outlineStyle: 'solid',
        },
        animation: 'fast',
      },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

// @ts-expect-error Tamagui v2 RC
const CardHeader = styled(YStack, {
  paddingHorizontal: '$4',
  paddingTop: '$4',
  paddingBottom: '$2',
  gap: '$1',
  flexShrink: 0,
})

// @ts-expect-error Tamagui v2 RC
const CardContent = styled(YStack, {
  paddingHorizontal: '$4',
  paddingVertical: '$2',
  flex: 1,
  overflow: 'hidden',
})

// @ts-expect-error Tamagui v2 RC
const CardFooter = styled(YStack, {
  paddingHorizontal: '$4',
  paddingTop: '$2',
  paddingBottom: '$4',
  flexShrink: 0,
})

// @ts-expect-error Tamagui v2 RC
const CardTitleText = styled(Text, {
  fontFamily: '$heading',
  fontWeight: '$4',

  variants: {
    size: {
      sm: { fontSize: '$4' },
      md: { fontSize: '$5' },
      lg: { fontSize: '$6' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

function CardTitle({ children, size, ...props }: { children?: React.ReactNode; size?: 'sm' | 'md' | 'lg' }) {
  return (
    <h3 style={{ margin: 0 }}>
      {/* @ts-expect-error Tamagui v2 RC */}
      <CardTitleText size={size} {...props}>{children}</CardTitleText>
    </h3>
  )
}

// @ts-expect-error Tamagui v2 RC
const CardDescription = styled(Text, {
  fontFamily: '$body',
  color: '$colorSubtitle',

  variants: {
    size: {
      sm: { fontSize: '$2' },
      md: { fontSize: '$3' },
      lg: { fontSize: '$4' },
    },
  } as const,

  defaultVariants: {
    size: 'md',
  },
})

export const Card = withStaticProperties(CardFrame, {
  Header: CardHeader,
  Content: CardContent,
  Footer: CardFooter,
  Title: CardTitle,
  Description: CardDescription,
})

export type CardProps = GetProps<typeof CardFrame>
